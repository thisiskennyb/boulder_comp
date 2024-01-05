// const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/";

const host = "localhost:8000"

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
    const body = await basicFetch(`http://${host}/api/accounts/register/signup`,payload)
    return body
  }