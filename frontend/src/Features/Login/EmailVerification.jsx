import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

export default function EmailVerification() {
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=> {
            navigate('/login')
        }, 4000)

    },[])



    return (
        <div className="bg-night min-h-screen py-20">
        <div className="flex items-center justify-center p-4">
            <div className="flex flex-col shadow-lg border-solid border-white w-2/3 md:w-1/2 items-center max-w-md p-4 mb-4 bg-gray-700 rounded-md">
                <h1 className="font-nunito text-center text-white text-4xl md:text-4xl">Success!</h1>
                <div className="font-nunito text-center text-white text-base md:text-lg">Your account has been activated. You can now login!</div>
            </div>
        </div>
        </div>
    
    )
}