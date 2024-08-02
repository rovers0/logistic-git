<template>
    <div class="popup popup_dh">
        <div class="scroll">
            <span class="close_pop" @click="onClose">×</span>
            <div class="pophead">
                <h2>Thông tin điều động - Mã lệnh: <span class="red">{{ data.id }}</span></h2>
                <p>Thông tin lệnh điều động, vui lòng kiểm tra thông tin chính xác!</p>
            </div>
            <div class="table frm" style="width:100%">
                <form method="post" enctype="multipart/form-data">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-user"></i> Thông tin khách hàng</h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Khách hàng</b></td>
                                <td>{{ data.customer.short_name }}</td>
                            </tr>
                            <tr>
                                <td><b>Công ty/Đơn vị</b></td>
                                <td>{{ data.customer.name }}</td>
                            </tr>
                            <tr>
                                <td><b>Địa chỉ</b></td>
                                <td>{{ data.customer.address }}</td>
                            </tr>
                            <tr>
                                <td><b>Số điện thoại</b></td>
                                <td>{{ data.customer.phone }}</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-info-circle"></i> Thông tin lệnh điều động xe</h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Tuyến vận chuyển</b></td>
                                <td><span style="font-size:16px;font-weight:bold;color:green">{{ data.route.name }}</span></td>
                            </tr>
                            <tr>
                                <td width="24%"><b>Ngày giờ vận chuyển (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="delivery.date" placeholder="Chọn ngày"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="delivery.hour" min="0" max="23" maxlength="2"placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="delivery.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td width="24%"><b>Cắt máng/Xuống hàng (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="cutoff.date" placeholder="Chọn ngày"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="cutoff.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="cutoff.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>

                            <tr>
                                <td><b>Tên tài xế (*)</b></td>
                                <td>
                                    <input type="text" v-model="data.driver" class="tx2 readonly" placeholder="Chọn tài xế" required="required" maxlength="50" autocomplete="off" readonly="readonly" @click="openDriverSelectModal">

                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Đầu cái:</b>
                                    <input v-model="data.vehicle" @click="openVehicleSelectModal('showVehicleSelectModal')" type="text" class="dc readonly" placeholder="Xe đầu cái" required="required" maxlength="15" autocomplete="off" readonly="readonly">

                                    <div class="dirm">
                                        <b style="float:left;line-height:34px;margin:0 5px 0 5px">Rơmooc:</b>
                                        <input v-model="data.romooc" @click="openVehicleSelectModal('showRomoocSelectModal')" type="text" class="rc" placeholder="Chọn rơ mooc" required="required" maxlength="30" autocomplete="off" readonly="readonly">
                                    </div>
                                </td>
                            </tr>
                            <template v-for="cont in data.conts">
                                <tr>
                                    <td><b>Mã Cont</b></td>
                                    <td><input type="text" v-model="cont.code" placeholder="Nhập mã Cont" maxlength="255"></td>
                                </tr>
                                <tr>
                                    <td><b>Số Seal</b></td>
                                    <td><input type="text" v-model="cont.seal" placeholder="Nhập số seal" maxlength="255"></td>
                                </tr>
                                <tr>
                                    <td><b class="red">Gross weight (KGS)</b></td>
                                    <td><input type="text" v-model="cont.gross" class="bold red" placeholder="Tổng trọng lượng" maxlength="15">
                                        <p class="tips blue2 italic">Tổng trọng lượng container + Hàng hóa (nếu có)</p>
                                    </td>
                                </tr>
                            </template>
                            <tr>
                                <td><b>Tạm ứng theo chuyến (*)</b></td>
                                <td><input type="text" v-model="data.advance_money" value="0" data-type="currency" class="tu2 red bold" placeholder="VD: 1,000,000" maxlength="30" required="required">
                                    <p class="tips blue2 italic">(Nhập số tiền tạm ứng theo chuyến cho tài xế nếu có)</p>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Lương tài xế (*)</b></td>
                                <td>
                                    <select name="kieuchuyen" id="kieuchuyen" onchange="LuongOption(this.value)" class="kc" required="">
                                        <option value="">Chọn loại lương chuyến?</option>
                                        <option value="MF9fX19fMjZfX19fXzBfX19fXzFfX19fXzE3MzVfX19fXzI" selected="selected">Lương chuyến</option>
                                        <option value="MF9fX19fMjZfX19fXzBfX19fXzJfX19fXzE3MzVfX19fXzI">Lương cont cặp/Kết hợp</option>
                                    </select>

                                    <div class="luongchuyen"><input type="text" v-model="data.invoice.driver_salary" style="width:150px" class="bold red"></div>

                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px"> - Bồi dưỡng thêm (nếu có):</b>
                                    <input type="text" name="ds[tienboiduong]" value="0" placeholder="Vd: 500,000" class="bd" maxlength="15">

                                    <p style="color:#006080;padding:4px 0 0 0"><i>Lương chuyến tính theo loại cont và tiền bồi dưỡng thêm nếu có</i></p>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Số liên hệ khi đến</b></td>
                                <td><input type="text" name="ds[solienlac]" value="" placeholder="VD: 0988010101 (A.Tân)" maxlength="255"></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="table_scroll">
                        <table class="table800">
                            <tbody>
                                <tr>
                                    <th width="15%">Nhiệm vụ</th>
                                    <th colspan="2">Số lượng cont</th>
                                    <th width="20%">Vị Trí</th>
                                    <th width="40%">Yêu Cầu</th>
                                </tr>
                                <tr>
                                    <td>Lấy rỗng/Lấy cont hàng nhập</td>
                                    <td rowspan="3" align="center" width="7%">
                                        <div class="soluongcont"><span style="display:block;line-height:34px;font-size:16px;font-weight:bold;color:red;text-align:center">{{ data.quantity }}</span></div>

                                    </td>
                                    <td rowspan="3" align="center" width="7%">
                                        <span class="bold">{{ data.invoice.cont_type }}</span>
                                    </td>
                                    <td><input type="text" v-model="data.invoice.task_transports.get_null_point" required="" style="width:97.5%"></td>
                                    <td><input type="text" v-model="data.invoice.task_transports.get_null_point_request" required="" style="width:97.5%"></td>
                                </tr>
                                <tr>
                                    <td>Đóng hàng/Giao hàng</td>
                                    <td><input type="text" v-model="data.invoice.task_transports.shipping_point" required="" style="width:97.5%"></td>
                                    <td><input type="text" v-model="data.invoice.task_transports.shipping_point_request" required="" style="width:97.5%"></td>
                                </tr>

                                <tr>
                                    <td>Cảng hạ chờ xuất/Trả rỗng</td>
                                    <td><input type="text" v-model="data.invoice.task_transports.return_null_point" required="" style="width:97.5%"></td>
                                    <td><input type="text" v-model="data.invoice.task_transports.return_null_point_request" required="" style="width:97.5%"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateOrder" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" style="float:none;text-align: center;display: inline-block;" class="close_btn checked_tx"><i class="fa fa-times-circle"></i> Đóng lại</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="screen screen2"></div>
    <SelectDriverModal v-if="showDriverSelectModal" :data="drivers" @onSubmit="setSelecedDrivers" @close="closeSelectModal('showDriverSelectModal')"></SelectDriverModal>
    <SelectVehicleModal v-if="showVehicleSelectModal" :data="vehicles" @onSubmit="setSelecedVehicle" @close="closeSelectModal('showVehicleSelectModal')"></SelectVehicleModal>
    <SelectVehicleModal v-if="showRomoocSelectModal" :data="romoocs" :isMooc="true" @onSubmit="setSelecedRomoc" @close="closeSelectModal('showRomoocSelectModal')"></SelectVehicleModal>
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
import SelectDriverModal from './SelectDriverModal.vue';
import SelectVehicleModal from './SelectVehicleModal.vue';
</script>
<script>
export default {
    props: ['data', 'master'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            search: null,
            showDriverSelectModal: false,
            showVehicleSelectModal: false,
            showRomoocSelectModal: false,
            drivers: [],
            vehicles: [],
            romoocs: [],
            driversInfo: [],
            delivery: {
                date: this.$props.data.invoice.time_transport ? moment(this.$props.data.invoice.time_transport).utc(true) : moment().utc(true),
                hour: this.$props.data.invoice.time_transport ? moment(this.$props.data.invoice.time_transport).format('HH') : 0,
                minute: this.$props.data.invoice.time_transport ? moment(this.$props.data.invoice.time_transport).format('mm') : 0
            },
            cutoff: {
                date: this.$props.data.invoice.time_down_the_line ? moment(this.$props.data.invoice.time_down_the_line).utc(true) : moment().utc(true),
                hour: this.$props.data.invoice.time_down_the_line ? moment(this.$props.data.invoice.time_down_the_line).format('HH') : 0,
                minute: this.$props.data.invoice.time_down_the_line? moment(this.$props.data.invoice.time_down_the_line).format('mm') : 0
            }
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        setSelecedDrivers: function (drivers) {
            this.data.driver = drivers.user.name;
            this.data.driver_id = drivers.id;
        },
        setSelecedVehicle: function (vehicle) {
            this.data.vehicle = vehicle.plate;
            this.data.vehicle_id = vehicle.id;
        },
        setSelecedRomoc: function (romooc) {
            this.data.romooc = romooc.serial;
            this.data.romooc_id = romooc.id;
        },
        openDriverSelectModal: function () {
            this.$store.dispatch("getDriverAll").then((res) => {
                this.drivers = res.data.data;
                this.showDriverSelectModal = true;
            });
        },
        openVehicleSelectModal: function (type) {
            this.vehicles = this.master.vehicle;
            this.romoocs = this.master.romooc;
            this[type] = true;
        },
        closeSelectModal: function (type) {
            this[type] = false;
        },
        formatNumber: function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        updateOrder: function () {
            this.$props.data.invoice.time_transport = this.handleTime(this.delivery);
            this.$props.data.invoice.time_down_the_line = this.handleTime(this.cutoff);
            let data = {...this.$props.data};
            this.$store.dispatch("updateOrder", data).then((res) => {
                this.$emit('onSubmit');
                this.onClose();
            });
        },
        handleTime: function (obj) {
            let date = obj.date;
            let hour = obj.hour ? obj.hour : '00';
            let minute = obj.minute ? obj.minute : '00';
            if (date) {
                date = moment(obj.date).format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':00';
                return date;
            }
            return null;
        },
    },
    created: async function () {

    }
}
</script>
