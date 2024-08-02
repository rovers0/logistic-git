<template>
  <link rel="stylesheet" type="text/css" href="css/selectize.min.css" />
  <link rel="stylesheet" type="text/css" href="css/datepicker.css">
  <link rel="stylesheet" type="text/css" href="css/main.css" />
  <link rel="stylesheet" type="text/css" href="css/mobile.css" />
  <link rel="stylesheet" type="text/css" href="css/animate.css">
  <link rel="stylesheet" type="text/css" href="css/font-awesome-animation.min.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
  <div class="main">
    <template v-if="menu == 0">
      <banner></banner>
      <header-page></header-page>
    </template>
    <template v-else>
      <menu-left></menu-left>
      <banner-top></banner-top>
    </template>
    <div class="page" :class="menu != 0 ? 'page2' : ''">
      <router-view></router-view>
    </div>
  </div>
  <div class="footer">
    <p>© Phần mềm Logistics - www.vantaihaiphong.com.vn</p>
  </div><span class="back-top" title="Back to top"><i class="fa fa-arrow-up"></i></span>
  <Loading v-if="loading"></Loading>
</template>
<script setup>
import { mapState } from "vuex";
import Banner from "./partials/Banner.vue";
import BannerTop from "./partials/BannerTop.vue";
import HeaderPage from "./partials/Header.vue";
import MenuLeft from "./partials/MenuLeft.vue";
import Loading from "../Loading.vue";
import "@vuepic/vue-datepicker/dist/main.css";
</script>
<script>
export default {
  computed: {
      ...mapState(['loading']),
  },
  data: function () {
    return {
      menu: null
    }
  },
  beforeMount: function () {
    this.refreshPage();
  },
  methods: {
    refreshPage: function () {
      if (this.isMobile()) {
        this.menu = 0;
      } else {
        this.menu = JSON.parse(localStorage.getItem('setting'))?.menu;
      }
    },
    isMobile: function () {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
