<template>
    <div class="main">
        <router-view></router-view>
    </div>
    <div class="footer">
        <p>© Phần mềm Logistics - www.vantaihaiphong.com.vn</p>
    </div>
    <span class="back-top" title="Back to top"><i class="fa fa-arrow-up"></i></span>
    <Loading v-if="loading"></Loading>
</template>

<script setup>
import { mapState } from "vuex";
import Loading from "../Loading.vue";
</script>
<script>
export default {
  computed: {
      ...mapState(['loading']),
  },
  data: function () {
    return {
      
    }
  },
  beforeMount: function () {
    this.loadScript();
  },
  methods: {
    loadScript: function () {
      let files = [
        'js/jquery-1.8.2.js'
      ];

      files.forEach((file, i) => {
        let script = document.createElement('script')
        script.setAttribute('src', file)
        document.head.appendChild(script)
      });
    }
  }
}
</script>