import axios from "axios";
export default {
    findReceipt: async (userId) => {
        return await axios.get(
            `${process.env.REACT_APP_SERVER_HOST_API}/receipts/${userId}`,
            {
                headers:
                {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
    },
};