
import searchIconWhite from "../../assets/searchIconWhite.png"

export default function SearchbarSelect({searchQuery, onSearchQueryChange, selectedOption, onSelectChange}){

    /// These are the options for filtering a send

    const options = ['username', 'boulder', 'grade', 'send_date', 'score']


    return (
    <>
    <div className="flex align-items-center h-10 md:h-12">
        
        <input
        type="text"
        placeholder="Search filter"
        value={searchQuery}
        onChange={onSearchQueryChange}
        className="py-2 px-2 border rounded-md"
        />
        <img src={searchIconWhite} alt='search-icon' className="mx-4"/>



        <select
        value={selectedOption}
        onChange={onSelectChange}
        className="py-2 px-2 border rounded-md bg-white text-gray-700 appearance-none"
        >
            <option value="">Filter by...</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    
        </div>
    </>)
}