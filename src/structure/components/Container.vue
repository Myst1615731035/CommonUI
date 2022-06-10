<template>
	<el-container>
		<el-header class="topbar"><topbar></topbar></el-header>
		<el-main><router-view class="main"></router-view></el-main>
	</el-container>
</template>

<script>
import topbar from './TopBar.vue';
export default {
	name: 'container',
	components: { topbar }
};
</script>

<style>
.topbar {
	height: 5rem;
}
.main {
	height: 100%;
}
</style>
