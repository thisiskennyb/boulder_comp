import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function DashboardInfo ( ) {

    const { userDashboard } = useContext(UserContext)

    const navigate = useNavigate()

    const { userId } = useParams()

    const handleNavitageImageUpload = () => {
        navigate(`/select-avatar-image/${userDashboard.user}`)
      }

    return (
        <div className="bg-night">
        <div className="text-white font-nunito">this shows all the dashboard info like hightest boulder grade ect..</div>
        <button onClick={handleNavitageImageUpload}>upload image</button>
        </div>
    )
}