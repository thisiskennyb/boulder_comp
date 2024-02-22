import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTeam } from "../api/backend_calls";


// We need each team member, their individual score, and the boulders that were sent during the comp
// the score is based off of the boulders that are valid in the leagues time range

export default function Team() {
    
    let { teamId } = useParams();

    const [team, setTeam] = useState(null)
    const [leagueStartDate, setLeagueStartDate] = useState('')
    const [leagueEndDate, setLeagueEndDate] = useState('')
    const [members, setMembers] = useState("")

    useEffect(() => {
        const fetchTeam = async () => {
            const team =  await getTeam(teamId)
            setTeam(team)
            setLeagueStartDate(team.league['start_date'])
            setLeagueEndDate(team.league['end_date'])
            setMembers(team.members)
            // console.log("team", team)
            
    }  
        fetchTeam()
      },[]); 

    // Used as a helper function when calculating users scores for validating the send date  
    function isDateInRange(dateToCheck, startDate, endDate) {
        // Parse the dates into JavaScript Date objects
        const date = new Date(dateToCheck);
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Check if the date is between the start and end dates
        return start <= date && date <= end;
    }
    
    console.log(isDateInRange('2024-02-15', '2024-02-01', '2024-02-28'));

      console.log(members)

    // may need another helper function called calculateScore()
    //  - takes in members[i].sends which is the list of users sends
    //  - iterates through users sends and adds up the score 
    //  - if the send is valid using the isDateInRange helper function
    const calculateUserScore = (send_arr) => {
        let score = 0

        for (let send of send_arr) {
            score += send.score
            console.log(send.score)
        }
        console.log("total:", score)
    }

    

    // console.log(calculateUserScore(members[0]['sends']))
    members ? console.log(calculateUserScore(members[0]['sends'])) : null;
    // console.log(members[0].sends)



    // Testing for calculating the users scores
      const total = 0
      const scoreArray = []

      for (let i = 0; i < members.length;i++){
        // console.log(members[i])
        for ( let j = 0; j < members[i]['sends'].length; i++) {

            // console.log(members[i]['sends'][j])
        }
      }


    return(
        <div>
            <div>This is the teams page{teamId}</div>
        
            

            {team && (
                <>
                    <h1>Team: {team.team_name}</h1>
                    <h2>Team Members</h2>
                    <ul>
                        {team.members.map((member, index) => (
                            <li key={index}>{member.username}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
        
    )
}