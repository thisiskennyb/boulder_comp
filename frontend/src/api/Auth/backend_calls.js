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



export async function emailResetConfirm(context) {
    try {
        const response = axios.post(`http://${host}/api/v1/password_reset/confirm/`, context, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    } catch (error) {
        console.error("Something went wrong in emailResetConfirm", error.response.status)
        throw error
    }
  }


export async function createUserDashboard(context){
    try {
        const response = axios.post(`http://${host}/api/v1/accounts/register/create_dashboard/`, context, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.error("Something went wrong in createUserDashboard", error.response.status)
        throw error
    }
  }



  export async function uploadAvatar(context) {
  
    let formData = new FormData();
    formData.append("avatar", context.avatar);
    try {
      const response = axios.put(`http://${host}/api/v1/accounts/register/update-dashboard/`, formData, {
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

  export async function updateUserDashboard(context){
    try {
        const response = axios.put(`http://${host}/api/v1/accounts/register/update-dashboard/`, context, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.error('Something went wrong in updateUserDashboard')
        throw error
    }
  }