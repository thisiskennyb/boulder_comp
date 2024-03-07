import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadTeamImage } from "../api/Team/backend_calls";


export default function SelectTeamImage() {

    const { teamId } = useParams();
    const [picture, setPicture] = useState('');

    const navigate = useNavigate()
    

    const handleUpload = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleSubmit = async () => {
        let teamObj = { team_picture: picture };
        const response = await uploadTeamImage(teamObj, teamId)
        if (response.status == 200) {
            toast.success(`image uploaded succussfully`);
            navigate(`/team/${teamId}`)

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
