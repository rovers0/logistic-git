<template>
    <div class="popup popup_dh">
        <div class="scroll">
            <span class="close_pop" @click="onClose">×</span>
            <div class="pophead">
                <h2>Thông tin giải chi - Mã lệnh: <span class="red">{{ data.id }}</span></h2>
                <p>Màn hình xem chi tiết lệnh điều động, vui lòng kiểm trang thông tin chính xác!</p>
            </div>
            <div class="table frm" style="width:100%">
                <form method="post" enctype="multipart/form-data">
                    <div class="table_scroll">
                        <table class="table800">
                            <tbody>
                                <tr>
                                    <th width="1%">#</th>
                                    <th width="15%">Tên loại phí</th>
                                    <th width="9%">Số tiền thanh toán</th>
                                    <th width="9%">Số tiền thu khách</th>
                                    <th width="9%">Số hóa đơn</th>
                                    <th width="10%">Ngày hóa đơn</th>
                                    <th width="10%">Thu khách <span class="red bold" style="cursor:pointer"
                                            title="Lưu vào công nợ hoặc tách thu riêng">(?)</span></th>
                                    <th width="10%">Chi từ</th>
                                    <th>Ghi chú</th>
                                    <th width="1%">File</th>
                                    <th width="1%">Chốt</th>
                                    <th width="1%">#</th>
                                </tr>
                            </tbody>
                            <tbody class="body_step">
                                <tr v-for="(incurred, i) in data.incurreds" class="row_point">
                                    <td align="center"><b>{{ i + 1 }}</b></td>
                                    <td>
                                        <input type="text" @click="openSelectFeeModal(i)" v-model="incurred.fee.name"
                                            placeholder="Chọn loại phí" required="" class="readonly" readonly="">
                                        <p class="red" v-if="errs.fee_id && errs.fee_id[i]">{{ errs.fee_id[i] }}</p>
                                    </td>
                                    <td>
                                        <input type="text" data-type="currency" placeholder="VD: 400,000" required="" v-model="incurred.money">
                                        <p class="red" v-if="errs.money && errs.money[i]">{{ errs.money[i] }}</p>
                                    </td>
                                    <td><input type="text" data-type="currency" placeholder="VD: 500,000" required=""
                                            v-model="incurred.customer_money">
                                    </td>
                                    <td><input type="text" placeholder="Số hóa đơn" title="Số hóa đơn/chứng từ"
                                            style="width:97%" maxlength="50" v-model="incurred.invoice_code"> </td>
                                    <td>
                                        <Datepicker class="picker nvc hasDatepicker" v-model="incurred.invoice_date"
                                            placeholder="Chọn ngày" style="width:100%"></Datepicker>
                                        <p class="red" v-if="errs.invoice_date && errs.invoice_date[i]">{{ errs.invoice_date[i] }}</p>
                                    </td>
                                    <td>
                                        <select v-model="incurred.customer_collect" style="width:100%" required="">
                                            <option value="">Thu khách?</option>
                                            <option value="0">Không thu</option>
                                            <option value="1">Lưu công nợ</option>
                                            <option value="2">Thu riêng</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select v-model="incurred.incurred_from" style="width:100%">
                                            <option value="0">Tài xế chi (Từ quỹ tạm ứng)</option>
                                            <option value="1" selected="selected">Nhân sự chi (Từ quỹ tạm ứng)</option>
                                            <option value="2">Công ty chi (Phí công ty thanh toán)</option>
                                        </select>
                                    </td>
                                    <td><input type="text" v-model="incurred.note" placeholder="Nếu có..."></td>
                                    <td align="center">
                                        <div class="filehid"> <input type="file" @change="getImageUpload(i, $event)" :id="`img_file_` + i"
                                                accept="image/*;capture=camera" title="Upload hình ảnh hóa đơn"> <i
                                                class="fa fa-camera"></i></div>
                                        <div :class="'view_pics_' + i" :id="'view_pics_' + i"></div>
                                        <ul class="picslist">
                                            <VueLightbox :imgs="incurred.images" :hideDelete="true"></VueLightbox>
                                        </ul>
                                    </td>
                                    <td align="center">
                                        <input type="checkbox" @click="confirmIncurred(incurred)" :checked="incurred.is_no_need_confirm == 1" />
                                    </td>
                                    <td align="center"><a href="javascript:void(0);" @click="removeRow(i)" class="trash"
                                            style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td>
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
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td align="center" colspan="8" style="background:#fff">
                                    <a href="javascript:void(0)" @click="addRow" style="background:#558000;border:0"
                                        title="Thêm dòng" class="aplus add"><i class="fa fa-plus"></i> Thêm dòng</a>
                                    <p>Thêm thông tin các loại chi phí giải chi (nếu có)</p>
                                    <button @click="save" type="button"
                                        style="display:inline-block;float:none;margin:10px auto"><i
                                            class="fa fa-floppy-o"></i> Lưu thông tin</button>
                                    <button type="button" @click="onClose"
                                        style="float:none;text-align: center;display: inline-block;"
                                        class="close_btn checked_tx"><i class="fa fa-times-circle"></i> Đóng
                                        lại</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table width="100%">
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-user"></i> Thông
                                        tin khách hàng</h3>
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
                                    <h3 style="font-size:16px;color:#000;padding:4px 0"><i
                                            class="fa fa-info-circle"></i> Thông tin lệnh điều động xe</h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Tuyến vận chuyển</b></td>
                                <td><span style="font-size:16px;font-weight:bold;color:green">{{ data.route.name
                                        }}</span></td>
                            </tr>
                            <tr>
                                <td width="24%"><b>Ngày giờ vận chuyển</b></td>
                                <td>{{ moment(data.invoice.time_transport).format('DD-MM-YYYY HH:mm') }}</td>
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
                                <td>{{ getContCodes(data.conts) }}</td>
                            </tr>
                            <tr>
                                <td><b>Số Seal</b></td>
                                <td>{{ getContSeals(data.conts) }}</td>
                            </tr>
                            <tr>
                                <td><b>Tạm ứng</b></td>
                                <td><b class="bold red">0</b></td>
                            </tr>
                            <tr>
                                <td><b>Lương tài xế</b></td>
                                <td><b class="bold red">{{ formatNumber(data.invoice.driver_salary) }}</b></td>
                            </tr>
                            <tr>
                                <td><b>Tiền bồi dưỡng (nếu có)</b></td>
                                <td><input type="text" name="tienboiduong" v-model="bonusDriverMoney" value=""
                                        data-type="currency" class="bold red" style="width:50%"
                                        placeholder="VD: 300,000"></td>
                            </tr>
                            <tr>
                                <td><b>Số liên hệ khi đến</b></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="table_scroll">
                        <table width="100%" class="table800">
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
                                        <div class="soluongcont"><span
                                                style="display:block;line-height:34px;font-size:16px;font-weight:bold;color:red;text-align:center">{{
                data.quantity }}</span></div>

                                    </td>
                                    <td rowspan="3" align="center" width="7%">
                                        <span class="bold">{{ data.invoice.cont_type }}</span>
                                    </td>
                                    <td>{{ data.invoice.task_transports.get_null_point }}</td>
                                    <td>{{ data.invoice.task_transports.get_null_point_request }}</td>
                                </tr>
                                <tr>
                                    <td>Đóng hàng/Giao hàng</td>
                                    <td>{{ data.invoice.task_transports.shipping_point }}</td>
                                    <td>{{ data.invoice.task_transports.shipping_point_request }}</td>
                                </tr>
                                <tr>
                                    <td>Cảng hạ chờ xuất/Trả rỗng</td>
                                    <td>{{ data.invoice.task_transports.return_null_point }}</td>
                                    <td>{{ data.invoice.task_transports.return_null_point_request }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="screen screen2"></div>
    <SelectFeeModal v-if="showSelectFeeModal" :data="fees" @onSubmit="setFees" @close="closeSelectFeeModal">
    </SelectFeeModal>
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
import SelectFeeModal from './SelectFeeModal.vue';
import VueLightbox from "@/components/VueLightbox.vue";
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: ['data'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            order: {},
            images: {},
            showSelectFeeModal: false,
            fees: {},
            selectedFee: 0,
            bonusDriverMoney: this.$props.data.bonus_driver_money || 0,
            errs: {}
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
        getImageUpload: function (index, e) {
            previewFeeImg(e, index);
            if (e.target.files) {
                this.images[index] = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    this.images[index].push(e.target.files[i]);
                }
            }
        },
        getContCodes: function (conts) {
            let codes = [];
            conts.some((cont) => {
                codes.push(cont.code);
            });
            return codes.join(',');
        },
        getContSeals: function (conts) {
            let seals = [];
            conts.some((cont) => {
                seals.push(cont.seal);
            });
            return seals.join(',');
        },
        addRow: function () {
            this.$props.data.incurreds.push({
                id: 0,
                money: "1234",
                customer_money: "4321",
                fee: { name: "" },
                fee_id: 0,
                note: "",
                invoice_date: "",
                invoice_code: "",
                incurred_from: 0,
                customer_collect: 0,
                is_no_need_confirm: 0,
                images: [],
            });
        },
        save: function () {
            const formData = new FormData();
            this.$props.data.incurreds.forEach((incurred, index) => {
                formData.append(`incurreds[${index}][id]`, incurred.id || 0);
                formData.append(`incurreds[${index}][money]`, incurred.money);
                formData.append(`incurreds[${index}][customer_money]`, incurred.customer_money);
                formData.append(`incurreds[${index}][invoice_code]`, incurred.invoice_code);
                incurred.fee_id ? formData.append(`incurreds[${index}][fee_id]`, incurred.fee_id) : null;
                incurred.invoice_date ? formData.append(`incurreds[${index}][invoice_date]`, moment(incurred.invoice_date).format('YYYY-MM-DD')) : null;
                formData.append(`incurreds[${index}][customer_collect]`, incurred.customer_collect);
                formData.append(`incurreds[${index}][incurred_from]`, incurred.incurred_from);
                formData.append(`incurreds[${index}][note]`, incurred.note);
                formData.append(`incurreds[${index}][is_no_need_confirm]`, incurred.is_no_need_confirm);

                if (this.images[index]) {
                    this.images[index].forEach((image, imageIndex) => {
                        formData.append(`incurreds[${index}][images][]`, image);
                    });
                }
            });

            formData.append(`bonus_driver_money`, this.bonusDriverMoney);

            this.$store.dispatch("updateIncurred", { id: this.$props.data.id, data: formData }).then((res) => {
                if (res.data.success) {
                    this.$emit('onSubmit');
                    this.onClose();
                } else {
                    this.errs = res.data.message;
                    console.log(this.errs.money[1]);
                }
            });
        },
        removeRow: function (index) {
            if (this.$props.data.incurreds[index].id) {
                if (confirm("Thao tác xóa không thể hoàn tác! Bạn chắc chắn?") == true) {
                    this.$store.dispatch("deleteIncurred", {
                        id: this.$props.data.id,
                        incurred: this.$props.data.incurreds[index].id
                    }).then((res) => {
                        if (res.status)
                            this.$props.data.incurreds.splice(index, 1);
                        else alert('Xóa không thành công!')
                    })
                }
            } else {
                this.$props.data.incurreds.splice(index, 1)
            }

        },
        openSelectFeeModal: function (index) {
            this.selectedFee = index;
            this.$store.dispatch("getFees").then((res) => {
                this.fees = res.data.data;
                this.showSelectFeeModal = true;
            });
        },
        closeSelectFeeModal: function () {
            this.showSelectFeeModal = false;
        },
        setFees: function (fees) {
            console.log(fees.id);
            this.$props.data.incurreds[this.selectedFee].fee_id = fees.id;
            this.$props.data.incurreds[this.selectedFee].fee.name = fees.name;
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
        confirmIncurred: function (incurred) {
            incurred.is_no_need_confirm = incurred.is_no_need_confirm == 1 ? 0 : 1;
        }
    },
    created: async function () {

    }
}
</script>
