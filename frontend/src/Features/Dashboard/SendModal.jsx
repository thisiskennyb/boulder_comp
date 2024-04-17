import Modal from "../Utils/Modal"
import { logSend } from "../../api/Send/backend_calls";
import { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/UserContext";
import { getTodayDate } from "../../utils/utils";
import { toast } from "react-toastify";
import SelectGradeOptions from "../Utils/SelectGradeOptions";



import Select from 'react-select'


export default function SendModal({isModalOpen, closeModal}){
    const { contextFetchUserTeams, contextUserSendData, cragsList, selectedCrag, handleCragChange, bouldersList, handleBoulderChange, selectedBoulder } = useContext(UserContext)

    console.log('HEYYOOOO')

    /// Fields for filling out Modal
    const [isChecked, setIsChecked] = useState(false); // --> Flash
    const [sendDate, setSendDate] = useState(getTodayDate()); // --> Date

    // Used for the combined Select&&Input components used for the list of areas and list of boulders
    const boulderOptions = bouldersList.map(boulder => ({name: boulder.name, label: boulder.name, grade: boulder.grade, ascents: boulder.ascents}));
    const cragOptions = cragsList.map(crag => ({name:crag, label:crag}));

    const boulderGrade = selectedBoulder.grade

  
    // This useEffect is to clear the fields of the modal after a user has logged a send
    // isModalOpen will change from True to False when user submits boulder
    // We will then make a useEffect be triggered when isModalOpen changes
    // This will ensure that when a modal is opened, a user will not have to erase previous data

    useEffect(() => {
        setIsChecked(false);
        setSendDate(getTodayDate())
    }, [isModalOpen])


    const customStyles = {
      control: (provided, state) => ({
          ...provided,
          backgroundColor: 'white',
          color: 'white',
          borderColor: state.isFocused ? '#7C3AED' : '#4A5568',
          boxShadow: state.isFocused ? '0 0 0 1px #7C3AED' : 'none',
          '&:hover': {
              borderColor: state.isFocused ? '#7C3AED' : '#4A5568'
          }
      }),
      menu: provided => ({
          ...provided,
          backgroundColor: '#4B5563',
          color: 'white',
      }),
      option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#7C3AED' : state.isFocused ? '#9CA3AF' : 'transparent',
          color: state.isSelected ? 'white' : 'inherit',
          '&:hover': {
              backgroundColor: '#7C3AED',
              color: 'white'
          }
      }),
      indicatorSeparator: () => ({
          display: 'none' // Remove the indicator separator
      }),
      dropdownIndicator: (provided, state) => ({
          ...provided,
          color: 'white',
          '&:hover': {
              color: 'white'
          }
      }),
      clearIndicator: (provided, state) => ({
          ...provided,
          color: 'white',
          '&:hover': {
              color: 'white'
          }
      }),
      indicatorContainer: (provided, state) => ({
          ...provided,
          color: 'white'
      })
  };

    const CombinedSelect = ({options, onChange, value}) => {
        return(
          
            <Select
            options={options}
            isSearchable={true}
            placeholder="Select a crag..."
            value={value}
            onChange={onChange}
            styles={customStyles}
            
            />
        )
    }


    const handleSendDateInput = (e) => {
        setSendDate(e.target.value);
    };

    const handleInputChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmitLog = async () => {
        closeModal()
        
        try {
            const requiredFields = [selectedBoulder, selectedCrag,  sendDate] // Requires all fields besides flash
            if (requiredFields.every(field => field)){

              const response = await logSend({name: selectedBoulder.name, grade: selectedBoulder.grade, crag: selectedCrag, flash: isChecked, send_date: sendDate});
              
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

    console.log(selectedBoulder)

    return (
    <>
     <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='font-nunito text-center mb-4'>
                  Please enter send information below
                </div>
                <div className="flex flex-col items-center">

                <div className="my-2 mt-2">
                <CombinedSelect options={cragOptions} onChange={handleCragChange} value={selectedCrag}/>
                </div>

                {selectedCrag && (
                  <div className="mt-2">
                <CombinedSelect options={boulderOptions} onChange={handleBoulderChange} value={selectedBoulder}/>
                </div>)}
         
               <div className="font-nunito text-center mt-4">Grade: {boulderGrade}</div>
                  
                  
                  

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