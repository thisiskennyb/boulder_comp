import { leaguesUserIsIn } from "../api/backend_calls"
import { useEffect, useState } from "react"

export default function Dashboard() {
    // Declaring state for what we need. Currently: dashboard leagues --> all of the leagues a user is in
    const [ dashboardLeagues, setDashboardLeagues ] = useState({})

    // Async function to use our async fetch from backend_calls
    const userLeagues = async () =>{
        const leagues = await leaguesUserIsIn()
        if (leagues){
            setDashboardLeagues(leagues)
        }
    }

    // Use effect to run once.
    useEffect(()=>{
        userLeagues() // Will update state if it changes
    }, [])


    // For now just console logging state is being grabbed when we navigate to dashboard.
    // Currently getting all the leagues a user is in
    console.log(dashboardLeagues)

    

    return (
    <>
    <h1>Welcome to your dashboard!</h1>
    <h4>Here you can see your latest sends and stuff</h4>
    </>)
}