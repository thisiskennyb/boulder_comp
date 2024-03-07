export default function SignupMessage() {
    return (
      <div className="bg-night min-h-screen">
      <div className="flex items-center justify-center py-20 bg-night">
        <div className="flex flex-col shadow-lg border-solid border-2 w-1/2 md:w-1/3 items-center p-4 bg-gray-800 rounded-md border-white">
          <h1 className="font-nunito text-center text-white text-3xl md:text-4xl">Thank you for signing up!</h1>
          <div className="font-nunito text-center text-white text-base md:text-xl">To activate your account, please check your email and click on the activation link we've sent you. If you don't see the email within a few minutes, please check your spam or junk folder.</div>
        </div>
      </div>
      </div>
    );
  }