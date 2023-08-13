import axios from "axios";
export default {
  findReceipt: async (userId) => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_HOST_API}/receipts/${userId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
  },
  findMany: async () => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_HOST_API}/receipts`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
  },
  update: async (receiptId, data) => {
    return await axios.patch(
      `${process.env.REACT_APP_SERVER_HOST_API}/receipts/` + receiptId,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
  },
};
