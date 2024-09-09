import axios from "axios"

export const checkAdmin = async()=>{
    const res = await axios.get('http://localhost:9000/api/common/check-admin', {withCredentials: true});
    // console.log(res.data)
    return res.data.success;
}