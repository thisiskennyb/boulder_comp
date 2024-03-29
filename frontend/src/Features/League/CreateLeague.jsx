import { useState } from "react"
import { createLeague } from "../../api/League/backend_calls";
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
          // List of fields that we are tracking in state
          // Must be filled out to not be null
          const requiredFields = [leagueName, location, startDate, endDate, teamSize]
          // Every will return True if all values are True
          // This means if one of the fields is not filled out, every() will return False
          if (requiredFields.every(field => field)){
            const response = await createLeague({league_name: leagueName, location: location, team_size: parseInt(teamSize), start_date: startDate, end_date: endDate })
        
            if (response.status == 201){
              toast.success("You have created a league")
              
              navigate(`/league/${response.data.id}`);
            }
        } else {
          // Handles when requiredFields not present
          toast.error("You must fill out all of the required fields")
        }
        } catch (error) {
          console.error('Something went wrong', error.response.status)
          // Handles a league name that already exists
          if (error.response.status == 400){
            toast.error("A league with that name already exists")
            // Any other error that causes createLeague to fail
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
      <div className="bg-night min-h-screen">
        <div className="flex flex-col justify-center items-center">
        <div className="text-white font-nunito text-xl text-center md:text-3xl my-5">Create a league by submitting name, dates, location, and team size of your league!</div>
        <div className="flex flex-col justify-center rounded-xl py-8 items-center bg-gray-800 border border-solid border-white w-11/12 md:w-1/3">
        <div className="flex w-2/3 md:w-full justify-center items-center">
          <h4 className="text-white font-nunito text-xl mr-4">Starts</h4>
       
        <input onChange={startDateHandler}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="date"
        id="start_date"
        name="start_date"
        min={getNextDay()}/>
        </div>

        <div className="flex w-2/3 md:w-full justify-center items-center">
          <h4 className="text-white font-nunito text-xl mr-4">Ends</h4>
        <input onChange={endDateHandler}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="date" 
        id="end_date" 
        name="end_date" 
        min={startDate}
        />
        </div>

        <div className="flex w-2/3 md:w-1/5 justify-center items-center">
          <h4 className="text-white font-nunito text-xl mr-4">Name</h4>
        <input onChange={leagueNameHandler}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="text" 
        id="league_name" 
        placeholder="league name"
        />
        </div>

        <div className="flex w-2/3 md:w-1/5 justify-center items-center">
          <h4 className="text-white font-nunito text-xl mr-4">Area</h4>
        <input onChange={locationNameHandler}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="text" 
        id="location" 
        placeholder="location"
        />
        </div>
        <div className="flex w-2/3 md:w-5/12 justify-between items-center">
          <h4 className="text-white font-nunito text-xl">Team Size</h4>
        <select onChange={teamSizeHandler}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 hover:bg-gray-600 hover:text-white mt-2 transition-colors duration-300" 
        id="numbers">
          {numbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        </div>
        <button 
        className="bg-gray-800 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-700 hover:text-white px-3 py-2 mt-2 transition-colors duration-300"
        onClick={createLeagueHandler}
        >create
        </button>


        </div>

        </div>
      </div>
    );
  };