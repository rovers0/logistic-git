<template>
  <div>
    <li v-for="(item, key, index) in imgs" :key="key">
        <span @click="onDelete(key)" v-if="!hideDelete"><i class="fa fa-trash"></i> Xóa </span>
        <span class="colorbox cboxElement" style="cursor:zoom-in" @click="showMultiple(index)">
            <img :src=item.original_url>
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
    props: ['imgs', 'isEdit', 'driverInfor', 'hideDelete'],
    emits: ['delete'],
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
            this.imgsRef = Object.values(this.imgs).map(item => item.original_url);
            this.indexRef = index || 0;
            this.onShow();
        },
        onHide: function () {this.visibleRef = false},
        onDelete: function (id) {
          this.$emit('delete', id)
        }
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
