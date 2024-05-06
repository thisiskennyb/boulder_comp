import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleLeague } from "../api/League/backend_calls";
import { createTeam, getTeamsByLeague } from "../api/Team/backend_calls";

import Modal from "../Features/Utils/Modal";
import { toast } from "react-toastify";
import UserContext from "../contexts/UserContext";
import defaultImage from "../assets/default_image.png";
import whiteBoulder from "../assets/boulderWhite.png";
import LeagueTeamDisplay from "../Features/League/LeagueTeamDisplay";

export default function League() {
  const { leagueId } = useParams();
  const [leagueData, setLeagueData] = useState("");
  const [teamsData, setTeamsData] = useState(null);
  const [leagueParticipants, setLeagueParticipants] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState("");
  const [ joinLeague , setJoinLeague ] = useState(false)
  const navigate = useNavigate();

  const { userDashboard, contextFetchUserTeams } = useContext(UserContext)
  // Used as prop to trigger useEffect for conditional rendering
  const toggleJoinLeague = () =>{
    setJoinLeague((prev)=> !prev)
  }
  
  // fetchLeague func sets the state of leagueData and teamsData
  // leagueResponse gets the data for a single league
  // teamsResponse gets all of the Teams within a League
  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const leagueResponse = await getSingleLeague(leagueId); // Gets a Single League
        const teamsResponse = await getTeamsByLeague(leagueId); // Gets all the teams in a League
       
        setLeagueData(leagueResponse.data);
        setLeagueParticipants(leagueResponse.data.participants.map(participant => participant.id)) //Saving list of ids
        // Simplifies logic to extract participant ids to pass as props
        setTeamsData(teamsResponse.data); // Maybe Don't Need this?
      } catch (error) {
        console.error("Error fetching league and teams data:", error);
      }
    };
    fetchLeague(); // Updating state for single league, all teams in a league
  }, [isModalOpen, joinLeague]);


  // OnChange for Teamname input -- Modal that pops up
  const handleTeamInput = (e) => {
    setTeamNameInput(e.target.value);
  };
  // OnClick for Create Team button, Conditionally Rendered if user is not participating in league
  const handleCreateTeam = async () => {
    try {
      const response = await createTeam({ league_id: leagueId, team_name: teamNameInput });
      if (response.status === 201) {
        toast.success('Team successfully created');
        const updatedTeams = await getTeamsByLeague(leagueId);
        setTeamsData(updatedTeams.data);
        closeModal();
        contextFetchUserTeams()
      }
    } catch (error) {
      console.error('Something went wrong', error.response.status);
      toast.error('You are already a member of a team');
    }
  };

// OnClick for Image upload 
  const handleNavigateImageUpload = () => {
    navigate(`/upload-image/league/${leagueId}`)
  }
  // Triggers useEffect when modal Opens/Closes
  const closeModal = () => setModalOpen(false);

  const openModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  

  return (
    <div className="bg-night min-h-screen font-nunito text-white py-5">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="font-nunito text-center w-min-w text-2xl py-4 border border-white">Please enter team name</div>
        <div className="flex flex-col items-center">
          <input
            id="team-name"
            type="text"
            className="p-2 my-3 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="team name"
            onChange={handleTeamInput}
          />
          <div>
            <button className="bg-gray-800 hover:bg-gray-700  text-lg text-white font-nunito py-2 mt-2 px-4 border border-white rounded-full focus:outline-none focus:shadow-outline" onClick={handleCreateTeam}>Submit</button>
          </div>
        </div>
      </Modal>



<div className="flex items-center text-white font-nunito text-3xl justify-center h-10 my-20 md:flex-col">
    {/* When we have league data but no picture is available */}
    {leagueData && !leagueData.picture && (
        <div className="flex justify-center items-center flex-col">
            <div className="relative w-45 h-45 border border-gray-300 rounded-full overflow-hidden flex justify-center items-center mt-5">
                <img src={defaultImage} alt="no image available" className="size-40 md:size-50 rounded-full mt-1rem mb-0rem p-1 object-center" style={{ objectFit: 'cover' }} />
                <div className="absolute bottom-4 right-4">
                    {/* When we have league data, if user is the moderator, show them the button to edit league photo */}
                    {leagueData && userDashboard?.user == leagueData.moderator && (
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex justify-center items-center cursor-pointer" onClick={handleNavigateImageUpload}>
                            <div className="text-white text-lg font-bold">+</div>
                        </div>
                    )}
                </div>
            </div>
            {/* Display league name below the image */}
            <div className="text-white text-center text-2xl font-nunito md:text-3xl underline font-extrabold py-5">
                {leagueData.league_name.toUpperCase()}
            </div>
        </div>
    )}

    {/* When we have league data and picture is not null */}
    {leagueData && leagueData.picture && (
        <div className="flex justify-center items-center flex-col">
        <div className="relative w-45 h-45 border border-gray-300 rounded-full overflow-hidden flex justify-center items-center mt-5">
            <img src={leagueData.picture} alt="no image available" className="size-40 md:size-50 rounded-full mt-1rem mb-0rem p-1 object-center" style={{ objectFit: 'cover' }} />
            <div className="absolute bottom-4 right-4">
                {/* When we have league data, if user is the moderator, show them the button to edit league photo */}
                {leagueData && userDashboard?.user == leagueData.moderator && (
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex justify-center items-center cursor-pointer" onClick={handleNavigateImageUpload}>
                        <div className="text-white text-lg font-bold">+</div>
                    </div>
                )}
            </div>
        </div>
        {/* Display league name below the image */}
        <div className="text-white text-center text-2xl font-nunito md:text-3xl underline font-extrabold py-5">
            {leagueData.league_name.toUpperCase()}
        </div>
    </div>

    )}
</div>

  
      <div className="flex justify-center text-white font-nunito text-xs md:text-xl text-center p-2"><p className="font-extrabold">START DATE: {leagueData.start_date}</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <p className="font-extrabold">END DATE: {leagueData.end_date}</p></div>
      <div className="text-white font-nunito text-sm md:text-xl text-center">TEAM SIZE: {leagueData.team_size}</div>
      
      {/* Check that the date today is before the league start date, and that user is not already participating in the league */}
      {/* This check is simply ensuring that the user is not already a participant, and the league has not already started */}
      {leagueData && userDashboard && new Date() < new Date(leagueData.start_date) && !leagueParticipants.includes(userDashboard.user) && (
        <div className="flex flex-col items-center mt-4">
        <button className="mt-4 min-w-min text-white text-base md:text-xl font-nunito bg-gray-800 border border-white rounded-lg hover:bg-gray-700" onClick={openModal}>CREATE TEAM</button>
        </div>
      )}
      {leagueParticipants && userDashboard && (
        <LeagueTeamDisplay teamsData={teamsData} leagueParticipants={leagueParticipants} userDashboardID={userDashboard.user} toggleJoinLeague={toggleJoinLeague}/>
      )}

    </div>
  );
}
