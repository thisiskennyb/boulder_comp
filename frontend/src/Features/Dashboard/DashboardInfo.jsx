import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { updateUserDashboard } from "../../api/Auth/backend_calls";


export default function DashboardInfo ( ) {
    const [ height, setHeight ] = useState("");
    const [ weight, setWeight ] = useState("")
    const [ apeIndex, setApeIndex ] = useState("")

    const { userDashboard, setUserDashboard } = useContext(UserContext)
    const navigate = useNavigate()

    // Need to fix spelling errors
    const handleNavigateImageUpload = () => {
        navigate(`/upload-image/profile/${userDashboard.id}`)
      }

    const onHeightChange = (e) => {
        setHeight(e.target.value)
    }

    const onWeightChange = (e) => {
        setWeight(e.target.value)
    }

    const onApeIndexChange = (e) => {
        setApeIndex(e.target.value)
    }

    

    const handleUpdateHeight = async () => {
        if (height) {
            const context = {
                "height": height
            }
            const updatedDashboardHeight = await updateUserDashboard(context)
            if (updatedDashboardHeight.status == 201){
                setUserDashboard(updatedDashboardHeight.data)
                setHeight("")
            }
        }
    }

    const handleUpdateWeight = async () => {
        if (weight) {
            const context = {
                "weight": weight
            }
            const updatedDashboardWeight = await updateUserDashboard(context)
            if (updatedDashboardWeight.status == 201){
                setUserDashboard(updatedDashboardWeight.data)
                setWeight("")
            }
        }
    }

    const handleUpdateApeIndex = async () => {
        if (apeIndex) {
            const context = {
                "ape_index": apeIndex
            }
            const updatedDashboardApeIndex = await updateUserDashboard(context)
            if (updatedDashboardApeIndex.status == 201){
                setUserDashboard(updatedDashboardApeIndex.data)
                setApeIndex("")
            }
        }
    }


    return (
        <div className="bg-night min-h-screen py-10">
        <div className="bg-gray-700 border  w-5/6 md:w-1/2 mx-auto rounded-lg py-4 md:py-8">
        <div className="flex flex-col items-center">
        <div className="text-white font-nunito text-lg text-center md:text-3xl md:py-4">Customize your Profile Information Below!</div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Edit Avatar: 
            <button className="ml-6 md:ml-8 px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-base md:text-lg rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300" onClick={handleNavigateImageUpload}>UPLOAD</button>
            </div>
        </div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Height:
            {userDashboard.height && (<span className="px-2">{userDashboard.height}</span>)}
            <input
            type="text"
            value={height}
            onChange={onHeightChange}
            /> 
            <button  onClick={handleUpdateHeight} className="ml-6 md:ml-8 px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-lg rounded-full  hover:bg-gray-700 hover:text-white transition-colors duration-300">UPDATE</button>
            </div>
        </div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Weight: 
            {userDashboard.weight && (<span className="px-2">{userDashboard.weight}</span>)}
            <input
            type="text"
            value={weight}
            onChange={onWeightChange}
            />

            <button onClick={handleUpdateWeight} className="ml-6 md:ml-8 px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-lg rounded-full  hover:bg-gray-700 hover:text-white transition-colors duration-300">UPDATE</button>
            </div>
        </div>

        <div className="flex py-4">
            <div className="font-nunito text-white text-xl md:text-2xl">Ape Index:
            {userDashboard.ape_index && (<span className="px-2">{userDashboard.ape_index}</span>)} 
            <input
            type="text"
            value={apeIndex}
            onChange={onApeIndexChange}
            />
            <button onClick={handleUpdateApeIndex} className="ml-6 md:ml-8  px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-lg rounded-full  hover:bg-gray-700 hover:text-white transition-colors duration-300">UPDATE</button>
            </div>
        </div>


        </div>

        </div>
        </div>
    )
}