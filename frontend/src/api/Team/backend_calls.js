import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";


// This gets used in the following component: League.jsx
export async function getTeamsByLeague(league_id) {
    try {
      const response = axios.get(`http://${host}/api/v1/team/league/${league_id}`, {
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


  // This gets used in the following component: Team.jsx
  export async function getTeam(team_id) {
    try {
      const response = axios.get(`http://${host}/api/v1/team/${team_id}`, {
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

    // This gets used in the following component: Team.jsx
    export async function joinTeam(context) {
        try {
          const response = axios.post(`http://${host}/api/v1/team/`, context, {
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



      export async function createTeam(context){
        try {
          const response = await axios.post(`http://${host}/api/v1/league/create_team/`, context, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("token")}`
      
            }
          })
          return response
        } catch (error) {
          console.error('Error in join team')
          throw error
        }
      }






