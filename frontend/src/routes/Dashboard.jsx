import { leaguesUserIsIn, teamsUserIsIn, getValidUserSends } from "../api/backend_calls"
import { useEffect, useState } from "react"
import DashboardTeamCard from "../components/DashboardTeamCard"

export default function Dashboard() {
    // Declaring state for what we need. Currently: dashboard leagues --> all of the leagues a user is in
    const [ dashboardLeagues, setDashboardLeagues ] = useState([])
    const [ dashboardTeams, setDashboardTeams ] = useState([])

    // Async function to use our async fetch from backend_calls
    const userLeagues = async () =>{
        const leagues = await leaguesUserIsIn()
        if (leagues){
            setDashboardLeagues(leagues)
        }
    }

    // Async function to use our async fetch from backend_calls
    const userTeams = async () => {
        const teams = await teamsUserIsIn()
        if (teams){
            setDashboardTeams(teams)
        }
    }



    // Use effect to run once.
    useEffect(()=>{
        userLeagues() // Will update state if it changes
        userTeams()
    }, [])


    // dashboard leagues is a list of league objects, so we want to access start_date and end_date

    // want to get total score

    // For now just console logging state is being grabbed when we navigate to dashboard.
    // Currently getting all the leagues a user is in
    

    return (
    <>
    <h1>Welcome to your dashboard!</h1>
    <h4>Here you can see your latest sends and stuff</h4>
    {dashboardTeams && <DashboardTeamCard teams={dashboardTeams}/>}
    </>)
}