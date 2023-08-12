import axios from "axios";

export default {
    findCart: async (userId) => {
        return await axios.get(
            `${process.env.REACT_APP_SERVER_HOST_API}/purchase/${userId}`,
            {
                headers:
                {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
    },
    addToCart: async (userId, data) => {
        return await axios.post(
            `${process.env.REACT_APP_SERVER_HOST_API}/purchase/${userId}`,
            data,
            {
                headers:
                {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
    },
    updateCart: async (userId, data) => {
        return await axios.patch(
            `${process.env.REACT_APP_SERVER_HOST_API}/purchase/${userId}`,
            data,
            {
                headers:
                {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
    },

};