import axios from "axios";

export const loginApi = async(data)=>{
    let res = await axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}user/login`,data);
    return res.data;
}
export const getDataApi = async (token) => {
    let res = await axios(`${process.env.REACT_APP_BACKEND_API_KEY}task?id=${token}`);
    return res.data;
}
export const deleteApi = async (id) => {
    let res = await axios.delete(`${process.env.REACT_APP_BACKEND_API_KEY}task/${id}`);
    return res.data;
}