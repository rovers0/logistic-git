<template>
    <div id="page">
        <div class="hright">
            <div class="hb1">
                <ul class="hb">
                    <li class="bl1"> <a href="./vandon" title="Xem vận đơn">
                            <div class="hblock hb2"> <span class="ic"><i class="fa fa-folder-open"></i></span>
                                <h2>Vận đơn</h2> <span class="note_tips">Tháng 03/2024</span>
                                <h3>94</h3>
                            </div>
                        </a> </li>
                    <li class="bl2"> <a href="./lenh" title="Xem lệnh điều động">
                            <div class="hblock hb2"> <span class="ic bg2"><i class="fa fa-truck"></i></span>
                                <h2>Điều động</h2> <span class="note_tips">Tháng 03/2024</span>
                                <h3>120</h3>
                            </div>
                        </a>
                        <p style="clear:both;bottom:8px;right:5%;text-align:right;position:absolute;color:#999;font-size:11px">Xe nhà: <a href="./lenh" style="color:#000">75 <i class="fa fa-eye"></i></a> - Xe ngoài: <a href="./congnonhaxe" style="color:#000">45 <i class="fa fa-eye"></i></a></p>
                    </li>
                    <li class="fix bl3"> <a href="./phieuchi" title="Xem danh sách phiếu chi hôm nay">
                            <div class="hblock hb2"> <span class="ic bg3"><i class="fa fa-usd"></i></span>
                                <h2>Phiếu chi</h2> <span class="note_tips">Tháng 03/2024</span>
                                <h3>173,617,405</h3>
                            </div>
                        </a> </li>
                </ul>
            </div>
            <div class="hbtk">
                <ul class="hbtku">
                    <li> <a href="javascript:void(0)">
                            <div class="hblocktk"> <span class="ic1" style="background:#ff1493"><i class="fa fa-usd"></i></span>
                                <h3>Tiền vào</h3>
                                <h4 style="color:#ff1493">478,360,800</h4>
                                <p style="text-align:right;color:#999">Tháng 03/2024: <span class="red">(78)</span> giao dịch</p>
                            </div>
                        </a> </li>
                    <li class="fix"> <a href="javascript:void(0)">
                            <div class="hblocktk"> <span class="ic1 ic2" style="background:#2196f3"><i class="fa fa-usd"></i></span>
                                <h3>Tiền ra</h3>
                                <h4 style="color:#2196f3">320,892,925</h4>
                                <p style="text-align:right;color:#999">Tháng 03/2024: <span class="red">(91)</span> giao dịch</p>
                            </div>
                        </a> </li>
                </ul>
            </div>
            <div class="hbtk">
                <ul class="hbtku">
                    <li> <a href="/dashboard#txonoff">
                            <div class="hblocktk"> <span class="ic1"><i class="fa fa-users"></i></span>
                                <h3>Tài xế <span class="green">(4)</span></h3>
                                <h4>Đăng nhập: <span>2</span></h4>
                            </div>
                        </a> </li>
                    <li class="fix"> <a href="javascript:void(0)">
                            <div class="hblocktk"> <span class="ic1 ic2"><i class="fa fa-car"></i></span>
                                <h3>Tổng xe <span class="green">(4)</span></h3>
                                <h4><span class="red">Chưa tích hợp GPS</span></h4>
                            </div>
                        </a> </li>
                </ul>
            </div>
        </div>
        <div class="hleft">
            <div class="hbd">
                <div class="hblock hblock2">
                    <div class="htitle">
                        <h3>
                            <i class="fa fa-calendar"></i> Lịch xe chạy hôm nay
                        </h3>
                    </div>
                    <div class="table">
                        <table width="100%">
                            <thead>
                                <tr>
                                    <th width="2%">STT</th>
                                    <th>Tên tài xế</th>
                                    <th>Số xe - Rơmooc</th>
                                    <th width="8%">Thời gian</th>
                                    <th>Tuyến vận chuyển</th>
                                    <th width="5%">Neo xe</th>
                                </tr>
                            </thead>
                            <tbody> </tbody>
                        </table>
                    </div>
                </div>
                <div class="hblock hblock3">
                    <div class="htitle">
                        <h3>
                            <i class="fa fa-calendar"></i> Lịch xe chạy ngày mai
                        </h3>
                    </div>
                    <div class="table">
                        <table width="100%">
                            <thead>
                                <tr>
                                    <th width="2%">STT</th>
                                    <th>Tên tài xế</th>
                                    <th>Số xe - Rơmooc</th>
                                    <th width="8%">Thời gian</th>
                                    <th>Tuyến vận chuyển</th>
                                    <th width="5%">Neo xe</th>
                                </tr>
                            </thead>
                            <tbody> </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- <div class="hblock" style="margin:14px 0 0 0">
                <div class="htitle">
                    <h3><i class="fa fa-bullhorn"></i> Tin tức nội bộ gần nhất <a href="./forum/" title="Xem tất cả"><i class="fa fa-th-list"></i> Xem tất cả</a></h3>
                </div>
            </div> -->
            <div class="hblock" id="txonoff" style="margin:14px 0 0 0">
                <div class="htitle">
                    <h3><i class="fa fa-users"></i> Phiên đăng nhập từ tài xế</h3>
                </div>
                <ul class="useronline">
                    <li> <span class="avt_tx user_avt">NH</span>
                        <h4 class="h4tx"><a href="javascript:void(0)" onclick="return frmForm('home','log_list','MV9fX19fX19fX18wX19fX19OZ3V54buFbiBWxINuIEjhuq11')">Nguyễn Văn Hậu</a></h4>
                        <p>Đăng nhập: 25-01-2024 10:14:05 <i class="fa fa-cog fa-spin green"></i></p>
                    </li>
                    <li> <span class="avt_tx user_avt">NH</span>
                        <h4 class="h4tx"><a href="javascript:void(0)" onclick="return frmForm('home','log_list','M19fX19fX19fX18wX19fX19OZ3V54buFbiBUaOG6vyBIYW5o')">Nguyễn Thế Hanh</a></h4>
                        <p>Đăng nhập: 25-01-2024 11:35:51 <i class="fa fa-cog fa-spin green"></i></p>
                    </li>
                </ul>
            </div>
            <div class="hblock" style="margin:14px 0">
                <div class="htitle">
                    <h3><i class="fa fa-users"></i> Phiên đăng nhập từ khách hàng</h3>
                </div>
                <ul class="useronline">
                    <li> <span class="user_avt">AT</span>
                        <h4><a href="javascript:void(0)" onclick="return frmForm('home','log_list','Ml9fX19fR3Vlc3RfX19fXzJfX19fX0EgVG_DoG4')">CÔNG TY CỔ PHẦN THƯƠNG MẠI XUẤT NHẬP KHẨU AN NGỌC CƯỜNG <i style="color:#000;font-size:11px">(Xem công nợ)</i></a></h4>
                        <p>Đăng nhập: 23-01-2024 21:27:24 <i class="fa fa-cog fa-spin green"></i></p>
                    </li>
                    <li> <span class="user_avt" style="background:#e5e5e5;color:#b7b7b7">AT</span>
                        <h4><a href="javascript:void(0)" onclick="return frmForm('home','log_list','MV9fX19fR3Vlc3RfX19fXzJfX19fX0EgVG_DoG4')" style="color:#b7b7b7">CÔNG TY CỔ PHẦN THƯƠNG MẠI XUẤT NHẬP KHẨU AN NGỌC CƯỜNG <i style="color:#000;font-size:11px">(Xem đơn hàng)</i></a></h4>
                        <p>Đăng nhập: 23-01-2024 21:26:11 - Thoát: 23-01-2024 21:27:03</p>
                    </li>
                </ul>
            </div>
            <div class="hblock">
                <div class="htitle">
                    <h3><i class="fa fa-users"></i> Phiên đăng nhập từ cổ đông</h3>
                </div>
                <ul class="useronline"> </ul>
            </div>
        </div>
        <div class="hright">
            <div class="hblock bllx" style="margin:0 0 14px 0">
                <div class="htitle">
                    <h3><i class="fa fa-credit-card"></i> Phiếu chi chờ duyệt <span class="red">(9)</span></h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="1%">STT</th>
                                <th width="1%">Code</th>
                                <th width="15%">Ngày lập</th>
                                <th width="15%">Ngày chi</th>
                                <th width="30%">Người lập</th>
                                <th>Số tiền</th>
                                <th width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">5</td>
                                <td>458</td>
                                <td>20-03-2024</td>
                                <td>20-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,450,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDU4X19fX18xNjVfX19fXzIwMjQtMDMtMjBfX19fXzAzX19fX18yMDI0','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">6</td>
                                <td>459</td>
                                <td>20-03-2024</td>
                                <td>20-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,306,800</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDU5X19fX18xNjVfX19fXzIwMjQtMDMtMjBfX19fXzAzX19fX18yMDI0','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">7</td>
                                <td>453</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,040,040</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDUzX19fX18xNjVfX19fXzIwMjQtMDMtMTlfX19fXzAzX19fX18yMDI0','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">8</td>
                                <td>454</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">900,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDU0X19fX18xNjVfX19fXzIwMjQtMDMtMTlfX19fXzAzX19fX18yMDI0','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">9</td>
                                <td>455</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">900,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDU1X19fX18xNjVfX19fXzIwMjQtMDMtMTlfX19fXzAzX19fX18yMDI0','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">10</td>
                                <td>456</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">900,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDU2X19fX18xNjVfX19fXzIwMjQtMDMtMTlfX19fXzAzX19fX18yMDI0','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">11</td>
                                <td>457</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">850,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDU3X19fX18xNjVfX19fXzIwMjQtMDMtMTlfX19fXzAzX19fX18yMDI0','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">12</td>
                                <td>450</td>
                                <td>18-03-2024</td>
                                <td>18-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">23,616,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDUwX19fX183M19fX19fMjAyNC0wMy0xOF9fX19fMDNfX19fXzIwMjQ','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">13</td>
                                <td>449</td>
                                <td>18-03-2024</td>
                                <td>16-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,130,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NDQ5X19fX182OF9fX19fMjAyNC0wMy0xNl9fX19fMDNfX19fXzIwMjQ','phieuchi','viewPhieuChi')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock bllx" style="margin:0 0 14px 0">
                <div class="htitle">
                    <h3><i class="fa fa-credit-card"></i> Phiếu thu chờ duyệt <span class="red">(14)</span></h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="1%">STT</th>
                                <th width="1%">Code</th>
                                <th width="15%">Ngày lập</th>
                                <th width="15%">Ngày chi</th>
                                <th width="30%">Người lập</th>
                                <th>Số tiền</th>
                                <th width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">14</td>
                                <td>588</td>
                                <td>21-03-2024</td>
                                <td>21-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">0</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTg4X19fX18xM19fX19fMjAyNC0wMy0yMV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">15</td>
                                <td>589</td>
                                <td>21-03-2024</td>
                                <td>21-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">0</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTg5X19fX18xM19fX19fMjAyNC0wMy0yMV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">16</td>
                                <td>577</td>
                                <td>20-03-2024</td>
                                <td>20-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,296,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTc3X19fX18yNF9fX19fMjAyNC0wMy0yMF9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">17</td>
                                <td>578</td>
                                <td>20-03-2024</td>
                                <td>20-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,250,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTc4X19fX18yNF9fX19fMjAyNC0wMy0yMF9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">18</td>
                                <td>579</td>
                                <td>20-03-2024</td>
                                <td>20-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">13,089,600</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTc5X19fX18yNF9fX19fMjAyNC0wMy0yMF9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">19</td>
                                <td>566</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,760,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTY2X19fX18yNF9fX19fMjAyNC0wMy0xOV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">20</td>
                                <td>570</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">2,650,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTcwX19fX18yNF9fX19fMjAyNC0wMy0xOV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">21</td>
                                <td>572</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">0</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTcyX19fX18xM19fX19fMjAyNC0wMy0xOV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">22</td>
                                <td>573</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">14,256,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTczX19fX18xM19fX19fMjAyNC0wMy0xOV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">23</td>
                                <td>574</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">1,280,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTc0X19fX18yNF9fX19fMjAyNC0wMy0xOV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">24</td>
                                <td>575</td>
                                <td>19-03-2024</td>
                                <td>19-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">0</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTc1X19fX18xM19fX19fMjAyNC0wMy0xOV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">25</td>
                                <td>561</td>
                                <td>18-03-2024</td>
                                <td>16-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">7,192,800</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTYxX19fX18yNF9fX19fMjAyNC0wMy0xNl9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">26</td>
                                <td>567</td>
                                <td>19-03-2024</td>
                                <td>15-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">900,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTY3X19fX18yNF9fX19fMjAyNC0wMy0xNV9fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                            <tr>
                                <td align="center">27</td>
                                <td>591</td>
                                <td>21-03-2024</td>
                                <td>07-03-2024</td>
                                <td>Nguyễn Thùy Chi</td>
                                <td class="red">2,600,000</td>
                                <td align="center"><a href="javascript:void(0)" title="Chi tiết" onclick="viewPhieuChi('NTkxX19fX18yNF9fX19fMjAyNC0wMy0wN19fX19fMDNfX19fXzIwMjQ','thu','viewPhieuThu')"> <i class="fa fa-eye"></i> Xem</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock bllx" style="margin:0 0 14px 0">
                <div class="htitle">
                    <h3><i class="fa fa-credit-card"></i> Tạm ứng chờ duyệt <span class="red">(0)</span></h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="1%">STT</th>
                                <th width="1%">Code</th>
                                <th width="15%">Ngày lập</th>
                                <th width="15%">Ngày ứng</th>
                                <th width="30%">Người lập</th>
                                <th>Số tiền</th>
                                <th width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody> </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock bllx">
                <div class="htitle">
                    <h3><i class="fa fa-calendar"></i> Lịch xe chạy từ <span class="green">21-03-2024</span> đến <span class="green">28-03-2024</span></h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="2%">STT</th>
                                <th>Tên tài xế</th>
                                <th>Số xe - Rơmooc</th>
                                <th width="8%">Ngày V.chuyển</th>
                                <th>Tuyến vận chuyển</th>
                                <th width="5%">Neo xe</th>
                            </tr>
                        </thead>
                        <tbody> </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock" style="margin:14px 0 0 0">
                <div class="htitle">
                    <h3><i class="fa fa-calendar"></i> Xe đang trống từ <span class="green">21-03-2024</span> đến <span class="green">28-03-2024</span></h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="2%">STT</th>
                                <th>Biển số xe</th>
                                <th>Tài xế phụ trách</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">1</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','detail','MV9fX19fMTVDMTc2Njk')" class="bold">15C17669</a></td>
                                <td>Nguyễn Văn Hậu</td>
                            </tr>
                            <tr>
                                <td align="center">2</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','detail','Ml9fX19fMTVDMjUyOTI')" class="bold">15C25292</a></td>
                                <td>Nguyễn Thế Hanh</td>
                            </tr>
                            <tr>
                                <td align="center">3</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','detail','M19fX19fMTVDMjYzMjg')" class="bold">15C26328</a></td>
                                <td>Vũ Tuấn Trường</td>
                            </tr>
                            <tr>
                                <td align="center">4</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','detail','NF9fX19fMTVIMDI5ODU')" class="bold">15H02985</a></td>
                                <td>Lại Ngọc Hoằng</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock" style="margin:14px 0 0 0">
                <div class="htitle">
                    <h3><i class="fa fa-cog"></i> Xe đang sửa chữa</h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="2%">STT</th>
                                <th width="20%">Ngày đề xuất</th>
                                <th>Biển số xe</th>
                                <th>Garage sửa chữa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">1</td>
                                <td align="center">2023-11-05</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('dexuat','detail','MTlfX19fXzIwMjMtMTEtMDVfX19fXzFfX19fXzE1SDAyOTg1X19fX18w')" class="bold">15H02985</a></td>
                                <td>Xưởng Quang Hợp</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock" style="margin:14px 0 0 0">
                <div class="htitle">
                    <h3><i class="fa fa-calendar"></i> Rơ mooc đang trống từ <span class="green">21-03-2024</span> đến <span class="green">28-03-2024</span></h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="2%">STT</th>
                                <th>Biển số</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">1</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','mooc_detail','MV9fX19fMTVSMTM3OTc')" class="bold">15R13797</a></td>
                            </tr>
                            <tr>
                                <td align="center">2</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','mooc_detail','Ml9fX19fMTVSMDc4MzI')" class="bold">15R07832</a></td>
                            </tr>
                            <tr>
                                <td align="center">3</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','mooc_detail','M19fX19fMTVSMTAzODI')" class="bold">15R10382</a></td>
                            </tr>
                            <tr>
                                <td align="center">4</td>
                                <td><a href="javascript:void(0)" onclick="return frmForm('xe','mooc_detail','NF9fX19fMTVSMTI3MzY')" class="bold">15R12736</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock" style="margin:14px 0 0 0">
                <div class="htitle">
                    <h3><i class="fa fa-cog"></i> Rơ mooc đang sửa chữa</h3>
                </div>
                <div class="table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th width="2%">STT</th>
                                <th width="20%">Ngày đề xuất</th>
                                <th>Biển số</th>
                                <th>Garage sửa chữa</th>
                            </tr>
                        </thead>
                        <tbody> </tbody>
                    </table>
                </div>
            </div>
            <div class="hblock" style="margin:14px 0">
                <div class="htitle">
                    <h3><i class="fa fa-users"></i> Phiên đăng nhập gần nhất</h3>
                </div>
                <ul class="useronline">
                    <li> <span class="user_avt">NC</span>
                        <h4><a href="javascript:void(0)" onclick="return frmForm('home','log_list','OTBfX19fXzRfX19fXzFfX19fX05ndXnhu4VuIFRow7l5IENoaQ')">Nguyễn Thùy Chi</a></h4>
                        <p>Đăng nhập: 21-03-2024 10:33:23 <img src="/images/icons/on.gif"></p>
                    </li>
                    <li> <span class="user_avt">VV</span>
                        <h4><a href="javascript:void(0)" onclick="return frmForm('home','log_list','OTVfX19fXzEwX19fX18xX19fX19WdG0')">Vtm</a></h4>
                        <p>Đăng nhập: 21-03-2024 13:17:46 <img src="/images/icons/on.gif"></p>
                    </li>
                    <li> <span class="user_avt" style="background:#e5e5e5;color:#b7b7b7">AA</span>
                        <h4><a href="javascript:void(0)" onclick="return frmForm('home','log_list','NTlfX19fXzBfX19fXzFfX19fX0FkbWluaXN0cmF0b3I')" style="color:#b7b7b7">Administrator</a></h4>
                        <p>Đăng nhập: 06-03-2024 22:21:03 - Thoát: 07-03-2024 09:08:15</p>
                    </li>
                    <li> <span class="user_avt" style="background:#e5e5e5;color:#b7b7b7">NT</span>
                        <h4><a href="javascript:void(0)" onclick="return frmForm('home','log_list','ODFfX19fXzFfX19fXzFfX19fX05ndXnhu4VuIE3huqFuaCBUw7luZw')" style="color:#b7b7b7">Nguyễn Mạnh Tùng</a></h4>
                        <p>Đăng nhập: 17-03-2024 18:30:15 - Thoát: 17-03-2024 22:25:37</p>
                    </li>
                    <li> <span class="user_avt" style="background:#e5e5e5;color:#b7b7b7">ND</span>
                        <h4><a href="javascript:void(0)" onclick="return frmForm('home','log_list','ODZfX19fXzExX19fX18xX19fX19OZ3V54buFbiBI4buvdSBE4bulbmc')" style="color:#b7b7b7">Nguyễn Hữu Dụng</a></h4>
                        <p>Đăng nhập: 20-03-2024 10:36:46 - Thoát: 20-03-2024 14:12:57</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
</script>
<script>
export default {
    el: '#page',
    data: function () {
        return {

        }
    },
    mounted: function () {
        this.loadScript()
    },
    methods: {
        loadScript: function () {
            let files = [
                'js/home.js',
            ];

            files.forEach((file, i) => {
                let script = document.createElement('script')
                script.setAttribute('src', file)
                this.$el.appendChild(script)
            });
        }
    }
}
</script>
