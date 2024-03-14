import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTeam } from "../api/Team/backend_calls";
import TeamSendTable from "../Features/Team/TeamSendTable";
import UserContext from "../contexts/UserContext";
import defaultImage from "../assets/default_image.png"

export default function Team() {
  let { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [leagueStartDate, setLeagueStartDate] = useState('');
  const [leagueEndDate, setLeagueEndDate] = useState('');
  const [members, setMembers] = useState([]);

  const { userDashboard } = useContext(UserContext)

  const navigate = useNavigate()
  

  //////////////   fetchTeam and useEffect   //////////////

  // Calls getTeam func with the id extracted from useParams

  // Puts team info into state
  // teamInfo : All team information including, league name, members, sends for each member
  // leagueStartDate : League start date tracked in state
  // leageEndDate : League end date tracked in state
  // members : All members of a team, includes list of Send objects

  // Uses helper function calculateUserScore to calculate the score for each team member
  // When we iterate over each member we use calculateScore to calculate the valid boulders based on start_date and end_date
  // While iterating we update the score for that member
  
  // When we finish Iterating we update the state of members to the resulting list

  // Returns: This function/ useEffect does not return anything! It sets the state of teamInfo, leagueStartDate, leagueEndDate, and members
  // It Also only runs once and has no dependencies


  // We may want to extract the fetchTeam function out of the useEffect.
  // This would let us still call the function again to get a team, and update scores for the members of it


  useEffect(() => {
    const fetchTeam = async () => {
      const team = await getTeam(teamId);
      if (team?.status == 200) {
        const teamInfo = team?.data // stores teamInfo in a variable
        setTeam(teamInfo); //prevents having to ?. before accessing, as the variable will not be null once it is assigned
        setLeagueStartDate(teamInfo.league['start_date']);
        setLeagueEndDate(teamInfo.league['end_date']);
        const updatedMembers = teamInfo.members.map(member => ({
    
          ...member, score: calculateUserScore(member.sends) //When we map over members, we use calculateUserScore to add score to member object
          
        }))
        setMembers(updatedMembers); // updatedMembers have their individual score
      }
    };
    fetchTeam();
  }, []);


  function isDateInRange(dateToCheck, startDate = leagueStartDate, endDate = leagueEndDate) {
    /// This function checks that league dates are valid
    /// Returns: Boolean, True if current date is within league start and end dates
    // leagueStartDate and leagueEndDate are stored in state and can easily be accessed
    const date = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start <= date && date <= end;
  }

  const calculateUserScore = (send_arr) => {
    //This function takes in a list of Send Objects and returns a score
    // Uses isDateInRange to filter boulders that were sent within league dates
    // The Send Objects have scores, so we can just add the valid send scores
    // Returns score, an integer representing the total score for an individual member
    let score = 0;
    
    for (let send of send_arr) {
      if (isDateInRange(send.send_date)) {
       //Update Score if valid
        score += send.score;
      }
    }
    // Score of valid sends from a user
    return score;
  };





const teamSendData = []
//teamSendData is all of the valid send objects for a team
  // This forEach iterates over each member
  // And forEach member we check each Send
  // If send is within league start dates
  // We add it to teamSendData

  
  members.forEach(member => { // For each member, for each send
    member.sends.forEach(send => {
      if (isDateInRange(send.send_date)) { // Check the date of each send
        teamSendData.push({ //If the dates are in range push new object into teamSendData
          boulder: send.boulder.name,
          grade: send.boulder.grade,
          crag: send.boulder.crag,
          username: member.username, // We did this to get username, could look at sendSerializer to make this easier in future
          send_date: send.send_date,
          score: send.score // Keeping send score, username, and send data together
        });
      }
    });
  });


//////// Spelling Errors fix Later ////////
////////////////////////////////////////

  const handleNavitageImageUpload = () => {
    navigate(`/upload-image/team/${teamId}`)
  }

  

  return (
    <div className="bg-night min-h-screen py-4">
      <div className="container mx-auto">
        {/* Team Information */}
        <div className="text-center">
          <div className="flex flex-col items-center justify-center">
            {/* Check for picture, render placeholder if not picture */}
            {team && team.team_picture ? (
              <img src={team?.team_picture} alt='placeholder for league' className="size-32 rounded-full my-4" />
            ) : (
              <img src={defaultImage} alt='placeholder for league' className="size-32 rounded-full my-4" />
            )}

            {team && userDashboard?.user == team.captain && (
              <button className="bg-gray-800 font-nunito min-w-min text-white text-lg md:text-xl rounded-md border border-white hover:bg-gray-600 hover:text-white" onClick={handleNavitageImageUpload}>
                UPLOAD
              </button>
            )}
            
          </div>
  
          <h1 className="text-white font-nunito text-3xl font-bold">{team?.team_name}</h1>
          <hr className="border-t-2 border-gray-300 my-2" />
          <div className="flex justify-around">
            <div>
              <p className="text-white font-nunito text-xl">Team Score: {team?.score}</p>
            </div>
            <div>
              <p className="text-white font-nunito text-xl">Rank: {team?.rank}</p>
            </div>
          </div>
        </div>
  
        {/* Render TeamSendTable component with sorted team send data */}
        <TeamSendTable teamSends={teamSendData} />
      </div>
    </div>
  );
}
