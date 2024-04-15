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
};

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