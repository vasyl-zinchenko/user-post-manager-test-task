import { createApp } from 'vue';
import { router } from './router';
import { createPinia } from 'pinia';
import './style.css';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus).use(pinia).use(router);
app.mount('#app');
