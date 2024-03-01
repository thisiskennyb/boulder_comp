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
        <div>
            <input onChange={handleUpload} type="file"></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
