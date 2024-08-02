<template>
    <div class="popup popup_full popup_center">
        <div class="scroll" v-if="isMooc">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thêm mới Số Sơ mi rơ mooc</h2>
                <p>Màn hình thêm mới thông tin Số Sơ mi rơ mooc</p>
            </div>
            <form enctype="multipart/form-data">
                <div class="frm">
                    <p class="red" v-if="error.msg" style="text-align: center; margin: 5px 0;">{{ error.msg }}</p>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td width="20%">
                                    <b>Số sơ mi rơ mooc</b>
                                </td>
                                <td>
                                    <input type="text" v-model="insertRomooc.serial" id="soromooc" placeholder="Nhập số sơ mi rơ mooc" maxlength="30" required="required">
                                    <p class="red" v-if="error.serial">{{ error.serial[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số khung</b>
                                </td>
                                <td>
                                    <input type="text" v-model="insertRomooc.frame_number" placeholder="Nhập số khung" maxlength="100">
                                    <p class="red" v-if="error.frame_number">{{ error.frame_number[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Bãi đậu</b>
                                </td>
                                <td>
                                    <select v-model="insertRomooc.packing_id" class="green">
                                        <option :value="null">Chọn bãi đậu</option>
                                        <option value="1">Bãi xe 1</option>
                                        <option value="2">Bãi xe 2</option>
                                        <option value="3">Bãi xe 3</option>
                                    </select>
                                    <p class="red" v-if="error.packing_id">{{ error.packing_id[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Tải trọng KG (*)</b>
                                </td>
                                <td>
                                    <input type="text" v-model="insertRomooc.weight" placeholder="Nhập số KG. VD:30,000" maxlength="7" required="">
                                    <p class="red" v-if="error.weight">{{ error.weight[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Kích cỡ (*)</b>
                                </td>
                                <td>
                                    <select v-model="insertRomooc.size" required="">
                                        <option :value="null">Kích cỡ mooc?</option>
                                        <option value="0">Mooc 20</option>
                                        <option value="1">Mooc 40</option>
                                    </select>
                                    <p class="red" v-if="error.size">{{ error.size[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Loại mooc (*)</b>
                                </td>
                                <td>
                                    <select v-model="insertRomooc.type" required="">
                                        <option :value="null">Loại mooc?</option>
                                        <option value="0">Mooc sàn</option>
                                        <option value="1">Mooc sương</option>
                                    </select>
                                    <p class="red" v-if="error.type">{{ error.type[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số trục (*)</b>
                                </td>
                                <td>
                                    <select v-model="insertRomooc.axis" required="">
                                        <option :value="null">Số trục?</option>
                                        <option value="0">2 trục</option>
                                        <option value="1">3 trục</option>
                                    </select>
                                    <p class="red" v-if="error.axis">{{ error.axis[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ghi chú</b>
                                </td>
                                <td>
                                    <textarea v-model="insertRomooc.note" placeholder="Ghi chú thông tin trang thiết bị (nếu có)..." maxlength="500">Mooc gắn theo đầu kéo 15C26328</textarea>
                                    <p class="red" v-if="error.note">{{ error.note[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Hình ảnh đính kèm</b>
                                </td>
                                <td>
                                    <p style="margin:10px 0 0 0;float:left;clear:both;width:100%">
                                        <input type="file" multiple="multiple" accept="image/*" @change="getImageUpload" id="img_file" onchange="previewImg(event,8);">
                                    </p>
                                    <p class="red" v-if="error.images">{{ error.images[0] }}</p><p class="red" style="padding:5px 0 0 0" v-else>Lưu ý: có thể chọn cùng lúc tối thiểu 8 hình ảnh mỗi lượt thêm (&lt;=10MB)</p>
                                    <div class="view_pics"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>File đính kèm (nếu có)</b>
                                </td>
                                <td>
                                    <input type="file" multiple="multiple" accept=".pdf,.doc,.docx,.xls,.xlsx" @change="getFileUpload">
                                    <p class="red" v-if="error.addable_files">{{ error.addable_files[0] }}</p><p style="padding:5px 0 0 0;color:red" v-else>File định dạng: .pdf,.doc,.docx,.xls,.xlsx (Được chọn cùng lúc nhiều file)</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="center">
                                    <button type="button" @click="insertData(insertRomooc, isMooc)" style="float:none">
                                        <i class="fa fa-floppy-o"></i> Lưu thông tin </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
        <div class="scroll" v-else>
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thêm xe mới</h2>
                <p>Màn hình thêm xe mới</p>
            </div>
            <form name="frmXe" enctype="multipart/form-data">
                <p class="red" v-if="error.msg" style="text-align: center; margin: 5px 0;">{{ error.msg }}</p>
                <div class="frm">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td width="20%">
                                    <b>Biển số xe (*)</b>
                                </td>
                                <td>
                                    <input type="text" v-model="insertVehicle.plate" placeholder="Nhập biển số xe" maxlength="15" required="required">
                                    <p class="red" v-if="error.plate">{{ error.plate[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số khung</b>
                                </td>
                                <td>
                                    <input type="text" v-model="insertVehicle.chassis" placeholder="Nhập số khung" maxlength="100">
                                    <p class="red" v-if="error.chassis">{{ error.chassis[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số máy</b>
                                </td>
                                <td>
                                    <input type="text" v-model="insertVehicle.seri" placeholder="Nhập số máy" maxlength="100">
                                    <p class="red" v-if="error.seri">{{ error.seri[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số cầu (*)</b>
                                </td>
                                <td>
                                    <select v-model="insertVehicle.axle">
                                        <option :value="null">Chọn loại xe</option>
                                        <option value="1">Xe 1 cầu</option>
                                        <option value="2">Xe 2 cầu</option>
                                        <option value="9">Chưa xác định</option>
                                    </select>
                                    <p class="red" v-if="error.axle">{{ error.axle[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Bãi đậu</b>
                                </td>
                                <td>
                                    <select class="green" v-model="insertVehicle.parkingLot">
                                        <option :value="null">Chọn bãi đậu</option>
                                        <option value="1">Bãi xe 1</option>
                                        <option value="2">Bãi xe 2</option>
                                        <option value="3">Bãi xe 3</option>
                                    </select>
                                    <p class="red" v-if="error.parkingLot">{{ error.parkingLot[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Cổ đông xe (*)</b>
                                </td>
                                <td>
                                    <select v-model="insertVehicle.type">
                                        <option value="0">(0) Xe nhà</option>
                                    </select>
                                    <p class="red" v-if="error.type">{{ error.type[0] }}</p><p class="tips blue2 italic" v-else>(Chọn xe nhà hoặc xe từ cổ đông đầu tư)</p>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Tài xế phụ trách</b></td>
                                <td>
                                    <select v-model="insertVehicle.driver" class="select" placeholder="Chọn tài xế">
                                        <option value="">Chọn tài xế</option>
                                        <option v-for="driver in master?.driver" :value="driver.id">{{ driver.name }}</option>
                                    </select>
                                    <p class="red" v-if="error.driver">{{ error.driver[0] }}</p>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Ghi chú</b>
                                </td>
                                <td>
                                    <textarea v-model="insertVehicle.note" placeholder="Ghi chú thông tin trang thiết bị (nếu có)..." maxlength="500"></textarea>
                                    <p class="red" v-if="error.note">{{ error.note[0] }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Hình ảnh xe</b>
                                </td>
                                <td>
                                    <p style="margin:10px 0 0 0;float:left;clear:both;width:100%">
                                        <input type="file" v-on:change="getImageUpload" onchange="previewImg(event,8);" id="img_file" multiple="multiple" accept="image/*">
                                    </p>
                                    <p class="red" v-if="error.images">{{ error.images[0] }}</p><p class="red" style="padding:5px 0 0 0" v-else>Lưu ý: có thể chọn cùng lúc tối thiểu 8 hình ảnh mỗi lượt thêm (&lt;=10MB)</p>
                                    <div class="view_pics"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>File đính kèm (nếu có)</b>
                                </td>
                                <td>
                                    <input type="file" v-on:change="getFileUpload" id="pdf_file" multiple="multiple" accept=".pdf,.doc,.docx,.xls,.xlsx">
                                    <p class="red" v-if="error.addable_files">{{ error.addable_files[0] }}</p><p style="padding:5px 0 0 0;color:red" v-else>File định dạng: .pdf,.doc,.docx,.xls,.xlsx (Được chọn cùng lúc nhiều file)</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="center">
                                    <button type="button" @click="insertData(insertVehicle)" style="margin:0 auto;float:none">
                                        <i class="fa fa-floppy-o"></i> Lưu thông tin </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    </div>

</template>
<style scoped></style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: ['show', 'isMooc', 'master'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            error: {},
            openTireInformationModal: false,
            reload: false,
            insertVehicle: {...this.$store.state.vehicle.addNew},
            insertRomooc: this.$store.state.mooc.addNew,
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
        insertData: function (data, isMooc = null) {
            let formData = new FormData();
            for (let key in data) {
                switch (key) {
                    case 'images':
                        for (let i = 0; i < data[key].length; i++) {
                            formData.append('images[]', data[key][i]);
                        }
                        break;
                    case 'addable_files':
                        for (let i = 0; i < data[key].length; i++) {
                            formData.append('addable_files[]', data[key][i]);
                        }
                        break;
                    default:
                        if (!(data[key] == null)) {
                            formData.append(key, data[key]);
                        }
                        break;
                }
            }

            let funcName = "addNew";
            if (isMooc) {
                funcName = "addNewMooc";
            }
            this.$store.dispatch(funcName, formData).then((res) => {
                if (res.data.success) {
                    this.reload = true;
                    this.$emit('onSubmit');
                    this.onClose();
                } else if (res.data.code == 422) {
                    this.error = res.data.errors
                } else {
                    this.error = {}
                    this.error.msg = res.data.message
                }
            });
        },
        getImageUpload: function (e) {
            if (e.target.files) {
                this.insertRomooc.images = [];
                this.insertVehicle.images = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    this.insertRomooc.images.push(e.target.files[i]);
                    this.insertVehicle.images.push(e.target.files[i]);
                }
            }
        },
        getFileUpload: function (e) {
            if (e.target.files) {
                this.insertRomooc.addable_files = [];
                this.insertVehicle.addable_files = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    this.insertRomooc.addable_files.push(e.target.files[i]);
                    this.insertVehicle.addable_files.push(e.target.files[i]);
                }
            }
        }
    },
    created: async function () {

    }
}
</script>
