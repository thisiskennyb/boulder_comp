export default function Login() {

    return (

        <>
        <div className="flex items-center justify-center mt-20">
        {/* <div className="flex mx-auto w-10px justify-center sticky fixed mt-15 top-1/2 transform -translate-y-1/2"> */}
        <div className="flex flex-col shadow-lg border-solid border w-20px items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
            <label className="font-rubik font-black text-4xl">Login</label>
            <input
                id="example-input"
                type="text"
                className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                placeholder="Email"
            />

            <input
                id="example-input"
                type="text"
                className="p-2 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                placeholder="Password"
            />
            <a className="text-xs font-nunito my-3" href="">forgot password?</a>
            <button class="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </div>
        </div>
        </>    
    )
}