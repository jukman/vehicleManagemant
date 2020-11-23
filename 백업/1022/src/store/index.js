import Vue from "vue"
import Vuex from "vuex"
// import router from "@/router"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 로그인유무
    loginSuccess: false,
    // 미인식차량이미지
    statusSignal: false,
    // 수동입차
    manualEntrySignal: false,
    // 수동출차
    manualInputSignal: false,
    // 무료운영
    freeOperation: false,
    // 할인적용
    discount: false,
    ectPop: false,
    newPopup: false,
    outSignal: false,
    reduct: false,
    calculateUse: false,
    activation: false,
    active: false,
    mainTitle:[
      {
        menu: "관리기능", subMenu: [
          {title: "정기권 관리", add: "go1"},
          {title: "입주사 관리", add: "go2"},
          {title: "블랙 리스트 관리", add: "go2"},
          {title: "직원 관리", add: "go2"},
          {title: "주차장 정보 관리", add: "go2"},
          {title: "할인 쿠폰 정책 관리", add: "go2"},
          {title: "할인 감면 정책 관리", add: "go2"},
          {title: "공휴일 등록", add: "go2"},
          {title: "정기권 판매 관리", add: "go2"},
          {title: "할인권 판매 관리", add: "go2"},
          {title: "입주사 할인권 현황", add: "go2"},
          {title: "주차 상품 관리", add: "go2"},
        ]
      },
      {
        menu: "운영기능", subMenu: [
          { title: "차량출입(실시간)", add: "go1"},
          { title: "이미지 촬영", add: "go2"},
          { title: "차단기 개방 정책", add: "go2" },
          { title: "공지사항(정산소)", add: "go2" },
          { title: "공지사항(전광판)", add: "go2" }
        ]
      },
      {
        menu: "조회기능", subMenu: [
          { title: "차량출입", add: "go1" },
          { title: "입주사 방문 기록(입차)", add: "go2" },
          { title: "입주사 방문 기록(출차)", add: "go2" },
          { title: "정산기록", add: "go2" },
          { title: "정산기 이용 기록", add: "go2" },
          { title: "입주사 방문 등록", add: "go2" },
          { title: "현금 정산 기록", add: "go2" },
          { title: "할인 쿠폰 기록", add: "go2" },
          { title: "할인 감면 기록", add: "go2" },
          { title: "수동(입차,출차,차단기 제어)조회", add: "go2" },
          { title: "장비 장애 기록", add: "go2" },          
        ]
      },
      {
        menu: "통계기능", subMenu: [
          { title: "일별 정산", add: "go1" },
          { title: "월별 정산", add: "go2" },
          { title: "일별 할인 쿠폰", add: "go2" },
          { title: "일별 할인 감면", add: "go2" },
          { title: "월별 할인 쿠폰", add: "go2" },
          { title: "월별 할인 감면", add: "go2" },
          { title: "정산소(일마감)", add: "go2" },
          { title: "입주사 일 정산", add: "go2" },
          { title: "입주사 월 정산", add: "go2" },
        ]
      }
      
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
})
