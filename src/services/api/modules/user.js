import axios from "axios";

export default {
  register: async (newUser) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users`,
      newUser
    )
  },
  login: async (data) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/login`,
      data,
    )
      .then(res => res)
      .catch(err => err)
  },

  authenToken: async (data) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/authen-token`,
      data,
    )
    
      // .then(res => res)
      // .catch(err => err)
  },
  resend: async (data) => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/resend`,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
      .then(res => res)
      .catch(err => err)
  },
  changePassword: async (data) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/change-password`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
      .then(res => res)
      .catch(err => err)
  },
  find: async () => {
    return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/users`);
  },
};
