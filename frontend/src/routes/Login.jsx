import React, { useState } from 'react';
import Modal from '../components/Modal';
import { XSquare } from 'lucide-react';
import { login, emailResetLink } from '../api/Auth/backend_calls';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Login({ handleToken }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const openModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const context = { username: username, password: password };
    try {
      const response = await login(context);
      if (response.status === 200) {
        toast.success(`Welcome, ${username}!`);
        handleToken(response.data.token);
        navigate("/dashboard");
      } 
    } catch (error) {
      console.error('User Login failed:', error.response?.data || 'An error occurred');
      toast.error('Something went wrong, please double check your information');
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    closeModal();
    const response = await emailResetLink({ email: resetEmail });
    console.log(response, 'what is this thing');
  };

  const handleResetEmailChange = (event) => {
    setResetEmail(event.target.value);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className='bg-night min-h-screen py-20'>
      <div className="flex flex-col items-center justify-center mt-20">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className='font-nunito text-center text-white'>
            Please enter your email address below, and we'll send you a link to reset your password
          </div>
          <div className="flex flex-col items-center">
            <input
              id="login-input-one"
              type="text"
              className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
              placeholder="Email"
              onChange={handleResetEmailChange}
            />
            <div>
              <button onClick={handleResetPassword} className="bg-gray-800 hover:bg-red-700 text-white font-nunito py-2 px-4 border border-white rounded-full">
                Submit
              </button>
            </div>
          </div>
        </Modal>

        <div className="flex flex-col shadow-lg border-solid border-white border w-20px items-center max-w-md p-4 mb-4 bg-gray-800 rounded-xl">
          <label className="font-rubik text-white text-4xl">Login</label>
          <input
            id="login-input-two"
            type="text"
            className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
            placeholder="Username"
            onChange={handleUsernameChange}
          />
          <input
            id="login-input-three"
            type="password"
            className="p-2 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <a onClick={openModal} className="text-sm text-blue-500 font-nunito my-3 hover:text-purple-500" href="">forgot password?</a>
          <button onClick={handleLogin} className="bg-night text-white font-nunito rounded-2xl border border-white hover:bg-gray-800 hover:text-white px-4 py-2 mt-2 transition-colors duration-300">
            Submit
          </button>
        </div>
        <div className="font-nunito text-white">Don't have and account? <Link to='/signup' className="text-blue-500 hover:text-purple-500">Sign Up</Link></div>
      </div>
    </div>
  );
}
