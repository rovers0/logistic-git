<template>
    <div class="popup">
        <div class="scroll" v-if="!isEdit">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2> Thông tin tài xế</h2>
                <p>Màn hình thông tin tài xế</p>
            </div>
            <div class="frm">
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="25%">
                                <b>Họ và tên</b>
                            </td>
                            <td>{{driverInfor.user.name}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số điện thoại</b>
                            </td>
                            <td>{{driverInfor.user.phone}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Xe đang phụ trách</b>
                            </td>
                            <td>{{dispalyPlate(driverInfor.vehicle)}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Email</b>
                            </td>
                            <td>{{driverInfor.user.email}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Năm sinh</b>
                            </td>
                            <td>{{driverInfor.birthday}} </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Quê quán</b>
                            </td>
                            <td>{{driverInfor.bith_place}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số CMND/Passport</b>
                            </td>
                            <td>{{driverInfor.passport}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>SĐT người thân (*)</b>
                            </td>
                            <td>{{driverInfor.relative_phone}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tên người thân (*)</b>
                            </td>
                            <td>{{driverInfor.relative_name}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Lương căn bản</b>
                            </td>
                            <td class="red">{{driverInfor.salary}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Phụ cấp</b>
                            </td>
                            <td class="red">{{driverInfor.allowance}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Bảo hiểm</b>
                            </td>
                            <td class="red">{{driverInfor.insurance}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tỉ lệ hoa hồng (%)</b>
                            </td>
                            <td class="red">{{driverInfor.commission_percent}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày vào làm</b>
                            </td>
                            <td>{{driverInfor.start_date}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số năm kinh nghiệm</b>
                            </td>
                            <td>{{driverInfor.experient_year}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạng bằng lái</b>
                            </td>
                            <td>{{driverInfor.license_class}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số bằng lái</b>
                            </td>
                            <td>{{driverInfor.license}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Giá trị bằng lái (*)</b>
                            </td>
                            <td>{{driverInfor.license_expired_date}}<br>
                                <span v-html="daysUsable(driverInfor.license_expired_date)"></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h2>THÔNG TIN HỒ SƠ XIN VIỆC</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Người nhận hồ sơ</b>
                            </td>
                            <td>{{driverInfor.receive_user_id}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nhận hồ sơ gốc</b>
                            </td>
                            <td>{{driverInfor.receive_date}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày vào làm</b>
                            </td>
                            <td>{{driverInfor.start_date}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nghỉ việc</b>
                            </td>
                            <td>{{driverInfor.end_date}}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày bàn trả hồ sơ gốc</b>
                            </td>
                            <td>{{driverInfor.release_date}}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h3>Hình ảnh đính kèm</h3>
                                <ul class="picslist">
                                    <VueLightbox :imgs="urls"></VueLightbox>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="close_btn" style="margin:10px 0 0 0" @click="onClose()">
                    <i class="fa fa-times-circle"></i> Đóng </button>
            </div>
        </div>
        <div class="scroll" v-else>
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Chỉnh sửa thông tin tài xế</h2>
                <p>Màn hình chỉnh sửa thông tin tài xế</p>
            </div>
            <div class="frm">
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="25%">
                                <b>Họ và tên (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="user.name" def placeholder="Họ và tên" maxlength="50" required="required">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Xe đang phụ trách (*)</b>
                            </td>
                            <td>
                                <select v-model="vehicle">
                                    <option v-for="item in master.vehicle" v-if="master?.vehicle" :key="item.id" :value="item.id">{{ item.plate }}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>SĐT cá nhân (*)</b>
                            </td>
                            <td>
                                <input type="tel" v-model="user.phone" placeholder="Số điện thoại" maxlength="10" required="required">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Email</b>
                            </td>
                            <td>
                                <input type="text" v-model="user.email" placeholder="Email (nếu có)" maxlength="50">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Năm sinh (*)</b>
                            </td>
                            <td>
                                <Datepicker v-model="driverInfor.birthday" class="picker hasDatepicker"></Datepicker>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Quê quán</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.bith_place" placeholder="Quê quán.VD: Tiền Giang" maxlength="100">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số CMND/CCCD/Passport (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.passport" placeholder="Số CMND/CCCD/Passport" maxlength="30" required="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>SĐT người thân (*)</b>
                            </td>
                            <td>
                                <input type="tel" v-model="driverInfor.relative_phone" placeholder="SĐT người thân" maxlength="10" onkeypress="return checkIt(event)">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tên người thân (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.relative_name" placeholder="Tên người thân" maxlength="50">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Lương căn bản (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.salary" data-type="currency" placeholder="VD: 4,500,000" maxlength="30" required="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Phụ cấp</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.allowance" data-type="currency" placeholder="Phụ cấp. VD: 500,000" maxlength="30">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Bảo hiểm</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.insurance" data-type="currency" placeholder="VD: 800,000" maxlength="30">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tỉ lệ hoa hồng (%)</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.commission_percent" value="0" placeholder="VD: 1.5" maxlength="3">
                                <p class="tips blue2 italic">(Nếu áp dụng, mức hoa hồng sẽ được tính theo sản lượng tài xế đạt được trong tháng. Trường hợp không áp dụng nhập 0)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số năm kinh nghiệm</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.experient_year" placeholder="Số năm kinh nghiệm. VD: 5" onkeypress="return checkIt(event)" maxlength="2">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạng bằng lái (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.license_class" placeholder="Hạng bằng lái" maxlength="50" required="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số bằng lái (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.license" placeholder="Số bằng lái" maxlength="50" required="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b class="red">Giá trị bằng lái (*)</b>
                            </td>
                            <td>
                                <Datepicker v-model="driverInfor.license_expired_date" class="picker hasDatepicker"></Datepicker>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b class="red">Hạn an toàn tài xế (nếu có)</b>
                            </td>
                            <td>
                                <Datepicker v-model="driverInfor.save_date" class="picker hasDatepicker"></Datepicker>
                                <p class="tips blue2 italic">(Thời hạn an toàn của tài xế nếu có)</p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h2>THÔNG TIN HỒ SƠ XIN VIỆC</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Người nhận hồ sơ</b>
                            </td>
                            <td>
                                <input type="text" v-model="driverInfor.receive_user_id" placeholder="Người nhận hồ sơ" maxlength="50">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nhận hồ sơ gốc</b>
                            </td>
                            <td>
                                <Datepicker v-model="driverInfor.receive_date" class="picker hasDatepicker"></Datepicker>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày vào làm (*)</b>
                            </td>
                            <td>
                                <Datepicker v-model="driverInfor.start_date" class="picker hasDatepicker"></Datepicker>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nghỉ việc</b>
                            </td>
                            <td>
                                <Datepicker v-model="driverInfor.end_date" class="picker hasDatepicker"></Datepicker>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày bàn trả hồ sơ gốc</b>
                            </td>
                            <td>
                                <Datepicker v-model="driverInfor.release_date" class="picker hasDatepicker"></Datepicker>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>File hồ sơ gốc + Biên bản giao xe</b>
                            </td>
                            <td>
                                <p style="margin:0 0 10px 0">
                                    <input type="file" v-on:change="handleFileChange('cv_root_file', $event)" id="pdf_file" multiple="multiple" accept=".pdf,.doc,.docx,.xls,.xlsx">
                                    <span class="red">File scan: .pdf,.doc,.docx,.xls,.xlsx</span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Hình ảnh đính kèm</strong>
                            </td>
                            <td>
                                <input type="file" v-on:change="handleFileChange('image', $event)" id="img_file" onchange="previewImg(event,8);" multiple="multiple" accept="image/*;capture=camera">
                                <p class="tips red">Lưu ý: có thể chọn cùng lúc tối thiểu 8 hình ảnh</p>
                                <div class="view_pics"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h3>Hình ảnh đính kèm</h3>
                                <ul class="picslist">
                                    <VueLightbox :imgs="urls"></VueLightbox>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h2>THÔNG TIN ĐĂNG NHẬP</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Mật khẩu</b>
                            </td>
                            <td>
                                <div class="vpass" style="float:right;width:100%">
                                    <input type="password" v-model="driverInfor.password" id="matkhau" placeholder="Mật khẩu > 8 ký tự" maxlength="30" required="">
                                    <span class="toggpass" id="toggpass" style="height:34px;line-height:34px" title="Ẩn/Hiện mật khẩu" onclick="togglePwd('matkhau','toggpass')">
                                        <i class="fa fa-eye"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" @click="updateData()"><i class="fa fa-floppy-o"></i> Lưu thông tin </button>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script setup>
import {dispalyPlate, daysUsable} from '@/helper.js';
import { mapState, mapActions, mapMutations } from "vuex";
import VueLightbox from "@/components/VueLightbox.vue";
</script>
<script>
export default {
    props: ['master', 'isEdit', 'driverInfor'],
    emits: ['close'],
    data: function () {
        return {
            user: {
                name: this.driverInfor.user.name,
                phone: this.driverInfor.user.phone,
                email: this.driverInfor.user.email,
            },
            cv_root_file: [],
            image: [],
            urls: Object.values(this.driverInfor.addable_files).map(item => item.original_url),
            vehicle: this.driverInfor.vehicle[0]?.id,
            reload: false,
        }
    },
    computed: {
    },
    methods: {
        onClose: function () {
            this.$emit('close', this.reload)
        },
        handleFileChange(type, event) {
            this[type] = event.target.files;
        },
        updateData: function () {
            const payload = {
                ...this.driverInfor,
                ...this.user,
            }
            const { user, addable_files, vehicle, cv_root_file, ...newData } = payload;

            const formData = new FormData();
            Object.entries(newData).forEach(([key, value]) => formData.append(key, value));
            for (const file of this.cv_root_file) {
                formData.append('cv_root_file[]', file); // Use an array name for multiple files
            }
            for (const file of this.image) {
                formData.append('addable_files[]', file); // Use an array name for multiple files
            }
            formData.append('vehicles[]', this.vehicle);
            this.$store.dispatch('updateDriver', {id: this.driverInfor.id, data: formData}).then((res) => {
                if (res.data.success) {
                    this.$emit('close', true)
                }
            });
        }
    },
    created: async function () {

    }
}
</script>
