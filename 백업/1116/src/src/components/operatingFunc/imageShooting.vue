<template>
 <div class="vehicle_wrap">
   <div class="title">
      <h2>{{mainTitle[1].subMenu[1].title}}</h2>
    </div>
    <div class="contents-wrap">
      <h2>
        <font-awesome-icon icon="camera" style="color:#26a95e" />※실시간으로
        촬영되고 있는 영상입니다.
      </h2>
      <div class="screen-img_wrap">
        <div class="screen-img">
          <img :src="image_name" alt="" />
        </div>
        <div class="img-title">{{ imageTitle }}</div>
      </div>
      <div class="screen-control">
        <ul>
          <li
            v-for="(v, index) in vehiclePicture"
            :key="index"
            :class="{ active: v.active }"
          >
            <button @click="image_capture(v)">
              {{ v.location + "_" + v.direction + v.type }}
            </button>
          </li>
        </ul>
      </div>
    </div>
 </div>
</template>
<script>
import config from "../../config.js"
import { mapState } from "vuex"
export default {
  data: function() {
   return {
      vehiclePicture: [],
      image_name: "",
      imageTitle: ""
    }
  }, 
  computed: {
     ...mapState(["mainTitle"]),   
  },
  created() {
    this.$socket.on("message_from_server", data => {
    //  console.log("data.kind : ", data.kind)
      this.image_response(data)
    }),
      this.name_check()
  },
  methods: {
    image_capture(c) {
      this.vehiclePicture.forEach(imgShow => {
        if (imgShow.active === true) {
          // this.titleImg = imgShow.spot
          imgShow.active = false
        }
      })
      c.active = true
      console.log("image_caspture : ", c)
      let obj1 = {}
      let direction = "out"
      if (c.direction === "in") {
        direction = "in"
      }
      obj1.direction = direction
      obj1.kind = "image_capture"
      obj1.camera_id = c.type
      obj1.location = c.location
      obj1.loop_event_time = Date.now()
      console.log("image_capture req obj :", obj1)
      this.sendMessage(obj1)
    },
    name_check() {
      this.vehiclePicture = []
      for (let i = 0; i < config.ip_camera_list.length; i++) {
        let obj = config.ip_camera_list[i]
        obj.type = config.ip_camera_list[i].camera_id
        this.vehiclePicture.push(obj)
      }
      // this.bar_policy_fun_all()
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    image_response(data) {
     
      if (data.kind === "capture_image") {
         console.log("data : ", data)
        let direction = "out"
        if (data.direction === "in") {
          direction = "in"
        }
        this.image_name = config.image_src + data.folder_name + "/" + data.fname
        this.imageTitle = data.location + "_" + direction + data.camera_id
        console.log("this.imageTitle : ", this.imageTitle)
      }
    }
  }
}
</script>
<style scoped>
/* @import "../../assets/css/table.css"; */
/* @import "../../assets/css/vehicleEntryExitLive.css"; */

</style>