import axios from "axios";

export default {
    findProductById: async (id) => {
        return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/products/` + id)
    },
    search: async function (searchString) {
        return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/products?search=${searchString}`)
    },
    create: async function (formData) {
        return await axios.post(`${process.env.REACT_APP_SERVER_HOST_API}/products`,
            formData,
            {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
    },
    findMany: async function () {
        return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/products`)
    },
}