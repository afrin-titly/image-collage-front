import axios from "axios"
import Cookies from 'js-cookie'

let config = {
    headers: {
        'Authorization': 'Bearer '+ Cookies.get("token")
    }
}
const _axios = axios.create(config);
export default _axios;