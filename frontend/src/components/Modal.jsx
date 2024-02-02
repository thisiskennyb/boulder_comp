import React from 'react';
import { XSquare } from 'lucide-react';



const Modal = ({ isOpen, onClose, children }) =>  {
  const modalClasses = isOpen
    ? 'fixed inset-0 overflow-y-auto flex items-center justify-center'
    : 'hidden';



  return (
    <div className={modalClasses}>
      <div className="fixed rounded inset-0 bg-black opacity-50"></div>
      <div className="relative rounded bg-white p-3 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3">
            <div></div> {/* Placeholder for left content */}
            <XSquare onClick={onClose} />
        </div>
        {children}
        {/* <button onClick={onClose} className="absolute top-0 right-0 m-4">
          Close
        </button> */}
      </div>
    </div>
  );
};

export default Modal;