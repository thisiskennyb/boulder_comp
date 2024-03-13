import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";


export async function logSend(context){
    try {
        const response = axios.post(`http://${host}/api/v1/send/`, context, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        return response
    } catch (error) {
        console.error("Something went wrong in logSend", error.response.status)
        throw error
    }
  }

