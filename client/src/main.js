import Vue from 'vue'
import App from './App.vue'
import cMap from './components/Map.vue'
import Location from './components/Location.vue'
import Form from './components/Form.vue'
import NotFound from './components/NotFound.vue'
import VueRouter from 'vue-router'

// Include the .env file with the enviroment variables
import dotenv from 'dotenv'
dotenv.config()

// Configure the routing
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path:'/',name:'map',component:cMap },
    { path:'/add/:lat/:long',name:'form',component:Form },
    { path:'/location/:id',name:'location',component:Location },
    { path:'*',name:'not-found',component:NotFound },
  ],
  mode:'history'
})

Vue.config.productionTip = true

new Vue({
  router,
  render: h=>h(App)
}).$mount('#app')
