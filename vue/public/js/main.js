function dropFunction() {
    document.getElementById("noti").classList.toggle("show")
}

function togglePwd(e, t) {
    e = document.getElementById(e), t = document.getElementById(t);
    "password" === e.type ? (e.type = "text", t.innerHTML = '<i class="fa fa-eye-slash"></i>') : (e.type = "password", t.innerHTML = '<i class="fa fa-eye"></i>')
}

function checkAll(e, t) {
    var n = document.getElementsByName(e),
        t = document.getElementById(t);
    if (1 == t.value) {
        for (var a = 0; a < n.length; a++) n[a].checked = !0;
        t.value = 0
    } else {
        for (a = 0; a < n.length; a++) n[a].checked = !1;
        t.value = 1
    }
}

function checkAllMenu(e, t, n) {
    var a = t.checked;
    $(e + " input." + n).each(function() {
        this.checked = a
    })
}

function toggleCheck(e, t) {
    checkboxes = document.getElementsByName(t);
    for (var n = 0, a = checkboxes.length; n < a; n++) checkboxes[n].checked = e.checked
}

function checkAllMenuInput(e, t) {
    var n = t.checked;
    $(e + ' input[type="checkbox"]').each(function() {
        this.checked = n
    })
}

function frmNhanSu() {
    return $.ajax({
        type: "POST",
        url: root + "nhansu/nv",
        data: "action=frmNhanSu",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), DinhDangTien()
        }
    }), !1
}

function AddNhanSu() {
    var e = document.frm_nhansu,
        t = isWhiteSpace(e.hoten.value),
        n = isWhiteSpace(e.email.value),
        a = isWhiteSpace(e.dienthoai.value),
        o = isWhiteSpace(e.matkhau.value),
        i = isWhiteSpace(e.chucvu.value),
        c = e.email.value;
    if (1 == t || e.hoten.value.length < 2) return alert("Vui lòng nhập đầy đủ họ và tên!"), $("#hoten").focus(), !1;
    if (1 == n || "" == e.email.value) return alert("Vui lòng nhập đúng đại chỉ Email!"), $("#email").focus(), !1;
    if ("" == c || !c.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) return alert("Vui lòng nhập đúng đại chỉ Email!"), $("#email").focus(), !1;
    if (1 == a || e.dienthoai.value.length < 10) return alert("Vui lòng nhập số điện thoại!"), $("#dienthoai").focus(), !1;
    if (1 == o || e.matkhau.value.length < 8) return alert("Vui lòng nhập mật khẩu lớn hơn 8 ký tự!"), $("#matkhau").focus(), !1;
    if (1 == i || "-1" == e.chucvu.value) return alert("Vui lòng chọn chức vụ!"), $("#chucvu").focus(), !1;
    i = document.getElementById("frm_nhansu"), e = $("#file").prop("files")[0], i = new FormData(i);
    return i.append("file", e), $.ajax({
        type: "POST",
        url: root + "nhansu/addnv",
        data: i,
        cache: !1,
        dataType: "html",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:1000"></div>')
        },
        success: function(e) {
            1 == e && (alert("Thêm mới nhân sự thành công"), location.reload()), 0 == e && (alert("Có lỗi, vui lòng F5 và thử lại!"), location.reload())
        }
    }), !1
}

function EditNhanSu(t) {
    return $.ajax({
        type: "POST",
        url: root + "nhansu/edit",
        data: "id=" + t + "&action=EditNhanSu",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $(".e_" + t).attr("src", "template/Default/images/spinner.gif")
        },
        success: function(e) {
            $(".screen").remove(), $(".e_" + t).attr("src", "template/Default/images/edit-1.png"), $("body").prepend(e + '<div class="screen screen2"></div>'), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            }), DinhDangTien()
        }
    }), !1
}

function ResetPass(e) {
    return $.ajax({
        type: "POST",
        url: root + "nhansu/reset",
        data: "id=" + e + "&action=ResetPass",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function UpdatePass() {
    var e = document.frm_UpdatePass,
        t = isWhiteSpace(e.matkhau.value),
        n = isWhiteSpace(e.matkhau_2.value);
    if (1 == t || e.matkhau.value.length < 8) return alert("Vui lòng nhập mật khẩu lớn hơn 8 ký tự!"), $("#matkhau").focus(), !1;
    if (1 == n || e.matkhau_2.value.length < 8) return alert("Mật khẩu xác nhận phải lớn hơn 8 ký tự!"), $("#matkhau_2").focus(), !1;
    if (e.matkhau.value != e.matkhau_2.value) return alert("Mật khẩu xác nhận phải giống nhau!"), $("#matkhau_2").focus(), !1;
    n = $("form[name=frm_UpdatePass]").serialize(), e = $("#frm_UpdatePass").attr("data-id");
    return $.ajax({
        type: "POST",
        url: root + "nhansu/uppass",
        data: n + "&id=" + e + "&action=UpdatePass",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:1000"></div>')
        },
        success: function(e) {
            1 == e && (alert("Mật khẩu đã được thay đổi"), location.reload()), 0 == e && (alert("Thông tin không tồn tại, vui lòng thử lại!"), location.reload()), 2 == e && (alert("Có lỗi, vui lòng F5 và thử lại!"), location.reload())
        }
    }), !1
}

function UpdateNhanSu() {
    var e = document.frm_UpdateNhanSu,
        t = isWhiteSpace(e.hoten.value),
        n = isWhiteSpace(e.email.value),
        a = isWhiteSpace(e.dienthoai.value),
        o = isWhiteSpace(e.chucvu.value),
        i = e.email.value;
    if (1 == t || e.hoten.value.length < 2) return alert("Vui lòng nhập đầy đủ họ và tên!"), $("#hoten").focus(), !1;
    if (1 == n || "" == e.email.value) return alert("Vui lòng nhập đúng đại chỉ Email!"), $("#email").focus(), !1;
    if ("" == i || !i.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) return alert("Vui lòng nhập đúng đại chỉ Email!"), $("#email").focus(), !1;
    if (1 == a || e.dienthoai.value.length < 10) return alert("Vui lòng nhập số điện thoại!"), $("#dienthoai").focus(), !1;
    if (1 == o || "-1" == e.chucvu.value) return alert("Vui lòng chọn chức vụ!"), $("#chucvu").focus(), !1;
    $("#frm_UpdateNhanSu").attr("data-id");
    o = document.getElementById("frm_UpdateNhanSu"), e = $("#file").prop("files")[0], o = new FormData(o);
    return o.append("file", e), $.ajax({
        type: "POST",
        url: root + "nhansu/upnv",
        data: o,
        cache: !1,
        dataType: "html",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:1000"></div>')
        },
        success: function(e) {
            1 == e && (alert("Cập nhật thông tin nhân sự thành công"), location.reload()), 3 == e && (alert("File hình phải ở định dạng: JPG, JPEG, PNG"), location.reload()), 4 == e && (alert("Dung lượng File hình phải < 8MB"), location.reload()), 0 == e && (alert("Thông tin không tồn tại, vui lòng thử lại!"), location.reload()), 2 == e && (alert("Có lỗi, vui lòng F5 và thử lại!"), location.reload())
        }
    }), !1
}

function frmChangePass() {
    return $.ajax({
        type: "POST",
        url: root + "nhansu/change",
        data: "action=frmChangePass",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $(".toogle_class").hide()
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })), 0 == e.status && (alert("User không tồn tại. Vui lòng đăng nhập và thử lại!"), location.reload()), 2 == e.status && (alert("Có lỗi... Vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function DoiMatKhau() {
    var e = document.frm_DoiPass,
        t = isWhiteSpace(e.pass_0.value),
        n = isWhiteSpace(e.pass_1.value),
        a = isWhiteSpace(e.pass_2.value);
    if (1 == t || e.pass_0.value.length < 8) return alert("Vui lòng nhập mật khẩu lớn hơn 8 ký tự!"), $("#pass_0").focus(), !1;
    if (1 == n || e.pass_1.value.length < 8) return alert("Mật khẩu mới phải lớn hơn 8 ký tự!"), $("#pass_1").focus(), !1;
    if (1 == a || e.pass_2.value.length < 8) return alert("Mật khẩu xác nhận mới phải lớn hơn 8 ký tự!"), $("#pass_2").focus(), !1;
    if (e.pass_1.value != e.pass_2.value) return alert("Mật khẩu xác nhận phải giống nhau!"), $("#pass_2").focus(), !1;
    e = $("form[name=frm_DoiPass]").serialize();
    return $.ajax({
        type: "POST",
        url: root + "nhansu/changeok",
        data: e + "&action=DoiMatKhau",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            0 == e.status && (alert("Mật khẩu cũ không đúng, vui lòng kiểm tra lại!"), $(".screen").remove(), $("body").prepend('<div class="screen screen2"></div>')), 1 == e.status && (alert("Chúc mừng, đổi mật khẩu mới thành công!"), location.href = root + "home"), 2 == e.status && (alert("Lỗi..., Không thể đổi mật khẩu!"), location.reload())
        }
    }), !1
}

function Active0(e) {
    return $.ajax({
        type: "POST",
        url: root + "nhansu/ac",
        data: "id=" + e,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && alert("Có lỗi, vui lòng F5 và thử lại!")
        }
    }), !1
}

function Active1(e) {
    return $.ajax({
        type: "POST",
        url: root + "nhansu/no",
        data: "id=" + e,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && alert("Có lỗi, vui lòng F5 và thử lại!")
        }
    }), !1
}

function deleteConfirm(e, t) {
    if (window.confirm(t || "Tất cả các thông tin liên quan sẽ bị xóa. Bạn có muốn?")) {
        if (!access_delete) return alert("Bạn không có quyền xóa."), !1;
        $("body").prepend('<div class="screen" style="z-index:999999"></div>'), location.href = e.href + "&c=1"
    }
    return !1
}

function checkLogout() {
    return 1 == confirm("Bạn có muốn đăng xuất khỏi hệ thống?") && ($.ajax({
        type: "POST",
        url: root + "home/out",
        data: "action=Logout",
        cache: !1,
        dataType: "html",
        success: function(e) {
            console.log(e), 1 == e && (location.href = root + "home"), 0 == e && alert("Lỗi đăng xuất, vui lòng F5 và thử lại!")
        }
    }), !0)
}

function TaiXe() {
    return $.ajax({
        type: "POST",
        url: root + "xe/taixe_frm",
        data: "action=TaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                }), $("html, body").removeAttr("style")
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), DinhDangTien()
        }
    }), !1
}

function viewTaiXe(e) {
    return $.ajax({
        type: "POST",
        url: root + "xe/taixe_view",
        data: "code=" + e + "&action=viewTaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !0,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function viewTaiXeTX(e) {
    return $.ajax({
        type: "POST",
        url: "../xe/taixe_view",
        data: "code=" + e + "&action=viewTaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !0,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function editTaiXe(e) {
    return $.ajax({
        type: "POST",
        url: root + "xe/taixe_edit",
        data: "code=" + e + "&action=editTaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove(), $("html, body").removeAttr("style")
                })
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            }), DinhDangTien()
        }
    }), !1
}

function ActiveTX0(e) {
    return $.ajax({
        type: "POST",
        url: root + "xe/taixe_ac",
        data: "id=" + e,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && alert("Có lỗi, vui lòng F5 và thử lại!")
        }
    }), !1
}

function ActiveTX1(e) {
    return $.ajax({
        type: "POST",
        url: root + "xe/taixe_no",
        data: "id=" + e,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && alert("Có lỗi, vui lòng F5 và thử lại!")
        }
    }), !1
}

function frmXe(e) {
    return $.ajax({
        type: "POST",
        url: root + "xe/xe_frm",
        data: "code=" + e + "&action=frmXe",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str)), 0 != e.status && 2 != e.status || (alert(e.str), location.reload()), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                }), $("html, body").removeAttr("style")
            }), $(".close_pop_this,.close_btn_this").on("click", function() {
                $(".close_this,.screen").fadeOut(150, function() {
                    $(this).remove()
                }), $("body").prepend('<div class="screen screen2"></div>')
            }), $(".select").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function addXe() {
    var e = document.getElementById("frmXe"),
        t = $("#img_file").prop("files")[0],
        e = new FormData(e);
    return e.append("file", t), $.ajax({
        type: "POST",
        url: root + "xe/xe_add",
        data: e,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.str), location.reload()), 2 == e.status && (alert("Biển số xe này đã được thêm vào trước đó!"), $(".scr").remove(), $("#biensoxe").focus()), 3 != e.status && 4 != e.status || (alert(e.str), $(".scr").remove()), 0 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function updateXe() {
    var e = document.getElementById("frmXe"),
        t = $("#img_file").prop("files")[0],
        e = new FormData(e);
    return e.append("file", t), $.ajax({
        type: "POST",
        url: root + "xe/xe_update",
        data: e,
        cache: !1,
        dataType: "html",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && (alert("Cập nhật thông tin thành công!"), location.reload()), 0 == e && (alert("Thông tin không tồn tại, vui lòng thử lại!"), location.reload()), 2 == e && (alert("Lỗi..., vui lòng thử lại!"), location.reload()), 3 == e && alert("Lỗi..., Định dạng file ảnh phải là: jpg,jpeg,png!"), 4 == e && alert("Lỗi..., Hình ảnh phải nhỏ hơn > 8MB!"), 5 == e && (alert("Biển số xe này đã được thêm vào trước đó!"), $(".screen").remove(), $("body").prepend('<div class="screen screen2"></div>'), $("#biensoxe").focus())
        }
    }), !1
}

function ActiveXe0(e) {
    return $.ajax({
        type: "POST",
        url: root + "xe/ac",
        data: "code=" + e,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && alert("Có lỗi, vui lòng F5 và thử lại!")
        }
    }), !1
}

function ActiveXe1(e) {
    return $.ajax({
        type: "POST",
        url: root + "xe/no",
        data: "code=" + e,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && alert("Có lỗi, vui lòng F5 và thử lại!")
        }
    }), !1
}

function myFunction(e, t, n) {
    1 == document.getElementById(e).value ? $("." + t).prepend('<input type="text" name="tr[' + n + '][sohoadon]" placeholder="Số chứng từ" style="width:97%;margin:5px 0 0 0" maxlength="50">') : $("." + t).html("")
}

function getMSD(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + "dau/get",
        data: "code=" + e + "&stt=" + t + "&val=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            $(".screen").remove(), $("#maso2_" + t).attr("value", e.value)
        }
    }), !1
}

function addVanDon() {
    var e = $("#khachhang_ajax").val(),
        t = $("#donvi_20").val(),
        n = $("#tamung_20").val(),
        a = $("#dongia_20").val(),
        o = $("#donvi_40").val(),
        i = $("#tamung_40").val(),
        c = $("#dongia_40").val(),
        s = $("#soluong_20").val(),
        r = $("#soluong_40").val();
    if ("" == e) return alert("Vui lòng chọn khách hàng!"), $("#khachhang_ajax").focus(), !1;
    if (0 < s && "" == t) return alert("Vui lòng chọn đơn vị!"), $("#donvi_20").focus(), !1;
    if (0 < s && "" == n) return alert("Vui lòng chọn số tiền tạm ứng!"), $("#tamung_20").focus(), !1;
    if (0 < s && "" == a) return alert("Vui lòng nhập đơn giá!"), $("#dongia_20").focus(), !1;
    if ("" == s && "" != t) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_20").focus(), !1;
    if ("" == s && "" != n) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_20").focus(), !1;
    if ("" == s && "" != a) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_20").focus(), !1;
    if (0 < r && "" == o) return alert("Vui lòng chọn đơn vị!"), $("#donvi_40").focus(), !1;
    if (0 < r && "" == i) return alert("Vui lòng chọn số tiền tạm ứng!"), $("#tamung_40").focus(), !1;
    if (0 < r && "" == c) return alert("Vui lòng nhập đơn giá!"), $("#dongia_40").focus(), !1;
    if ("" == r && "" != o) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_40").focus(), !1;
    if ("" == r && "" != i) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_40").focus(), !1;
    if ("" == r && "" != c) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_40").focus(), !1;
    c = $('form[name="frmVanDon"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "vandon/add",
        data: c + "&action=addVanDon",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".js_status").html(e.msg), resetForm("frmVanDon"), $(".screen").remove()), 0 == e.status && ($(".js_status").html(e.msg), $(".screen").remove()), 3 == e.status && (alert("Vận đơn này đã được lập trước đó."), $(".js_status").html(e.msg), $(".screen").remove()), 2 == e.status && (alert("Lỗi, Số lệnh điều động phải là 1 con số."), $(".js_status").html(e.msg), $(".screen").remove()), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            }), $("html, body").animate({
                scrollTop: 0
            })
        }
    }), !1
}

function addVanDon2() {
    var e = document.getElementById("frmVanDon"),
        e = new FormData(e);
    return $.ajax({
        type: "POST",
        url: root + "vandon/add",
        data: e,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:100"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(e) {
            1 == e.status && ($(".src").remove(), $("body").append('<div class="fscreen"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, đã thêm mới thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 0 == e.status && (alert(e.str), location.reload()), 2 != e.status && 3 != e.status || (alert(e.str), $(".src").remove())
        }
    }), !1
}

function viewVanDon(e) {
    return $.ajax({
        type: "POST",
        url: root + "vandon/detail",
        data: "code=" + e + "&action=viewVanDon",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function viewVanDonDetail(e) {
    return $.ajax({
        type: "POST",
        url: root + "vandon/v",
        data: "code=" + e + "&action=viewVanDonDetail",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })), 1 == $("#initMap").length && 1 == $("#map").length && $("#initMap").click(), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function viewVanDonDetailGST(e) {
    return $.ajax({
        type: "POST",
        url: "../vandon/v_gst",
        data: "code=" + e + "&action=viewVanDonDetail",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })), 1 == $("#initMap").length && 1 == $("#map").length && $("#initMap").click(), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function SearchVD() {
    var e = $("#code_vd").val();
    return $.ajax({
        type: "POST",
        url: root + "vandon/v2",
        data: "code=" + e + "&action=SearchVD",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#cont_vd").html(e.str), $("#id_vd").html(e.id_vd), $("#id_nv").html(e.nv)), 0 == e.status && ($(".scr").remove(), $("#cont_vd").html(e.str)), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            }), 1 == $("#initMap").length && 1 == $("#map").length && $("#initMap").click(), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function SearchVDGST() {
    var e = $("#code_vd").val();
    return $.ajax({
        type: "POST",
        url: "../vandon/v2_gst",
        data: "code=" + e + "&action=SearchVD",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#cont_vd").html(e.str), $("#id_vd").html(e.id_vd), $("#id_nv").html(e.nv)), 0 == e.status && ($(".scr").remove(), $("#cont_vd").html(e.str)), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function updateVanDon() {
    var e = $("#donvi_20").val(),
        t = $("#tamung_20").val(),
        n = $("#dongia_20").val(),
        a = $("#donvi_40").val(),
        o = $("#tamung_40").val(),
        i = $("#dongia_40").val(),
        c = $("#soluong_20").val(),
        s = $("#soluong_40").val();
    if (0 < c && "" == e) return alert("Vui lòng chọn đơn vị!"), $("#donvi_20").focus(), !1;
    if (0 < c && "" == t) return alert("Vui lòng chọn số tiền tạm ứng!"), $("#tamung_20").focus(), !1;
    if (0 < c && "" == n) return alert("Vui lòng nhập đơn giá!"), $("#dongia_20").focus(), !1;
    if ("" == c && "" != e) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_20").focus(), !1;
    if ("" == c && "" != t) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_20").focus(), !1;
    if ("" == c && "" != n) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_20").focus(), !1;
    if (0 < s && "" == a) return alert("Vui lòng chọn đơn vị!"), $("#donvi_40").focus(), !1;
    if (0 < s && "" == o) return alert("Vui lòng chọn số tiền tạm ứng!"), $("#tamung_40").focus(), !1;
    if (0 < s && "" == i) return alert("Vui lòng nhập đơn giá!"), $("#dongia_40").focus(), !1;
    if ("" == s && "" != a) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_40").focus(), !1;
    if ("" == s && "" != o) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_40").focus(), !1;
    if ("" == s && "" != i) return alert("Vui lòng nhập số lượng cont!"), $("#soluong_40").focus(), !1;
    if (!1 === confirm("Các thông tin sẽ được thay đổi sau khi sửa. Bạn có muốn?")) return !1;
    s = $("#frmVanDon").attr("data-id"), i = $('form[name="frmVanDon"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "vandon/update",
        data: i + "&code=" + s + "&action=updateVanDon",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".js_status").html(e.msg), $(".screen").remove()), 0 != e.status && 2 != e.status || ($(".js_status").html(e.msg), $(".screen").remove()), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            }), $("html, body").animate({
                scrollTop: 0
            })
        }
    }), !1
}

function activeVanDon0(t) {
    return !1 === confirm("Sau khi xác nhận duyệt lương chuyến các thông tin sẽ không thể thay đổi. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "vandon/active",
        data: "code=" + t + "&action=activeVanDon0",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $("#act_vd_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#act_vd_" + t).html('<img src="template/Default/images/check-1.png">'), $("#act_vd_" + t).attr("onclick", 'activeVanDon1("' + t + '")'), location.reload()), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload())
        }
    }), !1
}

function activeVanDon1(t) {
    return !1 === confirm("Sau khi xác nhận bỏ duyệt lương chuyến các thông tin có thể thay đổi. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "vandon/active_open",
        data: "code=" + t + "&action=activeVanDon1",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $("#act_vd_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#act_vd_" + t).html('<img src="template/Default/images/check-0.png">'), $("#act_vd_" + t).attr("onclick", 'activeVanDon0("' + t + '")')), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload())
        }
    }), !1
}

function DuyetLenh0(t) {
    return !1 === confirm("Sau khi xác nhận các thông tin sẽ không thể thay đổi. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "vandon/lenh_dong",
        data: "code=" + t + "&action=DuyetLenh0",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $("#act_vdl_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#act_vdl_" + t).html('<img src="template/Default/images/check-1.png">'), $("#act_vdl_" + t).attr("onclick", 'DuyetLenh1("' + t + '")'), location.reload()), 0 != e.status && 2 != e.status || (alert(e.str), location.reload())
        }
    }), !1
}

function DuyetLenh1(t) {
    return !1 === confirm("Sau khi mở lại lệnh các thông tin có thể thay đổi. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "vandon/lenh_mo",
        data: "code=" + t + "&action=DuyetLenh1",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $("#act_vdl_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#act_vdl_" + t).html('<img src="template/Default/images/check-0.png">'), $("#act_vdl_" + t).attr("onclick", 'DuyetLenh0("' + t + '")'), location.reload()), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload())
        }
    }), !1
}

function activeHoanUng(t) {
    return !1 === confirm("Xác nhận đã hoàn ứng đủ. Sau khi xác nhận thông sẽ được lưu trữ?") || $.ajax({
        type: "POST",
        url: root + "lenh/active_hoanung",
        data: "code=" + t + "&action=activeHoanUng",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $("#id_hu_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#id_hu_" + t).html('<i class="fa fa-check"></i>'), $("#id_hu_s_" + t).html("(Đ)")), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload())
        }
    }), !1
}

function listTaiXe() {
    return $.ajax({
        type: "POST",
        url: root + "xe/list_taixe",
        data: "action=listTaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "xe/list_search",
                    data: "key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listTaiXe2() {
    return $.ajax({
        type: "POST",
        url: root + "xe/list_taixe2",
        data: "action=listTaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "xe/list_search2",
                    data: "key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listTaiXeSearch() {
    return $.ajax({
        type: "POST",
        url: root + "xe/list_taixe_search",
        data: "action=listTaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2,.screen_petro").fadeOut().remove()
            }), $(".chk_multi").on("change", function() {
                var e = "",
                    t = "";
                $(".chk_multi:checked").each(function() {
                    e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                }), $("#tentaixe").val(e.substring(0, e.length - 1)), $("#id_taixe").attr("value", t.substring(0, t.length - 1))
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "xe/list_search_taixe",
                    data: "key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listTaiXeStatus() {
    return $.ajax({
        type: "POST",
        url: root + "xe/list_taixe_status",
        data: "action=listTaiXeStatus",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "xe/list_search_status",
                    data: "key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".txlist").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listTaiXeStatus2() {
    return $.ajax({
        type: "POST",
        url: root + "xe/list_taixe_status2",
        data: "action=listTaiXeStatus",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "xe/list_search_status2",
                    data: "key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".txlist").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listTaiXeVD() {
    var t = "";
    return 0 < $("#id_taixe").length && (t = "&code=" + $("#id_taixe").val()), $.ajax({
        type: "POST",
        url: root + "vandon/list_taixe_status",
        data: "action=listTaiXeStatus" + t,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".chk_multi").on("change", function() {
                var e = "",
                    t = "";
                $(".chk_multi:checked").each(function() {
                    e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                }), $("#tentaixe").val(e.substring(0, e.length - 1)), $("#id_taixe").attr("value", t.substring(0, t.length - 1))
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "vandon/list_search_status",
                    data: "key=" + e + t,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".txlist").html(e).show(), $(".chk_multi").on("change", function() {
                            var e = "",
                                t = "";
                            $(".chk_multi:checked").each(function() {
                                e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                            }), $("#tentaixe").val(e.substring(0, e.length - 1)), $("#id_taixe").attr("value", t.substring(0, t.length - 1))
                        })
                    }
                })
            })
        }
    }), !1
}

function listTaiXeDau(t) {
    return $.ajax({
        type: "POST",
        url: root + "dau/list_taixe",
        data: "code=" + t + "&action=listTaiXeDau",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr_tx" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".close_this,.scr_tx").fadeOut().remove()
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "dau/list_search",
                    data: "code=" + t + "&key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function getValueDau(e, t, n, a, o, i) {
    $("#tx_" + n).attr("value", t), $("#id_tx_" + n).attr("value", e), $("#id_loai_" + n).attr("value", a), $("#biensoxe_" + n).attr("value", o), $("#id_xe_" + n).attr("value", i), 2 == a && ($("#biensoxe_" + n).removeAttr("onclick"), $("#biensoxe_" + n).removeAttr("readonly"), $("#biensoxe_" + n).attr("value", ""), $("#id_xe_" + n).attr("value", "")), $(".close_this,.scr_tx").remove()
}

function getValue(e, t, n, a, o, i) {
    $("#tentaixe").attr("value", t), $("#id_taixe").attr("value", e), $("#biensoxe").attr("value", n), $("#id_xe").attr("value", a), $("#somooc").attr("value", o), $("#somooc_id").attr("value", i), $(".close_this,.screen_petro").remove(), 0 < $("#div_id_loaixe").length && (i = $("#code_lenh").val(), $.ajax({
        type: "POST",
        url: root + "lenh/loaixe",
        data: "id=" + a + "&code=" + i,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").remove(), $("#div_id_loaixe").html(e), DinhDangTien()
        }
    }))
}

function getValue2(e, t, n, a, o, i) {
    $("#tentaixe").attr("value", t), $("#id_taixe").attr("value", e), $("#biensoxe").attr("value", n), $("#id_xe").attr("value", a), $(".close_this,.screen_petro").remove(), 0 < $("#div_id_loaixe").length && (n = $("#code_lenh").val(), $.ajax({
        type: "POST",
        url: root + "lenh/loaixe",
        data: "id=" + a + "&code=" + n,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").remove(), $("#div_id_loaixe").html(e), DinhDangTien()
        }
    }))
}

function listXe() {
    var t = "";
    return 1 == $("#id_xe").length && (t = "&val=" + $("#id_xe").val()), $.ajax({
        type: "POST",
        url: root + "xe/list_xe",
        data: "action=listXe" + t,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".close_this").addClass("popup_close"), $(".close_this,.src_pt").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "xe/list_xe_search",
                    data: "key=" + e + t,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function listXeSearch() {
    return $.ajax({
        type: "POST",
        url: root + "dexuat/list_xe",
        data: "action=listXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".chk_multi").on("change", function() {
                var e = "",
                    t = "";
                $(".chk_multi:checked").each(function() {
                    e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                }), $("#biensoxe").val(e.substring(0, e.length - 1)), $("#id_xe").attr("value", t.substring(0, t.length - 1))
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "dexuat/list_xe_search",
                    data: "key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".chk_multi").on("change", function() {
                            var e = "",
                                t = "";
                            $(".chk_multi:checked").each(function() {
                                e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                            }), $("#biensoxe").val(e.substring(0, e.length - 1)), $("#id_xe").attr("value", t.substring(0, t.length - 1))
                        })
                    }
                })
            })
        }
    }), !1
}

function listXeStatus() {
    return $.ajax({
        type: "POST",
        url: root + "xe/list_xe_status",
        data: "action=listXeStatus",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "xe/list_xe_search_status",
                    data: "key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function listXeDau(t) {
    return $.ajax({
        type: "POST",
        url: root + "dau/list_xe",
        data: "code=" + t + "&action=listXeDau",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_sc scr_xedau" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx,.close_mooc").on("click", function() {
                $(".close_this,.src_sc").fadeOut().remove()
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "dau/list_xe_search",
                    data: "code=" + t + "&key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listXeDauTX(t) {
    return $.ajax({
        type: "POST",
        url: "../dau/list_xe",
        data: "code=" + t + "&action=listXeDau",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_sc scr_xedau" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx,.close_mooc").on("click", function() {
                $(".close_this,.src_sc").fadeOut().remove()
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "dau/list_xe_search",
                    data: "code=" + t + "&key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listMoocDau(t) {
    return $.ajax({
        type: "POST",
        url: root + "dau/list_mooc",
        data: "code=" + t + "&action=listXeDau",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "dau/list_mooc_search",
                    data: "code=" + t + "&key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function listMoocDauTX(t) {
    return $.ajax({
        type: "POST",
        url: "../dau/list_mooc",
        data: "code=" + t + "&action=listXeDau",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + "dau/list_mooc_search",
                    data: "code=" + t + "&key=" + e,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show()
                    }
                })
            })
        }
    }), !1
}

function getValueXeDau(e, t, n) {
    $("#biensoxe_" + n).attr("value", t), $("#id_xe_" + n).attr("value", e), $(".close_this,.scr_xedau").remove()
}

function getValueMoocDau(e, t, n) {
    $("#romooc_" + n).attr("value", t), $("#id_romooc_" + n).attr("value", e), $(".close_this,.screen").remove()
}

function getValueXe(e, t) {
    $("#biensoxe").attr("value", t), $("#id_xe").attr("value", e), $(".close_this,.screen_petro").remove(), 0 < $("#div_id_loaixe").length && (t = $("#code_lenh").val(), $.ajax({
        type: "POST",
        url: root + "lenh/loaixe",
        data: "id=" + e + "&code=" + t,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            console.log(e), $(".src_pt").remove(), $("#div_id_loaixe").html(e)
        }
    }))
}

function listNhanSu() {
    return $.ajax({
        type: "POST",
        url: root + "luong/list_nv",
        data: "action=listXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".chk_multi").on("change", function() {
                var e = "",
                    t = "";
                $(".chk_multi:checked").each(function() {
                    e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                }), $("#name").val(e.substring(0, e.length - 1)), $("#id").attr("value", t.substring(0, t.length - 1))
            })
        }
    }), !1
}

function addBooking() {
    var e = $("#frmBooking").attr("data-id"),
        t = $('form[name="frmBooking"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "lenh/add",
        data: t + "&code=" + e + "&action=addBooking",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã thêm Lệnh điều động thành công!"), location.href = root + e.modules), 0 == e.status && (alert("Lỗi, Lệnh này đã được tạo trước đó!"), $("html, body").animate({
                scrollTop: 0
            })), 2 == e.status && $("html, body").animate({
                scrollTop: 0
            }), $(".js_status").html(e.msg), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            })
        }
    }), !1
}

function addTuyen() {
    var e = $("#frmBooking").attr("data-id"),
        t = $('form[name="frmBooking"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "lenh/add_tuyen",
        data: t + "&code=" + e + "&action=addTuyen",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã lưu thông tin thành công!"), location.reload()), 0 == e.status && (alert("Lỗi, Booking không tồn tại!"), location.reload(), $("html, body").animate({
                scrollTop: 0
            })), 2 == e.status && $("html, body").animate({
                scrollTop: 0
            }), $(".js_status").html(e.msg), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            })
        }
    }), !1
}

function HoanTatChuyen() {
    if (!1 === confirm("Sau khi xác nhận hoàn tất các thông tin sẽ không thể thay đổi. Xác nhận ngay?")) return !1;
    var e = $("#frmBooking").attr("data-id"),
        t = $('form[name="frmBooking"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "lenh/hoantatchuyen",
        data: t + "&code=" + e + "&action=HoanTatChuyen",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã lưu thông tin thành công!"), location.reload()), 0 == e.status && (alert("Lỗi, Booking không tồn tại!"), location.reload(), $("html, body").animate({
                scrollTop: 0
            })), 2 == e.status && $("html, body").animate({
                scrollTop: 0
            }), $(".js_status").html(e.msg), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            })
        }
    }), !1
}

function LuongOption(e) {
    if ("" == e) return $(".luongchuyen_show").html(0), $(".luongchuyen").html(""), !1;
    $.ajax({
        type: "POST",
        url: root + "lenh/luong",
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup").prepend('<div class="screen srcl" style="z-index:999"></div>')
        },
        success: function(e) {
            0 != e.status && 2 != e.status && 3 != e.status || (alert(e.str), location.reload()), 1 == e.status && ($(".srcl").remove(), $(".luongchuyen").html(e.str), $(".luongchuyen_show").html(e.str2), $(".soluongcont").html(e.str3)), 4 == e.status && (alert(e.msg), $(".srcl").remove(), $("#kieuchuyen option").prop("selected", function() {
                return this.defaultSelected
            }), $(".luongchuyen").html(e.str), $(".luongchuyen_show").html(e.str2), $(".soluongcont").html(e.str3))
        }
    })
}

function updateLenh(e, t, n, a) {
    var o, i, c;
    return "img_file" != a && "pdf_file" != a || (i = document.getElementById(n), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(n), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:999999"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn đã cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                $(".fscreen,.popup").remove(), (1 == e.flag ? $("#" + e.id_reload2) : $("#" + e.id_reload)).click()
            })), 0 == e.status && (alert(e.str), location.reload()), 2 == e.status && (alert(e.str), location.reload()), 3 != e.status && 4 != e.status && 5 != e.status && 6 != e.status && 7 != e.status && 8 != e.status || (alert(e.str), $(".src").remove())
        }
    }), !1
}

function updateLenh2(e, t, n) {
    n = document.getElementById(n), n = new FormData(n);
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: n,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:999999"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn đã cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                $(".fscreen,.popup").remove(), 1 == e.flag && $("#" + e.id_reload2).click(), 2 == e.flag && location.reload(), 0 == e.flag && $("#" + e.id_reload).click()
            })), 0 == e.status && (alert(e.str), location.reload(), $("html, body").animate({
                scrollTop: 0
            })), 2 == e.status && (alert(e.str), location.reload()), 3 != e.status && 4 != e.status && 5 != e.status && 6 != e.status && 7 != e.status && 8 != e.status || (alert(e.str), $(".src").remove())
        }
    }), !1
}

function printLenh(e) {
    return $.ajax({
        url: root + "lenh/print",
        data: "code=" + e + "&action=printLenh",
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".screen").remove(), (t = window.open()).document.write("<title>In lệnh điều động</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Thông tin không tồn tại"), location.reload()), 2 == e.status && (alert("Có lỗi, Thông tin không tồn tại, vui lòng thử lại."), location.reload()), 3 == e.status && (alert("Có lỗi, Không thể nhận diện loại bảng in."), location.reload())
        }
    }), !1
}

function printVD(e) {
    return $.ajax({
        url: root + "vandon/print",
        data: "code=" + e + "&action=printVD",
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".screen").remove(), (t = window.open()).document.write("<title>In thông tin</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Thông tin không tồn tại"), location.reload()), 2 == e.status && (alert("Có lỗi, Thông tin không tồn tại, vui lòng thử lại."), location.reload())
        }
    }), !1
}

function luongFrm() {
    return $.ajax({
        type: "POST",
        url: root + "luongtaixe/frm",
        data: "action=luongFrm",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), DinhDangTien()
        }
    }), !1
}

function addLuongTaiXe() {
    for (var e = document.getElementsByName("taixe[]"), t = 0, n = 0; n < e.length; n++) e[n].checked && t++;
    if (t < 1) return alert("Vui lòng chọn tên tài xế được nhận lương trong tháng!"), !1;
    var a = $('form[name="frmLuong"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "luongtaixe/add",
        data: a + "&action=addLuongTaiXe",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen slc" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.msg), location.reload()), 0 == e.status && (alert(e.msg), $(".slc").remove()), 2 == e.status && (alert(e.msg), location.reload())
        }
    }), !1
}

function checkDSTaiXe(e, t) {
    var n = $("#thang").val(),
        a = $("#nam").val();
    return 2 == n.length && 4 == a.length && $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "m=" + n + "&y=" + a + "&action=checkDSTaiXe",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup").prepend('<div class="screen lsc" style="z-index:9999"></div>')
        },
        success: function(e) {
            $(".lsc").remove(), $(".scroll2").html(e.str)
        }
    }), !1
}

function frmNgayNghi(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&action=frmNgayNghi",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(500, function() {
                    $(this).remove()
                })
            }), $(".picker_" + n).multiDatesPicker({
                dateFormat: "dd-mm-yy"
            }), DinhDangTien()
        }
    }), !1
}

function addNgayNghiTaiXe(e, t) {
    var n = $("#frmNgayNghi").attr("data-id"),
        a = $('form[name="frmNgayNghi"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: a + "&code=" + n + "&action=addNgayNghiTaiXe",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.str), location.reload()), 0 != e.status && 2 != e.status || (alert(e.str), location.reload()), 3 == e.status && (alert(e.str), $(".src").remove())
        }
    }), !1
}

function viewNgayNghi(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&action=viewNgayNghi",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(500, function() {
                    $(this).remove()
                })
            })
        }
    }), !1
}

function viewNgayNghiTX(e, t, n) {
    return $.ajax({
        type: "POST",
        url: "../" + e + "/" + t,
        data: "code=" + n + "&action=viewNgayNghi",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(500, function() {
                    $(this).remove()
                })
            })
        }
    }), !1
}

function deleteNgayNghi(e, t, n) {
    return !1 === confirm("Bạn có chắc xóa mẫu tin này?") || $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&action=deleteNgayNghi",
        cache: "false",
        dataType: "html",
        beforeSend: function() {
            $(".popup").prepend('<div class="screen scnn"></div>')
        },
        success: function(e) {
            1 == e && ($(".scnn").remove(), $("#nn_" + n).remove()), 0 == e && (alert("Lỗi,... Thông tin không tồn tại"), location.reload()), 2 == e && (alert("Có lỗi,... Vui lòng thử lại"), location.reload())
        }
    }), !1
}

function viewSanLuong(e) {
    return $.ajax({
        type: "POST",
        url: root + "luongtaixe/sanluong",
        data: "code=" + e + "&action=viewSanLuong",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function editLuongTaiXe(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&action=editLuongTaiXe",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(500, function() {
                    $(this).remove()
                })
            })), 0 == e.status && (alert("Lỗi... Không tìm thấy thông tin!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()), DinhDangTien()
        }
    }), !1
}

function updateLuongTaiXe(e, t) {
    var n = $("#frmLuongTaiXe").attr("data-id"),
        a = $('form[name="frmLuongTaiXe"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: a + "&code=" + n + "&action=updateLuongTaiXe",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && alert("Bạn đã cập nhật thành công!"), 0 == e.status && alert("Thông tin không tồn tại. Vui lòng thử lại!"), 2 == e.status && alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()
        }
    }), !1
}

function deleteLuongTaiXe(t) {
    return !1 === confirm("Các thông tin liên quan đến lương của tài xế này sẽ bị xóa khỏi bản lương. Bạn có muốn?") || $.ajax({
        type: "POST",
        url: root + "luongtaixe/delete",
        data: "code=" + t + "&action=deleteLuongTaiXe",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && $("#luong_" + t + ",.screen").remove(), 0 == e && (alert("Lỗi..., Không tìm thấy mẫu tin!"), location.reload()), 2 == e && (alert("Lỗi..., Vui lòng kiểm tra kết nối và thử lại!"), location.reload())
        }
    }), !1
}

function getLuongTaiXe() {
    var e = $("#frmSearch").serialize();
    return "" == $("#tentaixe").val() ? (alert("Vui lòng chọn tên tài xế cần xem bảng lương"), $("#tentaixe").focus()) : $.ajax({
        type: "POST",
        url: root + "luongtaixe/check_tx",
        data: e + "&action=getLuongTaiXe",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (location.href = root + e.link), 0 == e.status && (alert("Tài xế " + e.name + " không có trong bảng lương của tháng này"), location.reload()), 2 == e.status && (alert("Lỗi, vui lòng kiểm tra thông tin chính xác và thử lại."), location.reload())
        }
    }), !1
}

function ActiveLuongTX0(t) {
    return !1 === confirm("Sau khi duyệt lương các thông tin sẽ không thể thay đổi. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "luongtaixe/active",
        data: "code=" + t + "&action=ActiveLuongTX0",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $("#act_luong_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#act_luong_" + t).html('<img src="template/Default/images/check-1.png">'), $("#act_luong_" + t).attr("onclick", 'ActiveLuongTX1("' + t + '")'), $("#action_" + t).html('<img src="template/Default/images/edit-0.png"/> <img src="template/Default/images/delete-0.png"/><a href="' + root + "luongtaixe/detail/?code=" + t + '"><img src="template/Default/images/view_detail.png"></a>')), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload())
        }
    }), !1
}

function ActiveLuongTX1(n) {
    return !1 === confirm("Sau khi bỏ duyệt lương các thông tin có thể thay đổi. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "luongtaixe/active_open",
        data: "code=" + n + "&action=ActiveLuongTX1",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>'), $("#act_luong_" + n).removeAttr("onclick")
        },
        success: function(e) {
            var t;
            1 == e.status && (t = "'" + n + "'", $(".screen").remove(), $("#act_luong_" + n).html('<img src="template/Default/images/check-0.png">'), $("#act_luong_" + n).attr("onclick", 'ActiveLuongTX0("' + n + '")'), $("#action_" + n).html('<a href="javascript:void(0)" onclick="return editLuongTaiXe(' + t + ')" title="Chỉnh sửa"><img src="template/Default/images/edit-1.png"/></a> <a href="javascript:void(0)" onclick="return deleteLuongTaiXe(' + t + ')" title="Xóa"><img src="template/Default/images/delete-1.png"/></a> <a href="' + root + "luongtaixe/detail/?code=" + n + '"><img src="template/Default/images/view_detail.png"></a>')), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload())
        }
    }), !1
}

function KetSoLuongTX(e) {
    return !1 === confirm("Sau khi xác nhận kết sổ các thông tin sẽ được lưu chính xác và không thể thay đổi. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "luongtaixe/ketso",
        data: "code=" + e + "&action=KetSoLuongTX",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && alert("Đã kết sổ lương " + e.msg + " thành công!"), 0 == e.status && alert("Tất cả các thông tin đã được kết sổ trước đó!"), 2 == e.status && alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()
        }
    }), !1
}

function printLuongTaiXe() {
    var e = $("#thang").val(),
        t = $("#nam").val();
    return "" == e || e.length < 2 ? (alert("Vui lòng chọn tháng cần in bảng lương!"), $("#thang").focus()) : "" == t || t.length < 4 ? (alert("Vui lòng chọn năm cần in bảng lương!"), $("#nam").focus()) : $.ajax({
        url: root + "luongtaixe/print",
        data: "thang=" + e + "&nam=" + t + "&action=printLuongTaiXe",
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".screen").remove(), (t = window.open()).document.write("<title>In bảng lương</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Không có mẫu tin nào để in"), $(".screen").remove()), 2 == e.status && (alert("Có lỗi,... Vui lòng kiểm tra và thử lại!"), location.reload())
        }
    }), !1
}

function printSanLuong(e) {
    return $.ajax({
        url: root + "luongtaixe/print_sanluong",
        data: "code=" + e + "&action=printSanLuong",
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".screen").remove(), (t = window.open()).document.write("<title>In doanh số</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Không có mẫu tin nào để in"), $(".screen").remove()), 2 == e.status && (alert("Có lỗi,... Vui lòng kiểm tra và thử lại!"), location.reload())
        }
    }), !1
}

function frmUngLuong(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&action=frmUngLuong",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove(), $("html, body").removeAttr("style")
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), DinhDangTien()
        }
    }), !1
}

function addUngLuong(e, t) {
    var n = $("#ngay").val();
    if ("" == n || 10 < n.length || n.length < 10) return alert("Vui lòng chọn ngày ứng lương!"), $("#ngay").focus(), !1;
    var a = $("#frmUngLuong").attr("data-id"),
        n = $('form[name="frmUngLuong"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: n + "&code=" + a + "&action=addUngLuong",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Thêm thông tin thành công!"), location.reload()), 0 == e.status && (alert("Thông tin không tồn tại, vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi..., vui lòng thử lại!"), location.reload()), 3 == e.status && (alert("Vượt hạn mức chi, vui lòng chi nhỏ hơn số tiền: " + e.str), $(".scr").remove()), 4 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function viewUngLuong(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&action=viewUngLuong",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function deleteUngLuong(e, t, n) {
    return !1 === confirm("Bạn có chắc xóa mẫu tin này?") || $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&action=deleteUngLuong",
        cache: "false",
        dataType: "html",
        beforeSend: function() {
            $(".popup").prepend('<div class="screen scnn"></div>')
        },
        success: function(e) {
            1 == e && ($(".scnn").remove(), $("#ul_" + n).remove()), 0 == e && (alert("Lỗi,... Thông tin không tồn tại"), location.reload()), 2 == e && (alert("Có lỗi,... Vui lòng thử lại"), location.reload())
        }
    }), !1
}

function updateSoLieu(e) {
    return $.ajax({
        url: root + "luongtaixe/update_solieu",
        data: "code=" + e + "&action=updateSoLieu",
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && alert("Đã cập nhật số liệu mới thành công!"), 2 == e.status && alert("Lỗi cập nhật, vui lòng thử lại!"), location.reload()
        }
    }), !1
}

function addLuong() {
    for (var e = document.getElementsByName("id[]"), t = 0, n = 0; n < e.length; n++) e[n].checked && t++;
    if (t < 1) return alert("Vui lòng chọn tên nhân viên được nhận lương trong tháng!"), !1;
    var a = $('form[name="frmLuong"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "luong/add",
        data: a + "&action=addLuong",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen slc" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.msg), location.reload()), 0 == e.status && (alert(e.msg), $(".slc").remove()), 2 == e.status && (alert(e.msg), location.reload())
        }
    }), !1
}

function addDau() {
    var e = document.getElementById("frmDau"),
        e = new FormData(e);
    return $.ajax({
        type: "POST",
        url: root + "dau/add",
        data: e,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã thêm công nợ dầu thành công!"), location.href = root + "dau"), 2 == e.status && ($("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove()), 0 == e.status && (alert("Có vài mẫu tin trùng nhau, vui lòng kiểm tra lại trước khi lưu!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove()), 3 == e.status && (alert("Không thể thêm mẫu tin vào tháng đã kết số trước đó!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove()), 4 == e.status && (alert(e.str), $(".screen").remove()), $(".js_status").html(e.msg), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            })
        }
    }), !1
}

function updateDau() {
    var e = document.getElementById("frmDau"),
        e = new FormData(e);
    return $.ajax({
        type: "POST",
        url: root + "dau/update",
        data: e,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Bạn đã cập nhật thành công!"), location.reload()), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload())
        }
    }), !1
}

function KetSoDau(e) {
    return !1 === confirm("Sau khi xác nhận kết sổ các thông tin sẽ được lưu chính xác. Bạn có muốn xác nhận?") || $.ajax({
        type: "POST",
        url: root + "dau/ketso",
        data: "code=" + e + "&action=KetSoDau",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && alert("Đã kết sổ công nợ dầu " + e.msg + " thành công!"), 0 == e.status && alert("Không tồn tại thông tin. Vui lòng thử lại!"), 2 == e.status && alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload()
        }
    }), !1
}

function printList(e, t, n, a) {
    var o = $("#m").val(),
        i = $("#y").val();
    if ("" == o || "" == i) return alert("Vui lòng chọn tháng năm cần in!"), !1;
    e = $('form[name="' + e + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + t + "/" + a,
        data: e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".screen").remove(), (t = window.open()).document.write("<title>In danh sách</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Không có mẫu tin nào để in"), location.reload()), 2 == e.status && (alert("Có lỗi, Thông tin không tồn tại, vui lòng thử lại."), location.reload())
        }
    }), !1
}

function addLop() {
    var e = $('form[name="frmLop"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "lop/add",
        data: e + "&action=addLop",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã thêm thông tin thành công!"), location.href = root + "lop"), 2 == e.status && ($("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove()), 0 == e.status && (alert("Có vài mẫu tin trùng nhau, vui lòng kiểm tra lại trước khi lưu!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove()), 3 == e.status && (alert("Không thể thêm mẫu tin vào tháng đã kết số trước đó!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove()), $(".js_status").html(e.msg), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            })
        }
    }), !1
}

function frmSuaChua(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + t + "/frm",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str)), 0 == e.status && (alert("Không tìm thấy mẫu tin... Vui lòng nhấn F5 và thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng nhấn F5 và thử lại!"), location.reload()), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            })
        }
    }), !1
}

function frmSuaChuaTX(e, t, n) {
    return $.ajax({
        type: "POST",
        url: "../" + t + "/frmtx",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str)), 0 == e.status && (alert("Không tìm thấy mẫu tin... Vui lòng nhấn F5 và thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng nhấn F5 và thử lại!"), location.reload()), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            })
        }
    }), !1
}

function updateSuaChua(e, t, n) {
    var a = $("#" + t).attr("data-id"),
        t = $('form[name="' + t + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/update",
        data: t + "&code=" + a + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && alert("Bạn đã cập nhật thành công!"), 0 == e.status && alert("Thông tin không tồn tại. Vui lòng thử lại!"), 2 == e.status && alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()
        }
    }), !1
}

function updateSuaChuaTX(e, t, n) {
    var a = $("#" + t).attr("data-id"),
        t = $('form[name="' + t + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: "../" + e + "/updatetx",
        data: t + "&code=" + a + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && alert("Bạn đã cập nhật thành công!"), 0 == e.status && alert("Thông tin không tồn tại. Vui lòng thử lại!"), 2 == e.status && alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()
        }
    }), !1
}

function frmPics(e, t) {
    return $.ajax({
        type: "POST",
        url: root + t + "/frmpics",
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str)), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function frmPicsTX(e, t) {
    return $.ajax({
        type: "POST",
        url: "../" + t + "/frmpicstx",
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str)), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function addPicsLop(e, t) {
    var n;
    return $img_file = $("#img_file").val(), $type_img_file = $("#img_file").val().split(".").pop().toLowerCase(), "" != $img_file && -1 == $.inArray($type_img_file, ["png", "jpeg", "jpg"]) ? alert("File hình ảnh phải ở định dạng: 'png', 'jpeg', 'jpg'") : (n = document.getElementById(t), t = $("#img_file").prop("files")[0], (n = new FormData(n)).append("file", t), $.ajax({
        url: root + e + "/frmpicsadd",
        type: "POST",
        data: n,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="screen scr" style="z-index:999"></div>')
        },
        success: function(e) {
            0 == e.status && (alert("Lỗi, không tìm thấy thông tin!"), location.reload()), 1 == e.status && (alert("Đã tải lên hình ảnh thành công!"), location.reload()), 2 == e.status && (alert("Dung lượng File quá lớn (=< 10MB)"), $(".scr").remove(), $("body").append('<div class="screen screen2"></div>')), 3 == e.status && (alert("Lỗi, Vui lòng kiểm tra kết và thử lại!"), location.reload()), 4 == e.status && (alert("File hình ảnh phải ở định dạng: 'png', 'jpeg', 'jpg'"), $(".scr").remove(), $("body").append('<div class="screen screen2"></div>')), 5 == e.status && (alert("Đã đủ 4 hình ảnh. Bạn chỉ có thể lưu được tối đa 4 hình ảnh. Vui lòng xóa ảnh cũ nếu muốn thay đổi ảnh khác."), location.reload())
        }
    })), !1
}

function addPicsLopTX(e, t) {
    var n;
    return $img_file = $("#img_file").val(), $type_img_file = $("#img_file").val().split(".").pop().toLowerCase(), "" != $img_file && -1 == $.inArray($type_img_file, ["png", "jpeg", "jpg"]) ? alert("File hình ảnh phải ở định dạng: 'png', 'jpeg', 'jpg'") : (n = document.getElementById(t), t = $("#img_file").prop("files")[0], (n = new FormData(n)).append("file", t), $.ajax({
        url: "../" + e + "/frmpicsadd",
        type: "POST",
        data: n,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="screen scr" style="z-index:999"></div>')
        },
        success: function(e) {
            0 == e.status && (alert("Lỗi, không tìm thấy thông tin!"), location.reload()), 1 == e.status && (alert("Đã tải lên hình ảnh thành công!"), location.reload()), 2 == e.status && (alert("Dung lượng File quá lớn (=< 10MB)"), $(".scr").remove(), $("body").append('<div class="screen screen2"></div>')), 3 == e.status && (alert("Lỗi, Vui lòng kiểm tra kết và thử lại!"), location.reload()), 4 == e.status && (alert("File hình ảnh phải ở định dạng: 'png', 'jpeg', 'jpg'"), $(".scr").remove(), $("body").append('<div class="screen screen2"></div>')), 5 == e.status && (alert("Đã đủ 4 hình ảnh. Bạn chỉ có thể lưu được tối đa 4 hình ảnh. Vui lòng xóa ảnh cũ nếu muốn thay đổi ảnh khác."), location.reload())
        }
    })), !1
}

function showPicsLop(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + t + "/" + n,
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                }), $("html, body").removeAttr("style")
            })), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 4e3
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function showPicsLopTX(e, t, n) {
    return $.ajax({
        type: "POST",
        url: "../" + t + "/" + n,
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                }), $("html, body").removeAttr("style")
            })), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 4e3
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function deletePics(t, e, n) {
    return !1 === window.confirm("Bạn có muốn xóa?") || $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: "code=" + t,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#pics_" + t).remove()), 0 == e.status && (alert("Không có mẫu tin nào để xóa."), $(".scr").remove()), 2 == e.status && (alert("Lỗi..., Vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function deletePicsTX(t, e, n) {
    return !1 === window.confirm("Bạn có muốn xóa?") || $.ajax({
        type: "POST",
        url: "../" + e + "/" + n,
        data: "code=" + t,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#pics_" + t).remove()), 0 == e.status && (alert("Không có mẫu tin nào để xóa."), $(".scr").remove()), 2 == e.status && (alert("Lỗi..., Vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function KetSoLop(e, t, n) {
    return !1 === window.confirm("Sau khi kết số tháng, các thông tin sẽ được lưu trữ chính xác và không thể chỉnh sửa. Bạn có muốn?") || $.ajax({
        type: "POST",
        url: root + t + "/ketso",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && alert("Đã kết sổ " + e.msg + " thành công!"), 0 == e.status && alert("Tất cả các thông tin đã được kết sổ trước đó!"), 2 == e.status && alert("Lỗi... Vui lòng kiểm tra kết nối và thử lại!"), location.reload()
        }
    }), !1
}

function viewLop(e) {
    return $.ajax({
        type: "POST",
        url: root + "lop/detail",
        data: "code=" + e + "&action=viewLop",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str)), 0 == e.status && (alert("Không tìm thấy mẫu tin... Vui lòng nhấn F5 và thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng nhấn F5 và thử lại!"), location.reload()), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function changeLoaiPT(e, t) {
    $.ajax({
        type: "POST",
        url: root + "suachua/loai",
        data: "val=" + e + "&stt=" + t + "&action=changeLoaiPT",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            $(".src").remove(), $("#loaipt_" + t).html(e)
        }
    })
}

function changeLoaiPTEdit(e, t) {
    $.ajax({
        type: "POST",
        url: root + "suachua/loai2",
        data: "val=" + e + "&stt=" + t + "&action=changeLoaiPT",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            $(".src").remove(), $("#loaipt_" + t).html(e)
        }
    })
}

function changeLoaiPTTX(e, t) {
    $.ajax({
        type: "POST",
        url: "../suachua/loaitx",
        data: "val=" + e + "&stt=" + t + "&action=changeLoaiPT",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            $(".src").remove(), $("#loaipt_" + t).html(e)
        }
    })
}

function changeLoaiPT2(e, t) {
    $.ajax({
        type: "POST",
        url: root + "dexuat/loai",
        data: "val=" + e + "&stt=" + t + "&action=changeLoaiPT2",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            $(".src").remove(), $("#loaipt_" + t).html(e)
        }
    })
}

function changeLoaiPT2TX(e, t) {
    $.ajax({
        type: "POST",
        url: "?mod=dexuat&act=loai",
        data: "val=" + e + "&stt=" + t + "&action=changeLoaiPT2",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            $(".src").remove(), $("#loaipt_" + t).html(e)
        }
    })
}

function addSuaChua() {
    var e = $('form[name="frmSuaChua"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "suachua/add",
        data: e + "&action=addSuaChua",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã thêm thông tin thành công!"), location.href = root + "suachua"), 2 == e.status && ($("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove(), $(".js_status").html(e.msg)), 0 == e.status && (alert("Có vài mẫu tin trùng nhau, vui lòng kiểm tra lại trước khi lưu!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove(), $(".js_status").html(e.msg)), 3 == e.status && (alert("Không thể thêm mẫu tin vào tháng đã kết số trước đó!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove(), $(".js_status").html(e.msg)), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            })
        }
    }), !1
}

function addSuaChuaTX() {
    var e = $('form[name="frmSuaChua"]').serialize();
    return $.ajax({
        type: "POST",
        url: "../suachua/addtx",
        data: e + "&action=addSuaChua",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            console.log(e), 1 == e.status && (alert("Chúc mừng, đã thêm thông tin thành công!"), location.href = "?mod=suachua"), 2 == e.status && ($("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove(), $(".js_status").html(e.msg)), 0 == e.status && (alert("Có vài mẫu tin trùng nhau, vui lòng kiểm tra lại trước khi lưu!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove(), $(".js_status").html(e.msg)), 3 == e.status && (alert("Không thể thêm mẫu tin vào tháng đã kết số trước đó!"), $("html, body").animate({
                scrollTop: 0
            }), $(".screen").remove(), $(".js_status").html(e.msg)), $(document).on("click", ".close_msg", function() {
                $(".js_status").html("")
            })
        }
    }), !1
}

function frmKhachHang(e, t) {
    return $.ajax({
        type: "POST",
        url: root + e + "/frm",
        data: "action=" + t,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".select").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            })
        }
    }), !1
}

function checkKhachHang(e, t, n) {
    e = $("#" + e).val();
    return 10 == e.length && $.ajax({
        type: "POST",
        url: root + t + "/kiemtra",
        data: "val=" + e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".check").html('<i class="fa fa-spinner faa-spin animated"></i> Đang kiểm tra...').show()
        },
        success: function(e) {
            1 == e.status && ($(".check").html(e.str), $("#flag").attr("value", "1")), 0 == e.status && ($(".check").html("").hide(), $("#flag").attr("value", "0")), 2 == e.status && (alert("Lỗi..., vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function selectPT(e, t) {
    $.ajax({
        type: "POST",
        url: root + "khachhang/bophan",
        data: "val=" + e + "&code=" + t,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen srcnv" style="z-index:99999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".srcnv").remove(), $("#nvptkh").html(e.str)), 0 == e.status && ($(".srcnv").remove(), $("#nvptkh").html(e.str))
        }
    })
}

function addKhachHang(e, t, n) {
    e = $('form[name="' + e + '"]').serialize();
    return 1 == $("#flag").val() ? (alert("Khách hàng này đã tồn tại trong hệ thống!"), $("#phone").focus()) : $.ajax({
        type: "POST",
        url: root + t + "/add",
        data: e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:99999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 0 == e.status && (alert(e.str), $(".screen").remove(), $("body").prepend('<div class="screen screen2"></div>')), 2 == e.status && (alert(e.str), location.reload()), 3 == e.status && (alert(e.str), $(".screen").remove(), $("body").prepend('<div class="screen screen2"></div>'))
        }
    }), !1
}

function viewKhachHang(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + t + "/detail",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            console.log(e), $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                })
            })
        }
    }), !1
}

function editKhachHang(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + t + "/edit",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".select").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            })
        }
    }), !1
}

function updateKhachHang(e, t, n) {
    var a = $('form[name="' + e + '"]').serialize(),
        e = $("#" + e).attr("data-id");
    return $.ajax({
        type: "POST",
        url: root + t + "/update",
        data: a + "&code=" + e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 0 == e.status && (alert(e.str), location.reload()), 2 == e.status && (alert(e.str), location.reload()), 3 == e.status && (alert(e.str), $("#phone").focus(), $(".screen").remove(), $("body").prepend('<div class="screen screen2"></div>')), 4 == e.status && (alert(e.str), $(".screen").remove(), $("body").prepend('<div class="screen screen2"></div>'))
        }
    }), !1
}

function loadList(n, e, a, o) {
    return $.ajax({
        type: "POST",
        url: root + n + "/list",
        data: "code=" + a + "&action=" + e + "&flag=" + o,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".body_sp").html("");
            var t = 1;
            $(document).on("click", "#add_new_rows_" + o, function() {
                var e = $(".body_sp");
                return $('<p class="row_sp" style="width:100%;clear:both;margin:5px 0 0 0"><input type="text" name="ds[' + t + '][tensp]" placeholder="Nhập tên sản phẩm cần thêm mới" style="width:90%;float:left;background:#f5f5f5;margin:0 10px 0 0" required="required"><a href="javascript:void(0);" class="trash_sp red" style="line-height:34px"><i class="fa fa-trash"></i></a></p>').appendTo(e), $(".stsp").css({
                    display: "block"
                }), t++, !1
            }), $(document).on("click", ".trash_sp", function() {
                return 1 < t && ($(this).parents(".row_sp").remove(), t--), 1 == t && $(".stsp").css({
                    display: "none"
                }), !1
            }), $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + n + "/list_search",
                    data: "code=" + a + "&key=" + e + "&flag=" + o,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function loadListTX(n, e, a, o) {
    return $.ajax({
        type: "POST",
        url: "../" + n + "/list",
        data: "code=" + a + "&action=" + e + "&flag=" + o,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".body_sp").html("");
            var t = 1;
            $(document).on("click", "#add_new_rows_" + o, function() {
                var e = $(".body_sp");
                return $('<p class="row_sp" style="width:100%;clear:both;margin:5px 0 0 0"><input type="text" name="ds[' + t + '][tensp]" placeholder="Nhập tên sản phẩm cần thêm mới" style="width:90%;float:left;background:#f5f5f5;margin:0 10px 0 0" required="required"><a href="javascript:void(0);" class="trash_sp red" style="line-height:34px"><i class="fa fa-trash"></i></a></p>').appendTo(e), $(".stsp").css({
                    display: "block"
                }), t++, !1
            }), $(document).on("click", ".trash_sp", function() {
                return 1 < t && ($(this).parents(".row_sp").remove(), t--), 1 == t && $(".stsp").css({
                    display: "none"
                }), !1
            }), $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: "../" + n + "/list_search",
                    data: "code=" + a + "&key=" + e + "&flag=" + o,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function loadList2(n, e, a, o) {
    return $.ajax({
        type: "POST",
        url: root + n + "/list_giaichi",
        data: "code=" + a + "&action=" + e + "&flag=" + o,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".body_sp").html("");
            var t = 1;
            $(document).on("click", "#add_new_rows_" + o, function() {
                var e = $(".body_sp");
                return $('<p class="row_sp" style="width:100%;clear:both;margin:5px 0 0 0"><input type="text" name="ds[' + t + '][tensp]" placeholder="Nhập tên sản phẩm cần thêm mới" style="width:90%;float:left;background:#f5f5f5;margin:0 10px 0 0" required="required"><a href="javascript:void(0);" class="trash_sp red" style="line-height:34px"><i class="fa fa-trash"></i></a></p>').appendTo(e), $(".stsp").css({
                    display: "block"
                }), t++, !1
            }), $(document).on("click", ".trash_sp", function() {
                return 1 < t && ($(this).parents(".row_sp").remove(), t--), 1 == t && $(".stsp").css({
                    display: "none"
                }), !1
            }), $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + n + "/list_giaichi_search",
                    data: "code=" + a + "&key=" + e + "&flag=" + o,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function loadList2TX(n, e, a, o) {
    return $.ajax({
        type: "POST",
        url: "../" + n + "/list_giaichi",
        data: "code=" + a + "&action=" + e + "&flag=" + o,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".body_sp").html("");
            var t = 1;
            $(document).on("click", "#add_new_rows_" + o, function() {
                var e = $(".body_sp");
                return $('<p class="row_sp" style="width:100%;clear:both;margin:5px 0 0 0"><input type="text" name="ds[' + t + '][tensp]" placeholder="Nhập tên sản phẩm cần thêm mới" style="width:90%;float:left;background:#f5f5f5;margin:0 10px 0 0" required="required"><a href="javascript:void(0);" class="trash_sp red" style="line-height:34px"><i class="fa fa-trash"></i></a></p>').appendTo(e), $(".stsp").css({
                    display: "block"
                }), t++, !1
            }), $(document).on("click", ".trash_sp", function() {
                return 1 < t && ($(this).parents(".row_sp").remove(), t--), 1 == t && $(".stsp").css({
                    display: "none"
                }), !1
            }), $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: "../" + n + "/list_giaichi_search",
                    data: "code=" + a + "&key=" + e + "&flag=" + o,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function loadList3(t, e, n, a) {
    return $.ajax({
        type: "POST",
        url: root + t + "/list_giaichi_nv",
        data: "code=" + n + "&action=" + e + "&flag=" + a,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + t + "/list_giaichi_search_nv",
                    data: "code=" + n + "&key=" + e + "&flag=" + a,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function loadListMooc() {
    return $.ajax({
        type: "POST",
        url: root + "dexuat/list_mooc",
        data: "code=1",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2,.screen_petro").fadeOut().remove()
            }), $(".mooc_class").on("change", function() {
                var e = "",
                    t = "";
                $(".mooc_class:checked").each(function() {
                    e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                }), $("#soromooc").val(e.substring(0, e.length - 1)), $("#romooc_id").attr("value", t.substring(0, t.length - 1))
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val().trim();
                $.ajax({
                    type: "POST",
                    url: root + "dexuat/list_mooc_search",
                    data: "key=" + e + "&code=1",
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".mooc_class").on("change", function() {
                            var e = "",
                                t = "";
                            $(".mooc_class:checked").each(function() {
                                e += $(this).val() + ";", t += $(this).attr("data-id") + ","
                            }), $("#soromooc").val(e.substring(0, e.length - 1)), $("#romooc_id").attr("value", t.substring(0, t.length - 1))
                        })
                    }
                })
            })
        }
    }), !1
}

function addNewSP() {
    var e = $('form[name="frmDSSP"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "sp/add",
        data: e + "&code=1",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr2" style="z-index:99999"></div>')
        },
        success: function(e) {
            2 == e.status && (alert(e.str), $(".scr2").remove()), 1 == e.status && (alert(e.str), $(".scr2").remove(), $(".popup2,.screen_petro").fadeOut().remove(), $("#" + e.btn).click()), 0 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function getValueKH(e, t, n, a, o, i) {
    $("#makh_ajax").attr("value", e), $("#khachhang_ajax").attr("value", t), $("#congty_ajax").attr("value", n), $("#sodienthoai_ajax").attr("value", i), $("#diachi_ajax").attr("value", a), $("#mst_ajax").attr("value", o), $(".hidepax").fadeIn(), $.ajax({
        type: "POST",
        url: root + "vandon/tuyen",
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup2").prepend('<div class="screen scr" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#filter_tuyen").html(e.str)), 0 == e.status && (alert(e.str), $(".scr").remove(), $("#filter_tuyen").html(e.data)), 2 == e.status && (alert(e.str), $("#filter_tuyen").html(e.data), location.reload())
        }
    })
}

function getValueKHRoi(e, t, n, a, o, i) {
    $("#makh_ajax").attr("value", e), $("#khachhang_ajax").attr("value", t), $("#congty_ajax").attr("value", n), $("#sodienthoai_ajax").attr("value", i), $("#diachi_ajax").attr("value", a), $("#mst_ajax").attr("value", o), $(".hidepax").fadeIn(), $.ajax({
        type: "POST",
        url: root + "hangroi/tuyen",
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup2").prepend('<div class="screen scr" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#filter_tuyen").html(e.str)), 0 == e.status && (alert(e.str), $(".scr").remove(), $("#filter_tuyen").html(e.data)), 2 == e.status && (alert(e.str), $("#filter_tuyen").html(e.data), location.reload())
        }
    })
}

function getValueKHRoi2(e, t, n, a, o, i) {
    $("#makh_ajax").attr("value", e), $("#khachhang_ajax").attr("value", t), $("#congty_ajax").attr("value", n), $("#sodienthoai_ajax").attr("value", i), $("#diachi_ajax").attr("value", a), $("#mst_ajax").attr("value", o), $(".hidepax").fadeIn(), $.ajax({
        type: "POST",
        url: root + "baogiatuyen/tuyen",
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup2").prepend('<div class="screen scr" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#filter_tuyen").html(e.str)), 0 == e.status && (alert(e.str), $(".scr").remove(), $("#filter_tuyen").html(e.data)), 2 == e.status && (alert(e.str), $("#filter_tuyen").html(e.data), location.reload())
        }
    })
}

function getValueKHRoi3(e, t, n, a, o, i) {
    $("#makh_ajax").attr("value", e), $("#khachhang_ajax").attr("value", t), $("#congty_ajax").attr("value", n), $("#sodienthoai_ajax").attr("value", i), $("#diachi_ajax").attr("value", a), $("#mst_ajax").attr("value", o), $(".hidepax").fadeIn(), $.ajax({
        type: "POST",
        url: root + "baogiahangroi/tuyen",
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup2").prepend('<div class="screen scr" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#filter_tuyen").html(e.str)), 0 == e.status && (alert(e.str), $(".scr").remove(), $("#filter_tuyen").html(e.data)), 2 == e.status && (alert(e.str), $("#filter_tuyen").html(e.data), location.reload())
        }
    })
}

function getValueKHRoi4(e, t, n, a, o, i, c, s) {
    $("#makh_ajax").attr("value", n), $("#khachhang_ajax").attr("value", a), $("#congty_ajax").attr("value", o), $("#sodienthoai_ajax").attr("value", s), $("#diachi_ajax").attr("value", i), $("#mst_ajax").attr("value", c), $(".hidepax").fadeIn(), $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup2").prepend('<div class="screen scr" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".scr").remove(), $("#filter_tuyen").html(e.str)), 0 == e.status && (alert(e.str), $(".scr").remove(), $("#filter_tuyen").html(e.data)), 2 == e.status && (alert(e.str), $("#filter_tuyen").html(e.data), location.reload())
        }
    })
}

function selectBangGia(e, t, n) {
    $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("#tgbook_option,#tgbook").html(""), $(".popup2").prepend('<div class="screen scr" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($("#tgbook_option").html(e.str), 2 == e.flag ? ($(".contvc").addClass("scroll"), $("#step7_submit").css({
                display: "block"
            })) : ($(".contvc").removeClass("scroll"), $("#step7_submit").css({
                display: "none"
            }))), 2 == e.status && ($("#tgbook_option").html(e.str1), $("#tgbook_option2").html(e.str)), 0 == e.status && (alert(e.str), location.reload()), 1 == $("#initMap").length && 1 == $("#map").length && $("#initMap").click(), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".picker2").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: 0
            }), $(".picker3").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: e.min_date
            });
            var a = 1;
            $("#add_file").on("click", function() {
                var n = a;
                $file = "'file_" + n + "'", $show_name_id = "'show_name_id_" + n + "'";
                var e = $(".body_file"),
                    t = '<div class="body_file_tr" style="width:100%;float:left"><span style="position:relative;width:86px;height:34px;display: inline-block;line-height: 34px;float: left;background: #0c8885;text-align: center;font-weight: bold;color: #fff;border-radius: 3px;"><i class="fa fa-plus"></i> Chọn file <input type="file" name="pdf_file[]" id="file_' + a + '" onchage="getFileName(' + $file + "," + $show_name_id + ')" accept=".pdf,.doc,.docx,.xls,.xlsx" style="opacity:0;position:absolute;left: 0;top: 0;width: 86px;height: 26px;"> </span> <div style="width:83.5%;float:right"> <div style="width:91.5%;float: left"> <select name="file_name[]" class="select_add_' + a + '" placeholder="Chọn hoặc nhập tên file..." required> <option value="">Chọn hoặc nhập tên file...</option> <option value="Booking Confirmation">Booking Confirmation</option> <option value="Booking Receipt Notice">Booking Receipt Notice</option> <option value="Booking note">Booking note</option> <option value="Delivery Order">Delivery Order</option> <option value="ERO">Empty Release Order</option><option value="EDO">e-Delivery Order</option><option value="Delay Note">Delay Note</option><option value="Booking Amendment">Booking Amendment</option><option value="PKL">PKL</option> <option value="VGM">VGM</option> <option value="Bill">Bill</option> <option value="SI">SI</option> </select> </div> <a href="javascript:void(0)" style="display:block;float:right;width:34px;height:34px;line-height:34px;text-align:center;color:red;font-size:1.3rem" class="trash_file"><i class="fa fa-trash"></i></a> </div> <div id="show_name_id_' + a + '" style="padding:5px 0;color:red;clear:both"></div></div>';
                return $(t).appendTo(e), $(".select_add_" + n).selectize({
                    create: !0
                }), $("#file_" + n).on("change", function(e) {
                    var t = document.getElementById("file_" + n);
                    document.getElementById("show_name_id_" + n).innerHTML = "File name: " + t.files.item(0).name, t.style.color = "red", t.style.background = "red"
                }), a++, !1
            }), $(document).on("click", ".trash_file", function() {
                return 1 < a && ($(this).parents(".body_file_tr").remove(), a--), !1
            });
            var n = $("#add_waypoint").attr("data-id");
            $("#add_waypoint").on("click", function() {
                var e = "'waypoints_" + n + "'",
                    t = $(".body_waypoint");
                $('<tr class="tr_waypoint"><td width="24%"><b class="green">Điểm dừng ' + n + '</b></td> <td><input type="search" name="waypoints[]" id="' + e + '" style="width:93%;background:#c9f2dd"/> <a href="javascript:void(0)" class="trash_waypoint" title="Xóa điểm" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td> </tr>').appendTo(t), new google.maps.places.Autocomplete(document.getElementById(e)), n++
            }), $(document).on("click", ".trash_waypoint", function() {
                return 1 < n && ($(this).parents(".tr_waypoint").remove(), n--), !1
            });
            var t = $("#add_cont_seal").attr("data-id");
            $("#add_cont_seal").on("click", function() {
                var e = $(".body_cont_seal");
                $('<tr class="row_cont_seal"> <td align="center">' + t + '</td> <td><input type="text" name="tr[' + t + '][macont]" placeholder="Nhập mã cont" maxlength="100" required></td> <td><input type="text" name="tr[' + t + '][soseal]" placeholder="Nhập mã seal (nếu có)" maxlength="100"></td> <td><input type="text" name="tr[' + t + '][taitrong]" placeholder="Tổng trọng lượng (nếu có)" maxlength="15"></td> <td><a href="javascript:void(0)" class="trash_cont_seal" title="Xóa dòng" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), t++
            }), $(document).on("click", ".trash_cont_seal", function() {
                return 1 < t && ($(this).parents(".row_cont_seal").remove(), t--), !1
            }), $(".select_add").selectize({
                create: !0
            }), DinhDangTien()
        }
    })
}

function getValueNCC(e, t, n) {
    $("#id_ncc").attr("value", e), $("#id_ncc_" + n).attr("value", e), $("#tenncc").attr("value", t), $("#tenncc_" + n).attr("value", t), $(".close_this,.screen").remove()
}

function getLoaiGiaiChi(e, t, n) {
    $("#chiphi_" + n).attr("value", t), $("#chiphi_up" + n).attr("value", t), $("#id_loaiphi_" + n).attr("value", e), $("#id_loaiphi_up" + n).attr("value", e), $(".close_this,.screen_petro").remove()
}

function getLoaiGiaiChi2(e, t, n) {
    $("#chiphi2_" + n).attr("value", t), $("#chiphi2_up" + n).attr("value", t), $("#id_loaiphi2_" + n).attr("value", e), $("#id_loaiphi2_up" + n).attr("value", e), $(".close_this,.screen_petro").remove()
}

function getLoaiPhuThu(e, t, n) {
    $("#tenloaiphi_pt_" + n).attr("value", t), $("#id_loaiphi_pt_" + n).attr("value", e)
}

function getSanPham(e, t, n, a) {
    $("#tensp_" + a).attr("value", t), $("#id_sp_" + a).attr("value", e)
}

function getHangMuc(e, t, n) {
    $("#hmsc_" + n).attr("value", t), $("#id_hmsc_" + n).attr("value", e)
}

function getLoaiChi(e, t) {
    $("#name_lc").attr("value", e), $("#id_lc").attr("value", t), $(".screen_petro,.close_this").remove()
}

function getRoMooc(e, t) {
    $("#romooc_id").attr("value", e), $("#soromooc").attr("value", t)
}

function previewImg(e, t) {
    var n = t,
        a = document.getElementById("img_file").files,
        o = [];
    if ($(".view_pics").fadeIn(), a.length > n) alert("Bạn chỉ được chọn tối đa " + t + " hình ảnh ('png', 'jpeg', 'jpg')"), $("#img_file").val(""), $(".view_pics").html("");
    else
        for ($(".view_pics").html(""), i = 0; i < a.length; i++) - 1 === o.indexOf(a[i].name) && ($(".view_pics").append('<img src="" id="' + i + '">'), $(".view_pics img:eq(" + i + ")").attr("src", URL.createObjectURL(e.target.files[i])))
}

function previewImg2(e, t) {
    document.getElementById("img_file_" + t).files;
    var n = document.getElementById("view_pics_" + t),
        e = (document.getElementById("img_file_" + t).files, URL.createObjectURL(e.target.files[0]));
    n.append('<img src="' + e + '" id="' + t + '">')
}

function frmPhieuChi(e, t) {
    return $.ajax({
        type: "POST",
        url: root + e + "/frm",
        data: "action=" + t,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), DinhDangTien(), $(".select").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            }), FuncTionHoaDon()
        }
    }), !1
}

function addPhieuChi(e, t, n, a) {
    var o, i, c;
    return "img_file" != a && "pdf_file" != a || (i = document.getElementById(n), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a ? (i = document.getElementById(n), c = new FormData(i)) : $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.str), location.reload()), 3 == e.status && (alert(e.str), location.reload()), 5 == e.status && (alert(e.str), location.reload()), 2 != e.status && 4 != e.status && 6 != e.status && 7 != e.status || (alert(e.str), $(".src").remove()), 0 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function editPhieuChi(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + t + "/edit",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str)), 0 == e.status && (alert("Không tìm thấy mẫu tin. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi..., Không thể hiển thị mẫu tin. Vui lòng thử lại!"), location.reload()), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), DinhDangTien(), $(".select").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 4e3
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            }), FuncTionHoaDon()
        }
    }), !1
}

function updatePhieuChi(e, t, n, a) {
    var o, i, c;
    return "img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a ? (i = document.getElementById(t), c = new FormData(i)) : $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.str), location.reload()), 2 != e.status && 5 != e.status || (alert(e.str), $(".src").remove()), 0 != e.status && 3 != e.status && 4 != e.status && 6 != e.status && 7 != e.status || (alert(e.str), location.reload())
        }
    }), !1
}

function printPhieuChi(e, t) {
    return $.ajax({
        url: root + t + "/print",
        data: "code=" + e + "&action=printPhieuChi",
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".src").remove(), (t = window.open()).document.write("<title>In phiếu</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Không thể in phiếu chưa được duyệt. Vui lòng liên hệ bộ phận kiểm duyệt!"), location.reload())
        }
    }), !1
}

function viewPhieuChi(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + t + "/detail",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 4e3
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function FuncTionHoaDon() {
    var n = $("#add_sohoadon").attr("data-id");
    $("#add_sohoadon").on("click", function() {
        var e = $(".body_sohoadon");
        $('<tr class="row_sohoadon"> <td align="center">' + n + '</td> <td><input type="text" name="tr[' + n + '][vat]" class="number-format" placeholder="% VAT" maxlength="5" required></td> <td><input type="text" name="tr[' + n + '][sotien]" data-type="currency" placeholder="Số tiền" maxlength="30" required></td> <td><input type="text" name="tr[' + n + '][sohoadon]" placeholder="Số hóa đơn" maxlength="100" required></td> <td><input type="text" name="tr[' + n + '][ngay]" class="picker" placeholder="Ngày hóa đơn" maxlength="10" autocomplete="off" required></td> <td><input type="text" name="tr[' + n + '][ghichu]" placeholder="Ghi chú nếu có..." maxlength="255"></td> <td> <div class="filehid"> <input type="file" name="tr[' + n + '][img_file]" id="img_file_' + n + '" accept="image/*;capture=camera" title="Upload file hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_' + n + '"></div> </td> <td><a href="javascript:void(0)" class="trash_shd" title="Xóa dòng" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), NumberFormat(), DinhDangTien(), $(".picker").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "yy-mm-dd",
            changeMonth: !0,
            changeYear: !0
        });
        var t = n;
        $("#img_file_" + n).on("change", function(e) {
            e = URL.createObjectURL(e.target.files[0]);
            $("#view_pics_" + t).html('<img src="' + e + '">')
        }), n++
    }), $(document).on("click", ".trash_shd", function() {
        return 1 < n && ($(this).parents(".row_sohoadon").remove(), n--), !1
    })
}

function ActivePhieuChi0(t, e) {
    return $.ajax({
        type: "POST",
        url: root + e + "/active",
        data: "code=" + t + "&action=ActivePhieuChi0",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:99999"></div>'), $("#act_pc_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#act_pc_" + t).html('<img src="template/Default/images/check-1.png">'), location.reload()), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload()), 3 == e.status && (alert("Lỗi..., Số tiền chi vượt ngân sách trong quỹ (" + e.str + ")"), location.reload()), 4 == e.status && (alert(e.str), $(".scr").remove())
        }
    }), !1
}

function ActivePhieuChi1(t, e) {
    return $.ajax({
        type: "POST",
        url: root + e + "/active_open",
        data: "code=" + t + "&action=ActivePhieuChi1",
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:99999"></div>'), $("#act_pc_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), $("#act_pc_" + t).html('<img src="template/Default/images/check-0.png">'), location.reload()), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload())
        }
    }), !1
}

function editLoaiChi(e, t) {
    return $.ajax({
        type: "POST",
        url: root + t + "/edit",
        data: "code=" + e + "&action=editLoaiChi",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                }), $("html, body").removeAttr("style")
            })
        }
    }), !1
}

function updateHanMucChi(e) {
    var t = $("#frmLoaiChi").attr("data-id"),
        n = $('form[name="frmLoaiChi"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/update",
        data: n + "&code=" + t + "&action=updateHanMucChi",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && (alert("Cập nhật thông tin thành công!"), location.reload()), 0 == e && (alert("Thông tin không tồn tại, vui lòng thử lại!"), location.reload()), 2 == e && (alert("Lỗi..., vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function activeLoaiChi0(e, t) {
    return $.ajax({
        type: "POST",
        url: root + t + "/yes",
        data: "code=" + e + "&action=activeLoaiChi0",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && alert("Có lỗi, vui lòng F5 và thử lại!")
        }
    }), !1
}

function activeLoaiChi1(e, t) {
    return $.ajax({
        type: "POST",
        url: root + t + "/no",
        data: "code=" + e + "&action=activeLoaiChi1",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e && location.reload(), 0 == e && (alert("Có lỗi, vui lòng F5 và thử lại!"), location.reload())
        }
    }), !1
}

function changeLoaiNhapList(e) {
    var t = $("#tinhtrangnhap_" + e).val();
    $("#tensp_" + e).attr("onclick", "return loadList('sp','LoadSanPham'," + t + "," + e + ")"), $("#tensp_" + e).removeAttr("value"), $("#id_sp_" + e).removeAttr("value")
}

function frmForm(e, t, y) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + y,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(n) {
            1 == n.status && ($(".screen").addClass("screen2"), $("body").prepend(n.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                }), $("html, body").removeAttr("style")
            }), $(".close_pop_this,.close_btn_this").on("click", function() {
                $(".close_this,.screen").fadeOut(150, function() {
                    $(this).remove()
                })
            })), 0 == n.status && (alert("Lỗi, Thông tin không tồn tại!"), location.reload()), 2 == n.status && (alert("Lỗi, vui lòng thử lại!"), location.reload()), 4 == n.status && (alert(n.str), location.reload()), 1 == $("#initMap").length && 1 == $("#map").length && $("#initMap").click(), 1 == $("#view_gps_" + y).length && $("#initMap_" + y).click(), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".picker2").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: 0
            }), $(".picker3").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: n.min_date
            }), $(".select").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            }), $(".select_add").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0,
                create: !0
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            });
            var t = 1;
            $("#add_phihaiquan").on("click", function() {
                var e = $(".body_phihaiquan");
                return $('<tr class="row_phihaiquan"><td align="center">' + t + '</td><td><input type="text" name="ds[' + t + '][noidung]" required placeholder="VD: Phí D/O"></td><td><input type="text" name="ds[' + t + '][sotien]" data-type="currency" required placeholder="VD: 1,000,000"></td><td><input type="text" name="ds[' + t + '][thuhuong]" required placeholder="Đơn vị thụ hưởng"></td><td align="center"><a href="javascript:void(0);" class="trash_phihaiquan"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), DinhDangTien(), t++, !1
            }), $(document).on("click", ".trash_phihaiquan", function() {
                return 1 < t && ($(this).parents(".row_phihaiquan").remove(), t--), !1
            });
            var a = $("#add_point").attr("data-id"),
                o = "'loaigiaichi'",
                i = "'LoadLoaiGiaiChi'";
            $("#add_point").on("click", function() {
                var e = $(".body_step");
                $('<tr class="row_point"> <td align="center"><b>' + a + '</b></td> <td><input type="text" name="tr[' + a + '][chiphi]" placeholder="Chọn loại phí" id="chiphi_' + a + '" onClick="return loadList2(' + o + "," + i + "," + a + ')" required class="readonly" readonly/> <input type="hidden" name="tr[' + a + '][id_loaiphi]" id="id_loaiphi_' + a + '"></td> <td><input type="text" name="tr[' + a + '][sotientra]" data-type="currency" placeholder="VD: 400,000" required/></td> <td><input type="text" name="tr[' + a + '][sotien]" data-type="currency" placeholder="VD: 500,000" required/></td> <td><input type="text" name="tr[' + a + '][sohoadon]" placeholder="Số hóa đơn" title="Số hóa đơn/chứng từ" style="width:97%" maxlength="50"> <td><input type="text" name="tr[' + a + '][ngayhoadon]" autocomplete="off" placeholder="Chọn ngày" class="picker" maxlength="10" style="width:97%"></td> </td> <td><select name="tr[' + a + '][thukhachhang]" style="width:100%" required> <option value="">Thu khách?</option> <option value="0">Không thu</option> <option value="1">Lưu công nợ</option> <option value="2">Thu riêng</option> </select></td> <td><select name="tr[' + a + '][chitu]" style="width:100%"> <option value="0">Tài xế chi</option> <option value="1" selected="selected">Công ty chi</option> <option value="2">Phí mặc định</option> </select></td> <td><input type="text" name="tr[' + a + '][ghichu]" placeholder="Nếu có..."/></td> <td align="center"><div class="filehid"> <input type="file" name="tr[' + a + '][img_file]" id="img_file_' + a + '" accept="image/*;capture=camera" title="Upload hình ảnh hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_' + a + '"></div></td> <td align="center"><input type="checkbox" name="tr[' + a + '][active]" value="1" checked></td> <td align="center"><a href="javascript:void(0);" class="trash" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".save_lenh").css({
                    display: "block"
                }), $(".picker3").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0,
                    minDate: n.min_date
                }), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), DinhDangTien();
                var t = a;
                return $("#img_file_" + a).on("change", function(e) {
                    e = URL.createObjectURL(e.target.files[0]);
                    $("#view_pics_" + t).html('<img src="' + e + '">')
                }), a++, !1
            }), $(document).on("click", ".trash", function() {
                return 1 < a && ($(this).parents(".row_point").remove(), a--), !1
            });
            var c = n.list_taixe,
                s = $("#add_neo").attr("data-id");
            $("#add_neo").on("click", function() {
                var e, t;
                return void 0 !== c ? (e = $(".body_neo"), t = '<tr class="row_point_neo"> <td align="center"><b>' + s + '</b></td> <td><input type="text" name="neo[' + s + '][ngayneoxe]" class="picker readonly" placeholder="Ngày neo xe" maxlength="10" required autocomplete="off" style="width:97%"/></td> <td><input type="text" name="neo[' + s + '][sotienneo]" data-type="currency" value="1,000,000" placeholder="VD: 1,000,000" maxlength="10" required style="width:97%"/></td><td><input type="text" name="neo[' + s + '][luongneoxe]" data-type="currency" value="200,000" placeholder="VD: 200,000" maxlength="10" required style="width:97%"/></td>' + c + ' <td><input type="text" name="neo[' + s + '][ghichu]" placeholder="Lý do neo xe..." maxlength="255" required style="width:97%"/></td><td align="center"><a href="javascript:void(0);" class="trash_neo" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>', $(t).appendTo(e), $("#taixeid").attr("name", "neo[" + s + "][taixe]"), $("#taixeid").removeAttr("id")) : (e = $(".body_neo"), t = '<tr class="row_point_neo"> <td align="center"><b>' + s + '</b></td> <td><input type="text" name="neo[' + s + '][ngayneoxe]" class="picker readonly" placeholder="Ngày neo xe" maxlength="10" required autocomplete="off" style="width:97%"/></td><td><input type="text" name="neo[' + s + '][sotienneo]" data-type="currency" value="1,000,000" placeholder="VD: 1,000,000" maxlength="10" required style="width:97%"/></td><td><input type="text" name="neo[' + s + '][luongneoxe]" value="200,000" data-type="currency" placeholder="VD: 200,000" maxlength="10" required style="width:97%"/></td><td><input type="text" name="neo[' + s + '][ghichu]" placeholder="Lý do neo xe..." maxlength="255" required style="width:97%"/></td> <td align="center"><a href="javascript:void(0);" class="trash_neo" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>', $(t).appendTo(e)), $(".save_lenh_neo").css({
                    display: "block"
                }), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), $(".picker3").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0,
                    minDate: n.min_date
                }), DinhDangTien(), s++, !1
            }), $(document).on("click", ".trash_neo", function() {
                return 1 < s && ($(this).parents(".row_point_neo").remove(), s--), !1
            });
            var r = $("#add_point_nv1").attr("data-id"),
                o = "'loaigiaichi'",
                i = "'LoadLoaiGiaiChi'";
            $("#add_point_nv1").on("click", function() {
                var e = $(".body_step_nv1");
                $('<tr class="row_point_nv1"> <td align="center"><b>' + r + '</b></td> <td><input type="text" name="tr[' + r + '][chiphi]" placeholder="Chọn loại phí" id="chiphi_' + r + '" onClick="return loadList2(' + o + "," + i + "," + r + ')" required class="readonly" autocomplete="off"/> <input type="hidden" name="tr[' + r + '][id_loaiphi]" id="id_loaiphi_' + r + '"></td> <td><input type="text" name="tr[' + r + '][sotientra]" data-type="currency" placeholder="VD: 400,000" required/></td> <td><input type="text" name="tr[' + r + '][sotien]" data-type="currency" placeholder="VD: 500,000" required/></td> <td><input type="text" name="tr[' + r + '][sohoadon]" placeholder="Số hóa đơn" title="Số hóa đơn/chứng từ" style="width:97%" maxlength="50"></td> <td><input type="text" name="tr[' + r + '][ngayhoadon]" autocomplete="off" placeholder="Chọn ngày" class="picker" maxlength="10" style="width:97%"></td> <td><select name="tr[' + r + '][thukhachhang]" style="width:100%" required> <option value="">Thu khách?</option> <option value="0">Không thu</option> <option value="1">Lưu công nợ</option> <option value="2">Thu riêng</option> </select></td> <td><select name="tr[' + r + '][chitu]" style="width:100%"> <option value="0">Tài xế chi</option> <option value="1" selected="selected">Công ty chi</option> <option value="2">Phí mặc định</option> </select></td> <td><input type="text" name="tr[' + r + '][ghichu]" placeholder="Nếu có..."/></td> <td align="center"><div class="filehid"> <input type="file" name="tr[' + r + '][img_file]" id="img_file_1_' + r + '" accept="image/*;capture=camera" title="Upload hình ảnh hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_1_' + r + '"></div></td> <td align="center"><input type="checkbox" name="tr[' + r + '][active]" value="1" checked></td> <td align="center"><a href="javascript:void(0);" class="trash_nv1" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker3").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0,
                    minDate: n.min_date
                }), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), DinhDangTien();
                var t = r;
                return $("#img_file_1_" + r).on("change", function(e) {
                    e = URL.createObjectURL(e.target.files[0]);
                    $("#view_pics_1_" + t).html('<img src="' + e + '">')
                }), r++, !1
            }), $(document).on("click", ".trash_nv1", function() {
                return 1 < r && ($(this).parents(".row_point_nv1").remove(), r--), !1
            });
            var l = $("#add_point_nv2").attr("data-id"),
                o = "'loaigiaichi'",
                i = "'LoadLoaiGiaiChi'";
            $("#add_point_nv2").on("click", function() {
                var e = $(".body_step_nv2");
                $('<tr class="row_point_nv2"> <td align="center"><b>' + l + '</b></td> <td><input type="text" name="tr2[' + l + '][chiphi]" placeholder="Chọn loại phí" id="chiphi2_' + l + '" onClick="return loadList3(' + o + "," + i + "," + l + ')" required class="readonly" autocomplete="off"/> <input type="hidden" name="tr2[' + l + '][id_loaiphi]" id="id_loaiphi2_' + l + '"></td> <td><input type="text" name="tr2[' + l + '][sotientra]" data-type="currency" placeholder="VD: 400,000" required/></td> <td><input type="text" name="tr2[' + l + '][sotien]" data-type="currency" placeholder="VD: 500,000" required/></td> <td><input type="text" name="tr2[' + l + '][sohoadon]" placeholder="Số hóa đơn" title="Số hóa đơn/chứng từ" style="width:97%" maxlength="50"></td> <td><input type="text" name="tr2[' + l + '][ngayhoadon]" autocomplete="off" placeholder="Chọn ngày" class="picker" maxlength="10" style="width:97%"></td> <td><select name="tr2[' + l + '][thukhachhang]" style="width:100%"> <option value="0">Không thu</option> <option value="1">Lưu công nợ</option> <option value="2">Thu riêng</option> </select></td> <td><select name="tr2[' + l + '][chitu2]" style="width:100%"> <option value="0" selected="selected">Tài xế chi</option> <option value="1">Công ty chi</option> <option value="2">Phí mặc định</option> </select></td> <td><input type="text" name="tr2[' + l + '][ghichu]" placeholder="Nếu có..."/></td> <td align="center"><div class="filehid"> <input type="file" name="tr2[' + l + '][img_file]" id="img_file_2_' + l + '" accept="image/*;capture=camera" title="Upload hình ảnh hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_2_' + l + '"></div></td> <td align="center"><input type="checkbox" name="tr2[' + l + '][active]" value="1" checked></td> <td align="center"><a href="javascript:void(0);" class="trash_nv2" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker3").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0,
                    minDate: n.min_date
                }), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), DinhDangTien();
                var t = l;
                return $("#img_file_2_" + l).on("change", function(e) {
                    e = URL.createObjectURL(e.target.files[0]);
                    $("#view_pics_2_" + t).html('<img src="' + e + '">')
                }), l++, !1
            }), $(document).on("click", ".trash_nv2", function() {
                return 1 < l && ($(this).parents(".row_point_nv2").remove(), l--), !1
            });
            var d = $("#add_tangca").attr("data-id");
            $("#add_tangca").on("click", function() {
                var e = $(".body_tangca");
                return $('<tr class="row_tangca"><td align="center">' + d + '</td><td><input type="text" name="tr[' + d + '][ngay]" class="picker" placeholder="Chọn ngày" autocomplete="off" required></td><td><input type="number" name="tr[' + d + '][gio1]" min="0" max="23" placeholder="Giờ" onkeypress="checkIt(event)" style="width:45%;float:left" required><input type="number" name="tr[' + d + '][phut1]" min="0" max="59" placeholder="Phút" onkeypress="checkIt(event)" style="width:45%;float:right" required></td><td><input type="number" name="tr[' + d + '][gio2]" min="0" max="23" placeholder="Giờ" onkeypress="checkIt(event)" style="width:45%;float:left" required><input type="number" name="tr[' + d + '][phut2]" min="0" max="59" placeholder="Phút" onkeypress="checkIt(event)" style="width:45%;float:right" required></td><td><input type="text" name="tr[' + d + '][noidung]" placeholder="Nội dung" required></td><td align="center"><a href="javascript:void(0)" style="font-size:1.2rem" class="trash_tangca"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), d++, !1
            }), $(document).on("click", ".trash_tangca", function() {
                return 1 < d && ($(this).parents(".row_tangca").remove(), d--), !1
            });
            var p = $("#add_loaiphi").attr("data-id");
            $("#add_loaiphi").on("click", function() {
                var e = $(".body_loaiphi");
                return $('<tr class="row_loaiphi"><td align="center">' + p + '</td><td><input type="text" name="tr[' + p + '][noidung]" placeholder="Nội dung..." required></td><td><select name="tr[' + p + '][loaiphi]" required><option value="">Loại phí</option><option value="0">Trừ phí khác</option><option value="1">Phí hỗ trợ</option><option value="2">Thưởng nóng</option></select></td><td><input type="text" name="tr[' + p + '][sotien]" data-type="currency" placeholder="VD: 500,000" required></td><td align="center"><a href="javascript:void(0)" style="font-size:1.2rem" class="trash_loaiphi"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), DinhDangTien(), p++, !1
            }), $(document).on("click", ".trash_loaiphi", function() {
                return 1 < p && ($(this).parents(".row_loaiphi").remove(), p--), !1
            });
            var u = $("#add_xephikhac").attr("data-id");
            $("#add_xephikhac").on("click", function() {
                var e = $(".xephikhac");
                $('<tr class="row_xephikhac"><td align="center">' + u + '</td><td><input type="text" name="ds[' + u + '][loaiphi]" placeholder="Tên loại phí" required></td><td><input type="text" name="ds[' + u + '][sotien]" data-type="currency" placeholder="Số tiền" required></td><td align="center"><a href="javascript:void(0);" class="trash_xephikhac" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), DinhDangTien(), u++
            }), $(document).on("click", ".trash_xephikhac", function() {
                return 1 < u && ($(this).parents(".row_xephikhac").remove(), u--), !1
            });
            var h = $("#add_hq").attr("data-id");
            $("#add_hq").on("click", function() {
                var e = $(".body_hq");
                $('<tr class="row_hq"> <td align="center">' + h + '</td> <td><input type="text" name="tr[' + h + '][loaiphi]" placeholder="Tên loại phí" required></td> <td><input type="text" name="tr[' + h + '][sotien]" data-type="currency" placeholder="VD: 1,500,000" required></td> <td><input type="text" name="tr[' + h + '][vat]" placeholder="Số hóa đơn"></td> <td><input type="text" name="tr[' + h + '][vat_ngay]" autocomplete="off" onkeydown="return false;" onpaste="return false;" class="picker" placeholder="Ngày hóa đơn"></td> <td><select name="tr[' + h + '][thukhachhang]" style="width:100%" required> <option value="0">Không</option> <option value="1" selected>Có</option> </select></td> <td><select name="tr[' + h + '][chitu]" style="width:100%" required> <option value="0" selected="selected">Công ty chi</option> <option value="1">Nhân sự chi</option> </select></td> <td><input type="text" name="tr[' + h + '][ghichu]" placeholder="Ghi chú..."></td> <td align="center"><div class="filehid"> <input type="file" name="tr[' + h + '][img_file]" id="img_file_' + h + '" accept="image/*;capture=camera" title="Upload hình ảnh hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_' + h + '"></div></td> <td align="center"><a href="javascript:void(0);" class="trash_hq"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), DinhDangTien();
                var t = h;
                return $("#img_file_" + h).on("change", function(e) {
                    e = URL.createObjectURL(e.target.files[0]);
                    $("#view_pics_" + t).html('<img src="' + e + '">')
                }), h++, !1
            }), $(document).on("click", ".trash_hq", function() {
                return 1 < h && ($(this).parents(".row_hq").remove(), h--), !1
            }), $("#img_file_" + y).on("change", function(e) {
                e = URL.createObjectURL(e.target.files[0]);
                $("#view_pics_" + y).html('<img src="' + e + '">')
            });
            var m = 1;
            $("#add_file").on("click", function() {
                var n = m;
                $file = "'file_" + n + "'", $show_name_id = "'show_name_id_" + n + "'";
                var e = $(".body_file"),
                    t = '<div class="body_file_tr" style="width:100%;float:left"><span style="position:relative;width:86px;height:34px;display: inline-block;line-height: 34px;float: left;background: #0c8885;text-align: center;font-weight: bold;color: #fff;border-radius: 3px;"><i class="fa fa-plus"></i> Chọn file <input type="file" name="pdf_file[]" id="file_' + m + '" onchage="getFileName(' + $file + "," + $show_name_id + ')" accept=".pdf,.doc,.docx,.xls,.xlsx" style="opacity:0;position:absolute;left: 0;top: 0;width: 86px;height: 26px;"> </span> <div style="width:83.5%;float:right"> <div style="width:91.5%;float: left"> <select name="file_name[]" class="select_add_' + m + '" placeholder="Chọn hoặc nhập tên file..." required> <option value="">Chọn hoặc nhập tên file...</option> <option value="Booking Confirmation">Booking Confirmation</option> <option value="Booking Receipt Notice">Booking Receipt Notice</option> <option value="Booking note">Booking note</option> <option value="Delivery Order">Delivery Order</option> <option value="ERO">Empty Release Order</option><option value="EDO">e-Delivery Order</option><option value="Delay Note">Delay Note</option><option value="Booking Amendment">Booking Amendment</option><option value="PKL">PKL</option> <option value="VGM">VGM</option> <option value="Bill">Bill</option> <option value="SI">SI</option> </select> </div> <a href="javascript:void(0)" style="display:block;float:right;width:34px;height:34px;line-height:34px;text-align:center;color:red;font-size:1.3rem" class="trash_file"><i class="fa fa-trash"></i></a> </div> <div id="show_name_id_' + m + '" style="padding:5px 0;color:red;clear:both"></div></div>';
                return $(t).appendTo(e), $(".select_add_" + n).selectize({
                    create: !0
                }), $("#file_" + n).on("change", function(e) {
                    var t = document.getElementById("file_" + n);
                    document.getElementById("show_name_id_" + n).innerHTML = "File name: " + t.files.item(0).name, t.style.color = "red", t.style.background = "red"
                }), m++, !1
            }), $(document).on("click", ".trash_file", function() {
                return 1 < m && ($(this).parents(".body_file_tr").remove(), m--), !1
            });
            var f = $("#add_waypoint").attr("data-id");
            $("#add_waypoint").on("click", function() {
                var e = "'waypoints_" + f + "'",
                    t = $(".body_waypoint");
                $('<tr class="tr_waypoint"><td width="24%"><b class="green">Điểm dừng ' + f + '</b></td> <td><input type="search" name="waypoints[]" id="' + e + '" style="width:93%;background:#c9f2dd"/> <a href="javascript:void(0)" class="trash_waypoint" title="Xóa điểm" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td> </tr>').appendTo(t), new google.maps.places.Autocomplete(document.getElementById(e)), f++
            }), $(document).on("click", ".trash_waypoint", function() {
                return 1 < f && ($(this).parents(".tr_waypoint").remove(), f--), !1
            });
            var v = $("#add_cont_seal").attr("data-id");
            $("#add_cont_seal").on("click", function() {
                var e = $(".body_cont_seal");
                $('<tr class="row_cont_seal"> <td align="center">' + v + '</td> <td><input type="text" name="tr[' + v + '][macont]" placeholder="Nhập mã cont" maxlength="100" required></td> <td><input type="text" name="tr[' + v + '][soseal]" placeholder="Nhập mã seal (nếu có)" maxlength="100"></td> <td><input type="text" name="tr[' + v + '][taitrong]" placeholder="Tổng trọng lượng (nếu có)" maxlength="15"></td> <td><a href="javascript:void(0)" class="trash_cont_seal" title="Xóa dòng" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), v++
            }), $(document).on("click", ".trash_cont_seal", function() {
                return 1 < v && ($(this).parents(".row_cont_seal").remove(), v--), !1
            });
            var g = $("#add_xuatkho").attr("data-id");
            $("#add_xuatkho").on("click", function() {
                var e = $(".body_xuatkho");
                $('<tr class="row_xuatkho"> <td align="center">' + g + '</td> <td><input type="text" name="tr[' + g + '][tensp]" id="tensp_' + g + "\" readonly onClick=\"return Load('dexuat','load_sp','load_sp_search'," + g + "," + g + ')" onkeydown="return false;" placeholder="Sản phẩm từ kho" required> <input type="hidden" name="tr[' + g + '][id_sp]" id="id_sp_' + g + '"></td> <td><input type="text" name="tr[' + g + '][donvi]" id="donvi_' + g + '" placeholder="ĐVT" readonly required></td> <td><input type="number" min="1" max="100" name="tr[' + g + '][soluong]" placeholder="VD: 2" required></td> <td><input type="text" name="tr[' + g + '][sotienchi]" id="sotienchi_' + g + '" data-type="currency" class="red" placeholder="0" readonly></td> <td><input type="text" name="tr[' + g + '][noidung]" maxlength="255" placeholder="Ghi chú..."></td> <td align="center"><a href="javascript:void(0)" class="trash trash_xuatkho"><i class="fa fa-trash"></i></a></td> </tr>').appendTo(e), DinhDangTien(), g++
            }), $(document).on("click", ".trash_xuatkho", function() {
                return 1 < g && ($(this).parents(".row_xuatkho").remove(), g--), !1
            }), $("#nx1").click(), $("#editor").length && CKEDITOR.replace("editor", {
                removePlugins: "image,about,blockquote,save,forms,scayt,pagebreak,flash"
            }), $("#editor1").length && CKEDITOR.replace("editor1", {
                removePlugins: "image,about,blockquote,save,forms,scayt,pagebreak,flash"
            }), $("#editor2").length && CKEDITOR.replace("editor1", {
                removePlugins: "image,about,blockquote,save,forms,scayt,pagebreak,flash"
            }), $(".readonly").on("keydown paste focus mousedown", function(e) {
                9 != e.keyCode && e.preventDefault()
            }), DinhDangTien(), FuncTionHoaDon()
        }
    }), !1
}

function frmFormTX(e, t, n) {
    return $.ajax({
        type: "POST",
        url: "../" + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(a) {
            1 == a.status && ($(".screen").addClass("screen2"), $("body").prepend(a.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                })
            })), 0 == a.status && (alert("Lỗi, Thông tin không tồn tại!"), location.reload()), 2 == a.status && (alert("Lỗi, vui lòng thử lại!"), location.reload()), 1 == $("#initMap").length && 1 == $("#map").length && $("#initMap").click(), 1 == $("#view_gps_" + n).length && $("#initMap_" + n).click(), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".picker2").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: 0
            }), $(".picker3").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: a.min_date
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            });
            var o = $("#add_point").attr("data-id");
            $loaigiaichi = "'loaigiaichi'", $LoadLoaiGiaiChi = "'LoadLoaiGiaiChi'", $("#add_point").on("click", function() {
                var e = $(".body_step"),
                    t = '<tr class="row_point"> <td align="center"><b>' + o + '</b></td> <td><input type="text" name="tr[' + o + '][chiphi]" placeholder="Chọn loại phí" id="chiphi_' + o + '" onClick="return loadList2TX(' + $loaigiaichi + "," + $LoadLoaiGiaiChi + "," + o + ')" class="readonly" required/> <input type="hidden" name="tr[' + o + '][id_loaiphi]" id="id_loaiphi_' + o + '"></td> <td><input type="text" name="tr[' + o + '][sotien]" data-type="currency" placeholder="VD: 500,000" required/></td> <td><input type="text" name="tr[' + o + '][sohoadon]" placeholder="Số hóa đơn" title="Số hóa đơn/chứng từ" style="width:97%" maxlength="50"></td> <td><input type="text" name="tr[' + o + '][ngayhoadon]" autocomplete="off" placeholder="Chọn ngày" class="picker" maxlength="10" style="width:97%"></td> <td><select name="tr[' + o + '][thukhachhang]" style="width:100%"> <option value="0">Không</option> <option value="1">Có</option> </select></td> <td><input type="text" name="tr[' + o + '][ghichu]" placeholder="Nếu có"></td> <td><div class="filehid"> <input type="file" name="tr[' + o + '][img_file]" id="img_file_' + o + '" accept="image/*;capture=camera"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_' + o + '"></div></td> <td align="center"><a href="javascript:void(0);" class="trash" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>';
                $(t).appendTo(e), $(".readonly").on("keydown paste focus mousedown", function(e) {
                    9 != e.keyCode && e.preventDefault()
                }), $(".picker3").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0,
                    minDate: a.min_date
                }), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), DinhDangTien();
                var n = o;
                return $("#img_file_" + o).on("change", function(e) {
                    e = URL.createObjectURL(e.target.files[0]);
                    $("#view_pics_" + n).html('<img src="' + e + '" id="img_tx_' + n + '">')
                }), o++, !1
            }), $(document).on("click", ".trash", function() {
                return 1 < o && ($(this).parents(".row_point").remove(), o--), !1
            });
            var e = document.getElementById("img_file_0");
            document.getElementById("view_pics_0");
            e && e.addEventListener("change", function(e) {
                e = URL.createObjectURL(e.target.files[0]);
                $("#view_pics_0").html('<img src="' + e + '" id="img_0">')
            }), $(".readonly").on("keydown paste focus mousedown", function(e) {
                9 != e.keyCode && e.preventDefault()
            }), DinhDangTien()
        }
    }), !1
}

function updateTX(e, t, n, a) {
    var o, i, c;
    return "img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(t), c = new FormData(i)), $.ajax({
        type: "POST",
        url: "../" + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:999999"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.popup,.src").remove(), $("body").append('<div class="fscreen"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, đã thêm mới thành công!</p><p>Bạn đã thêm mới thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 5 != e.status && 8 != e.status && 9 != e.status && 14 != e.status || (alert(e.str), $(".src").remove()), 0 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function frmForm2(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_catcont" style="z-index:990"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop,.close_btn").on("click", function() {
                $(".src_catcont").addClass("popup_close"), $(".src_catcont").fadeOut(300, function() {
                    $(this).remove()
                })
            })), 0 == e.status && (alert("Lỗi, Thông tin không tồn tại!"), location.reload()), 2 == e.status && (alert("Lỗi, vui lòng thử lại!"), location.reload()), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".picker2").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: 0
            }), $(".select").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            }), $(".readonly").on("keydown paste focus mousedown", function(e) {
                9 != e.keyCode && e.preventDefault()
            }), DinhDangTien()
        }
    }), !1
}

function frmDetail(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup_dx,.scr").fadeOut().remove()
            })), 0 == e.status && (alert("Lỗi, Thông tin không tồn tại!"), location.reload()), 2 == e.status && (alert("Lỗi, vui lòng thử lại!"), location.reload()), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function addPhieuXuat(e, t, n, a) {
    var o, i, c;
    return "img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(t), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã tạo phiếu thành công!"), location.reload()), 2 == e.status && (alert("Hình ảnh phải không vướt quá 10MB (<= 10MB)"), $(".src").remove()), 3 == e.status && (alert("Lỗi..., Tình trạng nhập không được phép. Vui lòng thử lại!"), location.reload()), 4 == e.status && (alert("Hình ảnh phải ở định dạng: png, jpeg, jpg"), $(".src").remove()), 5 == e.status && (alert("Sản phẩm nhập thêm không có sẵn trong kho."), $(".src").remove()), 6 == e.status && (alert("Sản phẩm bạn chọn không có trong danh mục nhập mới."), $(".src").remove()), 7 == e.status && (alert("Phiếu đề xuất nhập sản phẩm này đã được tạo ngày " + e.str), $(".src").remove()), 8 != e.status && 9 != e.status || (alert(e.str), $(".src").remove()), 0 == e.status && (alert("Lỗi..., không thể thêm phiếu. Vui lòng thử lại!"), location.reload()), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function insert(e, t, n, a) {
    var o, i, c;
    return $("#editor").length && CKEDITOR.instances.editor.updateElement(), $("#editor1").length && CKEDITOR.instances.editor1.updateElement(), $("#editor2").length && CKEDITOR.instances.editor2.updateElement(), "img_file" != a && "pdf_file" != a || (i = document.getElementById(n), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(n), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:999999"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(t) {
            1 == t.status && ($(".screen,.src,.frm_close").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            }), $(document).keyup(function(e) {
                13 !== e.which && 27 !== e.which || location.reload()
            })), 7 == t.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.href = root + t.link
            }), $(document).keyup(function(e) {
                13 !== e.which && 27 !== e.which || (location.href = root + t.link)
            })), 4 == t.status && (alert(t.str), location.reload()), 0 != t.status && 2 != t.status && 3 != t.status && 5 != t.status && 6 != t.status || (alert(t.str), $(".src").remove())
        }
    }), !1
}

function insert2(e, t, n, a) {
    var o, i, c;
    return "img_file" != a && "pdf_file" != a || (i = document.getElementById(n), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(n), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:999999"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, đã thêm mới thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                $(".fscreen,.popup").remove(), $("#id_reload_" + e.code).click()
            })), 4 == e.status && (alert(e.str), location.reload()), 0 != e.status && 2 != e.status && 3 != e.status && 5 != e.status && 6 != e.status || (alert(e.str), $(".src").remove())
        }
    }), !1
}

function insertTX(e, t, n, a) {
    var o, i, c;
    return $("#editor").length && CKEDITOR.instances.editor.updateElement(), $("#editor1").length && CKEDITOR.instances.editor1.updateElement(), $("#editor2").length && CKEDITOR.instances.editor2.updateElement(), "img_file" != a && "pdf_file" != a || (i = document.getElementById(n), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(n), c = new FormData(i)), $.ajax({
        type: "POST",
        url: "../" + e + "/" + t,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:999999"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 7 == e.status && ($(".screen,.src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, cập nhật thành công!</p><p>Bạn cập nhật thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.href = root + e.link
            })), 4 == e.status && (alert(e.str), location.reload()), 0 != e.status && 2 != e.status && 3 != e.status && 5 != e.status && 6 != e.status || (alert(e.str), $(".src").remove())
        }
    }), !1
}

function update(e, t, n, a) {
    var o, i, c;
    return $("#editor").length && CKEDITOR.instances.editor.updateElement(), $("#editor1").length && CKEDITOR.instances.editor1.updateElement(), $("#editor2").length && CKEDITOR.instances.editor2.updateElement(), "img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(t), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="fscreen src" style="z-index:999999"><div class="process"><p class="p1">Đang lưu...</p><div class="loading"></div><p class="p2">Vui lòng không đóng trình duyệt đến khi hoàn thành!</p></div></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.popup,.src").remove(), $("body").append('<div class="fscreen"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, đã cập nhật thành công!</p><p>Bạn đã thêm mới thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 2 == e.status && (alert("Hình ảnh phải không vướt quá 10MB (<= 10MB)"), $(".src").remove()), 3 == e.status && (alert("Lỗi..., Tình trạng nhập không được phép. Vui lòng thử lại!"), location.reload()), 4 == e.status && (alert("Hình ảnh phải ở định dạng: png, jpeg, jpg"), $(".src").remove()), 5 == e.status && (alert("Sản phẩm nhập thêm không có sẵn trong kho."), $(".src").remove()), 6 == e.status && (alert("Sản phẩm bạn chọn không có trong danh mục nhập mới."), $(".src").remove()), 7 == e.status && (alert("Chúc mừng, đã chuyển công nợ thành công - Mã VĐ: [" + e.str + "]"), location.reload()), 10 == e.status && (alert("Chúc mừng, đã chuyển báo cáo tháng thành công - Mã phiếu: [" + e.str + "]"), location.reload()), 11 == e.status && ($(".screen,.popup,.src").remove(), $("body").append('<div class="fscreen"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, đã thêm mới thành công!</p><p>Bạn đã thêm mới thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.href = root + "dexuat/edit/?v=" + e.link
            })), 12 == e.status && (alert("Lỗi nhập trùng... Rơ mooc này đã được nhập trước đó."), $(".src").remove()), 13 == e.status && (alert(e.str), $(".src").remove()), 8 != e.status && 9 != e.status && 14 != e.status || (alert(e.str), $(".src").remove()), 0 == e.status && (alert("Lỗi... Vui lòng thử lại!"), location.reload()), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function update_conf(e, t, n, a) {
    var o, i, c;
    return !1 === window.confirm("Sau khi xác nhận tất cả các thông tin sẽ không thể thay đổi. Xác nhận ngay?") || ("img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(t), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.str), location.reload()), 2 != e.status && 5 != e.status || (alert(e.str), $(".src").remove()), 0 != e.status && 3 != e.status || (alert(e.str), location.reload()), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    })), !1
}

function update_confTX(e, t, n, a) {
    var o, i, c;
    return !1 === window.confirm("Sau khi xác nhận tất cả các thông tin sẽ không thể thay đổi. Xác nhận ngay?") || ("img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(t), c = new FormData(i)), $.ajax({
        type: "POST",
        url: "../" + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.str), location.reload()), 2 != e.status && 5 != e.status || (alert(e.str), $(".src").remove()), 0 != e.status && 3 != e.status || (alert(e.str), location.reload()), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    })), !1
}

function update_conf2(e, t, n, a) {
    var o, i, c;
    return !1 === window.confirm("Sau khi xác nhận tất cả các thông tin sẽ không thể thay đổi. Xác nhận ngay?") || ("img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(t), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 != e.status && 3 != e.status && 5 != e.status && 6 != e.status && 8 != e.status && 9 != e.status || (alert(e.str), location.reload())
        }
    })), !1
}

function update2(e, t, n, a) {
    var o, i, c;
    return "img_file" != a && "pdf_file" != a || (i = document.getElementById(t), o = $("#" + a).prop("files")[0], (c = new FormData(i)).append("file", o)), 1 == a && (i = document.getElementById(t), c = new FormData(i)), $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: c,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.str), location.reload()), 0 != e.status && 2 != e.status || (alert(e.str), $(".src").remove())
        }
    }), !1
}

function updateLop(e, t, n) {
    if (!1 === confirm("Sau khi xác nhận hoàn tất việc thay lốp thì tất cả thông tin sẽ không thể thay đổi. Xác nhận ngay?")) return !1;
    t = document.getElementById(t), t = new FormData(t);
    return $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: t,
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen,.popup,.src").remove(), $("body").append('<div class="fscreen"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, đã thêm mới thành công!</p><p>Bạn đã thêm mới thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                1 == e.hoantat && (location.href = e.link), 0 == e.hoantat && location.reload()
            })), 3 == e.status && ($(".screen,.popup,.src").remove(), $("body").append('<div class="fscreen"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">Chúc mừng, đã thêm mới thành công!</p><p>Bạn đã thêm mới thông tin thành công!</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 0 != e.status && 2 != e.status || (alert(e.str), $(".src").remove())
        }
    }), !1
}

function updateCont(e, t, n) {
    n = $('form[name="' + n + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".src").remove(), alert(e.str)), 0 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function Delete(e, t, n, a) {
    return !1 === confirm("Các thông tin liên quan sẽ bị xóa vĩnh viễn. Bạn có muốn xóa mẫu tin này?") || $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&flag=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($("#id_" + n).remove(), $(".src").remove(), $("#id_cat_" + a).html(e.btn)), 0 == e.status && (alert("Không tìm thấy thông tin để xóa"), location.reload()), 2 == e.status && (alert("Lỗi... Bạn không thể xóa mẫu tin này"), location.reload())
        }
    }), !1
}

function DeleteTX(e, t, n, a) {
    return !1 === confirm("Các thông tin liên quan sẽ bị xóa vĩnh viễn. Bạn có muốn xóa mẫu tin này?") || $.ajax({
        type: "POST",
        url: "../" + e + "/" + t,
        data: "code=" + n + "&flag=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($("#id_" + n).remove(), $(".src").remove()), 0 == e.status && (alert("Không tìm thấy thông tin để xóa"), location.reload()), 2 == e.status && (alert("Lỗi... Bạn không thể xóa mẫu tin này"), location.reload())
        }
    }), !1
}

function Delete2(e, t, n) {
    return !1 === window.confirm("Các thông tin liên qua sẽ bị xóa vĩnh viễn. Bạn có muốn xóa thông tin này?") || $.ajax({
        type: "POST",
        url: root + t + "/" + n,
        data: "code=" + e,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen scr" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && location.reload(), 0 == e.status && (alert("Không có mẫu tin nào để xóa."), $(".scr").remove()), 2 == e.status && (alert("Lỗi..., Không thể xóa. Vui lòng liên hệ BQT!"), location.reload())
        }
    }), !1
}

function changeLoaiNhap() {
    var e = $("#tinhtrangnhap").val();
    $("#tensp").attr("onclick", "return loadList('sp','LoadSanPham'," + e + ")"), $("#tensp").removeAttr("value"), $("#id_sp").removeAttr("value")
}

function frmXuat(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + t + "/frm_xuat",
        data: "code=" + e + "&action=" + n,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            })
        }
    }), !1
}

function addXuat(e, t, n, a) {
    if (!1 === confirm("Sau khi xác nhận xuất kho các thông tin sẽ được lưu trữ và không thay đổi được nữa. Xác nhận ngay?")) return !1;
    a = $('form[name="' + a + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + t + "/add_xuat",
        data: a + "&code=" + e + "&action=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã thêm thông tin thành công!"), location.reload()), 3 == e.status && (alert(e.str), $(".src").remove()), 4 == e.status && (alert(e.str), $(".src").remove()), 0 == e.status && (alert("Lỗi..., thông tin không tồn tại"), location.reload()), 2 == e.status && (alert("Lỗi..., không thể thêm thông tin. Vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function viewXuat(e) {
    return $.ajax({
        type: "POST",
        url: root + "kho/xuat_view",
        data: "code=" + e + "&action=viewXuat",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop,.close_btn").on("click", function() {
                $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function deleteXuat(t) {
    return !1 === confirm("Bạn có chắc xóa mẫu tin này?") || $.ajax({
        type: "POST",
        url: root + "kho/xuat_xoa",
        data: "code=" + t + "&action=deleteXuat",
        cache: "false",
        dataType: "html",
        beforeSend: function() {
            $(".popup").prepend('<div class="screen scnn"></div>')
        },
        success: function(e) {
            1 == e && ($(".scnn").remove(), $("#xk_" + t).remove()), 0 == e && (alert("Lỗi,... Thông tin không tồn tại"), location.reload()), 2 == e && (alert("Có lỗi,... Vui lòng thử lại"), location.reload())
        }
    }), !1
}

function printBaoCao(e) {
    return $.ajax({
        url: root + "baocao/print",
        data: "code=" + e + "&action=printBaoCao",
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".screen").remove(), (t = window.open()).document.write("<title>In báo cáo</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Thông tin không tồn tại"), location.reload()), 2 == e.status && (alert("Có lỗi, Thông tin không tồn tại, vui lòng thử lại."), location.reload())
        }
    }), !1
}

function frmPhieuThu(e, t, n, a) {
    return $.ajax({
        type: "POST",
        url: root + t + "/" + a,
        data: "code=" + e + "&loai=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            })), 0 == e.status && (alert("Không thể xác định loại thu. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Khách hàng không tồn tại. Vui lòng thử lại!"), location.reload()), 3 == e.status && (alert("Lỗi... Vui lòng thử lại!"), location.reload()), 4 == e.status && (alert("Đã thu đủ công nợ, bao gồm các phiếu thu đang chờ duyệt."), location.reload())
        }
    }), !1
}

function addPhieuThu(e) {
    var t = $('form[name="frmPhieuThu"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "cnkh/" + e,
        data: t,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert("Chúc mừng, đã tạo phiếu thành công!"), location.reload()), 2 == e.status && (alert("Khách hàng không tồn tại. Vui lòng thử lại!"), location.reload()), 3 == e.status && (alert("Lỗi..., không thể thêm phiếu. Vui lòng thử lại!"), location.reload()), 4 == e.status && (alert("Vượt hạn mức thu, vui lòng thu trong khoảng số tiền còn lại: " + e.str), $(".src").remove()), 5 == e.status && (alert("Lỗi..., Tài khoản thu vào không tồn tại. Vui lòng thử lại!"), location.reload()), 0 == e.status && (alert("Không thể xác định loại thu. Vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function frmNganSach() {
    return $.ajax({
        type: "POST",
        url: root + "baocao/tk_frm",
        data: "action=frmNganSach",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            $(".screen").addClass("screen2"), $("body").prepend(e), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function AddNganSach() {
    var e = document.frm_ngansach,
        t = isWhiteSpace(e.nam.value),
        n = isWhiteSpace(e.loaitaikhoan.value),
        a = isWhiteSpace(e.sotien.value);
    if (1 == t || e.nam.value.length < 4) return alert("Vui lòng chọn năm!"), $("#nam").focus(), !1;
    if (1 == n || "" == e.loaitaikhoan.value || e.loaitaikhoan.value < 1 || 3 < e.loaitaikhoan.value) return alert("Vui lòng chọn loại tài khoản!"), $("#loaitaikhoan").focus(), !1;
    if (1 == a || "" == e.sotien.value) return alert("Vui lòng nhập số tiền!"), $("#sotien").focus(), !1;
    e = $('form[name="frm_ngansach"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + "baocao/tk_add",
        data: e + "&action=AddNganSach",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e && (alert("Thêm mới thành công!"), location.reload()), 0 == e && (alert("Ngân sách này đã được thêm!"), $(".src").remove()), 2 == e && (alert("Lỗi, vui lòng nhấn F5 và thử lại!"), location.reload())
        }
    }), !1
}

function frmEditNganSach(e) {
    return $.ajax({
        type: "POST",
        url: root + "baocao/tk_edit",
        data: "id=" + e + "&action=frmEditNganSach",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $("#sotien").focus()), 0 == e && (alert("Lỗi, vui lòng nhấn phím F5 và thử lại!"), location.reload()), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })
        }
    }), !1
}

function EditNganSach() {
    var e = document.frm_ngansach;
    if (1 == isWhiteSpace(e.sotien.value) || "" == e.sotien.value) return alert("Vui lòng nhập số tiền!"), $("#sotien").focus(), !1;
    var t = $('form[name="frm_ngansach"]').serialize(),
        e = $("#frm_ngansach").attr("data-id");
    return $.ajax({
        type: "POST",
        url: root + "baocao/tk_update",
        data: t + "&id=" + e + "&action=EditNganSach",
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e && (alert("Sửa thông tin thành công!"), location.reload()), 0 == e && (alert("Không tồn tại thông tin!"), $(".screen").removeAttr("style").addClass("screen2")), 2 == e && (alert("Lỗi, vui lòng nhấn F5 và thử lại!"), location.reload())
        }
    }), !1
}

function activeFrmPhieuTamUng(e, t, n, a) {
    return $.ajax({
        type: "POST",
        url: root + t + "/" + n,
        data: "code=" + e + "&loai=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop").on("click", function() {
                $("html, body").removeAttr("style"), $(".popup,.screen").fadeOut().remove()
            })), 0 == e.status && (alert("Lỗi... Thông tin không tồn tại!"), location.reload()), 2 == e.status && (alert("Có lỗi, vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function DuyetPhieuTamUng(t, e, n, a, o) {
    a = $('form[name="' + a + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/" + n,
        data: a + "&code=" + t,
        cache: "false",
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen" style="z-index:9999"></div>'), $("#act_" + o + "_" + t).removeAttr("onclick")
        },
        success: function(e) {
            1 == e.status && ($(".screen,.popup").remove(), $("#act_" + o + "_" + t).html('<img src="template/Default/images/check-1.png">')), 0 == e.status && (alert("Thông tin không tồn tại. Vui lòng thử lại!"), location.reload()), 2 == e.status && (alert("Lỗi... Vui lòng kiểm tra thông tin và thử lại!"), location.reload()), 3 == e.status && (alert("Lỗi... Tài khoản bạn chọn chi phiếu tạm ứng không khớp lệnh!"), location.reload())
        }
    }), !1
}

function active(e, t, n, a) {
    return !1 === confirm("Bạn muốn xác nhận ngay? Lưu ý: một số thông tin có thể hoặc không thể thay đổi hoặc vô hiệu sau khi duyệt.") || $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&flag=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && location.reload(), 0 == e.status && (alert("Lỗi... Thông tin không tồn tại"), location.reload()), 2 == e.status && (alert("Có lỗi, vui lòng thử lại!"), location.reload()), 3 == e.status && (alert(e.str), location.reload()), 4 == e.status && (alert(e.str), $(".src").remove())
        }
    }), !1
}

function activeTX(e, t, n, a) {
    return !1 === confirm("Bạn muốn xác nhận ngay? Lưu ý: một số thông tin có thể hoặc không thể thay đổi hoặc vô hiệu sau khi duyệt.") || $.ajax({
        type: "POST",
        url: "../" + e + "/" + t,
        data: "code=" + n + "&flag=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && location.reload(), 0 == e.status && (alert("Lỗi... Thông tin không tồn tại"), location.reload()), 2 == e.status && (alert("Có lỗi, vui lòng thử lại!"), location.reload()), 3 == e.status && (alert(e.str), location.reload()), 4 == e.status && (alert(e.str), $(".src").remove())
        }
    }), !1
}

function active2(e, t, n, a, o) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&flag=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen src" style="z-index:999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".src").remove(), $("#btn_" + n).remove(), $("#" + o + n).html('<img src="template/Default/images/check-1.png">'), location.reload()), 0 == e.status && (alert("Lỗi... Thông tin không tồn tại"), location.reload()), 2 == e.status && (alert("Có lỗi, vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function Print(e, t, n) {
    return $.ajax({
        url: root + e + "/" + t,
        data: "code=" + n,
        type: "POST",
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".src").remove(), (t = window.open()).document.write("<title>In thông tin</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert("Không thể in phiếu. Vui lòng liên hệ bộ phận kiểm duyệt!"), location.reload())
        }
    }), !1
}

function PrintSelect(e, t, n) {
    n = document.getElementById(n), n = new FormData(n);
    return $.ajax({
        url: root + e + "/" + t,
        data: n,
        type: "POST",
        cache: !1,
        dataType: "json",
        processData: !1,
        contentType: !1,
        beforeSend: function() {
            $("body").append('<div class="screen src" style="z-index:99999"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".src").remove(), (t = window.open()).document.write("<title>In thông tin</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 0 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function XuatExcel(n, e, t, a, o) {
    var i = $('form[name="' + t + '"').serialize(),
        c = $("#m").val(),
        t = $("#y").val();
    return "" == c || "" == t ? alert("Vui lòng chọn tháng, năm cần xuất file!") : $.ajax({
        type: "POST",
        url: root + n + "/" + e,
        data: i + "&code=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen src"></div>')
        },
        success: function(e) {
            var t;
            3 == e.status && ($(".src").remove(), (t = window.open()).document.write("<title>Xuất thông tin</title>"), t.document.write(e.data), t.document.close(), t.focus(), t.print(), t.close()), 1 == e.status && (location.href = root + n + "/" + o + "/?id=" + e.str, $(".screen,.popup").remove()), 2 == e.status && (alert("Lỗi, vui lòng thử lại!"), location.reload()), 0 == e.status && (alert(e.str), $(".src").remove())
        }
    }), !1
}

function XuatExcelTX(n, e, t, a, o) {
    var i = $('form[name="' + t + '"').serialize(),
        c = $("#m").val(),
        t = $("#y").val();
    return "" == c || "" == t ? alert("Vui lòng chọn tháng, năm cần xuất file!") : $.ajax({
        type: "POST",
        url: "../" + n + "/" + e,
        data: i + "&code=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen src"></div>')
        },
        success: function(e) {
            var t;
            3 == e.status && ($(".src").remove(), (t = window.open()).document.write("<title>In thông tin</title>"), t.document.write(e.data), t.document.close(), t.focus(), t.print(), t.close()), 1 == e.status && (location.href = "../" + n + "/" + o + "/?id=" + e.str, $(".screen,.popup").remove()), 2 == e.status && (alert("Lỗi, vui lòng thử lại!"), location.reload()), 0 == e.status && (alert(e.str), $(".src").remove())
        }
    }), !1
}

function XuatExcel2(t, e, n, a) {
    return $.ajax({
        type: "POST",
        url: root + t + "/" + e,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && (location.href = root + t + "/" + a + "/?code=" + e.str, $(".screen,.popup").remove()), 2 == e.status && (alert("Lỗi, vui lòng thử lại!"), location.reload())
        }
    }), !1
}

function XuatExcelPrint(e, t, n, a) {
    var o = $('form[name="' + n + '"').serialize(),
        i = $("#m").val(),
        n = $("#y").val();
    return "" == i || "" == n ? alert("Vui lòng chọn tháng, năm cần xuất file!") : $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: o + "&code=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").append('<div class="screen src"></div>')
        },
        success: function(e) {
            var t;
            1 == e.status && ($(".src").remove(), (t = window.open()).document.write("<title>In thông tin</title>"), t.document.write(e.str), t.document.close(), t.focus(), t.print(), t.close()), 2 == e.status && (alert("Lỗi, vui lòng thử lại!"), location.reload()), 3 == e.status && (alert(e.str), location.reload()), 0 == e.status && (alert(e.str), $(".src").remove())
        }
    }), !1
}

function insertCheck(e, t, n, a, o) {
    for (var i = document.getElementsByName(e), c = 0, s = 0; s < i.length; s++) i[s].checked && c++;
    if (c < 1) return alert(t), !1;
    o = $('form[name="' + o + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + n + "/" + a,
        data: o,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen slc" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && (alert(e.msg), location.reload()), 3 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                })
            })), 0 == e.status && (alert(e.msg), $(".slc").remove()), 2 == e.status && (alert(e.msg), location.reload())
        }
    }), !1
}

function insertCheckFrm(e, t, n, a, o) {
    for (var i = document.getElementsByName(e), c = 0, s = 0; s < i.length; s++) i[s].checked && c++;
    if (c < 1) return alert(t), !1;
    o = $('form[name="' + o + '"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + n + "/" + a,
        data: o,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen slc" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").addClass("screen2"), $("body").prepend(e.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                })
            })), 0 == e.status && (alert("Lỗi, Thông tin không tồn tại!"), location.reload())
        }
    }), !1
}

function Load(t, e, n, a, o) {
    return $tai = "", 1 == $("#taitrong_" + a).length && ($tai = "&tai=" + $("#taitrong_" + a).val()), $.ajax({
        type: "POST",
        url: root + t + "/" + e,
        data: "code=" + a + "&flag=" + o + $tai,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: root + t + "/" + n,
                    data: "code=" + a + "&key=" + e + "&flag=" + o + $tai,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function LoadTX(t, e, n, a, o) {
    return $.ajax({
        type: "POST",
        url: "../" + t + "/" + e,
        data: "code=" + a + "&flag=" + o,
        cache: !1,
        dataType: "html",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_pt" style="z-index:999"></div>')
        },
        success: function(e) {
            $(".src_pt").addClass("screen2 screen_petro"), $("body").prepend(e), $(".close_pop,.close_btn,.checked_tx").on("click", function() {
                $(".popup2").addClass("popup_close"), $(".popup2,.screen_petro").fadeOut(300, function() {
                    $(this).remove()
                })
            }), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            }), $("#txtSeachKeywords").on("keyup", function() {
                var e = $("#txtSeachKeywords").val();
                $.ajax({
                    type: "POST",
                    url: "../" + t + "/" + n,
                    data: "code=" + a + "&key=" + e + "&flag=" + o,
                    cache: !1,
                    dataType: "html",
                    success: function(e) {
                        $(".scroll2").html(e).show(), $(".check_frm input:checkbox").click(function() {
                            $(".check_frm input:checkbox").not(this).prop("checked", !1)
                        })
                    }
                })
            })
        }
    }), !1
}

function getChecked(e, t) {
    $('.check_frm input[type="number"]').attr("disabled", "disabled"), $('.check_frm input[type="number"]').removeAttr("value", ""), $('.check_frm input[type="number"]').removeAttr("name"), $("#" + t).is(":checked") ? $("#" + e).removeAttr("disabled").attr("name", "soluong") : ($('.check_frm input[type="number"]').removeAttr("value", ""), $('.check_frm input[type="number"]').removeAttr("name"))
}

function getCuocPhi(e, t, n) {
    var a = $('form[name="frmCuocVanChuyen"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: a + "&code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup_list").append('<div class="screen scrp" style="z-index:1000"></div>')
        },
        success: function(e) {
            2 == e.status && (alert(e.str), $(".scrp").remove()), 1 == e.status && ($(".popup_list,.screen_petro").remove(), $(".hidepax2").fadeIn(), $("#tuyenvanchuyen").attr("value", e.tentuyen).addClass("green"), $("#tgbook").html(e.data), $(".contvc").addClass("scroll"), $("#step7_submit").css({
                display: "block"
            })), 3 == e.status && ($(".popup_list,.screen_petro").remove(), $("#tuyenvanchuyen").attr("value", e.tentuyen).addClass("green"), $("#idle").html(e.data), $(".contvc").addClass("scroll")), 1 == $("#initMap").length && 1 == $("#map").length && $("#initMap").click(), $(".picker2").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: 0
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            });
            var a = 1;
            $("#add_file").on("click", function() {
                var n = a;
                $file = "'file_" + n + "'", $show_name_id = "'show_name_id_" + n + "'";
                var e = $(".body_file"),
                    t = '<div class="body_file_tr" style="width:100%;float:left"><span style="position:relative;width:86px;height:34px;display: inline-block;line-height: 34px;float: left;background: #0c8885;text-align: center;font-weight: bold;color: #fff;border-radius: 3px;"><i class="fa fa-plus"></i> Chọn file <input type="file" name="pdf_file[]" id="file_' + a + '" onchage="getFileName(' + $file + "," + $show_name_id + ')" accept=".pdf,.doc,.docx,.xls,.xlsx" style="opacity:0;position:absolute;left: 0;top: 0;width: 86px;height: 26px;"> </span> <div style="width:83.5%;float:right"> <div style="width:91.5%;float: left"> <select name="file_name[]" class="select_add_' + a + '" placeholder="Chọn hoặc nhập tên file..." required> <option value="">Chọn hoặc nhập tên file...</option> <option value="Booking Confirmation">Booking Confirmation</option> <option value="Booking Receipt Notice">Booking Receipt Notice</option> <option value="Booking note">Booking note</option> <option value="Delivery Order">Delivery Order</option> <option value="ERO">Empty Release Order</option><option value="EDO">e-Delivery Order</option><option value="Delay Note">Delay Note</option><option value="Booking Amendment">Booking Amendment</option><option value="PKL">PKL</option> <option value="VGM">VGM</option> <option value="Bill">Bill</option> <option value="SI">SI</option> </select> </div> <a href="javascript:void(0)" style="display:block;float:right;width:34px;height:34px;line-height:34px;text-align:center;color:red;font-size:1.3rem" class="trash_file"><i class="fa fa-trash"></i></a> </div> <div id="show_name_id_' + a + '" style="padding:5px 0;color:red;clear:both"></div></div>';
                return $(t).appendTo(e), $(".select_add_" + n).selectize({
                    sortField: "text",
                    plugins: ["remove_button"],
                    hideSelected: !0,
                    create: !0
                }), $("#file_" + n).on("change", function(e) {
                    var t = document.getElementById("file_" + n);
                    document.getElementById("show_name_id_" + n).innerHTML = "File name: " + t.files.item(0).name, t.style.color = "red", t.style.background = "red"
                }), a++, !1
            }), $(document).on("click", ".trash_file", function() {
                return 1 < a && ($(this).parents(".body_file_tr").remove(), a--), !1
            });
            var n = $("#add_waypoint").attr("data-id");
            $("#add_waypoint").on("click", function() {
                var e = "'waypoints_" + n + "'",
                    t = $(".body_waypoint");
                $('<tr class="tr_waypoint"><td width="24%"><b class="green">Điểm dừng ' + n + '</b></td> <td><input type="search" name="waypoints[]" id="' + e + '" style="width:93%;background:#c9f2dd"/> <a href="javascript:void(0)" class="trash_waypoint" title="Xóa điểm" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td> </tr>').appendTo(t), new google.maps.places.Autocomplete(document.getElementById(e)), n++
            }), $(document).on("click", ".trash_waypoint", function() {
                return 1 < n && ($(this).parents(".tr_waypoint").remove(), n--), !1
            });
            var t = $("#add_cont_seal").attr("data-id");
            $("#add_cont_seal").on("click", function() {
                var e = $(".body_cont_seal");
                $('<tr class="row_cont_seal"> <td align="center">' + t + '</td> <td><input type="text" name="tr[' + t + '][macont]" placeholder="Nhập mã cont" maxlength="100" required></td> <td><input type="text" name="tr[' + t + '][soseal]" placeholder="Nhập mã seal (nếu có)" maxlength="100"></td> <td><input type="text" name="tr[' + t + '][taitrong]" placeholder="Tổng trọng lượng (nếu có)" maxlength="15"></td> <td><a href="javascript:void(0)" class="trash_cont_seal" title="Xóa dòng" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), t++
            }), $(document).on("click", ".trash_cont_seal", function() {
                return 1 < t && ($(this).parents(".row_cont_seal").remove(), t--), !1
            }), $(".select_add").selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0,
                create: !0
            }), DinhDangTien()
        }
    }), !1
}

function initialize(e) {
    new google.maps.places.Autocomplete(document.getElementById(e))
}

function initMap() {
    1 == $("#sidebar").length && (document.getElementById("sidebar").innerHTML = "");
    var p = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: {
                lat: 10.822,
                lng: 106.6257
            }
        }),
        i = [];
    new google.maps.LatLng(11.961618, 106.547632), new google.maps.LatLng(10.781568260202281, 106.69969162542317);
    new google.maps.MarkerImage("template/Default/images/Map-Marker-Push-Pin-1-Left-Pink-icon.png"), new google.maps.MarkerImage("template/Default/images/Map-Marker-Push-Pin-1-Left-Chartreuse-icon.png");
    var t = new google.maps.places.Autocomplete(document.getElementById("start1"));
    new google.maps.places.Autocomplete(document.getElementById("end1"));
    google.maps.event.addListener(t, "place_changed", function() {
        var e = t.getPlace();
        $l1 = e.geometry.location.lat(), $l2 = e.geometry.location.lng()
    });
    var e = new google.maps.DirectionsService,
        n = new google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "#000000"
            }
        });
    (new google.maps.TrafficLayer).setMap(p), n.setMap(p), n.setPanel(document.getElementById("sidebar"));

    function a(e, d, t, n) {
        for (var a = document.getElementsByName("waypoints[]"), o = 0; o < a.length; o++) i.push({
            location: a[o].value,
            stopover: !0
        });
        e.route({
            origin: t.val(),
            destination: n.val(),
            waypoints: i,
            travelMode: "DRIVING"
        }, function(e, t) {
            if ("OK" === t) {
                d.setDirections(e);
                for (var n = e.routes[0].legs[0], a = 0, o = 0, i = e.routes[0], c = 0; c < i.legs.length; c++) a += i.legs[c].distance.value, o += i.legs[c].duration.value;
                $distance_total = Math.round(a / 1e3), $duration_total = o.toHHMMSS(), document.getElementById("output").innerHTML = '<b><i class="fa fa-check-circle"></i> Distance:</b> <span id="distance">' + $distance_total + ' km</span> - <b><i class="fa fa-clock-o"></i> Duration:</b> <span id="duration">' + $duration_total + '</span><input type="hidden" name="ds[distance]" value="' + $distance_total + '" id="distance" /><input type="hidden" name="ds[duration]" value="' + $duration_total + '" id="duration" />';
                for (var s = [], r = 0; r < n.steps.length; r++) {
                    l = (l = n.steps[r].start_location, new google.maps.Marker({
                        position: l,
                        map: p
                    }));
                    s.push(l), l.setMap(null)
                }! function e(t, n) {
                    if (n == t.length) return;
                    t[n].setMap(p);
                    setTimeout(function() {
                        t[n].setMap(null), e(t, n + 1)
                    }, 500)
                }(s, 0)
            }
            var l
        })
    }
    $("#start1,#end1").change(function() {
        a(e, n, $("#start1"), $("#end1"))
    }), a(e, n, $("#start1"), $("#end1"))
}

function loadJS(e, t = !0) {
    let n = document.createElement("script");
    n.setAttribute("src", e), n.setAttribute("type", "text/javascript"), n.setAttribute("async", t), document.body.appendChild(n), n.addEventListener("load", () => {
        console.log("File loaded")
    }), n.addEventListener("error", e => {
        console.log("Error on loading file", e)
    })
}

function getCuocPhi2(e, t, n) {
    var a = $('form[name="frmCuocVanChuyen"]').serialize();
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: a + "&code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".popup_list").append('<div class="screen scrp" style="z-index:1000"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".popup_list,.screen_petro").remove(), $("#changeTuyen").html(e.str), $("#dongia_status").attr("value", e.dongia), $("#donvi_status").html(e.donvitinh), $("#loaicont").attr("value", e.loaicont)), 0 != e.status && 2 != e.status || ($(".popup_list,.screen_petro").remove(), alert(e.str))
        }
    }), !1
}

function getHaiQuan(e, t, n) {
    $("#cuchaiquan_" + n).attr("value", e), $("#cuchaiquan_id_" + n).attr("value", t), $("#coquanhaiquan_" + n).attr("onClick", "return Load2('load','haiquan_list','haiquan_list_search'," + t + "," + n + ")"), $(".close_this,.screen_petro").remove()
}

function getValueLoad(e, t, n, a) {
    $("#" + n).attr("value", e), $("#" + a).attr("value", t), $(".close_this,.screen_petro").remove(), xe = "'xe'", list_mooc_status = "'list_mooc_status'", list_mooc_search_status = "'list_mooc_search_status'", list_mooc = "'list_mooc'", list_mooc_search = "'list_mooc_search'", 1 == $("#check_mooc_id").length && ($id_lenh = $("#check_mooc_id").val(), $("#" + n).attr("onclick", "return Load(" + xe + "," + list_mooc_status + "," + list_mooc_search_status + "," + $id_lenh + "," + t + ")")), $("#" + n).attr("onclick", "return Load(" + xe + "," + list_mooc + "," + list_mooc_search + "," + t + ",0)")
}

function getValueLoad2(e, t, n, a, o, i, c, s) {
    $("#" + n).attr("value", e), $("#" + a).attr("value", t), $("#" + o).attr("value", i), $("#" + s).attr("value", c)
}

function getValueLoad3(e, t, n, a, o, i) {
    $("#" + n).attr("value", e), $("#" + a).attr("value", t), $("#" + i).attr("value", o)
}

function getValueLoad32(e, t, n, a, o, i, c, s) {
    $("#" + n).attr("value", e), $("#" + a).attr("value", t), $("#" + i).attr("value", o), $("#soseri1_" + c).attr("value", s)
}

function FillterRecord(e, t, n, a) {
    return $tai = "", 1 == $("#taitrong_cont").length && ($tai = "&tai=" + $("#taitrong_cont").val()), $mooc = "", 1 == $("#flag_mooc").length && ($mooc = "&mooc=" + $("#flag_mooc").val()), $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + a + $tai + $mooc,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $(".src").remove(), $("body").prepend('<div class="screen src" style="z-index:99999"></div>')
        },
        success: function(e) {
            1 != e.status && 0 != e.status || ($(".src").remove(), $("#" + n).html(e.str), $(".check_frm input:checkbox").click(function() {
                $(".check_frm input:checkbox").not(this).prop("checked", !1)
            })), 2 == e.status && (alert(e.str), $(".src").remove())
        }
    }), !1
}

function SoDauObj(e, t) {
    t = URL.createObjectURL(t.target.files[0]);
    $("#view_sodau_" + e).html('<img src="' + t + '">')
}

function RoMoocObj(e, t) {
    t = URL.createObjectURL(t.target.files[0]);
    $("#view_somooc_" + e).html('<img src="' + t + '">')
}

function ImgObj(e, t) {
    t = URL.createObjectURL(t.target.files[0]);
    $("#view_pics_" + e).html('<img src="' + t + '">')
}

function RedirectURL(t, e, n, a) {
    return $.ajax({
        type: "POST",
        url: root + t + "/" + e,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("#noti_" + a + n).prepend('<div class="mini_screen" style="z-index:99999"></div>')
        },
        success: function(e) {
            1 == e.status && (location.href = root + t + "/v/?code=" + n), 3 == e.status && (location.href = root + e.url), 0 != e.status && 2 != e.status || location.reload()
        }
    }), !1
}

function RedirectURLTaiXe(t, e, n, a) {
    return $.ajax({
        type: "POST",
        url: "../" + t + "/" + e,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("#noti_" + a + n).prepend('<div class="mini_screen" style="z-index:99999"></div>')
        },
        success: function(e) {
            1 == e.status && (location.href = "../taixe/?mod=" + t + "&act=v&code=" + n), 0 != e.status && 2 != e.status || location.reload()
        }
    }), !1
}

function frmForm3(e, t, n) {
    return $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(n) {
            1 == n.status && ($(".screen").addClass("screen2"), $("body").prepend(n.str), $(".close_pop,.close_btn").on("click", function() {
                $(".popup").addClass("popup_close"), $(".popup,.screen").fadeOut(300, function() {
                    $(this).remove()
                })
            })), $(".readonly").on("keydown paste focus mousedown", function(e) {
                9 != e.keyCode && e.preventDefault()
            });
            var a = $("#add_point_pps").attr("data-id");
            $("#add_point_pps").on("click", function() {
                var e = $(".body_point_pps");
                $('<tr class="row_point_pps"> <td align="center">' + a + '</td> <td><input type="text" name="tr[' + a + '][chiphi]" id="chiphi_' + a + "\" onClick=\"return loadList2('loaigiaichi','LoadLoaiGiaiChi'," + a + ')" required class="readonly" readonly placeholder="Chọn loại phí"> <input type="hidden" name="tr[' + a + '][id_loaiphi]" id="id_loaiphi_' + a + '"></td> <td><input type="text" name="tr[' + a + '][sotientra]" data-type="currency" placeholder="VD: 500,000" required></td> <td><input type="text" name="tr[' + a + '][sotien]" data-type="currency" placeholder="VD: 500,000" required></td> <td><input type="text" name="tr[' + a + '][sohoadon]" placeholder="Nếu có"></td> <td><input type="text" name="tr[' + a + '][ngayhoadon]" autocomplete="off" placeholder="Chọn ngày" class="picker" maxlength="10" style="width:97%"></td> <td><select name="tr[' + a + '][thukhachhang]" style="width:100%"> <option value="0">Không thu</option> <option value="1">Lưu công nợ</option> <option value="2">Thu riêng</option> </select></td> <td><select name="tr[' + a + '][nhaxechi]" style="width:100%"> <option value="0">Công ty chi (User)</option> <option value="1">Nhà xe chi (công nợ)</option> <option value="2">Phí mặc định (Công ty)</option> <option value="3">Nhà xe chi (Thanh toán riêng)</option> </select></td> <td><input type="text" name="tr[' + a + '][ghichu]" placeholder="Ghi chú phí..."></td> <td align="center"><div class="filehid"> <input type="file" name="tr[' + a + '][img_file]" id="img_file_' + a + '" accept="image/*;capture=camera" title="Upload hình ảnh hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_' + a + '"></div></td> <td align="center"><input type="checkbox" name="tr[' + a + '][active]" value="1" checked></td> <td align="center"><a href="javascript:void(0);" class="trash_pps" style="font-size:1.2rem;color:#0084ff"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker3").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0,
                    minDate: n.min_date
                }), $(".picker").datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    yearRange: "-100:+50",
                    showButtonPanel: !0,
                    dateFormat: "dd-mm-yy",
                    changeMonth: !0,
                    changeYear: !0
                }), DinhDangTien();
                var t = a;
                return $("#img_file_" + a).on("change", function(e) {
                    e = URL.createObjectURL(e.target.files[0]);
                    $("#view_pics_" + t).html('<img src="' + e + '">')
                }), a++, !1
            }), $(document).on("click", ".trash_pps", function() {
                return 1 < a && ($(this).parents(".row_point_pps").remove(), a--), !1
            }), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            })
        }
    }), !1
}

function AdminToggle(e) {
    var t = $("#matkhau").val();
    $.ajax({
        type: "POST",
        url: root + "configure/admin",
        data: "code=" + e + "&pwd=" + t,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && location.reload()
        }
    })
}

function NhanLenh(e, t, n) {
    return !1 === window.confirm("Sau khi nhận lệnh tất cả các thông tin sẽ không thể thay đổi. Xác nhận ngay?") || $.ajax({
        type: "POST",
        url: "../" + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".screen").remove(), alert("Chúc mừng, đã nhận lệnh thành công!"), location.reload())
        }
    }), !1
}

function showListTX(e, t, n) {
    return $.ajax({
        type: "POST",
        url: "../" + e + "/" + t,
        data: "code=" + n,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen"></div>')
        },
        success: function(e) {
            1 == e.status && ($("#idlist_" + n).addClass("act_list"), $("#arrow_" + n).html('<i class="fa fa-chevron-up"></i>'), $("#idlist_" + n).removeAttr("onclick"), $(".screen").remove(), $(".idsub_" + n).html(e.str).slideDown(200), $("#close_" + n + ",#idlist_" + n).on("click", function() {
                $("#idlist_" + n).removeClass("act_list"), $("#arrow_" + n).html('<i class="fa fa-chevron-down"></i>'), $("html, body").animate({
                    scrollTop: $("#list_" + n).offset().top - 44
                }, 200), $(".idsub_" + n).slideUp(200).html(""), $("#idlist_" + n).attr("onclick", "return showListTX(" + e.module + "," + e.action + "," + e.code + ")")
            }), $("html, body").animate({
                scrollTop: $("#list_" + n).offset().top - 44
            }, 200), $(".colorbox").colorbox({
                rel: "colorbox",
                slideshow: !1,
                slideshowSpeed: 3e4
            }), $(".iframe").colorbox({
                iframe: !0,
                width: "100%",
                height: "100%"
            }))
        }
    }), !1
}

function selectDoiTacVanChuyen2(e, t, n, a, o, i) {
    return 0 == $('input[name="nx[]"]:checked').length && ($("#step7_submit").css({
        display: "none"
    }), $(".contvc").removeClass("scroll")), $("#" + a).is(":checked") ? $.ajax({
        type: "POST",
        url: root + "vandon/frm_new_doitac",
        data: "val=" + n + "&code=" + e + "&code_request=" + t,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src_hq" style="z-index:999999999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".src_hq").remove(), $("#" + o).html(e.str)), 0 != e.status && 2 != e.status || ($(".src_hq").remove(), $("#" + o).html(e.str), $("#step7_submit").css({
                display: "none"
            })), $("." + i).selectize({
                sortField: "text",
                plugins: ["remove_button"],
                hideSelected: !0
            }), $(".picker").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0
            }), $(".picker2").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                yearRange: "-100:+50",
                showButtonPanel: !0,
                dateFormat: "dd-mm-yy",
                changeMonth: !0,
                changeYear: !0,
                minDate: 0
            }), DinhDangTien()
        }
    }) : $("#" + o).html(""), !1
}

function copy(e, t, n, a) {
    return !1 === confirm("Bạn muốn nhân bản thành mẫu tin mới?") || $.ajax({
        type: "POST",
        url: root + e + "/" + t,
        data: "code=" + n + "&flag=" + a,
        cache: !1,
        dataType: "json",
        beforeSend: function() {
            $("body").prepend('<div class="screen src" style="z-index:9999"></div>')
        },
        success: function(e) {
            1 == e.status && ($(".src").remove(), $("body").append('<div class="fscreen" style="z-index:999999"><div class="process process2"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><p class="p1 green">' + e.title + "</p><p>" + e.str + '</p><span class="close_loading"><i class="fa fa-times-circle"></i> Đóng lại</span></div></div>'), $(".close_loading").on("click", function() {
                location.reload()
            })), 0 == e.status && (alert(e.str), location.reload())
        }
    }), !1
}

function getFileName(e, t) {
    e = document.getElementById(e);
    document.getElementById(t).innerHTML = e.files.item(0).name
}

function setCookie(e, t, n) {
    let a = new Date;
    a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3);
    n = "expires=" + a.toUTCString();
    document.cookie = e + "=" + t + "; " + n + "; path=/"
}

function resetForm(e) {
    document.getElementById(e).reset()
}

function checkIt(e) {
    e = (e = e || window.event).which || e.keyCode;
    return !(31 < e && (e < 48 || 57 < e) && (alert("Vui lòng nhập số!"), 1))
}

function isWhiteSpace(e) {
    argWs = e.toString();
    for (var t = 0; t < argWs.length; t++)
        if (" " != argWs.charAt(t) && "\t" != argWs.charAt(t)) return !1;
    return !0
}

function startTime() {
    var e = new Date,
        t = e.getHours(),
        n = e.getMinutes(),
        a = e.getSeconds(),
        o = e.getDate(),
        i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][e.getMonth()],
        e = e.getFullYear(),
        n = checkTime(n),
        a = checkTime(a);
    document.getElementById("show_clock").innerHTML = "Hôm nay: " + o + "-" + i + "-" + e + " <i class='fa fa-clock-o fa-spin'></i> <span style='color:yellow'>" + t + ":" + n + ":" + a + "</span>", setTimeout(startTime, 1e3)
}

function checkTime(e) {
    return e < 10 && (e = "0" + e), e
}

function CopyTXT(e) {
    var t = document.createRange();
    t.selectNode(e), window.getSelection().removeAllRanges(), window.getSelection().addRange(t), document.execCommand("copy"), window.getSelection().removeAllRanges(), alert("Đã copy")
}

function formatCurrency(e) {
    return e.split("").reverse().join("").replace(/\d\d\d(?!$)/g, "$&,").split("").reverse().join("")
}

function formatNumber(e) {
    return e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrencyUSD(e, t) {
    var n, a, o = e.val();
    "" !== o && (o.length, e.prop("selectionStart"), 0 <= o.indexOf(".") ? (a = o.indexOf("."), n = o.substring(0, a), a = o.substring(a), n = formatNumber(n), a = formatNumber(a), "blur" === t && (a += ""), o = n + "." + (a = a.substring(0, 2))) : (o = formatNumber(o), "blur" === t && (o += "")), e.val(o))
}

function DinhDangTien() {
    $("input[data-type='currency']").on({
        keyup: function() {
            formatCurrencyUSD($(this))
        },
        blur: function() {
            formatCurrencyUSD($(this), "blur")
        }
    })
}
$(document).ready(function() {
    $(".mbtop").on("click", function() {
        $(".topplugin").slideToggle(150), $(".fa-th").toggleClass("fa-times"), $(this).toggleClass("active")
    }), $(".mbmenu").on("click", function() {
        $(".menu").slideToggle(150), $(".fa-bars").toggleClass("fa-times"), $(this).toggleClass("active")
    }), $(".toogle_user").on("click", function(e) {
        e.preventDefault(), $(".toogle_class").slideToggle("fast")
    }), $(".banner,.header,.wpleft").hover(function() {
        $(".transmenu").stop().fadeIn()
    }, function() {
        $(".transmenu").stop().fadeOut()
    }), $(".toggle_menu_left").on("click", function() {
        setCookie("menu_cookie", 1, 1), $(".menu_left li a span").toggleClass("spanmenu"), $(".menu_left li ul").toggleClass("ulmenu"), $(".wpleft").toggleClass("wpleft2"), $(".left_logo").toggleClass("left_logo2"), $(".faleft").toggleClass("faleft2"), $(".page2").toggleClass("page3"), $(this).toggleClass("toggle_menu_left2");
        var e = "/images/logo_icon.png" === $("img.logoleft").attr("src") ? "/logo.png" : "/images/logo_icon.png";
        $("img.logoleft").attr("src", e), $(".wpleft2").hover(function() {
            $(".menu_left li a span").removeClass("spanmenu"), $(".menu_left li ul").removeClass("ulmenu"), $(".wpleft").toggleClass("wpleft2"), $(".faleft").removeClass("faleft2"), $(".left_logo").toggleClass("left_logo2"), $(".toggle_menu_left").removeClass("toggle_menu_left2"), $("img.logoleft").attr("src", "/logo.png")
        }, function() {
            $(".menu_left li a span").toggleClass("spanmenu"), $(".menu_left li ul").toggleClass("ulmenu"), $(".wpleft").toggleClass("wpleft2"), $(".left_logo").toggleClass("left_logo2"), $(".faleft").toggleClass("faleft2"), $(".toggle_menu_left").addClass("toggle_menu_left2"), $("img.logoleft").attr("src", "/images/logo_icon.png")
        })
    });
    var e = new Date(new Date - 2592e6),
        e = e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear();
    $(".picker").datepicker({
        showOtherMonths: !0,
        selectOtherMonths: !0,
        yearRange: "-100:+50",
        showButtonPanel: !0,
        dateFormat: "dd-mm-yy",
        changeMonth: !0,
        changeYear: !0
    }), $(".picker2").datepicker({
        showOtherMonths: !0,
        selectOtherMonths: !0,
        yearRange: "-100:+50",
        showButtonPanel: !0,
        dateFormat: "dd-mm-yy",
        changeMonth: !0,
        changeYear: !0,
        minDate: 0
    }), $(".picker_dau").datepicker({
        showOtherMonths: !0,
        selectOtherMonths: !0,
        yearRange: "-100:+50",
        showButtonPanel: !0,
        dateFormat: "dd-mm-yy",
        changeMonth: !0,
        changeYear: !0,
        minDate: e
    }), $(".colorbox").colorbox({
        rel: "colorbox",
        slideshow: !1,
        slideshowSpeed: 3e4
    }), $(".iframe").colorbox({
        iframe: !0,
        width: "100%",
        height: "100%"
    }), $(document).on("click", ".close_msg", function() {
        $(".js_status").html("")
    }), $(".select,.select_main").selectize({
        sortField: "text",
        plugins: ["remove_button"],
        hideSelected: !0
    }), $(".select_add").selectize({
        sortField: "text",
        plugins: ["remove_button"],
        hideSelected: !0,
        create: !0
    });
    var t = $(".footer").outerHeight();
    $(window).scroll(function() {
        $(this).scrollTop() > t ? $(".back-top").fadeIn() : $(".back-top").fadeOut()
    }), $(".readonly").on("keydown paste focus mousedown", function(e) {
        9 != e.keyCode && e.preventDefault()
    }), $(".back-top").click(function() {
        return $("body, html").stop(!1, !1).animate({
            scrollTop: 0
        }, 300), !1
    }), $(".list1 li").click(function() {
        $(this).children(".sublist").stop(!0).slideToggle(200), $(this).toggleClass("active_toggle")
    }), $(".search_code").on("click", function() {
        $(".appsearch,.transmenu").fadeIn()
    }), $(".transmenu,.close_ltx").on("click", function() {
        $(".appsearch,.transmenu").fadeOut()
    }), DinhDangTien(), $(".commas").on("keypress keyup blur", function(e) {
        if ($(this).val($(this).val().replace(/[^-\d,]+/g, "")), (e.which < 48 || 57 < e.which) && 44 != e.which && 45 != e.which) return e.preventDefault(), !1
    })
}), window.onclick = function(e) {
    if (!e.target.matches(".dropbtn"))
        for (var t = document.getElementsByClassName("noti"), n = 0; n < t.length; n++) {
            var a = t[n];
            a.classList.contains("show") && a.classList.remove("show")
        }
}, $(function() {
    var o = 1;
    $("#add_point").on("click", function() {
        var e = $(".body_petro"),
            t = '<tr class="row_petro"> <td><input type="text" name="ds[' + o + '][ngay]" placeholder="Ngày đổ" maxlength="10" class="picker" style="width:97%" autocomplete="off" required/></td> <td><div style="width:100%"> <select name="ds[' + o + '][gio]" style="width:46.5%;float:left" required="required"> <option value="">Giờ</option> <option value="00">0 giờ</option> <option value="01">1 giờ</option> <option value="02">2 giờ</option> <option value="03">3 giờ</option> <option value="04">4 giờ</option> <option value="05">5 giờ</option> <option value="06">6 giờ</option> <option value="07">7 giờ</option> <option value="08">8 giờ</option> <option value="09">9 giờ</option> <option value="10">10 giờ</option> <option value="11">11 giờ</option> <option value="12">12 giờ</option> <option value="13">13 giờ</option> <option value="14">14 giờ</option> <option value="15">15 giờ</option> <option value="16">16 giờ</option> <option value="17">17 giờ</option> <option value="18">18 giờ</option> <option value="19">19 giờ</option> <option value="20">20 giờ</option> <option value="21">21 giờ</option> <option value="22">22 giờ</option> <option value="23">23 giờ</option> </select> <select name="ds[' + o + '][phut]" style="width:46.5%;float:right;margin:0 0 0 5px" required="required"> <option value="">Phút</option> <option value="00">0 phút</option> <option value="01">1 phút</option> <option value="02">2 phút</option> <option value="03">3 phút</option> <option value="04">4 phút</option> <option value="05">5 phút</option> <option value="06">6 phút</option> <option value="07">7 phút</option> <option value="08">8 phút</option> <option value="09">9 phút</option> <option value="10">10 phút</option> <option value="11">11 phút</option> <option value="12">12 phút</option> <option value="13">13 phút</option> <option value="14">14 phút</option> <option value="15">15 phút</option> <option value="16">16 phút</option> <option value="17">17 phút</option> <option value="18">18 phút</option> <option value="19">19 phút</option> <option value="20">20 phút</option> <option value="21">21 phút</option> <option value="22">22 phút</option> <option value="23">23 phút</option> <option value="24">24 phút</option> <option value="25">25 phút</option> <option value="26">26 phút</option> <option value="27">27 phút</option> <option value="28">28 phút</option> <option value="29">29 phút</option> <option value="30">30 phút</option> <option value="31">31 phút</option> <option value="32">32 phút</option> <option value="33">33 phút</option> <option value="34">34 phút</option> <option value="35">35 phút</option> <option value="36">36 phút</option> <option value="37">37 phút</option> <option value="38">38 phút</option> <option value="39">39 phút</option> <option value="40">40 phút</option> <option value="41">41 phút</option> <option value="42">42 phút</option> <option value="43">43 phút</option> <option value="44">44 phút</option> <option value="45">45 phút</option> <option value="46">46 phút</option> <option value="47">47 phút</option> <option value="48">48 phút</option> <option value="49">49 phút</option> <option value="50">50 phút</option> <option value="51">51 phút</option> <option value="52">52 phút</option> <option value="53">53 phút</option> <option value="54">54 phút</option> <option value="55">55 phút</option> <option value="56">56 phút</option> <option value="57">57 phút</option> <option value="58">58 phút</option> <option value="59">59 phút</option> </select> </div></td> <td><select name="ds[' + o + '][daungoai]" id="daungoai_' + o + '" style="width:100%"> <option value="">Tình trạng</option> <option value="0">Dầu nhà</option> <option value="1">Đổ ngoài</option> </select></td> <td><input type="text" name="ds[' + o + '][tennhanvien]" id="tx_' + o + '" onClick="return listTaiXeDau(' + o + ')" placeholder="Tên nhân viên" maxlength="100" style="width:97%" readonly required/> <input type="hidden" name="ds[' + o + '][id_taixe]" id="id_tx_' + o + '"/></td> <td><input type="text" name="ds[' + o + '][biensoxe]" id="biensoxe_' + o + '" onClick="return listXeDau(' + o + ')" placeholder="Biển số xe" maxlength="15" style="width:97%" readonly required/> <input type="hidden" name="ds[' + o + '][id_xe]" id="id_xe_' + o + '"/> <input type="hidden" name="ds[' + o + '][loai]" id="id_loai_' + o + '"/></td> <td><input type="text" name="ds[' + o + '][sokm]" placeholder=" VD: 1,035.5" maxlength="30" style="width:97%" required/></td> <td><input type="text" name="ds[' + o + '][maso2]" id="maso2_' + o + '" placeholder="Mã số sau khi đổ" style="width:97%" required/></td> <td><input type="text" name="ds[' + o + '][solitdientu]" placeholder="VD: 12345.4" style="width:97%" required/></td> <td><input type="text" name="ds[' + o + '][dongia]" id="dongia_' + o + '" value="' + $dongiadau + '" data-type="currency" placeholder="VD: 23,390.91" maxlength="15" style="width:97%;color:red" required/></td> <td><input type="text" name="ds[' + o + '][vat]" id="vat_' + o + '" placeholder="VD: 10" maxlength="5" style="width:97%;text-align:center" class="green"/></td> <td align="center"> <div class="filehid"> <input type="file" name="ds[' + o + '][img_file]" id="img_file_' + o + '" title="Upload hình ảnh hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_' + o + '"></div> </td> <td align="center"><a href="javascript:void(0);" class="trash2"><i class="fa fa-trash"></i></a></td></tr>';
        $(t).appendTo(e), DinhDangTien();
        var n = o;
        $("#daungoai_" + o).on("change", function() {
            var e = $("#code_dau").val();
            0 == $(this).val() && $("#vat_" + n).attr("value", "0"), 1 == $(this).val() && $("#vat_" + n).attr("value", "10"), getMSD(e, n, $(this).val())
        });
        var a = o;
        $("#img_file_" + o).on("change", function(e) {
            e = URL.createObjectURL(e.target.files[0]);
            $("#view_pics_" + a).html('<img src="' + e + '">')
        });
        e = new Date(new Date - 2592e6), e = e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear();
        return $(".picker_dau").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0,
            minDate: e
        }), $(".picker_dau").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0,
            minDate: e
        }), $(".picker").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0
        }), o++, !1
    }), $(document).on("click", ".trash2", function() {
        return 1 < o && ($(this).parents(".row_petro").remove(), o--), !1
    });
    var t = $("#add_phuthu").attr("data-id");
    $("#add_phuthu").on("click", function() {
        var e = $(".body_phuthu");
        return $('<tr class="row_point_pt"><td align="center"><b>' + t + '</b></td> <td> <input type="text" name="pt[' + t + '][tenloaiphi_pt]" placeholder="Chọn loại phí phụ thu" id="tenloaiphi_pt_' + t + "\" onclick=\"return loadList('philamhang','LoadLoaiPhuThu'," + t + ')" required="required" autocomplete="off" style="width:97.5%"/> <input type="hidden" name="pt[' + t + '][id_loaiphi_pt]" id="id_loaiphi_pt_' + t + '"> </td> <td><input type="text" name="pt[' + t + '][sotien_pt]" data-type="currency" placeholder="VD: 1,000,000" required="required" style="width:97.5%"></td> <td><input type="text" name="pt[' + t + '][noidung_pt]" placeholder="Nội dung..." required="required" style="width:97.5%"></td> <td align="center"><a href="javascript:void(0);" class="trash_pt"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".save_lenh_pt").css({
            display: "block"
        }), DinhDangTien(), t++, !1
    }), $(document).on("click", ".trash_pt", function() {
        return 1 < t && ($(this).parents(".row_point_pt").remove(), t--), !1
    }), 1 == t && $(".save_lenh").css({
        display: "none"
    });
    var n = $("#add_hangmuc").attr("data-id"),
        a = $("#add_hangmuc_TX").attr("data-id"),
        i = "'dexuat'",
        c = "'HangMuc'",
        s = "'load_sp'",
        r = "'load_sp_search'";
    $("#add_hangmuc").on("click", function() {
        var e = $(".body_dexuat");
        $('<tr class="row_dexuat_suachua"> <td align="center">' + n + '</td> <td><input type="text" name="tr[' + n + '][hangmuc]" id="hmsc_' + n + '" onClick="return loadList(' + i + "," + c + ",1," + n + ')" onKeyDown="return false;" placeholder="Chọn hạng mục" required autocomplete="off"/> <input type="hidden" name="tr[' + n + '][hangmuc_id]" id="id_hmsc_' + n + '"></td> <td><select name="tr[' + n + '][tinh_trang]" required="required"> <option value="">[Tình trạng]</option> <option value="1_Sửa chữa">Sửa chữa</option> <option value="2_Bảo dưỡng">Bảo dưỡng</option> <option value="3_Thay mới">Thay mới</option> </select></td> <td><input type="text" name="tr[' + n + '][tensp]" id="tensp_' + n + '" onClick="return Load(' + i + "," + s + "," + r + "," + n + "," + n + ')" onKeyDown="return false;" placeholder="Sản phẩm từ kho" autocomplete="off"/> <input type="hidden" name="tr[' + n + '][id_sp]" id="id_sp_' + n + '"></td> <td><input type="number" min="1" max="100" name="tr[' + n + '][soluong]" placeholder="VD: 2"/></td> <td><input type="text" name="tr[' + n + '][donvi]" id="donvi_' + n + '" placeholder="VD: Cặp"/></td> <td><input type="text" name="tr[' + n + '][sotienchi]" id="sotienchi_' + n + '" data-type="currency" class="red" placeholder="VD: 15,000,000"/></td> <td><input type="text" name="tr[' + n + '][noidung_kiemtra]" placeholder="Nhập nội dung" required/></td> <td><input type="text" name="tr[' + n + '][phiphatsinh]" data-type="currency" class="red" placeholder="VD: 200,000"/></td> <td align="center"><div class="filehid"> <input type="file" name="tr[' + n + '][img_file]" id="img_file_' + n + '" accept="image/*;capture=camera" title="Upload hình ảnh"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_sp_' + n + '"></div></td> <td align="center"><a href="javascript:void(0)" class="trash trash_suachua"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), DinhDangTien();
        var t = n;
        $("#img_file_" + n).on("change", function(e) {
            e = URL.createObjectURL(e.target.files[0]);
            $("#view_sp_" + t).html('<img src="' + e + '">')
        }), n++
    }), $("#add_hangmuc_TX").on("click", function() {
        var e = $(".body_dexuat");
        $('<tr class="row_dexuat_suachua"> <td align="center">' + a + '</td> <td><input type="text" name="tr[' + a + '][hangmuc]" id="hmsc_' + a + '" onClick="return loadListTX(' + i + "," + c + ",1," + a + ')" onKeyDown="return false;" placeholder="Chọn hạng mục" required autocomplete="off"/> <input type="hidden" name="tr[' + a + '][hangmuc_id]" id="id_hmsc_' + a + '"></td> <td><select name="tr[' + a + '][tinh_trang]" required="required"> <option value="">[Tình trạng]</option> <option value="1_Sửa chữa">Sửa chữa</option> <option value="2_Bảo dưỡng">Bảo dưỡng</option> <option value="3_Thay mới">Thay mới</option> </select></td> <td><input type="text" name="tr[' + a + '][tensp]" id="tensp_' + a + '" onClick="return LoadTX(' + i + "," + s + "," + r + "," + a + "," + a + ')" onKeyDown="return false;" placeholder="Sản phẩm từ kho" autocomplete="off"/> <input type="hidden" name="tr[' + a + '][id_sp]" id="id_sp_' + a + '"></td> <td><input type="number" min="1" max="100" name="tr[' + a + '][soluong]" placeholder="VD: 2"/></td> <td><input type="text" name="tr[' + a + '][donvi]" id="donvi_' + a + '" placeholder="VD: Cặp"/></td> <td><input type="text" name="tr[' + a + '][sotienchi]" id="sotienchi_' + a + '" data-type="currency" class="red" placeholder="VD: 15,000,000"/></td> <td><input type="text" name="tr[' + a + '][noidung_kiemtra]" placeholder="Nhập nội dung" required/></td> <td><input type="text" name="tr[' + a + '][phiphatsinh]" data-type="currency" class="red" placeholder="VD: 200,000"/></td> <td align="center"><div class="filehid"> <input type="file" name="tr[' + a + '][img_file]" id="img_file_' + a + '" accept="image/*;capture=camera" title="Upload hình ảnh"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_sp_' + a + '"></div></td> <td align="center"><a href="javascript:void(0)" class="trash trash_suachua"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), DinhDangTien();
        var t = a;
        $("#img_file_" + a).on("change", function(e) {
            e = URL.createObjectURL(e.target.files[0]);
            $("#view_sp_" + t).html('<img src="' + e + '">')
        }), a++
    }), $(document).on("click", ".trash_suachua", function() {
        return 1 < n && ($(this).parents(".row_dexuat_suachua").remove(), n--), 1 < a && ($(this).parents(".row_dexuat_suachua").remove(), a--), !1
    });
    var l = $("#add_hsl").attr("data-id");
    $("#add_hsl").on("click", function() {
        var e = $(".body_hesoluong"),
            t = '<tr class="row_hsl"> <td align="center">' + l + "</td> <td>" + $phongban + '</td> <td><input type="text" name="tr[' + l + '][luongcoso]" data-type="currency" placeholder="VD: 3,000,000" required/></td> <td>' + $bacluong + '</td> <td><input type="text" name="tr[' + l + '][hesocoban]" placeholder="VD: 7.3" required/></td> <td align="center"><a href="javascript:void(0)" style="font-size:1.5rem" class="trash_hsl"><i class="fa fa-trash"></i></a></td> </tr>';
        $(t).appendTo(e), DinhDangTien(), $("#chucvu").attr("name", "tr[" + l + "][chucvu]"), $("#chucvu").removeAttr("id"), $("#bacluong").attr("name", "tr[" + l + "][bacluong]"), $("#bacluong").removeAttr("id"), l++
    }), $(document).on("click", ".trash_hsl", function() {
        return 1 < l && ($(this).parents(".row_hsl").remove(), l--), !1
    })
}), $(function() {
    var t = 1;
    $("#add_lop").on("click", function() {
        var e = $(".body_lop");
        return $('<tr class="row_lop"> <td><input type="text" name="ds[' + t + '][ngay]" placeholder="Ngày sửa" maxlength="10" class="picker" style="width:97%" autocomplete="off" readonly/></td> <td><div style="width:100%"> <select name="ds[' + t + '][gio]" style="width:46.5%;float:left" required="required"> <option value="">Giờ</option> <option value="00">0 giờ</option> <option value="01">1 giờ</option> <option value="02">2 giờ</option> <option value="03">3 giờ</option> <option value="04">4 giờ</option> <option value="05">5 giờ</option> <option value="06">6 giờ</option> <option value="07">7 giờ</option> <option value="08">8 giờ</option> <option value="09">9 giờ</option> <option value="10">10 giờ</option> <option value="11">11 giờ</option> <option value="12">12 giờ</option> <option value="13">13 giờ</option> <option value="14">14 giờ</option> <option value="15">15 giờ</option> <option value="16">16 giờ</option> <option value="17">17 giờ</option> <option value="18">18 giờ</option> <option value="19">19 giờ</option> <option value="20">20 giờ</option> <option value="21">21 giờ</option> <option value="22">22 giờ</option> <option value="23">23 giờ</option> </select> <select name="ds[' + t + '][phut]" style="width:46.5%;float:right;margin:0 0 0 5px" required="required"> <option value="">Phút</option> <option value="00">0 phút</option> <option value="01">1 phút</option> <option value="02">2 phút</option> <option value="03">3 phút</option> <option value="04">4 phút</option> <option value="05">5 phút</option> <option value="06">6 phút</option> <option value="07">7 phút</option> <option value="08">8 phút</option> <option value="09">9 phút</option> <option value="10">10 phút</option> <option value="11">11 phút</option> <option value="12">12 phút</option> <option value="13">13 phút</option> <option value="14">14 phút</option> <option value="15">15 phút</option> <option value="16">16 phút</option> <option value="17">17 phút</option> <option value="18">18 phút</option> <option value="19">19 phút</option> <option value="20">20 phút</option> <option value="21">21 phút</option> <option value="22">22 phút</option> <option value="23">23 phút</option> <option value="24">24 phút</option> <option value="25">25 phút</option> <option value="26">26 phút</option> <option value="27">27 phút</option> <option value="28">28 phút</option> <option value="29">29 phút</option> <option value="30">30 phút</option> <option value="31">31 phút</option> <option value="32">32 phút</option> <option value="33">33 phút</option> <option value="34">34 phút</option> <option value="35">35 phút</option> <option value="36">36 phút</option> <option value="37">37 phút</option> <option value="38">38 phút</option> <option value="39">39 phút</option> <option value="40">40 phút</option> <option value="41">41 phút</option> <option value="42">42 phút</option> <option value="43">43 phút</option> <option value="44">44 phút</option> <option value="45">45 phút</option> <option value="46">46 phút</option> <option value="47">47 phút</option> <option value="48">48 phút</option> <option value="49">49 phút</option> <option value="50">50 phút</option> <option value="51">51 phút</option> <option value="52">52 phút</option> <option value="53">53 phút</option> <option value="54">54 phút</option> <option value="55">55 phút</option> <option value="56">56 phút</option> <option value="57">57 phút</option> <option value="58">58 phút</option> <option value="59">59 phút</option> </select> </div></td> <td><select name="ds[' + t + '][tinhtrang]" style="width:90px" required="required"> <option value="">Tình trạng</option> <option value="1">Sửa chữa</option> <option value="2">Thay mới</option> </select></td> <td><input type="text" name="ds[' + t + '][tennhanvien]" placeholder="Nhân viên" maxlength="100" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][garage_thuchien]" placeholder="Tên Garage" maxlength="100" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][biensoxe]" id="biensoxe_' + t + '" onClick="return listXeDau(' + t + ')" placeholder="Biển số xe" maxlength="15" style="width:97%" autocomplete="off" readonly/> <input type="hidden" name="ds[' + t + '][id_xe]" id="id_xe_' + t + '"/></td> <td><input type="text" name="ds[' + t + '][noidung]" placeholder="Nội dung" maxlength="500" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][sokm]" placeholder="VD: 1,035.5" maxlength="30" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][tenncc]" id="tenncc_' + t + "\" onclick=\"return loadList('ncc','LoadNCC'," + t + ')" placeholder="Nhà cung cấp" maxlength="255" style="width:97%" autocomplete="off"/><input type="hidden" name="ds[' + t + '][id_ncc]" id="id_ncc_' + t + '"/></td> <td><input type="text" name="ds[' + t + '][baohanh]" placeholder="Bảo hành" class="picker" autocomplete="off" readonly maxlength="10" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][sovo]" placeholder="Số vỏ" maxlength="30" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][dongia]" data-type="currency" placeholder="Đơn giá" maxlength="30" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][tiencong]" placeholder="Tiền công" maxlength="30" style="width:97%"/></td> <td align="center"><a href="javascript:void(0);" class="trash3"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0
        }), DinhDangTien(), t++, !1
    }), $(document).on("click", ".trash3", function() {
        return 1 < t && ($(this).parents(".row_lop").remove(), t--), !1
    })
}), $(function() {
    var t = 1;
    $("#add_suachua").on("click", function() {
        var e = $(".body_suachua");
        return $('<tr class="row_suachua"> <td><input type="text" name="ds[' + t + '][ngay]" placeholder="Ngày sửa" maxlength="10" class="picker" style="width:32%;margin:0 5px 0 0" autocomplete="off" required/> <div style="width:100%"> <select name="ds[' + t + '][gio]" style="width:30%;float:left" required="required"> <option value="">Giờ</option> <option value="00">0 giờ</option> <option value="01">1 giờ</option> <option value="02">2 giờ</option> <option value="03">3 giờ</option> <option value="04">4 giờ</option> <option value="05">5 giờ</option> <option value="06">6 giờ</option> <option value="07">7 giờ</option> <option value="08">8 giờ</option> <option value="09">9 giờ</option> <option value="10">10 giờ</option> <option value="11">11 giờ</option> <option value="12">12 giờ</option> <option value="13">13 giờ</option> <option value="14">14 giờ</option> <option value="15">15 giờ</option> <option value="16">16 giờ</option> <option value="17">17 giờ</option> <option value="18">18 giờ</option> <option value="19">19 giờ</option> <option value="20">20 giờ</option> <option value="21">21 giờ</option> <option value="22">22 giờ</option> <option value="23">23 giờ</option> </select> <select name="ds[' + t + '][phut]" style="width:30.5%;float:right;margin:0 0 0 5px" required="required"> <option value="">Phút</option> <option value="00">0 phút</option> <option value="01">1 phút</option> <option value="02">2 phút</option> <option value="03">3 phút</option> <option value="04">4 phút</option> <option value="05">5 phút</option> <option value="06">6 phút</option> <option value="07">7 phút</option> <option value="08">8 phút</option> <option value="09">9 phút</option> <option value="10">10 phút</option> <option value="11">11 phút</option> <option value="12">12 phút</option> <option value="13">13 phút</option> <option value="14">14 phút</option> <option value="15">15 phút</option> <option value="16">16 phút</option> <option value="17">17 phút</option> <option value="18">18 phút</option> <option value="19">19 phút</option> <option value="20">20 phút</option> <option value="21">21 phút</option> <option value="22">22 phút</option> <option value="23">23 phút</option> <option value="24">24 phút</option> <option value="25">25 phút</option> <option value="26">26 phút</option> <option value="27">27 phút</option> <option value="28">28 phút</option> <option value="29">29 phút</option> <option value="30">30 phút</option> <option value="31">31 phút</option> <option value="32">32 phút</option> <option value="33">33 phút</option> <option value="34">34 phút</option> <option value="35">35 phút</option> <option value="36">36 phút</option> <option value="37">37 phút</option> <option value="38">38 phút</option> <option value="39">39 phút</option> <option value="40">40 phút</option> <option value="41">41 phút</option> <option value="42">42 phút</option> <option value="43">43 phút</option> <option value="44">44 phút</option> <option value="45">45 phút</option> <option value="46">46 phút</option> <option value="47">47 phút</option> <option value="48">48 phút</option> <option value="49">49 phút</option> <option value="50">50 phút</option> <option value="51">51 phút</option> <option value="52">52 phút</option> <option value="53">53 phút</option> <option value="54">54 phút</option> <option value="55">55 phút</option> <option value="56">56 phút</option> <option value="57">57 phút</option> <option value="58">58 phút</option> <option value="59">59 phút</option> </select> </div></td> <td><input type="text" name="ds[' + t + '][tennhanvien]" id="tx_' + t + '" onclick="return listTaiXeDau(' + t + ')" placeholder="Tài xế" required autocomplete="off" maxlength="100" style="width:97%"/> <input type="hidden" name="ds[' + t + '][id_taixe]" id="id_tx_' + t + '"/></td> <td><input type="text" name="ds[' + t + '][garage_thuchien]" placeholder="Tên Garage" maxlength="255" style="width:97%" required/></td> <td><select name="ds[' + t + '][loaiphuongtien]" onchange="changeLoaiPT(this.value,' + t + ')" required style="width:45%;float:left;margin:0 5px 0 0"> <option value="">[Loại PT]</option> <option value="1">Đầu cái</option> <option value="2">Rơ mooc</option> </select> <div id="loaipt_' + t + '"> <input type="text" disabled="disabled" style="width:49%;float:right"> </div></td> <td><input type="text" name="ds[' + t + '][noidung]" placeholder="Nội dung" maxlength="500" style="width:97%" required/></td> <td><input type="text" name="ds[' + t + '][sokm]" placeholder="VD: 1,035.5" maxlength="30" style="width:97%"/></td> <td><input type="text" name="ds[' + t + '][sotien]" data-type="currency" placeholder="VD: 5,000,000" maxlength="30" style="width:97%" required/></td> <td align="center"><a href="javascript:void(0);" class="trash4"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0
        }), DinhDangTien(), t++, !1
    }), $(document).on("click", ".trash4", function() {
        return 1 < t && ($(this).parents(".row_suachua").remove(), t--), !1
    });
    var n = 1;
    $("#add_suachuaTX").on("click", function() {
        var e = $(".body_suachuatx");
        return $('<tr class="row_suachua"> <td><input type="text" name="ds[' + n + '][ngay]" placeholder="Ngày sửa" maxlength="10" class="picker" style="width:32%;margin:0 5px 0 0" autocomplete="off" required/> <div style="width:100%"> <select name="ds[' + n + '][gio]" style="width:30%;float:left" required="required"> <option value="">Giờ</option> <option value="00">0 giờ</option> <option value="01">1 giờ</option> <option value="02">2 giờ</option> <option value="03">3 giờ</option> <option value="04">4 giờ</option> <option value="05">5 giờ</option> <option value="06">6 giờ</option> <option value="07">7 giờ</option> <option value="08">8 giờ</option> <option value="09">9 giờ</option> <option value="10">10 giờ</option> <option value="11">11 giờ</option> <option value="12">12 giờ</option> <option value="13">13 giờ</option> <option value="14">14 giờ</option> <option value="15">15 giờ</option> <option value="16">16 giờ</option> <option value="17">17 giờ</option> <option value="18">18 giờ</option> <option value="19">19 giờ</option> <option value="20">20 giờ</option> <option value="21">21 giờ</option> <option value="22">22 giờ</option> <option value="23">23 giờ</option> </select> <select name="ds[' + n + '][phut]" style="width:30.5%;float:right;margin:0 0 0 5px" required="required"> <option value="">Phút</option> <option value="00">0 phút</option> <option value="01">1 phút</option> <option value="02">2 phút</option> <option value="03">3 phút</option> <option value="04">4 phút</option> <option value="05">5 phút</option> <option value="06">6 phút</option> <option value="07">7 phút</option> <option value="08">8 phút</option> <option value="09">9 phút</option> <option value="10">10 phút</option> <option value="11">11 phút</option> <option value="12">12 phút</option> <option value="13">13 phút</option> <option value="14">14 phút</option> <option value="15">15 phút</option> <option value="16">16 phút</option> <option value="17">17 phút</option> <option value="18">18 phút</option> <option value="19">19 phút</option> <option value="20">20 phút</option> <option value="21">21 phút</option> <option value="22">22 phút</option> <option value="23">23 phút</option> <option value="24">24 phút</option> <option value="25">25 phút</option> <option value="26">26 phút</option> <option value="27">27 phút</option> <option value="28">28 phút</option> <option value="29">29 phút</option> <option value="30">30 phút</option> <option value="31">31 phút</option> <option value="32">32 phút</option> <option value="33">33 phút</option> <option value="34">34 phút</option> <option value="35">35 phút</option> <option value="36">36 phút</option> <option value="37">37 phút</option> <option value="38">38 phút</option> <option value="39">39 phút</option> <option value="40">40 phút</option> <option value="41">41 phút</option> <option value="42">42 phút</option> <option value="43">43 phút</option> <option value="44">44 phút</option> <option value="45">45 phút</option> <option value="46">46 phút</option> <option value="47">47 phút</option> <option value="48">48 phút</option> <option value="49">49 phút</option> <option value="50">50 phút</option> <option value="51">51 phút</option> <option value="52">52 phút</option> <option value="53">53 phút</option> <option value="54">54 phút</option> <option value="55">55 phút</option> <option value="56">56 phút</option> <option value="57">57 phút</option> <option value="58">58 phút</option> <option value="59">59 phút</option> </select> </div></td>  <td><input type="text" name="ds[' + n + '][garage_thuchien]" placeholder="Tên Garage" maxlength="255" style="width:97%" required/></td> <td><select name="ds[' + n + '][loaiphuongtien]" onchange="changeLoaiPTTX(this.value,' + n + ')" required style="width:45%;float:left;margin:0 5px 0 0"> <option value="">[Loại PT]</option> <option value="1">Đầu cái</option> <option value="2">Rơ mooc</option> </select> <div id="loaipt_' + n + '"> <input type="text" disabled="disabled" style="width:49%;float:right"> </div></td> <td><input type="text" name="ds[' + n + '][noidung]" placeholder="Nội dung" maxlength="500" style="width:97%" required/></td> <td><input type="text" name="ds[' + n + '][sokm]" placeholder="VD: 1,035.5" maxlength="30" style="width:97%"/></td> <td><input type="text" name="ds[' + n + '][sotien]" data-type="currency" placeholder="VD: 5,000,000" maxlength="30" style="width:97%" required/></td> <td align="center"><a href="javascript:void(0);" class="trash4tx"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), $(".picker").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0
        }), DinhDangTien(), n++, !1
    }), $(document).on("click", ".trash4tx", function() {
        return 1 < n && ($(this).parents(".row_suachuatx").remove(), n--), !1
    })
}), $(function() {
    var n = $("#add_sohoadon").attr("data-id");
    $("#add_sohoadon").on("click", function() {
        var e = $(".body_sohoadon");
        $('<tr class="row_sohoadon"> <td align="center">' + n + '</td> <td><input type="text" name="tr[' + n + '][vat]" class="number-format" placeholder="% VAT" maxlength="5" required></td> <td><input type="text" name="tr[' + n + '][vat_sotien]" data-type="currency" placeholder="Số tiền VAT" maxlength="30" required></td> <td><input type="text" name="tr[' + n + '][sotien]" data-type="currency" placeholder="Tổng trị giá" maxlength="30" required></td> <td><input type="text" name="tr[' + n + '][sohoadon]" placeholder="Số hóa đơn" maxlength="100" required></td> <td><input type="text" name="tr[' + n + '][ngay]" class="picker" placeholder="Ngày hóa đơn" maxlength="10" autocomplete="off" required></td> <td><input type="text" name="tr[' + n + '][ghichu]" placeholder="Ghi chú nếu có..." maxlength="255"></td> <td><div class="filehid"> <input type="file" name="tr[' + n + '][img_file]" id="img_file_' + n + '" accept="image/*;capture=camera" title="Upload file hóa đơn"> <i class="fa fa-camera"></i></div> <div class="view_img_txt" id="view_pics_' + n + '"></div></td> <td><a href="javascript:void(0)" class="trash_shd" title="Xóa dòng" style="width: 32px;height: 32px;float: right;line-height: 32px;text-align: center"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), NumberFormat(), DinhDangTien(), $(".picker").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "yy-mm-dd",
            changeMonth: !0,
            changeYear: !0
        });
        var t = n;
        $("#img_file_" + n).on("change", function(e) {
            e = URL.createObjectURL(e.target.files[0]);
            $("#view_pics_" + t).html('<img src="' + e + '">')
        }), n++
    }), $(document).on("click", ".trash_shd", function() {
        return 1 < n && ($(this).parents(".row_sohoadon").remove(), n--), !1
    })
}), $(function() {
    var n = $("#add_dexuat").attr("data-id");
    func_sp = "'LoadSanPham'", file_id = "'img_file'", $("#add_dexuat").on("click", function() {
        var e = $(".body_kho"),
            t = '<tr class="row_dx"> <td align="center"><b>' + n + '</b></td> <td><select name="ds[' + n + '][tinhtrangnhap]" id="tinhtrangnhap_' + n + '" required="required" onChange="changeLoaiNhapList(' + n + ')" style="float:left;width:105px"> <option value="">[Tình trạng]</option> <option value="1">Nhập mới</option> <option value="2">Nhập thêm</option> </select></td> <td> <input type="text" name="ds[' + n + '][tensp]" id="tensp_' + n + "\" onClick=\"return loadList('sp'," + func_sp + ",1," + n + ')" placeholder="Tên sản phẩm" maxlength="255" readonly autocomplete="off" style="width:95.5%;margin:0 0 0 5px;"> <input type="hidden" name="ds[' + n + '][id_sp]" id="id_sp_' + n + '"></td> <td><input type="text" name="ds[' + n + '][tenncc]" id="tenncc_' + n + "\" onClick=\"return loadList('ncc','LoadNCC'," + n + ')" placeholder="Tên nhà cung cấp" maxlength="255" autocomplete="off" readonly> <input type="hidden" name="ds[' + n + '][id_ncc]" id="id_ncc_' + n + '"></td> <td><input type="text" name="ds[' + n + '][soseri]" placeholder="Số seri nếu có" maxlength="100"></td> <td><input type="text" name="ds[' + n + '][soluong]" onKeyPress="return checkIt(event)" placeholder="VD: 100" maxlength="30" required></td> <td><input type="text" name="ds[' + n + '][donvi]" placeholder="VD: Cái, Cặp, ..." maxlength="255" required></td> <td><input type="text" name="ds[' + n + '][dongia]" data-type="currency" placeholder="VD: 1,500,000" maxlength="30" required></td> <td><input type="text" name="ds[' + n + '][baohanh_km]" maxlength="30" placeholder="VD: 15,000" required></td> <td><input type="text" name="ds[' + n + '][baohanh]" autocomplete="off" maxlength="10" class="picker" placeholder="Ngày bảo hành"></td> <td align="center"><a href="javascript:void(0);" class="trash_dx red"><i class="fa fa-trash"></i></a></td></tr>';
        return $(t).appendTo(e), $(".picker").datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            yearRange: "-100:+50",
            showButtonPanel: !0,
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0,
            minDate: 0
        }), DinhDangTien(), n++, !1
    }), $(document).on("click", ".trash_dx", function() {
        return 1 < n && ($(this).parents(".row_dx").remove(), n--), !1
    });
    var t = 1;
    $("#add_giacuoc").on("click", function() {
        var e = $(".body_giacuoc");
        $('<tr class="row_giacuoc"> <td align="center">' + t + '</td> <td><input type="text" name="ds[' + t + '][id_tuyen]" placeholder="VD: CL-HL-CL" required></td> <td><input type="text" name="ds[' + t + '][tentuyen]" placeholder="VD: Cát Lái - Hoa Lư - Cái Lái" required></td> <td><input type="number" name="ds[' + t + '][sokm]" min="1" max="10000" placeholder="VD: 300" required></td> <td><input type="text" name="ds[' + t + '][loaicont]" placeholder="Loại cont/ĐVT" required></td> <td><input type="text" name="ds[' + t + '][luongcap]" data-type="currency" placeholder="VD: 1,200,000" required></td> <td><input type="text" name="ds[' + t + '][luongchuyen]" data-type="currency" placeholder="VD: 900,000" required></td> <td><input type="text" name="ds[' + t + '][giavon]" data-type="currency" placeholder="VD: 4,200,000" required></td> <td><input type="text" name="ds[' + t + '][giaban]" data-type="currency" placeholder="VD: 7,200,000" required></td> <td><input type="text" name="ds[' + t + '][hoahong]" data-type="currency" placeholder="VD: 200,000" required></td> <td align="center"><a href="javascript:void(0)" style="font-size:1.5rem" class="trash_giacuoc"><i class="fa fa-trash"></i></a></td></tr>').appendTo(e), DinhDangTien(), t++
    }), $(document).on("click", ".trash_giacuoc", function() {
        return 1 < t && ($(this).parents(".row_giacuoc").remove(), t--), !1
    });
    var a = 1;
    $("#add_giacuoc_hangroi").on("click", function() {
        var e = $(".body_giacuoc_hangroi"),
            t = '<tr class="row_giacuoc_hangroi"><td align="center">' + a + '</td><td><input type="text" name="ds[' + a + '][id_tuyen]" placeholder="VD: CL-HL-CL" required></td> <td><input type="text" name="ds[' + a + '][tentuyen]" placeholder="VD: Cát Lái - Hoa Lư - Cái Lái" required></td> <td><input type="number" name="ds[' + a + '][sokm]" min="1" max="10000" placeholder="VD: 300" required></td> <td><select name="ds[' + a + '][loaihang]" required> <option value="">Loại hàng</option> <option value="1">Nhập</option> <option value="2">Xuất</option> <option value="3">Nội địa</option> </select></td> <td><input type="text" name="ds[' + a + '][tenhang]" placeholder="VD: Cuộn thép" maxlength="100" required></td> <td><input type="text" name="ds[' + a + '][luongchuyen]" data-type="currency" placeholder="VD: 800,000" required></td> <td><input type="text" name="ds[' + a + '][giaban]" data-type="currency" placeholder="VD:100,000" required></td> <td><select name="ds[' + a + '][donvitinh]" required> <option value="">Chọn đơn vị</option> ' + $donvivanchuyen + ' </select></td> <td align="center"><a href="javascript:void(0)" style="font-size:1.5rem" class="trash_giacuoc_hangroi"><i class="fa fa-trash"></i></a></td></tr>';
        $(t).appendTo(e), DinhDangTien(), a++
    }), $(document).on("click", ".trash_giacuoc_hangroi", function() {
        return 1 < a && ($(this).parents(".row_giacuoc_hangroi").remove(), a--), !1
    })
}), Number.prototype.toHHMMSS = function() {
    return (Math.floor(this / 3600) < 10 ? ("00" + Math.floor(this / 3600)).slice(-2) : Math.floor(this / 3600)) + ":" + ("00" + Math.floor(this % 3600 / 60)).slice(-2) + ":" + ("00" + this % 3600 % 60).slice(-2)
};