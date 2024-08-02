<template>
    <div class="title">
        <h2>Lệnh điều động - <span class="red">Tháng: {{ search.month }}-{{ search.year }}</span></h2>
    </div>
    <p class="msg">Danh sách lệnh điều động và thông tin vận đơn</p>
    <p class="green" style="text-align:center"><b><i class="fa fa-info-circle"></i> Mẹo:</b> Có thể tra cứu cùng lúc nhiều mã lệnh hoặc mã vận đơn. VD: 31,37,39</p>
    <div class="job_tools job_tools2">
        <a href="javascript:void(0)" title="Xuất file" class="add" style="padding:0 7px;border:0;background:#D00;border:1px solid #D00;color:#fff"><i class="fa fa-file-excel-o"></i> Xuất D.Số xe</a>
        <a href="javascript:void(0)" title="Xuất file" class="add" style="padding:0 7px;border:0;background:#7a9d06;border:1px solid #7a9d06;color:#fff"><i class="fa fa-file-excel-o"></i> Xuất D.Số thực</a>
        <!-- <a href="lenh/?q=&q2=&macont=&q3=&xe=&idxe=&tx=&idtx=&d=15-05-2024&d2=&kh=&catcont=&m=&y=&f=&chot=&time=&nr=" title="Hôm trước"><i class="fa fa-chevron-left"></i></a>
        <a href="lenh/?q=&q2=&macont=&q3=&xe=&idxe=&tx=&idtx=&d=16-05-2024&d2=&kh=&catcont=&m=&y=&f=&chot=&time=&nr=" title="Hôm nay">Hôm nay</a><a href="lenh/?q=&q2=&macont=&q3=&xe=&idxe=&tx=&idtx=&d=17-05-2024&d2=&kh=&catcont=&m=&y=&f=&chot=&time=&nr=" title="Hôm sau"><i class="fa fa-chevron-right"></i></a>
        <a href="lenh/?q=&q2=&macont=&q3=&xe=&idxe=&tx=&idtx=&d=12-05-2024&d2=18-05-2024&kh=&catcont=&m=&y=&f=&chot=&time=&nr=" title="Tuần này">Tuần này</a><a href="lenh/?q=&q2=&macont=&q3=&xe=&idxe=&tx=&idtx=&d=05-05-2024&d2=11-05-2024&kh=&catcont=&m=&y=&f=&chot=&time=&nr=" title="Tuần trước">Tuần trước</a> -->
        <a title="Tháng này" @click="buttonMonthSearch(moment().format('M'))">Tháng này</a>
        <a title="Tháng trước" @click="buttonMonthSearch(moment().subtract(1, 'months').format('M'))">Tháng trước</a>
        <span><i class="fa fa-check-circle"></i> Tổng: <u class="red bold">{{ orders.meta?.total }}</u> lệnh</span></div>
    <div class="tools table_scroll">
        <div class="tools1366">
            <form name="frmSLenh" id="frmSLenh" action="./lenh/" method="get" enctype="multipart/form-data">
                <a href="./vandon#id_" title="Back"><i class="fa fa-arrow-circle-left"></i></a>
                <input type="text" v-model="search.command_id" placeholder="Mã lệnh" style="width:50px" />
                <input type="text" v-model="search.booking_id" placeholder="Mã VĐ" style="width:50px" />
                <input type="text" v-model="search.cont_code" placeholder="Mã cont" style="width:50px" />
                <input type="text" v-model="search.booking_code" placeholder="Booking" style="width:50px" />
                <input type="text" v-model="search.plate" id="biensoxe" onclick="return listXeSearch()" style="width:70px" placeholder="Biển số xe" maxlength="15" autocomplete="off" readonly>
                <input type="text" v-model="search.driver_id" id="tentaixe" onclick="return listTaiXeSearch()" style="width:70px" placeholder="Chọn tài xế" readonly>
                <Datepicker class="picker nvc hasDatepicker" v-model="search.date_from" placeholder="Từ ngày" autocomplete="off" style="width:140px"></Datepicker>
                <Datepicker class="picker nvc hasDatepicker" v-model="search.date_to" placeholder="Đến ngày" autocomplete="off" style="width:140px"></Datepicker>
                <select v-model="search.customer_id" placeholder="Khách hàng" style="width:100px;padding:0">
                    <option :value="null">Khách hàng</option>
                    <option v-for="customer in master.customers" :value="customer.id">{{ customer.name }}</option>
                </select>
                <select v-model="search.command_type">
                    <option :value="null">Loại lệnh</option>
                    <option value="1">Cắt kéo</option>
                    <option value="0">Thường</option>
                </select>
                <select v-model="search.month" id="m" style="width:80px;padding:0">
                    <option :value="null">Tháng</option>
                    <template v-for="i in 12">
                        <option v-if="i < 10" :value="i">Tháng {{ `0${i}` }}</option>
                        <option v-else :value="i">Tháng {{ i }}</option>
                    </template>
                </select>
                <select v-model="search.year" id="y" style="padding:0">
                    <option :value="moment().subtract(1, 'year').format('YYYY')">{{ moment().subtract(1, 'year').format('YYYY') }}</option>
                    <option :value="moment().format('YYYY')">{{ moment().format('YYYY') }}</option>
                </select>
                <select name="f" style="width:102px">
                    <option value="">Tình trạng</option>
                    <option value="0">Chưa hoàn tất</option>
                    <option value="1">Đã hoàn tất</option>
                </select>
                <select name="chot" style="padding:0">
                    <option value="">Chốt</option>
                    <option value="1">Xong</option>
                    <option value="0">Chưa</option>
                </select>
                <select name="time" style="padding:0">
                    <option value="">TG H.tất</option>
                    <option value="0_12">
                        < 12h</option>
                    <option value="12_24">12-24h</option>
                    <option value="24_48">24-48h</option>
                    <option value="48_0">> 48h</option>
                </select>
                <select v-model="search.limit" @change="loadData">
                    <option :value="null">Row(s)</option>
                    <option v-for="i in LIMIT" :value="i">{{ i }}</option>
                </select>
                <button type="button" @click="loadData"><i class="fa fa-search"></i></button>
                <button type="button" @click="refresh"><i class="fa fa-refresh"></i></button>
            </form>
        </div>
    </div>
    <div class="table table_scroll">
        <table style="font-size:10px" class="table1366">
            <tr>
                <th width="2%">STT</th>
                <th width="2%">Mã lệnh</th>
                <th width="2%">Mã VĐ</th>
                <th>Mã Booking</th>
                <th>Mã Cont</th>
                <th width="9%">Tên tài xế</th>
                <th width="4%">Biển số xe</th>
                <th width="4%">Số rơ mooc</th>
                <th width="5%">Ngày vận chuyển</th>
                <th width="3%">Số lượng Cont</th>
                <th width="12%">Tuyến chạy</th>
                <th width="1%">Loại hàng</th>
                <th width="4%">Tạm ứng</th>
                <th width="8%">Phí phát sinh<br /><i>(Chỉ những phí được chốt)</i></th>
                <th width="7%">Tổng lương chuyến</th>
                <th width="4.5%">Neo xe</th>
                <th width="5.5%">Hoàn tất chuyến</th>
                <th width="3%">Cắt cont</th>
                <th width="3%">Chốt lệnh</th>
                <th width="3%">Đơn giá</th>
                <th width="1%">#</th>
            </tr>
            <template v-for="(order,i) in orders.data">
                <tr>
                    <td align="center">{{ i+1 }}</td>
                    <td align="center"><a href="javascript:void(0)" @click="openDetailModal(order.id)" title="Xem chi tiết lệnh">{{ order.id }} <i class="fa fa-external-link"></i></a></td>
                    <td align="center"><a href="javascript:void(0)" @click="openBookingDetailModal(order.booking_id)">{{ order.booking_id }} <i class="fa fa-external-link"></i></a></td>
                    <td>{{ order.invoice.booking_code }}</td>
                    <td>{{ getContCodes(order.conts) }}</td>
                    <td> <i class="fa fa-check-circle blue"></i></td>
                    <td></td>
                    <td></td>
                    <td>{{ moment(order.invoice.time_transport).format('DD-MM-YYYY HH:mm') }} <p style="padding:4px 0 0 0"> <b>Cut off:</b><br /> {{ moment(order.invoice.time_down_the_line).format('DD-MM-YYYY HH:mm') }} </p>
                        <p class="tips blue2" style="padding:5px 0 0 0"><i class="fa fa-ship"></i> KMTC</p>
                    </td>
                    <td align="center"><b class="red">{{ order.quantity }}</b>: {{ order.invoice.cont_type }}</td>
                    <td>
                        <p style="font-size:9px;padding:0 0 5px 0">&bull; {{ order.customer.name }}</p>
                        <p style="padding:0 0 5px 0">&bull; ID tuyến: <span class="red">{{ order.route_id }}</span> ({{ FEE_TRANSPORT_TYPE[order.booking.fee_transport_type] }})</p>
                        <p class="green">{{ order.route.name }}</p>
                    </td>
                    <td align="center">{{ PRODUCT_TYPE[order.product_type] }}</td>
                    <td class="green">{{ order.advance_money }}</td>
                    <td class="red">
                        <template v-if="order.incurreds.length > 0">{{ getTotalIncurred(order.incurreds) }}<a v-if="order.status < 4" href="javascript:void(0)" @click="openAddIncurredModal(order.id)" title="Thêm thông tin giải chi" style="float:right"><i class="fa fa-plus"></i> Thêm</a> <p style="color:#006080;padding:4px 0 0 0;line-height:16px">&bull; Chốt lệnh: Nguyễn Thùy Chi (Kế toán)<br>&bull; Lúc: 2024-05-16 09:07:19</p></template>
                        <template v-else>0<a href="javascript:void(0)" @click="openAddIncurredModal(order.id)" title="Thêm thông tin giải chi" style="float:right"><i class="fa fa-plus"></i> Thêm</a></template>
                    </td>
                    <td class="red">{{ formatNumber(order.invoice.driver_salary) }}</td>
                    <td>
                        0<a href="javascript:void(0)" title="Thêm thông tin neo xe" style="float:right"><i class="fa fa-plus"></i></a>
                    </td>
                    <td align="center">
                        <template v-if="order.status == 0">
                            <img src="/images/icons/check-0.png" title="Chưa hoàn tất">
                            <a href="javascript:void(0)" title="Hủy lệnh" style="display:block"><i class="fa fa-minus-circle"></i> Hủy lệnh</a>
                        </template>
                        <template v-else><img src="/images/icons/check-1.png"><br>Trong 0 giờ</template>
                    </td>
                    <td align="center"><span class="green"><i class="fa fa-long-arrow-right"></i> (1)</span></td>
                    <td align="center"><a href="javascript:void(0)" title="Chốt lệnh/Mở lệnh"><img :src="`/images/icons/check-${order.status < 4 ? 0 : 1}.png`"></a></td>
                    <td align="center" class="red">{{ formatNumber(order.price) }}</td>
                    <td align="center">
                        <div class="more"><span>•••</span>
                            <ul style="width:90px">
                                <li><a href="javascript:void(0)" @click="openEditModal(order.id)" title="Sửa lệnh/Điều lệnh"><i class="fa fa-pencil"></i> Edit</a></li>
                                <li><a href="javascript:void(0)" @click="openDetailModal(order.id)" title="Xem chi tiết lệnh"><i class="fa fa-external-link"></i> Detail</a></li>
                                <li><a href="javascript:void(0)" title="In lệnh điều động"><i class="fa fa-print"></i> Print</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr style="background:#fff!important">
                    <td v-if="order.product_type == 1" colspan="21" style="padding:36px 0 20px 0">
                        <div class="timeline">
                            <div class="step_timeline" :class="order.status == 0 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status == 0 ? 'stltitle_no' : ''">Lấy cont hàng{{ order.statuses[0] ? `: ${getDateStatus(order.statuses[0].properties)}` : '' }}</div>
                                <div class="stepin" :class="order.status == 0 ? 'stepin_no' : ''" @click="order.statuses[0] ? openStepDetail(1,order.id) : openStep(1,order.id)"><i class="fa fa-check-circle"></i></div>
                            </div>
                            <div class="step_timeline" :class="order.status <= 1 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status <= 1 ? 'stltitle_no' : ''">Cắt mooc/Xuống hàng{{ order.statuses[1] ? `: ${getDateStatus(order.statuses[1].properties)}` : '' }}</div>
                                <div v-if="order.status > 0" class="stepin" :class="order.status <= 1 ? 'stepin_no' : ''" @click="order.statuses[1] ? openStepDetail(2,order.id) : openStep(2,order.id)"><i class="fa fa-check-circle"></i></div>
                                <div v-else class="stepin stepin_no"><i class="fa fa-check-circle"></i></div>
                            </div>
                            <div class="step_timeline" :class="order.status <= 2 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status <= 2 ? 'stltitle_no' : ''">Lấy cont rỗng đi hạ{{ order.statuses[2] ? `: ${getDateStatus(order.statuses[2].properties)}` : '' }}</div>
                                <div v-if="order.status > 1" class="stepin" :class="order.status <= 2 ? 'stepin_no' : ''" @click="order.statuses[2] ? openStepDetail(3,order.id) : openStep(3,order.id)"><i class="fa fa-check-circle"></i></div>
                                <div v-else class="stepin stepin_no"><i class="fa fa-check-circle"></i></div>
                            </div>
                            <div class="step_timeline" :class="order.status <= 3 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status <= 3 ? 'stltitle_no' : ''">Hạ bãi{{ order.statuses[3] ? `: ${getDateStatus(order.statuses[3].properties)}` : '' }}</div>
                                <div v-if="order.status > 2" class="stepin" :class="order.status <= 3 ? 'stepin_no' : ''" @click="order.statuses[3] ? openStepDetail(4,order.id) : openStep(4,order.id)"><i class="fa fa-check-circle"></i></div>
                                <div v-else class="stepin stepin_no"><i class="fa fa-check-circle"></i></div>
                            </div>
                        </div>
                    </td>
                    <td v-else-if="order.product_type == 2" colspan="21" style="padding:36px 0 20px 0">
                        <div class="timeline">
                            <div class="step_timeline" :class="order.status == 0 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status == 0 ? 'stltitle_no' : ''">Lấy rỗng{{ order.statuses[0] ? `: ${getDateStatus(order.statuses[0].properties)}` : '' }}</div>
                                <div class="stepin" :class="order.status == 0 ? 'stepin_no' : ''" @click="order.statuses[0] ? openStepDetail(5,order.id) : openStep(5,order.id)"><i class="fa fa-check-circle"></i></div>
                            </div>
                            <div class="step_timeline" :class="order.status <= 1 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status <= 1 ? 'stltitle_no' : ''">Cắt rỗng/Đóng hàng{{ order.statuses[1] ? `: ${getDateStatus(order.statuses[1].properties)}` : '' }}</div>
                                <div v-if="order.status > 0" class="stepin" :class="order.status <= 1 ? 'stepin_no' : ''" @click="order.statuses[1] ? openStepDetail(6,order.id) : openStep(6,order.id)"><i class="fa fa-check-circle"></i></div>
                                <div v-else class="stepin stepin_no"><i class="fa fa-check-circle"></i></div>
                            </div>
                            <div class="step_timeline" :class="order.status <= 2 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status <= 2 ? 'stltitle_no' : ''">Lấy cont hàng đi hạ{{ order.statuses[2] ? `: ${getDateStatus(order.statuses[2].properties)}` : '' }}</div>
                                <div v-if="order.status > 1" class="stepin" :class="order.status <= 2 ? 'stepin_no' : ''" @click="order.statuses[2] ? openStepDetail(7,order.id) : openStep(7,order.id)"><i class="fa fa-check-circle"></i></div>
                                <div v-else class="stepin stepin_no"><i class="fa fa-check-circle"></i></div>
                            </div>
                            <div class="step_timeline" :class="order.status <= 3 ? 'step_timeline_no' : ''">
                                <div class="stltitle" :class="order.status <= 3 ? 'stltitle_no' : ''">Hạ bãi{{ order.statuses[3] ? `: ${getDateStatus(order.statuses[3].properties)}` : '' }}</div>
                                <div v-if="order.status > 2" class="stepin" :class="order.status <= 3 ? 'stepin_no' : ''" @click="order.statuses[3] ? openStepDetail(8,order.id) : openStep(8,order.id)"><i class="fa fa-check-circle"></i></div>
                                <div v-else class="stepin stepin_no"><i class="fa fa-check-circle"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
            </template>
            <tr>
                <td colspan="12" align="right">
                    <h3>Tổng cộng</h3>
                </td>
                <td class="red">
                    <h3>{{ totalData.advance_money || 0 }}</h3>
                </td>
                <td class="red">
                    <h3>{{ totalData.incurreds || 0 }}</h3>
                </td>
                <td class="red">
                    <h3>{{ totalData.driver_salary || 0 }}</h3>
                </td>
                <td class="red"><h3>{{ totalData.anchor_vehicle || 0 }}</h3></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2">
                    <h3><span class="red bg">{{ totalData.price || 0 }}</span></h3>
                </td>
            </tr>
        </table>
    </div>
    <div class="paging">
        <Pagination v-if="orders.meta?.total" v-model="target_page" :page-count="orders.meta?.last_page" :page-range="5" :margin-pages="0" :click-handler="clickCallback" :container-class="'pagination'" :page-class="'page-item'" :first-last-button="true"></Pagination>
    </div>
    <OrderDetailModal v-if="showDetailModal" :data="detailData" @close="closeDetailModal"></OrderDetailModal>
    <OrderEditModal v-if="showEditModal" :data="detailData" :master="master" @close="closeEditModal" @onSubmit="loadData"></OrderEditModal>
    <StepModal v-if="showStep" :data="step" @close="closeStep" @onSubmit="loadData"></StepModal>
    <StepDetailModal v-if="showStepDetail" :data="stepDetail" @close="closeStepDetail"></StepDetailModal>
    <BookingDetailModal v-if="showBookingDetailModal" :data="detailBookingData" @close="closeBookingDetailModal"></BookingDetailModal>
    <AddIncurredModal v-if="showAddIncurredModal" :data="orderDetail" @close="closeAddIncurredModal" @onSubmit="loadData"></AddIncurredModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import OrderDetailModal from './modal/OrderDetailModal.vue';
import OrderEditModal from './modal/OrderEditModal.vue';
import StepModal from './modal/StepModal.vue';
import StepDetailModal from './modal/StepDetailModal.vue';
import BookingDetailModal from './modal/BookingDetailModal.vue';
import AddIncurredModal from './modal/AddIncurredModal.vue';
import Pagination from "@/components/Pagination.vue";
import { sumByKey } from '@/helper.js';
import { FEE_TRANSPORT_TYPE, PRODUCT_TYPE, LIMIT } from "@/components/Constants.vue";
</script>
<script>
export default {
    data: function () {
        return {
            showDetailModal: false,
            showEditModal: false,
            showStep: false,
            showStepDetail: false,
            showBookingDetailModal: false,
            showAddIncurredModal: false,
            totalData: [],
            orders: {},
            master: {},
            detailData: {},
            detailBookingData: {},
            search: { ...this.$store.state.order.search },
            step: {},
            stepDetail: {},
            orderDetail: {}
        }
    },
    mounted: function () {
        this.getMaster();
        this.loadData();
    },
    methods: {
        openDetailModal: function (id) {
            this.$store.dispatch("getOrderDetail", id).then((res) => {
                this.detailData = res.data.data;
                this.showDetailModal = true;
            });
        },
        closeDetailModal: function () {
            this.showDetailModal = false;
        },
        openEditModal: function (id) {
            this.$store.dispatch("getOrderDetail", id).then((res) => {
                this.detailData = res.data.data;
                this.showEditModal = true;
            });
        },
        closeEditModal: function () {
            this.showEditModal = false;
        },
        openStepDetail: function (step, id) {
            this.stepDetail.step = step;
            this.$store.dispatch("getOrderDetail", id).then((res) => {
                this.stepDetail.detail = res.data.data;
                this.showStepDetail = true;
            });
        },
        closeStepDetail: function () {
            this.showStepDetail = false;
        },
        openStep: function (step, id) {
            this.step.step = step;
            this.$store.dispatch("getOrderDetail", id).then((res) => {
                this.step.detail = res.data.data;
                this.showStep = true;
            });
        },
        closeStep: function () {
            this.showStep = false;
        },
        openBookingDetailModal: function (id) {
            this.$store.dispatch("getDetail", id).then((res) => {
                this.detailBookingData = res.data.data;
                this.showBookingDetailModal = true;
            });
        },
        closeBookingDetailModal: function () {
            this.showBookingDetailModal = false;
        },
        openAddIncurredModal: function (id) {
            this.$store.dispatch("getOrderDetail", id).then((res) => {
                this.orderDetail = res.data.data;
                this.showAddIncurredModal = true;
            });
        },
        closeAddIncurredModal: function () {
            this.showAddIncurredModal = false;
        },
        getMaster: function () {
            this.$store.dispatch("getMaster").then((res) => {
                this.master = res.data.data;
            });
        },
        loadData: function () {
            if (this.$route.query.booking_id) {
                this.search.booking_id = this.$route.query.booking_id;
            }
            let data = this.search;
            this.$store.dispatch("getOrders", data).then((res) => {
                this.orders = res.data.data;
                if(this.orders.data) {
                    this.totalData = this.sumByKey(this.orders.data, ['advance_money', 'anchor_vehicle', 'price', 'driver_salary', 'money']);
                }
            });
        },
        refresh: function () {
            this.search = {
                command_id: null,
                booking_id: null,
                booking_code: null,
                cont_code: null,
                plate: null,
                driver_id: null,
                date_from: null,
                date_to: null,
                command_type: null,
                customer_id: null,
                year: moment().format('YYYY'),
                month: moment().format('M'),
                status: null,
                limit: null,
            };
            this.loadData();
        },
        formatNumber: function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getContCodes: function (conts) {
            let codes = [];
            conts.some((cont) => {
                codes.push(cont.code);
            });
            return codes.join(',');
        },
        getTotalIncurred: function (incurreds) {
            let total = 0;
            if (incurreds.length > 0) {
                total = this.formatNumber(incurreds.reduce((n, {money}) => n + money, 0));
            }
            return total;
        },
        getDateStatus: function (properties) {
            properties = JSON.parse(properties);
            return properties.time;
        },
        buttonMonthSearch: function (month) {
            this.search = {
                ...this.search,
                month: month,
            };
            this.loadData();
        },
        sumByKey: function (data, list) {
            const totals = {};

            for (const item of data) {
                for (const key in item) {
                    if (typeof item[key] === 'number' && list.includes(key)) {
                        if (!totals.hasOwnProperty(key)) {
                            totals[key] = 0;
                        }
                        totals[key] += item[key];
                    }
                    if (key === 'incurreds') {
                        if (!totals.hasOwnProperty(key)) {
                            totals['incurreds'] = 0;
                        }
                        const incurreds = sumByKey(item[key], list);
                        totals['incurreds'] += incurreds.money || 0;
                    }
                    if (key === 'invoice') {
                        if (!totals.hasOwnProperty('driver_salary')) {
                            totals['driver_salary'] = 0;
                        }
                        const invoice = sumByKey([item[key]], list);
                        totals['driver_salary'] += invoice.driver_salary || 0;
                    }
                }
            }

            return totals;
        }
    }
}
</script>
