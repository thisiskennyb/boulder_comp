import React, { useState } from "react";
// import { editLeague } from "../api/League/backend_calls";
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";

export default function SelectLeagueImage() {
    const [leagueObj, setLeagueObj] = useState('');
    const [picture, setPicture] = useState('');
    

    const handleUpload = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleSubmit = async () => {
        let leagueObj = { picture: picture };
        let formData = new FormData();
        formData.append("picture", leagueObj.picture);
        const context = {
            method: "PUT",
            body: formData,
            
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`,
      
            },
        };
        const url = `http://${host}/api/v1/league/4`
        const response = await fetch(url, context);
        const body = await response.json();
        if (response.status === 400) {
            console.log('you suck')
        } else {
            console.log(body);
            // navigate("/")
        }
    };
    console.log(picture)

    return (
        <div>
            <input onChange={handleUpload} type="file"></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
