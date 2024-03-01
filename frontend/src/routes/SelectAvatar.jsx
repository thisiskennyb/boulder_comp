import React, { useState } from "react";
import { uploadAvatar } from "../api/Auth/backend_calls";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SelectAvatar() {

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
            toast.success(`image uploaded succussfully`);
            navigate(`/dashboard`)

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
