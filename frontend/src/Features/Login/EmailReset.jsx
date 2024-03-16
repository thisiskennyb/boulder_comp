import { useState } from "react";
import { Eye } from 'lucide-react';

export default function EmailReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lengthValid, setLengthValid] = useState(false);
  const [capitalValid, setCapitalValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

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

      <div className="flex items-center justify-center mt-20">
        <div className="flex flex-col shadow-lg border-solid border w-20px items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
          <h2 className="font-rubik">Reset Password</h2>

          <div className="relative">
            <input
              id="password-input"
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

          <button className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
