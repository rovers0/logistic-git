<template>
    <div class="title">
        <h2>Vận đơn<span class="red"> - Tháng: {{ search.month }}-{{ search.year }}</span></h2>
    </div>
    <p class="msg">Quản lý thông tin Vận Đơn<b class="red"> - Tháng: {{ search.month }}-{{ search.year }}</b></p>
    <p class="green" style="text-align:center"><b><i class="fa fa-info-circle"></i> Mẹo:</b> Có thể tra cứu cùng lúc
        nhiều mã vận đơn. VD: 31,37,39</p>
    <div class="job_tools job_tools2">
        <!-- <a href="vandon/?q=&q3=&d=07-04-2024&d2=&kh=&m=&y=&act=&f=&nr=" title="Hôm trước">
        <i class="fa fa-chevron-left"></i></a>
        <a href="vandon/?q=&q3=&d=08-04-2024&d2=&kh=&m=&y=&act=&f=&nr=" title="Hôm nay">Hôm nay</a>
        <a href="vandon/?q=&q3=&d=09-04-2024&d2=&kh=&m=&y=&act=&f=&nr=" title="Hôm sau"><i class="fa fa-chevron-right"></i></a><a href="vandon/?q=&q3=&d=07-04-2024&d2=13-04-2024&kh=&m=&y=&act=&f=&nr=" title="Tuần này">Tuần này</a>
        <a href="vandon/?q=&q3=&d=31-03-2024&d2=06-04-2024&kh=&m=&y=&act=&f=&nr=" title="Tuần trước">Tuần trước</a> -->
        <a title="Tháng này" @click="buttonMonthSearch(moment().format('M'))">Tháng này</a>
        <a title="Tháng trước" @click="buttonMonthSearch(moment().subtract(1, 'months').format('M'))">Tháng trước</a>
        <span><i class="fa fa-check-circle"></i> Hiện có: <b class="red"><u>{{ bookings.meta?.total }}</u></b> vận
            đơn</span>
    </div>
    <div class="tools table_scroll">
        <div class="tools1366">
            <form enctype="multipart/form-data">
                <a href="javascript:void(0)" title="Tạo vận đơn" class="add" @click="openBookingAddModal"><i
                        class="fa fa-plus"></i> Tạo vận đơn</a>
                <input type="text" v-model="search.route_id" placeholder="ID tuyến" style="width:70px" />
                <input type="text" v-model="search.booking_id" placeholder="Mã VĐ" style="width:70px" />
                <input type="text" v-model="search.booking_code" placeholder="Booking" style="width:70px" />
                <Datepicker class="picker nvc hasDatepicker" v-model="search.date_from" placeholder="Từ ngày"
                    autocomplete="off" style="width:140px"></Datepicker>
                <Datepicker class="picker nvc hasDatepicker" v-model="search.date_to" placeholder="Đến ngày"
                    autocomplete="off" style="width:140px"></Datepicker>
                <select v-model="search.product_type" style="width:100px;float:left">
                    <option :value="null">Loại hàng</option>
                    <option value="1">Nhập</option>
                    <option value="2">Xuất</option>
                    <option value="3">Nội</option>
                </select>
                <select v-model="search.customer_id" style="width:120px;float:left" placeholder="">
                    <option :value="null">Khách hàng</option>
                    <option v-for="customer in master.customers" :value="customer.id">{{ customer.name }}</option>
                </select>
                <select v-model="search.month">
                    <option :value="null">Tháng</option>
                    <template v-for="i in 12">
                        <option v-if="i < 10" :value="i">Tháng {{ `0${i}` }}</option>
                        <option v-else :value="i">Tháng {{ i }}</option>
                    </template>
                </select>
                <select v-model="search.year">
                    <option :value="moment().subtract(1, 'year').format('YYYY')">{{ moment().subtract(1,
            'year').format('YYYY') }}
                    </option>
                    <option :value="moment().format('YYYY')">{{ moment().format('YYYY') }}</option>
                </select>
                <select v-model="search.quantity">
                    <option :value="null">Sản lượng</option>
                    <option value="0">Chưa duyệt</option>
                    <option value="1">Đã duyệt</option>
                </select>
                <select v-model="search.status">
                    <option :value="null">Tình trạng</option>
                    <option value="0">Chưa đóng</option>
                    <option value="1">Đã đóng</option>
                </select>
                <select v-model="search.limit" @change="loadData">
                    <option :value="null">Row(s)</option>
                    <option v-for="i in LIMIT" :value="i">{{ i }}</option>
                </select><button type="button" @click="loadData"><i class="fa fa-search"></i> Tra cứu</button><button
                    type="button" @click="refresh"><i class="fa fa-refresh"></i> Refresh</button>
            </form>
        </div>
    </div>
    <div class="js_status"></div>
    <div class="table table_head10 table_scroll">
        <form name="frmVD" id="frmVD" method="post" enctype="multipart/form-data">
            <table class="table1366" style="font-size:10px">
                <tr>
                    <th width="1%">STT</th>
                    <th width="5%">Mã VĐ</th>
                    <th width="9.5%">Số Booking/Bill<br /><i>(Bao gồm thư mục chứa file liên quan)</i></th>
                    <th width="5%">Ngày giờ vận chuyển</th>
                    <th width="5%">Ngày giờ cắt máng</th>
                    <th width="5%">Công nợ tháng</th>
                    <th width="8%">Khách hàng</th>
                    <th>Tuyến vận chuyển<br /> <i>(Quãng đường và thời gian di chuyển ước lượng, bản đồ)</i></th>
                    <th width="5%">Số lượng Cont/ĐVT</th>
                    <th width="1%">Loại hàng</th>
                    <th width="5%">Đơn giá</th>
                    <th width="7%">Phí vận chuyển<br /><i>(Bao gồm chi hộ)</i></th>
                    <th width="5%">Lệnh điều động</th>
                    <th width="1%">Hoàn<br />tất<br />Duyệt<br />lương</th>
                    <th width="1%">Đóng<br />Mở<br />vận<br />đơn</th>
                    <th width="4%">Người tạo</th>
                    <th width="1%">#</th>
                </tr>
                <tr v-for="(booking, i) in bookings.data">
                    <td align="center">{{ i + 1 }}</td>
                    <td align="center"><a href="javascript:void(0)" @click="openBookingDetailModal(booking.id)">{{
            booking.id }} <i class="fa fa-external-link"></i></a></td>
                    <td>
                        <p class="bold green">{{ booking.invoice.booking_code }}</p>
                        <p class="bold"
                            style="padding:5px 0 0 0;margin:5px 0 0 0;text-transform:uppercase;border-top:1px solid #e5e5e5;clear:both"
                            v-if="booking.invoice.images">
                            <i class="fa fa-camera">
                            </i> Hình ảnh đính kèm:
                        <ul class="picslist">
                            <VueLightbox :imgs="booking.invoice.images" :hideDelete="true"></VueLightbox>
                        </ul>
                        </p>
                    </td>
                    <td>{{ moment(booking.invoice.time_transport).format('DD-MM-YYYY') }}<br /> {{
            moment(booking.invoice.time_transport).format('HH:mm') }}</td>
                    <td>
                        <span>{{ moment(booking.invoice.time_down_the_line).format('DD-MM-YYYY') }}<br><span>{{
            moment(booking.invoice.time_down_the_line).format('HH:mm') }}</span></span>
                        <p class="tips blue2"><i class="fa fa-ship"></i> {{ booking.invoice.carrier.name }}</p>
                    </td>
                    <td>{{ moment().format('MM-YYYY') }}<a href="javascript:void(0)" title="Chuyển công nợ"
                            style="float:right"><img src="/images/icons/move.png" /></a></td>
                    <td>{{ booking.customer.name }}</td>
                    <td>
                        <p style="padding:0 0 5px 0">ID tuyến: <span class="red">{{ booking.route?.id }}</span> ({{
            FEE_TRANSPORT_TYPE[booking.fee_transport_type] }} - {{
            moment(booking.created_at).format('YYYY-MM-DD HH:mm:ss') }})</p> <span class="green">{{
            booking.route?.name }}</span>
                    </td>
                    <td>{{ booking.invoice.quantity }}: {{ booking.invoice.cont_type }}</td>
                    <td align="center">{{ PRODUCT_TYPE[booking.invoice.product_type] }}</td>
                    <td class="red">{{ formatNumber(booking.invoice.price) }}</td>
                    <td>
                        <p style="line-height:15px"><b>Cước vận chuyển:</b><br /><span class="red">{{
            formatNumber(booking.invoice.price) }}</span></p>
                        <p style="padding:5px 0;line-height:15px"><b>Phí chi hộ:</b><br /><span class="red">0</span></p>
                        <p style="padding:0 0 5px 0;line-height:15px"><b>Phí neo xe:</b><br /><span class="red">0</span>
                        </p>
                        <p style="line-height:15px"><b>Tổng:</b><br /><span class="red">{{
            formatNumber(booking.invoice.price) }}</span></p>
                    </td>
                    <td align="center"><a href="javascript:void(0)" @click="goOrder(booking.id)"
                            title="Danh sách lệnh đã tạo"><i class="fa fa-check-circle"></i> Xem ({{
            booking.invoice.command_mobiles.length }})</a></td>
                    <td align="center"><img src="/images/icons/check-0.png" title="Chưa được phép duyệt lương sản lượng"
                            style="opacity:0.2"></td>
                    <td align="center"><a href="javascript:void(0)" title="Đóng/mở lệnh"><img
                                :src="`/images/icons/check-${booking.invoice.status}.png`"></a></td>
                    <td align="center">{{ booking.maker.name }}<p style="font-size:9px" class="green">{{
            moment(booking.created_at).format('YYYY-MM-DD HH:mm:ss') }}</p>
                    </td>
                    <td align="center">
                        <div class="more"><span>•••</span>
                            <ul style="width:95px">
                                <li><a href="javascript:void(0)" class="" @click="openBookingEditModal(booking.id)"><i
                                            class="fa fa-pencil"></i> Edit</a></li>
                                <li><a href="javascript:void(0)" @click="openBookingDetailModal(booking.id)"><i
                                            class="fa fa-file-text"></i> Details</a></li>
                                <!-- <li><a href="javascript:void(0)"><i class="fa fa-clipboard"></i> Copy</a></li> -->
                                <li><a href="javascript:void(0)" class="red" @click="handleDelete(booking.id)"><i
                                            class="fa fa-trash"></i> Delete</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="12" align="right">
                        <h3>Tổng doanh số vận chuyển</h3>
                    </td>
                    <td colspan="7">
                        <h3><span class="red" style="width:85px;display:inline-block">{{
            formatNumber(bookings?.sumData?.page?.revenue || 0) }}</span> Cả tháng: <span
                                class="red bg">{{
            formatNumber(bookings?.sumData?.month?.revenue || 0) }}</span></h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="12" align="right">
                        <h3>Tổng phí chi hộ</h3>
                    </td>
                    <td colspan="7">
                        <h3><span class="red" style="width:85px;display:inline-block">{{
            formatNumber(bookings?.sumData?.page?.fee_collect || 0) }}</span> Cả tháng: <span
                                class="red bg">{{
            formatNumber(bookings?.sumData?.month?.fee_collect || 0) }}</span></h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="12" align="right">
                        <h3>Tổng phí neo xe</h3>
                    </td>
                    <td colspan="7">
                        <h3><span class="red" style="width:85px;display:inline-block">{{
            formatNumber(bookings?.sumData?.page?.fee_anchor || 0) }}</span> Cả tháng: <span
                                class="red bg">{{
            formatNumber(bookings?.sumData?.month?.fee_anchor || 0) }}</span>
                        </h3>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <div class="paging">
        <Pagination v-if="bookings.meta?.total" v-model="target_page" :page-count="bookings.meta?.last_page"
            :page-range="5" :margin-pages="0" :click-handler="clickCallback" :container-class="'pagination'"
            :page-class="'page-item'" :first-last-button="true"></Pagination>
    </div>
    <BookingAddModal v-if="showBookingAddModal" :data="master" @onSubmit="loadData" @close="closeBookingAddModal">
    </BookingAddModal>
    <BookingEditModal v-if="showBookingEditModal" :data="detailData" @onSubmit="loadData"
        @close="closeBookingEditModal">
    </BookingEditModal>
    <BookingDetailModal v-if="showBookingDetailModal" :data="detailData" @close="closeBookingDetailModal">
    </BookingDetailModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import VueLightbox from "@/components/VueLightbox.vue";
import BookingAddModal from './modal/BookingAddModal.vue';
import BookingEditModal from './modal/BookingEditModal.vue';
import BookingDetailModal from './modal/BookingDetailModal.vue';
import Pagination from "@/components/Pagination.vue";
import { FEE_TRANSPORT_TYPE, PRODUCT_TYPE, LIMIT } from "@/components/Constants.vue";
</script>
<script>
export default {
    data: function () {
        return {
            showBookingAddModal: false,
            showBookingEditModal: false,
            showBookingDetailModal: false,
            bookings: {},
            master: {},
            detailData: {},
            search: { ...this.$store.state.booking.search }
        }
    },
    mounted: function () {
        this.getMaster();
        this.loadData();
    },
    methods: {
        openBookingAddModal: function () {
            this.showBookingAddModal = true;
        },
        closeBookingAddModal: function () {
            this.showBookingAddModal = false;
        },
        openBookingEditModal: function (id) {
            this.$store.dispatch("getDetail", id).then((res) => {
                this.detailData.master = this.master;
                this.detailData.booking = res.data.data;
                this.showBookingEditModal = true;
            });
        },
        closeBookingEditModal: function () {
            this.showBookingEditModal = false;
        },
        openBookingDetailModal: function (id) {
            this.$store.dispatch("getDetail", id).then((res) => {
                this.detailData = res.data.data;
                this.showBookingDetailModal = true;
            });
        },
        closeBookingDetailModal: function () {
            this.showBookingDetailModal = false;
        },
        getMaster: function () {
            this.$store.dispatch("getMaster").then((res) => {
                console.log(res);
                this.master = res.data.data;
            });
        },
        loadData: function () {
            let data = this.search;
            this.$store.dispatch("getBooking", data).then((res) => {
                this.bookings = res.data.data;
            });
        },
        refresh: function () {
            this.search = {
                route_id: null,
                booking_id: null,
                booking_code: null,
                date_from: null,
                date_to: null,
                product_type: null,
                customer_id: null,
                year: moment().format('YYYY'),
                month: moment().format('M'),
                quantity: null,
                status: null,
                limit: null,
            };
            this.loadData();
        },
        buttonMonthSearch: function (month) {
            this.search = {
                ...this.search,
                month: month,
            };
            this.loadData();
        },
        handleDelete(id) {
            if (confirm("Bạn có chắc muốn xóa dòng này") == true) {
                this.$store.dispatch('deleteBooking', id).then((res) => {
                    if (res.data.success) {
                        this.loadData();
                    } else {
                        alert('Có lỗi xảy ra! Vui lòng thử lại sau.')
                    }
                });
            }
        },
        formatNumber: function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        goOrder: function (booking_id) {
            this.$router.push({ name: 'Order', query: { booking_id: booking_id } });
        }
    }
}
</script>
