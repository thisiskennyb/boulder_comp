// const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/";
import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }







export async function logSend(context){
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(context)
  }
  const response = await basicFetch(`http://${host}/api/v1/send/`, payload)
  return response
}




export async function getUserSends(team_id) {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  };

  const response = await basicFetch(`http://${host}/api/v1/send/`, payload);
  // const body = await response.json();
  return response;
}






