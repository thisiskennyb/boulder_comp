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
import DashboardInfo from './Features/Dashboard/DashboardInfo'
import Leagues from './routes/Leagues'
import RulesScoring from './routes/RulesScoring'
import UserContext from './contexts/UserContext'
import LeagueDisplay from "./Features/League/LeagueDisplay"
import CreateLeague from './Features/League/CreateLeague'
import SelectedLeague from './routes/SelectedLeague'
import Team from './routes/Team'
import NavBar from './Features/Utils/NavBar'
import UploadImage from './Features/Utils/UploadImage'
import TestDjoser from './routes/TestDjoser'



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For Context
// Gets teams user is a part of, and dashboard info for user

import { getUserDashboard } from './api/UserContext/backend_calls' // Gets us Highest Boulder Grade for user
import { teamsUserIsIn } from './api/UserContext/backend_calls' // Gets all the teams a user is in
import { getUserSends } from './api/UserContext/backend_calls' // Gets all the users sends
import { getAllCrags } from './api/Boulders/backend_calls' // Gets all the crag names from our db
import { getCragBoulders } from './api/Boulders/backend_calls' // Gets all the boulders for a selected crag name




function App() {
  /////////// All of this state is stored in app and passed through context //////////////////////
  const [ userToken, setUserToken ] = useState(null)
  const [ usersTeams, setUsersTeams ] = useState([]); 
  const [ userSends, setUserSends ] = useState([]) 
  const [highestBoulderGrade, setHighestBoulderGrade] = useState(null) 
  const [userDashboard, setUserDashboard] = useState(null) 
  const [ cragsList, setCragsList ] = useState([]);
  const [selectedCrag, setSelectedCrag ] = useState("")
  const [selectedBoulder, setSelectedBoulder ] = useState("")
  const [ bouldersList, setBoulderList ] = useState([]);
  


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


// Gets list of crags for context
  const contextCragsList = async () => {
    const token = localStorage.getItem('token')
    if (token){
        const cragNames = await getAllCrags()
        if (cragNames.status == 200){
          setCragsList(cragNames.data)
        }
      }
    }
  
// Get list of boulders for context, this should depend on the select crag from the list of selected crags

  const contextBouldersList = async (crag) => {
    const token = localStorage.getItem('token')
    if (token){
      const boulderNames = await getCragBoulders(crag)
      if (boulderNames.status === 200){
        setBoulderList(boulderNames.data)
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

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token && selectedCrag) {
      contextBouldersList(selectedCrag)
    }
  }, [selectedCrag] )

  
  useEffect( () => {
    const token = localStorage.getItem("token")
    if(token) {
      setUserToken(token) // sets token in context
      contextFetchUserTeams() // Sets teams that user is in context
      contextUserSendData() // Sets user sends in context
      contextUserDashboard() // Sets user dashboard and highest boulder grade in context
      contextCragsList() // Sets list of crags in context for choosing sends
    }

  }, [userToken]) // Fixes issue of needing to update after we get token
  // Should set the token, trigger re-render, but this time token won't change


  const handleToken = (token) => {
    localStorage.setItem("token", token)
    setUserToken(token)
  }

  const handleCragChange = selected => {
    setSelectedCrag(selected)
  }
  const handleBoulderChange = selected => {
    setSelectedBoulder(selected)
  }

  
    return (
      <div>
      <UserContext.Provider value={{
        contextFetchUserTeams,
        contextUserDashboard,
        contextUserSendData,
        cragsList,
        selectedCrag,
        bouldersList,
        selectedBoulder,
        handleCragChange,
        handleBoulderChange,
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
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/signup" element={<Signup />} />
        {/* Line up with navbar links */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/rules-and-scoring" element={<RulesScoring />} />
        {/* Paths available from League Page */}
        {/* Displays all leagues */}
        <Route path="/all-leagues" element={<LeagueDisplay />} />
        {/* Creates a League */}
        <Route path="/create-league" element={<CreateLeague />} />
        {/* Looking at a specific League */}
        <Route path="/league/:leagueId" element={<SelectedLeague />} />
        {/* Looking at a specific team */}
        <Route path="/team/:teamId" element={<Team />} />
        {/* Login / Signup Related */}
        <Route path="/email-reset" element={<EmailReset />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/reset-password/:reset_token" element={<ResetPassword />} />
        <Route path="/signup-message" element={<SignupMessage />} />
        {/* Handles Avatar, Team and League Image Uploads */}
        <Route path="/upload-image/:type/:id?" element={<UploadImage />} />
        <Route path="/edit-profile" element={<DashboardInfo />} />
        <Route path="/test" element={<TestDjoser />} />
        
      </Routes>
      </Router>
      </UserContext.Provider>
      </div>
    )
  }

export default App
