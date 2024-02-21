import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userToken, setUserToken] = useState(null)

  

  // console.log(userToken, "State of userToken in App")
  
  useEffect( () => {
    const token = localStorage.getItem("token")
    if(token) {
      setUserToken(token)
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
    <UserContext.Provider value={{userToken}}>
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
      <Route path="/league" element={<League />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leagues-home" element={<LeaguesHome />} />
      <Route path="/rules-and-scoring" element={<RulesScoring />} />
     </Routes>
     </Router>
     </UserContext.Provider>
     </div>
  )
}

export default App
