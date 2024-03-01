import React, { useState } from "react";
import { uploadLeagueImage } from "../api/League/backend_calls";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SelectLeagueImage() {

    const { leagueId } = useParams();
    const [leagueObj, setLeagueObj] = useState('');
    const [picture, setPicture] = useState('');

    const navigate = useNavigate()
    

    const handleUpload = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleSubmit = async () => {
        let leagueObj = { picture: picture };
        const response = await uploadLeagueImage(leagueObj, leagueId)
        if (response.status == 200) {
            toast.success(`image uploaded succussfully`);
            navigate(`/league/${leagueId}`)

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
