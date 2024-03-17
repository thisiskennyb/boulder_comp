import GradeBar from "../Utils/GradeBar";
import TeamSendTable from "../Team/TeamSendTable"
import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import SearchbarSelect from "../Utils/SearchbarSelect";
import { filterSendData } from "../../utils/utils";
export default function DashboardSends({ handleLogSend, isModalOpen}){
    const {userSends} = useContext(UserContext)
    const [ selectedOption, setSelectedOption ] = useState("") // Used for Search Select state
    const [ searchQuery, setSearchQuery ] = useState(""); // Used for Search Input state
    const options = ['username', 'boulder', 'grade', 'send_date', 'score'] // Field values for SearchbarSelect

    // For filter Select
    const onSelectChange = (e) => {
        setSelectedOption(e.target.value)
        }
    // For filter Search
    const onSearchQueryChange = (e) => {
        setSearchQuery(e.target.value)
        }

    // This is how we handle having list with objects that have objects inside of them
    // Like for example a send has a boulder object inside of it

    const formattedUserSends = userSends.map(send => ({
        id: send.id,
        boulder: send.boulder.name,
        grade: send.boulder.grade,
        crag: send.boulder.crag,
        username: send.username,
        score: send.score,
        send_date: send.send_date
    }))

    // We should monitor where we need to do this, it would make a lot of sense to store our information like this before setting it into state

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
            {!userSends.length && (           
            <div className="flex flex-col items-center text-white">
                <div className="font-nunito text-xl md:text-3xl my-10">Log a send!</div>
                <button className="bg-gray-800 mb-5 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleLogSend}>Log</button>
            </div>
            )}
            {userSends.length && (<>
                <div className="flex justify-center text-white font-nunito-black font-extrabold text-xl py-2 md:py-4 md:text-3xl">Total Sends within 30 Days!</div>
                <div className="flex flex-wrap justify-center w-11/12 md:w-2/3 mx-auto">
           {!isModalOpen && gradeBars}
           </div>
           <div className="grid grid-cols-11 pt-4">
                <div className="col-start-2 grid-span-3 md:col-start-5">
                    <SearchbarSelect searchQuery={searchQuery} onSearchQueryChange={onSearchQueryChange} selectedOption={selectedOption} onSelectChange={onSelectChange} options={options}/>
                    </div>
                    </div>

                </>
                )}    
           
           {!searchQuery && userSends.length && formattedUserSends &&  (
            <TeamSendTable teamSends={formattedUserSends} />
           )}

            {searchQuery && selectedOption && userSends && formattedUserSends &&  (
            <TeamSendTable teamSends={filterSendData(formattedUserSends, selectedOption, searchQuery)} />
           )}
           
      

        </>
    )
}