import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";




export async function getAllCrags(){
    try {
        const response = axios.get(`http://${host}/api/v1/boulders/crags-list/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        return response
    } catch (error) {
        console.error("Something went wrong in getAllCrags", error.response.status)
        throw error
    }
}


export async function getCragBoulders(context){
    try {
        const response = axios.get(`http://${host}/api/v1/boulders/crag-boulders/`,{
        params: {
            crag: context.crag
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
        })
        return response
    } catch (error) {
        console.error("Something went wrong in getAllCrags", error.response.status)
        throw error
    }
}


