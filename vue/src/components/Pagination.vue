<template>
  <Paginate :page-range="3" :margin-pages="0" :prev-text="'<'" :next-text="'>'" :container-class="'pagination'" :page-class="'page-item'" :first-last-button="true" :first-button-text="'<<'" :last-button-text="'>>'">
  </Paginate>
</template>
<script setup>
// import "@ocrv/vue-tailwind-pagination/styles";
import Paginate from "vuejs-paginate-next";
</script>

<style>
.pagination>.active>a,
.pagination>.active>span,
.pagination>.active>a:hover,
.pagination>.active>span:hover,
.pagination>.active>a:focus,
.pagination>.active>span:focus {
  z-index: 2;
  color: #ff0;
  cursor: default;
  background-color: #08c;
  border-color: #08c;
  font-weight: 700;
}

.pagination a {
  cursor: pointer;
}
</style>
