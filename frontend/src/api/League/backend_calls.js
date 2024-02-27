
import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";

  export async function createLeague(context) {
    try {
      const response = axios.post(`http://${host}/api/v1/league/`, context, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      })
      return response
    } catch (error) {
      console.error('Something went wrong in createLeague')
      throw error
    }
  }


  export async function getSingleLeague(league_id) {
    try {
      const response = axios.get(`http://${host}/api/v1/league/${league_id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem('token')}`
        }
      })
      return response
    } catch (error) {
      console.error('Something went wrong in createLeague')
      throw error
    }
  }



// This gets used in the following component: App.jsx
export async function teamsUserIsIn() {
  try {
    const response = axios.get(`http://${host}/api/v1/league/create_team/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    })
    return response
  } catch (error) {
    console.error('Something went wrong in createLeague')
    throw error
  }
}


// This gets used in the following component: JoinLeague.jsx
export async function getAllLeagues() {
  try {
    const response = axios.get(`http://${host}/api/v1/league/all/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    })
    return response
  } catch (error) {
    console.error('Something went wrong in createLeague')
    throw error
  }
}




