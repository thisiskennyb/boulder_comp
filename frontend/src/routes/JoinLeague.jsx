import React, { useState, useEffect } from "react";
import { getAllLeagues } from "../api/League/backend_calls";
import { useNavigate } from "react-router-dom";

export default function JoinLeague() {
  const [leaguesData, setLeaguesData] = useState([]);
  const navigate = useNavigate();

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

  if (!leaguesData || leaguesData.length === 0) {
    return(
      <div className="bg-night min-h-screen pt-8">
    <div className="flex flex-col items-center text-white">
    <div className="font-nunito text-xl md:text3xl my-10">Create a League to get Started!</div>
    <button className="bg-gray-800 mb-5 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleNavigateToCreateLeague} >Create</button>
</div>
</div>)
  }

  return (
    <div className="bg-night min-h-screen pt-8">
      <h1 className="text-white font-nunito text-3xl text-center">Click View to find out more about a League!</h1>
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
      {leaguesData.map((league) => (
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
    </div>
  );
}
