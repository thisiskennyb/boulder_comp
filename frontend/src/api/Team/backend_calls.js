import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";

// Gets all the teams in a specific league
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

  // Gets a specific team
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

    // This gets used in the following component: components/TeamSendTable.jsx
    export async function joinTeam(context) {
        try {
          const response = axios.post(`http://${host}/api/v1/team/join-team`, context, {
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


      // Used in League.jsx
      // Creates a team in a league
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






      export async function uploadTeamImage(context, teamId) {
  
        let formData = new FormData();
        formData.append("team_picture", context.team_picture);
        try {
          const response = axios.put(`http://${host}/api/v1/team/${teamId}`, formData, {
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