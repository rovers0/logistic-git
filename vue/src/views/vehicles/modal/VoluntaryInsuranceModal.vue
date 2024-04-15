<template>
    <div class="popup popup_center" style="z-index:99999">
        <div class="scroll">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Phí Bảo hiểm tự nguyện</h2>
                <p>Màn hình thêm mới thông tin Phí Bảo hiểm tự nguyện</p>
            </div>
            <div class="frm">
                <form name="frmPhi" id="frmPhi" method="post" data-id="NF9fX19fMTVIMDI5ODVfX19fXzNfX19fXzE" onsubmit="return insert('xe','dk_insert','frmPhi','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="NF9fX19fMTVIMDI5ODVfX19fXzNfX19fXzE">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td width="24%">
                                    <b>Số tiền phí</b>
                                </td>
                                <td>
                                    <input type="text" v-model="data.fee" data-type="currency" placeholder="VD: 5,000,000" maxlength="30">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày hiệu lực</b>
                                </td>
                                <td>
                                    <input type="text" v-model="data.registDate" class="picker hasDatepicker" autocomplete="off" placeholder="VD: 20-07-2020" maxlength="10" required="" id="dp1711425746990">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày hết hạn</b>
                                </td>
                                <td>
                                    <input type="text" v-model="expireDate" class="picker hasDatepicker" autocomplete="off" placeholder="VD: 30-07-2021" maxlength="10" required="" id="dp1711425746991">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Báo trước mấy ngày?</b>
                                </td>
                                <td>
                                    <input type="text"  v-model="alertDate" onkeypress="return checkIt(event)" placeholder="Số ngày hiện thông báo gia hạn phí. VD: 7" maxlength="2" required="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ghi chú</b>
                                </td>
                                <td>
                                    <textarea v-model="data.note" placeholder="Ghi chú (nếu có)..." maxlength="500"></textarea>
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
                                <td colspan="2" align="center">
                                    <button type="submit" @click="onClose()" style="float:none">
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
    props: ['data', 'keys', 'selectedKey'],
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
