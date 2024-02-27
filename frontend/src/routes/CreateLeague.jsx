import { useState } from "react"
import { createLeague } from "../api/League/backend_calls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"


export default function CreateLeague() {    
  const navigate = useNavigate();

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
        try {
          const response = await createLeague({league_name: leagueName, location: location, team_size: parseInt(teamSize), start_date: startDate, end_date: endDate })
        
          if (response.status == 201){
            toast.success("You have created a league")
            navigate(`/league/${response.data.id}`);

          }
        } catch (error) {
          console.error('Something went wrong', error.response.status)
          console.log(error.response.status, 'this is error')
          if (error.response.status == 400){
            toast.error("A league with that name already exists")
          } else {
            toast.error("Check your details for league, something went wrong")
          }
          
        }
    }


const getNextDay = () => {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1); // Get tomorrow's date
  return nextDay.toISOString().split('T')[0]; // Format the date as yyyy-mm-dd
};
    

    return (
      <>
        <div>This is create a league page</div>
        <input onChange={startDateHandler} type="date" id="start_date" name="start_date" min={getNextDay()}/>
        <input onChange={endDateHandler} type="date" id="end_date" name="end_date" min={startDate}/>
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