<template>
    <div id="new-point-form" class="container text-center">
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" aria-describedby="title" placeholder="Enter title" required>
            </div>
            <div class="form-group">
                <label for="comments">Comments</label>
                <textarea class="form-control" id="comments" placeholder="Enter comments" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" placeholder="Enter description" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="visitDate">Visit Date</label>
                <input type="date" class="form-control" id="visitDate" aria-describedby="visitDate" placeholder="Enter Visit Date" required>
            </div>
            <div class="drpzone">
                <DropZone 
                    id="dropImage" 
                    ref="dropImage" 
                    name="dropImage" 
                    :options="dropOptions" 
                    v-on:vdropzone-complete="onUploadComplete"
                />
            </div>
            <button type="submit" class="btn btn-danger">Create Entry</button>
        </form>
    </div>
</template>

<script>
import DropZone from 'vue2-dropzone'
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
            },
            newPoint:null
        }
    },
    methods: {
        onUploadComplete(f){
            console.log("heeeeee")
            console.log(f)
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
.drpzone{
    border:1px solid #fff;
    border-radius:25px;
    padding: 2%;
    margin:5%;
}
</style>