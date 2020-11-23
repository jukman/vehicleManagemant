<template>
<header class="navi" >
  <ul>
    <div class="burger_box">
      <a @click="leftMenu()" :class="{active : activation}">
        <span class="barTop"></span>
        <span class="barMid"></span>
        <span class="barBot"></span>
      </a></div>
    <li v-for="(m ,index) in mainTitle" :key="index" @mouseover="$store.state.activation =true" >
      <a href="javascript:void(0)" @mouseover="$store.state.active = index" >{{m.menu}}</a>              
    </li>
    <div class="info">
      <span class="logout">
        <button @click="logout()"> {{ admin_id }}님 로그아웃</button>
      </span>     
      </div>   
  </ul>

</header>

 
</template>
<script>
import { mapActions, mapState } from "vuex"
// import config from "../config.js"
export default {
  name: "main_menu", 
  data() {
    return {    
      // activation:false,
     // active:false,
      verInfo:"",       
      timestamp: '현재시간',
      admin_id:"admin001" 
    }
  },
  computed:{
    ...mapState(["activation","active","mainTitle"])    
  },
  created(){     
    this.admin_id = localStorage.getItem("admin_id")  
       setInterval(() => {
      this.getNow();
    }, 1000)
  },
   methods: {  
     ...mapActions(["logout"]),
      leftMenu(){      
       this.$store.state.activation === false ? this.$store.state.activation = true :this.$store.state.activation =false
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
