<template>
    <div class="banner banner_fix">
        <a href="javascript:void(0)" class="toggle_menu_left"><i class="fa fa-align-left"></i></a>
        <div class="user user_fix"><a href="javascript:void(0)" title="Tài khoản đăng nhập"
                class="toogle_user toogle_user_fix"><i class="fa fa-user"></i> Hi, {{ user.name }}</a>
            <div class="toogle_class"><i class="arrow-up"></i><i class="arrow-up2"></i><span>V</span>
                <p class="bold"> {{ user.name }}</p>
                <p class="p">Kỹ thuật</p>
                <h3 class="h3op"><i class="fa fa-cog"></i> Chọn giao diện làm việc</h3>
                <div class="setch">
                    <ul>
                        <li><a href="javascript:void(0)" id="mn_horizontal"><input id="radio0" type="radio"
                                    v-model="menu" :value="0" @change="changeMenuType"><label for="radio0">Giao diện
                                    menu ngang</label></a></li>
                        <li><a href="javascript:void(0)" id="mn_horizontal"><input id="radio1" type="radio"
                                    v-model="menu" :value="1" @change="changeMenuType"><label for="radio1">Giao diện
                                    menu dọc</label></a></li>
                    </ul>
                </div>
                <p class="p2">
                    <a href="javascript:void(0)" title="Thoát" @click="logout">Đăng xuất</a>
                    <a href="javascript:void(0)" onClick="return frmChangePass()" title="Đổi mật khẩu?"
                        style="float:right;border:0;background:none;color:#0084fc;text-decoration:underline">Đổi mật
                        khẩu?</a>
                </p>
            </div>
        </div>
        <ul class="topplugin topplugin_fix">
            <li><a href="./suco" title="Thông báo sự cố"><i class="fa fa-exclamation-triangle"></i> Sự cố <span
                        class="red bold">(0)</span></a></li>
            <!-- <li><a href="./test-gps" title="Track map"><i class="fa fa-map-marker"></i> Track map</a></li> -->
            <li><a href="./lichxe" title="Xem lịch xe"><i class="fa fa-truck"></i> Lịch xe</a></li>
            <li><a href="./baogiatuyen" title="Theo dõi báo giá"><i class="fa fa-folder-open"></i> Bảng giá HĐ</a></li>
            <!-- <li><a href="./forum" title="Thông tin nội bộ"><i class="fa fa-bullhorn"></i> Forum</a></li> -->
            <li><a href="./sotay" title="Sổ tay cá nhân"><i class="fa fa-book"></i> Sổ tay</a></li>
            <!-- <li><a href="./soluong" title="Bảng lương cá nhân"><i class="fa fa-list-alt"></i> Sổ lương</a></li>
            <li><a href="./hotro" title="Hỗ trợ hệ thống"><i class="fa fa-question-circle"></i> Hỗ trợ</a></li> -->
        </ul>
        <div class="forum" title="Thông báo mới"><a href="javascript:void(0)" class="noticlick dropbtn"
                onclick="dropFunction()"><span class="sp1"><i class="fa fa-bell"></i></span></a>
            <div class="noti" id="noti">
                <h3>Thông báo gần nhất <span class="green">(0)</span></h3> <a href="./forum/" class="viewall"><i
                        class="fa fa-list"></i> Xem tất cả thông báo</a> <a href="javascipt:void(0)"
                    onClick="return frmForm('forum','frm',1)" class="post"><i class="fa fa fa-pencil-square"></i> Đăng
                    bài viết mới</a>
            </div>
        </div>
        <div id="show_clock" style="float:right;color:#fff;line-height:44px;margin:0 12px 0 0"></div><span
            class="mbtop"><i class="fa fa-th"></i></span>
        <ul class="icmb">
            <li><a href="./gps"><i class="fa fa-map-marker"></i></a></li>
            <li><a href="./lenh"><i class="fa fa-truck"></i></a></li>
            <li><a href="./vandon"><i class="fa fa-newspaper-o"></i></a></li>
            <li><a href="./baocao"><i class="fa fa-pie-chart"></i></a></li>
        </ul>
    </div>
    <div class="banner_clear"></div>
    <div class="transmenu"></div>
</template>

<style scoped></style>
<script setup>

</script>
<script>
export default {
    emits: ['refreshPage'],
    data: function () {
        return {
            user: this.$store.state.user.data ? JSON.parse(this.$store.state.user.data) : {},
            menu: 1,
        }
    },
    mounted: function () {

    },
    methods: {
        changeMenuType: function () {
            let data = {
                menu: this.menu
            };
            this.$store.dispatch("changeMenuType", data).then((res) => {
                localStorage.setItem('setting', res.data.data.setting);
                this.$router.go();
            });
        },
        logout: function () {
            this.$store.dispatch("logout").then(() => {
                this.$router.push({
                    name: "Login",
                });
            });
        }
    }
}
</script>