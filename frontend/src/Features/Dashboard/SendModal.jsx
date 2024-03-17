import Modal from "../Utils/Modal"
import { logSend } from "../../api/Send/backend_calls";
import { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/UserContext";
import { getTodayDate } from "../../utils/utils";
import { toast } from "react-toastify";
import SelectGradeOptions from "../Utils/SelectGradeOptions";

export default function SendModal({isModalOpen, closeModal}){
    const { contextFetchUserTeams, contextUserSendData, } = useContext(UserContext)

    /// Fields for filling out Modal
    const [isChecked, setIsChecked] = useState(false); // --> Flash
    const [boulderName, setBoulderName] = useState(""); // --> Boulder
    const [areaName, setAreaName] = useState(""); // --> Crag
    const [boulderGrade, setBoulderGrade] = useState('v1'); // --> Grade
    const [sendDate, setSendDate] = useState(getTodayDate()); // --> Date


    // This useEffect is to clear the fields of the modal after a user has logged a send
    // isModalOpen will change from True to False when user submits boulder
    // We will then make a useEffect be triggered when isModalOpen changes
    // This will ensure that when a modal is opened, a user will not have to erase previous data

    useEffect(() => {
        setIsChecked(false);
        setBoulderName("");
        setAreaName("");
        setBoulderGrade("v1");
        setSendDate(getTodayDate())
    }, [isModalOpen])

    const handleBoulderNameInput = (e) => {
        setBoulderName(e.target.value);
    };

    const handleAreaNameInput = (e) => {
        setAreaName(e.target.value);
    };

    const handleBoulderGradeInput = (e) => {
        setBoulderGrade(e.target.value);
    };

    const handleSendDateInput = (e) => {
        setSendDate(e.target.value);
    };

    const handleInputChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmitLog = async () => {
        closeModal()
        
        try {
            const requiredFields = [boulderName, areaName,  sendDate] // Requires all fields besides flash
            if (requiredFields.every(field => field)){

              const response = await logSend({name: boulderName, grade: boulderGrade, crag: areaName, flash: isChecked, send_date: sendDate});
              
              if (response.status == 201){
                  toast.success('Successfully Logged')
                  contextFetchUserTeams();
                  contextUserSendData();
                  //Update usersTeams when a Send is submitted
                  
                }
            } else {
              toast.error("You must fill out all of the required fields")
            } 
        }  catch (error) {
            //Error messages for if fetch fails
            toast.error('Thats not a good send, check your data again!')
            console.error('User Login failed:', error.response?.data || 'An error occurred')
        }
    };

    return (
    <>
     <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='font-nunito text-center'>
                  Please enter send information below
                </div>
                <div className="flex flex-col items-center">
                  <input type="text" value={boulderName} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Name" onChange={handleBoulderNameInput}/>
                  <input type="text" value={areaName} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Area" onChange={handleAreaNameInput}/>
                  <select value={boulderGrade} onChange={handleBoulderGradeInput} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500">
                    <SelectGradeOptions/>
                  </select>

                {/* Removed maxvalue while people are testing in production */}

                  <input type="date" value={sendDate} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Email" onChange={handleSendDateInput}/>
                  <span className='font-nunito'>Flash</span>
                  <input
                    id="example-input"
                    type="checkbox"
                    className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                    checked={isChecked}
                    onChange={handleInputChange}
                  />
                  <div>
                    <button onClick={handleSubmitLog} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                      Submit
                    </button>
                  </div>
                </div>
              </Modal>
    </>)
}