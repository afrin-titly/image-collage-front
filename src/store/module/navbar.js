import axios from '../../plugins/axios_plugin'

const navbar = {
  state: {
    allImages: [],
  },
  mutations: {

  },
  actions: {
    imageFormSubmit(payload) {
      // const url = "http://127.0.0.1:8000/api/user-image/";
      // return new Promise((resolve)=>{
      //   axios.post(url, payload
      //   ).then(response=>{
      //       this.image_url = response.data.image
      //       console.log(response.data.image)
      //       this.isLoading = 0
      //   }).catch(()=>{
      //       this.isLoading = 0
      //   })
      // })
      console.log("call collage api")
      console.log(payload)
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