import React from 'react';
import { motion } from 'framer-motion';

const GradeBar = ({ grade, count, total, barColor }) => {
    const percentage = (count / total) * 100;

    return (
        <div className="flex-1">
            <div className="flex flex-col items-center">
                <div className="bg-gray-300 min-w-8 max-w-full md:min-w-14 h-64 sm:h-48 md:h-64 lg:h-80 xl:h-96 flex flex-col justify-end rounded-md relative">
                    <motion.div
                        className="rounded-md"
                        style={{ height: `${percentage}%`, backgroundColor: barColor }} 
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ duration: 1 }}
                    />
                    <div className="absolute top-max left-0 w-full flex items-center justify-center font-nunito-black font-black text-gray-800">
                        {count} 
                    </div>
                </div>
                <div className="text-white font-nunito-black font-extrabold text-2xl mt-2">{grade}</div>
            </div>
        </div>
    );
};

export default GradeBar;
