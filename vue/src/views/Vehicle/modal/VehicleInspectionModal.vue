<template>
    <div class="popup popup_center" style="z-index:99999">
        <div class="scroll">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Phí đăng kiểm</h2>
                <p>Màn hình thêm mới thông tin Phí đăng kiểm</p>
            </div>
            <div class="frm">
                <form name="frmPhi" id="frmPhi" method="post" data-id="NF9fX19fMTVIMDI5ODVfX19fXzFfX19fXzE" onsubmit="return update('xe','frmPhi','dk_update','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="NF9fX19fMTVIMDI5ODVfX19fXzFfX19fXzE">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td width="24%">
                                    <b>Số tiền phí</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[sotien]" value="584,000" class="red" data-type="currency" placeholder="VD: 5,000,000" maxlength="30">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày hiệu lực</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[ngaydangkiem]" value="08-12-2021" class="picker hasDatepicker" autocomplete="off" placeholder="VD: 20-07-2020" maxlength="10" required="" id="dp1711425746986">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày hết hạn</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[ngayhethan]" value="07-12-2023" class="picker hasDatepicker" autocomplete="off" placeholder="VD: 30-07-2021" maxlength="10" required="" id="dp1711425746987">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Báo trước mấy ngày?</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[alert]" value="7" onkeypress="return checkIt(event)" placeholder="Số ngày hiện thông báo gia hạn phí. VD: 7" maxlength="2" required="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ghi chú</b>
                                </td>
                                <td>
                                    <textarea name="ds[ghichu]" placeholder="Ghi chú (nếu có)..." maxlength="500"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Hình ảnh đính kèm</b>
                                </td>
                                <td>
                                    <p style="float:left;clear:both;width:100%">
                                        <input type="file" name="img_file[]" id="img_file" onchange="previewImg(event,8);" multiple="multiple" accept="image/*">
                                    </p>
                                    <p class="red" style="padding:5px 0 0 0">Lưu ý: có thể chọn cùng lúc tối thiểu 8 hình ảnh mỗi lượt thêm (&lt;=10MB)</p>
                                    <div class="view_pics"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>File đính kèm (nếu có)</b>
                                </td>
                                <td>
                                    <input type="file" name="pdf_file[]" id="pdf_file" multiple="multiple" accept=".pdf,.doc,.docx,.xls,.xlsx">
                                    <p style="padding:5px 0 0 0;color:red">File định dạng: .pdf,.doc,.docx,.xls,.xlsx (Được chọn cùng lúc nhiều file)</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3>Hình ảnh đính kèm</h3>
                                    <ul class="picslist">
                                        <li id="pics_MjQyX19fX19waHBfcGhpa2llbWRpbmhfX19fXzg">
                                            <span onclick="return deletePics('MjQyX19fX19waHBfcGhpa2llbWRpbmhfX19fXzg','xe','deletepics')">
                                                <i class="fa fa-trash"></i> Xóa </span>
                                            <a href="data/asset/1698802285_8_img-1698801802614-1698801960939.jpg" class="colorbox cboxElement" style="cursor:zoom-in">
                                                <img src="data/asset/1698802285_8_img-1698801802614-1698801960939.jpg">
                                            </a>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="center">
                                    <button type="submit"  @click="onClose()" style="float:none">
                                        <i class="fa fa-floppy-o"></i> Lưu thông tin </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
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
