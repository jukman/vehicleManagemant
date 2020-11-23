<template>
<div class="leftMenu" :class="{activation }" > 
   <div class="burger_box">
      <a @click="leftMenu()" :class="{active}">
        <span class="barTop"></span>
        <span class="barMid"></span>
        <span class="barBot"></span>
      </a></div>
  <ul @mouseleave="$store.state.activation =false">   
    <li v-for="(m ,index) in mainTitle" :key="index" @mouseover="$store.state.activation =true" :class = "{on : $store.state.active === index}" >
      <a href="javascript:void(0)" @mouseover="$store.state.active = index" >{{m.menu}}</a>          
      <ul class="nav_sub_depth" v-show="$store.state.active === index">        
        <li v-for= "(ms, index) in m.subMenu" :key="index"><router-link :to="{ name: ms.add }" active-class="active"><span>{{ms.title}}</span></router-link></li>       
      </ul>
    </li>   
  </ul>
</div>

 
</template>
<script>
import { mapState } from "vuex"
// import config from "../config.js"
export default {
  name: "main_menu", 
  data() {
    return {    
      // activation:false,
    //   active:true,
      verInfo:"",       
      timestamp: '현재시간',
      active:false     
    }
  },
  computed:{
    ...mapState(["activation","active","mainTitle"])    
  },
  created(){       
       setInterval(() => {
      this.getNow();
    }, 1000)
  },
   methods: { 
      leftMenu(){
        this.$store.state.activation =false
        this.active =! this.active
      },
      getNow() {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' ' + time;
      this.timestamp = dateTime;
       }
      }
     }
</script>

<style>
</style>
