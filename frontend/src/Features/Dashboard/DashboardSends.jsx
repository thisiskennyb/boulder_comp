import GradeBar from "../Utils/GradeBar";
import TeamSendTable from "../Team/TeamSendTable"
import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import SearchbarSelect from "../Utils/SearchbarSelect";
import { filterSendData } from "../../utils/utils";




//////////////////////////////////////////////////////
//// Need to refactor this component    /////////////
///// To use postgres data from backend    /////////
////////////////////////////////////////////////////
/////// Need to make user select Crag /////////////
//// Selection should query for all Boulders /////
//////////////////////////////////////////////////
//// Again make them choose an existing boulder //
/// Only let them log if all fields are not blank //
////////////////////////////////////////////////////


/////////////////////////////////////////////////////

/// Till refactor.. calling function to ensure /////
// Data can be retrieved on page                ///

import { getCragBoulders } from "../../api/Boulders/backend_calls";

import Select from 'react-select'




export default function DashboardSends({ handleLogSend, isModalOpen}){
    const {userSends, cragsList} = useContext(UserContext)
    const [ selectedOption, setSelectedOption ] = useState("") // Used for Search Select state
    const [ searchQuery, setSearchQuery ] = useState(""); // Used for Search Input state
    const options = ['username', 'boulder', 'grade', 'send_date', 'score'] // Field values for SearchbarSelect
    ///////////////////////////////////////////////////
    // Needs to be refactored to be used right
    ///////////////////////////////////////////////////
    const [selectedCrag, setSelectedCrag ] = useState("")
    const [boulderOptions, setBoulderOptions ] = useState([])

    // console.log(cragsList, 'WOW HAHAHAHAHAHA')
    console.log(selectedCrag, 'lets see')
    const cragOptions = cragsList.map(crag => ({value:crag, label:crag}));
    
    const handleCragChange = selected => {
        setSelectedCrag(selected)
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            color: 'white',
            borderColor: state.isFocused ? '#7C3AED' : '#4A5568',
            boxShadow: state.isFocused ? '0 0 0 1px #7C3AED' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#7C3AED' : '#4A5568'
            }
        }),
        menu: provided => ({
            ...provided,
            backgroundColor: '#4B5563',
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#7C3AED' : state.isFocused ? '#9CA3AF' : 'transparent',
            color: state.isSelected ? 'white' : 'inherit',
            '&:hover': {
                backgroundColor: '#7C3AED',
                color: 'white'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none' // Remove the indicator separator
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: 'white',
            '&:hover': {
                color: 'white'
            }
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            color: 'white',
            '&:hover': {
                color: 'white'
            }
        }),
        indicatorContainer: (provided, state) => ({
            ...provided,
            color: 'white'
        })
    };

    const CombinedSelect = () => {
        return(
            <div className="text-white bg-red-500">
            <Select
            options={cragOptions}
            isSearchable={true}
            placeholder="Select a crag..."
            value={selectedCrag}
            onChange={handleCragChange}
            styles={customStyles}
            
            /></div>
        )
    }


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
                <CombinedSelect/>
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