import React from "react";

const TeamSendTable = ({ teamSends }) => {
  // Sort team send data by date
  const sortedTeamSends = teamSends.sort((a, b) => new Date(b.send_date) - new Date(a.send_date));

  
  return (

    <div key={`container-team-sends-table`}>
      <div key={`header-container-team-sends`} className="flex bg-gray-800 w-11/12 md:w-4/5 mx-auto rounded-lg mt-8 items-center">
        <h2 key={`header-boulder-team-sends`} className="text-white text-base md:text-4xl font-nunito w-1/5 text-center">Boulder</h2>
        <h2 key={`header-grade-team-sends`} className="text-white text-base font-nunito md:text-3xl w-1/5 text-center">Grade</h2>
        <h2 key={`header-username-team-sends`} className="text-white text-base font-nunito md:text-3xl w-1/3 text-center">Username</h2>
        <h2 key={`header-sent-team-sends`} className="text-white text-base font-nunito md:text-3xl w-1/5 text-center">Sent</h2>
        <h2 key={`header-score-team-sends`} className="text-white text-base font-nunito md:text-3xl w-1/5 text-center">Score</h2>
        
      </div>
      <div key={`header-divider-team-sends-container`} className="flex">
        <hr key={`header-divider-team-sends`}className="w-11/12 md:w-4/5"></hr>
      </div>

      {sortedTeamSends?.length > 0 && (
        sortedTeamSends.map((send) => (
            <div key={send.id} className="flex flex-col">
                <div key={`${send.id}_container`} className="flex bg-gray-700 w-11/12 md:w-4/5 mx-auto rounded-lg items-center">
                <h2 key={`${send.id}_boulder`} className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.boulder}</h2>
                <p key={`${send.id}_grade`} className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.grade}</p>
                <p key={`${send.id}_username`} className="text-white text-sm md:text-xl font-nunito w-1/3 text-center">{send.username}</p>
                <p key={`${send.id}_send_date`} className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.send_date}</p>
                <p key={`${send.id}_score`} className="text-white text-sm md:text-xl font-nunito w-1/5 text-center">{send.score}</p>
                

                </div>
                <hr key={`${send.id}_divider`} className="w-11/12 md:w-4/5"></hr>
            </div>            
                ))
            )}
    </div>

  );
};

export default TeamSendTable;
