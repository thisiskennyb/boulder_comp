import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function DashboardInfo ( ) {

    const { userDashboard } = useContext(UserContext)

    const navigate = useNavigate()


    const handleNavitageImageUpload = () => {
        navigate(`/select-avatar-image/${userDashboard.user}`)
      }

    console.log('userdashboard', userDashboard)

    return (
        <div className="bg-night min-h-screen">
        <div className="bg-gray-700 border  w-5/6 md:w-1/2 mx-auto rounded-lg py-4 md:py-8">
        <div className="flex flex-col items-center">
        <div className="text-white font-nunito text-lg text-center md:text-3xl md:py-4">Customize your Profile Information Below!</div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Edit my Avatar: 
            <button className="ml-6 md:ml-8 px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-base md:text-lg rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300" onClick={handleNavitageImageUpload}>UPLOAD</button>
            </div>
        </div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Height: 
            <button className="ml-6 md:ml-8 px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-lg rounded-full  hover:bg-gray-700 hover:text-white transition-colors duration-300">EDIT</button>
            </div>
        </div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Weight: 
            <button className="ml-6 md:ml-8 px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-lg rounded-full  hover:bg-gray-700 hover:text-white transition-colors duration-300">EDIT</button>
            </div>
        </div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Ape Index: 
            <button className="ml-6 md:ml-8  px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-lg rounded-full  hover:bg-gray-700 hover:text-white transition-colors duration-300">EDIT</button>
            </div>
        </div>


        </div>

        </div>
        </div>
    )
}