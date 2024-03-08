import React, { useState } from "react";
import { uploadAvatar } from "../api/Auth/backend_calls";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from 'react'
import UserContext from "../contexts/UserContext";


export default function SelectAvatar() {

    const { setUserDashboard } = useContext(UserContext)
    const { userId } = useParams();
    // const [leagueObj, setLeagueObj] = useState('');
    const [picture, setPicture] = useState('');

    const navigate = useNavigate()
    

    const handleUpload = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleSubmit = async () => {
        let userDashboardObj = { avatar: picture };
        const response = await uploadAvatar(userDashboardObj, userId)
        if (response.status == 200) {
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
    console.log(picture)

    return (
        <div className="bg-night min-h-screen flex flex-col justify-center items-center">
            <h2 className="font-nunito text-white">Please Choose your image</h2>
        <input
            className="text-white font-nunito file:bg-gray-800 file:font-nunito file:text-white file:text-lg file:rounded-md file:border file:border-white file:hover:bg-gray-600 file:hover:text-white file:px-4 file:py-2 file:mt-2 file:transition-colors file:duration-300"
            onChange={handleUpload}
            type="file"
        />
        <button
            className="mt-6 bg-gray-800 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300"
            onClick={handleSubmit}
        >
            Submit
        </button>
        </div>
    );
}
