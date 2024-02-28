import React from "react";

const TeamSendTable = ({ teamSends }) => {
  return (
    <div className="overflow-x-auto">
      {/* Desktop/Tablet View */}
      <table className="hidden md:table table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/5">Boulder Name</th>
            <th className="px-4 py-2 w-1/5">Grade</th>
            <th className="px-4 py-2 w-1/5">Username</th>
            <th className="px-4 py-2 w-1/5">Send Date</th>
            <th className="px-4 py-2 w-1/5">Score</th>
          </tr>
        </thead>
        <tbody>
          {teamSends.map((send, index) => (
            <tr key={index}>
              <td className="text-center px-4 py-2 w-1/5">{send.boulder}</td>
              <td className="text-center px-4 py-2 w-1/5">{send.grade}</td>
              <td className="text-center px-4 py-2 w-1/5">{send.username}</td>
              <td className="text-center px-4 py-2 w-1/5">{send.send_date}</td>
              <td className="text-center px-4 py-2 w-1/5">{send.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden items-center divide-y divide-blue-700">
        {teamSends.map((send, index) => (
          <div key={index}>
            
            <p><strong>Boulder:</strong> {send.boulder}</p>
            <p><strong>Grade:</strong> {send.grade}</p>
            <p><strong>Username:</strong> {send.username}</p>
            <p><strong>Send Date:</strong> {send.send_date}</p>
            <p><strong>Score:</strong> {send.score}</p>
            {index !== teamSends.length - 1 && <hr className="border-2 divide-blue-700 mb-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSendTable;
