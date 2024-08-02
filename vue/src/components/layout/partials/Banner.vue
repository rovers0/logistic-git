<template>
    <div class="banner">
        <a href="/dashboard" class="logo"><img src="/logo.png"></a>
        <h1><a href="/dashboard" style="color:#fff">Phần mềm <span style="color:yellow">LogisViet</span></a><span class="slog">Hệ thống điều hành vận tải - Logistics</span></h1>
        <ul class="topplugin">
            <li><a href="./suco" title="Thông báo sự cố"><i class="fa fa-exclamation-triangle"></i> Sự cố <span class="red bold">(0)</span></a></li>
            <!-- <li><a href="./test-gps" title="Track map"><i class="fa fa-map-marker"></i> Track map</a></li> -->
            <li><a href="./lichxe" title="Xem lịch xe"><i class="fa fa-truck"></i> Lịch xe</a></li>
            <!-- <li><a href="./forum" title="Thông tin nội bộ"><i class="fa fa-bullhorn"></i> Forum</a></li> -->
            <li><a href="./sotay" title="Sổ tay cá nhân"><i class="fa fa-book"></i> Sổ tay</a></li>
            <!-- <li><a href="./soluong" title="Bảng lương cá nhân"><i class="fa fa-list-alt"></i> Sổ lương</a></li>
            <li><a href="./hotro" title="Hỗ trợ hệ thống"><i class="fa fa-question-circle"></i> Hỗ trợ</a></li> -->
        </ul>
        <div class="forum" title="Thông báo mới"><a href="javascript:void(0)" class="noticlick dropbtn" onclick="dropFunction()"><span class="sp1"><i class="fa fa-bell"></i></span></a>
            <div class="noti" id="noti">
                <h3>Thông báo gần nhất <span class="green">(0)</span></h3> <a href="./forum/" class="viewall"><i class="fa fa-list"></i> Xem tất cả thông báo</a> <a href="javascipt:void(0)" onClick="return frmForm('forum','frm',1)" class="post"><i class="fa fa fa-pencil-square"></i> Đăng bài viết mới</a>
            </div>
        </div>
        <div id="show_clock" style="float:right;color:#fff;line-height:44px;margin:0 12px 0 0"></div><span class="mbtop"><i class="fa fa-th"></i></span>
        <ul class="icmb">
            <li><a href="./lenh"><i class="fa fa-truck"></i></a></li>
            <li><a href="./vandon"><i class="fa fa-newspaper-o"></i></a></li>
            <li><a href="./baocao"><i class="fa fa-pie-chart"></i></a></li>
        </ul>
    </div>
</template>
