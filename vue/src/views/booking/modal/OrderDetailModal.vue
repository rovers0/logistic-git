<template>
    <div class="popup popup_dh popup_center" style="">
        <div class="scroll">
            <span class="close_pop" @click="onClose">×</span>
            <div class="pophead">
                <h2>Lệnh điều động - Mã lệnh: <span class="red">{{ data.id }}</span></h2>
                <p>Màn hình xem chi tiết lệnh điều động, vui lòng kiểm trang thông tin chính xác!</p>
                <h3 v-if="data.status > 0" class="green"><i class="fa fa-check-circle"></i> Hoàn tất chuyến lúc: <span class="red">2024-05-20 16:46:59</span></h3>
            </div>
            <div class="table frm" style="width:100%">
                <table width="100%">
                    <tbody>
                        <tr style="background:#fff!important">
                            <td colspan="11">
                                <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-th-list"></i> Các loại chi phí theo lệnh</h3>
                            </td>
                        </tr>
                        <tr>
                            <th width="1%">STT</th>
                            <th width="18%">Tên loại phí</th>
                            <th width="10%">Số tiền thanh toán</th>
                            <th width="10%">Số tiền thu khách</th>
                            <th width="10%">Số hóa đơn</th>
                            <th width="10%">Ngày hóa đơn</th>
                            <th width="10%">Thu khách</th>
                            <th width="10%">Chi từ</th>
                            <th>Ghi chú</th>
                            <th width="1%">File</th>
                            <th width="1%">Chốt</th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr v-for="(incurred,i) in data?.incurreds">
                            <td align="center">{{ i+1 }}</td>
                            <td>{{ incurred.fee?.name }}</td>
                            <td class="red bold">{{ incurred.money || 0  }}</td>
                            <td class="red bold">{{ incurred.customer_money || 0  }}</td>
                            <td>{{ incurred.invoice_code  }}</td>
                            <td>{{ incurred.invoice_date  }}</td>
                            <td>{{FEE_COLLECT_TYPE[incurred.customer_collect]}}</td>
                            <td><b>Tài xế</b>:<br>
                                {{data.driver}}</td>
                            <td>{{ incurred.note  }}</td>
                            <td align="center">
                                <ul class="picslist">
                                    <VueLightbox :imgs="incurred.images" :hideDelete="true"></VueLightbox>
                                </ul>
                            </td>
                            <td align="center"><img src="/images/icons/check-1.png"></td>
                        </tr>
                    </tbody>
                    <tbody>
                                <tr>
                                    <td colspan="2">
                                        <h3 style="text-align:right">Tổng cộng</h3>
                                    </td>
                                    <td>
                                        <h3 class="red">{{ getTotalIncurred(data.incurreds) }}</h3>
                                    </td>
                                    <td colspan="9">
                                        <h3 class="red">{{ getTotalCustomerMoney(data.incurreds) }}</h3>
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="2" align="right"><b>Tài xế tạm ứng (1)</b></td>
                                    <td colspan="10"><b class="green">{{ data.advance_money }}</b></td>
                                </tr>

                                <tr>
                                    <td colspan="2" align="right"><b>Tài xế chi (2)</b></td>
                                    <td colspan="10"><b class="blue">{{ calculateTotalMoney(data.incurreds, 0, 0) }}</b></td>
                                </tr>

                                <tr>
                                    <td colspan="2" align="right"><b>Công ty chi (3)</b></td>
                                    <td colspan="10"><b class="blue">{{ calculateTotalMoney(data.incurreds, 0, 2) }}</b></td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="right"><b>Tổng chi (2)+(3)</b></td>
                                    <td colspan="10"><b class="green">{{ calculateTotalMoney(data.incurreds, 0, 0) + calculateTotalMoney(data.incurreds, 0, 2) }}</b></td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="right"><b>Tài xế hoàn ứng (1)-(2)</b></td>
                                    <td colspan="10"><b class="red"
                                            style="background:yellow;color:#f00;font-weight:bold;display:inline-block">{{ data.advance_money -  calculateTotalMoney(data.incurreds, 0, 0)}}</b>
                                    </td>
                                </tr>
                            </tbody>
                </table>

                <table>
                    <tbody>
                        <tr style="background:#fff!important">
                            <td colspan="4" align="center">
                                <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-usd"></i> Lương tài xế: <span class="green">{{data.driver}}</span></h3>
                            </td>
                        </tr>
                        <tr>
                            <td width="49.5%" align="right">
                                <h3>Lương theo chuyến</h3>
                            </td>
                            <td class="red bold">
                                <h3>{{ data.invoice.driver_salary }}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">
                                <h3>Tiền bồi dưỡng</h3>
                            </td>
                            <td class="red bold">
                                <h3>0</h3>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">
                                <h3>Lương neo xe</h3>
                            </td>
                            <td>
                                <h3><span class="red bold">0</span></h3>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">
                                <h3>Tổng lương chuyến</h3>
                            </td>
                            <td>
                                <h3><span class="red bold bg">0</span></h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table width="100%">
                    <tbody>
                        <tr style="background:#fff!important">
                            <td colspan="2">
                                <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-user"></i> Thông tin khách hàng</h3>
                            </td>
                        </tr>
                        <tr>
                            <td width="24%"><b>Khách hàng</b></td>
                            <td>{{ data?.customer?.short_name }}</td>
                        </tr>
                        <tr>
                            <td><b>Công ty/Đơn vị</b></td>
                            <td>{{ data?.customer?.name }}</td>
                        </tr>
                        <tr>
                            <td><b>Địa chỉ</b></td>
                            <td>{{ data?.customer?.address }}</td>
                        </tr>
                        <tr>
                            <td><b>Số điện thoại</b></td>
                            <td>{{ data?.customer?.phone }}</td>
                        </tr>
                        <tr style="background:#fff!important">
                            <td colspan="2">
                                <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-info-circle"></i> Thông tin lệnh điều động xe</h3>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Tuyến vận chuyển</b></td>
                            <td><span style="font-size:16px;font-weight:bold;color:green">{{ data?.route?.name }}</span></td>
                        </tr>
                        <tr>
                            <td><b>Ngày giờ vận chuyển</b></td>
                            <td>{{ moment(data?.invoice?.time_transport).format('YYYY-MM-DD HH:mm') }}</td>
                        </tr>
                        <tr>
                            <td><b>Ngày giờ cut-off</b></td>
                            <td>{{ moment(data?.invoice?.time_down_the_line).format('YYYY-MM-DD HH:mm') }}</td>
                        </tr>
                        <tr>
                            <td><b>Hãng tàu</b></td>
                            <td>
                                <p class="tips blue2"><i class="fa fa-ship"></i> {{ data?.invoice?.carrier.name }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Tên tài xế</b></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Đầu cái</b></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Rơmooc</b></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Mã Cont</b></td>
                            <td>{{ getContCodes(data?.conts) }}</td>
                        </tr>
                        <tr>
                            <td><b>Số Seal</b></td>
                            <td>{{ getContSeals(data?.conts) }}</td>
                        </tr>
                        <tr>
                            <td><b>Tạm ứng theo chuyến</b></td>
                            <td><b class="bold red">0</b></td>
                        </tr>
                        <tr>
                            <td><b>Tiền bồi dưỡng</b></td>
                            <td><b class="bold red">0</b></td>
                        </tr>
                        <tr>
                            <td><b>Lương theo chuyến</b></td>
                            <td><b class="bold red">{{ formatNumber(data?.invoice?.driver_salary) }}</b></td>
                        </tr>
                        <tr>
                            <td><b>Lương neo xe</b></td>
                            <td><b class="bold red">0</b></td>
                        </tr>
                        <tr>
                            <td><b>Tổng lương tài xế</b></td>
                            <td><b class="bold red">0</b></td>
                        </tr>
                        <tr>
                            <td><b>Số liên hệ khi đến</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <table width="100%">
                    <tbody>
                        <tr>
                            <th width="15%">Nhiệm vụ</th>
                            <th colspan="2">Số lượng cont</th>
                            <th width="20%">Vị Trí</th>
                            <th width="40%">Yêu Cầu</th>
                        </tr>
                        <tr>
                            <td>Lấy rỗng/Lấy cont hàng nhập</td>
                            <td rowspan="3" width="7%" align="center">
                                <div class="soluongcont"><span style="display:block;line-height:34px;font-size:16px;font-weight:bold;color:red;text-align:center">{{ data.quantity }}</span></div>
                            </td>
                            <td rowspan="3" align="center" width="7%"><span class="bold">{{ data?.invoice?.cont_type }}</span></td>
                            <td>{{ data?.invoice?.task_transports?.get_null_point }}</td>
                            <td>{{ data?.invoice?.task_transports?.get_null_point_request }}</td>
                        </tr>

                        <tr>
                            <td>Đóng hàng/Giao hàng</td>
                            <td>{{ data?.invoice?.task_transports?.shipping_point }}</td>
                            <td>{{ data?.invoice?.task_transports?.shipping_point_request }}</td>
                        </tr>
                        <tr>
                            <td>Cảng hạ chờ xuất/Trả rỗng</td>
                            <td>{{ data?.invoice?.task_transports?.return_null_point }}</td>
                            <td>{{ data?.invoice?.task_transports?.return_null_point_request }}</td>
                        </tr>
                    </tbody>
                </table>

                <table width="100%">
                    <tbody>
                        <tr style="background:#fff!important">
                            <td colspan="2">
                                <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-camera"></i> Hình ảnh cập nhật</h3>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                    <button type="button" @click="onClose" style="float:none;text-align: center;display: inline-block;" class="close_btn checked_tx"><i class="fa fa-times-circle"></i> Đóng lại</button>
                </div>
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
import { FEE_COLLECT_TYPE } from "@/components/Constants.vue";
</script>
<script>
export default {
    props: ['data'],
    emits: ['close'],
    data: function () {
        return {
            search: null,
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        formatNumber: function (number = 0) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getContCodes: function (conts = []) {
            let codes = [];
            conts.some((cont) => {
                codes.push(cont.code);
            });
            return codes.join(',');
        },
        getContSeals: function (conts = []) {
            let seals = [];
            conts.some((cont) => {
                seals.push(cont.seal);
            });
            return seals.join(',');
        },
        getTotalIncurred: function (incurreds) {
            let total = 0;
            if (incurreds.length > 0) {
                total = incurreds.reduce((n, { money }) => parseInt(n) + parseInt(money), 0);
            }
            return this.formatNumber(total);
        },
        getTotalCustomerMoney: function (incurreds) {
            let total = 0;
            if (incurreds.length > 0) {
                total = incurreds.reduce((n, { customer_money }) => parseInt(n) + parseInt(customer_money), 0);
            }
            return this.formatNumber(total);
        },
        calculateTotalMoney: function(data, isNoNeedConfirm, incurredFrom) {
            let totalMoney = 0;
            data.forEach(item => {
                if (item.is_no_need_confirm === isNoNeedConfirm && item.incurred_from === incurredFrom) {
                    totalMoney += item.money;
                }
            });
            return totalMoney;
        },
    },
    created: async function () {

    }
}
</script>
