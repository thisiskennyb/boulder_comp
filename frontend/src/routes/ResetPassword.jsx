import { Eye, AlertCircle } from 'lucide-react';
import { useState } from "react";


export default function (){
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
      }
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      }
    
      const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
      }



    return (
        <>
        <div className="mt-5">
            <div className="flex items-center justify-center mx-auto">
                <div className="flex flex-col items-start">
                    <div className="font-nunito">{lengthValid ? '✅' : '❌'} At least 8 characters long</div>
                    <div className="font-nunito">{capitalValid ? '✅' : '❌'} At least one capital letter</div>
                    <div className="font-nunito">{numberValid ? '✅' : '❌'} At least one number</div>
                    <div className="font-nunito">{specialCharValid ? '✅' : '❌'} At least one special character</div>
                </div>
            </div>
        </div>


      <div className="flex items-center justify-center md:mt-10 mt-7">
        <div className="flex flex-col shadow-lg border-solid border w-20px items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
          <label className="font-rubik font-black text-4xl">Reset Password</label>

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
            //   onChange={handleConfirmPasswordChange}
            />
            <div onClick={toggleShowConfirmPassword} className="absolute right-0 top-0 mt-2 bottom-0 p-2 cursor-pointer">
              <Eye />
            </div>
          </div>

          <button className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </div>
        </>
    )
}