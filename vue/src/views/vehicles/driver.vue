<template>
    <div class="title">
        <h2>Danh sách tài xế</h2>
    </div>
    <p class="msg">Quản lý thông tin đội tài xế</p>
    <div class="tools">
        <button @click="openAddDriverModal()" title="Thêm mới tài xế" class="add"><i class="fa fa-plus"></i> Thêm tài xế </button>
        <button title="Nhập từ file Excel"><i class="fa fa-file-excel-o"></i> Nhập file Excel </button>
        <input type="text" v-model="search.input" placeholder="Tìm tài xế: Tên, phone, email, biển số xe" style="width:250px">
        <select v-model="search.status">
            <option :value="null">Tình trạng</option>
            <option value="1">Còn làm</option>
            <option value="0">Đã nghỉ</option>
        </select>
        <button @click="getData"><i class="fa fa-search"></i> Tìm kiếm </button>
        <button title="Làm mới" @click="reset"><i class="fa fa-refresh"></i> Refresh </button>
    </div>
    <div class="table table_scroll">
        <form name="frmTxList" id="frmTxList" method="post" enctype="multipart/form-data">
            <table class="table1024">
                <tbody>
                    <tr>
                        <th width="1%">STT</th>
                        <th width="1%">ID</th>
                        <th>Họ và tên</th>
                        <th width="6%">Điện thoại</th>
                        <th width="5.5%">Xe phụ trách</th>
                        <th width="5.5%">Rơ mooc</th>
                        <th width="5%">Ngày vào làm</th>
                        <th width="6%">Lương cơ bản</th>
                        <th width="6%">Phụ cấp</th>
                        <th width="6%">Bảo hiểm</th>
                        <th width="5%">Hoa hồng (%)</th>
                        <th width="1%">#</th>
                        <th width="5%">Actions</th>
                    </tr>
                    <tr v-for="(driver,i) in drivers.data">
                        <td align="center">{{ i+1 }}</td>
                        <td align="center">{{ driver.id }}</td>
                        <td>
                            <a href="javascript:void(0)" title="Chi tiết" @click="openDriverInfor(driver)">{{ driver.user?.name }} <i class="fa fa-external-link"></i>
                            </a>
                        </td>
                        <td>{{ driver.user?.phone }}</td>
                        <td>{{  dispalyPlate(driver.vehicle) }}</td>
                        <td></td>
                        <td>{{ driver.start_date }}</td>
                        <td class="red">{{ driver.salary }}</td>
                        <td>{{ driver.allowance }}</td>
                        <td>{{ driver.insurance }}</td>
                        <td>{{ driver.commission_percent }}</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chi tiết" @click="approve(driver.id)">
                                <img src="/images/icons/check-1.png">
                            </a>
                        </td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" @click="openDriverInfor(driver, true)">
                                <img src="/images/icons/edit-1.png" class="e_MV9fX19fMDk3NTUxMjI4Mg">
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    <div class="paging"></div>

    <DriverInformationModal
        v-if="isOpenDriverInforModal"
        :isEdit="isOpenDriverInforEditModal"
        :master="master"
        :driverInfor="selectedData"
        @close="onCloseDriverInfor"
    ></DriverInformationModal>
    <DriverAddModal
        v-if="isOpenDriverAddModal"
        :master="master"
        @close="onCloseDriverAddModal"
    ></DriverAddModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import {dispalyPlate} from '@/helper.js';
import DriverInformationModal from './modal/DriverInformationModal.vue';
import DriverAddModal from './modal/DriverAddModal.vue';
</script>
<script>
export default {
    el: '#page',
    data: function () {
        return {
            isOpenDriverInforModal: false,
            isOpenDriverAddModal: false,
            isOpenDriverInforEditModal: false,
            selectedData: null,
            search: {...this.$store.state.driver.search},
            drivers: [],
            master: []
        }
    },
    mounted: function () {
        this.getData();
        this.getMaster();
    },
    methods: {
        openDriverInfor: function (data, isEdit = false) {
            this.selectedData = data
            this.isOpenDriverInforModal = true,
            this.isOpenDriverInforEditModal = isEdit
        },
        openAddDriverModal: function () {
            this.isOpenDriverAddModal = true
        },
        onCloseDriverInfor: function (event) {
            this.isOpenDriverInforModal = false
            if(event) {
                this.getData();
            }
        },
        onCloseDriverAddModal: function (event) {
            this.isOpenDriverAddModal = false
            if(event) {
                this.getData();
            }
        },
        getData: function () {
            this.drivers = [];
            let payload = this.search;
            this.$store.dispatch("getDriverList", payload).then((res) => {
                this.drivers = res.data.data;
            });
        },
        reset: function () {
            this.search.input = null;
            this.search.status = null;
            this.getData();
        },
        getMaster: function () {
            this.master = [];
            this.$store.dispatch("getDriverMaster").then((res) => {
                this.master = res.data.data;
            });
        },
    }
}
</script>
