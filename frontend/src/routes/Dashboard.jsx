import { createUserDashboard } from "../api/Auth/backend_calls";
import {  useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import DashboardButtons from "../Features/Dashboard/DashboardButtons"; // Component with Our Four buttons
import DashboardLeagues from "../Features/Dashboard/DashboardLeagues";
import DashboardSends from "../Features/Dashboard/DashboardSends";
import DashboardFeed from "../Features/Dashboard/DashboardFeed";
import SendModal from "../Features/Dashboard/SendModal";
import SelectGradeOptions from "../Features/Utils/SelectGradeOptions";


export default function Dashboard() {
    const { highestBoulderGrade, contextUserDashboard} = useContext(UserContext) //Gives us access to highest boulder grade -- contextUserDashboard fetches dashboard and updates context with results
    const [ selectDashboardGrade, setSelectDashboardGrade ] = useState("v3") // For setting highest boulder grade Renders here in Dashboard
    const [selectedComponent, setSelectedComponent] = useState('DashboardSends'); // We use this to display the proper dashboard component for the button selected by the user

    const [isModalOpen, setModalOpen] = useState(false); // for SendModal
    
    const handleButtonClick = (componentName) => { // Updates state for filtering, displays Dashboard Leagues, Sends, Feed
        setSelectedComponent(componentName);
    };

    // Sets Dashboard after successful PUT request
    // contextUserDashboard GETS userDashboard and SETS userDashboard in context
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
  
    // For Opens Send Modal
    const openModal = () => {
        setModalOpen(true);
    };
    // Closes Send Modal
    const closeModal = () => {
        setModalOpen(false);
        }
    
    // OPENS modal to let user log send
    const handleLogSend = () => {
        openModal()
    };

    // Submit for updating highest boulder grade
    const handleSubmitHighestGrade = async () => {
        await updateHighestBoulderGrade() // This sends a post request with selectDashboardGrade
        
    }
    // onChange for selecting highest boulder grade
    const handleHighestBoulderInput = (e) => {
        setSelectDashboardGrade(e.target.value);
    }

   
     return (
        <div className="bg-night min-h-screen">
          {!highestBoulderGrade && (
            <>
              <div className="font-nunito text-center text-white text-lg md:text-4xl py-8">
                Please Enter your highest boulder grade
              </div>
              <div className="flex flex-col items-center">
                <select value={selectDashboardGrade} onChange={handleHighestBoulderInput} className="p-2 my-3 border border-gray-500 rounded-md font-nunito focus:outline-none focus:border-blue-500">
                  <SelectGradeOptions/>
                </select> 
                <button onClick={handleSubmitHighestGrade} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito mt-2 py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                  Submit
                </button>
              </div>
            </>
          )}
          
          {highestBoulderGrade && (
            <>
            <SendModal 
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            />
  
            <DashboardButtons handleButtonClick={handleButtonClick} handleLogSend={handleLogSend} />
            {selectedComponent === 'DashboardLeagues' && <DashboardLeagues />}
            {selectedComponent === 'DashboardSends' && <DashboardSends handleLogSend={handleLogSend} isModalOpen={isModalOpen} />}
            {selectedComponent === 'DashboardFeed' && <DashboardFeed />}
            </>
          )}
        </div>
      );
      
    

}
