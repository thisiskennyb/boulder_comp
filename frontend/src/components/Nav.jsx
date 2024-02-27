import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { Menu, X} from "lucide-react";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";


const NavLinks = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token')


    const handleLogout = () => {
        var keyToRemove = 'token';
        localStorage.removeItem(keyToRemove);
        navigate("/login");
      }



      const handleLeaguesNavigate = () => {
        if (token) {
            navigate("/leagues-home")
        }
        else {
            toast.error('You must be logged in')
            navigate("/login")
        }
      }

      const handleDashboardNavigate = () => {
        if (token) {
            navigate("/dashboard")
        }
        else {
            toast.error('You must be logged in')
            navigate("/login")
        }
      }

      const handleHomeNavigate = () => {
        navigate("/")
      }

      const handleScoringNavigate = () => {
        navigate("/rules-and-scoring")
      }

      const handleLoginNavigate = () => {
        navigate("/login")
      }
      






    return (
        <>
            
            <span onClick={handleHomeNavigate} className="font-nunito">Home</span>
            <span onClick={handleDashboardNavigate} className="font-nunito">Dashboard</span>
            <span onClick={handleLeaguesNavigate} className="font-nunito">Leagues</span>
            <span onClick={handleScoringNavigate} className="font-nunito">Scoring</span>
            {token ? (<span onClick={handleLogout} className="font-nunito">Logout</span>):(<span onClick={handleLoginNavigate} className="font-nunito">Login</span>)}
            
        </>
    )
}


export default function Nav () {
    const [isOpen, SetIsOpen] = useState()

    const toggleNavbar = () => {
        SetIsOpen(!isOpen);
    }

    return (
        <>
        <nav className="flex w-1/3 justify-end ml-auto mr-4">
            <div className="hidden w-[75px] md:flex justify-between w-full">
                <NavLinks />

            </div>
            <div className="ml-auto md:hidden">
                <button onClick={toggleNavbar}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
        {isOpen && (
            <div className="flex flex-col items-center basis-full">
            <NavLinks />
            </div>
        )}
        </>
    )
}