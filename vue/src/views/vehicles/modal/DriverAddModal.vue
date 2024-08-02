<template>
    <div class="popup popup_center">
        <div class="scroll">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thêm mới thông tin tài xế</h2>
                <p>Màn hình thêm mới thông tin tài xế</p>
            </div>
            <div class="frm">
                <p class="red" v-if="error.msg" style="text-align: center; margin: 5px 0;">{{ error.msg }}</p>
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="25%">
                                <b>Họ và tên (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.name" placeholder="Họ và tên" maxlength="50" required="required">
                                <p class="red" v-if="error.name">{{ error.name[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Xe đang phụ trách (*)</b>
                            </td>
                            <td>
                                <select v-model="insertDriver.vehicle_id">
                                    <option v-for="item in master.vehicle" v-if="master?.vehicle" :key="item.id" :value="item.id">{{ item.plate }}</option>
                                </select>
                                <p class="red" v-if="error.vehicles">{{ error.vehicles[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>SĐT cá nhân (*)</b>
                            </td>
                            <td>
                                <input type="tel" v-model="insertDriver.phone" placeholder="Số điện thoại" maxlength="10" required="required">
                                <p class="red" v-if="error.phone">{{ error.phone[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Email</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.email" placeholder="Email (nếu có)" maxlength="50">
                                <p class="red" v-if="error.email">{{ error.email[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Năm sinh (*)</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDriver.birthday" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.birthday">{{ error.birthday[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Quê quán</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.bith_place" placeholder="Quê quán.VD: Tiền Giang" maxlength="100">
                                <p class="red" v-if="error.bith_place">{{ error.bith_place[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số CMND/CCCD/Passport (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.passport" placeholder="Số CMND/CCCD/Passport" maxlength="30" required="">
                                <p class="red" v-if="error.passport">{{ error.passport[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>SĐT người thân (*)</b>
                            </td>
                            <td>
                                <input type="tel" v-model="insertDriver.relative_phone" placeholder="SĐT người thân" maxlength="10">
                                <p class="red" v-if="error.relative_phone">{{ error.relative_phone[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tên người thân (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.relative_name" placeholder="Tên người thân" maxlength="50">
                                <p class="red" v-if="error.relative_name">{{ error.relative_name[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Lương căn bản (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.salary" data-type="currency" placeholder="VD: 4,500,000" maxlength="30" required="">
                                <p class="red" v-if="error.salary">{{ error.salary[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Phụ cấp</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.allowance" data-type="currency" placeholder="Phụ cấp. VD: 500,000" maxlength="30">
                                <p class="red" v-if="error.allowance">{{ error.allowance[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Bảo hiểm</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.insurance" data-type="currency" placeholder="VD: 800,000" maxlength="30">
                                <p class="red" v-if="error.insurance">{{ error.insurance[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tỉ lệ hoa hồng (%)</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.commission_percent" value="0" placeholder="VD: 1.5" maxlength="3">
                                <p class="red" v-if="error.commission_percent">{{ error.commission_percent[0] }}</p><p v-else class="tips blue2 italic">(Nếu áp dụng, mức hoa hồng sẽ được tính theo sản lượng tài xế đạt được trong tháng. Trường hợp không áp dụng nhập 0)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số năm kinh nghiệm</b>
                            </td>
                            <td>
                                <input type="number" v-model="insertDriver.experient_year" placeholder="Số năm kinh nghiệm. VD: 5" maxlength="2">
                                <p class="red" v-if="error.experient_year">{{ error.experient_year[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạng bằng lái (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.license_class" placeholder="Hạng bằng lái" maxlength="50" required="">
                                <p class="red" v-if="error.license_class">{{ error.license_class[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số bằng lái (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="insertDriver.license" placeholder="Số bằng lái" maxlength="50" required="">
                                <p class="red" v-if="error.license">{{ error.license[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b class="red">Giá trị bằng lái (*)</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDriver.license_expired_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.license_expired_date">{{ error.license_expired_date[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b class="red">Hạn an toàn tài xế (nếu có)</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDriver.save_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.save_date">{{ error.save_date[0] }}</p><p v-else class="tips blue2 italic">(Thời hạn an toàn của tài xế nếu có)</p>
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
                                <!-- <input type="text" v-model="insertDriver.receive_user_id" placeholder="Người nhận hồ sơ" maxlength="50"> -->
                                <select v-model="insertDriver.receive_user_id">
                                    <option v-for="item in master.receive_user" v-if="master?.receive_user" :key="item.id" :value="item.id">{{ item.name }}-{{ item.phone }}</option>
                                </select>
                                <p class="red" v-if="error.receive_user">{{ error.receive_user[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nhận hồ sơ gốc</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDriver.receive_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.receive_date">{{ error.receive_date[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày vào làm (*)</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDriver.start_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.start_date">{{ error.start_date[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nghỉ việc</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDriver.end_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.end_date">{{ error.end_date[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày bàn trả hồ sơ gốc</b>
                            </td>
                            <td>
                                <Datepicker v-model="insertDriver.release_date" class="picker hasDatepicker"></Datepicker>
                                <p class="red" v-if="error.release_date">{{ error.release_date[0] }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>File hồ sơ gốc + Biên bản giao xe</b>
                            </td>
                            <td>
                                <p style="margin:0 0 10px 0">
                                    <input type="file" v-on:change="handleFileChange('cv_root_file', $event)" id="pdf_file" multiple="multiple" accept=".pdf,.doc,.docx,.xls,.xlsx">
                                    <p class="red" v-if="error.cv_root_file">{{ error.cv_root_file[0] }}</p><span v-else class="red">File scan: .pdf,.doc,.docx,.xls,.xlsx</span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Hình ảnh đính kèm</strong>
                            </td>
                            <td>
                                <input type="file" v-on:change="handleFileChange('image', $event)" id="img_file" onchange="previewImg(event,8);" multiple="multiple" accept="image/*;capture=camera">
                                <p class="red" v-if="error.addable_files">{{ error.addable_files[0] }}</p><p v-else class="tips red">Lưu ý: có thể chọn cùng lúc tối thiểu 8 hình ảnh</p>
                                <div class="view_pics"></div>
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
                                    <input type="password" v-model="insertDriver.password" id="matkhau" placeholder="Mật khẩu > 8 ký tự" maxlength="30" required="">
                                    <span class="toggpass" id="toggpass" style="height:34px;line-height:34px" title="Ẩn/Hiện mật khẩu" onclick="togglePwd('matkhau','toggpass')">
                                        <i class="fa fa-eye"></i>
                                    </span>
                                </div>
                                <p class="red" v-if="error.password">{{ error.password[0] }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" @click="insertData(insertDriver)"><i class="fa fa-floppy-o"></i> Lưu thông tin </button>
            </div>
        </div>
    </div>
</template>
<style scoped ></style>
<script setup>
import { formatBeforeRequest } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'isMooc', 'master'],
    emits: ['close'],
    data: function () {
        return {
            error: {},
            cv_root_file: [],
            image: [],
            reload: false,
            insertDriver: this.$store.state.driver.addNew,
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
            console.log(event.target.files);
        },
        insertData: function (data) {
            const formData = new FormData();
            const payload = formatBeforeRequest(data);
            Object.entries(payload).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value)
                }
            });
            for (const file of this.cv_root_file) {
                formData.append('cv_root_file[]', file);
            }
            for (const file of this.image) {
                formData.append('addable_files[]', file);
            }
            formData.append('vehicles[]', data.vehicle_id);

            this.$store.dispatch('addDriverNew', formData).then((res) => {console.log(res);
                if (res.data.success) {
                    this.$emit('close', true)
                } else if (res.data.code == 422) {
                    this.error = res.data.errors
                } else {
                    this.error = {}
                    this.error.msg = res.data.message
                }
            });
        }
    },
    created: async function () {

    }
}
</script>
