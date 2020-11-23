<template>
<div id="wrap">
   <mainMenu />   
   <leftMenu />
   <router-view></router-view>

     
  
   
  </div>
</template>

<script>
import mainMenu from "../components/mainMenu"
import leftMenu from "../components/leftMenu"
// import { mapState } from "vuex"
// import config from "../config.js"
export default {
  components: {
   mainMenu,
   leftMenu
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyPress)
  },
  data() {
    return {}
  },
  computed: {
  },
  created() {
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keydown", this.handleKeyPress)
    }
  },
  methods: {
    handleKeyPress(e) {
      if (this.$store.state.loginSuccess === false) {
        // e.stopPropagation()
        if (e.keyCode === 73) {
          // this.discountCheck()
        } else if (e.keyCode === 77) {
          // m
          this.$store.state.manualInputSignal = false
          this.$store.state.discount = false
          this.$store.state.reduct = false
          this.$store.state.calculateUse = false
          // this.manualEntry()
          this.$store.state.manualEntrySignal = !this.$store.state
            .manualEntrySignal
          e.stopPropagation()
        } else if (e.keyCode === 79) {
          // o
          this.$store.state.manualEntrySignal = false
          this.$store.state.discount = false
          this.$store.state.reduct = false
          this.$store.state.calculateUse = false
          // this.manualInput()
          this.$store.state.manualInputSignal = !this.$store.state
            .manualInputSignal
          e.stopPropagation()
        } else if (e.keyCode === 83) {
          // s
          this.$store.state.calculateUse = false
          // this.reduction()
          this.$store.state.reduct = !this.$store.state.reduct
          e.stopPropagation()
        } else if (e.keyCode === 82) {
          // r
          // this.discountCheck()
          this.$store.state.discount = !this.$store.state.discount
          e.stopPropagation()
          // e.stoplmmediatePropagation()
        } else if (e.keyCode === 84) {
          // t
          this.$store.state.manualInputSignal = false
          this.$store.state.manualEntrySignal = false
          this.$store.state.discount = false
          this.$store.state.reduct = false
          // this.$store.state.calculateUse = false
          // this.calculate()
          this.$store.state.calculateUse = !this.$store.state.calculateUse
          e.stopPropagation()
        }
        // if (e.ctrlKey && e.keyCode === 37) {
        //   alert("되")
        // } else if (e.ctrlKey && e.keyCode === 39) {
        //   alert("안되")
        // }
      }
    },
    timeCheck: function() {
      this.intervalid1 = setInterval(() => {
        this.nowDate = this.getDateAndTime(new Date())
        // console.log(this.changes)
      }, 1000)
    },
    getDateAndTime(date1) {
      let hour = date1.getHours()
      let minutes = date1.getMinutes()
      let seconds = date1.getSeconds()
      // let amPm = "AM"
      let fullDate = `${date1.getFullYear()}/${date1.getMonth() +
        1}/${date1.getDate()}`
      if (hour < 10) hour = "0" + hour
      if (minutes < 10) minutes = "0" + minutes
      if (seconds < 10) seconds = "0" + seconds
      // if (date1 < 12) {
      //   amPm = "PM"
      // }
      return `${fullDate} ${hour}:${minutes}:${seconds} `
    },
    logOut() {
      this.$store.state.loginSuccess = true
    },
    barCode() {
      const el = this.$refs.test.$el
      this.$refs.test.bar()
      console.log("테그?", el)
    }
  }
}
</script>
<style>
@import "../assets/css/layout.css";
@import "../assets/css/default.css";
@import "../assets/css/main.css";
</style>
