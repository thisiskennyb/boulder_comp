import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './routes/Login'
import Home from './routes/Home'
import EmailReset from './Features/Login/EmailReset'
import EmailVerification from './Features/Login/EmailVerification'
import Signup from './routes/Signup'
import ResetPassword from './Features/Login/ResetPassword'
import SignupMessage from './Features/Login/SignupMessage'
import Dashboard from './routes/Dashboard'
import LeaguesHome from './routes/LeaguesHome'
import RulesScoring from './routes/RulesScoring'
import UserContext from './contexts/UserContext'
import JoinLeague from './routes/JoinLeague'
import CreateLeague from './routes/CreateLeague'
import League from './routes/League'
import Team from './routes/Team'
import NavBar from './Features/Utils/NavBar'

import UploadImage from './Features/Utils/UploadImage'



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For Context
// Gets teams user is a part of, and dashboard info for user

import { getUserDashboard } from './api/UserContext/backend_calls' // Gets us Highest Boulder Grade for user
import { teamsUserIsIn } from './api/UserContext/backend_calls' // Gets all the teams a user is in
import { getUserSends } from './api/UserContext/backend_calls' // Gets all the users sends



function App() {
  const [ userToken, setUserToken ] = useState(null)
  const [ usersTeams, setUsersTeams ] = useState([]);
  const [ userSends, setUserSends ] = useState([])
  const [highestBoulderGrade, setHighestBoulderGrade] = useState(null)
  const [userDashboard, setUserDashboard] = useState(null)


// We have try/catch on all of our backend fetches
// Can access status after await with .status, data with .data

 // Gets user Teams for context
 
  const contextFetchUserTeams = async () => {
    const token = localStorage.getItem('token')
    if (token){
      const teamData = await teamsUserIsIn();
      if (teamData.status == 200){
        setUsersTeams(teamData.data);
      }
    }
  }
  

// Gets user sends for context
  const contextUserSendData = async () => {
    const token = localStorage.getItem('token')
    if (token){
        const sendData = await getUserSends()
        if (sendData.status == 200){
          setUserSends(sendData.data)
        }
      }
    }


// Gets userDashboard for context and highestBoulderGrade
  const contextUserDashboard = async () => {
    if (userToken){
      const response = await getUserDashboard()
      if (response.status == 200){
        setUserDashboard(response.data)
        setHighestBoulderGrade(response.data.highest_boulder_grade)
      }
    }
  }

  
  useEffect( () => {
    const token = localStorage.getItem("token")
    if(token) {
      setUserToken(token) // sets token in context
      contextFetchUserTeams() // Sets teams that user is in context
      contextUserSendData() // Sets user sends in context
      contextUserDashboard() // Sets user dashboard and highest boulder grade in context
    }

  }, [userToken]) // Fixes issue of needing to update after we get token
  // Should set the token, trigger re-render, but this time token won't change


  const handleToken = (token) => {
    localStorage.setItem("token", token)
    setUserToken(token)
  }

  
    return (
      <div>
      <UserContext.Provider value={{
        contextFetchUserTeams,
        contextUserDashboard,
        contextUserSendData,
        userToken,
        usersTeams,
        highestBoulderGrade,
        setHighestBoulderGrade,
        userDashboard,
        setUserDashboard,
        userSends,
        setUserSends
        }}>
      <Router>
        <ToastContainer />
      <NavBar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-reset" element={<EmailReset />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/join-league" element={<JoinLeague />} />
        <Route path="/create-league" element={<CreateLeague />} />
        <Route path="/reset-password/:reset_token" element={<ResetPassword />} />
        <Route path="/signup-message" element={<SignupMessage />} />
        <Route path="/league/:leagueId" element={<League />} />
        <Route path="/team/:teamId" element={<Team />} />

        <Route path="/upload-image/:type/:id?" element={<UploadImage />} />
        
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="/leagues-home" element={<LeaguesHome />} />
        <Route path="/rules-and-scoring" element={<RulesScoring />} />
      </Routes>
      </Router>
      </UserContext.Provider>
      </div>
    )
  }

export default App
