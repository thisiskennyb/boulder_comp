import axios from 'axios'
const host = import.meta.env.VITE_BASE_URL || "localhost:8000";

export async function signup(context) {
    try {
        const response = axios.post(`http://${host}/api/v1/accounts/register/signup`, context, {
            headers: {
                "Content-Type": "application/json",
              }
        })
        return response

    } catch (error) {
        console.error("Something went wrong in signup", error.response.data)
        throw error
    }
  }


export async function login(context) {
try {
    const response = axios.post(`http://${host}/api/v1/accounts/register/get-token`, context, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
} catch (error) {
    console.error("something wrong in get-token", error.response.status)
    throw error
}
}

export async function emailResetLink(context) {
    try {
        const response = axios.post(`http://${host}/api/v1/password_reset/`, context, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    } catch (error) {
        console.error("Something went wrong in emailResetLink", error.response.status)
        throw error
    }
  }

