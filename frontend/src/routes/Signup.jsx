import { useState } from "react";
import { Eye, AlertCircle } from 'lucide-react';
import { signup } from "../api/backend_calls";
import { useNavigate } from "react-router-dom";

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
  const [responseMsg, setResponseMsg] = useState('')

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

    const response = await signup(context);
    console.log(response.username)
    setResponseMsg(response);

    if (response.username) {
      navigate("/signup-message")
    }
  };



  return (
    <>
      <div className="flex mx-auto">
        <div className="flex flex-col items-start justify-center mt-15 md:mt-20 mx-auto">
          <div className="font-nunito">{lengthValid ? '✅' : '❌'} At least 8 characters long</div>
          <div className="font-nunito">{capitalValid ? '✅' : '❌'} At least one capital letter</div>
          <div className="font-nunito">{numberValid ? '✅' : '❌'} At least one number</div>
          <div className="font-nunito">{specialCharValid ? '✅' : '❌'} At least one special character</div>
        </div>
      </div>

      <div className="flex items-center text-red justify-center border-solid">
        <p className="font-nunito"><span><AlertCircle /></span>Sorry, that username is already in use. Please choose another one.</p>
      </div>

      <div className="flex items-center justify-center md:mt-10 mt-20">
        <div className="flex flex-col shadow-lg border-solid border w-20px items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
          <label className="font-rubik font-black text-4xl">Sign Up</label>
          <input
            id="example-input"
            type="text"
            className="p-2 my-2 font-nunito border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Email"
            onChange={handleEmailChange}
          />

          <input
            id="password"
            type="text"
            className="p-2 border my-2 font-nunito border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Username"
            onChange={handleUsernameChange}
          />

          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              className="p-2 border my-2 font-nunito border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
              className="p-2 border my-2 font-nunito border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm password"
              onChange={handleConfirmPasswordChange}
            />
            <div onClick={toggleShowConfirmPassword} className="absolute right-0 top-0 mt-2 bottom-0 p-2 cursor-pointer">
              <Eye />
            </div>
          </div>

          <button onClick={handleRegister} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}


// {"non_field_errors":["Passwords do not match"]}