import { useNavigate } from "react-router-dom"
import boulderCompHome from '../assets/boulderCompHome.png'
import climbCompeteConquer from '../assets/climbCompeteConquer.png'
import boulderCompVert from '../assets/boulderCompVert.png'

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
        
        
        <img src={boulderCompVert} alt="Boulder Logo Isabel color" className="w-80 mt-5 h-auto" />
        
        <h2 className="text-white font-nunito text-xl md:text-3xl">Climb. Compete. Conquer.</h2>
        <p className="text-white font-nunito text-lg text-center">Boulder Comp is the ultimate platform for climbers to join leagues, form teams, and compete in bouldering challenges both indoors and outdoors. </p>
        <p className="text-white font-nunito text-lg text-center">It brings climbers together by offering the opportunity to compete with friends or strangers, fostering a vibrant global community.</p>
        <hr className="w-3/4"></hr>
        <h4 className="text-white font-nunito text-xl">Join Today!</h4>
        <button className="bg-gray-800 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleSignUpNavigate}>SIGN UP</button>
        <h4 className="text-white font-nunito text-xl">More about rules and scoring</h4>
        <button className="bg-gray-800 mb-5 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleScoringNavigate}>SCORING</button>
            </div>
        </div>
    )
}