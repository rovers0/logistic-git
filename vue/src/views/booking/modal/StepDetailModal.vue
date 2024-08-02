<template>
    <div class="popup popup_center">
        <span class="close_pop" @click="onClose">×</span>
        <template v-if="data.step == 1">
            <div class="pophead">
                <h2>Lấy cont hàng</h2>
                <p>Thông tin và hình ảnh Lấy cont hàng</p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy cont hàng</b></td>
                                <td class="bold green">{{ getDateStatus(data.detail.statuses[0].properties) }}</td>
                            </tr>
                            <tr>
                                <td><b>Số cont</b></td>
                                <td>{{ getProperties(data.detail.conts, 'code')}}</td>
                            </tr>
                            <tr>
                                <td><b>Số seal</b></td>
                                <td>{{ getProperties(data.detail.conts, 'seal')}}</td>
                            </tr>

                            <tr>
                                <td><b>Hình ảnh Lấy cont hàng</b></td>
                                <td>
                                    <ul class="picslist">
                                        <VueLightbox :imgs="data.detail.statuses[0].images" :hideDelete="true"></VueLightbox>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 2">
            <div class="pophead">
                <h2>Cắt mooc/Xuống hàng</h2>
                <p>Thông tin và hình ảnh Cắt mooc/Xuống hàng</p>
            </div>
            <div class="table frm" style="width:100%">
                <form name="frmTimeLine" id="frmTimeLine" method="post" onsubmit="return update('lenh','frmTimeLine','timeline_add','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTczOF9fX19fMTM3OV9fX19fMjBfX19fX2NhdHJvbmdfX19fX0Phuq90IG1vb2MvWHXhu5FuZyBow6BuZ19fX19fMDVfX19fXzIwMjQ">
                    <input type="hidden" name="up" value="1">
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">0972688460</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Cắt mooc/Xuống hàng</b></td>
                                <td class="bold green">2024-05-21 15:25:23</td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Cắt mooc/Xuống hàng</b></td>
                                <td>
                                    <ul class="picslist">
                                        <VueLightbox :imgs="data.detail.statuses[1].images" :hideDelete="true"></VueLightbox>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 3">
            <div class="pophead">
                <h2>Lấy cont rỗng đi hạ</h2>
                <p>Thông tin và hình ảnh Lấy cont rỗng đi hạ</p>
            </div>
            <div class="table frm" style="width:100%">
                <form name="frmTimeLine" id="frmTimeLine" method="post" onsubmit="return update('lenh','frmTimeLine','timeline_add','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTczOF9fX19fMTM3OV9fX19fMjBfX19fX2NhdGhhX19fX19M4bqleSBjb250IHLhu5duZyDEkWkgaOG6oV9fX19fMDVfX19fXzIwMjQ">
                    <input type="hidden" name="up" value="1">
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: Nguyễn Thế Hanh - <span class="red">0972688460</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy cont rỗng đi hạ</b></td>
                                <td class="bold green">2024-05-21 15:25:23</td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Lấy cont rỗng đi hạ</b></td>
                                <td>
                                    <ul class="picslist">
                                        <VueLightbox :imgs="data.detail.statuses[2].images" :hideDelete="true"></VueLightbox>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 4">
            <div class="pophead">
                <h2>Hạ bãi</h2>
                <p>Thông tin và hình ảnh Hạ bãi</p>
            </div>
            <div class="table frm" style="width:100%">
                <form name="frmTimeLine" id="frmTimeLine" method="post" onsubmit="return update('lenh','frmTimeLine','timeline_add','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTczOF9fX19fMTM3OV9fX19fMjBfX19fX2hhYmFpX19fX19I4bqhIGLDo2lfX19fXzA1X19fX18yMDI0">
                    <input type="hidden" name="up" value="1">
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: Nguyễn Thế Hanh - <span class="red">0972688460</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Hạ bãi</b></td>
                                <td class="bold green">2024-05-21 15:25:23</td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Hạ bãi</b></td>
                                <td>
                                    <ul class="picslist">
                                        <VueLightbox :imgs="data.detail.statuses[3].images" :hideDelete="true"></VueLightbox>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 5">
            <div class="pophead">
                <h2>Lấy rỗng</h2>
                <p>Thông tin và hình ảnh Lấy rỗng</p>
            </div>
            <div class="table frm" style="width:100%">
                <form name="frmTimeLine" id="frmTimeLine" method="post" onsubmit="return update('lenh','frmTimeLine','timeline_add','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTc0M19fX19fMTM4MF9fX19fMjZfX19fX2xheXJvbmdfX19fX0zhuqV5IHLhu5duZ19fX19fMDVfX19fXzIwMjQ">
                    <input type="hidden" name="up" value="1">
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: Nguyễn Thế Hanh - <span class="red">0972688460</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy rỗng</b></td>
                                <td class="bold green">2024-05-21 09:42:43</td>
                            </tr>
                            <tr>
                                <td><b>Số cont</b></td>
                                <td>OOLU6799993</td>
                            </tr>
                            <tr>
                                <td><b>Số seal</b></td>
                                <td>27208452</td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Lấy rỗng</b></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 6">
            <div class="pophead">
                <h2>Cắt rỗng/Đóng hàng</h2>
                <p>Thông tin và hình ảnh Cắt rỗng/Đóng hàng</p>
            </div>
            <div class="table frm" style="width:100%">
                <form name="frmTimeLine" id="frmTimeLine" method="post" onsubmit="return update('lenh','frmTimeLine','timeline_add','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTc0M19fX19fMTM4MF9fX19fMjZfX19fX2NhdHJvbmdfX19fX0Phuq90IHLhu5duZy_EkMOzbmcgaMOgbmdfX19fXzA1X19fX18yMDI0">
                    <input type="hidden" name="up" value="1">
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: Nguyễn Thế Hanh - <span class="red">0972688460</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Cắt rỗng/Đóng hàng</b></td>
                                <td class="bold green">2024-05-21 09:42:43</td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Cắt rỗng/Đóng hàng</b></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 7">
            <div class="pophead">
                <h2>Lấy cont hàng đi hạ</h2>
                <p>Thông tin và hình ảnh Lấy cont hàng đi hạ</p>
            </div>
            <div class="table frm" style="width:100%">
                <form name="frmTimeLine" id="frmTimeLine" method="post" onsubmit="return update('lenh','frmTimeLine','timeline_add','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTc0M19fX19fMTM4MF9fX19fMjZfX19fX2NhdGhhX19fX19M4bqleSBjb250IGjDoG5nIMSRaSBo4bqhX19fX18wNV9fX19fMjAyNA">
                    <input type="hidden" name="up" value="1">
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: Nguyễn Thế Hanh - <span class="red">0972688460</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy cont hàng đi hạ</b></td>
                                <td class="bold green">2024-05-21 09:42:43</td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Lấy cont hàng đi hạ</b></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 8">
            <div class="pophead">
                <h2>Hạ bãi</h2>
                <p>Thông tin và hình ảnh Hạ bãi</p>
            </div>
            <div class="table frm" style="width:100%">
                <form name="frmTimeLine" id="frmTimeLine" method="post" onsubmit="return update('lenh','frmTimeLine','timeline_add','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" value="MTc0M19fX19fMTM4MF9fX19fMjZfX19fX2hhYmFpX19fX19I4bqhIGLDo2lfX19fXzA1X19fX18yMDI0">
                    <input type="hidden" name="up" value="1">
                    <table>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: Nguyễn Thế Hanh - <span class="red">0972688460</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Ngày giờ Hạ bãi</b></td>
                                <td class="bold green">2024-05-21 09:42:43</td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Hạ bãi</b></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
    </div>
</template>

<style scoped></style>
<script setup>
import { objectToFormData } from '@/helper.js';
import moment from 'moment';
import VueLightbox from "@/components/VueLightbox.vue";
</script>
<script>
export default {
    props: ['data'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {

        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        getProperties: function (data, attribute) {
            const codes = data.map(item => item[attribute]);
            return codes.join('|');;
        },
        getDateStatus: function (properties) {
            properties = JSON.parse(properties);
            return properties.time;
        },
        handleDeleteFile(id) {
            if (confirm("Bạn có chắc muốn xóa file này") == true) {
                this.$store.dispatch(
                    this.isMooc ? 'deleteMoocMedia' : 'deleteVehicleMedia',
                    {id: this.data.id, mediaId: id}
                ).then((res) => {
                if (res.data.success) {
                    if (this.data.images.hasOwnProperty(id)) {
                        delete this.data.images[id];
                    }
                } else {
                    alert('Có lỗi xảy ra! Vui lòng thử lại sau.')
                }
            });
            }
        }
    },
    created: async function () {

    }
}
</script>
