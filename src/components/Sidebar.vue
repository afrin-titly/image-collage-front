<template>
  <form @submit.prevent="submitForm">
      <label for="files"> Upload files</label>
      <input type="file" multiple @change="onFileChange" ><br><br>
      <div v-if="images">
          <div v-for="(image, index) in images" :key="index">
              <img :src="image.url" :width="image.width" :height="image.height" >
              <button @click="removeImage(index)"> Remove Image </button>
          </div>
      </div>

      <input type="radio" id="horizontal" value="horizontal" v-model="alignment">
      <label for="horizontal">Horizontal</label><br>
      <input type="radio" id="vertical" value="vertical" v-model="alignment">
      <label for="css">Vertical</label><br>
      <button type="submit">Make Collage</button>
  </form>
</template>

<script>
import axios from "../plugins/axios_plugin"
export default {
    data() {
        return {
            alignment: '',
            images: [],
        }
    },
    methods: {
        submitForm() {
            axios.post("http://localhost:3000/home",
            {images: this.images,
             alignment: this.alignment}
            ).then(reponse=>{
                console.log(reponse)
            })
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files; // for drag n drop
            if (!files.length) return;
            this.createImage(e.target.files).then((response)=>{
                this.images.push(response)
            })
        },
        createImage(files) {
            return new Promise((resolve)=>{
                for (var index = 0; index < files.length; index++) {
                    var reader = new FileReader();
                    let imageUrl;
                    reader.onload = function(event) {
                        imageUrl = event.target.result;
                        let image = new Image();
                        image.src = imageUrl;
                        image.onload = function() {
                            var h = image.height;
                            var w = image.width;
                            var ratio = Math.min(300/w, 200/h);

                            resolve({url: imageUrl, width: w*ratio, height: h*ratio})
                        }
                    }
                    reader.readAsDataURL(files[index]);
                }

            })
        },
        removeImage(index) {
            this.images.splice(index, 1)
        }
    }
}
</script>

<style>

</style>