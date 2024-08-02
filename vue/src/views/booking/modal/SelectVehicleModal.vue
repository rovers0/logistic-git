<template>
    <div class="popup popup2 popup_center close_this">
        <span class="close_pop" @click="onClose">×</span>
        <div class="pophead" v-if="isMooc">
            <h2>Danh sách sơ mi rơ mooc</h2>
            <p>Danh sách sơ mi rơ mooc đang hoạt động</p>
        </div>
        <div class="pophead" v-else>
            <h2>Danh sách xe</h2>
            <p>Danh sách xe đang hoạt động</p>
        </div>
        <div class="frm check_frm">
            <input type="text" @input="onPlateChange" v-model="filterPlate" placeholder="Tìm biển số" autocomplete="off" style="width:48%;float:right">
            <select name="baidau" class="green" v-model="filterSelect" @change="onParkingChange" style="width:48%;float:left">
                <option value="0">Tất cả bãi xe</option>
                <option value="1">Bãi xe 1</option>
                <option value="2">Bãi xe 2</option>
                <option value="3">Bãi xe 3</option>
            </select>
            <div class="scroll2">
                <h3 style="padding:0 0 5px 0">Xe trống từ ngày: {{ moment().format('DD-MM-YYYY') }} đến ngày {{ moment().add(7, 'days').format('DD-MM-YYYY') }}</h3>
                <div class="txlist" v-if="isMooc">
                    <p v-for="item in vehicles" style="width:50%;float:left;clear:none;padding:4px 0">
                        <input type="radio" v-model="selectedItems" :value="item" class="chk_multi" :id="`ck${item.id}`" style="float:left;margin:0 3px 0 0">
                        <label :for="`ck${item.id}`" style="cursor:pointer">{{ item.serial }} (<span class="green">Tải {{ item.weight }} KGS</span>)</label>
                    </p>
                </div>
                <div class="txlist" v-else>
                    <p v-for="item in vehicles" style="width:50%;float:left;clear:none;padding:4px 0">
                        <input type="radio" v-model="selectedItems" :value="item" class="chk_multi" :id="`ck${item.id}`" style="float:left;margin:0 3px 0 0">
                        <label :for="`ck${item.id}`" style="cursor:pointer">{{ item.plate }} (<span class="green">Xe {{ item.axle }} cầu</span>)</label>
                    </p>
                </div>
                <p>&nbsp;</p>
                <h3 style="padding:0 0 5px 0">Xe có lịch chạy từ ngày: {{ moment().format('DD-MM-YYYY') }} đến ngày {{ moment().add(7, 'days').format('DD-MM-YYYY') }}</h3>

            </div>
            <button class="checked_tx" style="margin:10px 10px 0 0;float:left" @click="selectVehicle"><i class="fa fa-plus"></i> Chọn</button>
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
    props: ['data', 'isMooc'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            selectedItems: [],
            filterSelect: 0,
            filterPlate: null,
            vehicles: this.data
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        onParkingChange: function () {
            if (this.filterSelect > 0) {
                if (this.isMooc) {
                    this.vehicles = this.data.filter((item) => item.packing_id == this.filterSelect)
                } else {
                    this.vehicles = this.data.filter((item) => item.parking_lot == this.filterSelect)
                }
            } else {
                this.vehicles = this.data
            }
        },
        onPlateChange: function () {
            if (this.isMooc) {
                this.vehicles = this.data.filter((item) => item.serial.includes(this.filterPlate))
            } else {
                this.vehicles = this.data.filter((item) => item.plate.includes(this.filterPlate))
            }
        },
        onClose: function () {
            this.$emit('close')
        },
        selectVehicle: function () {
            this.$emit('onSubmit', this.selectedItems);
            this.onClose();
        }
    },
    created: async function () {
        console.log(this.data)
    }
}
</script>
