<template>
    <div class="title">
        <h2>Danh sách Rơ Mooc</h2>
    </div>
    <p class="msg">Danh sách số Sơ mi rơ mooc: <b class="red">{{ moment().format('DD-MM-YYYY') }}</b> - Hiện có: <span class="red bold"><u>{{ romoocs?.meta?.total }}</u></span> cái </p>
    <div class="tools">
        <form enctype="multipart/form-data">
            <a href="javascript:void(0)" title="Thêm mới" class="add" @click="openModal('isOpenVehicleAddModal')">
                <i class="fa fa-plus"></i> Thêm mới </a>
            <a href="javascript:void(0)" title="Nhập từ file Excel">
                <i class="fa fa-file-excel-o" ></i> Nhập file Excel </a>
            <input type="text" v-model="search.serial" @click="openSelectLicensePlatesModal('isOpenSelectLicensePlatesModal')" style="width:90px" placeholder="Số rơ mooc" maxlength="30" autocomplete="off" readonly="">
            <select v-model="search.parkingLot">
                <option :value="null">Bãi xe</option>
                <option v-for="parking in master.parking" :value="parking.id">{{ parking.name }}</option>
            </select>
            <button type="button" @click="getData"><i class="fa fa-search"></i> Tra cứu </button>
            <a href="javascript:void(0)" title="Làm mới" @click="reset"><i class="fa fa-refresh"></i> Refresh </a>
        </form>
    </div>
    <div class="table table_head10 table_scroll">
        <table class="table1366" style="font-size:10px">
            <tbody>
                <tr>
                    <th width="1%">STT</th>
                    <th>Số sơ mi rơ mooc</th>
                    <th width="1%">Tải trọng (KG)</th>
                    <th width="1%">Kích cỡ</th>
                    <th>Loại mooc</th>
                    <th>Số trục</th>
                    <th>Số xe</th>
                    <th width="13%">Hạn đăng kiểm</th>
                    <th width="13%">Hạn bảo trì đường bộ</th>
                    <th width="13%">Hạn BH tự nguyện</th>
                    <th width="13%">Hạn BH bắt buộc</th>
                    <th width="13%">Giấy phép đi đường</th>
                    <th width="5%">Bãi xe</th>
                    <th width="1%">#</th>
                    <th width="4%">Actions</th>
                </tr>
                <tr v-for="(item, i) in romoocs.data">
                    <td align="center">{{ i+1 }}</td>
                    <td>
                        <a href="javascript:void(0)" @click="openVehicleDetail(item)" title="Xem đầy đủ">{{ item.serial }}</a>
                    </td>
                    <td>{{ item.weight }}</td>
                    <td>{{ SIZE[item.size] }}</td>
                    <td>{{ MOOC_TYPE[item.type] }}</td>
                    <td>{{ AXIS[item.axis] }}</td>
                    <td></td>
                    <td>
                        <span class="red" v-if="item.inspection"><span v-html="daysUsable(item.inspection.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('vehicleInspection', item.inspection, item.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="item.roadMaintenance"><span v-html="daysUsable(item.roadMaintenance.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('roadMaintenance', item.roadMaintenance, item.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="item.voluntaryInsurance"><span v-html="daysUsable(item.voluntaryInsurance.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('voluntaryInsurance', item.voluntaryInsurance, item.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="item.mandatoryInsurance"><span v-html="daysUsable(item.mandatoryInsurance.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('mandatoryInsurance', item.mandatoryInsurance, item.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="item.roadPermit"><span v-html="daysUsable(item.roadPermit.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('roadPermit', item.roadPermit, item.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>{{ item.parking.name }}</td>
                    <td align="center">
                        <a href="javascript:void(0)">
                            <img src="/images/icons/check-1.png">
                        </a>
                    </td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal', item)">
                            <img src="/images/icons/edit-1.png" class="e_NF9fX19fMTVSMTI3MzY">
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="paging"></div>

    <VehicleDetailModal
        v-if="isOpenVehicleDetailModal"
        :show="isOpenVehicleDetailModal"
        :data="vehicleInfor"
        :isMooc=true
        @close="onCloseDetailModal('isOpenVehicleDetailModal')"
    ></VehicleDetailModal>
    <MoocDocumentModal
        v-if="vehicleInspection"
        :modalType="'vehicleInspection'"
        :data="this.modalData.vehicleInspection"
        :moocID="this.modalData.id"
        @close="onCloseDocument"
    ></MoocDocumentModal>
    <MoocDocumentModal
        v-if="roadMaintenance"
        :modalType="'roadMaintenance'"
        :data="this.modalData.roadMaintenance"
        :moocID="this.modalData.id"
        @close="onCloseDocument"
    ></MoocDocumentModal>
    <MoocDocumentModal
        v-if="voluntaryInsurance"
        :modalType="'voluntaryInsurance'"
        :moocID="this.modalData.id"
        :data="this.modalData.voluntaryInsurance"
        @close="onCloseDocument"
    ></MoocDocumentModal>
    <MoocDocumentModal
        v-if="mandatoryInsurance"
        :modalType="'mandatoryInsurance'"
        :data="this.modalData.mandatoryInsurance"
        :moocID="this.modalData.id"
        @close="onCloseDocument"
    ></MoocDocumentModal>
    <MoocDocumentModal
        v-if="roadPermit"
        :modalType="'roadPermit'"
        :data="this.modalData.roadPermit"
        :moocID="this.modalData.id"
        @close="onCloseDocument"
    ></MoocDocumentModal>
    <VehicleEditModal
        v-if="isOpenVehicleEditModal"
        :vehicleInfor="vehicleInfor"
        :isMooc=true
        @close="onCloseVehicleEdit"
    ></VehicleEditModal>
    <VehicleAddModal
        v-if="isOpenVehicleAddModal"
        :isMooc=true
        @onSubmit="getData"
        @close="onCloseDetailModal('isOpenVehicleAddModal')"
    ></VehicleAddModal>
    <SelectLicensePlatesModal
        v-if="isOpenSelectLicensePlatesModal"
        :data="serials"
        @onSubmit="getSelectedSerials"
        @close="onCloseDetailModal('isOpenSelectLicensePlatesModal')"
    ></SelectLicensePlatesModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import VehicleDetailModal from './modal/VehicleDetailModal.vue';
import MoocDocumentModal from './modal/MoocDocumentModal.vue';
import VehicleEditModal from './modal/VehicleEditModal.vue';
import VehicleAddModal from './modal/VehicleAddModal.vue';
import SelectLicensePlatesModal from '@/components/SelectLicensePlatesModal.vue';
import {SIZE, MOOC_TYPE, AXIS} from '../../components/Constants.vue';
import { daysUsable } from '@/helper.js';
</script>
<script>
export default {
    el: '#page',
    data: function () {
        return {
            isOpenVehicleDetailModal: false,
            vehicleInspection: false,
            roadMaintenance: false,
            voluntaryInsurance: false,
            mandatoryInsurance: false,
            roadPermit: false,
            isOpenVehicleEditModal: false,
            isOpenVehicleAddModal: false,
            isOpenSelectLicensePlatesModal: false,
            vehicleInfor: null,
            search: {...this.$store.state.mooc.search},
            modalData: {
                vehicleInspection: null,
                roadMaintenance: null,
                voluntaryInsurance: null,
                mandatoryInsurance: null,
                roadPermit: null,
            },
            romoocs: [],
            master: [],
            serials: []
        }
    },
    mounted: function () {
        this.getMaster();
        this.getData();
    },
    methods: {
        openVehicleDetail: function (data) {
            this.vehicleInfor = data
            this.isOpenVehicleDetailModal = true
        },
        openSelectLicensePlatesModal: function (type) {
            this.$store.dispatch("getAllMooc").then((res) => {
                this.serials = res.data.data;
                console.log(res.data.data)
                this[type] = true;
            });
        },
        openModal: function (type, data = null) {
            this[type] = true,
            this.vehicleInfor = data
        },
        openDocumentModal: function (type, data = null, moocID = null) {
            this[type] = true;
            this.modalData[type]  = data;
            this.modalData.id  = moocID;
        },
        onCloseDocument: function (event) {
            if(event && event.modal) {
                this[event.modal] = false
            }
            if(event && event.reload) {
                this.getData();
            }
        },
        onCloseDetailModal: function (type) {
            this[type] = false
        },
        onCloseVehicleEdit: function (event) {
            this.isOpenVehicleEditModal = false
            if(event) {
                this.getData();
            }
        },
        getData: function () {
            this.romoocs = [];
            let payload = this.search;
            this.$store.dispatch("getMoocList", payload).then((res) => {
                this.romoocs = res.data.data;
            });
        },
        reset: function () {
            this.search = {...this.$store.state.mooc.search};
            this.getData();
        },
        getMaster: function () {
            this.master = [];
            this.$store.dispatch("getMoocMaster").then((res) => {
                this.master = res.data.data;
            });
        },
        getSelectedSerials: function (selectedItems) {
            this.search.serial = selectedItems;
        }
    }
}
</script>
