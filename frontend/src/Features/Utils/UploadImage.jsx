import {useParams, useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import { uploadLeagueImage } from '../../api/League/backend_calls'
import { uploadTeamImage } from '../../api/Team/backend_calls'
import { uploadAvatar } from '../../api/Auth/backend_calls'
import { toast } from "react-toastify";
import UserContext from '../../contexts/UserContext'
import FileUpload from './FileUpload'

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
    };
   

    return (
        <div className="bg-night min-h-screen flex flex-col justify-center items-center">
            <h2 className="font-nunito text-white">Please Choose your image</h2>
        {type === 'league' && (<FileUpload handleUpload={handleUpload} handleSubmit={handleSubmitLeague} />) }
        {type === 'team' && (<FileUpload handleUpload={handleUpload} handleSubmit={handleSubmitTeam} /> )}
        {type === 'profile' && ( <FileUpload handleUpload={handleUpload} handleSubmit={handleSubmitDashboard} /> )}
        </div>
    );
}
