<template>
<div class="report_wrap">
    <div class="title">
      <h2>{{mainTitle[0].subMenu[0].title}}</h2>
    </div>
    <form class="menu_title">
      <span class="small_title">날짜</span>
      <input type="datetime-local" id="start_time" v-model="start_time" />
      <span>~</span>
      <input type="datetime-local" id="end_time" v-model="end_time" />
      <span class="small_title">장소</span>
      <select v-model="searchLocation">
        <option v-for="(location1, index) in locations" :key="index">
          {{ location1.text }}
        </option>
      </select>
      <span class="small_title">방향</span>
      <select v-model="searchDirection">
        <option v-for="(direction1, index) in directions" :key="index">
          {{ direction1.text }}
        </option>
      </select>
      <span class="small_title">차량번호</span>
      <input
        class="search_icon"
        type="text"
        maxlength="8"
        v-model="seachNumber"
        placeholder="예) 12가3456"
      />
      <button @click.prevent="search" type="submit">
        <font-awesome-icon icon="search" />
      </button>      
    </form>
    <div class="writeRecord">
      <button @click.prevent="registOpen" class="registerbtn">등록</button>
      <button @click.prevent="download">
        <font-awesome-icon icon="save" />
      </button>
    </div>
    <!-- 등록팝업 -->
    <div class="resist_pop popup" v-show="resistIs">
        <div>
          <h3>{{mainTitle[0].subMenu[0].title}} 등록</h3>
          <button @click="registClose">
            <font-awesome-icon icon="window-close" />
          </button>
          <div class="form_window">
            <form>
              <dl>
                <dt>차량번호<span>(필수)</span></dt>
                <dd> <input
                type="text"
                placeholder="이곳에 차량번호를 입력해주세요."
                required
                v-model="reg.lp"
              /></dd>
              </dl>
              <dl>
                <dt>개시시점</dt>
                <dd><input type="date" id="start_time" v-model="reg.startTime" /></dd>
              </dl>
              <dl>
                <dt>이름</dt>
                <dd><input type="text" v-model="reg.name" /></dd>
              </dl>
              <dl>
                <dt>종료시점</dt>
                <dd><input type="date" id="end_time" v-model="reg.endTime" /></dd>
              </dl>
              <dl>
                <dt>연락처</dt>
                <dd><input type="text" v-model="reg.phone" /></dd>
              </dl>
              <dl>
                <dt>분류</dt>
                <dd><input type="text" v-model="reg.kind1" /></dd>
              </dl>
              <dl>
                <dt>그룹</dt>
                <dd><input type="text" v-model="reg.kind1" /></dd>
              </dl>
              <dl>
                <dt>상품명</dt>
                <dd><input type="text" v-model="reg.kind1" /></dd>
              </dl>
              <dl>
                <dt>월 차량요금</dt>
                <dd><input type="text" v-model="reg.kind1" /></dd>
              </dl>
              <dl>
                <dt>무료 차량 유무</dt>
                <dd><input type="text" v-model="reg.kind1" /></dd>
              </dl>
              <dl>
                <dt>할인 감면 내용</dt>
                <dd><input type="text" v-model="reg.kind1" /></dd>
              </dl>
              <dl>
                <dt>신규 연장 여부</dt>
                <dd><input type="text" v-model="reg.kind1" /></dd>
              </dl>
              <dl>
                <dt>비고</dt>
                <dd><input type="text" v-model="reg.contents" /></dd>
              </dl>
              
              <button @click.prevent="registNew" class="writebtn">등록</button>
            </form>
          </div>
        </div>
      </div>
    <div class="list-items">
      <ul class="list-title">
        <li>번호</li>
        <li>차량번호</li>
        <li>개시시점</li>
        <li>종료시점</li>
        <li>이름</li>
        <li>연락처</li>
        <li>분류</li>
        <li>그룹</li>
        <li>비고</li>
      </ul>
      <ul class="list-wrap">
        <li v-for="(res, index) in vehicle_obj_list" :key="index">
          <span> {{ index + 1 }}</span>
          <span class="lp"
            ><input
              type="text"
              v-model="res.lp"
              readonly
              v-on:change="contents_change(index)"
          /></span>
          <span class="time"
            ><input type="text" v-model="res.in_time" readonly
          /></span>
          <span class="time"
            ><input type="text" v-model="res.in_time" readonly
          /></span>
          <span class="location"
            ><input type="text" v-model="res.location" readonly
          /></span>
          <span class="direction"
            ><input type="text" v-model="res.direction" readonly
          /></span>
          <span class="registered"
            ><input type="text" v-model="res.registered" readonly
          /></span>
          <span class="dong_ho"
            ><input type="text" v-model="res.dong_ho" readonly
          /></span>
          <span class="contents"
            ><input
              type="text"
              v-model="res.contents"
              v-on:change="contents_change(index)"              
          /></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import config from "../../config.js"
import { mapState } from "vuex"
export default {
  data() {
    return {
      resistIs:false,
       reg: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime:"" ,
        name: "",
        phone: "",
        kind1: "",
        contents: "",
        number: ""
      },
       admin: [
        {
          order: "",
          lp: "",
          startTime: "",
          endTime: "",
          name: "",
          phone: "",
          kind1: "",
          contents: "",
          number: "",
          check: true
        }
      ],
      vehicle_obj_list: [
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
        {
          in_time: "2020.09.14. 00:03:44",
          location: "정문입구",
          direction: "in",
          lp: "서울86자5051",
          registered: "등록차량",
          dong_ho: " ",
          contents: "공적차량"
        },
      ],
      searchLocation: "",
      searchDirection: "",
      locations: [],
      directions: []
    }
  },
  computed:{
    ...mapState(["mainTitle"])    
  },
  methods: {    
    registOpen() {       
      this.admin.lp = ""
      this.admin.startTime = ""
      this.admin.endTime = ""
      this.admin.name = ""
      this.admin.phone = ""
      this.admin.kind1 = ""
      this.admin.contents = ""
      this.admin.number = ""
      this.resistIs = true 
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      console.log("this.reg : ", this.reg)
      let obj = {}
      let startTime = this.reg.startTime + ".00:00:00"
      let endTime =  this.reg.endTime + ".23:59:59"
      obj.lp = this.reg.lp
      obj.period_start = get_datetime(startTime)
      obj.period_end = get_datetime(endTime)
      obj.name = this.reg.name
      obj.phone1 = this.reg.phone
      obj.company = this.reg.kind1
      obj.contents = this.reg.contents
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "create_sales_at_sales_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    loc_dir() {
      this.locations = []
      this.directions = []
      let location_list = []
      let direction_list = []
      location_list = config.location_list
      direction_list = config.direction_list
      this.locations = location_list
      this.directions = direction_list
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    search() {
      var obj = {}
      obj.kind = ""
      obj.lp = this.seachNumber
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      this.vehicle_obj_list = []
      this.sendMessage(obj)
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      this.socket_process(data)
      this.sales_list(data)
    })
    this.loc_dir()
    this.search1()
  }
}
function get_datetime(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    parseInt(res[3]),
    parseInt(res[4]),
    0,
    0
  )
  return d.getTime()
}
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
function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style>
</style>
