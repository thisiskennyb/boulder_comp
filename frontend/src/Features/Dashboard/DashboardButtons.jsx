import dashboardLeagueIcon from "../../assets/dashboardLeagueIcon.png"
import boulderCompHome from "../../assets/boulderCompHome.png"
import dashboardFeed from "../../assets/dashboardFeed.png"
import dashboardLogSend from "../../assets/dashboardLogSend.png"

export default function DashboardButtons({handleButtonClick, handleLogSend}){
    return (
    <>
     <div className="flex justify-around md:justify-around py-4">
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={() => handleButtonClick('DashboardLeagues')}>
                  <span><img src={dashboardLeagueIcon} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Leagues
                </button>
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={() => handleButtonClick('DashboardSends')}>
                  <span><img src={boulderCompHome} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Sends
                </button>
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={() => handleButtonClick('DashboardFeed')}>
                  <span><img src={dashboardFeed} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Feed
                </button>
                <button className="text-nunito bg-gray-800 text-white font-nunito rounded-lg flex flex-col items-center justify-center md:px-3 md:py-2  hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleLogSend}>
                  <span><img src={dashboardLogSend} alt="League Icon" className="h-8 md:h12 px-2"/></span>
                  Log Send
                </button>
              </div>

    </>)
}