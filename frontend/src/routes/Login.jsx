import React, { useState } from 'react';
import Modal from '../components/Modal';
import { XSquare } from 'lucide-react';


export default function Login() {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (event) => {
        event.preventDefault(); 
        setModalOpen(true);
      };

    const closeModal = () => setModalOpen(false);

    return (

        <>
        <div className="flex items-center justify-center mt-20">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className='font-nunito text-center'>
                Please enter your email address below, and we'll send you a link to reset your password
            </div>
            <div className="flex flex-col items-center">
                <input
                id="example-input"
                type="text"
                className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                placeholder="Email"
                />
                <div>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                    Submit
                </button>
                </div>
            </div>
            </Modal>


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
            <a  onClick={openModal} className="text-xs font-nunito my-3" href="">forgot password?</a>
            <button class="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </div>
        </div>
        </>    
    )
}