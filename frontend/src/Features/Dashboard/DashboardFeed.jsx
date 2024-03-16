
import { useState, useEffect, useContext } from "react"
import { getAllSends } from "../../api/Send/backend_calls"
import TeamSendTable from "../Team/TeamSendTable"
import UserContext from "../../contexts/UserContext"


export default function DashboardFeed(){
    const [ feedSends, setFeedSends ] = useState([])
    const { userSends } = useContext(UserContext) // Updates the page if they log while looking at feed
    
    const generateFeedSends = async () => {
        const tenMostRecentSends = await getAllSends()
        if (tenMostRecentSends.status == 200){
            const formattedSends = tenMostRecentSends.data.map(send => ({
                id: send.id,
                username: send.username,
                boulder: send.boulder.name,
                grade: send.boulder.grade,
                score: send.score,
                send_date: send.send_date,


                
            }))
            setFeedSends(formattedSends)
        }
    }


    useEffect(()=> {
        generateFeedSends()
    }, [userSends]) // Only will run if user logs a Send while rendering DashboardFeed
    // Otherwise useEffect will run once
    // Clicking the component after navigating away will fetch again


    /// Using TeamSendTable as placeholder
    // There are several pages formatted similarly
    // Where we display something like
    // Username, Boulder Name, Grade, Score, Send Date

    // We should make a reuseable component to handle this data
    return (
    <>
    {feedSends && (
        <TeamSendTable teamSends={feedSends} />
    )}
    </>)
}