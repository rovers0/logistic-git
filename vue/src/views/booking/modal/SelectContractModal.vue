<template>
    <div class="popup popup2 popup_center">
        <span class="close_pop" @click="onClose">×</span>
        <div class="pophead">
            <h2>Khách hàng đã có giá hợp đồng</h2>
            <p>Lập kế hoạch vận chuyển từ danh sách Khách hàng đã có giá hợp đồng</p>
        </div>
        <div class="frm check_frm">
            <input type="text" id="txtSeachKeywords" autocomplete="off" placeholder="Tìm kiếm theo: tên gợi nhớ, tên công ty, số phone" style="margin:0 0 10px 0">
            <div class="scroll2">

            </div>

            <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                <button type="button" class="checked_tx" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-plus"></i> Chọn</button>
                <button type="button" @click="onClose" style="float:none;text-align: center;display: inline-block;" class="close_btn checked_tx"><i class="fa fa-times-circle"></i> Đóng lại</button>
            </div>

        </div>
    </div>
</template>

<style scoped></style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: [''],
    emits: ['close'],
    data: function () {
        return {

        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
    },
    created: async function () {

    }
}
</script>