export default function DashboardSends({userSends}){
    return (

        <div className="bg-night">
            <div className="flex bg-gray-800 w-4/5 mx-auto rounded-lg">
            <h2 className="text-white text-base md:text-4xl font-nunito w-1/3 text-center">Boulder</h2>
            <h2 className="text-white text-base font-nunito md:text-4xl w-1/3 text-center">Grade</h2>
            <h2 className="text-white text-base font-nunito md:text-4xl w-1/3 text-center">Send Date</h2>
            </div>
            <div className="flex">
                <hr className="w-4/5"></hr>
            </div>
                            {userSends.length > 0 && (
                        userSends.map((send, index) => (
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
    )
}