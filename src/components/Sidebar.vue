<template>
  <div class="container mt-5">
    <div class="image-area">
      <div class="image-left-area">
        <form @submit.prevent="submitForm" >
          <div>

            <input type="file" id="upload" multiple @change="onFileChange" class="form-control-file"><br><br>
            <p> Upload files</p>

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
            <label for="colorPicker">Choose a color:</label> <br>
            <input type="color" v-model="color" ref="colorPicker" @input="pickColor()">

            <label>Color: </label> {{color}} <br>
            <!-- <button type="submit" class="btn btn-primary">Make Collage</button> -->
          </div>
        </form>

        <button @click="submitForm" class="btn btn-primary mx-2">Make Collage</button>
        <button class="btn btn-danger m-2" @click="clearData()">Clear All</button>
      </div>

      <div v-if="images" class="image-right-area">
        <div class="mb-4" v-for="(image, index) in images" :key="index">
            <img class="img-fluid" :src="image.url" :width="image.width" :height="image.height" decoding="async"><br>
            <button class="btn btn-danger p-1 mt-2" @click="removeImage(index)"> Remove Image </button>
        </div>
      </div>
    </div>

    <div v-if="image_url && isLoading == 0">
        <img :src="image_url">
    </div>

    <div v-else-if="isLoading == 1" class="loading">
    </div>
  </div>

</template>

<script>
import axios from "../plugins/axios_plugin"
export default {
    data() {
        return {
            alignment: '',
            images: [],
            border: 0,
            color: '#e0ffee',
            image_url: '',
            isLoading: 0,
            showModal: false,
        }
    },
    methods: {
        test() {
          console.log("blah ");
        },
        submitForm() {
            this.isLoading = 1
            const url = "https://image-collage-back.herokuapp.com/home";
            // const url = "http://localhost:3000/home";
            const data_image = this.images.map(image=>{return {url: image.url, extention: image.extention}})
            axios.post(url,
            {images: data_image,
             alignment: this.alignment,
             border: this.border,
             color: this.color,}
            ).then(response=>{
                this.image_url = response.data.image
                console.log(response.data.image)
                this.isLoading = 0
            }).catch(()=>{
                this.isLoading = 0
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

input::-webkit-file-upload-button {
  position: absolute;
  padding: 10px 20px;
  background-color: peru;
  border: none;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  transition: 100ms ease-out;
  cursor: pointer;
}

input::-webkit-file-upload-button:hover {
  background-color: #bd6e1f;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)
}

.image-area {
  display: flex;
  padding: 70px;
}
.image-left-area {
  margin: 10px;
  width: 50%;
}
.image-right-area {
  margin: 10px;
  width: 50%;
}

</style>