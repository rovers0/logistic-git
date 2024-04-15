<template>
    <div class="popup popup_full popup_center">
        <div class="scroll" v-if="isMooc">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thêm mới Số Sơ mi rơ mooc</h2>
                <p>Màn hình thêm mới thông tin Số Sơ mi rơ mooc</p>
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
                                <input type="text" name="ds[vitri_3P1]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRQMQ')" style="color:#006080">4P1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_4P1]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzVQMQ')" style="color:#006080">5P1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_5P1]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                        </tr>
                        <tr>
                            <td width="40%"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzNQMg')" style="color:#006080">3P2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_3P2]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRQMg')" style="color:#006080">4P2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_4P2]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzVQMg')" style="color:#006080">5P2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_5P2]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">
                                <h2 style="padding:30px 0;margin:0">RƠ MOOC: 15R12736</h2>
                            </td>
                        </tr>
                        <tr>
                            <td width="40%"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzNUMg')" style="color:#006080">3T2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_3T2]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRUMg')" style="color:#006080">4T2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_4T2]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
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
                                <input type="text" name="ds[vitri_3T1]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVSMTI3MzZfX19fXzRfX19fXzRUMQ')" style="color:#006080">4T1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000;opacity:0.3">Seri number: <span class="red">Chưa cập nhật</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_4T1]" value="" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
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
                <input type="hidden" name="code" value="NF9fX19fMTVSMTI3MzY">
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="20%">
                                <b>Số sơ mi rơ mooc</b>
                            </td>
                            <td>
                                <input type="text" v-model="vehicleInfor.serial" placeholder="Nhập số sơ mi rơ mooc" maxlength="30" required="required">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số khung</b>
                            </td>
                            <td>
                                <input type="text" v-model="vehicleInfor.frame_number" placeholder="Nhập số khung" maxlength="100">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Bãi đậu</b>
                            </td>
                            <td>
                                <select v-model="vehicleInfor.packing_id" class="green">
                                    <option :value="null">Chọn bãi đậu</option>
                                    <option value="1">Bãi xe 1</option>
                                    <option value="2">Bãi xe 2</option>
                                    <option value="3">Bãi xe 3</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tải trọng KG (*)</b>
                            </td>
                            <td>
                                <input type="text" v-model="vehicleInfor.weight" placeholder="Nhập số KG. VD:30,000" maxlength="7" required="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Kích cỡ (*)</b>
                            </td>
                            <td>
                                <select v-model="vehicleInfor.size" required="">
                                    <option :value="null">Kích cỡ mooc?</option>
                                    <option value="0">Mooc 20</option>
                                    <option value="1">Mooc 40</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Loại mooc (*)</b>
                            </td>
                            <td>
                                <select v-model="vehicleInfor.type" required="">
                                    <option :value="null">Loại mooc?</option>
                                    <option value="0">Mooc sàn</option>
                                    <option value="1">Mooc sương</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số trục (*)</b>
                            </td>
                            <td>
                                <select v-model="vehicleInfor.axis" required="">
                                    <option :value="null">Số trục?</option>
                                    <option value="0">2 trục</option>
                                    <option value="1">3 trục</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ghi chú</b>
                            </td>
                            <td>
                                <textarea name="ds[ghichu]" v-model="vehicleInfor.note" placeholder="Ghi chú thông tin trang thiết bị (nếu có)..." maxlength="500"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hình ảnh đính kèm</b>
                            </td>
                            <td>
                                <p style="margin:10px 0 0 0;float:left;clear:both;width:100%">
                                    <input type="file" v-on:change="handleFileChange('images', $event)" onchange="previewImg(event,8);" id="img_file" multiple="multiple" accept="image/*">
                                </p>
                                <p class="red" style="padding:5px 0 0 0">Lưu ý: có thể chọn cùng lúc tối thiểu 20 hình ảnh mỗi lượt thêm (&lt;=10MB)</p>
                                <div class="view_pics"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>File đính kèm (nếu có)</b>
                            </td>
                            <td>
                                <input type="file" v-on:change="handleFileChange('addable_files', $event)" accept=".pdf,.doc,.docx,.xls,.xlsx">
                                <p style="padding:5px 0 0 0;color:red">File định dạng: .pdf,.doc,.docx,.xls,.xlsx (Được chọn cùng lúc nhiều file)</p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h3>Hình ảnh</h3>
                                <ul class="picslist">
                                    <VueLightbox :imgs="urls"></VueLightbox>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <button type="submit" @click="updateData()" style="float:none">
                                    <i class="fa fa-floppy-o"></i> Lưu thông tin </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="scroll" v-else>
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Cập nhật thông tin xe</h2>
                <p>Màn hình cập nhật thông tin xe</p>
            </div>
            <div class="frm table_cont" style="padding-top:0">
                <table class="tablecont" style="width:100%;background:#d9e9fa">
                    <tbody>
                        <tr>
                            <td rowspan="2" width="25%">
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzFQMQ')" style="color:#006080">1P1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:5px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_1P1]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td rowspan="2" style="background:#fff;border-top:1px solid #ffff"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQMQ')" style="color:#006080">2P1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2P1]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQMw')" style="color:#006080">2P3 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2P3]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQMg')" style="color:#006080">2P2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2P2]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJQNA')" style="color:#006080">2P4 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2P4]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center" style="padding:30px 0;margin:0">
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzA')">
                                    <h2 style="color:#000">VỊ TRÍ LỐP ĐẦU CÁI: {{vehicleInfor.plate}}</h2>
                                    <p class="bold blue2">Tổng thay: <b class="red">2</b> - Tổng sửa: <b class="red">0</b>
                                    </p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" width="25%">
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzFUMQ')" style="color:#006080">1T1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:5px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_1T1]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td rowspan="2" style="background:#fff;border-top:1px solid #ffff"></td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUMQ')" style="color:#006080">2T1 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2T1]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUNA')" style="color:#006080">2T4 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2T4]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUMg')" style="color:#006080">2T2 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2T2]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="onOpenTireInformationModal('MTVIMDI5ODVfX19fXzRfX19fXzJUMw')" style="color:#006080">2T3 - Thay: <b class="red" style="opacity:0.3">0</b> - Sữa: <b class="red" style="opacity:0.3">0</b>
                                    <p style="font-size:10px;padding:4px 0 0 0;color:#000">Seri number: <span class="red">0</span>
                                    </p>
                                </a>
                                <input type="text" name="ds[vitri_2T3]" value="0" style="height:24px;margin:4px 0 0 0" placeholder="Nhập số seri" maxlength="30">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="frm">
                <input type="hidden" name="code" value="NF9fX19fMTVIMDI5ODU">
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="20%">
                                <b>Biển số xe</b>
                            </td>
                            <td>
                                <input type="text" v-model="vehicleInfor.plate" placeholder="Nhập biển số xe" maxlength="15" required="required">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số khung</b>
                            </td>
                            <td>
                                <input type="text" v-model="vehicleInfor.chassis" placeholder="Nhập số khung" maxlength="100">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số máy</b>
                            </td>
                            <td>
                                <input type="text" v-model="vehicleInfor.seri" value="" placeholder="Nhập số máy" maxlength="100">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số cầu (*)</b>
                            </td>
                            <td>
                                <select v-model="vehicleInfor.axle" required="required">
                                    <option value="">Chọn loại xe</option>
                                    <option value="1">Xe 1 cầu</option>
                                    <option value="2">Xe 2 cầu</option>
                                    <option value="0">Chưa xác định</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Bãi đậu</b>
                            </td>
                            <td>
                                <select v-model="vehicleInfor.parking_lot" required="" class="green">
                                    <option value="">Chọn bãi đậu</option>
                                    <option value="1">Bãi xe 1</option>
                                    <option value="2">Bãi xe 2</option>
                                    <option value="3">Bãi xe 3</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Cổ đông xe (*)</b>
                            </td>
                            <td>
                                <select name="cd" class="select selectized" required="" tabindex="-1" style="display: none;">
                                    <option value="MF9fX19fMF9fX19fWGUgbmjDoA" selected="selected">(0) Xe nhà</option>
                                </select>
                                <div class="selectize-control select single plugin-remove_button">
                                    <div class="selectize-input items required full has-options has-items">
                                        <span vehicleInfor-value="MF9fX19fMF9fX19fWGUgbmjDoA">
                                            <div class="item">(0) Xe nhà</div>
                                            <a href="javascript:void(0)" class="remove-single" tabindex="-1" title="Remove">×</a>
                                        </span>
                                        <input type="select-one" autocomplete="off" tabindex="" style="width: 4px;">
                                    </div>
                                    <div class="selectize-dropdown single select plugin-remove_button" style="display: none; width: 1052.88px; top: 34px; left: 0px;">
                                        <div class="selectize-dropdown-content"></div>
                                    </div>
                                </div>
                                <p class="tips blue2 italic">(Chọn xe nhà hoặc xe từ cổ đông đầu tư)</p>
                            </td>
                        </tr>
                        <!--
            <tr><td><b>Tài xế phụ trách</b></td><td><select name="tx" class="select" placeholder="Chọn tài xế"><option value="">Chọn tài xế</option><option value="1_____Nguyễn Văn Hậu">Nguyễn Văn Hậu</option><option value="2_____Lại Ngọc Hoằng">Lại Ngọc Hoằng</option><option value="3_____Nguyễn Thế Hanh">Nguyễn Thế Hanh</option><option value="4_____Vũ Tuấn Trường">Vũ Tuấn Trường</option></select></td></tr>
            -->
                        <tr>
                            <td>
                                <b>Ghi chú</b>
                            </td>
                            <td>
                                <textarea v-model="vehicleInfor.note" placeholder="Ghi chú thông tin trang thiết bị (nếu có)..." maxlength="500">Xe Trung Quốc / ChengLong</textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hình ảnh xe</b>
                            </td>
                            <td>
                                <p style="margin:10px 0 0 0;float:left;clear:both;width:100%">
                                    <input type="file" v-on:change="handleFileChange('images', $event)" id="img_file" onchange="previewImg(event,8);" multiple="multiple" accept="image/*">
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
                                <h3>Hình ảnh</h3>
                                <ul class="picslist">
                                    <VueLightbox :imgs="urls"></VueLightbox>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <button type="submit" @click="updateData()" style="margin:0 auto;float:none">
                                    <i class="fa fa-floppy-o"></i> Lưu thông tin </button>
                            </td>
                        </tr>
                    </tbody>
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
import TireInformationModal from "./TireInformationModal.vue";
</script>
<script>
export default {
    props: ['vehicleInfor', 'isMooc'],
    emits: ['close'],
    data: function () {
        return {
            images: [],
            addable_files: [],
            openTireInformationModal: false,
            reload: false,
            urls: Object.values(this.vehicleInfor?.images).map(item => item.original_url),
        }
    },
    computed: {
        // ...mapState({
        //     master: state => state.achievement.master,
        // }),
    },
    methods: {
        onOpenTireInformationModal: function (serial) {
            this.openTireInformationModal = true
        },
        onCloseTireInformationModal: function () {
            this.openTireInformationModal = false
        },
        handleFileChange(type, event) {
            this[type] = event.target.files;
        },
        updateData: function () {
            const payload = {
                ...this.vehicleInfor,
            }
            const { user, addable_files, parking, images, ...newData } = payload;

            const formData = new FormData();
            Object.entries(newData).forEach(([key, value]) => formData.append(key, value));
            for (const file of this.images) {
                formData.append('images[]', file);
            }
            for (const file of this.addable_files) {
                formData.append('addable_files[]', file);
            }
            this.$store.dispatch( this.isMooc ? 'updateMooc' : 'updateVehicle', {id: this.vehicleInfor.id, data: formData}).then((res) => {
                if (res.data.success) {
                    this.$emit('close', true)
                }
            });
        },
        onClose: function () {
            this.$emit('close', this.reload)
        },
    },
    created: async function () {

    }
}
</script>
