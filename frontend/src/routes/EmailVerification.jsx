import {useNavigate} from 'react-router-dom'

export default function EmailVerification() {
    const navigate = useNavigate()

    setTimeout(()=> {
        navigate('/login')
    }, 4500)


    return (
        <div className="flex items-center justify-center mt-20">
            <div className="flex flex-col shadow-lg border-solid border w-20px items-center max-w-md p-4 mb-4 bg-gray-100 rounded-md">
                <h1 className="font-rubik">Success!</h1>
                <div className="font-nunito">Your account has been activated</div>
                <div className="font-nunito">You can now login</div>
            </div>
        </div>
    
    )
}