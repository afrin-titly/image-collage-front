import axios from '../../plugins/axios_plugin'
import Cookies from 'js-cookie'

const navbar = {
  state: {
    imagesURLs: [],
    dummy: "",
  },
  getters: {
    getUserImageURLs: (state) => {
      return state.imagesURLs
    }
  },
  mutations: {
    setAllImages: (state, images) => {
      state.imagesURLs = images;
    },
    dummyMutation: (state) => {
      state.dummy = ""
    }
  },
  actions: {
    imageFormSubmit({commit}, payload) {
      const api_url = "http://127.0.0.1:8000/api/user-image/";
      return new Promise((resolve)=>{
        axios.post(api_url, {images: payload.data_image, urls: payload.urls}
        ).then(response=>{
            resolve(response.data)
            console.log(response.data.image)
            commit('dummyMutation')
        }).catch((err)=>{
            console.log(err)
        })
      })
    },
    fetchUserImages({commit}) {
      return new Promise((resolve)=>{
        axios.get("http://127.0.0.1:8000/api/user-image/",
        {
          headers: {
            'Authorization': 'Bearer '+ Cookies.get("token")  // even though added on axios_plugin why headers was needed?
          }
        })
        .then((response)=>{
          resolve(response.data)
          let image_urls = response.data
          commit('setAllImages', image_urls)
        })
      })
    }
  }

}

export default navbar