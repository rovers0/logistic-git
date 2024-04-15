<template>
  <div>
    <li v-for="(item, i) in imgs" :key="i">
        <span><i class="fa fa-trash"></i> Xóa </span>
        <span class="colorbox cboxElement" style="cursor:zoom-in" @click="showMultiple(i)">
            <img :src=item>
        </span>
    </li>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import { defineComponent } from "vue";
export default defineComponent({
    components: { VueEasyLightbox },
    props: ['imgs', 'isEdit', 'driverInfor'],
    emits: ['close'],
    data: function () {
        return {
            visibleRef: false,
            indexRef: 0,
            imgsRef:[],
        }
    },
    computed: {
    },
    methods: {
        onShow: function () {
            this.visibleRef = true;
        },
        showSingle: function () {
            this.imgsRef.value = "http://via.placeholder.com/350x150";
            this.onShow();
        },
        showMultiple: function (index) {
            this.imgsRef = this.imgs;
            this.indexRef = index || 0;
            this.onShow();
        },
        onHide: function () {this.visibleRef = false}
    },
})
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
