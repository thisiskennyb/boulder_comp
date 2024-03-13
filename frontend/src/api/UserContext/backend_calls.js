import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";


// Gets users dashboard
export async function getUserDashboard(){
    try {
        const response = axios.get(`http://${host}/api/v1/accounts/register/create_dashboard/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        return response
    } catch (error) {
        console.error("Something went wrong in getUserDashboard")
        throw error
    }
  }

// Gets all of the sends for a User
export async function getUserSends() {
    try {
        const response = axios.get(`http://${host}/api/v1/send/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        return response
    } catch (error) {
        console.error("Something went wrong in getUserSends", error.response.status)
        throw error
    }
  }

// Gets all of the teams a user is on
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