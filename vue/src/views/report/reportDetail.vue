<template>
    <div class="title">
        <h2>Báo cáo kết quả kinh doanh <span class="red"> - Tháng {{search.month}}-{{search.year}}</span>
        </h2>
    </div>
    <p class="msg">Tra cứu thông tin tài chính, kết quả kinh doanh và doanh thu</p>
    <div class="tools table_scroll">
        <div class="tools1366">
            <a href="./report/" title="Back">
                <i class="fa fa-arrow-circle-left"></i> Back </a>
            <a href="javascript:void(0)" title="Xuất Excel">
                <i class="fa fa-file-excel-o"></i> Xuất Excel </a>
        </div>
    </div>
    <div class="table table_scroll">
        <table class="table800" v-if="data.fee_activities">
            <tbody>
                <tr>
                    <th width="3%">STT</th>
                    <th width="35%">Tháng {{search.month}}-{{search.year}}</th>
                    <th>Chi phí</th>
                    <th>Chiểm tỉ lệ (%) Tổng chi phí hoạt động</th>
                </tr>
                <tr>
                    <td colspan="4" align="center">
                        <h2>Phí cố định</h2>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <h3>Tổng phí cố định</h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{ data.fee_permanent.total }}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{ data.fee_permanent.percent }}%</span>
                        </h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" align="center">
                        <h2>Chi phí hoạt động</h2>
                    </td>
                </tr>
                <tr style="background:#e8f8ff">
                    <td align="center">1</td>
                    <td>
                        <a href="javascript:void(0)">Lương nhân sự công ty</a>
                    </td>
                    <td>{{ data.fee_activities.salary_hr.total }}</td>
                    <td>{{ data.fee_activities.salary_hr.percent }}%</td>
                </tr>
                <tr style="background:#e8f8ff">
                    <td align="center">2</td>
                    <td>
                        <a href="javascript:void(0)">Lương tài xế</a>
                    </td>
                    <td>{{ data.fee_activities.salary_driver.total }}</td>
                    <td>{{ data.fee_activities.salary_driver.percent }}%</td>
                </tr>
                <tr style="background:#e8f8ff">
                    <td align="center">3</td>
                    <td>Tổng giải chi phí vận tải (từ lệnh điều động, hàng rời)</td>
                    <td>{{ data.fee_activities.total_fee_transport.total }}</td>
                    <td>{{ data.fee_activities.total_fee_transport.percent }}%</td>
                </tr>
                <tr style="background:#e8f8ff">
                    <td align="center">4</td>
                    <td>
                        <a href="javascript:void(0)">Tổng phí nhiên liệu (dầu)</a>
                    </td>
                    <td>{{ data.fee_activities.total_fee_fuel.total }}</td>
                    <td>{{ data.fee_activities.total_fee_fuel.percent }}%</td>
                </tr>
                <tr style="background:#e8f8ff">
                    <td align="center">5</td>
                    <td>
                        <a href="javascript:void(0)">Tổng xuất kho sản phẩm (nhớt, lốp, phụ tùng,... bao gồm phí phát sinh)</a>
                    </td>
                    <td>{{ data.fee_activities.total_fee_warehouse.total }}</td>
                    <td>{{ data.fee_activities.total_fee_warehouse.percent }}%</td>
                </tr>
                <tr style="background:#e8f8ff">
                    <td align="center">6</td>
                    <td>
                        <a href="javascript:void(0)">Phí sửa chữa - Bảo dưỡng (phí phát sinh từ đề xuất sửa chữa)</a>
                    </td>
                    <td>{{ data.fee_activities.total_fee_suggestion.total }}</td>
                    <td>{{ data.fee_activities.total_fee_suggestion.percent }}%</td>
                </tr>
                <tr style="background:#e8f8ff">
                    <td align="center">7</td>
                    <td>
                        <a href="javascript:void(0)">Phí sửa chữa vặt</a>
                    </td>
                    <td>{{ data.fee_activities.total_fee_some.total }}</td>
                    <td>{{ data.fee_activities.total_fee_some.percent }}%</td>
                </tr>
                <tr style="background:#fff9e8">
                    <td align="center">8</td>
                    <td>Tiền Thanh toán dầu DO</td>
                    <td>{{ data.fee_activities.pay_do.total }}</td>
                    <td>{{ data.fee_activities.pay_do.percent }}%</td>
                </tr>
                <tr style="background:#fff9e8">
                    <td align="center">9</td>
                    <td>Lương và thưởng ngày lễ, ngày tết</td>
                    <td>{{ data.fee_activities.holiday.total }}</td>
                    <td class="green">{{ data.fee_activities.holiday.percent }}%</td>
                </tr>
                <tr style="background:#fff9e8">
                    <td align="center">10</td>
                    <td>Phí mạng viễn thông</td>
                    <td>{{ data.fee_activities.telecommunication.total }}</td>
                    <td class="green">{{ data.fee_activities.telecommunication.percent }}%</td>
                </tr>
                <tr style="background:#fff9e8">
                    <td align="center">11</td>
                    <td>Phí thuê văn phòng</td>
                    <td>{{ data.fee_activities.office.total }}</td>
                    <td class="green">{{ data.fee_activities.office.percent }}%</td>
                </tr>
                <tr style="background:#fff9e8">
                    <td align="center">12</td>
                    <td>Phí điện thoại</td>
                    <td>{{ data.fee_activities.mobile.total }}</td>
                    <td class="green">{{ data.fee_activities.mobile.percent }}%</td>
                </tr>
                <tr style="background:#fff9e8">
                    <td align="center">13</td>
                    <td>Tiền điện văn phòng</td>
                    <td>{{ data.fee_activities.electrical.total }}</td>
                    <td class="green">{{ data.fee_activities.electrical.percent }}%</td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <h3>Tổng chi <span class="red">(1)</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{ data.fee_activities.total_all.total }}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{ data.fee_activities.total_all.percent }}%</span>
                        </h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <h3>Phí vận chuyển xe ngoài <span class="red">(2)</span>
                        </h3>
                    </td>
                    <td>
                        <h3>{{ data.fee_activities.total_outsize_all.total }}</h3>
                    </td>
                    <td>{{ data.fee_activities.total_outsize_all.total }}%</td>
                </tr>
                <tr>
                    <td colspan="4" align="center">
                        <h2>Doanh thu - Phí vận chuyển</h2>
                    </td>
                </tr>
                <tr style="background:#d0f5c3">
                    <td align="center">1</td>
                    <td>
                        <a href="javascript:void(0)">Tổng phí vận chuyển hàng cont (xe nhà) <span class="red">(3)</span>
                        </a>
                    </td>
                    <td>{{ data.revenue.total_fee_transport_cont_inside }}</td>
                    <td>&nbsp;</td>
                </tr>
                <tr style="background:#d0f5c3">
                    <td align="center">1</td>
                    <td>
                        <a href="javascript:void(0)">Tổng phí vận chuyển hàng rời <span class="red">(4)</span>
                        </a>
                    </td>
                    <td>{{ data.revenue.total_fee_transport_bulk }}</td>
                    <td>&nbsp;</td>
                </tr>
                <tr style="background:#d0f5c3">
                    <td align="center">2</td>
                    <td>
                        <a href="javascript:void(0)">Doanh thu xe ngoài <span class="red">(5)</span>
                        </a>
                    </td>
                    <td>{{ data.revenue.total_revenue_outside }}</td>
                    <td>&nbsp;</td>
                </tr>
                <tr style="background:#aadce2">
                    <td align="center">2</td>
                    <td>Thu công nợ hàng cont</td>
                    <td>{{ data.revenue.total_revenue_debts_cont }}</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <h3>Tổng phí vận chuyển (bao gồm xe ngoài)</h3>
                        <p class="red">(2)+(3)+(4)</p>
                    </td>
                    <td>
                        <h3 class="red">{{ data.revenue.total_total_fee_transport_cont_inside_outside }}</h3>
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <h3>Tổng doanh thu <span class="red">(6)</span>
                        </h3>
                        <p class="red">(3)+(5)</p>
                    </td>
                    <td>
                        <h3 class="green">{{ data.revenue.total_revenue }}</h3>
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td align="right" colspan="2">
                        <h3 class="blue">Tổng chi phí hoạt động <span class="red">(7)</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red bg">{{ data.revenue.total_fee }}</span>
                        </h3>
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td align="right" colspan="2">
                        <h3 class="blue">Tổng lợi nhuận</h3>
                        <p class="red">(6)-(7)</p>
                    </td>
                    <td colspan="3">
                        <h3>
                            <span class="red bg">{{ data.revenue.total_profit }}</span>
                        </h3>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import { useRoute } from 'vue-router'
import { formatNumber } from '@/helper.js';
</script>
<script>
export default {
    data: function () {
        const route = useRoute();
        const year = route.params.year;
        const month = route.params.month;
        return {
            resultYear: moment().format('YYYY'),
            master: [],
            search: {
                year: year || moment().format('YYYY'),
                month: month || moment().format('M'),
            },
            data: []
        }
    },
    computed: {
        years() {
            const currentYear = moment().year();
            return Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2021 + i);
        },
    },
    mounted: function () {
        this.getData();
        this.getMaster();
    },
    methods: {
        getData: function () {
            let payload = this.search;
            this.$store.dispatch("getReportDetail", payload).then((res) => {
                this.data = res.data.data;
                this.resultYear = this.search.year;
            });
        },
        getMaster: function () {
            this.$store.dispatch("getReportMaster").then((res) => {
                this.master = res.data.data;
            });
        },
        resetSearch: function () {
            this.search = {
                year: moment().format('YYYY'),
            };
            this.getData();
        },
    }
}
</script>
