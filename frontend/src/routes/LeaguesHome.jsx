import { useNavigate } from "react-router-dom"

export default function LeaguesHome(){

    const navigate = useNavigate();



    const onCreateHandler = () => {
        navigate("/create-league");
    }

    const onJoinHanddler = () => {
        navigate("/join-league");
    }

    return(
    <>
    <h1>Sorry, there are currently no leagues we are working on that!</h1>
    <p>But you have come to the right place</p>
    <button onClick={onCreateHandler}>create</button>
    <button onClick={onJoinHanddler}>join</button>
    </>)
}