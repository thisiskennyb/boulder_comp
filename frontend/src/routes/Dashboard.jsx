import { logSend } from "../api/Send/backend_calls";
import { createUserDashboard } from "../api/Auth/backend_calls";
import { getTodayDate } from "../utils/utils";
import {  useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";
import Modal from "../Features/Utils/Modal";
import DashboardLeagues from "../Features/Dashboard/DashboardLeagues";

import DashboardSends from "../Features/Dashboard/DashboardSends";
import DashboardFeed from "../Features/Dashboard/DashboardFeed";
import dashboardLeagueIcon from "../assets/dashboardLeagueIcon.png"
import dashboardLogSend from "../assets/dashboardLogSend.png"

import dashboardFeed from "../assets/dashboardFeed.png"
import boulderCompHome from '../assets/boulderCompHome.png'


export default function Dashboard() {
    const { contextFetchUserTeams, highestBoulderGrade, contextUserSendData, contextUserDashboard} = useContext(UserContext)
    
   // Above function is used to set initial state for sendDate
   // State variables start here
    const [ selectDashboardGrade, setSelectDashboardGrade ] = useState("v3") // For setting highest boulder grade
    const [isModalOpen, setModalOpen] = useState(false); // for modal
    const [isChecked, setIsChecked] = useState(false); // for modal
    const [boulderName, setBoulderName] = useState(''); // for modal
    const [areaName, setAreaName] = useState(''); // for modal
    const [boulderGrade, setBoulderGrade] = useState('v1'); // for modal
    const [sendDate, setSendDate] = useState(getTodayDate());
    const [selectedComponent, setSelectedComponent] = useState('DashboardSends'); // Filtering
   
    
    const handleButtonClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    
    const updateHighestBoulderGrade = async () => {
        try {
            const data = {
                "highest_boulder_grade": selectDashboardGrade
            }
            const response = await createUserDashboard(data)
            if (response.status == 201){
              contextUserDashboard()
            }
        } catch (error){
          console.error("Error in update highest boulder grade", error)
        }
    }
  
    // For log send form
    const openModal = () => {
        setModalOpen(true);
    };
    // For log send form
    const closeModal = () => {
        setModalOpen(false);
        //Resets the state for modal on close
        setBoulderName('');
        setBoulderGrade('v1');
        setAreaName('');
        setSendDate(getTodayDate());
        setIsChecked(false);
        }
    

    const handleLogSend = () => {
        openModal()
    };

    const handleInputChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmitLog = async () => {
        closeModal()
        
        try {
            const requiredFields = [boulderName, areaName, isChecked, sendDate]
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


    const handleSubmitHighestGrade = async () => {
        await updateHighestBoulderGrade() // This sends a post request with selectDashboardGrade
        
    }

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

    const handleHighestBoulderInput = (e) => {
        setSelectDashboardGrade(e.target.value);
    }

    // Generating options for the selector
    const versionOptions = [];
    for (let i = 1; i <= 17; i++) {
        versionOptions.push(<option key={`v${i}`} value={`v${i}`}>v{i}</option>);
    }
   

     return (
        <div className="bg-night min-h-screen">
          {highestBoulderGrade ? (
            <>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='font-nunito text-center'>
                  Please enter send information below
                </div>
                <div className="flex flex-col items-center">
                  <input type="text" value={boulderName} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Name" onChange={handleBoulderNameInput}/>
                  <input type="text" value={areaName} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Area" onChange={handleAreaNameInput}/>
                  <select value={boulderGrade} onChange={handleBoulderGradeInput} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500">
                    {versionOptions}
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
              <div className="flex justify-around md:justify-around py-4">
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={() => handleButtonClick('DashboardLeagues')}>
                  <span><img src={dashboardLeagueIcon} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Leagues
                </button>
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={() => handleButtonClick('DashboardSends')}>
                  <span><img src={boulderCompHome} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Sends
                </button>
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={() => handleButtonClick('DashboardFeed')}>
                  <span><img src={dashboardFeed} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Feed
                </button>
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleLogSend}>
                  <span><img src={dashboardLogSend} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Log Send
                </button>
              </div>
              {selectedComponent === 'DashboardLeagues' && <DashboardLeagues />}
              {selectedComponent === 'DashboardSends' && <DashboardSends handleLogSend={handleLogSend} isModalOpen={isModalOpen} />}
              {selectedComponent === 'DashboardFeed' && <DashboardFeed />}
            </>
          ) : (
            <>
              <div className="font-nunito text-center text-white text-lg md:text-4xl py-8">
                Please Enter your highest boulder grade
              </div>
              <div className="flex flex-col items-center">
                <select value={selectDashboardGrade} onChange={handleHighestBoulderInput} className="p-2 my-3 border border-gray-500 rounded-md font-nunito focus:outline-none focus:border-blue-500">
                  {versionOptions}
                </select> 
                <button onClick={handleSubmitHighestGrade} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito mt-2 py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      );
      
    

}
