import { useState } from "react"


export default function Signup () {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    return(
        <>
        <div className="flex mx-auto justify-center sticky fixed mt-15 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
            <label>Login</label>
            <input
                id="example-input"
                type="text"
                className="p-2 my-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Email"
            />

            <input
                id="example-input"
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Username"
            />
            <input
                id="example-input"
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Password"
            />
            <input
                id="example-input"
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Confirm Password"
            />
            
            <button className="mt-3">Submit</button>
        </div>
        </div>
        </>   
    )
}