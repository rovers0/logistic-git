import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import 'flowbite'
import VueCookies from 'vue-cookies'
import Datepicker from "@/components/Datepicker.vue"
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import '../public/css/primevue.css'



createApp(App)
    .component('Datepicker', Datepicker)
    .use(VueCookies, { expire: '7d' })
    .use(store)
    .use(router)
    .use(PrimeVue)
    .mount('#app')
