export default function ActiveCheckbox({showActive, toggleActiveFilter}){
    return (
        // we define a width on this because we do not want our text and the checkbox to recenter each time

    <div className="flex flex-row mx-auto w-11/12 md:w-1/2"> 
          <div className="flex items-center">
        <input
        id="activeCheckbox"
        type="checkbox"
        checked={showActive}
        onChange={toggleActiveFilter}
        className="form-checkbox h-4 w-4 text-gray-700 flex-initial" // Keeps the checkbox in its initial position
        />
      </div>
        <p className=" text-white font-nunito text-base ml-1">{showActive ? ("Show only leagues that haven't started yet"):("Show all leagues")}</p>

    </div>)
}