<template>
    <div class="title">
        <h2>Báo cáo kết quả kinh doanh <span class="red"> - Năm {{ resultYear }}</span>
        </h2>
    </div>
    <p class="msg">Tra cứu thông tin tài chính, kết quả kinh doanh và doanh thu</p>
    <div class="tools table_scroll">
        <div class="tools1366">
            <select name="y" id="y" required="" v-model="search.year">
                <option value="" disabled>Năm</option>
                <option v-for="year in years" :key="year">{{ year }}</option>
            </select>
            <button type="submit" @click="getData">
                <i class="fa fa-search"></i> Tra cứu </button>
            <button href="./baocao/" title="Làm mới" @click="resetSearch">
                <i class="fa fa-refresh"></i> Refresh </button>
        </div>
    </div>
    <div class="table table_scroll">
        <table class="table1366 tbreport tablesorter tablesorter-default tablesorter8c51868060b73" role="grid">
            <thead>
                <tr role="row" class="tablesorter-headerRow">
                    <th class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Tháng, năm: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Tháng, năm</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="1" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Doanh thu vận chuyển(Xe nhà) (1): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Doanh thu vận chuyển <br>
                            <i>(Xe nhà)</i>
                            <i class="red">(1)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Doanh thu xe ngoài(Doanh thu từ chênh lệch giá) (2): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Doanh thu xe ngoài <br>
                            <i>(Doanh thu từ chênh lệch giá)</i>
                            <i class="red">(2)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Lương nhân sự: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Lương nhân sự</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Lương tài xế: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Lương tài xế</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Tổng chi phí hoạt động(3): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Tổng chi phí hoạt động <br>
                            <i class="red">(3)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Tổng lợi nhuận(1)+(2)-(3): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Tổng lợi nhuận <br>
                            <i class="red">(1)+(2)-(3)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="VAT đầu vào: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">VAT đầu vào</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="8" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="VAT đầu ra: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">VAT đầu ra</div>
                    </th>
                    <th width="6%" data-column="9">Action</th>
                </tr>
            </thead>
            <tbody aria-live="polite" aria-relevant="all" v-if="data.months">
                <tr role="row" v-for="month in data.months">
                    <td>
                        <a href="javascript:void(0)" title="Tháng 01" class="bold">
                            <i class="fa fa-folder-open"></i> {{month.period}} </a>
                    </td>
                    <td>{{formatNumber(month.revenue_shipping)}}</td>
                    <td>{{formatNumber(month.revenue_outside)}}</td>
                    <td>{{formatNumber(month.staff_salary)}}</td>
                    <td>{{formatNumber(month.driver_salary)}}</td>
                    <td>{{formatNumber(month.total_incurred)}}</td>
                    <td>{{formatNumber(month.total_profit)}}</td>
                    <td>{{formatNumber(month.vat_in)}}</td>
                    <td>{{formatNumber(month.vat_out)}}</td>
                    <td>
                        <a :href="`/report/detail/${month.year}/${month.month}`" month title="Xem chi tiết">Chi tiết <i class="fa fa-arrow-circle-right"></i>
                        </a>
                    </td>
                </tr>
            </tbody>
            <tbody class="tablesorter-no-sort">
                <tr role="row">
                    <td align="right">
                        <h3>Tổng năm {{resultYear}}</h3>
                    </td>
                    <td>
                        <h3>
                            <span class="green">{{formatNumber(data.year?.revenue_shipping ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="green">{{formatNumber(data.year?.revenue_outside ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.staff_salary ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.driver_salary ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.total_incurred ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.total_profit ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.vat_in ?? 0)}}</span>
                        </h3>
                    </td>
                    <td colspan="2">
                        <h3>
                            <span class="red">{{formatNumber(data.year?.vat_out ?? 0)}}</span>
                        </h3>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="title" style="padding:20px 0 10px 0">
        <h2>Báo cáo theo quý <span class="red"> - Năm {{resultYear}}</span>
        </h2>
    </div>
    <div class="table table_scroll">
        <table class="table1366 tbreport tablesorter tablesorter-default tablesorterf59af4748ee29" role="grid">
            <thead>
                <tr role="row" class="tablesorter-headerRow">
                    <th class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Quý, năm: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Quý, năm</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="1" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Doanh thu vận chuyển(Xe nhà) (1): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Doanh thu vận chuyển <br>
                            <i>(Xe nhà)</i>
                            <i class="red">(1)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Doanh thu xe ngoài(Doanh thu từ chênh lệch giá) (2): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Doanh thu xe ngoài <br>
                            <i>(Doanh thu từ chênh lệch giá)</i>
                            <i class="red">(2)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Lương nhân sự: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Lương nhân sự</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Lương tài xế: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Lương tài xế</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Tổng chi phí hoạt động(3): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Tổng chi phí hoạt động <br>
                            <i class="red">(3)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Tổng lợi nhuận(1)+(2)-(3): No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">Tổng lợi nhuận <br>
                            <i class="red">(1)+(2)-(3)</i>
                        </div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="VAT đầu vào: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">VAT đầu vào</div>
                    </th>
                    <th width="10%" class="sortable tablesorter-header tablesorter-headerUnSorted" data-column="8" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="VAT đầu ra: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                        <div class="tablesorter-header-inner">VAT đầu ra</div>
                    </th>
                    <th width="6%" data-column="9">Action</th>
                </tr>
            </thead>
            <tbody aria-live="polite" aria-relevant="all">
                <tr role="row" v-for="quarter in data.quarters">
                    <td>{{formatNumber(quarter.period)}}</td>
                    <td>{{formatNumber(quarter.revenue_shipping)}}</td>
                    <td>{{formatNumber(quarter.revenue_outside)}}</td>
                    <td>{{formatNumber(quarter.staff_salary)}}</td>
                    <td>{{formatNumber(quarter.driver_salary)}}</td>
                    <td>{{formatNumber(quarter.total_incurred)}}</td>
                    <td>{{formatNumber(quarter.total_profit)}}</td>
                    <td>{{formatNumber(quarter.vat_in)}}</td>
                    <td>{{formatNumber(quarter.vat_out)}}</td>
                    <td>
                       #
                    </td>
                </tr>
            </tbody>
            <tbody class="tablesorter-no-sort">
                <tr role="row">
                    <td align="right">
                        <h3>Tổng năm {{resultYear}}</h3>
                    </td>
                    <td>
                        <h3>
                            <span class="green">{{formatNumber(data.year?.revenue_shipping ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="green">{{formatNumber(data.year?.revenue_outside ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.staff_salary ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.driver_salary ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.total_incurred ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.total_profit ?? 0)}}</span>
                        </h3>
                    </td>
                    <td>
                        <h3>
                            <span class="red">{{formatNumber(data.year?.vat_in ?? 0)}}</span>
                        </h3>
                    </td>
                    <td colspan="2">
                        <h3>
                            <span class="red">{{formatNumber(data.year?.vat_out ?? 0)}}</span>
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
import { formatNumber } from '@/helper.js';
</script>
<script>
export default {
    data: function () {
        return {
            resultYear: moment().format('YYYY'),
            master: [],
            search: {
                year: moment().format('YYYY'),
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
            this.$store.dispatch("getReport", payload).then((res) => {
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
