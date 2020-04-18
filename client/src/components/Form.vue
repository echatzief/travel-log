<template>
    <div id="new-point-form" class="container text-center">
        <div v-if="!loading">
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="title" type="text" class="form-control" id="title" aria-describedby="title" placeholder="Enter title" required>
                <div v-if="!validTitle" class="error-div">
                    <p class="error-msg">Invalid Title!</p>
                </div>
            </div>
            <div class="form-group">
                <label for="comments">Comments</label>
                <textarea v-model="comments" class="form-control" id="comments" placeholder="Enter comments" rows="3" required></textarea>
                 <div v-if="!validComments" class="error-div">
                    <p class="error-msg">Invalid Comments!</p>
                </div>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="description" class="form-control" id="description" placeholder="Enter description" rows="3" required></textarea>
                <div v-if="!validDesc" class="error-div">
                    <p class="error-msg">Invalid Description!</p>
                </div>
            </div>
             <div class="form-group">
                <label for="description">Rating: {{rating}}</label>
                <input type="range" min="1" max="10" v-model="rating" class="slider">
            </div>
            <div class="form-group">
                <label for="visitDate">Visit Date</label>
                <input  v-model="visitDate" type="date" class="form-control" id="visitDate" aria-describedby="visitDate" placeholder="Enter Visit Date" required>
                <div v-if="!validDate" class="error-div">
                    <p class="error-msg">Invalid Date!</p>
                </div>
            </div>
            <div class="drpzone">
                <DropZone 
                    id="dropImage" 
                    ref="dropImage" 
                    name="dropImage" 
                    :options="dropOptions" 
                    v-on:vdropzone-complete="onUploadComplete"
                    v-on:vdropzone-removed-file="afterFileRemove"
                />
            </div>
            <div v-if="!validImage" class="error-div-center">
                <p class="error-msg">Invalid Image!</p>
            </div>
            <button class="btn btn-danger" v-on:click="submitEntry">Create Entry</button>
        </div>
        <div v-if="loading" class="overlay-layer">
            <div class="text-center loadingDiv">
                <h1>Loading...</h1>
            </div>
        </div>
    </div>
</template>

<script>
import DropZone from 'vue2-dropzone'
import axios from 'axios'
export default {
    components:{
        DropZone,
    },
    data(){
        return{
            dropOptions:{
                url:`${process.env.VUE_APP_BACK_API+"/api/upload/img"}`,
                maxFiles:1,
                addRemoveLinks: true,
                uploadMultiple: false,
                autoProcessQueue: true,
                error:false,
            },
            newPoint:null,
            filename:'',
            title:'',
            comments:'',
            description:'',
            visitDate:'',
            rating:1,
            validTitle:true,
            validComments:true,
            validDesc:true,
            validImage:true,
            validDate:true,
            loading:false,
        }
    },
    methods: {
        onUploadComplete(res){
            res = JSON.parse(res.xhr.response)
            let {filename} = res
            this.filename = filename
        },
        validateField(el,key){
            if(el && el!==''){
                this[`${key}`] = true;
            } else {
                this[`${key}`] = false;
            }
        },
        validateAllFields(){
            this.validateField(this.title,'validTitle')
            this.validateField(this.comments,'validComments')
            this.validateField(this.description,'validDesc')
            this.validateField(this.visitDate,'validDate')
            this.validateField(this.filename,'validImage')
            if(this.title !=='' && this.comments !=='' && this.description !=='' && this.visitDate !=='' && this.filename !==''){
                return true
            } else {
                return false
            }
        },
        submitEntry: async function(){
            if(this.validateAllFields()){
                this.loading=true
                await axios({
                    method: 'POST',
                    url: process.env.VUE_APP_BACK_API+'/api/logs',
                    data: {
                        rating:this.rating,
                        title:this.title,
                        comments:this.comments,
                        latitude:this.newPoint[1],
                        longitude:this.newPoint[0],
                        description:this.description,
                        visitDate:new Date(this.visitDate),
                        image:'http://localhost:8080/api/images/'+this.filename,
                    }
                })
                this.loading=false
            }
        },
        afterFileRemove(){
            this.filename = '' // Reset the name
        }
    },
    created(){
        const cd = this.$router.app._route.params
        this.newPoint = [cd.long,cd.lat]
    }
}
</script>

<style scoped>
#new-point-form{
   width:40%;
   color:#fff;
   margin-top:5%;
}
.error-div{
    padding:1%;
    text-align: left;
}
.error-div-center{
    padding:1%;
}
.error-msg{
    color:red;
}
.drpzone{
    border:1px solid #fff;
    border-radius:25px;
    padding: 2%;
    margin:5%;
}
.overlay-layer{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
}
.loadingDiv{
    margin-top: 25%;
}
.slider {
  -webkit-appearance: none;  
  appearance: none;
  width: 100%; 
  height: 10px; 
  background: #d3d3d3; 
  outline: none; 
  opacity: 0.7; 
  -webkit-transition: .2s; 
  transition: opacity .2s;
}
.slider:hover {
  opacity: 1; 
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #dc3545;
  cursor: pointer; 
  border-radius: 50%;
}
.slider::-moz-range-thumb {
  width: 25px; 
  height: 25px; 
  background: #4CAF50; 
  cursor: pointer;
}
</style>