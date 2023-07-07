import { createApp } from 'vue'
import App from '@/App.vue'
import Antd from 'ant-design-vue';
import router from '@/router';
import 'ant-design-vue/dist/antd.css';
import store from '@/store/index.js'

const app = createApp(App)

app
    .use(Antd) 
    .use(store)
    .use(router)
    .mount('#app')
