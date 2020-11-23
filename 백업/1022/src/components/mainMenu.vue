<template>
<header class="navi" >
  <!-- <ul @mouseleave="leave()"> -->
  <ul>
    <!-- <li>
      <span>관리 기능1 </span>
        <ul class="nav_sub_depth" >
          <li><span>차량 관리</span></li>
          <li><span>특수 관리</span></li>
          <li><span>전광판 설정</span></li>
        </ul>
    </li>
    <li>
      <span>관리 기능2 </span>
        <ul class="nav_sub_depth" >
          <li><span>차량 관리</span></li>
          <li><span>특수 관리</span></li>
          <li><span>전광판 설정</span></li>
          <li><span>전광판 설정</span></li>
        </ul>
    </li> -->
    <li v-for="(m ,index) in mainTitle" :key="index" @mouseover="$store.state.activation =true" >
      <a href="javascript:void(0)" @mouseover="$store.state.active = index" >{{m.menu}}</a>              
      <!-- <ul class="nav_sub_depth" v-show="active === index">        
        <li v-for= "(ms, index) in m.subMenu" :key="index"><router-link :to="{ name: 'live_vehicle' }" ><span>{{ms}}</span></router-link></li>       
      </ul> -->
    </li>   
  </ul>
</header>

 
</template>
<script>
import { mapState } from "vuex"
// import config from "../config.js"
export default {
  name: "main_menu", 
  data() {
    return {    
      // activation:false,
      // active:false,
      verInfo:"",       
      timestamp: '현재시간' 
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
    leave(){
      // this.activation = false
      this.active = !this.mainTitle.index
       this.activation =false
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
