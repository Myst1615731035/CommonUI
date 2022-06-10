<template>
	<div>
		<el-sub-menu v-if="nav.children && nav.children.length > 0" :index="nav.name">
			<template #title>
				<!-- <i v-if="!!nav.icon" class="fa" :class="nav.icon"></i> -->
				<span>{{ nav.name }}</span>
			</template>
			<sidemenu v-for="(item, index) in nav.children" :nav="item" :key="index"></sidemenu>
		</el-sub-menu>
		<el-menu-item v-else :index="nav.name">
			<template #title>
				<!-- <i v-if="nav.icon" class="fa" :class="nav.icon"></i> -->
				<span>{{ nav.name }}</span>
			</template>
		</el-menu-item>
	</div>
</template>

<script>
export default {
	name: 'sidemenu',
	props: { nav: { type: Object, require: true } },
	setup(props, context) {
		return {};
	}
};
</script>

<style>
i.fa {
	width: 1rem;
	height: 1rem;
	margin-right: 0.25rem;
}
</style>
