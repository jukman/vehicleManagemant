<template>
  <div class="report_wrap">
    <div class="title">
      <h2>{{mainTitle[1].subMenu[3].title}}</h2>
    </div>
   <div class="content_wrap">
      <div class="menu_title">
        <form>
       <!--   <span class="small_title">장소</span>
          <select v-model="searchLocation">
            <option disabled value="">선택해 주세요</option>
            <option v-for="(location1, index) in locations" v-bind:key="index">
              {{ location1.text }}
            </option>
          </select>
          <span class="small_title">방향</span>
          <select v-model="searchDirection">
            <option disabled value="">선택해 주세요</option>
            <option
              v-for="(direction1, index) in directions"
              v-bind:key="index"
            >
              {{ direction1.text }}
            </option>
          </select>
          <button @click.prevent="search" class="seach_confirm">검색</button> -->

          <button @click.prevent="registOpen" class="registerbtn">등록</button>
        </form>
      </div>

      <!-- 등록내용 -->
      <div class="display_popup popup" v-show="resistIs">
        <div>
          <h3>공지사항 내용</h3>
          <button @click="registClose">
            <font-awesome-icon icon="times-circle" />
          </button>
          <ul class="wrap_setting">
            <li>
              <h4>적용</h4>
              <span class="index">
                <label><input type="checkbox" v-model="reg.checked"/></label>
              </span>
            </li>
            <li>
              <h4>장소</h4>
              <select v-model="reg.location">
                <option disabled value="">선택해 주세요</option>
                <option
                  v-for="(location1, index) in locations1"
                  v-bind:key="index"
                >
                  {{ location1.text }}
                </option>
              </select>
            </li>

            <li>
              <h4>방향</h4>
              <select v-model="reg.direction">
                <option disabled value="">선택해 주세요</option>
                <option
                  v-for="(direction1, index) in directions1"
                  v-bind:key="index"
                >
                  {{ direction1.text }}
                </option>
              </select>
            </li>
            <li class="screen_typing">
              <h4>공지사항 내용</h4>
              <ul>
                <li>                
                  <input
                    type="text"
                    placeholder="문구를 입력하세요."
                    maxlength="50"
                    v-model="reg.text"
                  />
                  <p class="tooltip">
                    <font-awesome-icon icon="exclamation" /><span
                      class="tooltip-content"
                    >                    
                    </span>
                  </p>                  
                </li>               
              </ul>
            </li>
          </ul>
          <button @click.prevent="registNew" class="writebtn">등록</button>
        </div>
      </div>
      <!-- 수정버튼 -->
      <div class="modify_pop popup" v-show="modifyIs">
        <div>
          <h3>공지사항 내용</h3>
          <button @click="modifyClose">
            <font-awesome-icon icon="times-circle" />
          </button>
          <ul class="wrap_setting">
            <li>
              <h4>적용</h4>
              <span class="index">
                <label><input type="checkbox" v-model="current.checked"/></label>
              </span>
            </li>
            <li>
              <h4>장소</h4>
              <span>
                <!-- 임시테스트 -->
                {{ current.location }}
              </span>
            </li>
            <li>
              <h4>방향</h4>
              <span>
                <!--임시테스트2 -->
                 {{ current.direction }}
              </span>
            </li>
            <li class="screen_typing">
              <h4>공지사항 내용</h4>
              <ul>
                <li>                  
                  <input
                    type="text"
                    placeholder="문구를 입력하세요."
                    maxlength="50"
                    v-model="current.text"
                  />
                  <p class="tooltip">
                    <font-awesome-icon icon="exclamation" /><span
                      class="tooltip-content"
                    >                      
                    </span>
                  </p>                  
                </li>               
              </ul>
            </li>
          </ul>
          <button @click.prevent="modifyVehicle" class="modifybtn">
            수정
          </button>
          <button @click.prevent="deleteVehicle" class="deletebtn">
            삭제
          </button>
        </div>
      </div>
      <div class="list-items">
        <div class="list-title">
          <li>
            <span
              >적용중<button @click.prevent="item_date_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.date"
                /></button
            ></span>
          </li>
          <li>
            <span>위치</span>
          </li>
          <li>
            <span>방향</span>
          </li>
          <li>
            <span>문구</span>
          </li>
         
        </div>
        <!-- 리스트 출력부분 -->
        <!-- <spinners v-if="isLoading" /> -->
        <ul class="list-wrap">
          <li
            v-for="(c, index) in announce_list"
            :key="index"
            @click="modifyOpen(c)"
          >
            <span class="index">
              <label><input type="checkbox" v-model="c.checked"/></label>
            </span>
            <span class="count_vehicles">
              {{ c.location }}
            </span>
            <span class="paid_fee"> {{ c.direction }}</span>
            <span class="discount_amount">
              {{ c.text }} 
            </span>           
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import _ from "underscore"
import XLSX from "xlsx"
import config from "../../config.js"
// import spinners from "../components/spinners"
export default {
  data: function() {
    return {
      contents: [],
      reg: {     
        checked: false,
        location: "",
        text: "",
        direction: ""
      },
      admin: {
        checked: false,
        location: "",
        text: "",
        direction: ""
      },
      isLoading: false,
      searchLocation: "",
      searchDirection: "",
      modifyIs: false,
      resistIs: false,
      announce_list: [],
      current: {
       
      },
      sort_item: {
       
      }
    }
  },
  filters: {
    currency: function(value) {
      var num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },
  created() {
    // this.isLoading = true
    this.$socket.on("message_from_server", data => {
      //   console.log("data.kind : ", data.kind)
      // this.isLoading = false
      if (data.kind === "get_announce_list") {
        this.announce_list_query(data)
      } else if (
        data.kind === "create_announce_list" ||
        data.kind === "update_announce_list" ||
        data.kind === "delete_announce_list"
      ) {
        this.search1()
      }
    }),
      this.loc_dir(),
      this.search1()
  },
  computed:{
    ...mapState(["mainTitle"])    
  },
  components: {
    // spinners
  },
  methods: {
    registOpen() {
      this.resistIs = true
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      console.log("this.admin : ", this)
      let obj = {}
      obj.kind = "create_announce_list"
      obj.text = this.reg.text
      obj.location = this.reg.location
      obj.direction = this.reg.direction
      obj.time = Date.now()
      obj.checked = this.reg.checked
      console.log("공지사항 등록 : ", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      this.modifyClose()
      let obj = {}
      obj.kind = "update_announce_list"
      obj.text = this.current.text
      obj.location = this.current.location
      obj.direction = this.current.direction
      obj.time = Date.now()
      obj.checked = this.current.checked
      console.log("공지사항 수정 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("공지사항 삭제")
      this.modifyClose()
      let obj = {}      
      obj.text = this.current.text
      obj.location = this.current.location
      obj.direction = this.current.direction
      obj.time = Date.now()
      obj.checked = this.current.checked
      obj.kind = "delete_announce_list"
      console.log("공지사항 삭제 : ", obj)
      this.sendMessage(obj)
    },
    search1() {
      let obj1 = {}
      obj1.kind = "get_announce_list"
      this.sendMessage(obj1)
    },
    search() {
      console.log("검색 버튼을 눌렀습니다.")
      let obj = {}
      obj.kind = "get_announce_list"
      this.sendMessage(obj)
    },
    loc_dir() {
      this.locations = []
      this.directions = []
      this.locations1 = []
      this.directions1 = []
      let location_list = []
      let direction_list = []
      location_list = config.location_list
      direction_list = config.direction_list
      //  for(let i = 0; i < location_list.length; i++){
      this.locations = location_list
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].text !== "전체") {
          this.locations1.push(this.locations[i])
        }
      }
      //  }
      // for(let i = 0; i < direction_list.length; i++){
      this.directions = direction_list
      for (let i = 0; i < this.directions.length; i++) {
        if (this.directions[i].text !== "전체") {
          this.directions1.push(this.directions[i])
        }
      }
      //   }
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    announce_list_query(data) {
      // this.daily_stat_list = []
      this.announce_list = []
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.text = data.docs[i].text
        obj.location = data.docs[i].location
        obj.direction = data.docs[i].direction
        obj.time = data.docs[i].time
        obj.checked = data.docs[i].checked
        this.announce_list.push(obj)
        // let obj = data.docs[i].daily_stat_list
        console.log(obj)
        // obj.date = format_time2(new Date(obj.day_loop_event_time))
        // this.daily_stat_list.push(obj)
      }
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.location = c.location
      this.current.direction = c.direction
      this.current.text = c.text
      this.current.checked = c.checked
      console.log("this : ", this)
    },
    modifyClose() {
      this.modifyIs = false
    },
    item_date_click: function() {
      console.log("date sort")
      let temp10 = []
      if (this.sort_item.date === false) {
        console.log("date sort1")
        this.sort_item.date = true
        temp10 = _.sortBy(this.daily_stat_list, "date")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("date sort2")
        this.sort_item.date = false
        temp10 = _.sortBy(this.daily_stat_list, "date")
        return (this.daily_stat_list = temp10)
      }
    },
    item_total_vehicle_obj_list_click: function() {
      console.log("total_vehicle_obj_list sort")
      let temp10 = []
      if (this.sort_item.total_vehicle_obj_list === false) {
        console.log("total_vehicle_obj_list sort1")
        this.sort_item.total_vehicle_obj_list = true
        temp10 = _.sortBy(this.daily_stat_list, "total_vehicle_obj_list")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("total_vehicle_obj_list sort2")
        this.sort_item.total_vehicle_obj_list = false
        temp10 = _.sortBy(this.daily_stat_list, "total_vehicle_obj_list")
        return (this.daily_stat_list = temp10)
      }
    },
    item_fee_click: function() {
      console.log("fee sort")
      let temp10 = []
      if (this.sort_item.fee === false) {
        console.log("fee sort1")
        this.sort_item.fee = true
        temp10 = _.sortBy(this.daily_stat_list, "fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("fee sort2")
        this.sort_item.fee = false
        temp10 = _.sortBy(this.daily_stat_list, "fee")
        return (this.daily_stat_list = temp10)
      }
    },
    item_discounted_fee_click: function() {
      console.log("discounted_fee sort")
      let temp10 = []
      if (this.sort_item.discounted_fee === false) {
        console.log("discounted_fee sort1")
        this.sort_item.discounted_fee = true
        temp10 = _.sortBy(this.daily_stat_list, "discounted_fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("discounted_fee sort2")
        this.sort_item.discounted_fee = false
        temp10 = _.sortBy(this.daily_stat_list, "discounted_fee")
        return (this.daily_stat_list = temp10)
      }
    },
    item_paid_fee_click: function() {
      console.log("paid_fee sort")
      let temp10 = []
      if (this.sort_item.paid_fee === false) {
        console.log("paid_fee sort1")
        this.sort_item.paid_fee = true
        temp10 = _.sortBy(this.daily_stat_list, "paid_fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("paid_fee sort2")
        this.sort_item.paid_fee = false
        temp10 = _.sortBy(this.daily_stat_list, "paid_fee")
        return (this.daily_stat_list = temp10)
      }
    },
    item_resident_fee_click: function() {
      console.log("resident_fee sort")
      let temp10 = []
      if (this.sort_item.resident_fee === false) {
        console.log("resident_fee sort1")
        this.sort_item.resident_fee = true
        temp10 = _.sortBy(this.daily_stat_list, "resident_fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("resident_fee sort2")
        this.sort_item.resident_fee = false
        temp10 = _.sortBy(this.daily_stat_list, "resident_fee")
        return (this.daily_stat_list = temp10)
      }
    },
    download: function() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.daily_stat_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        "하테크노타운주차장_공지사항_" + postfix + ".xlsx"
      )
    }
  }
}
/*
function format_time1(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  str += "." + num_to_str(dat.getDate())
  str += ". " + num_to_str(dat.getHours())
  str += ":" + num_to_str(dat.getMinutes())
  str += ":" + num_to_str(dat.getSeconds())
  return str
}
// function format_time2(dat) {
//   var str = ""
//   str += dat.getFullYear()
//   str += "." + num_to_str(dat.getMonth() + 1)
//   str += "." + num_to_str(dat.getDate())
//   return str
// }
function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
function get_datetime_month_addone(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(parseInt(res[0]), parseInt(res[1]), 0, 0, 0, 0, 0)
  return d.getTime()
}
function get_start_time(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    0,
    0,
    0,
    0
  )
  return d.getTime()
}

function get_end_time(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    23,
    59,
    59,
    999
  )
  return d.getTime()
}*/
// function get_datetime(str) {
//   var res = str.split(/[-T.:\s]+/)
//   var d = new Date(
//     parseInt(res[0]),
//     parseInt(res[1]) - 1,
//     parseInt(res[2]),
//     parseInt(res[3]),
//     parseInt(res[4]),
//     0,
//     0
//   )
//   return d.getTime()
// }
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style>
</style>
