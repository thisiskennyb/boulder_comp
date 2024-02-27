import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();
    
    const handleScoringNavigate = () => {
        navigate("/rules-and-scoring");
    }

    const handleSignUpNavigate = () => {
        navigate("/signup")
    }
    
    return (
        <div>
        <h1>this is Home</h1>
        <button onClick={handleScoringNavigate}>Scoring</button>
        <button onClick={handleSignUpNavigate}>Sign Up</button>
        </div>
    )
}