import { useNavigate } from "react-router-dom"
import boulderCompHome from '../assets/boulderCompHome.png'

export default function Home() {
    const navigate = useNavigate();
    
    const handleScoringNavigate = () => {
        navigate("/rules-and-scoring");
    }

    const handleSignUpNavigate = () => {
        navigate("/signup")
    }
    
    return (
        <div className="bg-night min-h-screen">
            <div className="flex flex-col items-center">
        <h1 className="text-white font-nunito text-2xl">Welcome to Boulder Comp!</h1>
        <img src={boulderCompHome} alt="Boulder Logo Isabel color" />
        <h2 className="text-white font-nunito">Climb Compete Conquer</h2>
        <p className="text-white font-nunito text-lg text-center">Boulder Comp is the ultimate platform for climbers to join leagues, form teams, and compete in bouldering challenges both indoors and outdoors. </p>
        <p className="text-white font-nunito text-lg text-center">It brings climbers together by offering the opportunity to compete with friends or strangers, fostering a vibrant global community.</p>
        <h4 className="text-white">Join Today!</h4>
        <button className="bg-isabel font-nunito text-jet text-lg rounded-md border border-jet hover:bg-gray hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleSignUpNavigate}>Sign Up</button>
        <h4 className="text-white">More about rules and scoring</h4>
        <button className="bg-isabel font-nunito text-jet text-lg rounded-md border border-jet hover:bg-gray hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleScoringNavigate}>Scoring</button>
            </div>
        </div>
    )
}