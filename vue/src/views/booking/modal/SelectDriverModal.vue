<template>
    <div class="popup popup2 popup_center close_this">
        <span class="close_pop" @click="onClose">×</span>
        <div class="pophead">
            <h2>Danh sách tài xế</h2>
            <p>Danh sách tài xế đang còn làm việc</p>
        </div>
        <div class="frm check_frm">
            <input type="text" id="txtSeachKeywords" placeholder="Tìm theo tên tài xế" style="margin:0 0 10px 0">
            <div class="scroll2">
                <h3 style="padding:0 0 5px 0">Tài xế trống từ ngày: {{ moment().format('DD-MM-YYYY') }} đến ngày {{ moment().add(7, 'days').format('DD-MM-YYYY') }}</h3>
                <div class="txlist">
                    <p v-for="item in data.data" style="width:50%;float:left;clear:none;padding:4px 0">
                        <input type="radio" v-model="selectedItems" :value="item" class="chk_multi" :id="`ck${item.id}`" style="float:left;margin:0 3px 0 0">
                        <label :for="`ck${item.id}`" style="cursor:pointer">{{ item.user.name }} (<span class="red">{{ item.user.phone }}</span>) <span style="padding:4px 0 0 0;display:block">• Xe phụ trách: {{ item.vehicle.length > 0 ? item.vehicle[0].plate : '' }}</span></label>
                        <span class="green"><i class="fa fa-check-circle"></i> BLX còn hạn {{ moment.duration(moment(item.license_expired_date, "YYYY-MM-DD").diff(moment().format("YYYY-MM-DD"))).asDays() }} ngày</span>
                    </p>
                </div>
                <p>&nbsp;</p>
                <h3 style="padding:0 0 5px 0">Tài xế có lịch chạy từ ngày: {{ moment().format('DD-MM-YYYY') }} đến ngày {{ moment().add(7, 'days').format('DD-MM-YYYY') }}</h3>

            </div>
            <button class="checked_tx" style="margin:10px 10px 0 0;float:left" @click="selectDriver"><i class="fa fa-plus"></i> Chọn</button>
        </div>
    </div>
</template>

<style scoped></style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from 'moment';
</script>
<script>
export default {
    props: ['data'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            selectedItems: []
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        selectDriver: function () {
            this.$emit('onSubmit', this.selectedItems);
            this.onClose();
        }
    },
    created: async function () {

    }
}
</script>
