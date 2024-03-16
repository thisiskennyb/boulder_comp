export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month/day is less than 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
}


// This function is generic and reuseable, not just for send data
// Currently used for Send and League Objects


export function filterSendData(sendData, selectedProperty, searchQuery){
    /// This function takes in:
    // sendData: A List of Send Objects
    // selectedProperty: A property to search for i.e username, boulder, grade
    // searchQuery: The string the user is searching for

    // Return: List of Send Objects that match selectedProperty and searchQuery

    return sendData.filter(send => {
        // We cast to string and lowercase to handle integers and upper/lowercase issues
        const selected = send[selectedProperty].toString().toLowerCase();

        const query = searchQuery.toLowerCase();
        return selected.includes(query);
    })
}