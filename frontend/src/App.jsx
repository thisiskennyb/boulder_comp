import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom"
import Login from './routes/Login'
import Home from './routes/Home'
import UserProfile from './routes/UserProfile'
import EmailReset from './routes/EmailReset'
import EmailVerification from './routes/EmailVerification'
import './App.css'
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



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For Context
// Gets teams user is a part of, and dashboard info for user
import { teamsUserIsIn, getUserDashboard } from './api/backend_calls'



function App() {

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userToken, setUserToken] = useState(null)
  const [usersTeams, setUsersTeams] = useState([]);
  const [highestBoulderGrade, setHighestBoulderGrade] = useState(null)

  let { leagueId } = useParams();
  let { teamId } = useParams();

 // This is here to be used in context from dashboard
  const fetchUserTeams = async () => {
    const token = localStorage.getItem('token')
    if (token){
        try {
            const teamData = await teamsUserIsIn();
            setUsersTeams(teamData);
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
  if (userDashboard['highest_boulder_grade']){
      setHighestBoulderGrade(userDashboard['highest_boulder_grade'])
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

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };




  return (
    <div>
    <UserContext.Provider value={{
      userToken,
      usersTeams,
      fetchUserTeams,
      highestBoulderGrade,
      setHighestBoulderGrade
      }}>
    <Router>
      <ToastContainer />
    <Header />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login handleToken={handleToken} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
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
     </Routes>
     </Router>
     </UserContext.Provider>
     </div>
  )
}

export default App
