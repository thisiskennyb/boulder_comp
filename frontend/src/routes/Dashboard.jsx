import { teamsUserIsIn, logSend } from "../api/backend_calls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTeamCard from "../components/DashboardTeamCard";
import Modal from '../components/Modal';

export default function Dashboard() {
    const [usersTeams, setUsersTeams] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState("v1"); // Set initial state to v1
    const [boulderName, setBoulderName] = useState('');
    const [areaName, setAreaName] = useState('');
    const [boulderGrade, setBoulderGrade] = useState('');
    const [sendDate, setSendDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserTeams = async () => {
            try {
                const data = await teamsUserIsIn();
                setUsersTeams(data);
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };
        fetchUserTeams();
    }, []);

    const openModal = (event) => {
        event.preventDefault();
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const handleViewLeague = (league_id) => {
        navigate(`/league/${league_id}`);
    };

    const handleLogSend = () => {
        setModalOpen(true);
    };

    const handleInputChange = () => {
        setIsChecked(!isChecked);
    };

    const handleVersionChange = (event) => {
        setSelectedVersion(event.target.value);
    };

    const handleSubmitLog = async () => {
        closeModal()
        const response = await logSend({name: boulderName, grade: boulderGrade, crag: areaName, flash: isChecked, send_date: sendDate});
        console.log(response);
        window.location.reload();
    };

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

    // Generating options for the selector
    const versionOptions = [];
    for (let i = 1; i <= 17; i++) {
        versionOptions.push(<option key={`v${i}`} value={`v${i}`}>v{i}</option>);
    }

    // console.log(boulderGrade)

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='font-nunito text-center'>
                    Please enter send information below
                </div>
                <div className="flex flex-col items-center">
                    <input type="text" className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Name" onChange={handleBoulderNameInput}/>
                    <input type="text" className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Area" onChange={handleAreaNameInput}/>
                    <select value={boulderGrade} onChange={handleBoulderGradeInput} className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500">
                        {versionOptions}
                    </select>
                    <input type="date" className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Email" onChange={handleSendDateInput}/>
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
            <h1>Welcome to your dashboard!</h1>
            <h4>Here you can see your latest sends and stuff</h4>
            <button onClick={handleLogSend}>Log Send</button>
            {usersTeams.length > 0 && (
                usersTeams.map((team) => (
                    <div key={team.id}>
                        <h2>League Name: {team.league.league_name}</h2>
                        <p>team name: {team.team_name}</p>
                        <p>team rank: {team.rank}/{team.league.number_of_teams}</p>
                        <p>team score: {team.score}</p>
                        <button onClick={() => handleViewLeague(team.league.id)}>view</button>
                    </div>
                ))
            )}
        </>
    );
}
