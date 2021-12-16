<template>
  <div class="container mt-5">
    <form @submit.prevent="submitForm" >
      <div>
        <label for="files"> Upload files</label>
        <input type="file" multiple @change="onFileChange" class="form-control-file"><br><br>
        <div v-if="images">
            <div v-for="(image, index) in images" :key="index">
                <img class="img-fluid" :src="image.url" :width="image.width" :height="image.height" decoding="async">
                <button class="btn btn-danger" @click="removeImage(index)"> Remove Image </button>
            </div>
        </div>
        <div class="form-check">
          <input type="radio" id="horizontal" class="form-check-input" value="horizontal" v-model="alignment">
          <label for="horizontal">Horizontal</label><br>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="vertical" value="vertical" v-model="alignment">
          <label for="css">Vertical</label><br>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Border: </label>
            <input type="text" class="form-control" v-model="border"><br>
          </div>
        </div>
        <label for="colorPicker">Choose a color:</label>
        <input type="color" v-model="color" ref="colorPicker" @input="pickColor()">

        <label>Color: </label> {{color}} <br>
        <button type="submit" class="btn btn-primary">Make Collage</button>
      </div>
    </form>
    <button class="btn btn-danger" @click="clearData()">Clear All</button>
    <!-- <div v-if="image_url && isLoading == 0">
        <img :src="image_url">
    </div> -->

    <!-- <div v-else-if="isLoading == 1" class="loading">
    </div> -->
    <!-- TODO: image doesn't show after uploading -->
    <div v-if="userImages">
      <div  v-for="(img,index) in userImages" :key="index">
        <img :src="img" width="300" height="150" />
      </div>
    </div>

  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            alignment: '',
            images: [],
            border: 0,
            color: '#e0ffee',
            image_url: '',
            isLoading: 0,
            userImages: [],
        }
    },
    mounted() {
      this.fetchUserImages().then(()=>{
        this.userImages = this.getUserImageURLs
      })

    },
    computed: {
      ...mapGetters(["getUserImageURLs"]),
    },
    methods: {
      // TODO:show images from s3
      ...mapActions(["imageFormSubmit", "fetchUserImages"]),
        submitForm() {
            this.isLoading = 1
            // const url = "https://image-collage-back.herokuapp.com/home";
            // const url = "http://localhost:3000/home"; //rails
            // const url = "http://127.0.0.1:8000/api/user-image/";
            const data_image = this.images.map(image=>{return {url: image.url, extention: image.extention}})
            console.log(data_image)
            this.imageFormSubmit(data_image).then(()=>{
              this.fetchUserImages().then(()=>{
                this.userImages = this.getUserImageURLs
              })
            })
        },
        onFileChange(e) {
            console.log(window.location.hostname);
            var files = e.target.files || e.dataTransfer.files; // for drag n drop
            if (!files.length) return;
            this.createImage(e.target.files).then((response)=>{
                this.images.push(response)
            })
        },
        createImage(files) {
            return new Promise((resolve)=>{
                var i=0;
                for (var index = 0; index < files.length; index++) {
                    var reader = new FileReader();
                    let imageUrl;
                    reader.onload = function(event) {
                        imageUrl = event.target.result;
                        let image = new Image();
                        image.src = imageUrl;
                        var image_name = files[i].name.split(".").pop();
                        image.onload = function() {
                            var h = image.height;
                            var w = image.width;
                            var ratio = Math.min(300/w, 200/h);
                            resolve({url: imageUrl, width: w*ratio, height: h*ratio, extention: image_name})
                        }
                        i++;
                    }
                    reader.readAsDataURL(files[index]);
                }

            })
        },
        removeImage(index) {
            this.images.splice(index, 1)
        },
        pickColor() {
            this.color = this.$refs["colorPicker"].value;
        },
        clearData() {
            this.alignment =  '',
            this.images = [],
            this.border = 0,
            this.color =  '#e0ffee',
            this.image_url = '',
            this.isLoading = 0
        },
    }
}
</script>

<style>
input[type="color"] {
    margin: .4rem;
}

.loading {
  position: fixed;
  z-index: 999;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 50px;
  height: 50px;
  margin-top: -0.5em;

  border: 15px solid rgba(33, 150, 243, 1.0);
  border-radius: 100%;
  border-bottom-color: transparent;
  -webkit-animation: spinner 1s linear 0s infinite;
  animation: spinner 1s linear 0s infinite;


}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>