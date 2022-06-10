import { createApp } from 'vue';
import App from './App.vue';
import router from './structure/vue-plugins/router/router.js';
import store from './structure/vue-plugins/store/store.js';

const app = createApp(App);

// 已在vite.config.js中使用了按需加载，这里只是引入css
import 'element-plus/es/components/message/style/css';
app.config.globalProperties.$Notic = ElNotification;


// 引入axios
import { installAxios } from './utils/http/index.js';
installAxios(app);

// 引入vxe-table, 做为整个框架的模块化处理插件
import { installVxeTable } from './plugins/vxe-table.js';

installVxeTable(app);
app
	.use(store)
	.use(router)
	.mount('#app');
