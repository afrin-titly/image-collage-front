import Cookies from "js-cookie"
import axios from "../../plugins/axios_plugin"

const login = {
    state: {
        token: Cookies.get("token"),
        userImages: [],
    },
    mutations: {
      setToken: (state,payload) => {
        state.token = Cookies.set('token', payload.jwtToken,{
              expires: payload.dat
        })
      },
      setUserImages: (state) => {
        state.userImages = []
      }
    },
    actions: {

      loginFormSubmit({commit}, payload) {
        return new Promise((resolve)=>{
          axios.post("http://127.0.0.1:8000/api/token/",payload)
            .then(response => {
              console.log(response.data)
              let jwtToken = response.data.access;
              let jwtPayload = jwtToken.split(".")[1];
              let jwtDcdd = atob(jwtPayload);
              let userInfo = JSON.parse(jwtDcdd);

              let dat = new Date(parseInt(userInfo.exp) * 1000);
              commit('setToken',{jwtToken, dat})
              resolve(response.data)
              // Cookies.set('token', jwtToken,{
              //   expires: dat
              // })
          }).catch(error=>{
            console.log(error)
            this.flash = "No active account found with the given credentials."
          })
        })
      },
    }
}

export default login