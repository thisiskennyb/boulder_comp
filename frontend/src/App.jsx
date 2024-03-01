import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './routes/Login'
import Home from './routes/Home'
import EmailReset from './routes/EmailReset'
import EmailVerification from './routes/EmailVerification'
import Header from './components/Header';
import Signup from './routes/Signup'
import ResetPassword from './routes/ResetPassword'
import SignupMessage from './routes/SignupMessage'
import Dashboard from './routes/Dashboard'
import LeaguesHome from './routes/LeaguesHome'
import RulesScoring from './routes/RulesScoring'
import UserContext from './contexts/UserContext'
import JoinLeague from './routes/JoinLeague'
import CreateLeague from './routes/CreateLeague'
import League from './routes/League'
import Team from './routes/Team'
import NavBar from './components/NavBar'
import SelectLeagueImage from './routes/SelectLeagueImage'
import SelectTeamImage from './routes/SelectTeamImage'
import SelectAvatar from './routes/SelectAvatar'



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For Context
// Gets teams user is a part of, and dashboard info for user

import { getUserDashboard } from './api/Auth/backend_calls'
import { teamsUserIsIn } from './api/League/backend_calls'





function App() {
  const [userToken, setUserToken] = useState(null)
  const [usersTeams, setUsersTeams] = useState([]);
  const [highestBoulderGrade, setHighestBoulderGrade] = useState(null)
  const [userDashboard, setUserDashboard] = useState(null)


 // This is here to be used in context from dashboard
  const fetchUserTeams = async () => {
    const token = localStorage.getItem('token')
    if (token){
        try {
            const teamData = await teamsUserIsIn();
            setUsersTeams(teamData.data);
        } catch (error) {
            console.error("Error fetching leagues:", error)
        }
    }
}

// This gets highest boulder grade or lets us know the user needs to update it at dashboard
// if highest_boulder_grade is not present, highestBoulderGrade will stay null
// We use this to send a post request at dashboard
const getHighestBoulderGrade = async () => {
  const userDashboard = await getUserDashboard()
  setUserDashboard(userDashboard.data)
  if (userDashboard['data']['highest_boulder_grade']){
      setHighestBoulderGrade(userDashboard['data']['highest_boulder_grade'])
  }
}
  
  useEffect( () => {
    const token = localStorage.getItem("token")
    if(token) {
      setUserToken(token)
      fetchUserTeams()
      getHighestBoulderGrade()
    }

  }, [])

  const handleToken = (token) => {
    localStorage.setItem("token", token)
    setUserToken(token)
  }

   console.log(usersTeams)
  return (
    <div>
    <UserContext.Provider value={{
      userToken,
      usersTeams,
      fetchUserTeams,
      highestBoulderGrade,
      setHighestBoulderGrade,
      userDashboard
      }}>
    <Router>
      <ToastContainer />
    {/* <Header /> */}
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
      <Route path="/dashboard" element={<Dashboard  />} />
      <Route path="/leagues-home" element={<LeaguesHome />} />
      <Route path="/rules-and-scoring" element={<RulesScoring />} />
      <Route path="/select-league-image/:leagueId" element={<SelectLeagueImage />} />
      <Route path="/select-team-image/:teamId" element={<SelectTeamImage />} />
      <Route path="/select-avatar-image/:userId" element={<SelectAvatar />} />
     </Routes>
     </Router>
     </UserContext.Provider>
     </div>
  )
}

export default App
