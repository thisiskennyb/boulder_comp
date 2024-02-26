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
    <button onClick={onCreateHandler}>create</button>
    <button onClick={onJoinHanddler}>join</button>
    </>)
}