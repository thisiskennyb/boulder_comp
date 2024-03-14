import GradeBar from "./GradeBar";

export default function DashboardSends({userSends, handleLogSend, isModalOpen}){
    // This function updates the frequency for user sends
    // Creates a object with {grade: frequency}
    const gradeCounts = userSends.reduce((acc, send) => {
        const grade = send.boulder.grade;
        // accumulate the grade if it exist + 1 or 0 if it does not exist
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
    }, {})

    // Can also get a total number of sends by reducing the values of gradeCounts
    const totalSends = Object.values(gradeCounts).reduce((acc, count) => acc + count, 0);

    // Sorting gradeCounts by grade before mapping
    //Map bars in order to give proper pyramid
    const gradeBars = Object.entries(gradeCounts)
    .sort(([gradeA], [gradeB]) => {
        const gradeNumberA = parseInt(gradeA.slice(1));
        const gradeNumberB = parseInt(gradeB.slice(1));
        return gradeNumberA - gradeNumberB;
    })
    .map(([grade, count]) => (
        <GradeBar key={grade} grade={grade} count={count} total={totalSends} barColor={"#F4AC45"} />
    ));
    
    return (
        <>
        {userSends.length != 0 ? (
            <div className="flex justify-center text-white font-nunito-black font-extrabold text-xl py-2 md:py-4 md:text-3xl">Total Sends within 30 Days!</div>
        ):(
            <div></div>
        )}    
            <div className="flex flex-wrap justify-center w-11/12 md:w-2/3 mx-auto">
                
           {!isModalOpen && gradeBars}
           </div>
      
        {userSends.length == 0 ? (
                    
                        <div className="flex flex-col items-center text-white">
                        <div className="font-nunito text-xl md:text-3xl my-10">Log a send!</div>
                        <button className="bg-gray-800 mb-5 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleLogSend}>Log</button>
                    </div>
        ):(
            <div className="bg-night h-min-h py-2">
            <div className="flex bg-gray-800 w-4/5 mx-auto rounded-lg mt-2">
            <h2 className="text-white text-base md:text-4xl font-nunito w-1/3 text-center">Boulder</h2>
            <h2 className="text-white text-base font-nunito md:text-4xl w-1/3 text-center">Grade</h2>
            <h2 className="text-white text-base font-nunito md:text-4xl w-1/3 text-center">Send Date</h2>
            </div>
            <div className="flex">
                <hr className="w-4/5"></hr>
            </div>
                            {userSends.length > 0 && (
                        userSends.map((send) => (
                            <div key={send.id} className="flex flex-col">
                                <div className="flex bg-gray-700 w-4/5 mx-auto rounded-lg">
                                <h2 className="text-white text-base md:text-xl font-nunito w-1/3 text-center">{send.boulder.name}</h2>
                                <p className="text-white text-base md:text-xl font-nunito w-1/3 text-center">{send.boulder.grade}</p>
                                <p className="text-white text-base md:text-xl font-nunito w-1/3 text-center">{send.send_date}</p>
                                </div>
                                <hr className="w-4/5"></hr>
                            </div>
                            
                        ))
                    )}
        </div>
        )}

        </>
    )
}