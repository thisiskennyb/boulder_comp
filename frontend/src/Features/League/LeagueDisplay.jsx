import React, { useState, useEffect } from "react";
import { getAllLeagues } from "../../api/League/backend_calls";
import { useNavigate } from "react-router-dom";
import SearchbarSelect from "../Utils/SearchbarSelect";
import { filterSendData } from "../../utils/utils";
import { getTodayDate } from "../../utils/utils";
import ActiveCheckbox from "./ActiveCheckbox";

import LeagueInfoCard from "./LeagueInfoCard";

export default function JoinLeague() {
  const [leaguesData, setLeaguesData] = useState([]);
  const [ leaguesNotStarted, setLeaguesNotStarted ] = useState([])
  const [ selectedOption, setSelectedOption ] = useState("") // Used for Search Select state
  const [ searchQuery, setSearchQuery ] = useState(""); // Used for Search Input state


  const [ showActive, setShowActive ] = useState(true); // Using Bool to determine which list to render True -- Active, False -- Default
  
  // Regular variables, not state
  const today = getTodayDate()
  const options = ['league', 'city', 'start_date', 'end_date'] // Field values for SearchbarSelect


  const toggleActiveFilter = () => {
    setShowActive(prev => !prev);
  }

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

  
  const filterLeaguesNotStarted = (leagues) => {
    return leagues.filter(league => league.start_date > today)
  }


  useEffect(() => {
    const fetchAllLeagues = async () => {
      try {
        const response = await getAllLeagues();

        setLeaguesNotStarted(filterLeaguesNotStarted(response.data))
        setLeaguesData(response.data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };
    fetchAllLeagues();
  }, []);


  /// Starting useEffect for

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
        
        <ActiveCheckbox showActive={showActive} toggleActiveFilter={toggleActiveFilter} />

        {searchQuery && !selectedOption && <p className="text-white text-xl font-nunito text-center">Please select a category to search by</p>}
      

    {/* When nothing is being searched for and the user wants ALL leagues */}
      {!searchQuery && !showActive && leaguesData && (
        <LeagueInfoCard leagues={leaguesData} viewHandler={viewHandler} />
      )}


{/* This is when a search is not being made and we want to display
All Leagues that have not started yet */}
{!searchQuery && showActive && leaguesNotStarted && (
        <LeagueInfoCard leagues={leaguesNotStarted} viewHandler={viewHandler} />
      )}

        {/* This is when the user is searching through ALL leagues */}
    {searchQuery && !showActive && selectedOption && formattedLeagueData && (
      <LeagueInfoCard leagues={filterSendData(formattedLeagueData, selectedOption, searchQuery)} isSearchQuery={true} viewHandler={viewHandler} />)}

{/* This is when the user is searching for something AND only wants leagues that haven't started
We have an issue with filtering/mapping that causes our cards to have to be remapped
this is why we have isSearchQuery as a prop for now */}
{searchQuery && showActive && selectedOption && formattedLeagueData && (
      <LeagueInfoCard leagues={filterSendData(formattedLeagueData, selectedOption, searchQuery)} isSearchQuery={true} viewHandler={viewHandler} />)}
    </div>

    
  );
}
