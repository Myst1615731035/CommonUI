export default {
	namespaced: true,
	state: () => ({
		logo: { icon: 'fa fa-sitemap', title: '内容管理系统', subTitle: 'CMS' },
		tagsList: [],
		collapse: true
	}),
	getters: {},
	mutations: {
		saveTagsData(state, data) {
			state.tagsStoreList = data;
			sessionStorage.setItem('Tags', data);
		},
	},
	actions: {}
};
