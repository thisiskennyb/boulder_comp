import { useState } from "react"
import { createLeague } from "../api/backend_calls"
import { useNavigate } from "react-router-dom"


export default function CreateLeague() {

    
  const navigate = useNavigate();

    // "league_name": "Testing Team E",
    // "start_date": "2024-02-28",
    // "end_date": "2024-04-28",
    // "team_size": 4,
    // "location": "Chattanooga"

    const [leagueName, setLeagueName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [teamSize, setTeamSize] = useState(1)
    const [location, setLocation] = useState('')

    const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

    const leagueNameHandler = (e) => {
        setLeagueName(e.target.value)
    }

    const locationNameHandler = (e) => {
        setLocation(e.target.value)
    }
    
    const startDateHandler = (e) => {
        setStartDate(e.target.value)
    }
    
    const endDateHandler = (e) => {
        setEndDate(e.target.value)
    }

    const teamSizeHandler = (e) => {
        setTeamSize(e.target.value)
    }

    const createLeagueHandler = async() => {
        
        const response = await createLeague({league_name: leagueName, location: location, team_size: parseInt(teamSize), start_date: startDate, end_date: endDate })
        console.log(response.id)
        navigate(`/league/${response.id}`);
        
        
    }


const getNextDay = () => {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1); // Get tomorrow's date
  return nextDay.toISOString().split('T')[0]; // Format the date as yyyy-mm-dd
};
    
    console.log(teamSize)
    

    return (
      <>
        <div>This is create a league page</div>
        <input onChange={startDateHandler} type="date" id="start_date" name="start_date" min={getNextDay()}/>
        <input onChange={endDateHandler} type="date" id="end_date" name="end_date" />
        <input onChange={leagueNameHandler} type="text" id="league_name" placeholder="league name"/>
        <input onChange={locationNameHandler} type="text" id="location" placeholder="location"/>
        <select onChange={teamSizeHandler} id="numbers">
          {numbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <button onClick={createLeagueHandler} >create</button>
      </>
    );
  };