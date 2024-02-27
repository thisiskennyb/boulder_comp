export default function SignupMessage() {
    return (
      <div className="flex items-center justify-center mt-20 mx-4">
        <div className="flex flex-col shadow-lg border-solid border w-20px items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
          <h1 className="font-rubik text-center">Thank you for signing up!</h1>
          <div className="font-nunito text-center">To activate your account, please check your email and click on the activation link we've sent you. If you don't see the email within a few minutes, please check your spam or junk folder.</div>
        </div>
      </div>
    );
  }