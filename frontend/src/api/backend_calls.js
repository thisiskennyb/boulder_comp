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