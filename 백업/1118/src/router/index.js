import Vue from "vue"
import VueRouter from "vue-router"
// import store from "@/store"
Vue.use(VueRouter)


const routes = [
  {
    path: "/managementFunc",
    name: "managementFunc",    
    component: () =>
      import("../components/managementFunc.vue"),
    children: [
      {
        path: "periodicTicketM",
        name: "periodicTicketM",    
    component: () =>
      import("../components/managementFunc/periodicTicketM.vue"),
      },
      {
        path: "tenantM",
        name: "tenantM",    
    component: () =>
      import("../components/managementFunc/tenantM.vue"),
      },
      {
        path: "blackListM",
        name: "blackListM",    
    component: () =>
      import("../components/managementFunc/blackListM.vue"),
      },
      {
        path: "groupListM",
        name: "groupListM",    
    component: () =>
      import("../components/managementFunc/groupListM.vue"),
      },
      {
        path: "staffM",
        name: "staffM",    
    component: () =>
      import(/* webpackChunkName: "staffM" */ "../components/managementFunc/staffM.vue"),
      },
      {
        path: "timeParkingPlanM",
        name: "timeParkingPlanM",    
    component: () =>
      import(/* webpackChunkName: "timeParkingPlanM" */ "../components/managementFunc/timeParkingPlanM.vue"),
      },
      {
        path: "parkingInformationM",
        name: "parkingInformationM",    
    component: () =>
      import(/* webpackChunkName: "parkingInformationM" */ "../components/managementFunc/parkingInformationM.vue"),
      },
      {
        path: "couponProductM",
        name: "couponProductM",    
    component: () =>
      import("../components/managementFunc/couponProductM.vue"),
      },
      {
        path: "reductionProductM",
        name: "reductionProductM",    
    component: () =>
      import("../components/managementFunc/reductionProductM.vue"),
      },
      {
        path: "discountCouponPolM",
        name: "discountCouponPolM",    
    component: () =>
      import("../components/managementFunc/discountCouponPolM.vue"),
      },
      {
        path: "manageDiscountReductPol",
        name: "manageDiscountReductPol",    
    component: () =>
      import("../components/managementFunc/manageDiscountReductPol.vue"),
      },
      {
        path: "publicHolidayRegist",
        name: "publicHolidayRegist",    
    component: () =>
      import("../components/managementFunc/publicHolidayRegist.vue"),
      },
      {
        path: "periodicTicketSalesM",
        name: "periodicTicketSalesM",    
    component: () =>
      import("../components/managementFunc/periodicTicketSalesM.vue"),
      },
      {
        path: "discountPolVisitedVeh",
        name: "discountPolVisitedVeh",    
    component: () =>
      import("../components/managementFunc/discountPolVisitedVeh.vue"),
      },
      {
        path: "discountTicketSalesM",
        name: "discountTicketSalesM",    
    component: () =>
      import("../components/managementFunc/discountTicketSalesM.vue"),
      },
      {
        path: "statusDiscountCoupons",
        name: "statusDiscountCoupons",    
    component: () =>
      import("../components/managementFunc/statusDiscountCoupons.vue"),
      },
      {
        path: "parkingProductM",
        name: "parkingProductM",    
    component: () =>
      import("../components/managementFunc/parkingProductM.vue"),
      }
    ]
  },
  {
  path: "/operatingFunc",
  name: "operatingFunc",    
  component: () =>
    import("../components/operatingFunc.vue"),
  children: [
    {
      path: "vehicleEntryExitLive",
      name: "vehicleEntryExitLive",    
  component: () =>
    import("../components/operatingFunc/vehicleEntryExitLive.vue"),
    },
    {
      path: "imageShooting",
      name: "imageShooting",    
  component: () =>
    import("../components/operatingFunc/imageShooting.vue"),
    },
    {
      path: "breakerOpeningPol",
      name: "breakerOpeningPol",    
  component: () =>
    import("../components/operatingFunc/breakerOpeningPol.vue"),
    },
    {
      path: "noticeCalculationSta",
      name: "noticeCalculationSta",    
  component: () =>
    import("../components/operatingFunc/noticeCalculationSta.vue"),
    },
    {
      path: "noticeElectricalDisplay",
      name: "noticeElectricalDisplay",    
  component: () =>
    import("../components/operatingFunc/noticeElectricalDisplay.vue"),
    },
  ]
  },
  {
    path: "/lookupFunc",
    name: "lookupFunc",    
    component: () =>
      import( "../components/lookupFunc.vue"),
    children: [
      {
        path: "vehicleEntryExit",
        name: "vehicleEntryExit",    
    component: () =>
      import("../components/lookupFunc/vehicleEntryExit.vue"),
      },
      {
        path: "recTenantVisitEntry",
        name: "recTenantVisitEntry",    
    component: () =>
      import("../components/lookupFunc/recTenantVisitEntry.vue"),
      },
      {
        path: "recTenantVisitExit",
        name: "recTenantVisitExit",    
    component: () =>
      import("../components/lookupFunc/recTenantVisitExit.vue"),
      },
      {
        path: "settlementRec",
        name: "settlementRec",    
    component: () =>
      import("../components/lookupFunc/settlementRec.vue"),
      },
      {
        path: "calculatorUtilizationRec",
        name: "calculatorUtilizationRec",    
    component: () =>
      import("../components/lookupFunc/calculatorUtilizationRec.vue"),
      },
      {
        path: "registTenantVisits",
        name: "registTenantVisits",    
    component: () =>
      import("../components/lookupFunc/registTenantVisits.vue"),
      },
      {
        path: "cashSettlementRec",
        name: "cashSettlementRec",    
    component: () =>
      import("../components/lookupFunc/cashSettlementRec.vue"),
      },
      {
        path: "discountCouponRec",
        name: "discountCouponRec",    
    component: () =>
      import("../components/lookupFunc/discountCouponRec.vue"),
      },
      {
        path: "discountReductRec",
        name: "discountReductRec",    
    component: () =>
      import("../components/lookupFunc/discountReductRec.vue"),
      },
      {
        path: "manualCheck",
        name: "manualCheck",    
    component: () =>
      import("../components/lookupFunc/manualCheck.vue"),
      },
      {
        path: "equipmentFailureRec",
        name: "equipmentFailureRec",    
    component: () =>
      import("../components/lookupFunc/equipmentFailureRec.vue"),
      },
    ]
  },
  {
    path: "/statisticsFunc",
    name: "statisticsFunc",    
    component: () =>
      import( "../components/statisticsFunc.vue"),
    children: [
      {
        path: "dailySettlement",
        name: "dailySettlement",    
    component: () =>
      import("../components/statisticsFunc/dailySettlement.vue"),
      },
      {
        path: "monthlySettlement",
        name: "monthlySettlement",    
    component: () =>
      import("../components/statisticsFunc/monthlySettlement.vue"),
      },
      {
        path: "dailyDiscountCoupon",
        name: "dailyDiscountCoupon",    
    component: () =>
      import("../components/statisticsFunc/dailyDiscountCoupon.vue"),
      },
      {
        path: "dailyDiscountReduct",
        name: "dailyDiscountReduct",    
    component: () =>
      import("../components/statisticsFunc/dailyDiscountReduct.vue"),
      },
      {
        path: "monthlyDiscountCoupon",
        name: "monthlyDiscountCoupon",    
    component: () =>
      import("../components/statisticsFunc/monthlyDiscountCoupon.vue"),
      },
      {
        path: "monthlyDiscountReduct",
        name: "monthlyDiscountReduct",    
    component: () =>
      import("../components/statisticsFunc/monthlyDiscountReduct.vue"),
      },
      {
        path: "settlementOffice",
        name: "settlementOffice",    
    component: () =>
      import("../components/statisticsFunc/settlementOffice.vue"),
      },
      {
        path: "dailySettlementTenants",
        name: "dailySettlementTenants",    
    component: () =>
      import("../components/statisticsFunc/dailySettlementTenants.vue"),
      },
      {
        path: "monthlySettlementTenants",
        name: "monthlySettlementTenants",    
    component: () =>
      import("../components/statisticsFunc/monthlySettlementTenants.vue"),
      }
    ]
    }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
