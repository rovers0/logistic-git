<template>
    <link rel="stylesheet" type="text/css" href="css/login.css" />
    <div class="page">
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <div class="login100-form-title banner">
                        <img src="logo.png" />
                        <span class="login100-form-title-1">Phần mềm vận tải Logistics</span>
                        <div id="show_clock" class="cal_log"></div>
                    </div>
                    <form enctype="multipart/form-data" class="login100-form validate-form">
                        <h1><i class="fa fa-lock"></i> Đăng nhập</h1>
                        <div class="wrap-input100 validate-input" data-validate="Username is required">
                            <span class="label-input100">Số điện thoại</span>
                            <input class="input100" type="tel" v-model="phone" placeholder="Số điện thoại đăng nhập" maxlength="10" oninput="this.value=this.value.replace(/[^0-9]/g,'');" required />
                            <span class="focus-input100"></span>
                        </div>
                        <div class="wrap-input100 validate-input" data-validate="Password is required">
                            <span class="label-input100">Mật khẩu</span>
                            <div class="vpass">
                                <input class="input100" id="txtPassword" type="password" v-model="password" placeholder="Mật khẩu đăng nhập" maxlength="30" required />
                                <span class="toggpass" id="toggpass" title="Ẩn/Hiện mật khẩu" onclick="togglePwd('txtPassword','toggpass')"><i class="fa fa-eye"></i></span>
                            </div>
                            <span class="focus-input100"></span>
                        </div>
                        <div class="container-login100-form-btn"><button type="button" @click="login" class="login100-form-btn">Đăng nhập</button></div>
                    </form>
                    <p style="text-align:center;padding:23px 0;clear:both;color:#999">© Phần mềm Logistics - www.vantaihaiphong.com.vn</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
<script setup>

</script>
<script>
export default {
    data: function () {
        return {
            phone: null,
            password: null
        }
    },
    mounted: function () {
        this.loadScript();
    },
    methods: {
        login: function () {
            let data = {
                phone: this.phone,
                password: this.password
            };
            this.$store.dispatch("login", data).then(() => {
                this.$router.push({
                    name: "Dashboard",
                });
            });
        },
        loadScript: function () {
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'js/login.js')
            document.head.appendChild(recaptchaScript)
        }
    }
}
</script>
