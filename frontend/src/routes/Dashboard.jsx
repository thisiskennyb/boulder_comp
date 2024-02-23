import { teamsUserIsIn } from "../api/backend_calls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTeamCard from "../components/DashboardTeamCard";
import Modal from '../components/Modal';

export default function Dashboard() {
    const [usersTeams, setUsersTeams] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
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

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='font-nunito text-center'>
                    Please enter your email address below, and we'll send you a link to reset your password
                </div>
                <div className="flex flex-col items-center">
                    <input type="text" className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Name" />
                    <input type="text" className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Area" />
                    <select></select>
                    <input type="date" className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500" placeholder="Email" />
                    <input
                        id="example-input"
                        type="radio"
                        className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                        placeholder="Email"
                        checked={isChecked}
                        onChange={handleInputChange}
                    />
                    <div>
                        <button onClick={closeModal} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
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
