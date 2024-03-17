export default function FileUpload({handleUpload, handleSubmit}){
    
    return (
    <>
    <input
            className="text-white font-nunito file:bg-gray-800 file:font-nunito file:text-white file:text-lg file:rounded-md file:border file:border-white file:hover:bg-gray-600 file:hover:text-white file:px-4 file:py-2 file:mt-2 file:transition-colors file:duration-300"
            onChange={handleUpload}
            type="file"
        />
        <button
            className=" bg-gray-800 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-6 transition-colors duration-300"
            onClick={handleSubmit}
        >
            Submit
        </button>

    </>)
}