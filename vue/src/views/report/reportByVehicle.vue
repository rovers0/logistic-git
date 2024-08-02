<template>
    <div class="title">
        <h2>Thống kê lợi nhuận theo xe - <span class="red">Tháng: {{ search.month }}-{{ search.year }}</span>
        </h2>
    </div>
    <p class="msg" style="font-size:14px">Màn hình xem báo báo cáo kết quả doanh thu theo xe. Tổng xe hiện có: <b class="red">{{ data.length }}</b>
    </p>
    <div class="tools table_scroll">
        <div class="tools1366">
            <form name="frmBaoCaoXe" method="get" enctype="multipart/form-data">
                <input type="text" name="idxe" v-model="search.plate" @click="openModal('openSelectLicensePlatesModal')" id="biensoxe" style="width:90px" placeholder="Biển số xe" maxlength="15" autocomplete="off" readonly>
                <select name="act" v-model="search.status" placeholder="Biển số xe">
                    <option value="null" disabled selected>Tình trạng xe</option>
                    <option value="1">Đang vận hành</option>
                    <option value="0">Ngưng vận hành</option>
                    <option value="2">Tất cả xe</option>
                </select>
                <select name="m" id="m" v-model="search.month">
                    <option value="">Tháng</option>
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="4" selected="selected">Tháng 4</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                </select>
                <select name="y" id="y" v-model="search.year">
                    <option value="">Năm</option>
                    <option value="2023">2023</option>
                    <option value="2024" selected="selected">2024</option>
                </select>
            </form>
            <button @click="getData">
                <i class="fa fa-search"></i> Tra cứu </button>
            <button title="Làm mới"  @click="resetSearch">
                <i class="fa fa-refresh"></i> Refresh </button>
            <button href="javascript:void(0)" title="Xuất file" onclick="return XuatExcel('baocaoxe','excel','frmBaoCaoXe',1,'excel_file')" class="add">
                <i class="fa fa-file-excel-o"></i> Xuất File </button>
        </div>
    </div>
    <div class="table table_head10 table_scroll" id="table_sort">
        <table class="table1366 tablesorter tablesorter-default tablesorter5df8146fe2fdf" width="100%" style="font-size:10px" role="grid">
            <thead>
                <tr role="row" class="tablesorter-headerRow">
                    <th width="2%" data-column="0" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="STT: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">STT</div>
                    </th>
                    <th width="2%" data-column="1" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="IDX: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">IDX</div>
                    </th>
                    <th width="7%" data-column="2" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Biển số xe: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Biển số xe</div>
                    </th>
                    <th width="7%" data-column="3" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Số KM: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Số KM</div>
                    </th>
                    <th width="7%" data-column="4" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Số chuyến hàng cont: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Số chuyến hàng cont</div>
                    </th>
                    <th width="6.5%" data-column="5" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Số chuyến hàng rời: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Số chuyến hàng rời</div>
                    </th>
                    <th data-column="6" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Phí sữa chữa đề xuất(1): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Phí sữa chữa đề xuất <br>
                            <i class="red">(1)</i>
                        </div>
                    </th>
                    <th data-column="7" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Phí sửa chữa vặt(2): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Phí sửa chữa vặt <br>
                            <i class="red">(2)</i>
                        </div>
                    </th>
                    <th data-column="8" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Phí lốp(3): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Phí lốp <br>
                            <i class="red">(3)</i>
                        </div>
                    </th>
                    <th width="8%" data-column="9" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Phí nhiên liệu(4): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Phí nhiên liệu <br>
                            <i class="red">(4)</i>
                        </div>
                    </th>
                    <th data-column="10" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Phí vận tải(5): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Phí vận tải <br>
                            <i class="red">(5)</i>
                        </div>
                    </th>
                    <th data-column="11" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Phí neo xe(6): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Phí neo xe <br>
                            <i class="red">(6)</i>
                        </div>
                    </th>
                    <th data-column="12" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Lương theo xe + Lương chế độ(7): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Lương theo xe + Lương chế độ <br>
                            <i class="red">(7)</i>
                        </div>
                    </th>
                    <th data-column="13" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Chi phí khác: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Chi phí khác</div>
                    </th>
                    <th data-column="14" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Doanh số hàng rời(8): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Doanh số hàng rời <br>
                            <i class="red">(8)</i>
                        </div>
                    </th>
                    <th data-column="15" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Tổng doanh số(9): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Tổng doanh số <br>
                            <i class="red">(9)</i>
                        </div>
                    </th>
                    <th width="10%" data-column="16" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Tổng lợi nhuận ước tính: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Tổng lợi nhuận ước tính</div>
                    </th>
                    <!-- <th width="4%" data-column="17" class="tablesorter-header tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Chốt: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Chốt</div>
                    </th> -->
                </tr>
            </thead>
            <tbody aria-live="polite" aria-relevant="all">
                <tr v-for="(vehicleReport, i) in data">
                    <td align="center">{{ i + 1 }}</td>
                    <td align="center">{{vehicleReport.id}}</td>
                    <td>
                        <a href="javascript:void(0)" style="color:#000;font-weight:bold">{{vehicleReport.plate}}</a>
                        <p class="green italic" v-if="vehicleReport.drivers">
                            <a href="javascript:void(0)">{{vehicleReport.drivers}}</a>
                        </p>
                        <p class="red italic" v-else>
                           Chưa có tài xế
                        </p>
                    </td>
                    <td>
                        <p>GPS: 0.00</p>
                    </td>
                    <td>
                        <a href="/booking/order" title="Lịch sử chuyến" v-if="vehicleReport.number_of_cont_shipments">
                            <span class="red">{{vehicleReport.number_of_cont_shipments}}</span> - <span style="font-size:11px">Lịch sử <i class="fa fa-eye"></i>
                            </span>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td>
                        <a href="/booking/order" title="Lịch sử chuyến" v-if="vehicleReport.number_of_bulk_shipments > 0">
                            <span class="red">{{vehicleReport.number_of_bulk_shipments}}</span> - <span style="font-size:11px">Lịch sử <i class="fa fa-eye"></i>
                            </span>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td class="green">
                        <a href="javascript:void(0)" title="Phí sữa chữa đề xuất" v-if="vehicleReport.order_repair_costs > 0">
                            <span class="green">{{formatNumber(vehicleReport.order_repair_costs)}}</span><i class="fa fa-eye"></i>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td class="green">
                        <a href="javascript:void(0)" title="Phí sữa chữa khác" v-if="vehicleReport.repair_costs > 0">
                            <span class="green">{{formatNumber(vehicleReport.repair_costs)}}</span><i class="fa fa-eye"></i>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td class="blue">
                        <a href="javascript:void(0)" title="Phí lốp" v-if="vehicleReport.tire_replacement_costs > 0">
                            <span class="green">{{formatNumber(vehicleReport.tire_replacement_costs)}}</span><i class="fa fa-eye"></i>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td class="red">
                        <a href="javascript:void(0)" title="Phí nhiên liệu" v-if="vehicleReport.fuel_costs > 0">
                            <span class="green">{{formatNumber(vehicleReport.fuel_costs)}}</span><i class="fa fa-eye"></i>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td class="blue">
                        <a href="javascript:void(0)" title="Phí vận tải" v-if="vehicleReport.transportation_costs > 0">
                            <span>{{formatNumber(vehicleReport.transportation_costs)}}</span><i class="fa fa-eye"></i>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td class="red">
                        <a href="javascript:void(0)" title="Phí neo xe" v-if="vehicleReport.parking_costs > 0">
                            <span>{{formatNumber(vehicleReport.parking_costs)}}</span><i class="fa fa-eye"></i>
                        </a>
                        <span v-else>0</span>
                    </td>
                    <td>
                        <p>
                            <b>• Sản lượng:</b>
                            <br>
                            <span class="blue">{{formatNumber(vehicleReport.salary.bonus_money )}}</span>
                        </p>
                        <p>
                            <b>• Chế độ:</b>
                            <br>
                            <span class="green">{{formatNumber(vehicleReport.driver_salary)}}</span>
                        </p>
                        <p>
                            <b>• Tổng lương:</b>
                            <br>
                            <span class="red">{{formatNumber(vehicleReport.driver_salary + vehicleReport.salary.bonus_money) }}</span>
                        </p>
                    </td>
                    <td class="red">{{vehicleReport.other_fees}} <p>
                            <a href="javascript:void(0)" onclick="return frmForm('baocaoxe','frm','NF9fX19fMDRfX19fXzIwMjQ')" title="Thêm phí khác" style="float:right;font-size:10px">
                                <!-- <i class="fa fa-plus"></i> Thêm -->
                            </a>
                        </p>
                    </td>
                    <td class="blue">{{formatNumber(vehicleReport.bulk_cargo_revenue)}}</td>
                    <td class="green">{{formatNumber(vehicleReport.total_revenue)}}</td>
                    <td class="red">{{formatNumber(vehicleReport.profit)}}</td>
                    <!-- <td align="center">
                        <a href="javascript:void(0)"    >
                            <img src="/images/icons/check-0.png">
                        </a>
                        <p>
                            <a href="javascript:void(0)" title="Xuất file" >
                                <i class="fa fa-file-excel-o"></i> Xuất File </a>
                        </p>
                    </td> -->
                </tr>
            </tbody>
            <tbody class="tablesorter-no-sort">
                <tr role="row">
                    <td colspan="3" align="right">
                        <h3>Tổng cộng</h3>
                    </td>
                    <td class="red">
                        <h3> 0.00 </h3>
                    </td>
                    <td class="red">
                        <h3>{{totalData.number_of_cont_shipments}}</h3>
                    </td>
                    <td class="red">
                        <h3>{{totalData.number_of_bulk_shipments}}</h3>
                    </td>
                    <td class="green">
                        <h3>{{formatNumber(totalData.order_repair_costs)}}</h3>
                    </td>
                    <td class="green">
                        <h3>{{formatNumber(totalData.other_repair_costs)}}</h3>
                    </td>
                    <td class="blue">
                        <h3>{{formatNumber(totalData.tire_replacement_costs)}}</h3>
                    </td>
                    <td class="red">
                        <h3>{{formatNumber(totalData.fuel_costs)}}</h3>
                    </td>
                    <td class="blue">
                        <h3>{{formatNumber(totalData.transportation_costs)}}</h3>
                    </td>
                    <td class="red">
                        <h3>{{formatNumber(totalData.parking_costs)}}</h3>
                    </td>
                    <td class="blue">
                        <h3>{{formatNumber(totalData.salary + totalData.vehicle_salary)}}</h3>
                    </td>
                    <td class="blue">
                        <h3>{{formatNumber(totalData.other_fees)}}</h3>
                    </td>
                    <td class="blue">
                        <h3>{{formatNumber(totalData.bulk_cargo_revenue)}}</h3>
                    </td>
                    <td class="green">
                        <h3>{{formatNumber(totalData.total_revenue)}}</h3>
                    </td>
                    <td class="red">
                        <h3>
                            <span class="bg">{{formatNumber(totalData.profit)}}</span>
                        </h3>
                    </td>
                    <!-- <td class="red">&nbsp;</td> -->
                </tr>
            </tbody>
        </table>
    </div>
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
  import { formatNumber } from '@/helper.js';
  import SelectLicensePlatesModal from '@/components/SelectLicensePlatesModal.vue';
  </script>
  <script>
  export default {
    data: function () {
        return {
            openSelectLicensePlatesModal: false,
            master: [],
            totalData: [],
            search: { ...this.$store.state.report.searchReportByVehicle},
            data: []
        }
    },
    mounted: function () {
        this.getData();
        this.getMaster();
    },
    methods: {
        getData: function () {
            let payload = this.search;
            this.$store.dispatch("getReportByVehicle", payload).then((res) => {
                this.data = res.data.data;
                this.totalData = this.sumByKey(res.data.data);
            });
        },
        getMaster: function () {
            this.$store.dispatch("getReportMaster").then((res) => {
                this.master = res.data.data;
            });
        },
        resetSearch: function () {
            this.search = { ...this.$store.state.report.searchReportByVehicle};
            this.getData();
        },
        setPlateSearch: function (value) {
            this.search.plate = value;
        },
        openModal: function (type, data = null, vehicleID = null) {
            this[type] = true;
            this.modalData[type]  = data;
            this.modalData.id  = vehicleID;
        },
        onCloseDetailModal: function (type) {
            this[type] = false
            //this.getData();
        },
        sumByKey: function (data) {
            const totals = {};

            for (const vehicle of data) {
                for (const key in vehicle) {
                if (typeof vehicle[key] === 'number') {
                    if (!totals.hasOwnProperty(key)) {
                        totals[key] = 0;
                    }
                        totals[key] += vehicle[key];
                    }
                }
            }

            return totals;
        }
    }
  }
  </script>
