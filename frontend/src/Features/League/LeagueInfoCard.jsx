export default function LeagueInfoCard({leagues , isSearchQuery, viewHandler }){
    // isSearchQuery lets us know the data needs to be re-formatted for our cards
    // This is due to some issue with using the Send function to filter
    
   
    if (isSearchQuery === true){
        leagues = leagues.map(league => ({
            id: league.id,
            league_name: league.league,
            location: league.city,
            start_date: league.start_date,
            end_date: league.end_date
          }))
    }


 
    // This is a temporary fix till we can find a better way to keep the components reuseable
    return (
    <>
    <div className="flex w-11/12 rounded-lg md:w-4/5 mx-auto text-center bg-gray-800 mt-8">
        <h2 className="text-white w-1/4 text-base font-nunito md:text-2xl md:w-1/5">League</h2>
        <h2 className="text-white w-1/4 text-base font-nunito md:text-2xl md:w-1/5">City</h2>
        <h2 className="text-white w-1/6 text-base font-nunito md:text-2xl md:w-1/5">Start Date</h2>
        <h2 className="text-white w-1/6 text-base font-nunito md:text-2xl md:w-1/5">End Date</h2>
      </div>
   
      <div>
        <hr className="w-11/12 md:w-4/5"></hr>
      </div>



      {leagues && leagues.map((league) => (
        <div key={league.id} className="flex flex-col text-center">
          <div className="flex w-11/12 md:w-4/5 mx-auto bg-gray-700 rounded-lg">
          <h2 className="text-white truncate text-sm font-nunito md:text-xl w-1/4 md:w-1/5">{league.league_name}</h2> {/*Added truncate to handle long league names*/}
          <p className="text-white text-sm font-nunito md:text-xl w-1/4 md:w-1/5">{league.location}</p>
          <p className="text-white text-sm font-nunito md:text-xl w-1/6 md:w-1/5">{league.start_date}</p>
          <p className="text-white text-sm font-nunito md:text-xl w-1/6 md:w-1/5">{league.end_date}</p>
          {/* Div helps position button */}
          <div className="flex justify-center items-center w-1/12 md:w-1/5">
         
          <button className=" bg-gray-800 min-w-min w-1/12 font-nunito text-white text-xs md:text-xl rounded-lg border border-white ml-3 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white  transition-colors duration-300" onClick={() => viewHandler(league.id)}>View</button>
          </div>       
          </div>
          {/* Flex data ends here */}
          <div>
          <hr className="w-11/12 md:w-4/5"></hr>
          </div>
        </div>
      ))}

    </>)
}