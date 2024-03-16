import {useParams, useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import { uploadLeagueImage } from '../../api/League/backend_calls'
import { uploadTeamImage } from '../../api/Team/backend_calls'
import { uploadAvatar } from '../../api/Auth/backend_calls'
import { toast } from "react-toastify";
import UserContext from '../../contexts/UserContext'



export default function UploadImage(){
    const navigate = useNavigate()
    const { setUserDashboard} = useContext(UserContext); // Gets user id info
    const { type, id }  = useParams() // Type tells us what is being updated, id is id of thing to be updated

    const [picture, setPicture] = useState(''); // state for image

    const handleUpload = (e) => {
        setPicture(e.target.files[0]);
    };

    

    const handleSubmitLeague = async () => {
        let leagueObj = { picture: picture };
        const response = await uploadLeagueImage(leagueObj, id)
        if (response.status == 201) {
            toast.success(`image uploaded succussfully`);
            navigate(`/league/${id}`)

        }
        else {
            toast.error('something went wrong')
        }
        
    };

    const handleSubmitTeam = async () => {
        let teamObj = { team_picture: picture };
        const response = await uploadTeamImage(teamObj, id)
        if (response.status == 201) {
            toast.success(`image uploaded succussfully`);
            navigate(`/team/${id}`)
        }
        else {
            toast.error('something went wrong')
        }
    };

    const handleSubmitDashboard = async () => {
        let userDashboardObj = { avatar: picture };
        const response = await uploadAvatar(userDashboardObj, id)
        if (response.status == 201) {
            setUserDashboard(response.data)
            toast.success(`image uploaded succussfully`);
            navigate(`/dashboard`)
            // window.location.reload();

        }
        else {
            toast.error('something went wrong')
        }
        console.log(response.data)
    };
    console.log(id)
    console.log(type)


    return (
        <div className="bg-night min-h-screen flex flex-col justify-center items-center">
            <h2 className="font-nunito text-white">Please Choose your image</h2>
            {type === 'league' && (<>
        <input
            className="text-white font-nunito file:bg-gray-800 file:font-nunito file:text-white file:text-lg file:rounded-md file:border file:border-white file:hover:bg-gray-600 file:hover:text-white file:px-4 file:py-2 file:mt-2 file:transition-colors file:duration-300"
            onChange={handleUpload}
            type="file"
        />
        <button
            className=" bg-gray-800 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-6 transition-colors duration-300"
            onClick={handleSubmitLeague}
        >
            Submit
        </button></>

            )}

        {type === 'team' && (<>
        <input
            className="text-white font-nunito file:bg-gray-800 file:font-nunito file:text-white file:text-lg file:rounded-md file:border file:border-white file:hover:bg-gray-600 file:hover:text-white file:px-4 file:py-2 file:mt-2 file:transition-colors file:duration-300"
            onChange={handleUpload}
            type="file"
        />
        <button
            className="bg-gray-800 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-6 transition-colors duration-300"
            onClick={handleSubmitTeam}
        >
            Submit
        </button></>

            )}

        {type === 'profile' && (<>
        <input
            className="text-white font-nunito file:bg-gray-800 file:font-nunito file:text-white file:text-lg file:rounded-md file:border file:border-white file:hover:bg-gray-600 file:hover:text-white file:px-4 file:py-2 file:mt-2 file:transition-colors file:duration-300"
            onChange={handleUpload}
            type="file"
        />
        <button
            className="bg-gray-800 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-6 transition-colors duration-300"
            onClick={handleSubmitDashboard}
        >
            Submit
        </button></>

            )}

        </div>
    );
}
