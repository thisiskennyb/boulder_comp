import { Eye } from 'lucide-react';
import { useState } from "react";
import { emailResetConfirm } from '../../api/Auth/backend_calls';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { reset_token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lengthValid, setLengthValid] = useState(false);
  const [capitalValid, setCapitalValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [password, setPassword] = useState('');

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
  };

  const handleConfirmPassword = async (e) => {
    e.preventDefault();

    const context = {
      "password": password,
      "token": reset_token,
    };

    try {
      const response = await emailResetConfirm(context);
      if (response.status === 200) {
        toast.success('Your password has been changed! Go ahead and try to login');
        navigate('/login');
      } else {
        toast.error('Whoops something went wrong');
      }
    } catch (error) {
      console.error('Error confirming email reset', error.response?.data || 'An error occurred');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-night min-h-screen">
      <div className="py-5">
        <div className="flex items-center text-white font-nunito text-base justify-center mx-auto">
          <div className="flex flex-col items-start">
            <div>{lengthValid ? '✅' : '❌'} At least 8 characters long</div>
            <div>{capitalValid ? '✅' : '❌'} At least one capital letter</div>
            <div>{numberValid ? '✅' : '❌'} At least one number</div>
            <div>{specialCharValid ? '✅' : '❌'} At least one special character</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center md:mt-10 mt-7">
        <div className="flex flex-col shadow-lg border-solid border-white w-2/3 md:w-1/3 items-center p-8 bg-gray-700 rounded-md">
          <label className="font-nunito text-white font-black text-3xl md:text-4xl py-2">Reset Password</label>

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
            />
            <div onClick={toggleShowConfirmPassword} className="absolute right-0 top-0 mt-2 bottom-0 p-2 cursor-pointer">
              <Eye />
            </div>
          </div>

          <button onClick={handleConfirmPassword} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito mt-4 py-2 px-4 md:text-lg md:py-3 md:px-6 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
