import Vue from "vue"
import VueRouter from "vue-router"
// import store from "@/store"
Vue.use(VueRouter)

// const checkLogin = (to, from, next) => {
//   if (localStorage.admin_status !== "ok") {
//     alert("로그인을 해야합니다.")
//     next("/")
//   } else {
//     next()
//     store.state.fresh = false
//   }
// }

const routes = [

  {
    path: "/live_vehicle",
    name: "live_vehicle",
    // beforeEnter: checkLogin,
    component: () =>
      import(/* webpackChunkName: "live_vehicle" */ "../components/live_vehicle.vue")
  },
  {
    path: "/go1",
    name: "go1",
    // beforeEnter: checkLogin,
    component: () =>
      import(/* webpackChunkName: "go1" */ "../components/go1.vue")
  },
  {
    path: "/go2",
    name: "go2",
    // beforeEnter: checkLogin,
    component: () =>
      import(/* webpackChunkName: "go2" */ "../components/go2.vue")
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
