import { useState, useEffect } from "react";
import { getAllLeagues } from "../api/backend_calls";
import { useNavigate } from "react-router-dom";

// Component for joining a league
export default function JoinLeague() {
    
    // State variable to store leagues data
    const [leaguesData, setLeaguesData] = useState([]);

    // Hook to handle navigation
    const navigate = useNavigate();

    // Effect hook to fetch all leagues data on component mount
    useEffect(() => {
        const fetchAllLeagues = async () => {
            try {
                const data = await getAllLeagues();
                setLeaguesData(data);
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };

        fetchAllLeagues();
    }, []);

    // Function to handle view button click
    const viewHandler = (league_id) => {
        console.log(league_id)
        navigate(`/league/${league_id}`);
    }

    // Render loading message if leagues data is not available yet
    if (!leaguesData || leaguesData.length === 0) {
        return <div>Loading...</div>;
    }

    // JSX to render list of leagues
    return (
        <div>
            <div>This is join a league page</div>
            {/* Map through leagues data and render league details */}
            {leaguesData.map((league) => (
                <div key={league.id}>
                    <h2>{league.league_name}</h2>
                    <p>Location: {league.location}</p>
                    <p>Start Date: {league.start_date}</p>
                    <p>End Date: {league.end_date}</p>
                    {/* Add other league details as needed */}
                    <button onClick={() => viewHandler(league.id)}>View</button>
                </div>
            ))}
        </div>
    );
}
