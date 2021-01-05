import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/reset.css'
import '@/assets/fonts/iconfont.css'
import 'element-plus/lib/theme-chalk/index.css'
import ElementPlus from 'element-plus'
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
