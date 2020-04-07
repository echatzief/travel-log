<template>
    <div id="location">
        <div v-if="markDetails">
            <div class="gapBetween titleColor" v-if="markDetails.title">
              <h2>{{markDetails.title}}</h2>
            </div>
            <div class="gapBetween" v-if="markDetails.image">
              <img :src="markDetails.image" width="150"/>
            </div>
            <div class="gapBetween " v-if="markDetails.description">
              <span class="titleColor"> Description: </span> <br/>
              {{markDetails.description}}
            </div>
            <div class="gapBetween " v-if="markDetails.comments">
              <span class="titleColor"> Comments: </span> <br/>
              {{markDetails.comments}}
            </div>
            <div class="gapBetween " v-if="markDetails.rating">
              <span class="titleColor"> Rating: </span> {{markDetails.rating}} / 10
            </div>
            <div class="gapBetween " v-if="markDetails.visitDate">
              <span class="titleColor"> Visit Date: </span> <br/>
              {{formatDate(markDetails.visitDate)}} 
            </div>
        </div>
        <div v-if="markDetails === null">
           No location with ID : {{markID}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    data(){
        return {
            markDetails:null,
            markID:this.$router.history.current.params.id
        }
    },
    methods: {
        fetchMarker : async function(){
            let markID = this.$router.history.current.params.id
            let response = await axios.get(process.env.VUE_APP_BACK_API+'/api/log/'+markID)
            this.markDetails = response.data
        },
        formatDate : function(d){
            return `${moment(d).day()} ${moment.months(moment(d).month())} ${moment(d).year()}`
        }
    },
    async created(){
        this.fetchMarker()
    }
}
</script>

<style scoped>
#location{
    color:#fff;
    text-align:center;
    margin-top:5%;
}
.gapBetween{
    padding:0.5%;
}
.titleColor{
    color: #deb992
}
</style>