<template>
    <div id="map-with-points">
        <MglMap
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            @dblclick="addTemporaryPointToMap"
            :doubleClickZoom="false"
        >   
            <div
                v-for="(mark) in marks"
                v-bind:key="mark.id"
            >
                <MglMarker
                    :coordinates.sync="mark.points"
                    color="green"
                    class="marker"
                >
                    <MglPopup :coordinates="mark.points" :closeButton="true">
                        <div class="popUp">
                            <h6>{{mark.title}}</h6>
                            <span>{{mark.comments}}</span> <br/><br/>
                            <small><button class="btn btn-primary" @click="redirectToDetails(mark.id)">More...</button></small>
                        </div>
                    </MglPopup>
                </MglMarker>
            </div>
            <div v-if="newMarker">
                <MglMarker
                    :coordinates.sync="newMarker.points"
                    color="red"
                    class="marker"
                >
                <MglPopup :coordinates="newMarker.points" :showed="true" :closeButton="true">
                    <div class="popUp">
                       <button class="btn btn-primary" @click="addPoint">Create Entry</button>
                    </div>
                </MglPopup>
                </MglMarker>
            </div>
        </MglMap>
    </div>
</template>

<script>
import { MglMap,MglMarker, MglPopup} from 'vue-mapbox'
import axios from 'axios'
export default {
    components:{
        MglMap,
        MglMarker,
        MglPopup,
    },
    data(){
        return {
            accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
            mapStyle :'mapbox://styles/mapbox/light-v9',    
            marks:[],
            newMarker:null
        }
    },
    methods: {
        addTemporaryPointToMap: async function(event){
            let c = event.mapboxEvent.lngLat
            this.newMarker = null
            this.newMarker = {
                points:[c.lng,c.lat]
            }
        },
        addPoint: async function(){
            this.$router.push('/add/'+this.newMarker.points[1]+'/'+this.newMarker.points[0])
        },
        redirectToDetails : async function(id){
            this.$router.push('/location/'+id)
        },
        fetchMarkers : async function(){
            axios.get(process.env.VUE_APP_BACK_API+'/api/logs')
            .then(response=>{
                let data = response.data
                data.map((i,index)=>{
                    this.marks.push({
                        index:index,
                        id:i._id,
                        points:[i.longitude,i.latitude],
                        title:i.title,
                        comments:i.comments,
                    })
                })
            })
        },
    },
    async created(){
        this.fetchMarkers()
    }
}
</script>

<style scoped>
#map-with-points{
    height: 100vh;
}
.marker{
    translate: (-50%,-100%)
}
.popUp{
    text-align: center;
    color:black;
    width: 100%;
    padding: 1rem;
}

</style>