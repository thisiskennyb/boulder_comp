import React, { useState } from 'react';
import Modal from '../components/Modal';
import { XSquare } from 'lucide-react';
import { login, emailResetLink } from '../api/backend_calls';


export default function Login({handleToken})  {

    const [isModalOpen, setModalOpen] = useState(false);
    const [responseMsg, setResponseMsg] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [resetEmail, setResestEmail] = useState('')
    const [test, setTest] = useState('')

    const openModal = (event) => {
        event.preventDefault(); 
        setModalOpen(true);
      };

      const handleLogin = async(e) =>{
        const context = {username: username, password: password}
        const token = await login(context)
        console.log("yo son")
        if(!token) {
          setResponseMsg("Error logging in")
        } else {
        
          handleToken(token)
        //   navigate("/")
        }
    }
    
    const handleUsernameChange = (event) => {
        const usernameValue = event.target.value;
        setUsername(usernameValue)
    }
    

    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue)
    }

    const handleResetPassword = async() => {
        const response = await emailResetLink({email: resetEmail})
        console.log(response)
    }

    const handleResetEmailChange = (event) => {
        const userResetEmail = event.target.value
        setResestEmail(userResetEmail)
    }



    const closeModal = () => setModalOpen(false);

    return (

        <>
        <div className="flex items-center justify-center mt-20">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className='font-nunito text-center'>
                Please enter your email address below, and we'll send you a link to reset your password
            </div>
            <div className="flex flex-col items-center">
                <input
                id="example-input"
                type="text"
                className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                placeholder="Email"
                onChange={handleResetEmailChange}
                />
                <div>
                <button onClick={handleResetPassword} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                    Submit
                </button>
                </div>
            </div>
            </Modal>


        <div className="flex flex-col shadow-lg border-solid border w-20px items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
            <label className="font-rubik font-black text-4xl">Login</label>
            <input
                id="example-input"
                type="text"
                className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                placeholder="Username"
                onChange={handleUsernameChange}
            />

            <input
                id="example-input"
                type="text"
                className="p-2 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                placeholder="Password"
                onChange={handlePasswordChange}
            />
            <a  onClick={openModal} className="text-xs font-nunito my-3" href="">forgot password?</a>
            <button onClick={handleLogin} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </div>
        </div>
        </>    
    )
}