import { createApp } from 'vue'
import './style.css'
import 'overlayscrollbars/overlayscrollbars.css'
import App from './App.vue'

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css'
import router from './router'

import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars'

OverlayScrollbars.plugin(ClickScrollPlugin)

const app = createApp(App)
app.use(router)
app.mount('#app')