
//default url: localhost:8000 unless the app is being ran locally with run-compose-dev.sh
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";


// Helper function for the remaining functions below
async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }


// User sign up, body fields include: email,username,password,confirm_password
// return field: username (if password is valid)
// 
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

//User login, input fields: username, password
// return field: token
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

//Reset email, include field: email
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

  //email reset confirm, include fields: password, token
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

//Create a league, include fields: league_name, start_date, end_date, team_size, location
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
  }

// Gets all leuages for the logged in user
export async function leaguesUserIsIn() {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
  }
  const response = await basicFetch(`http://${host}/api/v1/league/`, payload)
  return response
}

// gets all teams for a logged in user
export async function teamsUserIsIn() {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
  }
  const response = await basicFetch(`http://${host}/api/v1/league/create_team/`, payload)
  return response
}

// gets a single league, league id is passed in url
export async function getSingleLeague(league_id) {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
  }
  const response = await basicFetch(`http://${host}/api/v1/league/${league_id}`, payload)
  return response
}

// gets all leagues in the database
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

// gets all teams that are in a given league, league id is passed in url
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

// gets a specific team, team id is passed in url
export async function getTeam(team_id) {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  };
  const response = await basicFetch(`http://${host}/api/v1/team/${team_id}`, payload);
  return response;
}




