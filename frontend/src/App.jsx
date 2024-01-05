import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './routes/Login'
import Home from './routes/Home'
import UserProfile from './routes/UserProfile'
import EmailReset from './routes/EmailReset'
import EmailVerification from './routes/EmailVerification'
import './App.css'
import Header from './components/Header';
import Signup from './routes/Signup'
import ResetPassword from './routes/ResetPassword'

function App() {

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <div>


    <Header />

    <Router>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/email-reset" element={<EmailReset />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
     </Routes>
     </Router>
     </div>
  )
}

export default App
