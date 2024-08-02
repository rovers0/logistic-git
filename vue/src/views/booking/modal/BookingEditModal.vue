<template>
    <div class="popup popup_center">
        <div class="scroll"> <span class="close_pop" @click="onClose">×</span>
            <div class="pophead">
                <h2>Sửa vận đơn - Mã vận đơn: <span class="red">{{ data.booking.id }}</span></h2>
                <p>Sửa thông tin vận đơn, vui lòng kiểm tra thông tin chính xác!</p>
            </div>
            <div class="table frm" style="width:98%">
                <form name="frmCuocVanChuyen" id="frmCuocVanChuyen"
                    onsubmit="return insert('vandon','update','frmCuocVanChuyen',1)" method="post"
                    enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTMzOV9fX19fQk9PS0lOR19fX19fMjlfX19fXzA1X19fX18yMDI0">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-user"></i> Thông
                                        tin khách hàng<a href="javascript:void(0)" @click="openSelectCustomerModal"
                                            style="float:right;font-size:14px;font-weight:400"
                                            title="Thay đổi khách hàng?"><i class="fa fa-pencil"></i> Thay đổi</a></h3>
                                </td>
                            </tr>
                        </tbody>
                        <tbody id="body_kh">
                            <tr>
                                <td width="24%"><b>Khách hàng (*)</b></td>
                                <td>{{ data.booking.customer.short_name }}</td>
                            </tr>
                            <tr>
                                <td><b>Công ty/ Đơn vị (*)</b></td>
                                <td>{{ data.booking.customer.name }}</td>
                            </tr>
                            <tr>
                                <td><b>Số điện thoại (*)</b></td>
                                <td>{{ data.booking.customer.phone }}</td>
                            </tr>
                            <tr>
                                <td><b>Địa chỉ</b> (*)</td>
                                <td>{{ data.booking.customer.address }}</td>
                            </tr>
                            <tr>
                                <td><b>Mã số thuế</b> (*)</td>
                                <td>{{ data.booking.customer.tax_no }}</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i
                                            class="fa fa-info-circle"></i> Thông tin đơn hàng</h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%"><b>Tuyến vận chuyển (*)</b></td>
                                <td style="font-size:16px;font-weight:bold;color:green">
                                    <div id="changeTuyen">
                                        <input type="text" v-model="data.booking.route.name" class="green bold"
                                            placeholder="Nhập tuyến vận chuyển" required="" maxlength="255">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody id="tgbook">
                            <tr>
                                <td><b>Số lượng Cont (*)</b></td>
                                <td><input type="number" v-model="data.booking.invoice.quantity" min="1" max="100"
                                        class="slnb">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Loại cont:</b>
                                    <input type="text" v-model="data.booking.invoice.cont_type" id="loaicont"
                                        class="lcbn">

                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Đơn giá:</b>
                                    <input type="text" v-model="data.booking.invoice_price" data-type="currency"
                                        class="dgnb">

                                </td>
                            </tr>
                            <tr>
                                <td><b>Loại hàng (*)</b></td>
                                <td>
                                    <select v-model="data.booking.invoice.product_type" required="">
                                        <option :value="null">Loại hàng</option>
                                        <option value="1">Nhập</option>
                                        <option value="2">Xuất</option>
                                        <option value="3">Nội địa</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><b class="red">Hãng tàu (*)</b></td>
                                <td>
                                    <Dropdown v-model="selectedShipBrand" @change="setCarrierId" :options="shipBrands"
                                        filter optionLabel="name" placeholder="Chọn hãng tàu" style="width: 50%;">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value">
                                                <div>{{ slotProps.value.name }}</div>
                                            </div>
                                            <span v-else>
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div>
                                                <div>{{ slotProps.option.name }}</div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                    <a href="javascript:void(0)" @click="addBrand"
                                        style="border-radius: 3px;padding: 9px;background: #006080;color: #fff;float: right"><i
                                            class="fa fa-plus"></i>
                                        Thêm</a>
                                    <input type="text" v-model="shipBrandAdd" placeholder="Nhập hãng tàu"
                                        style="width:30%;float:right;margin:0 1% 0 0;">
                                    <p class="tips blue2 italic">(Tên hãng tàu nơi lấy cont hàng hoặc hạ cont hàng. Nếu
                                        chưa có tên sẵn vui lòng nhập)</p>
                                </td>
                            </tr>

                            <tr>
                                <td width="20%"><b>Ngày giờ vận chuyển (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="delivery.date"
                                        placeholder="Chọn ngày"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="delivery.hour" value="00" min="0" max="23"
                                        maxlength="2" onkeypress="checkIt(event)"
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Giờ"
                                        style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="delivery.minute" value="00" min="0" max="59"
                                        maxlength="2" onkeypress="checkIt(event)"
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Phút"
                                        style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td><b>Cắt máng/Xuống hàng (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="cutoff.date"
                                        placeholder="Chọn ngày"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="cutoff.hour" value="00" min="0" max="23" maxlength="2"
                                        onkeypress="checkIt(event)"
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Giờ"
                                        style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="cutoff.minute" value="00" min="0" max="59"
                                        maxlength="2" onkeypress="checkIt(event)"
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Phút"
                                        style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td><b class="red">Số lệnh điều động (*)</b></td>
                                <td><input type="number" v-model="data.booking.invoice.method_command_number" min="1"
                                        max="100" class="red" placeholder="Nhập số lệnh cần điều xe"
                                        onkeypress="return checkIt(event)" maxlength="3" required="" readonly=""></td>
                            </tr>
                            <tr>
                                <td><b>Số Booking/Bill (*)</b></td>
                                <td><input type="text" v-model="data.booking.invoice.booking_code"
                                        placeholder="Nhập số Booking/Bill" maxlength="255" required=""></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-truck"></i>
                                        Nhiệm vụ vận chuyển (*)</h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Lấy rỗng/Lấy cont hàng nhập</b></td>
                                <td><input type="text" v-model="data.booking.invoice.taskTransports.get_null_point"
                                        id="id_diemdi" placeholder="Điểm lấy rỗng/Lấy cont hàng nhập" required=""
                                        maxlength="255" style="width:49%;float:left">
                                    <input type="text"
                                        v-model="data.booking.invoice.taskTransports.get_null_point_request"
                                        placeholder="Yêu cầu" maxlength="255" style="width:45%;float:right" required="">
                                </td>
                            </tr>
                            <tr>
                                <td><b>Đóng hàng/Giao hàng</b></td>
                                <td><input type="text" v-model="data.booking.invoice.taskTransports.shipping_point"
                                        id="id_diemden" placeholder="Điểm đóng hàng/ Giao hàng" required=""
                                        maxlength="255" style="width:49%;float:left">
                                    <input type="text"
                                        v-model="data.booking.invoice.taskTransports.shipping_point_request"
                                        placeholder="Yêu cầu" maxlength="255" style="width:45%;float:right" required="">
                                </td>
                            </tr>
                            <tr>
                                <td><b>Cảng hạ chờ xuất/Trả rỗng</b></td>
                                <td><input type="text" v-model="data.booking.invoice.taskTransports.return_null_point"
                                        placeholder="Nơi cảng hạ chờ xuất/ Trả rỗng" required="" maxlength="255"
                                        style="width:49%;float:left">
                                    <input type="text"
                                        v-model="data.booking.invoice.taskTransports.return_null_point_request"
                                        placeholder="Yêu cầu" maxlength="255" style="width:45%;float:right" required="">
                                </td>
                            </tr>
                            <tr>
                                <td><b>Ghi chú (nếu có)</b></td>
                                <td><input type="text" v-model="data.booking.invoice.taskTransports.note"
                                        placeholder="Ghi chú (nếu có)" maxlength="255"></td>
                            </tr>

                            <tr>
                                <td colspan="2">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-map-marker"></i>
                                        Thông tin hành trình (nếu
                                        có)</h3>
                                    <p class="tips blue2 italic">(Cập nhập vị trí để hiển thị thông tin hành trình,
                                        khoảng cách, thời gian dự đoán,
                                        tình trạng giao thông,...)</p>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Điểm bắt đầu</b></td>
                                <td><input type="search" v-model="data.booking.invoice.location_start" id="start1"
                                        placeholder="Vị trí bắt đầu" maxlength="500" class="pac-target-input"
                                        autocomplete="off"></td>
                            </tr>
                            <tr>
                                <td><b>Điểm đến</b></td>
                                <td><input type="search" v-model="data.booking.invoice.location_end" id="end1"
                                        placeholder="Điểm đến" maxlength="500" class="pac-target-input"
                                        autocomplete="off"></td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding:0">
                                    <table class="body_waypoint">
                                        <tr v-for="(item, i) in data.booking.invoice.trips" class="tr_waypoint">
                                            <td width="24%"><b class="green">Điểm dừng {{ i + 1 }}</b></td>
                                            <td><input type="search" v-model="item.point" id="'waypoints_1'"
                                                    style="width:93%;background:#c9f2dd" class="pac-target-input"
                                                    placeholder="Nhập vị trí" autocomplete="off"> <a
                                                    href="javascript:void(0)" @click="removeWayPoint(i)"
                                                    title="Xóa điểm"
                                                    style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i
                                                        class="fa fa-trash"></i></a></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" colspan="2">
                                    <a href="javascript:void(0)" @click="addWayPoint"
                                        style="border-radius: 3px;padding: 7px;display: inline-block;background: #006080;color: #fff;"><i
                                            class="fa fa-plus"></i> Thêm điểm dừng</a>
                                    <p class="tips blue2 italic" style="padding: 5px 0 0 0">(Thêm điểm dừng, điểm trung
                                        chuyển hoặc điểm nối chuyến)
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Upload files</b></td>
                                <td>
                                    <div class="body_file">
                                        <div v-for="(item, i) in rowFiles" class="body_file_tr"
                                            style="width:100%;float:left">
                                            <span
                                                style="position:relative;width:86px;height:34px;display: inline-block;line-height: 34px;float: left;background: #0c8885;text-align: center;font-weight: bold;color: #fff;border-radius: 3px;">
                                                <i class="fa fa-plus"></i> Chọn file <input type="file"
                                                    name="pdf_file[]" id="file_1"
                                                    onchage="getFileName('file_1','show_name_id_1')"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                    style="opacity:0;position:absolute;left: 0;top: 0;width: 86px;height: 26px;">
                                            </span>
                                            <div style="width:83.5%;float:right">
                                                <div style="width:91.5%;float: left"> <select name="file_name[]"
                                                        class="select_add_1 selectized"
                                                        placeholder="Chọn hoặc nhập tên file..." tabindex="-1"
                                                        style="display: none;">
                                                        <option value="" selected="selected"></option>
                                                    </select>
                                                    <div class="selectize-control select_add_1 single">
                                                        <div
                                                            class="selectize-input items required invalid not-full has-options">
                                                            <input type="select-one" autocomplete="off" tabindex=""
                                                                placeholder="Chọn hoặc nhập tên file..." required=""
                                                                style="width: 140.766px;">
                                                        </div>
                                                        <div class="selectize-dropdown single select_add_1"
                                                            style="display: none;">
                                                            <div class="selectize-dropdown-content"></div>
                                                        </div>
                                                    </div>
                                                </div> <a href="javascript:void(0)"
                                                    style="display:block;float:right;width:34px;height:34px;line-height:34px;text-align:center;color:red;font-size:1.3rem"
                                                    @click="removeRowFile(i)"><i class="fa fa-trash"></i></a>
                                            </div>
                                            <div id="show_name_id_1" style="padding:5px 0;color:red;clear:both"></div>
                                        </div>
                                    </div>
                                    <p><a href="javascript:void(0)" title="Thêm file" @click="addRowFile"><i
                                                class="fa fa-plus"></i> Thêm dòng</a>
                                    </p>
                                    <p class="tips blue2 italic" style="padding: 5px 0 0 0">(Upload file đính kèm và đặt
                                        tên file nhận diện)</p>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Chụp/upload hình ảnh duyệt lệnha</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*"
                                        onchange="previewImg(event,8);" multiple="multiple">
                                    <p style="padding:5px 0 0 0;color:red">Upload file hình hoặc chụp ảnh xác nhận lệnh
                                        (Có hoặc không)</p>
                                    <div class="view_pics"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3>Hình ảnh đính kèm</h3>
                                    <ul class="picslist">
                                        <VueLightbox :imgs="data.booking.invoice.images" :hideDelete="true">
                                        </VueLightbox>
                                    </ul>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <table v-if="data.booking.is_has_partner" width="100%">
                        <tbody>
                            <tr>
                                <th colspan="2">
                                    <h3 style="font-size:17px;text-transform:uppercase">Thông tin vận chuyển xe ngoài
                                    </h3>
                                </th>
                            </tr>
                            <tr>
                                <td width="22%"><b>Đối tác nhà xe có sẵn (*)</b></td>
                                <td>
                                    <select name="doitac_nhaxe" class="select2 selectized" required="" tabindex="-1"
                                        style="display: none;">
                                        <option value="M19fX19fMDk4MzM2MzAwMg" selected="selected">Panda - CÔNG TY TNHH
                                            VẬN TẢI VÀ TIẾP VẬN
                                            PANDA - (0983363002)</option>
                                    </select>
                                    <div class="selectize-control select2 single plugin-remove_button">
                                        <div class="selectize-input items required full has-options has-items"><span
                                                data-value="M19fX19fMDk4MzM2MzAwMg">
                                                <div class="item">Panda - CÔNG TY TNHH VẬN TẢI VÀ TIẾP VẬN PANDA -
                                                    (0983363002)</div><a href="javascript:void(0)" class="remove-single"
                                                    tabindex="-1" title="Remove">×</a>
                                            </span><input type="select-one" autocomplete="off" tabindex=""
                                                style="width: 4px;"></div>
                                        <div class="selectize-dropdown single select2 plugin-remove_button"
                                            style="display: none; width: 717.453px; top: 34px; left: 0px;">
                                            <div class="selectize-dropdown-content"></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Số lượng Cont (*)</b></td>
                                <td>
                                    <input type="number" name="ds2[soluongcont]" value="1" placeholder="VD: 2" min="1"
                                        max="100" maxlength="3" onkeypress="checkIt(event)" class="txtslc" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 10px">Số lệnh:</b>
                                    <input type="number" name="ds2[solenhdieudong]" value="1" min="1" max="100"
                                        placeholder="Số lệnh xe" onkeypress="return checkIt(event)" maxlength="3"
                                        required="" class="txtsldd red">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 10px">Đơn giá:</b>
                                    <input type="text" name="ds2[dongia]" value="4,200,000" placeholder="VD: 2,450,000"
                                        class="txtdg" required="">
                                </td>

                            </tr>
                            <tr>
                                <td><b>Ghi chú thêm</b></td>
                                <td>
                                    <input type="text" name="ds2[ghichu]" value="ko" maxlength="500"
                                        placeholder="Nội dung" required="">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateBooking" class="checked_tx"
                            style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i>
                            Lưu thông
                            tin</button>
                        <button type="button" @click="onClose"
                            style="float:none;text-align: center;display: inline-block;" class="close_btn checked_tx"><i
                                class="fa fa-times-circle"></i> Đóng lại</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="screen screen2"></div>
    <SelectContractModal v-if="showSelectContractModal" :data="null" @close="closeSelectContractModal">
    </SelectContractModal>
    <SelectCustomerModal v-if="showSelectCustomerModal" :data="customers" @onSubmit="setSelecedCustomer"
        @close="closeSelectCustomerModal"></SelectCustomerModal>
    <SelectDriverModal v-if="showDriverSelectModal" :data="drivers" @onSubmit="setSelecedDrivers"
        @close="closeDriverSelectModal"></SelectDriverModal>
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
import SelectContractModal from './SelectContractModal.vue';
import SelectCustomerModal from './SelectCustomerModal.vue';
import SelectDriverModal from './SelectDriverModal.vue';
import Dropdown from 'primevue/dropdown';
import { objectToFormData } from '@/helper.js';
import booking from '../../../store/modules/booking';
import VueLightbox from "@/components/VueLightbox.vue";
</script>
<script>
export default {
    props: ['data'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            cv_root_file: [],
            image: [],
            insertBooking: this.$store.state.booking.addNew,
            showSelectContractModal: false,
            showSelectCustomerModal: false,
            showDriverSelectModal: false,
            customers: this.$props.data.master.customers,
            drivers: [],
            customerInfo: {},
            driversInfo: [],
            rowFiles: [],
            shipBrands: this.$props.data.master.carriers,
            routes: this.$props.data.master.routes,
            partners: this.$props.data.master.partners,
            selectedShipBrand: this.$props.data.booking.invoice.carrier,
            shipBrandAdd: null,
            routeAdd: null,
            delivery: {
                date: moment(this.$props.data.booking.invoice.time_transport).utc(true),
                hour: moment(this.$props.data.booking.invoice.time_transport).format('HH'),
                minute: moment(this.$props.data.booking.invoice.time_transport).format('mm')
            },
            cutoff: {
                date: moment(this.$props.data.booking.invoice.time_down_the_line).utc(true),
                hour: moment(this.$props.data.booking.invoice.time_down_the_line).format('HH'),
                minute: moment(this.$props.data.booking.invoice.time_down_the_line).format('mm')
            }
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        openSelectContractModal: function () {
            this.showSelectContractModal = true;
        },
        closeSelectContractModal: function () {
            this.showSelectContractModal = false;
        },
        openSelectCustomerModal: function () {
            this.showSelectCustomerModal = true;
        },
        closeSelectCustomerModal: function () {
            this.showSelectCustomerModal = false;
        },
        openDriverSelectModal: function () {
            this.$store.dispatch("getDriverAll").then((res) => {
                this.drivers = res.data.data;
                this.showDriverSelectModal = true;
            });
        },
        closeDriverSelectModal: function () {
            this.showDriverSelectModal = false;
        },
        setSelecedCustomer: function (customer) {
            this.$props.data.booking.customer = customer;
        },
        addRowContSeal: function () {
            this.insertBooking.conts.push({
                code: null,
                seal: null,
                gross: null
            });
        },
        removeRowContSeal: function (index) {
            this.insertBooking.conts.splice(index, 1);
        },
        addWayPoint: function () {
            this.$props.data.booking.invoice.trips.push({
                point: null,
            });
        },
        removeWayPoint: function (index) {
            this.$props.data.booking.invoice.trips.splice(index, 1);
        },
        addRowFile: function () {
            this.rowFiles.push({
                waypoints: null,
            });
        },
        removeRowFile: function (index) {
            this.rowFiles.splice(index, 1);
        },
        addBrand: function () {
            let data = { name: this.shipBrandAdd };
            this.$store.dispatch("addBrand", data).then((res) => {
                this.shipBrands = res.data.data;
                this.shipBrandAdd = null;
            });
        },
        addRoute: function () {
            let data = { name: this.routeAdd };
            this.$store.dispatch("addRoute", data).then((res) => {
                this.routes = res.data.data;
                this.routeAdd = null;
            });
        },
        setSelecedDrivers: function (drivers) {
            this.driversInfo.name = drivers.map(driver => {
                return driver.user.name;
            }).join(', ');
            this.insertBooking.drivers = drivers.map(driver => {
                return driver.id;
            });
        },
        updateBooking: function () {
            this.$props.data.booking.invoice.time_transport = this.handleTime(this.delivery);
            this.$props.data.booking.invoice.time_down_the_line = this.handleTime(this.cutoff);
            let data = { booking: { ...this.$props.data.booking } };
            const formData = objectToFormData(data);
            this.$store.dispatch("updateBooking", { id: this.$props.data.booking.id, form: formData }).then((res) => {
                if (res.data?.code == 200) {
                    this.$emit('onSubmit');
                    this.onClose();
                } else {
                    alert('Có lỗi xảy ra! Vui lòng thử lại sau.')
                }
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
        setCarrierId: function () {
            this.insertBooking.invoice.carrier_id = this.selectedShipBrand.id;
        },
        formatNumber: function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    created: async function () {
        this.$props.data.booking.invoice_price = this.$props.data.booking.invoice.price / this.$props.data.booking.invoice.command_mobiles.length
    }
}
</script>
