import React, { useState, useEffect } from "react";
import { getAllLeagues } from "../../api/League/backend_calls";
import { useNavigate } from "react-router-dom";
import SearchbarSelect from "../Utils/SearchbarSelect";
import { filterSendData } from "../../utils/utils";

export default function JoinLeague() {
  const [leaguesData, setLeaguesData] = useState([]);
  const [ selectedOption, setSelectedOption ] = useState("") // Used for Search Select state
  const [ searchQuery, setSearchQuery ] = useState(""); // Used for Search Input state
  const options = ['league', 'city', 'start_date', 'end_date'] // Field values for SearchbarSelect

  const navigate = useNavigate();

  const onSelectChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const onSearchQueryChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const formattedLeagueData = leaguesData.map(league => ({
    id: league.id,
    league: league.league_name,
    city: league.location,
    start_date: league.start_date,
    end_date: league.end_date
  }))

  

  useEffect(() => {
    const fetchAllLeagues = async () => {
      try {
        const response = await getAllLeagues();
        setLeaguesData(response.data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };
    fetchAllLeagues();
  }, []);

  const viewHandler = (league_id) => {
    navigate(`/league/${league_id}`);
  };

  const handleNavigateToCreateLeague = () => {
    navigate("/create-league")
  }
  



  return (
    <div className="bg-night min-h-screen pt-8">
      {!leaguesData && (
        <div className="bg-night min-h-screen pt-8">
      <div className="flex flex-col items-center text-white">
      <div className="font-nunito text-xl md:text3xl my-10">Create a League to get Started!</div>
      <button className="bg-gray-800 mb-5 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleNavigateToCreateLeague} >Create</button>
  </div>
  </div>
      )}


      <h1 className="text-white font-nunito text-3xl text-center">Click View to find out more about a League!</h1>
      <div className="grid grid-cols-11">
        <div className="col-start-2 grid-span-3 md:col-start-5">
      <SearchbarSelect searchQuery={searchQuery} onSearchQueryChange={onSearchQueryChange} selectedOption={selectedOption} onSelectChange={onSelectChange} options={options}/>
        </div>
      </div>
      <div className="flex w-11/12 rounded-lg md:w-4/5 mx-auto text-center bg-gray-800 mt-8">
        <h2 className="text-white w-1/4 text-base font-nunito md:text-2xl md:w-1/5">League</h2>
        <h2 className="text-white w-1/4 text-base font-nunito md:text-2xl md:w-1/5">City</h2>
        <h2 className="text-white w-1/6 text-base font-nunito md:text-2xl md:w-1/5">Start Date</h2>
        <h2 className="text-white w-1/6 text-base font-nunito md:text-2xl md:w-1/5">End Date</h2>
      </div>
      {/* Creates divider, make sure to place outside of header data */}
      <div>
        <hr className="w-11/12 md:w-4/5"></hr>
      </div>
    
      {!searchQuery && leaguesData.map((league) => (
        <div key={league.id} className="flex flex-col text-center">
          <div className="flex w-11/12 md:w-4/5 mx-auto bg-gray-700 rounded-lg">
          <h2 className="text-white truncate text-sm font-nunito md:text-xl w-1/4 md:w-1/5">{league.league_name}</h2> {/*Added truncate to handle long league names*/}
          <p className="text-white text-sm font-nunito md:text-xl w-1/4 md:w-1/5">{league.location}</p>
          <p className="text-white text-sm font-nunito md:text-xl w-1/6 md:w-1/5">{league.start_date}</p>
          <p className="text-white text-sm font-nunito md:text-xl w-1/6 md:w-1/5">{league.end_date}</p>
          {/* Div helps position button */}
          <div className="flex justify-center items-center w-1/12 md:w-1/5">
         
          <button className=" bg-gray-800 min-w-min w-1/12 font-nunito text-white text-xs md:text-xl rounded-lg border border-white ml-3 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white  transition-colors duration-300" onClick={() => viewHandler(league.id)}>View</button>
          </div>       
          </div>
          {/* Flex data ends here */}
          <div>
          <hr className="w-11/12 md:w-4/5"></hr>
          </div>
        </div>
      ))}

        {/* This logic can get cleaned up when we make components for the league tables */}
    {searchQuery && selectedOption && formattedLeagueData && filterSendData(formattedLeagueData, selectedOption, searchQuery).map((league) => (
      <div key={league.id} className="flex flex-col text-center">
        <div className="flex w-11/12 md:w-4/5 mx-auto bg-gray-700 rounded-lg">
        <h2 className="text-white truncate text-sm font-nunito md:text-xl w-1/4 md:w-1/5">{league.league}</h2> {/*Added truncate to handle long league names*/}
        <p className="text-white text-sm font-nunito md:text-xl w-1/4 md:w-1/5">{league.city}</p>
        <p className="text-white text-sm font-nunito md:text-xl w-1/6 md:w-1/5">{league.start_date}</p>
        <p className="text-white text-sm font-nunito md:text-xl w-1/6 md:w-1/5">{league.end_date}</p>
        {/* Div helps position button */}
        <div className="flex justify-center items-center w-1/12 md:w-1/5">
      
        <button className=" bg-gray-800 min-w-min w-1/12 font-nunito text-white text-xs md:text-xl rounded-lg border border-white ml-3 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white  transition-colors duration-300" onClick={() => viewHandler(league.id)}>View</button>
        </div>       
        </div>
        {/* Flex data ends here */}
        <div>
        <hr className="w-11/12 md:w-4/5"></hr>
        </div>
      </div>
          ))}
    </div>
  );
}
