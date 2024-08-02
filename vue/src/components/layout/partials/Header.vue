<template>
    <div class="header" id="myHeader">
        <span class="mbmenu"><i class="fa fa-bars"></i></span><a href="/" class="home"><i class="fa fa-home"></i></a>
        <ul class="menu">
            <li><a href="/"><i class="fa fa-home mnh"></i> Home</a></li>
            <!-- <li><a href="./vandon">Vận đơn <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./lenh">Lệnh điều động</a></li>
                    <li><a href="./lenh/xuat">Danh sách Cont</a></li>
                </ul>
            </li>
            <li><a href="./hangroi">Hàng rời <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./hangroi/lenh">Lệnh điều động</a></li>
                </ul>
            </li>
            <li><a href="./ncc">Nhà cung cấp</a></li>
            <li><a href="./kho">Q.Lý Kho <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./kho">Quản lý sản phẩm kho</a></li>
                    <li><a href="./kho/dexuat">Phiếu đề xuất nhập kho</a></li>
                    <li><a href="./kho/xuat">Lịch sử xuất kho</a></li>
                    <li><a href="./sp"><i class="fa fa-plus"></i> Sản phẩm nhập kho</a></li>
                </ul>
            </li>
            <li><a href="./dau">Theo dõi dầu <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./dau/xuat/?m=03&y=2024">Định mức tiêu hao nhiên liệu</a></li>
                </ul>
            </li>
            <li><a href="./lop">Theo dõi lốp <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./lop/lopmoi">Kho lốp nhập mới</a></li>
                    <li><a href="./lopthuhoi">Kho lốp thu hồi</a></li>
                </ul>
            </li>
            <li><a href="./dexuat">Sửa chữa <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./dexuat">Đề xuất sửa chữa</a></li>
                    <li><a href="./suachua">Sửa chữa vặt</a></li>
                    <li><a href="./hangmuc"><i class="fa fa-plus"></i> Hạng mục sửa chữa</a></li>
                </ul>
            </li> -->
            <li><a href="./vehicle">Phương tiện <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./vehicle">Đội xe</a></li>
                    <li><a href="./vehicle/mooc">Rơ mooc</a></li>
                    <li><a href="./vehicle/driver">Tài xế</a></li>
                </ul>
            </li>
            <!-- <li><a href="./baocao"><i class="fa fa-area-chart mnh"></i> Báo cáo</a>
                <ul>
                    <li><a href="./baocaoxe">Doanh thu theo xe</a></li>
                </ul>
            </li> -->
        </ul>
        <div class="user"><a href="javascript:void(0)" title="Tài khoản đăng nhập" class="toogle_user"><i class="fa fa-user"></i> Hi, Vtm</a>
            <div class="toogle_class"><i class="arrow-up"></i><i class="arrow-up2"></i><span>V</span>
                <p class="bold">Vtm</p>
                <p class="p">Kỹ thuật</p>
                <template v-if="!isMobile">
                    <h3 class="h3op"><i class="fa fa-cog"></i> Chọn giao diện làm việc</h3>
                    <div class="setch">
                        <ul>
                            <li><a href="javascript:void(0)" id="mn_horizontal"><input id="radio0" type="radio" v-model="menu" :value="0" @change="changeMenuType"><label for="radio0">Giao diện menu ngang</label></a></li>
                            <li><a href="javascript:void(0)" id="mn_horizontal"><input id="radio1" type="radio" v-model="menu" :value="1" @change="changeMenuType"><label for="radio1">Giao diện menu dọc</label></a></li>
                        </ul>
                    </div>
                </template>
                <p class="p2">
                    <a href="javascript:void(0)" title="Thoát" @click="logout">Đăng xuất</a>
                    <a href="javascript:void(0)" title="Đổi mật khẩu?" style="float:right;border:0;background:none;color:#0084fc;text-decoration:underline">Đổi mật khẩu?</a>
                </p>
            </div>
        </div>
    </div>
    <div class="transmenu"></div>
</template>

<style scoped>

</style>
<script setup>

</script>
<script>
export default {
    emits: ['refreshPage'],
    data: function () {
        return {
            menu: 0,
            isMobile: false
        }
    },
    mounted: function () {
        this.checkMobile();
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
        },
        checkMobile: function () {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.isMobile = true;
            } else {
                this.isMobile = false
            }
        }
    }
}
</script>
