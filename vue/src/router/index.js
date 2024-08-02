import { createRouter, createWebHistory } from "vue-router";
import axiosClient from "../axios";
import axios from "axios";
import store from "../store";
import NotFound from "@/views/errors/404NotFound.vue";
import Unauthorized from "@/views/errors/401Unauthorized.vue";

//View common
import AuthLayout from "@/components/layout/AuthLayout.vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
//Login page
import Login from "@/views/auth/Login.vue";
//Top page
import Dashboard from "@/views/toppage/Dashboard.vue";
import Vehicle from "@/views/vehicles/index.vue";
import Romooc from "@/views/vehicles/romooc.vue";
import Driver from "@/views/vehicles/driver.vue";
import Booking from "@/views/booking/index.vue";
import Order from "@/views/booking/order.vue";
import Report from "@/views/report/index.vue";
import ReportDetail from "@/views/report/reportDetail.vue";
import ReportByVehicle from "@/views/report/reportByVehicle.vue";

const routes = [
  {
    path: "",
    redirect: "/login",
    component: AuthLayout,
    meta: {
      isGuest: true,
    },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
      accessKey: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
    ]
  },
  {
    path: "/vehicle",
    redirect: "/vehicle",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
      accessKey: true,
    },
    children: [
      {
        path: "/vehicle",
        name: "Vehicle",
        component: Vehicle,
      },
      {
        path: "/vehicle/mooc",
        name: "mooc",
        component: Romooc,
      },
      {
        path: "/vehicle/driver",
        name: "Driver",
        component: Driver,
      },
    ]
  },
  {
    path: "/booking",
    redirect: "/booking",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
      accessKey: true,
    },
    children: [
      {
        path: "/booking",
        name: "Booking",
        component: Booking,
      },
      {
        path: "/booking/order",
        name: "Order",
        component: Order,
      },
      // {
      //   path: "/booking/cont",
      //   name: "mooc",
      //   component: Romooc,
      // },
    ]
  },
  {
    path: "/report",
    redirect: "/report",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
      accessKey: true,
    },
    children: [
      {
        path: "/report",
        name: "Report",
        component: Report,
      },
      {
        path: "/report/detail/:year/:month",
        name: "ReportDetail",
        component: ReportDetail,
      },
      {
        path: "/reportbyvehicle",
        name: "Reportbyvehicle",
        component: ReportByVehicle,
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/errors",
    children: [
      {
        path: "/errors/401",
        name: "Unauthorize",
        component: Unauthorized,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  //store.commit("getSetCookieToken");
  if (to.meta.requiresAuth && !sessionStorage.getItem("TOKEN")) {
    next({ name: "Login" });
  } else if (sessionStorage.getItem("TOKEN") && to.meta.isGuest) {
    axiosClient
      .get("user", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem('setting', res.data.data.setting);
        next({
          name: "Dashboard",
        });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        next({ name: "Login" });
      });
  } else {
    next();
   }
});

router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    console.log(error.message);
    if (!to?.fullPath) {
      window.location.reload();
    } else {
      window.location = to.fullPath;
    }
  }
})
export default router;
