import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

// Component for navigation links
const NavLinks = () => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        const keyToRemove = 'token';
        localStorage.removeItem(keyToRemove);
        navigate("/login");
    };

    // JSX for navigation links
    return (
        <>
            <Link to='/' style={{ textDecoration: 'none'}}>
                <span className="font-nunito">Home</span>
            </Link>

            <Link to='/profile' style={{ textDecoration: 'none'}}>
                <span className="font-nunito">Dashboard</span>
            </Link>

            <Link to='/leagues-home' style={{ textDecoration: 'none'}}>
                <span className="font-nunito">Leagues</span>
            </Link>
            
            <Link to='/rules-and-scoring' style={{ textDecoration: 'none'}}>
                <span className="font-nunito">Rules/Scoring</span>
            </Link>

            <Link to='/login' style={{ textDecoration: 'none'}}>
                <span className="font-nunito">Login</span>
            </Link>

            {/* Logout link with onClick event handler */}
            <span onClick={handleLogout} className="font-nunito">Logout</span>
        </>
    );
};

// Navigation component
export default function Nav () {
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the navbar on mobile
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    // JSX for navigation bar
    return (
        <>
            <nav className="flex w-1/3 justify-end ml-auto mr-4">
                {/* Navigation links for desktop */}
                <div className="hidden w-[75px] md:flex justify-between w-full">
                    <NavLinks />
                </div>
                {/* Button to toggle navbar on mobile */}
                <div className="ml-auto md:hidden">
                    <button onClick={toggleNavbar}>
                        {/* Conditional rendering for menu icon */}
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>
            {/* Mobile navigation menu */}
            {isOpen && (
                <div className="flex flex-col items-center basis-full">
                    <NavLinks />
                </div>
            )}
        </>
    );
}
