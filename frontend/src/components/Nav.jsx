// import { NavLink } from "react-router-dom"
import { useState } from "react"
import { Menu, X} from "lucide-react";
import { Link } from 'react-router-dom'


// Finish Links when League and Rules / Scoring Page is done
const NavLinks = () => {
    return (
        <>
            <Link to='/' style={{ textDecoration: 'none'}}>
            <span className="font-nunito">Home</span>
            </Link>

            <Link to='/profile' style={{ textDecoration: 'none'}}>
            <span className="font-nunito">Profile</span>
            </Link>

            
            <span className="font-nunito">League</span>
            <span className="font-nunito">Rules/Scoring</span>
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