<template>
	<el-container>
		<el-header class="theme top-header">
			<i class="fa fa-bars"></i>
			Header
			</el-header>
		<el-main class="tabNav">
			<ul>
				<li v-for="tag in tags" :key="tag.name" class="tag">
					<el-tag :closable="tag.closable" :type="tag.type">{{ tag.name }}</el-tag>
				</li>
			</ul>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'topbar',
	setup(props, context) {
		let tags = [
			{ name: '首页', type: 'success', closable: false },
			{ name: 'Tag 2', type: '', closable: true },
			{ name: 'Tag 3', type: '', closable: true },
			{ name: 'Tag 4', type: '', closable: true },
			{ name: 'Tag 5', type: '', closable: true }
		];
		return {
			tags
		};
	}
};
</script>

<style>
.el-header {
	padding: 0;
}
.top-header {
	height: 3.125rem;
	line-height: 3.125rem;
	text-align: left;
}
.tabNav {
	height: 1.875rem;
	background-color: azure;
}
.tabNav ul {
	padding: 0.1875rem;
	text-align: left;
	height: 100%;
}
li.tag {
	display: inline-block;
	margin: 0 0.25rem;
}
</style>
