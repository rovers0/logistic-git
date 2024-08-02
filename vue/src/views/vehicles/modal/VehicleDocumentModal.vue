<template>
    <div class="popup" style="z-index:999">
        <div class="scroll">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>{{ DOCUMENT_MODAL_NAME[modalType] }}</h2>
                <p>Màn hình thêm mới thông tin {{ DOCUMENT_MODAL_NAME[modalType] }}</p>
            </div>
            <div class="frm">
                <p class="red" v-if="error.msg" style="text-align: center; margin: 5px 0;">{{ error.msg }}</p>
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="24%">
                                <b>Số tiền phí</b>
                            </td>
                            <td>
                                <input type="number" v-model="insertDoc.fees" class="red" data-type="currency" placeholder="VD: 5,000,000" maxlength="30" onkeypress="return checknumber(event)">
                                <p class="red" v-if="error.fees">{{ error.fees[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày hiệu lực</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDoc.effective_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.effective_date">{{ error.effective_date[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày hết hạn</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDoc.expiration_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.expiration_date">{{ error.expiration_date[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Báo trước mấy ngày?</b>
                            </td>
                            <td>
                                <input type="number" v-model="insertDoc.notice_duration" placeholder="Số ngày hiện thông báo gia hạn phí. VD: 7" maxlength="2" onkeypress="return checknumber(event)">
                                <p class="red" v-if="error.notice_duration">{{ error.notice_duration[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ghi chú</b>
                            </td>
                            <td>
                                <textarea v-model="insertDoc.note" placeholder="Ghi chú (nếu có)..." maxlength="500"></textarea>
                                <p class="red" v-if="error.note">{{ error.note[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hình ảnh đính kèm</b>
                            </td>
                            <td>
                                <p style="float:left;clear:both;width:100%">
                                    <input type="file" v-on:change="handleFileChange('image', $event)" id="img_file" onchange="previewImg(event,8);" multiple="multiple" accept="image/*">
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
                                <input type="file" v-on:change="handleFileChange('addable_files', $event)" id="pdf_file" multiple="multiple" accept=".pdf,.doc,.docx,.xls,.xlsx">
                                <p style="padding:5px 0 0 0;color:red">File định dạng: .pdf,.doc,.docx,.xls,.xlsx (Được chọn cùng lúc nhiều file)</p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h3>Hình ảnh đính kèm</h3>
                                <ul class="picslist">
                                    <VueLightbox :imgs="data.images" @delete="handleDeleteFile"></VueLightbox>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <button type="submit"  @click="submitData(insertDoc)" style="float:none">
                                    <i class="fa fa-floppy-o"></i> Lưu thông tin </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script setup>
import {DOCUMENT_MODAL_NAME} from '@/components/Constants.vue';
import VueLightbox from "@/components/VueLightbox.vue";
import { formatBeforeRequest } from '@/helper.js';
</script>
<script>
export default {
    props: ['data', 'vehicleID', 'modalType'],
    emits: ['close'],
    data: function () {
        return {
            error: {},
            addable_files: [],
            image: [],
            urls: this.data ? Object.values(this.data.images).map(item => item.original_url) : null,
            insertDoc: this.data ? this.data : {...this.$store.state.vehicle.addNewDoc},
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close', {reload :false, modal: this.modalType})
        },
        handleFileChange(type, event) {
            this[type] = event.target.files;
        },
        handleDeleteFile(id) {
            if (confirm("Bạn có chắc muốn xóa file này") == true) {
                this.$store.dispatch(
                    'deleteVehicleDocumentMedia', 
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
        },
        submitData: function (data) {
            const submitData = {...data, document_type: this.modalType}
            const payload = formatBeforeRequest(submitData);
            const { addable_files, images, ...newPayload } = payload;
            const formData = new FormData();
            Object.entries(newPayload).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value)
                }
            });
            for (const file of this.image) {
                formData.append('images[]', file);
            }
            for (const file of this.addable_files) {
                formData.append('addable_files[]', file);
            }

            this.$store.dispatch('vehicleDocuments', {vehicle_id: this.vehicleID, data: formData}).then((res) => {
                if (res.data.success) {
                    this.$emit('close', {reload :true, modal: this.modalType})
                } else if (res.data.code == 422) {
                    this.error = res.data.errors
                } else {
                    this.error = {}
                    this.error.msg = res.data.message
                }
            });
        }
    },
}
</script>
