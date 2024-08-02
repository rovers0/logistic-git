<template>
    <div class="popup popup_full">
        <div class="scroll" v-if="!isMooc">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thông Sơ mi rơ mooc - <span class="red">{{data.plate}}</span>
                </h2>
                <p>Màn hình xem thông tin xe</p>
            </div>
            <div class="frm table_cont" style="padding-top:0">
                <table class="tablecont2" style="width:100%;background:#d9e9fa">
                    <tbody>
                        <tr>
                            <td width="40%"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzNQMQ')" style="color:#006080">3P1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRQMQ')" style="color:#006080">4P1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzVQMQ')" style="color:#006080">5P1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td width="40%"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzNQMg')" style="color:#006080">3P2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRQMg')" style="color:#006080">4P2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzVQMg')" style="color:#006080">5P2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">
                                <h2 style="padding:30px 0;margin:0">VỊ TRÍ LỐP ĐẦU CÁI: {{data.plate}}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td width="40%"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzNUMg')" style="color:#006080">3T2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRUMg')" style="color:#006080">4T2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzVUMg')" style="color:#006080">5T2 - Thay: <b class="red">1</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0;color:#000">Seri number: <span class="red">E205083960</span>
                                    </p>
                                    <p style="font-size:10px;color:#000">Ngày thay lốp: 2023-11-22</p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td width="40%"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzNUMQ')" style="color:#006080">3T1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRUMQ')" style="color:#006080">4T1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzVUMQ')" style="color:#006080">5T1 - Thay: <b class="red">1</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0;color:#000">Seri number: <span class="red">E205016071</span>
                                    </p>
                                    <p style="font-size:10px;color:#000">Ngày thay lốp: 2023-11-22</p>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="frm">
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="24%">
                                <b>Số rơ mooc</b>
                            </td>
                            <td>{{data.plate}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số khung</b>
                            </td>
                            <td>{{data.chassis}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số máy</b>
                            </td>
                            <td>{{data.seri}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số cầu</b>
                            </td>
                            <td>Xe {{data.axle}} cầu</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Bãi đậu</b>
                            </td>
                            <td>
                                <span class="bold green">{{data.parking?.name}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ghi chú trang thiết bị</b>
                            </td>
                            <td>{{data.note}}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h3>THÔNG TIN ĐĂNG KIỂM</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạn đăng kiểm</b>
                            </td>
                            <td>Chưa có </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạn bảo trì đường bộ</b>
                            </td>
                            <td>Chưa có </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạn BH tự nguyện</b>
                            </td>
                            <td>Chưa có </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạn BH bắt buộc</b>
                            </td>
                            <td>Chưa có </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Giấy phép đi đường</b>
                            </td>
                            <td>Chưa có </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h3>Hình ảnh</h3>
                                <ul class="picslist">
                                    <VueLightbox :imgs="data.images" @delete="handleDeleteFile"></VueLightbox>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <button class="close_btn" @click="onClose()" style="float:none">
                                    <i class="fa fa-times-circle"></i> Đóng lại </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="scroll" v-else>
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thông tin xe - <span class="red">{{data.serial}}</span>
                </h2>
                <p>Màn hình xem thông tin xe</p>
            </div>
            <div class="frm table_cont" style="padding-top:0">
                <table class="tablecont" style="width:100%;background:#d9e9fa">
                    <tr>
                        <td rowspan="2" width="25%">
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzFQMQ')" style="color:#006080">1P1 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:5px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                        <td rowspan="2" style="background:#fff;border-top:1px solid #ffff"></td>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQMQ')" style="color:#006080">2P1 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQMw')" style="color:#006080">2P3 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQMg')" style="color:#006080">2P2 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQNA')" style="color:#006080">2P4 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" align="center" style="padding:30px 0;margin:0">
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzA')">
                                <h2 style="color:#000">VỊ TRÍ LỐP ĐẦU CÁI: {{data.serial}}</h2>
                                <p class="bold blue2">Tổng thay: <b class="red">2</b> - Tổng sửa: <b class="red">0</b>
                                </p>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2" width="25%">
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzFUMQ')" style="color:#006080">1T1 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:5px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                        <td rowspan="2" style="background:#fff;border-top:1px solid #ffff"></td>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUMQ')" style="color:#006080">2T1 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUNA')" style="color:#006080">2T4 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUMg')" style="color:#006080">2T2 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                        <td>
                            <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUMw')" style="color:#006080">2T3 - Thay: <b class='red' style='opacity:0.3'>0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                </p>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="frm">
                <table class="table">
                    <tr>
                        <td colspan="2">
                            <h3 style="font-size:17px">THÔNG TIN XE</h3>
                        </td>
                    </tr>
                    <tr>
                        <td width="24%">
                            <b>Số sơ mi rơ mooc</b>
                        </td>
                        <td>{{data.serial}}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Số khung</b>
                        </td>
                        <td>{{ data.frame_number }}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Bãi đậu</b>
                        </td>
                        <td>
                            <span class="bold green">{{data.parking.name}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Tải trọng KG (*)</b>
                        </td>
                        <td>{{ data.weight }}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Loại mooc (*)</b>
                        </td>
                        <td>{{ MOOC_TYPE[data.type] }}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Số trục (*)</b>
                        </td>
                        <td>{{ AXIS[data.axis] }}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Ghi chú trang thiết bị</b>
                        </td>
                        <td>{{ data.note }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <h3 style="font-size:17px">THÔNG TIN ĐĂNG KIỂM</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Hạn đăng kiểm</b>
                        </td>
                        <td>Chưa có </td>
                        <!-- <td>
                            <span class="red">Từ 08-12-2021 đến 07-12-2023 - Còn hạn: -110 (ngày)</span>
                            <ul class="picslist">
                                <li style="width:40px;height:40px">
                                    <a href="data/asset/1698802285_8_img-1698801802614-1698801960939.jpg" class="colorbox" style="cursor:zoom-in">
                                        <img src="data/asset/1698802285_8_img-1698801802614-1698801960939.jpg" style="width:100%;height:100%">
                                    </a>
                                </li>
                            </ul>
                        </td> -->
                    </tr>
                    <tr>
                        <td>
                            <b>Hạn bảo trì đường bộ</b>
                        </td>
                        <td>Chưa có </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Hạn BH tự nguyện</b>
                        </td>
                        <td> Chưa có </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Hạn BH bắt buộc</b>
                        </td>
                        <td>Chưa có </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Giấy phép đi đường</b>
                        </td>
                        <td>Chưa có </td>
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
                            <button type="button" class="close_btn"  @click="onClose()" style="float:none">
                                <i class="fa fa-times-circle"></i> Đóng lại </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
    <TireInformationModal
        v-if="openTireInformationModal"
        :show="openTireInformationModal"
        @close="onCloseTireInformationModal()"
    ></TireInformationModal>
</template>
<style scoped>

</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import VueLightbox from "@/components/VueLightbox.vue";
import {SIZE, MOOC_TYPE, AXIS} from '@/components/Constants.vue';
import TireInformationModal from "./TireInformationModal.vue";
</script>
<script>
export default {
    props: ['data', 'isMooc', 'selectedKey'],
    emits: ['close'],
    data: function () {
        return {
            day: null,
            openTireInformationModal: false,
            reload: false,
            urls: Object.values(this.data?.images).map(item => item.original_url),
        }
    },
    computed: {
        // ...mapState({
        //     master: state => state.achievement.master,
        // }),
    },
    methods: {
        onOpenTireInformationModal: function (serial) {
            console.log(serial);
            this.openTireInformationModal = true
        },
        onCloseTireInformationModal: function () {
            this.openTireInformationModal = false
        },
        onClose: function () {
            this.$emit('close', this.reload)
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
        },
    },
    created: async function () {

    }
}
</script>
