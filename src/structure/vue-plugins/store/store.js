import { toRaw } from 'vue';
import { createStore, createLogger } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';

const modules = {};
// vite无法使用require,获取到的是以路径作为索引的export出来的对象
const files = import.meta.globEager('./modules/*.js');
for (const path in files) {
	const key = path.replace('./modules/', '').replace('.js', '');
	modules[key] = files[path].default;
}

const debug = process.env.NODE_ENV !== 'production';

const persistence = createPersistedstate({
	key: 'erabbit-client-pc-store',
	storage: window.localStorage,
	paths: Object.keys(modules)
});

let plugins = [persistence];

if (debug) {
	plugins.push(createLogger());
}

export default createStore({
	modules,
	getters: {
		// 设置全局获取参数的方法
		get: state => (...keys) => {
			let res = 'state';
			keys.forEach(key => {
				res += `['${key}']`;
			});
			try {
				res = eval(res);
				return toRaw(res);
			} catch (ex) {
				console.log(`调用store.getters.get()参数错误,无法获取值, 参数为:${JSON.stringify(keys)}; 错误信息:${ex}`);
				return null;
			}
		}
	},
	strict: debug,
	plugins
});
