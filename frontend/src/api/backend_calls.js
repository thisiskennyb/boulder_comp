// const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/";

const host = import.meta.env.VITE_BASE_URL || "localhost:8000";

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }


  export async function signup(context) {
  
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const response = await basicFetch(`http://${host}/api/v1/accounts/register/signup`,payload)
    console.log(response.status, "body")
    return response
  }

  export async function login(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`http://${host}/api/v1/accounts/register/get-token`, payload)
    return body.token
  }

  export async function emailResetLink(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const response = await basicFetch(`http://${host}/api/v1/password_reset/`, payload)
    return response
  }

  export async function emailResetConfirm(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const response = await basicFetch(`http://${host}/api/v1/password_reset/confirm/`, payload)
    return response
  }


  export async function createLeague(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`http://${host}/api/v1/league/`, payload)
    return body
    // return body
  }

// No context, no body, just a GET request
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


export async function createTeam(context) {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(context)
  }
  const body = await basicFetch(`http://${host}/api/v1/league/create_team/`, payload)
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


export async function joinTeam(context){
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(context)
  }
  const response = await basicFetch(`http://${host}/api/v1/team/`, payload)
  return response
}




