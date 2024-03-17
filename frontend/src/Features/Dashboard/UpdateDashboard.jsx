export default function UpdateDashboard({onClick, onChange, value, userDashboard, selectedField }){
    let dashboardField;
    if (selectedField === "Height"){
        dashboardField = userDashboard.height
    } 
    else if (selectedField === "Weight"){
        dashboardField = userDashboard.weight
    }
    else if (selectedField === "Ape Index"){
        dashboardField = userDashboard.ape_index
    }

    return (
    <>
    
    <div className="flex py-3">
            <div className="font-nunito text-white text-xl md:text-xl px-2">{selectedField}
            {userDashboard && (<span className="px-2">: {dashboardField}</span>)}
            <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-1/12 ml-2"
            /> 
            <button  onClick={onClick} className="ml-4 md:ml-8 px-2 md:px-4 min-w-min bg-night font-nunito-black font-extrabold border border-white text-white text-base rounded-full  hover:bg-gray-700 hover:text-white transition-colors duration-300">UPDATE</button>
            </div>
        </div>

    </>)
}