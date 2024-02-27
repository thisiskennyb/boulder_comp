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
    console.log(league_id);
    navigate(`/league/${league_id}`);
  };

  if (!leaguesData || leaguesData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>This is join a league page</div>
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
