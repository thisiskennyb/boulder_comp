export default function DashboardSends({userSends}){
    return (

        <>
                            {userSends.length > 0 && (
                        userSends.map((send) => (
                            <div key={send.id}>
                                <h2>Boulder: {send.boulder.name}</h2>
                                <p>grade: {send.boulder.grade}</p>
                                <p>date: {send.send_date}</p>
                            </div>
                        ))
                    )}
        </>
    )
}