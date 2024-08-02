<template>
    <div class="title">
        <h2>Danh sách xe</h2>
    </div>
    <p class="msg"> Danh sách xe đang hoạt động tính đến ngày: <b class="red"> {{ moment().format('DD-MM-YYYY') }}</b> - Hiện có: <span class="red bold">
        <u>{{ vehicles.total }}</u>
    </span> xe </p>
    <div class="tools">
        <button @click="openModal('openVehicleAddModal')"><i class="fa fa-plus"></i> Thêm xe </button>
        <button style="opacity: 0.7;"><i class="fa fa-file-excel-o"></i> Nhập file Excel </button>
        <input type="text" v-model="search.plate" @click="openModal('openSelectLicensePlatesModal')" id="biensoxe" style="width:90px" placeholder="Biển số xe" maxlength="15" autocomplete="off" readonly>
        <select name="baixe" v-model="search.parkingLot">
            <option :value="null">Bãi xe</option>
            <option value="0">Chưa có bãi</option>
            <template v-for="i in 3">
                <option :value="i">Bãi xe {{ i }}</option>
            </template>
        </select>
        <select name="socau" v-model="search.axle">
            <option :value="null">Loại xe</option>
            <option value="1">Xe 1 cầu</option>
            <option value="2">Xe 2 cầu</option>
            <option value="9">Chưa xác định</option>
        </select>
        <button type="button" @click="getData">
            <i class="fa fa-search"></i> Tra cứu </button>
        <a title="Làm mới" @click="resetSearch">
            <i class="fa fa-refresh"></i> Refresh </a>
    </div>
    <div class="table table_scroll">
        <form name="frmTxList" id="frmTxList" method="post" enctype="multipart/form-data">
            <table class="table1366 table_head10" style="font-size:10px">
                <tr>
                    <th width="1%">STT</th>
                    <th width="1%">ID</th>
                    <th width="5%">Biển số xe</th>
                    <th width="5%">Số cầu</th>
                    <th width="5%">Rơ mooc</th>
                    <th width="9%">Tài xế phụ trách</th>
                    <th width="9%">Cổ đông xe</th>
                    <th width="11%">Hạn đăng kiểm</th>
                    <th width="11%">Hạn bảo trì đường bộ</th>
                    <th width="11%">Hạn BH tự nguyện</th>
                    <th width="11%">Hạn BH bắt buộc</th>
                    <th width="11%">Giấy phép đi đường</th>
                    <th width="6%">Bãi xe</th>
                    <th width="4%">Actions</th>
                </tr>
                <tr v-for="(vehicle,i) in vehicles.data">
                    <td align="center">{{ i + 1 }}</td>
                    <td align="center">{{ vehicle.id }}</td>
                    <td>
                        <a href="javascript:void(0)" @click="openVehicleDetail(vehicle)" class="bold">{{ vehicle.plate }}</a>
                    </td>
                    <td>{{ vehicle.axle ? `Xe ${vehicle.axle} cầu` : 'Chưa có' }}</td>
                    <td>{{ vehicle.mooc }}</td>
                    <td>Nguyễn Văn Hậu</td>
                    <td>{{ vehicle.type != 0 ? 'Xe cổ đông' : 'Xe nhà' }}</td>
                    <td>
                        <span class="red" v-if="vehicle.inspection"><span v-html="daysUsable(vehicle.inspection.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('vehicleInspection', vehicle.inspection, vehicle.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="vehicle.roadMaintenance"><span v-html="daysUsable(vehicle.roadMaintenance.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('roadMaintenance', vehicle.roadMaintenance, vehicle.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="vehicle.voluntaryInsurance"><span v-html="daysUsable(vehicle.voluntaryInsurance.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('voluntaryInsurance', vehicle.voluntaryInsurance, vehicle.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="vehicle.mandatoryInsurance"><span v-html="daysUsable(vehicle.mandatoryInsurance.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('mandatoryInsurance', vehicle.mandatoryInsurance, vehicle.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red" v-if="vehicle.roadPermit"><span v-html="daysUsable(vehicle.roadPermit.expiration_date)"></span></span>
                        <span v-else>Chưa có</span>
                        <a href="javascript:void(0)" style="float:right" @click="openDocumentModal('roadPermit', vehicle.roadPermit, vehicle.id)" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe {{ vehicle.parking_lot }}</td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('openVehicleEditModal', vehicle)">
                            <img src="/images/icons/edit-1.png" class="e_MV9fX19fMTVDMTc2Njk" />
                        </a>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <div class="paging"></div>

    <VehicleDetailModal
        v-if="openVehicleDetailModal"
        :data="this.modalData.openVehicleDetailModal"
        @close="onCloseDetailModal('openVehicleDetailModal')"
    ></VehicleDetailModal>
    <VehicleDocumentModal
        v-if="vehicleInspection"
        :modalType="'vehicleInspection'"
        :data="this.modalData.vehicleInspection"
        :vehicleID="this.modalData.id"
        @close="onCloseDocument"
    ></VehicleDocumentModal>
    <VehicleDocumentModal
        v-if="roadMaintenance"
        :modalType="'roadMaintenance'"
        :data="this.modalData.roadMaintenance"
        :vehicleID="this.modalData.id"
        @close="onCloseDocument"
    ></VehicleDocumentModal>
    <VehicleDocumentModal
        v-if="voluntaryInsurance"
        :modalType="'voluntaryInsurance'"
        :vehicleID="this.modalData.id"
        :data="this.modalData.voluntaryInsurance"
        @close="onCloseDocument"
    ></VehicleDocumentModal>
    <VehicleDocumentModal
        v-if="mandatoryInsurance"
        :modalType="'mandatoryInsurance'"
        :data="this.modalData.mandatoryInsurance"
        :vehicleID="this.modalData.id"
        @close="onCloseDocument"
    ></VehicleDocumentModal>
    <VehicleDocumentModal
        v-if="roadPermit"
        :modalType="'roadPermit'"
        :data="this.modalData.roadPermit"
        :vehicleID="this.modalData.id"
        @close="onCloseDocument"
    ></VehicleDocumentModal>
    <VehicleEditModal
        v-if="openVehicleEditModal"
        :vehicleInfor="this.modalData.openVehicleEditModal"
        @close="onCloseVehicleEdit"
    ></VehicleEditModal>
    <VehicleAddModal
        v-if="openVehicleAddModal"
        :master="master"
        :data="this.modalData.openVehicleAddModal"
        @close="onCloseVehicleAdd"
    ></VehicleAddModal>
    <SelectLicensePlatesModal
        v-if="openSelectLicensePlatesModal"
        :data="this.master.plate"
        @onSubmit="setPlateSearch"
        @close="onCloseDetailModal('openSelectLicensePlatesModal')"
    ></SelectLicensePlatesModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import VehicleDetailModal from './modal/VehicleDetailModal.vue';
import VehicleDocumentModal from './modal/VehicleDocumentModal.vue';
import VehicleEditModal from './modal/VehicleEditModal.vue';
import VehicleAddModal from './modal/VehicleAddModal.vue';
import SelectLicensePlatesModal from '@/components/SelectLicensePlatesModal.vue';
import { daysUsable } from '@/helper.js';
</script>
<script>
export default {
    data: function () {
        return {
            openVehicleDetailModal: false,
            vehicleInspection: false,
            roadMaintenance: false,
            voluntaryInsurance: false,
            mandatoryInsurance: false,
            roadPermit: false,
            openVehicleEditModal: false,
            openVehicleAddModal: false,
            openSelectLicensePlatesModal: false,
            search: {...this.$store.state.vehicle.search},
            total: 0,
            modalData: {
                vehicleInspection: null,
                roadMaintenance: null,
                voluntaryInsurance: null,
                mandatoryInsurance: null,
                roadPermit: null,
            },
            selected_key: null,
            master: [],
            vehicles: []
        }
    },
    mounted: function () {
        this.getData();
        this.getMaster();
    },
    methods: {
        openVehicleDetail: function (data) {
            this.modalData.openVehicleDetailModal = data;
            this.openVehicleDetailModal = true
        },
        openModal: function (type, data = null, vehicleID = null) {
            this[type] = true;
            this.modalData[type]  = data;
            this.modalData.id  = vehicleID;
        },
        openDocumentModal: function (type, data = null, vehicleID = null) {
            this[type] = true;
            this.modalData[type]  = data;
            this.modalData.id  = vehicleID;
        },
        onCloseDetailModal: function (type) {
            this[type] = false
            //this.getData();
        },
        onCloseVehicleAdd: function (event) {
            this.openVehicleAddModal = false
            if(event) {
                this.getData();
            }
        },
        onCloseVehicleEdit: function (event) {
            this.openVehicleEditModal = false
            if(event) {
                this.getData();
            }
        },
        onCloseDocument: function (event) {
            if(event && event.modal) {
                this[event.modal] = false
            }
            if(event && event.reload) {
                this.getData();
            }
        },
        getData: function () {
            this.vehicles = [];
            let payload = this.search;
            this.$store.dispatch("getVehicleList", payload).then((res) => {
                this.vehicles = res.data.data;
            });
        },
        getMaster: function () {
            this.master = [];
            this.$store.dispatch("getVehicleMaster").then((res) => {
                this.master = res.data.data;
            });
        },
        setPlateSearch: function (value) {
            console.log(value)
            this.search.plate = value;
        },
        resetSearch: function () {
            this.search = this.$store.state.vehicle.search;
            this.getData();
        },
    }
}
</script>
