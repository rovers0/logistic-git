<template>
    <div class="popup popup_full">
        <div class="scroll">
            <span class="close_pop" @click="onClose">×</span>
            <div class="pophead" style="float:left">
                <div class="contvd">
                    <h2>Chi tiết Vận Đơn - Mã VĐ: <span class="red" id="id_vd">{{ booking?.id }}</span></h2>
                    <p class="bold">Người lập vận Đơn: <span class="red" id="id_nv">{{ booking?.maker?.name }}</span>
                    </p>
                </div>
                <div class="svd">
                    <button type="button" class="btnvd" @click="searchBooking"><i class="fa fa-search"></i> Tra
                        cứu</button>
                    <input type="text" v-model="search" placeholder="Tra cứu mã vận đơn" class="txtvd"
                        autocomplete="off" required="required">
                </div>
            </div>
            <div v-if="booking" class="frm" id="cont_vd">
                <div class="table table_scroll">
                    <table class="table1366">
                        <tbody>
                            <tr>
                                <td colspan="4">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i
                                            class="fa fa-info-circle"></i> Thông tin vận đơn</h3>
                                </td>
                            </tr>

                            <tr>
                                <td width="17%"><b>Tuyến vận chuyển</b></td>
                                <td><b class="green">{{ booking.route.name }}</b></td>
                                <td width="12%"><b>Ngày lập vận đơn</b></td>
                                <td>{{ moment(booking.created_at).format('YYYY-MM-DD HH:mm:ss') }}</td>
                            </tr>
                            <tr>
                                <td><b>Ngày vận chuyển</b></td>
                                <td class="bold"><b class="green">{{
                moment(booking.invoice.time_transport).format('YYYY-MM-DD HH:mm') }}</b> - Cut
                                    off: <b class="green">{{
                moment(booking.invoice.time_down_the_line).format('YYYY-MM-DD HH:mm') }}</b> -
                                    Hãng tàu: <b class="green">{{ booking.invoice.carrier.name }}</b> - Số hiệu/Mác tàu:
                                    <b class="green">{{ booking.invoice.carrier_number }}</b>
                                </td>
                                <td><b>Số booking/Bill</b></td>
                                <td>{{ booking.invoice.booking_code }}</td>
                            </tr>
                            <tr>
                                <td><b>Tình trạng vận đơn</b></td>
                                <td><span class="green"><i class="fa fa-check-circle"></i> Đã duyệt ứng</span></td>
                                <td><b>Số lượng cont</b></td>
                                <td>
                                    <h3><span class="red">{{ booking.invoice.quantity }}: {{ booking.invoice.cont_type
                                            }}</span></h3>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Khách hàng</b></td>
                                <td>{{ booking.customer.short_name }}</td>
                                <td><b>Số lệnh điều động</b></td>
                                <td>
                                    <h3><span class="red bg">{{ booking.invoice.method_command_number }}</span></h3>
                                </td>

                            </tr>
                            <tr>
                                <td><b>Công ty/Đơn vị</b></td>
                                <td>{{ booking.customer.name }}</td>
                                <td><b>Đơn giá</b></td>
                                <td>
                                    <h3><span class="red bg">{{ formatNumber(booking.invoice.price) }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Địa chỉ</b></td>
                                <td>{{ booking.customer.address }}</td>
                                <td><b>Tổng phí vận chuyển</b></td>
                                <td>
                                    <h3><span class="red bg">3,900,000</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Số điện thoại</b></td>
                                <td>{{ booking.customer.phone }}</td>
                                <td><b>Tổng tiền tạm ứng</b></td>
                                <td>
                                    <h3><span class="red bg">0</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Mã số thuế</b></td>
                                <td>{{ booking.customer.tax_no }}</td>

                                <td><b>Tổng phí chi hộ</b></td>
                                <td>
                                    <h3><span class="red bg">0</span></h3>
                                </td>



                            </tr>
                            <tr>
                                <td><b>Điểm lấy rỗng/lấy hàng</b></td>
                                <td>{{ booking.invoice.taskTransports.get_null_point }}: {{
                booking.invoice.taskTransports.get_null_point_request }}</td>
                                <td><b>Phí công ty chi</b></td>
                                <td>
                                    <h3><span class="red bg">0</span></h3>
                                </td>

                            </tr>
                            <tr>
                                <td><b>Điểm giao/đóng hàng</b></td>
                                <td>{{ booking.invoice.taskTransports.shipping_point }}: {{
                booking.invoice.taskTransports.shipping_point_request }}</td>
                                <td><b>Tổng hoàn ứng</b></td>
                                <td>
                                    <h3><span class="red bg">0</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Nơi hạ xuất/hạ rỗng</b></td>
                                <td>{{ booking.invoice.taskTransports.return_null_point }}: {{
                booking.invoice.taskTransports.return_null_point_request }}</td>
                                <td><b>Phí neo xe</b></td>
                                <td>
                                    <h3><span class="red bg">0</span></h3>
                                </td>
                            </tr>



                            <tr>
                                <td colspan="4">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i
                                            class="fa fa-info-circle"></i> Thông tin bảng giá</h3>
                                    <p class="blue2 italic">(Lịch sử áp dụng giá vận chuyển, lương tài xế, hoa hồng,...)
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td width="17%"><b>ID tuyến (ID giá)</b></td>
                                <td colspan="3"><b>{{ booking.route_id }}</b></td>
                            </tr>
                            <tr>
                                <td><b>Tuyến vận chuyển</b></td>
                                <td colspan="3">{{ booking.route.name }}</td>
                            </tr>
                            <tr>
                                <td><b>Người làm giá</b></td>
                                <td colspan="3">{{ booking.maker.name }} - {{ booking.maker.role }}</td>
                            </tr>
                            <tr>
                                <td><b>Ngày cập nhật giá</b></td>
                                <td colspan="3">2024-05-18 11:34:23</td>
                            </tr>
                            <tr>
                                <td><b>Ngày lập vận đơn</b></td>
                                <td colspan="3">{{ moment(booking.created_at).format('YYYY-MM-DD HH:mm:ss') }}</td>
                            </tr>
                            <tr>
                                <td><b>Lịch sử giá</b></td>
                                <td colspan="3">Lương cont cặp/kết hợp: <span class="red">0</span> - Lương chuyến: <span
                                        class="red">0</span> - Giá vốn: <span class="red">0</span> - Giá bán: <span
                                        class="red">0</span> - Hoa hồng: <span class="red">0</span></td>
                            </tr>

                            <tr>
                                <td colspan="4">
                                    <div class="filevd">
                                        <h3 style="font-size:16px;color:#000;padding:10px 0 0 0;clear:both"><i
                                                class="fa fa-camera"></i> Hình ảnh đính kèm</h3>
                                        <ul class="picslist">
                                            <VueLightbox :imgs="booking.invoice.images" :hideDelete="true">
                                            </VueLightbox>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <template v-if="booking.partner">
                    <div class="table table_scroll">
                        <h2 style="text-align:center;font-size:24px;padding:10px 0">Đối tác nhà xe ngoài</h2>
                        <table class="table1366" width="100%">
                            <tbody>
                                <tr>
                                    <td width="16%"><strong>Đối tác nhà xe</strong></td>
                                    <td>CÔNG TY CỔ PHẦN ĐẦU TƯ VẬN TẢI VÀ DỊCH VỤ XUẤT NHẬP KHẨU XUÂN TRƯỜNG</td>
                                </tr>
                                <tr>
                                    <td><strong>Người đại diện</strong></td>
                                    <td>Xuân Trường</td>
                                </tr>
                                <tr>
                                    <td><strong>Số điện thoại</strong></td>
                                    <td>0898096579</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table table_scroll">
                        <table width="100%" class="table1366">
                            <tbody>
                                <tr>
                                    <th width="2%">STT</th>
                                    <th width="2%">Mã lệnh</th>
                                    <th>Khách hàng</th>
                                    <th width="18%" align="left">Tuyến vận chuyển</th>
                                    <th width="6%">Ngày vận chuyển</th>
                                    <th width="6%">Số lượng Cont/Hàng</th>
                                    <th width="8%">Mã Cont</th>
                                    <th width="8%">Seal No</th>
                                    <th width="6%">Đơn giá vận chuyển</th>
                                    <th width="7%">Phí phát sinh (Thu khách)</th>
                                    <th width="5.5%">Neo xe</th>
                                    <th width="5.5%">Hoàn tất</th>
                                </tr>
                                <tr v-for="(item, i) in booking.invoice.command_mobiles">
                                    <td align="center">{{ i + 1 }}</td>
                                    <td align="center">{{ item.id }}</td>
                                    <td>{{ booking.customer.name }}</td>
                                    <td>{{ booking.route.name }}</td>
                                    <td>{{ moment(item.shipping_date).format('YYYY-MM-DD') }}</td>
                                    <td><span class="red bold">{{ item.quantity }}: {{ booking.invoice.cont_type
                                            }}</span></td>
                                    <td>{{ item.code }}</td>
                                    <td>{{ item.seal }}</td>
                                    <td class="red">3,900,000</td>
                                    <td class="red">1,350,000</td>
                                    <td class="red">0<br>(0)</td>
                                    <td align="center"><span class="green"><i class="fa fa-check-circle"
                                                style="font-size:1.2rem"></i><br><span style="font-size:11px">18-05-2024
                                                11:39:23</span></span></td>
                                </tr>
                                <tr>
                                    <td colspan="8" align="right">
                                        <h3>Tổng công phí phát sinh</h3>
                                    </td>
                                    <td class="red" align="left">
                                        <h3><span class="red bg">3,900,000</span></h3>
                                    </td>
                                    <td class="red" align="left">
                                        <h3><span class="red bg">1,350,000</span></h3>
                                    </td>
                                    <td colspan="4" class="red" align="left">
                                        <h3><span class="red bg">0</span></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="8" align="right">
                                        <h3>Tổng thanh toán</h3>
                                    </td>
                                    <td colspan="6" class="red" align="left">
                                        <h3><span class="red bg">5,250,000</span></h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                <template v-else>
                    <div class="table table_scroll">
                        <h2 style="text-align:center;font-size:24px;padding:10px 0">Danh sách lệnh điều động</h2>
                        <table class="table1366">
                            <tbody>
                                <tr>
                                    <th rowspan="2" width="2%">STT</th>
                                    <th rowspan="2" width="3%">Mã VĐ</th>
                                    <th rowspan="2" width="3%">Mã lệnh</th>
                                    <th rowspan="2" width="9%">Số booking</th>
                                    <th rowspan="2" width="9%">Số Cont</th>
                                    <th width="5%" rowspan="2">Số lượng</th>
                                    <th rowspan="2" width="9%">Tên tài xế</th>
                                    <th rowspan="2" width="6%">Biển số xe</th>
                                    <th rowspan="2" width="6%">Rơ mooc</th>
                                    <th rowspan="2" width="7%">Ngày vận chuyền</th>
                                    <th rowspan="2" width="4%">Cắt kéo</th>
                                    <th rowspan="2" width="4%">Lương chuyến</th>
                                    <th rowspan="2" width="5%">Tạm ứng</th>
                                    <th colspan="2" width="12%">Nội dung giả chi các loại phí</th>
                                </tr>
                                <tr>
                                    <th>Phí vận tải</th>
                                    <th>Phí neo xe</th>
                                </tr>
                                <tr v-for="(item, i) in booking.invoice.command_mobiles">
                                    <td align="center">{{ i + 1 }}</td>
                                    <td align="center">{{ booking.id }}</td>
                                    <td align="center">{{ item.id }}</td>
                                    <td>{{ booking.invoice.booking_code }}</td>
                                    <td>{{ getContCodes(item.conts) }}</td>
                                    <td align="center">{{ item.quantity }}: {{ booking.invoice.cont_type }}</td>
                                    <td>{{ booking.invoice.drivers ? booking.invoice.drivers : '' }}</td>
                                    <td></td>
                                    <td></td>
                                    <td>{{ moment(booking.invoice.time_transport).format('DD-MM-YYYY HH:mm') }}</td>
                                    <td align="center"><span class="green"><i class="fa fa-long-arrow-right"></i>
                                            (1)</span></td>
                                    <td class="red">{{ formatNumber(booking.invoice.driver_salary) }}</td>
                                    <td class="green">0</td>
                                    <td class="red">0</td>
                                    <td class="red">0</td>
                                </tr>
                                <tr>
                                    <td align="right" colspan="12">
                                        <h3>Tổng cộng</h3>
                                    </td>
                                    <td>
                                        <h3><span class="red bg">0</span></h3>
                                    </td>
                                    <td>
                                        <h3><span class="red bg">0</span></h3>
                                    </td>
                                    <td>
                                        <h3><span class="red bg">0</span></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" colspan="12">
                                        <h3>Tổng hoàn ứng</h3>
                                    </td>
                                    <td colspan="3">
                                        <h3><span class="red bg">0</span></h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                <div style="width:100%;float:left;padding:10px 0"></div>
                <button class="close_btn" @click="onClose" style="margin:0 auto;float:none"><i
                        class="fa fa-times-circle"></i> Đóng
                    lại</button>
            </div>
            <div v-else class="frm" id="cont_vd">
                <h1 class="red">Không tìm thấy vận đơn nào có mã: {{ search }}</h1>
            </div>
        </div>
    </div>
    <div class="screen screen2"></div>
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
import VueLightbox from "@/components/VueLightbox.vue";
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: ['data'],
    emits: ['close'],
    data: function () {
        return {
            search: null,
            booking: this.$props.data
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
        searchBooking: function () {
            this.$store.dispatch("getDetail", this.search).then((res) => {
                if (res.data.success) {
                    this.booking = res.data.data;
                } else {
                    this.booking = null;
                }
            });
        },
        getContCodes: function (conts) {
            let codes = [];
            conts.some((cont) => {
                codes.push(cont.code);
            });
            return codes.join(',');
        }
    },
    created: async function () {

    }
}
</script>
