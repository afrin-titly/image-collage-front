import axios from '../../plugins/axios_plugin'

const navbar = {
  state: {
    allImages: [],
  },
  mutations: {
    setAllImages: (state, images) => {
      state.allImages = images;
    }
  },
  actions: {
    imageFormSubmit({commit}, payload) {
      console.log(payload)
      const url = "http://127.0.0.1:8000/api/user-image/";
      return new Promise((resolve)=>{
        axios.post(url, {images: payload,}
        ).then(response=>{
            resolve(response.data)
            let image_url = response.data.image
            // console.log(response.data.image)
            console.log(response.data)
            commit('setAllImages', image_url)
        }).catch((err)=>{
            console.log(err)
        })
      })
      // console.log("call collage api")
      // console.log(payload)
    },
    fetchUserImages() {
      console.log("in store----")
        axios.get("http://127.0.0.1:8000/api/user-image/")
        .then((response)=>{
          console.log(response)
        })
    }
  }
}

export default navbar