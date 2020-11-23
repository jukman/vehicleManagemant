<template>
  <div class="report_wrap">
    <div class="title">
      <h2>{{mainTitle[0].subMenu[0].title}}</h2>
    </div>
    <form class="menu_title">
      <span class="small_title">날짜</span>
      <!--<input type="datetime-local" id="start_time" v-model="start_time" /> -->
      <input type="date"  v-model="start_time" />
      <span>~</span>
      <!--<input type="datetime-local" id="end_time" v-model="end_time" /> -->
      <input type="date"  v-model="end_time" />
      <!--<span class="small_title">장소</span>
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
      </select> -->
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
      <button @click.prevent="excelDownFunc" class="save_btn"><font-awesome-icon icon="save" />저장</button>
      <button @click.prevent="download" class="upload">
        <font-awesome-icon icon="upload" />올리기
      </button>
      <button @click.prevent="excelUp">
        <font-awesome-icon icon="clipboard" />양식받기
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
                <dt>차량번호<span>*</span></dt>
                <dd> <input
                type="text"
                placeholder="예) 12가3456"
                required
                v-model="reg.lp"
              /></dd>
              </dl>
              <dl>
                <dt>시작시점<span>*</span></dt>
                <!--<dd><input type="date" id="start_time" v-model="reg.startTime" /></dd> -->
                <dd><input type="date"  v-model="reg.startTime"  required /></dd>
              </dl>
              <dl>
                <dt>이름<span>*</span></dt>
                <dd><input type="text" v-model="reg.name" required /></dd>
              </dl>
              <dl>
                <dt>종료시점<span>*</span></dt>
               <!-- <dd><input type="date" id="end_time" v-model="reg.endTime" /></dd> -->
                 <dd><input type="date" v-model="reg.endTime" required /></dd> 
              </dl>
              <dl>
                <dt>연락처</dt>
                <dd><input type="text" v-model="reg.phone" /></dd>
              </dl>
              <dl>
                <dt>분류<span>*</span></dt>
                <dd>
                  <select>
                  <option v-for="(sea, index) in seasonTicket" v-bind:key="index" required>
                    {{ sea.kind }}
                  </option>
                </select>
                </dd>                  
              </dl>
              <dl>
                <dt>그룹</dt>
                <dd><input type="text" v-model="reg.group" /></dd>
              </dl>
              <dl>
                <dt>상품명</dt>
                <dd><input type="text" v-model="reg.product_name" /></dd>
              </dl>
              <dl>
                <dt>월 차량요금</dt>
                <dd><input type="text" v-model="reg.month_fee" /></dd>
              </dl>
              <dl>
                <dt>무료 차량 유무</dt>
                <dd>
                   <select>
                  <option v-for="(free, index) in freeVehicle" v-bind:key="index">
                    {{ free.whether }}
                  </option>
                </select>                  
                  </dd>
              </dl>
              <dl>
                <dt>할인 감면 내용</dt>
                <dd><input type="text" v-model="reg.discount_reduction" /></dd>
              </dl>
              <dl>
                <dt>신규 연장 여부</dt>
                <dd>
                   <select>
                  <option v-for="(ne, index) in newExtension" v-bind:key="index">
                    {{ ne.whether }}
                  </option>
                </select>                     
                  </dd>
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
        <li v-for="(li , index) in listItem "  :key="index" >{{li.title}}</li>
      
      </ul>
      <ul class="list-wrap">
        <li v-for="(res, index) in list_sales_list" :key="index" :class="{active:res.listActive}">
          <span class="number"> {{ index + 1 }}</span>
          <span class="lp"
            ><input
              type="text"
              v-model="res.lp"
              readonly
              v-on:change="contents_change(index)"
          /></span>
          <span class="time"
            ><input type="text" v-model="res.period_start" 
          /></span>
          <span class="time_end"
            ><input type="text" v-model="res.period_end" 
          /></span>
          <span class="location"
            ><input type="text" v-model="res.name" 
          /></span>
          <span class="direction"
            ><input type="text" v-model="res.phone" 
          /></span>
          <span class="registered"
            ><input type="text" v-model="res.kind1" 
          /></span>
          <span class="dong_ho"
            ><input type="text" v-model="res.group" 
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
import XLSX from 'xlsx'
import config from "../../config.js"
import { mapState } from "vuex"
export default {
  data() {
    return {      
      start_time: format_time1(new Date(Date.now())),
      end_time: format_time1(new Date(Date.now())),
      resistIs:false,
      listItem:[
        {title:"번호"},
        {title:"차량번호"},
        {title:"개시시점"},
        {title:"종료시점"},
        {title:"이름"},
        {title:"연락처"},
        {title:"분류"},
        {title:"그룹"},
        {title:"비고"},],
       reg: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime: format_time1(new Date(Date.now())),
        name: "",
        phone: "",
        kind1: "",
        contents: "",
        number: "",
        group: "",
        product_name: "",
        month_fee: "",
        fee_vehicle: "",
        discount_reduction: "",
        new_extend: "",        
        seasonTicket:[],
        freeVehicle:[],
        newExtension:[]        
      },
      freeVehicle:"유료",
      newExtension:"신규",
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
      list_sales_list: [],
      searchLocation: "",
      searchDirection: "",
      locations: [],
      directions: []
    }
  },
  computed:{
    ...mapState(["mainTitle"])    
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if(data.kind === 'get_sales_list'){
        this.sales_list(data)       
      }
    })
    this.start()      
  },
  methods: {   
    excelDownFunc(){      
     // 엑셀 워크시트로 json 내보내기
      // 배열만 가능
      var dataWS = XLSX.utils.json_to_sheet(this.list_sales_list);
      // 엑셀의 workbook을 만든다
      // workbook은 엑셀파일에 지정된 이름이다.
      var wb = XLSX.utils.book_new();
      // workbook에 워크시트 추가
      // 시트명은 'nameData'
      XLSX.utils.book_append_sheet(wb, dataWS, 'nameData');
      // 엑셀 파일을 내보낸다.
      XLSX.writeFile(wb, '정기권관리.xlsx'); 
    }, 
    excelUp(){      
     // 엑셀 워크시트로 json 내보내기
      // 배열만 가능
      var dataWS = XLSX.utils.json_to_sheet(this.listItem.title);
      // 엑셀의 workbook을 만든다
      // workbook은 엑셀파일에 지정된 이름이다.
      var wb = XLSX.utils.book_new();
      // workbook에 워크시트 추가
      // 시트명은 'nameData'
      XLSX.utils.book_append_sheet(wb, dataWS, 'nameData');
      // 엑셀 파일을 내보낸다.
      XLSX.writeFile(wb, '정기권관리.xlsx'); 
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
      this.admin.group = ""
      this.admin.product_name = ""
      this.admin.month_fee = ""
      this.admin.fee_vehicle = ""
      this.admin.discount_reduction = ""
      this.admin.new_extend = ""
      this.resistIs = true       
    },
    registClose() {
      this.resistIs = false
    },    
    registNew(e) {
      this.registClose()
      e.preventDefault()      
      let obj = {}
      let startTime = this.reg.startTime + ".00:00:00"
      let endTime =  this.reg.endTime + ".23:59:59"
      obj.lp = this.reg.lp
      obj.period_start = get_datetime(startTime)
      obj.period_end = get_datetime(endTime)
      obj.name = this.reg.name     
      obj.phone = this.reg.phone     
      obj.kind1 = this.reg.kind1     
      obj.contents = this.reg.contents     
      obj.group = this.reg.group
      obj.product_name = this.reg.product_name     
      obj.month_fee = this.reg.month_fee
      obj.fee_vehicle = this.reg.fee_vehicle     
      obj.discount_reduction = this.reg.discount_reduction    
      obj.new_extend = this.reg.new_extend                 
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
      this.seasonTicket = config.seasonTicket
      this.freeVehicle = config.freeVehicle
      this.newExtension = config.newExtension
      this.locations = location_list
      this.directions = direction_list
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    sales_list(data){    
      this.list_sales_list = []     
      for(let i = 0; i < data.docs.length; i++){
        let obj = {}
        obj.lp = data.docs[i].lp
        obj.period_start = format_date(new  Date(data.docs[i].period_start))
        obj.period_end = format_date(new Date(data.docs[i].period_end))
        obj.name = data.docs[i].name     
        obj.phone = data.docs[i].phone     
        obj.kind1 = data.docs[i].kind1     
        obj.contents = data.docs[i].contents     
        obj.group = data.docs[i].group
        obj.product_name =data.docs[i].product_name     
        obj.month_fee = data.docs[i].month_fee
        obj.fee_vehicle = data.docs[i].fee_vehicle     
        obj.discount_reduction = data.docs[i].discount_reduction    
        obj.new_extend = data.docs[i].new_extend
        obj.number = data.docs[i].lp.number
        obj.kind = data.docs[i].kind
        obj.time = data.docs[i].time
        let set = format_date2(new Date(data.docs[i].period_end))
        let manual = format_date2(new Date())
        let setting = Number(set)
        let manualing = Number(manual)
         console.log("변수", Number(set),Number(manual));
        if(setting < manualing ){
          obj.listActive = true           
        }       
          this.list_sales_list.push(obj)
        }
      let temp = {}
      this.list_sales_list.push(temp)
      this.list_sales_list.pop()

    },
    search() {
      var obj = {}
      obj.kind = ""
      obj.lp = this.seachNumber
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      obj.kind ="get_sales_list"
      this.sendMessage(obj)       
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    start(){
      let now = Date.now()
      this.start_time = format_date(new Date(now))
      this.end_time = format_date(new Date(now))      
      this.loc_dir()
      this.search()
    }
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
function format_date(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "-" + num_to_str(dat.getMonth() + 1)
  str += "-" + num_to_str(dat.getDate())
  return str
}
function format_date2(dat) {
  var str = ""
  str += dat.getFullYear()
  str += num_to_str(dat.getMonth() + 1)
  str += num_to_str(dat.getDate())
  return str
}
function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style>
</style>
