
// Creates a Card for each team
export function TeamCard({team}){
            
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
                <TeamCard key={index} team={[team]} /> // team is an object, we wrap it in a list so that we can pass it to TeamCard
            ))}

        </div>
        </>
    )

}