// const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/";
import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }


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

export async function leaguesUserIsIn() {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
    // no body
  }
  const response = await basicFetch(`http://${host}/api/v1/league/`, payload)
  return response
}

export async function teamsUserIsIn() {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
    // no body
  }
  const response = await basicFetch(`http://${host}/api/v1/league/create_team/`, payload)
  return response
}


export async function getSingleLeague(league_id) {


  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
    // no body
  }

  const response = await basicFetch(`http://${host}/api/v1/league/${league_id}`, payload)
  return response
}

export async function getAllLeagues() {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
    // no body
  }
  const response = await basicFetch(`http://${host}/api/v1/league/all/`, payload)
  return response
}

export async function getTeamsByLeague(league_id) {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  };

  const response = await basicFetch(`http://${host}/api/v1/team/league/${league_id}`, payload);
  // const body = await response.json();
  return response;
}

export async function getTeam(team_id) {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  };

  const response = await basicFetch(`http://${host}/api/v1/team/${team_id}`, payload);
  // const body = await response.json();
  return response;
}

export async function joinTeam(context){
  try {
    const response = await axios.post(`http://${host}/api/v1/team/`, context, {
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






