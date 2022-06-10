<template>
	<el-container>
		<el-header class="logo">
			<div v-if="layout.collapse">
				<i v-if="layout.logo.icon != ''" :class="layout.logo.icon"></i>
				{{ layout.logo.title }}
			</div>
			<div v-else>{{ layout.logo.subTitle }}</div>
		</el-header>
		<el-main style="overflow-y: auto;">
			<el-menu :unique-opened="true" :background-color="'#304156'" :text-color="'#fff'" :router="true">
				<sideMenu v-for="(nav, index) in navTree" :nav="nav" :key="index"></sideMenu></el-menu>
		</el-main>
	</el-container>
</template>

<script>
import sideMenu from './SideMenu.vue';
import { useStore } from 'vuex';

export default {
	name: 'sidebar',
	components: { sideMenu },
	setup(props, context) {
		const $store = useStore();
		const { layout } = $store.state;
		return {
			layout,
			navTree: [
				{ name: '首页', icon: 'fa fa-telegram', children: [] },
				{
					name: 'Menu1',
					icon: 'fa fa-telegram',
					children: [
						{ name: 'Menu1-1', icon: 'fa fa-telegram', children: [{ name: 'Menu1-1-1', icon: 'fa fa-telegram', children: [] }] },
						{ name: 'Menu1-2', icon: 'fa fa-telegram', children: [{ name: 'Menu1-2-1', icon: 'fa fa-telegram', children: [] }] }
					]
				},
				{
					name: 'Menu2',
					icon: 'fa fa-telegram',
					children: [
						{ name: 'Menu2-1', icon: 'fa fa-telegram', children: [{ name: 'Menu2-1-1', icon: 'fa fa-telegram', children: [] }] },
						{ name: 'Menu2-2', icon: 'fa fa-telegram', children: [{ name: 'Menu2-2-1', icon: 'fa fa-telegram', children: [] }] }
					]
				},
				{ name: '测试', icon: '', children: [] },
			]
		};
	}
};
</script>

<style>
.logo {
	height: 3.125rem;
	line-height: 3.125rem;
}
</style>
