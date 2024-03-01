
import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";


// "league_name": "Testing Team E",
// "start_date": "2024-02-28",
// "end_date": "2024-04-28",
// "team_size": 4,
// "location": "Chattanooga"
  export async function createLeague(context) {
    let formData = new FormData();
    formData.append("league_name", context.league_name);
    formData.append("start_date", context.start_date);
    formData.append("end_date", context.end_date);
    formData.append("team_size", context.team_size);
    formData.append("location", context.location);
    formData.append("picture", context.picture);
    try {
      const response = axios.post(`http://${host}/api/v1/league/`, formData, {
        headers: {
          
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




