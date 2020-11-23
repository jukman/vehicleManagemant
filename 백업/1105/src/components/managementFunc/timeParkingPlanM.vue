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
    <div class="parking_plan popup" v-show="resistIs">
        <div>
          <h3>{{mainTitle[0].subMenu[4].title}} 등록</h3>
          <button @click="registClose">
            <font-awesome-icon icon="window-close" />
          </button>
          <div class="form_window">
            <form>
              <dl>
                <dt>적용<span class="essential">*</span></dt>
                <dd>  
                  <label><input type="radio" value="y" v-model="checkedNames" /><span>Y</span></label>
                <label
                  ><input
                    type="radio"
                    value="n"
                    v-model="checkedNames"
                  /> <span>N</span></label>
              </dd>
              </dl>
              <dl>
                <dt>요금제명<span class="essential">*</span></dt>
                <dd><input type="text" v-model="planName" class="rate_plan"/></dd>
              </dl>
              <dl>
                <dt>절상/절삭<span class="essential">*</span></dt>
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
                   <h6> 기본요금<span class="essential">*</span></h6>
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
                   <label><input
                  type="text"
                  id="defaultPrice"
                  v-model="def.price"
                  maxlength="7"                  
                  required
                  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"                  
                /><span>원</span></label>                                   
                  <label><input type="radio" value="infinite" v-model="def.count" /><span>무한</span></label>
                  <label><input type="radio" value="count" v-model="def.count" /><span>횟수</span>
                  <input type="text" :disabled="def.count == 'infinite'"  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"><span>회</span>
                  </label>
                  </dd>
                 <dd>
                    <h6>추가요금</h6>  
                   <label><input type="text" id="hour" v-model="add.hour" /><span>시간</span></label>
                   <label><input type="text" id="minute" v-model="add.minute" /><span>분</span></label>
                  <label> <input type="text" id="addPrice" v-model="add.price" onKeyup="this.value = this.value.replace(/[^0-9]/g, '');" /><span>원</span></label>
                  <label><input type="radio" value="infinite" v-model="countCheck" /><span>무한</span></label>
                  <label><input type="radio" value="count" v-model="countCheck" /><span>횟수</span>
                  <input type="text" :disabled="countCheck == 'infinite'" 
                  @input="setHour" v-model="countIs"/><span>회</span>
                  </label>
                  </dd>
                  <dd v-show="textShow" class="dayContentsWrap">
                    <h6>추가요금2</h6>
                   <label><input type="text" id="hour" v-model="add2.hour" /><span>시간</span></label>
                   <label><input type="text" id="minute" v-model="add2.minute" /><span>분</span></label>
                  <label> <input type="text" id="addPrice" v-model="add2.price" /><span>원</span></label>
                  <label><input type="radio" value="infinite" v-model="countCheck2" /><span>무한</span></label>
                  <label><input type="radio" value="count" v-model="countCheck2" /><span>횟수</span></label>
                  <label> <input type="text" :disabled="countCheck2 == 'infinite'"  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                  @input="setHour" v-model="countIs2"/><span>회</span>
                  </label>
                  </dd>  
                  <dd v-show="textShow2" class="dayContentsWrap">
                    <h6>추가요금3</h6>
                    <label><input type="text" id="hour" v-model="add3.hour" /><span>시간</span></label>
                    <label><input type="text" id="minute" v-model="add3.minute" /><span>분</span></label>
                    <label> <input type="text" id="addPrice" v-model="add3.price" /><span>원</span></label>
                    <label><input type="radio" value="infinite" v-model="countCheck3" /><span>무한</span></label>
                    <label><input type="radio" value="count" v-model="countCheck3" /><span>횟수</span>
                    <input type="text" :disabled="countCheck3 == 'infinite'"  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                  @input="setHour" v-model="countIs3"/><span>회</span>
                    </label>
                  </dd>  
                  <dd v-show="textShow3" class="dayContentsWrap">
                     <h6>추가요금4</h6>
                    <label><input type="text" id="hour" v-model="add4.hour" /><span>시간</span></label>
                    <label><input type="text" id="minute" v-model="add4.minute" /><span>분</span></label>
                    <label> <input type="text" id="addPrice" v-model="add4.price" /><span>원</span></label>
                    <label><input type="radio" value="infinite" v-model="countCheck4" /><span>무한</span></label>
                    <label><input type="radio" value="count" v-model="countCheck4" /><span>횟수</span>
                    <input type="text" :disabled="countCheck4 == 'infinite'"  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                    @input="setHour" v-model="countIs4"/><span>회</span>
                    </label>
                  </dd>  
                  <dd v-show="textShow4" class="dayContentsWrap">
                     <h6>추가요금5</h6>
                    <label><input type="text" id="hour" v-model="add5.hour" /><span>시간</span></label>
                    <label><input type="text" id="minute" v-model="add5.minute" /><span>분</span></label>
                    <label> <input type="text" id="addPrice" v-model="add5.price" /><span>원</span></label>
                    <label><input type="radio" value="infinite" v-model="countCheck5" /><span>무한</span></label>
                    <label><input type="radio" value="count" v-model="countCheck5" /><span>횟수</span>
                    <input type="text" :disabled="countCheck5 == 'infinite'"  onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                    @input="setHour" v-model="countIs5"/><span>회</span>
                    </label>
                  </dd>  
              </dl>
              <dl class="maxPrice">
                <dt>최대요금</dt>
                <dd>                   
                  <label><h6>일일 최대 요금<span class="essential">*</span></h6><input type="checkbox" v-model="maxPay.limit" :checked="maxPay.limit" /><span>무한</span></label>
                  <input type="text" v-model="maxPay.check" :disabled="maxPay.limit === true"  @input="comma()"/><span>원</span></dd>
                <dd>
                <dd>
                  <label><h6>일일 최대 요금<span class="essential">*</span></h6><input type="checkbox" v-model="maxPay2.limit" :checked="maxPay2.limit" /><span>무한</span></label>
                  <input type="text" v-model="maxPay2.check" :disabled="maxPay2.limit === true" /><span>원</span></dd>               
               
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
      checkedNames:"Y",     
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
      maxPay:{limit:true},
      maxPay2:{limit:true},
      def:
        {count:"infinite"},      
      textShow:false,
      textShow2:false,
      textShow3:false,
      textShow4:false,      
      add:{countCheck:"infinite",countIs:""},      
      add2:{countCheck:"infinite"},      
      add3:{countCheck:"infinite"},
      add4:{countCheck:"infinite"},
      add5:{countCheck:"infinite"},
      countIs:"",           
      countIs2:"",           
      countIs3:"",           
      countIs4:"",           
      countIs5:"",           
      unit: "1원",
      estimate: "올림",
      units: [],
      estimates: [],
      location:"정문입구",
      direction:"in",
      set_hour:"",
      set_min: "",
      planName:"",
      limit:false,
      countCheck:"infinite",
      countCheck2:"infinite",
      countCheck3:"infinite",
      countCheck4:"infinite",
      countCheck5:"infinite",
      onlyNumber:"",
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
    countIs2(){
    // this.countIs = parseInt(this.countIs)
 if (this.countIs2 > 0 ) {            
         this.textShow2 =true             
       } else {        
         this.textShow2 = false     
    }
    },
    countIs3(){
    // this.countIs = parseInt(this.countIs)
 if (this.countIs3 > 0 ) {            
         this.textShow3 =true             
       } else {        
         this.textShow3 = false     
    }
    },
    countIs4(){
    // this.countIs = parseInt(this.countIs)
 if (this.countIs4 > 0 ) {            
         this.textShow4 =true             
       } else {        
         this.textShow4 = false     
    }
    },
    countCheck: function() {      
      if (this.countCheck === "count" ) {  
        this.countIs = ""       
     

      }else{
        this.countIs = ""
       this.textShow2 = false 
      this.textShow3 = false 
      this.textShow4 = false 
                 
      }
    },
    countCheck2: function() {      
      if (this.countCheck2 === "count" ) {  
        this.countIs2 = ""       
     
 
      }else{
        this.countIs2 = "" 
        this.textShow3 = false 
      this.textShow4 = false   
      }
    },
    countCheck3: function() {      
      if (this.countCheck3 === "count" ) {  
        this.countIs3 = ""       
   

      }else{
        this.countIs3 = "" 
         
      this.textShow4 = false  
      }
    },
    countCheck4: function() {      
      if (this.countCheck4 === "count" ) {  
        this.countIs4 = ""       
      
 
      }else{
        this.countIs4 = ""   
      }
    },
    countCheck5: function() {      
      if (this.countCheck5 === "count" ) {  
        this.countIs5 = ""       

      }else{
        this.countIs5 = ""   
      }
    },
    maxPay: {
      handler(){       
        this.maxPay.check = ""
      },
      deep:true  
    }, 
    maxPay2: {
      handler(){       
        this.maxPay2.check = ""
      },
      deep:true  
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
    
//     tt(x){
// let y = x.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
//   let z =y.replace(/,/g,''); 
//   // return val(z.replace(/\B(?=(\d{3})+(?!\d))/g, ","));

//     },
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
    },
  },
  created() {
    this.$socket.on("message_from_server", data => {
      this.socket_process(data)
      this.sales_list(data)
    })
    this.loc_dir()
    this.search1()
    this.ccc()
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

   