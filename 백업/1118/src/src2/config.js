module.exports = {
  image_src: "http://localhost:3000/images/",
  //image_src: "localhost:3000/images/",
  parking_name: "하계테크노타운 주차장",
  web_server_address: "http://localhost:3000",
  //web_server_address: "localhost:3000",
  lpr_list: [
    {
      ip: "192.168.7.42",
      port: 9011,
      location: "정문입구", //입구1, 출구1, 입출구
      direction: "in", //"in", "out", "undefined"
      siteid: "A0001",
      machinemodel: "M201S",
      machineid: "01",
      web_barrier_mode: "unlock",
      weekly_time_barrier_mode: "unlock",
      lane_config: "입출차구분", //1 : "입출차구분"
      used_barrir: 0,
      barrier_control: true,
      description: "정문입구_입차",
      active: false
    },
    {
      ip: "192.168.7.42",
      port: 9012,
      location: "정문출구", //입구1, 출구1, 입출구
      direction: "out", //"in", "out", "undefined"
      siteid: "A0001",
      machinemodel: "M201S",
      machineid: "02",
      web_barrier_mode: "unlock",
      weekly_time_barrier_mode: "unlock",
      lane_config: "하나의 차로로 입차", //1 : "입출차구분", 2 : "하나의 차로로 입출차",
      used_barrir: 1,
      barrier_control: true,
      description: "정문출구_출차",
      active: false
    },
    {
      ip: "192.168.7.42",
      port: 9013,
      location: "정문출구", //입구1, 출구1, 입출구
      direction: "in", //"in", "out", "undefined"
      siteid: "A0001",
      machinemodel: "M201S",
      machineid: "03",
      web_barrier_mode: "unlock",
      weekly_time_barrier_mode: "unlock",
      lane_config: "하나의 차로로 입차", //1 : "입출차구분", 2 : "하나의 차로로 입출차",
      used_barrir: 1,
      barrier_control: false,
      description: "정문출구_입차",
      active: false
    },
    {
      ip: "192.168.7.42",
      port: 9014,
      location: "지하_입구1", //입구1, 출구1, 입출구
      direction: "in", //"in", "out", "undefined"
      siteid: "A0001",
      machinemodel: "M201S",
      machineid: "04",
      web_barrier_mode: "unlock",
      weekly_time_barrier_mode: "unlock",
      lane_config: "하나의 차로로 입차", //1 : "입출차구분", 2 : "하나의 차로로 입출차",
      used_barrir: 1,
      barrier_control: true,
      description: "지하_입구1",
      active: false
    },
    {
      ip: "192.168.7.42",
      port: 9015,
      location: "지하_입구2", //입구1, 출구1, 입출구
      direction: "in", //"in", "out", "undefined"
      siteid: "A0001",
      machinemodel: "GL125G",
      machineid: "05",
      web_barrier_mode: "unlock",
      weekly_time_barrier_mode: "unlock",
      lane_config: "하나의 차로로 입차", //1 : "입출차구분", 2 : "하나의 차로로 입출차",
      used_barrir: 1,
      barrier_control: true,
      description: "지하_입구2(식당주차장)",
      active: false
    }
  ],
  ip_camera_list: [
    {
      //"url_dns" : "http://yjezp.iptime.org:90/snapshot/1/snapshot.jpg",
      //"url_dns" : "http://192.168.7.121:80/snapshot/1/snapshot.jpg",
      ip: "192.168.7.51",
      setup: [],
      camera_id: "A", //"A" : front_1, "B" : front_2, "R" : rear
      description: "정문입구_입차",
      type: "NOVA", //SA : 시큐리티 에비던스, NOVA : 노바
      location: "정문입구",
      direction: "in",
      active: false
    },
    {
      //"url_dns" : "http://yjezp.iptime.org:90/snapshot/1/snapshot.jpg",
      //"url_dns" : "http://192.168.7.121:80/snapshot/1/snapshot.jpg",
      ip: "192.168.7.81",
      camera_id: "B", //"A" : front_1, "B" : front_2, "R" : rear
      description: "정문입구_입차",
      type: "NOVA", //SA : 시큐리티 에비던스, NOVA : 노바
      location: "정문입구",
      direction: "in",
      active: false
    },
    {
      //"url_dns" : "http://yjezp.iptime.org:90/snapshot/1/snapshot.jpg",
      //"url_dns" : "http://192.168.7.121:80/snapshot/1/snapshot.jpg",
      ip: "192.168.7.56",
      camera_id: "A", //"A" : front_1, "B" : front_2, "R" : rear
      description: "정문출구_출차",
      type: "NOVA", //SA : 시큐리티 에비던스, NOVA : 노바
      location: "정문출구",
      direction: "out",
      active: false
    },
    {
      //"url_dns" : "http://yjezp.iptime.org:90/snapshot/1/snapshot.jpg",
      //"url_dns" : "http://192.168.7.121:80/snapshot/1/snapshot.jpg",
      ip: "192.168.7.60",
      camera_id: "A", //"A" : front_1, "B" : front_2, "R" : rear
      description: "정문출구_입차",
      type: "NOVA", //SA : 시큐리티 에비던스, NOVA : 노바
      location: "정문출구",
      direction: "in",
      active: false
    },
    {
      //"url_dns" : "http://yjezp.iptime.org:90/snapshot/1/snapshot.jpg",
      //"url_dns" : "http://192.168.7.121:80/snapshot/1/snapshot.jpg",
      ip: "192.168.7.71",
      camera_id: "A", //"A" : front_1, "B" : front_2, "R" : rear
      description: "지하입구1",
      type: "NOVA", //SA : 시큐리티 에비던스, NOVA : 노바
      location: "지하입구1",
      direction: "in",
      active: false
    },
    {
      //"url_dns" : "http://yjezp.iptime.org:90/snapshot/1/snapshot.jpg",
      //"url_dns" : "http://192.168.7.121:80/snapshot/1/snapshot.jpg",
      ip: "192.168.7.76",
      camera_id: "A", //"A" : front_1, "B" : front_2, "R" : rear
      description: "지하입구2_입차(식당)",
      type: "NOVA", //SA : 시큐리티 에비던스, NOVA : 노바
      location: "지하입구2",
      direction: "in",
      active: false
    }
  ],
  location_list: [
    { text: "정문입구" },
    { text: "정문출구" },
    { text: "지하입구1" },
    { text: "지하입구2" },
    { text: "전체" }
  ],
  units: [
    { text: "1원" },
    { text: "10원" },   
  ],
  estimates: [
    { text: "올림" },
    { text: "버림" },  
  ],
  seasonTicket: [{ kind: "종일제" }, { kind: "주간제" }, { kind: "야간제" }, { kind: "주휴제" }],
  freeVehicle: [{whether:"유료"},{whether:"무료"}],  
  newExtension: [{whether:"신규"},{whether:"연장"}],  
  add: 
    { hour: "" ,minute: "" ,price: "" ,   count: "infinite" ,  countCheck: "" }  
  ,
  add2: 
    { hour: "" ,minute: "" ,price: "" ,   count: "infinite" ,  countCheck: "" }  
  ,
  add3: 
    { hour: "" ,minute: "" ,price: "" ,   count: "infinite" ,  countCheck: "" }  
  ,
  add4: 
    { hour: "" ,minute: "" ,price: "" ,   count: "infinite" ,  countCheck: "" }  
  ,
  add5: 
    { hour: "" ,minute: "" ,price: "" ,   count: "infinite" ,  countCheck: "" }  
  ,
  direction_list: [{ text: "in" }, { text: "out" }, { text: "전체" }],
  barrier_display_list: [
    {
      kind_bar_status: "barrier_status",
      kind_bar_policy: "bar_ploicy",
      status: "down",
      location: "정문입구",
      direction: "in",
      lp: "123가4567",
      image_display: false,
      barrier_control_display: true,
      barrier_policy_name: "barrier_policy1",
      image_name: require("./assets/car_test1.jpg"),
      checkedNames: "all_vehicle"
    },
    {
      kind: "barrier_status",
      status: "down",
      location: "정문출구",
      direction: "out",
      lp: "546가1517",
      image_display: false,
      barrier_control_display: true,
      barrier_policy_name: "barrier_policy2",
      image_name: require("./assets/car_test2.jpg"),
      checkedNames: "registered_vehicle"
      // checkedNames: "all_vehicle"
    },
    {
      kind: "barrier_status",
      status: "down",
      location: "정문출구",
      direction: "in",
      lp: "00가1111",
      image_display: false,
      barrier_control_display: false,
      barrier_policy_name: "barrier_policy3",
      image_name: require("./assets/car_test3.jpg"),
      checkedNames: "special_vehicle"
      //checkedNames: "all_vehicle"
    },
    {
      kind: "barrier_status",
      status: "down",
      location: "지하입구1",
      direction: "in",
      lp: "00가1111",
      image_display: false,
      barrier_control_display: true,
      barrier_policy_name: "barrier_policy4",
      image_name: require("./assets/car_test4.jpg"),
      checkedNames: "registered_vehicle"
      //checkedNames: "all_vehicle"
    },
    {
      kind: "barrier_status",
      status: "down",
      location: "지하입구2",
      direction: "in",
      lp: "00가1111",
      image_display: false,
      barrier_control_display: true,
      barrier_policy_name: "barrier_policy5",
      image_name: require("./assets/car_test2.jpg"),
      checkedNames: "registered_vehicle"
      //checkedNames: "all_vehicle"
    }
  ]
}
