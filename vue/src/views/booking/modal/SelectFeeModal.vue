<template>
    <div class="popup popup2 popup_center close_this">
        <span class="close_pop" @click="onClose">×</span>
        <div class="pophead">
            <h2>Danh sách loại giải chi</h2>
            <p>Chọn loại giải chi cần chi</p>
        </div>
        <div class="frm check_frm">
            <input type="text" id="txtSeachKeywords" placeholder="Tìm kiếm loại giải chi..." style="margin:0 0 10px 0" autocomplete="off">
            <div class="scroll2">
                <p v-for="fees in data" style="width:100%;float:left;padding:4px 0">
                    <input type="checkbox" style="float:left;margin:0 3px 0 0"> <label @click="setFees(fees)" style="cursor:pointer">{{ fees.name }}</label>
                </p>
            </div>
        </div>
    </div>
    <div class="screen src_pt screen2 screen_petro" style="z-index:999"></div>
</template>

<style scoped>
.hidden {
    display: none;
}

.dp__main {
    width: 51%;
    float: left;
}
</style>
<script setup>
import moment from 'moment';
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: ['data'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            order: {},
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        formatNumber: function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getContCodes: function (conts) {
            let codes = [];
            conts.some((cont) => {
                codes.push(cont.code);
            });
            return codes.join(',');
        },
        getContSeals: function (conts) {
            let seals = [];
            conts.some((cont) => {
                seals.push(cont.seal);220
            });
            return seals.join(',');
        },
        addRow: function () {
            this.$props.data.incurreds.push({

            });
        },
        removeRow: function (index) {
            this.$props.data.incurreds.splice(index, 1);
        },
        setFees: function (fees) {
            this.$emit('onSubmit', fees);
            this.onClose();
        }
    },
    created: async function () {

    }
}
</script>