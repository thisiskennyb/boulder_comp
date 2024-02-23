import { useEffect } from "react"
import { getValidUserSends } from "../api/backend_calls"

// Creates a Card for each team
export function TeamCard({team}){
        // console.log(team, 'what do we have in team')
        // console.log(team[0].members, 'SHAPE OF MEMBERS IN TEAM')
        const startDate = team[0].league.start_date
        const endDate = team[0].league.end_date

        console.log('startdate', startDate)
        console.log('endDate', endDate)

        const context = {
            "start_date": startDate,
            "end_date": endDate
        }
        // team[0].members is a list of user objects that have a list of send objects
        // If a team member has no sends the list will be empty

        const getUserSends = async () => {
            const response = await getValidUserSends(context)
            console.log(response[0]['score'], 'from use effect get userSends call')
        }



        useEffect(()=> {
            getUserSends()
        },[])

        // Need to decide what we would like to display, individual usuer score? Team Rank?

        //Will continue after looking at backend logic for scoring/ranking
        return (

        //Use index 0, team is wrapped in a list to be passed as a prop
    <div className="bg-purple shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
                <div>Captain: {team[0].captain.username}</div>
                <p>Team: {team[0].team_name}</p>
                <div>{team[0].members.map((member, index)=> (
                    <p key={index}>{member.username}</p>
                ))}</div>
            </div>
        </div>
    </div>
    )
}


// Displays team cards that user is a part of
export default function DashboardTeamCard({teams}){
    console.log(teams, 'FROM DASHBOARD TEAM CARD')
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h1>Looks like a dashboard team placeholder</h1>
            {teams.map((team, index) => (
                <TeamCard key={index} team={[team]}/> // team is an object, we wrap it in a list so that we can pass it to TeamCard
            ))}

        </div>
        </>
    )

}