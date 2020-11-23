<template>
<div class="report_wrap">
    <div class="title">
      <h2>{{mainTitle[0].subMenu[4].title}}</h2>
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
      <button @click.prevent="registOpen" class="register_btn"> <font-awesome-icon icon="file-signature" />등록
       </button>
      <button @click.prevent="download" class="save_btn"><font-awesome-icon icon="save" />저장</button>
      <button @click.prevent="download" class="upload">
        <font-awesome-icon icon="upload" />올리기
      </button>
      <button @click.prevent="download">
        <font-awesome-icon icon="clipboard" />양식받기
      </button>
    </div>
    <!-- 등록팝업 -->
    <div class="resist_pop popup parking_plan" v-show="resistIs">
        <div>
          <h3>{{mainTitle[0].subMenu[4].title}} 등록</h3>
          <button @click="registClose">
            <font-awesome-icon icon="window-close" />
          </button>
          <div class="form_window">
            <form>
              <dl>
                <dt>적용<span>*</span></dt>
                <dd>  
                  <label><input type="radio" value="적용" v-model="checkedNames" /><span>적용</span></label>
                <label
                  ><input
                    type="radio"
                    value="미적용"
                    v-model="checkedNames"
                  /> <span>미적용</span></label>
              </dd>
              </dl>
              <dl>
                <dt>요금제명<span>*</span></dt>
                <dd><input type="text" v-model="planName"/></dd>
              </dl>
              <dl>
                <dt>절상/절삭<span>*</span></dt>
                <dd>
                  <select v-model="unit">
                  <option v-for="(loc, index) in units" v-bind:key="index">
                    {{ loc.text }}
                  </option>
                </select>
                 <select v-model="estimate">
                  <option v-for="(dir, index) in estimates" v-bind:key="index">
                    {{ dir.text }}
                  </option>
                </select>                    
              </dd>
              </dl>
              <dl class="step_price">
                <dt>단계별 요금</dt>
                <dd>
                  <h6> 기본요금<span>*</span></h6> 
                   <label><input
                  type="text"
                  id="set_time_hour"
                  v-model="set_hour"
                  maxlength="2"
                  required
                  min="0"
                  max="24"
                  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                  @input="setHour"
                /><span>시간</span> </label>
                   <label><input
                  type="text"
                  id="set_time_minutes"
                  v-model="set_min"
                  maxlength="2"                  
                  required
                  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                  @input="setMinute"
                /><span>분</span></label>
                  <label> <input type="text" id="defautPrice" v-model="def.price" /><span>원</span></label>
                  <label><input type="radio" value="infinite" v-model="def.count" /><span>무한</span></label>
                  <label><input type="radio" value="count" v-model="def.count" /><span>횟수</span>
                  <input type="text" v-model="def.countCheck" /><span>회</span>
                  </label>
                  </dd>
                  <dd>
                    <h6>추가요금</h6>  
                   <label><input type="text" id="hour" v-model="add.hour" /><span>시간</span></label>
                   <label><input type="text" id="minute" v-model="add.minute" /><span>분</span></label>
                  <label> <input type="text" id="addPrice" v-model="add.price" /><span>원</span></label>
                  <label><input type="radio" value="infinite" v-model="countCheck" /><span>무한</span></label>
                  <label><input type="radio" value="count" v-model="countCheck" /><span>횟수</span>
                  <input type="text" :disabled="countCheck == 'infinite'"  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                  @input="setHour" v-model="countIs"/><span>회</span>
                  </label>
                  </dd>
                  <dd v-show="textShow" class="dayContentsWrap">
                    <h6>추가요금2</h6>
                   <label><input type="text" id="hour" v-model="add2.hour" /><span>시간</span></label>
                   <label><input type="text" id="minute" v-model="add2.minute" /><span>분</span></label>
                  <label> <input type="text" id="addPrice" v-model="add2.price" /><span>원</span></label>
                  <label><input type="radio" value="infinite" v-model="add2.infinite" /><span>무한</span></label>
                  <label><input type="radio" value="count" v-model="add2.count" /><span>횟수</span>
                  <input type="text" v-model="add2.countCheck" /><span>회</span>
                  </label>
                  </dd>
                  <dd v-show="add2.countCheck" class="dayContentsWrap">
                    <h6>추가요금3</h6>
                   <label><input type="text" id="hour" v-model="add2.hour" /><span>시간</span></label>
                   <label><input type="text" id="minute" v-model="add2.minute" /><span>분</span></label>
                  <label> <input type="text" id="addPrice" v-model="add2.price" /><span>원</span></label>
                  <label><input type="radio" value="infinite" v-model="add2.count" /><span>무한</span></label>
                  <label><input type="radio" value="count" v-model="add2.count" /><span>횟수</span>
                  <input type="text" v-model="add3.countCheck" /><span>회</span>
                  </label>
                  </dd>
              </dl>
              <dl class="maxPrice">
                <dt>최대요금<span>*</span></dt>
                <dd>
                  <label><h6> 일일 최대 요금</h6><input type="checkbox" value="every" v-model="maxPay.limit1" /><span>무한</span></label>
                  <input type="text" v-model="maxPay.everyDay" /><span>원</span></dd>
                <dd>
                  <label><h6> 절대 최대 요금</h6><input type="checkbox" value="never" v-model="maxPay.limit2" /><span>무한</span></label>
                  <input type="text" v-model="maxPay.never" /><span>원</span></dd>
              </dl>         
              <button @click.prevent="registNew" class="writebtn">등록</button>
            </form>
          </div>
        </div>
      </div>
    <div class="list-items">
      <ul class="list-title">
        <li>번호</li>
        <li>사용</li>
        <li>요금제명</li>
        <li>기본요금</li>
        <li>추가요금</li>
        <li>일일 최대 요금</li>
        <li>절대 최대 요금</li>
        <li>절삭/절상</li>        
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
          <span class="time"
            ><input type="text" v-model="res.in_time" readonly
          /></span>
          <span class="location"
            ><input type="text" v-model="res.location" readonly
          /></span>
          <span class="direction"
            ><input type="text" v-model="res.direction" readonly
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
      checkedNames:"적용",     
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
      stepPay:"",
      maxPay:[],
      def:[],
      add:[],
      textShow:false,
      add2:[],
      add3:[],
      unit: "1원",
      estimate: "올림",
      units: [],
      estimates: [],
      location:"정문입구",
      direction:"in",
      set_hour:"",
      set_min: "",
      planName:"",
      countCheck:"infinite",
      onlyNumber:"",
      countIs:"",           
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
        }
      ],
      searchLocation: "",
      searchDirection: "",
      locations: [],
      directions: []
    }
  },
  watch:{
    onlyNumber(){
 return this.onlyNumber = this.onlyNumber.replace(/[^0-9]/g, '');
    },
    countIs(){
    // this.countIs = parseInt(this.countIs)
 if (this.countIs > 0 ) {            
         this.textShow =true             
       } else {        
         this.textShow = false     
    }
    },
    countCheck: function() {      
      if (this.countCheck === "count" ) {            
        // this.textShow =true             
      } else { 
        this.countIs = ""       
        this.textShow = false        
      }
    },
    //     countCheck: function() {   
    //   this.countIs = toString(this.countIs)          
    //   if (this.countCheck === "infinite" )
    //   this.countIs = toString(this.countIs)             
    //     this.countIs = ""             
     
    // },
    //  countIs: function() {
    //    this.countIs = parseInt(this.countIs)            
    //   if (this.countIs > 0 ) {            
    //     this.textShow =true             
    //   } else {        
    //     this.textShow = false        
    //   }
    // }
  },
  computed:{
    ...mapState(["mainTitle"])    
  },
  methods: {     
    setHour() {
      this.set_hour = this.set_hour.replace(/\D/g, "")
      if (this.set_hour > 24) {
        this.set_hour = ""
        alert("24시보다 작아야 합니다.")
      }
    },
    setMinute() {
      this.set_min = this.set_min.replace(/\D/g, "")
      if (this.set_min > 59) {
        this.set_min = ""
        alert("60분보다 작아야 합니다.")
      }
    },  
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
      this.estimates = config.estimates
      this.units = config.units
      this.add = config.add
   console.log("디스e",this.add)
   console.log("본다",this.add.countCheck)
      // this.countCheck = this.add.countCheck
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
