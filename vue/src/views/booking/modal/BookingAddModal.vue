<template>
    <div class="popup popup_center">
        <div class="contvc" :class="insertBooking.booking.fee_transport_type == 3 ? 'scroll' : ''">
            <span class="close_pop" @click="onClose">×</span>
            <div class="pophead">
                <h2>Vận chuyển</h2>
                <p>Vui lòng kiểm tra đầy đủ thông tin một cách chính xác</p>
            </div>
            <div class="table frm" style="width:98%">
                <form enctype="multipart/form-data">
                    <table>
                        <tbody>
                            <tr>
                                <td><b style="font-size:17px">Đối tác vận chuyển</b></td>
                                <td>
                                    <div style="width:100%;float:left">
                                        <label for="nx1" class="checkbox chk1">Xe nhà
                                            <input type="checkbox" v-model="insertBooking.booking.is_home_vehicle" id="nx1" style="float:left;margin:0 4px 0 0">
                                            <span class="checkmark2"></span>
                                        </label>

                                        <label for="nx2" class="checkbox chk2">Điều thêm xe ngoài?
                                            <input type="checkbox" v-model="insertBooking.booking.is_has_partner" id="nx2" style="float:left;margin:0 4px 0 0">
                                            <span class="checkmark2"></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="insertBooking.booking.is_home_vehicle" id="cont_vc1">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <th colspan="2">
                                        <h3 style="font-size:17px;text-transform:uppercase">Thông tin vận chuyển xe nhà</h3>
                                    </th>
                                </tr>
                                <tr>
                                    <td width="24%"><b>Loại phí vận chuyển (*)</b></td>
                                    <td>
                                        <select v-model="insertBooking.booking.fee_transport_type" required="">
                                            <option :value="null">Chọn loại phí vận chuyển áp dụng</option>
                                            <!-- <option value="1">Từ giá hợp đồng</option>
                                            <option value="2">Từ bảng giá chung</option> -->
                                            <option value="3">Giá tự nhập</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody id="tgbook_option">
                                <template v-if="insertBooking.booking.fee_transport_type == 1">
                                    <tr>
                                        <td width="24%"><b>Khách hàng (*)</b></td>
                                        <td><input type="text" class="green" @click="openSelectContractModal" placeholder="Chọn khách hàng" maxlength="255" required="" readonly=""></td>
                                    </tr>
                                    <tr>
                                        <td width="20%"><b>Tuyến vận chuyển (*)</b></td>
                                        <td id="filter_tuyen"><input type="text" name="ds[tuyenvanchuyen]" id="tuyenvanchuyen" class="green bold" placeholder="Chọn tuyến vận chuyển" disabled=""></td>
                                    </tr>
                                </template>
                                <template v-else-if="insertBooking.booking.fee_transport_type == 2">
                                    <tr v-if="customerInfo.short_name" class="hidepax" style="">
                                        <td colspan="2">
                                            <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-user"></i> Thông tin khách hàng</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="24%"><b>Khách hàng (*)</b></td>
                                        <td><input type="text" v-model="customerInfo.short_name" class="green" @click="openSelectCustomerModal" placeholder="Chọn khách hàng" maxlength="255" required="" readonly=""></td>
                                    </tr>
                                    <template v-if="customerInfo.short_name">
                                        <tr class="hidepax" style="">
                                            <td><b>Công ty/ Đơn vị (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.name" class="green" placeholder="Tên đơn vị xuất hóa đơn" required="" maxlength="255" readonly=""></td>
                                        </tr>
                                        <tr class="hidepax" style="">
                                            <td><b>Số điện thoại (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.phone" class="green" placeholder="Số điện thoại khách hàng" required="" maxlength="15" readonly=""></td>
                                        </tr>
                                        <tr class="hidepax" style="">
                                            <td><b>Địa chỉ (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.address" class="green" placeholder="Địa chỉ xuất hóa đơn" required="" maxlength="255" readonly=""></td>
                                        </tr>
                                        <tr class="hidepax" style="">
                                            <td><b>Mã số thuế (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.tax_no" class="green" placeholder="Mã số thuế" required="" maxlength="15" readonly=""></td>
                                        </tr>
                                    </template>
                                    <tr>
                                        <td width="20%"><b>Tuyến vận chuyển (*)</b></td>
                                        <td>
                                            <Dropdown v-model="insertBooking.route.id" :options="routes" filter optionLabel="name" placeholder="Chọn tuyến vận chuyển" class="green bold" style="width: 50%;">
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value">
                                                        <div>{{ slotProps.value.name }}</div>
                                                    </div>
                                                    <span v-else>
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div>
                                                        <div>{{ slotProps.option.name }}</div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <a href="javascript:void(0)" @click="addRoute" style="border-radius: 3px;padding: 9px;background: #006080;color: #fff;float: right"><i class="fa fa-plus"></i> Thêm</a>
                                            <input type="text" v-model="shipBrandAdd" placeholder="Nhập tuyến" style="width:30%;float:right;margin:0 1% 0 0;">
                                        </td>
                                    </tr>
                                </template>
                                <template v-else-if="insertBooking.booking.fee_transport_type == 3">
                                    <tr class="hidepax" style="display:none">
                                        <td colspan="2">
                                            <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-user"></i> Thông tin khách hàng</h3>
                                        </td>
                                    </tr>
                                    <tr v-if="customerInfo.short_name" class="hidepax" style="">
                                        <td colspan="2">
                                            <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-user"></i> Thông tin khách hàng</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="24%"><b>Khách hàng (*)</b></td>
                                        <td><input type="text" v-model="customerInfo.short_name" class="green" @click="openSelectCustomerModal" placeholder="Chọn khách hàng" maxlength="255" required="" readonly=""></td>
                                    </tr>
                                    <template v-if="customerInfo.short_name">
                                        <tr class="hidepax" style="">
                                            <td><b>Công ty/ Đơn vị (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.name" class="green" placeholder="Tên đơn vị xuất hóa đơn" required="" maxlength="255" readonly=""></td>
                                        </tr>
                                        <tr class="hidepax" style="">
                                            <td><b>Số điện thoại (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.phone" class="green" placeholder="Số điện thoại khách hàng" required="" maxlength="15" readonly=""></td>
                                        </tr>
                                        <tr class="hidepax" style="">
                                            <td><b>Địa chỉ (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.address" class="green" placeholder="Địa chỉ xuất hóa đơn" required="" maxlength="255" readonly=""></td>
                                        </tr>
                                        <tr class="hidepax" style="">
                                            <td><b>Mã số thuế (*)</b></td>
                                            <td><input type="text" v-model="customerInfo.tax_no" class="green" placeholder="Mã số thuế" required="" maxlength="15" readonly=""></td>
                                        </tr>
                                    </template>
                                    <tr>
                                        <td colspan="2">
                                            <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-info-circle"></i> Thông tin đơn hàng</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="20%"><b>Tuyến vận chuyển (*)</b></td>
                                        <td>
                                            <Dropdown v-model="insertBooking.route" :options="routes" filter optionLabel="name" placeholder="Chọn tuyến vận chuyển" class="green bold" style="width: 50%;">
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value">
                                                        <div>{{ slotProps.value.name }}</div>
                                                    </div>
                                                    <span v-else>
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div>
                                                        <div>{{ slotProps.option.name }}</div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <a href="javascript:void(0)" @click="addRoute" style="border-radius: 3px;padding: 9px;background: #006080;color: #fff;float: right"><i class="fa fa-plus"></i> Thêm</a>
                                            <input type="text" v-model="routeAdd" placeholder="Nhập tuyến" style="width:30%;float:right;margin:0 1% 0 0;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Số lượng Cont/Hàng (*)</b></td>
                                        <td>
                                            <input type="number" v-model="insertBooking.invoice.quantity" min="1" max="50" class="slnb" required="" placeholder="VD: 1">
                                            <b style="float:left;line-height:34px;margin:0 5px 0 5px">Loại cont/ĐVT:</b>
                                            <input type="text" v-model="insertBooking.invoice.cont_type" id="loaicont" class="lcbn" required="" placeholder="VD: 40-DC">
                                            <b style="float:left;line-height:34px;margin:0 5px 0 5px">Đơn giá:</b>
                                            <input type="text" v-model="insertBooking.invoice.price" id="dongia" data-type="currency" class="dgnb" required="" placeholder="VD: 3,650,000">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Loại hàng (*)</b></td>
                                        <td>
                                            <select v-model="insertBooking.invoice.product_type" required="">
                                                <option :value="null">Loại hàng</option>
                                                <option value="1">Nhập</option>
                                                <option value="2">Xuất</option>
                                                <option value="3">Nội địa</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b class="red">Hãng tàu (*)</b></td>
                                        <td>
                                            <Dropdown v-model="selectedShipBrand" @change="setCarrierId" :options="shipBrands" filter optionLabel="name" placeholder="Chọn hãng tàu" style="width: 50%;">
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value">
                                                        <div>{{ slotProps.value.name }}</div>
                                                    </div>
                                                    <span v-else>
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div>
                                                        <div>{{ slotProps.option.name }}</div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <a href="javascript:void(0)" @click="addBrand" style="border-radius: 3px;padding: 9px;background: #006080;color: #fff;float: right"><i class="fa fa-plus"></i> Thêm</a>
                                            <input type="text" v-model="shipBrandAdd" placeholder="Nhập hãng tàu" style="width:30%;float:right;margin:0 1% 0 0;">
                                            <p class="tips blue2 italic">(Tên hãng tàu nơi lấy cont hàng hoặc hạ cont hàng. Nếu chưa có tên sẵn vui lòng nhập)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Số hiệu tàu/Mác tàu</b></td>
                                        <td><input type="text" v-model="insertBooking.invoice.carrier_number" placeholder="Số hiệu tàu/Mác tàu" maxlength="50">
                                            <p class="tips blue2 italic">(Nhập số hiệu tàu hoặc Mác tàu nhận diện nếu có)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="20%"><b>Ngày giờ vận chuyển (*)</b></td>
                                        <td>
                                            <Datepicker class="picker nvc hasDatepicker" v-model="delivery.date" placeholder="Chọn ngày"></Datepicker>
                                            <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                            <input type="number" v-model="delivery.hour" value="00" min="0" max="23" maxlength="2" onkeypress="checkIt(event)" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                            <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                            <input type="number" v-model="delivery.minute" value="00" min="0" max="59" maxlength="2" onkeypress="checkIt(event)" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Phút" style="width:10%;float:left" required="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Cắt máng/Xuống hàng (*)</b></td>
                                        <td>
                                            <Datepicker class="picker nvc hasDatepicker" v-model="cutoff.date" placeholder="Chọn ngày"></Datepicker>
                                            <b style="float:left;line-height:34px;margin:0 5px 0 5px">Giờ:</b>
                                            <input type="number" v-model="cutoff.hour" value="00" min="0" max="23" maxlength="2" onkeypress="checkIt(event)" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Giờ" style="width:10%;float:left;margin:0 1% 0 0" required="">
                                            <b style="float:left;line-height:34px;margin:0 5px 0 0">Phút:</b>
                                            <input type="number" v-model="cutoff.minute" value="00" min="0" max="59" maxlength="2" onkeypress="checkIt(event)" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Phút" style="width:10%;float:left" required="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="bold">Phương thức điều lệnh (*)</td>
                                        <td>
                                            <select v-model="insertBooking.invoice.method_command" required="" style="float:left;width:38%">
                                                <option value="1">Phương thức điều lệnh</option>
                                                <option value="1">Nhập số lệnh</option>
                                                <option value="2">Điều lệnh theo tài xế</option>
                                            </select>
                                            <div v-if="insertBooking.invoice.method_command == 1">
                                                <input type="number" v-model="insertBooking.invoice.method_command_number" min="0" max="100" style="width:35%;float:right" class="red nvc3" placeholder="Nhập số lệnh cần điều xe" maxlength="3" required="">
                                                <b style="float:right;line-height:34px;margin:0 5px 0 5px">Số lệnh điều động (*)</b>
                                            </div>
                                            <div v-else>
                                                <input type="text" v-model="driversInfo.name" id="tentaixe" @click="openDriverSelectModal" style="width:35%;float:right" class="red nvc3" readonly="" placeholder="Chọn tài xế" required="">
                                                <b style="float:right;line-height:34px;margin:0 5px 0 5px">Điều trước tài xế (*)</b>
                                            </div>
                                            <p style="color:red;padding:4px 0 0 0"><i class="fa fa-info-circle"></i> Điều lệnh bằng phương thức tự nhập số lệnh hoặc chọn trước tài xế</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Số Booking/Bill (*)</b></td>
                                        <td><input type="text" v-model="insertBooking.invoice.booking_code" placeholder="Nhập số Booking/Bill" maxlength="255" required=""></td>
                                    </tr>
                                    <tr>
                                        <td><b class="red">Lương tài xế (*)</b></td>
                                        <td><input type="text" v-model="insertBooking.invoice.driver_salary" data-type="currency" placeholder="VD: 1,000,000" maxlength="30" required=""></td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0" colspan="2">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th width="1%">STT</th>
                                                        <th>Mã cont</th>
                                                        <th>Mã Seal</th>
                                                        <th width="30%">Gross weight (KGS)<br><i>(Tổng trọng lượng container + Hàng hóa)</i></th>
                                                        <th width="1%">#</th>
                                                    </tr>
                                                </tbody>
                                                <tbody class="body_cont_seal">
                                                    <tr v-for="(item, i) in insertBooking.conts" class="row_cont_seal">
                                                        <td align="center">{{ i + 1 }}</td>
                                                        <td><input type="text" v-model="item.code" placeholder="Nhập mã cont" maxlength="100" required=""></td>
                                                        <td><input type="text" v-model="item.seal" placeholder="Nhập mã seal (nếu có)" maxlength="100"></td>
                                                        <td><input type="text" v-model="item.gross" placeholder="Tổng trọng lượng (nếu có)" maxlength="15"></td>
                                                        <td><a href="javascript:void(0)" @click="removeRowContSeal(i)" title="Xóa dòng" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colspan="2">
                                            <a href="javascript:void(0)" @click="addRowContSeal" style="border-radius: 3px;padding: 7px;display: inline-block;background: #006080;color: #fff;"><i class="fa fa-plus"></i> Thêm mã cont</a>
                                            <p class="tips blue2 italic" style="padding: 5px 0 0 0">(Nhập trước danh sách mã cont, mã seal nếu có. Số lượng mã cont/seal tỷ lệ (bằng) với số lệnh điều động)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-truck"></i> Nhiệm vụ vận chuyển</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Lấy rỗng/Lấy cont hàng nhập</b></td>
                                        <td>
                                            <input type="text" v-model="insertBooking.taskTransports.get_null_point" placeholder="Điểm lấy rỗng/Lấy cont hàng nhập" required="required" maxlength="255" style="width:49%;float:left">
                                            <input type="text" v-model="insertBooking.taskTransports.get_null_point_request" placeholder="Yêu cầu" maxlength="255" style="width:45%;float:right" required="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Đóng hàng/Giao hàng</b></td>
                                        <td>
                                            <input type="text" v-model="insertBooking.taskTransports.shipping_point" placeholder="Điểm đóng hàng/ Giao hàng" required="required" maxlength="255" style="width:49%;float:left">
                                            <input type="text" v-model="insertBooking.taskTransports.shipping_point_request" placeholder="Yêu cầu" maxlength="255" style="width:45%;float:right" required="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Cảng hạ chờ xuất/Trả rỗng</b></td>
                                        <td>
                                            <input type="text" v-model="insertBooking.taskTransports.return_null_point" placeholder="Nơi cảng hạ chờ xuất/ Trả rỗng" required="required" maxlength="255" style="width:49%;float:left">
                                            <input type="text" v-model="insertBooking.taskTransports.return_null_point_request" placeholder="Yêu cầu" maxlength="255" style="width:45%;float:right" required="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Ghi chú (nếu có)</b></td>
                                        <td><input type="text" v-model="insertBooking.booking.note" placeholder="Ghi chú (nếu có)" maxlength="255"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <h3 style="font-size:16px;color:#000;padding:4px 0"><i class="fa fa-map-marker"></i> Thông tin hành trình (nếu có)</h3>
                                            <p class="tips blue2 italic">(Cập nhập vị trí để hiển thị thông tin hành trình, khoảng cách, thời gian dự đoán, tình trạng giao thông,...)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Điểm bắt đầu</b></td>
                                        <td><input type="search" v-model="insertBooking.invoice.location_start" placeholder="Vị trí bắt đầu" maxlength="500" class="pac-target-input" autocomplete="off"></td>
                                    </tr>
                                    <tr>
                                        <td><b>Điểm đến</b></td>
                                        <td><input type="search" v-model="insertBooking.invoice.location_end" placeholder="Điểm đến" maxlength="500" class="pac-target-input" autocomplete="off"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="padding:0">
                                            <table class="body_waypoint">
                                                <tr v-for="(item, i) in insertBooking.trips" class="tr_waypoint">
                                                    <td width="24%"><b class="green">Điểm dừng {{ i + 1 }}</b></td>
                                                    <td><input type="search" v-model="item.point" id="'waypoints_1'" style="width:93%;background:#c9f2dd" class="pac-target-input" placeholder="Nhập vị trí" autocomplete="off"> <a href="javascript:void(0)" @click="removeWayPoint(i)" title="Xóa điểm" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colspan="2">
                                            <a href="javascript:void(0)" @click="addWayPoint" style="border-radius: 3px;padding: 7px;display: inline-block;background: #006080;color: #fff;"><i class="fa fa-plus"></i> Thêm điểm dừng</a>
                                            <p class="tips blue2 italic" style="padding: 5px 0 0 0">(Thêm điểm dừng, điểm trung chuyển hoặc điểm nối chuyến)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Upload files</b></td>
                                        <td>
                                            <div class="body_file">
                                                <div v-for="(item, i) in rowFiles" class="body_file_tr" style="width:100%;float:left">
                                                    <span style="position:relative;width:86px;height:34px;display: inline-block;line-height: 34px;float: left;background: #0c8885;text-align: center;font-weight: bold;color: #fff;border-radius: 3px;">
                                                        <i class="fa fa-plus"></i> Chọn file <input type="file" name="pdf_file[]" id="file_1" onchage="getFileName('file_1','show_name_id_1')" accept=".pdf,.doc,.docx,.xls,.xlsx" style="opacity:0;position:absolute;left: 0;top: 0;width: 86px;height: 26px;">
                                                    </span>
                                                    <div style="width:83.5%;float:right">
                                                        <div style="width:91.5%;float: left">
                                                            <Dropdown v-model="selectedShipBrand" @change="setCarrierId" :options="shipBrands" filter optionLabel="name" placeholder="Chọn hoặc nhập tên file...">
                                                                <template #value="slotProps">
                                                                    <div v-if="slotProps.value">
                                                                        <div>{{ slotProps.value.name }}</div>
                                                                    </div>
                                                                    <span v-else>
                                                                        {{ slotProps.placeholder }}
                                                                    </span>
                                                                </template>
                                                                <template #option="slotProps">
                                                                    <div>
                                                                        <div>{{ slotProps.option.name }}</div>
                                                                    </div>
                                                                </template>
                                                            </Dropdown>
                                                        </div>
                                                        <a href="javascript:void(0)" style="display:block;float:right;width:34px;height:34px;line-height:34px;text-align:center;color:red;font-size:1.3rem" @click="removeRowFile(i)"><i class="fa fa-trash"></i></a>
                                                    </div>
                                                    <div id="show_name_id_1" style="padding:5px 0;color:red;clear:both"></div>
                                                </div>
                                            </div>
                                            <p><a href="javascript:void(0)" title="Thêm file" @click="addRowFile"><i class="fa fa-plus"></i> Thêm dòng</a></p>
                                            <p class="tips blue2 italic" style="padding: 5px 0 0 0">(Upload file đính kèm và đặt tên file nhận diện)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Chụp/upload hình ảnh duyệt lệnh</b></td>
                                        <td>
                                            <input type="file" id="img_file" accept="image/*" @change="getImageUpload" multiple="multiple">
                                            <p style="padding:5px 0 0 0;color:red">Upload file hình hoặc chụp ảnh xác nhận lệnh (Có hoặc không)</p>
                                            <div class="view_pics"></div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>

                            <tbody id="tgbook">

                            </tbody>
                        </table>
                    </div>
                    <div v-if="insertBooking.booking.is_has_partner" id="cont_vc2">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <th colspan="2">
                                        <h3 style="font-size:17px;text-transform:uppercase">Thông tin vận chuyển xe ngoài</h3>
                                        <span style="font-size:12px;color:red;padding:5px 0 0 0;display:block"><i class="fa fa-info-circle"></i> Lưu ý: Không thể điều thêm xe ngoài nếu không điều xe nhà</span>
                                    </th>
                                </tr>

                                <tr>
                                    <td width="22%"><b>Đối tác nhà xe có sẵn (*)</b></td>
                                    <td>
                                        <Dropdown v-model="insertBooking.booking.partner_id" :options="partners" filter optionLabel="name" placeholder="[Chọn đối tác nhà xe]" class="select2 selectized" style="width: 100%;">
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value">
                                                    <div>{{ slotProps.value.short_name }} - {{ slotProps.value.name }} - ({{ slotProps.value.phone }})</div>
                                                </div>
                                                <span v-else>
                                                    {{ slotProps.placeholder }}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                                <div>
                                                    <div>{{ slotProps.option.short_name }} - {{ slotProps.option.name }} - ({{ slotProps.option.phone }})</div>
                                                </div>
                                            </template>
                                        </Dropdown>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Số lượng Cont (*)</b></td>
                                    <td>
                                        <input type="number" v-model="insertBooking.booking.partner_cont_quantity" placeholder="VD: 2" min="1" max="100" maxlength="3" onkeypress="checkIt(event)" oninput="this.value=this.value.replace(/[^0-9]/g,'');" class="txtslc" required="">
                                        <b style="float:left;line-height:34px;margin:0 5px 0 10px">Số lệnh:</b>
                                        <input type="number" v-model="insertBooking.booking.partner_cont_type" min="1" max="100" placeholder="Số lệnh xe" onkeypress="return checkIt(event)" maxlength="3" required="" class="txtsldd red">

                                        <div class="didg">
                                            <b class="bdg">Đơn giá (*):</b>
                                            <input type="text" v-model="insertBooking.booking.partner_price" data-type="currency" placeholder="VD: 2,450,000" class="txtdg" required="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Ghi chú thêm (*)</b></td>
                                    <td>
                                        <input type="text" v-model="insertBooking.booking.partner_note" maxlength="255" placeholder="Nội dung" required="">
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <p>&nbsp;</p>
                    <button type="button" @click="addBooking" :class="insertBooking.booking.fee_transport_type < 3 ? 'hidden' : ''" style="margin:0 auto;float:none" id="step7_submit"><i class="fa fa-floppy-o"></i> Lưu thông tin vận đơn</button>
                </form>
            </div>
        </div>
    </div>
    <div class="screen screen2"></div>
    <SelectContractModal v-if="showSelectContractModal" :data="null" @close="closeSelectContractModal"></SelectContractModal>
    <SelectCustomerModal v-if="showSelectCustomerModal" :data="customers" @onSubmit="setSelecedCustomer" @close="closeSelectCustomerModal"></SelectCustomerModal>
    <SelectDriverModal v-if="showDriverSelectModal" :data="drivers" @onSubmit="setSelecedDrivers" @close="closeDriverSelectModal"></SelectDriverModal>
</template>

<style scoped>
.hidden {
    display: none;
}

.dp__main {
    width: 51%;
    float: left;
}
</style>
<script setup>
import moment from 'moment';
import { mapState, mapActions, mapMutations } from "vuex";
import SelectContractModal from './SelectContractModal.vue';
import SelectCustomerModal from './SelectCustomerModal.vue';
import SelectDriverModal from './SelectDriverModal.vue';
import Dropdown from 'primevue/dropdown';
</script>
<script>
export default {
    props: ['data'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            cv_root_file: [],
            image: [],
            insertBooking: this.$store.state.booking.addNew,
            showSelectContractModal: false,
            showSelectCustomerModal: false,
            showDriverSelectModal: false,
            customers: this.$props.data.customers,
            drivers: [],
            customerInfo: {},
            driversInfo: [],
            rowFiles: [],
            shipBrands: this.$props.data.carriers,
            routes: this.$props.data.routes,
            partners: this.$props.data.partners,
            selectedShipBrand: null,
            shipBrandAdd: null,
            routeAdd: null,
            delivery: {date:null},
            cutoff: {date:null}
        }
    },
    computed: {

    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        openSelectContractModal: function () {
            this.showSelectContractModal = true;
        },
        closeSelectContractModal: function () {
            this.showSelectContractModal = false;
        },
        openSelectCustomerModal: function () {
            this.showSelectCustomerModal = true;
        },
        closeSelectCustomerModal: function () {
            this.showSelectCustomerModal = false;
        },
        openDriverSelectModal: function () {
            this.$store.dispatch("getDriverAll").then((res) => {
                this.drivers = res.data.data;
                this.showDriverSelectModal = true;
            });
        },
        closeDriverSelectModal: function () {
            this.showDriverSelectModal = false;
        },
        setSelecedCustomer: function (customer) {
            this.customerInfo = customer;
            this.insertBooking.booking.customer_id = customer.id;
        },
        addRowContSeal: function () {
            this.insertBooking.conts.push({
                code: null,
                seal: null,
                gross: null
            });
        },
        removeRowContSeal: function (index) {
            this.insertBooking.conts.splice(index, 1);
        },
        addWayPoint: function () {
            this.insertBooking.trips.push({
                point: null,
            });
        },
        removeWayPoint: function (index) {
            this.insertBooking.trips.splice(index, 1);
        },
        addRowFile: function () {
            this.rowFiles.push({
                waypoints: null,
            });
        },
        removeRowFile: function (index) {
            this.rowFiles.splice(index, 1);
        },
        addBrand: function () {
            let data = { name: this.shipBrandAdd };
            this.$store.dispatch("addBrand", data).then((res) => {
                this.shipBrands = res.data.data;
                this.shipBrandAdd = null;
            });
        },
        addRoute: function () {
            let data = { name: this.routeAdd };
            this.$store.dispatch("addRoute", data).then((res) => {
                this.routes = res.data.data;
                this.routeAdd = null;
            });
        },
        setSelecedDrivers: function (drivers) {
            this.driversInfo.name = drivers.map(driver => {
                return driver.user.name;
            }).join(', ');
            this.insertBooking.drivers = drivers.map(driver => {
                return driver.id;
            });
        },
        addBooking: function () {
            this.insertBooking.invoice.time_transport = this.handleTime(this.delivery);
            this.insertBooking.invoice.time_down_the_line = this.handleTime(this.cutoff);
            this.insertBooking.booking.is_home_vehicle = +this.insertBooking.booking.is_home_vehicle;
            this.insertBooking.booking.is_has_partner = +this.insertBooking.booking.is_has_partner;
            let data = { ...this.insertBooking };
            const formData = this.objectToFormData(data);
            this.$store.dispatch("addBooking", formData).then((res) => {
                if (res.data.code == 200) {
                    this.$emit('onSubmit');
                    this.onClose();
                } else {
                    alert('Có lỗi xảy ra! Vui lòng thử lại sau.')
                }
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
        setCarrierId: function () {
            this.insertBooking.invoice.carrier_id = this.selectedShipBrand.id;
        },
        getImageUpload: function (e) {
            if (e.target.files) {
                this.insertBooking.images = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    this.insertBooking.images.push(e.target.files[i]);
                }
            }
        },
        objectToFormData: function(obj, formData, parentKey) {
            formData = formData || new FormData();
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let propName = parentKey ? `${parentKey}[${key}]` : key;
                    if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
                        this.objectToFormData(obj[key], formData, propName);
                    } else if (Array.isArray(obj[key])) {
                        obj[key].forEach((item, index) => {
                            this.objectToFormData(item, formData, `${propName}[${index}]`);
                        });
                    } else {
                        formData.append(propName, obj[key]);
                    }
                }
            }
            return formData;
        }
    },
    created: async function () {

    }
}
</script>
