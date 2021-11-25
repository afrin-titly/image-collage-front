import router from "./router";
import Cookies from "js-cookie";

router.beforeEach((to, from, next)=>{
    let token = Cookies.get("token");
    console.log(token)
    if(token) {
        if(to.name == "login"){
            next()
        } else {
            next()
        }
        // next({name: "home"})
    } else {
        if (to.name != "login") {
            next({name: "login"});
          } else next();
    }
})