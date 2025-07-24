import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3";
import '@/util/axios.config'

window.addEventListener('error', (event) => {
  if (event.message.includes('ResizeObserver')) {
    event.preventDefault()
  }
})


const app=createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(Particles);

app.mount('#app')
