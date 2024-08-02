<template>
    <div class="popup popup_center">
        <span class="close_pop" @click="onClose">×</span>
        <template v-if="data.step == 1">
            <div class="pophead">
                <h2>Lấy cont hàng</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy cont hàng (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <template v-for="cont in data.detail.conts">
                                <tr>
                                    <td width="23%"><b>Nhập số cont (*)</b></td>
                                    <td><input type="text" v-model="cont.code" placeholder="Nhập mã số cont" required=""></td>
                                </tr>
                                <tr>
                                    <td><b>Nhập số seal (*)</b></td>
                                    <td><input type="text" v-model="cont.seal" placeholder="Nhập mã số seal" required=""></td>
                                </tr>
                            </template>
                            <tr>
                                <td><b>Hình ảnh Lấy cont hàng (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple="" @change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 2">
            <div class="pophead">
                <h2>Cắt mooc/Xuống hàng</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Cắt mooc/Xuống hàng (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Cắt mooc/Xuống hàng (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple="" @change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 3">
            <div class="pophead">
                <h2>Lấy cont rỗng đi hạ</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy cont rỗng đi hạ (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Lấy cont rỗng đi hạ (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple="" @change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 4">
            <div class="pophead">
                <h2>Hạ bãi</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Hạ bãi (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Hạ bãi (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple="" @change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 5">
            <div class="pophead">
                <h2>Lấy rỗng</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy rỗng (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td width="23%"><b>Nhập số cont (*)</b></td>
                                <td><input type="text" name="macont" value="C2" placeholder="Nhập mã số cont" required=""></td>
                            </tr>
                            <tr>
                                <td><b>Nhập số seal (*)</b></td>
                                <td><input type="text" name="soseal" value="S5678" placeholder="Nhập mã số seal" required=""></td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Lấy rỗng (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple="" @change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 6">
            <div class="pophead">
                <h2>Cắt rỗng/Đóng hàng</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Cắt rỗng/Đóng hàng (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Cắt rỗng/Đóng hàng (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple=""@change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 7">
            <div class="pophead">
                <h2>Lấy cont hàng đi hạ</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Lấy cont hàng đi hạ (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Lấy cont hàng đi hạ (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple=""@change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
                        <button type="button" @click="onClose" class="close_btn" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-times-circle"></i> Đóng lại!</button>
                    </div>
                </form>
            </div>
        </template>
        <template v-else-if="data.step == 8">
            <div class="pophead">
                <h2>Hạ bãi</h2>
                <p><b>Lưu ý:</b> <span class="red">Nhập hình ảnh và ngày giờ chính xác</span></p>
            </div>
            <div class="table frm" style="width:100%">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td width="23%"><b>Ngày giờ Hạ bãi (*)</b></td>
                                <td>
                                    <Datepicker class="picker nvc hasDatepicker" v-model="step.date" placeholder="Chọn ngày" style="width:30%;float:left" autocomplete="off"></Datepicker>
                                    <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                    <input type="number" v-model="step.hour" min="0" max="23" maxlength="2" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                    <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                    <input type="number" v-model="step.minute" min="0" max="59" maxlength="2" placeholder="Phút" style="width:10%;float:left" required="">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h3><i class="fa fa-user"></i> Tên tài xế: {{ data.detail.drivers_infor?.name }} - <span class="red">{{ data.detail.drivers_infor?.phone }}</span></h3>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Hình ảnh Hạ bãi (*)</b></td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" accept="image/*;capture=camera" multiple=""@change="getImageUpload">
                                    <p style="padding:5px 0 0 0;color:red">Chụp hình trực tiếp nếu chỉ có 1 ảnh. Hoặc chọn cùng lúc nhiều ảnh liên quan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="width:100%;float:left;margin:8px 0 0 0;text-align:center">
                        <button type="button" @click="updateStep" style="float:none;text-align: center;display: inline-block;"><i class="fa fa-floppy-o"></i> Lưu thông tin</button>
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
</script>
<script>
export default {
    props: ['data'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            step: {
                date: this.$props.data.detail.invoice.time_transport ? moment(this.$props.data.detail.invoice.time_transport).utc(true) : moment().utc(true),
                hour: this.$props.data.detail.invoice.time_transport ? moment(this.$props.data.detail.invoice.time_transport).format('HH') : moment().format('HH'),
                minute: this.$props.data.detail.invoice.time_transport ? moment(this.$props.data.detail.invoice.time_transport).format('mm') : moment().format('mm')
            },
            images: []
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        getImageUpload: function (e) {
            if (e.target.files) {
                this.images = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    this.images.push(e.target.files[i]);
                }
            }
        },
        updateStep: function () {
            // let formData = objectToFormData(this.$props.data.detail.conts);
            let formData = new FormData();
            let funcName = '';
            formData.append('time', this.handleTime(this.step));
            formData.append('driver_id', this.$props.data.detail.driver_id);
            for (let i = 0; i < this.images.length; i++) {
                formData.append('images[]', this.images[i]);
            }
            for (let i = 0; i < this.$props.data.detail.conts.length; i++) {
                formData.append('conts['+ i +'][code]', this.$props.data.detail.conts[i]['code']);
                formData.append('conts['+ i +'][seal]', this.$props.data.detail.conts[i]['seal']);
            }
            switch (this.$props.data.step) {
                case 1:
                case 5:
                    funcName = 'updateGetContGood';
                    break;
                case 2:
                case 6:
                    funcName = 'updateCutMoocDownGood';
                    break;
                case 3:
                case 7:
                    funcName = 'updateGetContEmpty';
                    break;
                case 4:
                case 8:
                    funcName = 'updateDownPacking';
                    break;
            }
            this.$store.dispatch(funcName, {id: this.$props.data.detail.id, data: formData}).then((res) => {
                this.$emit('onSubmit');
                this.onClose();
            });
        },
        handleTime: function (obj) {
            let date = obj.date;
            let hour = obj.hour ? obj.hour : '00';
            let minute = obj.minute ? obj.minute : '00';
            if (date) {
                date = moment(obj.date).format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':00';
                return date;
            }
            return null;
        },
    },
    created: async function () {

    }
}
</script>
