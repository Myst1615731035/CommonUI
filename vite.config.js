import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	let configs = {
		plugins: [vue(), AutoImport({ resolvers: [ElementPlusResolver()] }), Components({ resolvers: [ElementPlusResolver()] })],
		// 添加此项，在组件内才可使用process.env.NODE_ENV
		define: { 'process.env': {} }
	};
	switch (command) {
		case 'build':
			// 生产环境
			break;
		default:
			// 开发环境
			configs = Object.assign(configs, {
				server: {
					host: '127.0.0.1',
					port: 9000,
					strictPort: true,
					https: false,
					open: true,
					proxy: {
						'/api': {
							target: 'http://localhost:6100',
							ws: true,
							changeOrigin: true,
							// rewrite: {},
							// rewrite: (path) => path.replace(/^\/fallback/, '')
						},
						'/is4api': { target: 'http://127.0.0.1:9090', ws: true, changeOrigin: true }
					}
				}
			});
			break;
	}
	return configs;
});
