import React from "react";

const TeamSendTable = ({ teamSends }) => {
  return (

    <div className="">
      <div className="flex bg-gray-800 w-11/12 md:w-4/5 mx-auto rounded-lg mt-8 items-center">
        <h2 className="text-white text-base md:text-4xl font-nunito w-1/5 text-center">Boulder</h2>
        <h2 className="text-white text-base font-nunito md:text-3xl w-1/5 text-center">Grade</h2>
        <h2 className="text-white text-base font-nunito md:text-3xl w-1/3 text-center">Username</h2>
        <h2 className="text-white text-base font-nunito md:text-3xl w-1/5 text-center">Sent</h2>
        <h2 className="text-white text-base font-nunito md:text-3xl w-1/5 text-center">Score</h2>
        
      </div>
      <div className="flex">
        <hr className="w-11/12 md:w-4/5"></hr>
      </div>

      {teamSends?.length > 0 && (
        teamSends.map((send, index) => (
            <div key={send.id} className="flex flex-col">
                <div className="flex bg-gray-700 w-11/12 md:w-4/5 mx-auto rounded-lg items-center">
                <h2 className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.boulder}</h2>
                <p className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.grade}</p>
                <p className="text-white text-sm md:text-xl font-nunito w-1/3 text-center">{send.username}</p>
                <p className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.send_date}</p>
                <p className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.score}</p>
                

                </div>
                <hr className="w-11/12 md:w-4/5"></hr>
            </div>            
                ))
            )}
    </div>

  );
};

export default TeamSendTable;
