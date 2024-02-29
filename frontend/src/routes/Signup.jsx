import { useState } from "react";
import { Eye, AlertCircle } from 'lucide-react';
import { signup } from "../api/Auth/backend_calls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lengthValid, setLengthValid] = useState(false);
  const [capitalValid, setCapitalValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null)


  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Check password length
    setLengthValid(newPassword.length >= 8);
    // Check for at least one capital letter
    setCapitalValid(/[A-Z]/.test(newPassword));
    // Check for at least one number
    setNumberValid(/\d/.test(newPassword));
    // Check for at least one special character
    setSpecialCharValid(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
  }

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  
  const handleRegister = async (e) => {
    e.preventDefault();

    const context = {
    email: email,
      username: userName,
      password: password,
      confirm_password: confirmPassword
    };

    try {
      const response = await signup(context);
      if (response.data == 201){
        toast.success('Please check your email to activate your account before logging in') // Should notify user to check email
        console.log(response.username)
        setResponseMsg(response);

      }
      if (response.data.username) {
        navigate("/signup-message")
      }
      else if (response.data.non_field_errors) { //Not sure if needed? Should be able to handle redirect on success and just notify in case of failure
        setResponseMsg(response.data.non_field_errors)
        toast.error('Oops, something went wrong')
      }
      else if (response.data.unavailable) {
        setResponseMsg(response.unavailable)
        toast.error('Oops, something went wrong')
      }
      
    } catch (error) {
      console.error('User creation failed', error.response?.data || 'An error occurred')
    }
    
    
  };


  return (
    <div className="bg-night min-h-screen py-5">
<div className="mt-5">
<div className="flex items-center justify-center mx-auto">
    <div className="flex flex-col items-start">
          <div className="font-nunito text-white">{lengthValid ? '✅' : '❌'} At least 8 characters long</div>
          <div className="font-nunito text-white">{capitalValid ? '✅' : '❌'} At least one capital letter</div>
          <div className="font-nunito text-white">{numberValid ? '✅' : '❌'} At least one number</div>
          <div className="font-nunito text-white">{specialCharValid ? '✅' : '❌'} At least one special character</div>
        </div>
      </div>
      </div>

      <div className="flex items-center justify-center mt-4 h-12">
    {responseMsg ? (
        <div className="font-nunito flex items-center max-w-xs">
            <span className="mr-2"><AlertCircle /></span>
            <span className="text-center text-red-600">{responseMsg}</span>
        </div>
    ) : (
        <div></div>
    )}
      </div>


      <div className="flex items-center justify-center md:mt-10 mt-7">
        <div className="flex flex-col shadow-lg border-solid border-white border w-20px items-center max-w-md p-4 mb-4 bg-gray-800 rounded-md">
          <label className="font-rubik text-white text-4xl">Sign Up</label>
          <input
            id="signup-input"
            type="text"
            className="p-2 my-2 font-nunito border-2 border-gray rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Email"
            onChange={handleEmailChange}
          />

          <input
            id="password"
            type="text"
            className="p-2 border-2 my-2 font-nunito border-gray rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Username"
            onChange={handleUsernameChange}
          />

          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              className="p-2 border-2 my-2 font-nunito border-gray rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <div onClick={toggleShowPassword} className="absolute right-0 top-0 mt-2 bottom-0 p-2 cursor-pointer">
              <Eye />
            </div>
          </div>

          <div className="relative">
            <input
              id="confirm-password-input"
              type={showConfirmPassword ? "text" : "password"}
              className="p-2 border-2 my-2 font-nunito border-gray rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm password"
              onChange={handleConfirmPasswordChange}
            />
            <div onClick={toggleShowConfirmPassword} className="absolute right-0 top-0 mt-2 bottom-0 p-2 cursor-pointer">
              <Eye />
            </div>
          </div>

          <button onClick={handleRegister} className="bg-night text-white font-nunito rounded-2xl border border-jet hover:bg-gray hover:text-white px-4 py-2 mt-2 transition-colors duration-300">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

