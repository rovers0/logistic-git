<template>
    <div class="popup popup_full popup_center close_this" style="z-index:101">
        <div class="scroll">
            <span class="close_pop_this" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Lịch sử thay lốp xe - Biển số: <span class="red">15C26328</span>
                </h2>
                <p>Màn hình xem tất cả lịch sử thay lốp xe</p>
            </div>
            <div class="frm">
                <div class="table_cont">
                    <h3 style="padding:0 0 10px 0">Sơ đồ mô tả vị trí lốp xe</h3>
                    <table class="tablecont">
                        <tbody>
                            <tr>
                                <td rowspan="2">1P1</td>
                                <td rowspan="2" style="background:#fff;border-top:1px solid #ffff"></td>
                                <td>2P1</td>
                                <td>2P3</td>
                            </tr>
                            <tr>
                                <td>2P2</td>
                                <td>2P4</td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <h2 style="padding:30px 0;margin:0">ĐẦU CÁI</h2>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">1T1</td>
                                <td rowspan="2" style="background:#fff;border-bottom:1px solid #ffff"></td>
                                <td>2T1</td>
                                <td>2T4</td>
                            </tr>
                            <tr>
                                <td>2T2</td>
                                <td>2T3</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="tablecont2">
                        <tbody>
                            <tr>
                                <td width="60%">&nbsp;</td>
                                <td>3P1</td>
                                <td>4P1</td>
                                <td>5P1</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>3P2</td>
                                <td>4P2</td>
                                <td>5P2</td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <h2 style="padding:30px 0;margin:0">RƠ MOOC</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>3T2</td>
                                <td>4T2</td>
                                <td>5T2</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>3T1</td>
                                <td>4T1</td>
                                <td>5T1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table table_scroll">
                    <table width="100%" class="table1024">
                        <tbody>
                            <tr>
                                <th width="1%">STT</th>
                                <th width="6%">Ngày thay</th>
                                <th width="1%">Mã phiếu</th>
                                <th width="10%">Bên giao</th>
                                <th width="10%">Bên nhận</th>
                                <th width="2%">Vị trí thay</th>
                                <th width="15%">Tên sản phẩm</th>
                                <th width="5%">Số seri</th>
                                <th width="5%">KM Bảo hành</th>
                                <th>Nội dung</th>
                                <th width="7%">Số tiền</th>
                                <th width="1%">Hình</th>
                            </tr>
                            <tr>
                                <td align="center">1</td>
                                <td>31-10-2023</td>
                                <td>6</td>
                                <td>Nguyễn Mạnh Tùng</td>
                                <td>Vũ Tuấn Trường</td>
                                <td>1T1</td>
                                <td>Lốp 11R.225 Trung Quốc</td>
                                <td>0002722679</td>
                                <td class="red">0</td>
                                <td>thay lốp lái cho 15C26328</td>
                                <td class="red">4,700,000</td>
                                <td>
                                    <a href="#" style="color:#fff" class="colorbox cboxElement" title="Xem ảnh">
                                        <div class="filehid">
                                            <img src="">
                                        </div>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="10" align="right">
                                    <h3>Tổng chi phí</h3>
                                </td>
                                <td colspan="2">
                                    <h3>
                                        <span class="red bg">4,700,000</span>
                                    </h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: ['show', 'keys', 'selectedKey'],
    emits: ['close'],
    data: function () {
        return {
            day: null,
            reload: false,
        }
    },
    computed: {
        // ...mapState({
        //     master: state => state.achievement.master,
        // }),
    },
    methods: {
        onClose: function () {
            this.$emit('close', this.reload)
        },
    },
    created: async function () {

    }
}
</script>
