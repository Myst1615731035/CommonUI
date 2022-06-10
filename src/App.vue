<template>
	<div class="container">
		<el-container v-if="route.meta.notLayout">
			<el-main><router-view></router-view></el-main>
		</el-container>
		<el-container v-else>
			<el-aside class="theme sidebar"><sidebar class="sidebar"></sidebar></el-aside>
			<el-main><container class="container"></container></el-main>
		</el-container>
	</div>
</template>

<script>
import sidebar from './structure/components/SideBar.vue';
import container from './structure/components/Container.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
	components: { sidebar, container },
	setup(props, context) {
		const route = useRoute();
		return {
			route
		};
	}
};
</script>

<style>
* {
	box-sizing: border-box;
	padding: 0%;
	margin: 0;
}
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
	background-color: #ffffff;
}
::-webkit-scrollbar-thumb {
	background-color: #c1c1c1;
	border-radius: 4px;
}
html,
body,
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
}
.sidebar {
	width: 12.5rem;
	height: 100%;
}
.container {
	height: 100%;
}
.el-main {
	padding: 0;
	overflow: hidden;
}
.el-container {
	height: 100%;
	width: 100%;
}
.theme {
	color: rgb(255, 255, 255);
	background-color: rgb(48, 65, 86);
}
</style>
