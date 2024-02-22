import { useState } from "react";
import { createLeague } from "../api/backend_calls";
import { useNavigate } from "react-router-dom";

// Component for creating a league
export default function CreateLeague() {
    const navigate = useNavigate();

    // State variables for form inputs
    const [leagueName, setLeagueName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [teamSize, setTeamSize] = useState(1);
    const [location, setLocation] = useState('');

    // Array of numbers for selecting team size
    const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

    // Event handler for league name input
    const leagueNameHandler = (e) => {
        setLeagueName(e.target.value);
    };

    // Event handler for location input
    const locationNameHandler = (e) => {
        setLocation(e.target.value);
    };
    
    // Event handler for start date input
    const startDateHandler = (e) => {
        setStartDate(e.target.value);
    };
    
    // Event handler for end date input
    const endDateHandler = (e) => {
        setEndDate(e.target.value);
    };

    // Event handler for team size selection
    const teamSizeHandler = (e) => {
        setTeamSize(e.target.value);
    };

    // Function to create a league
    const createLeagueHandler = async() => {
        const response = await createLeague({
            league_name: leagueName,
            location: location,
            team_size: parseInt(teamSize),
            start_date: startDate,
            end_date: endDate
        });
        // Redirect to the created league page
        navigate(`/league/${response.id}`);
    };

    // Function to get the next day's date
    const getNextDay = () => {
        const today = new Date();
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1); // Get tomorrow's date
        return nextDay.toISOString().split('T')[0]; // Format the date as yyyy-mm-dd
    };
    
    // JSX for the create league form
    return (
        <>
            <div>This is create a league page</div>
            {/* Input for start date with minimum value set to the next day */}
            <input onChange={startDateHandler} type="date" id="start_date" name="start_date" min={getNextDay()}/>
            {/* Input for end date */}
            <input onChange={endDateHandler} type="date" id="end_date" name="end_date" />
            {/* Input for league name */}
            <input onChange={leagueNameHandler} type="text" id="league_name" placeholder="league name"/>
            {/* Input for location */}
            <input onChange={locationNameHandler} type="text" id="location" placeholder="location"/>
            {/* Dropdown for selecting team size */}
            <select onChange={teamSizeHandler} id="numbers">
                {numbers.map((number) => (
                    <option key={number} value={number}>
                        {number}
                    </option>
                ))}
            </select>
            {/* Button to create the league */}
            <button onClick={createLeagueHandler} >create</button>
        </>
    );
}
