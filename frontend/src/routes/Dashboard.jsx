import { logSend, getUserSends } from "../api/Send/backend_calls";
import { createUserDashboard } from "../api/Auth/backend_calls";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import DashboardLeagues from "../components/DashboardLeagues";
import DashboardInfo from "../components/DashboardInfo";
import DashboardSends from "../components/DashboardSends";
import dashboardLeagueIcon from "../assets/dashboardLeagueIcon.png"
import dashboardSendBoulder from "../assets/dashboardSendBoulder.png"
import dashboardLogSend from "../assets/dashboardLogSend.png"
import dashboardProfileIcon from "../assets/dashboardProfileIcon.png"

export default function Dashboard() {
    const { usersTeams, fetchUserTeams, highestBoulderGrade, setHighestBoulderGrade} = useContext(UserContext)
   
    // usersTeams --> all of the teams a user is on
    // fetchUserTeams --> async function that fetches all of the teams a user is on, and updates state of usersTeams
    const [ selectDashboardGrade, setSelectDashboardGrade ] = useState("v5")
    // Will get used if highestBoulderGrade is not available in context
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [boulderName, setBoulderName] = useState('');
    const [areaName, setAreaName] = useState('');
    const [boulderGrade, setBoulderGrade] = useState('');
    const [sendDate, setSendDate] = useState('');
    const [userSends, setUserSends] = useState([]);

    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleButtonClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    useEffect(() => {
        const fetchUserSend = async () => {
            const send_data = await getUserSends()
            if (send_data.status == 200){
                setUserSends(send_data['data'])
            }
        }
        fetchUserSend()
}, [usersTeams]);
    
    const updateHighestBoulderGrade = async () => {
        const data = {
            "highest_boulder_grade": selectDashboardGrade
        }
        const response = await createUserDashboard(data)
        if (response.status == 200){
            setHighestBoulderGrade(selectDashboardGrade)
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
        setBoulderGrade('');
        setAreaName('');
        setSendDate('');
        setIsChecked(false);
        }
    // Updates Teams User is on each time the modal for log send opens/closes
    useEffect(() => {
            // Gets all the teams user is on
            fetchUserTeams()
    
    }, [isModalOpen]);





    const handleLogSend = () => {
        openModal()
    };

    const handleInputChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmitLog = async () => {
        closeModal()
        
        try {
            const response = await logSend({name: boulderName, grade: boulderGrade, crag: areaName, flash: isChecked, send_date: sendDate});
            
            if (response.status == 201){
                toast.success('Successfully Logged')
                //Update usersTeams when a Send is submitted
                fetchUserTeams()
                
            }
        }
        catch (error) {
            //Error messages for if fetch fails
            toast.error('Thats not a good send, check your data again!')
            console.error('User Login failed:', error.response?.data || 'An error occurred')
        }
    };


    const handleSubmitHighestGrade = async () => {
        updateHighestBoulderGrade() // This sends a post request with selectDashboardGrade
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
                        {!highestBoulderGrade ? (
                <>
                    <div className="font-nunito text-center">
                        Please Enter your highest boulder grade
                    </div>
                    <div className="flex flex-col items-center">
                        <select value={selectDashboardGrade} onChange={handleHighestBoulderInput} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500">
                            {versionOptions}
                        </select>
                        <button onClick={handleSubmitHighestGrade} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </>
            ) : (
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
                    <div className="flex md:justify-around py-4">
                   <button className="text-nunito bg-linen rounded-lg px-4 py-2 flex items-center justify-center" onClick={() => handleButtonClick('DashboardLeagues')}> <span><img src={dashboardLeagueIcon} alt="League Icon" className="h-12 px-2"/></span>Leagues</button>
                    <button className="text-nunito bg-linen rounded-lg px-4 py-2 flex items-center justify-center" onClick={() => handleButtonClick('DashboardSends')}><span><img src={dashboardSendBoulder} alt="League Icon" className="h-12 px-2"/></span>Sends</button>
                    <button className="text-nunito bg-linen rounded-lg px-4 py-2 flex items-center justify-center" onClick={() => handleButtonClick('DashboardInfo')}><span><img src={dashboardProfileIcon} alt="League Icon" className="h-12 px-2"/></span>Info</button>
                    <button className="text-nunito bg-linen rounded-lg px-4 py-2 flex items-center justify-center" onClick={handleLogSend}><span><img src={dashboardLogSend} alt="League Icon" className="h-12 px-2"/></span>Log Send</button>
                    </div>

                    {selectedComponent === 'DashboardLeagues' && <DashboardLeagues />}
                    {selectedComponent === 'DashboardSends' && <DashboardSends userSends={userSends}/>}
                    {selectedComponent === 'DashboardInfo' && <DashboardInfo />}

                </>
            )}

        </div>
    );
    

}
