import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVantPlugins from './plugins'


const app = createApp(App)
getVantPlugins(app)
app.use(store)
app.use(router).mount('#app')
//配置文件改变必须重启服务