export default {
	namespaced: true,
	state: () => ({
		token: null,
		tokenExpire: null,
		permissions: [],
	}),
	getters: {},
	mutations: {
		saveToken(state, data) {
			state.token = data;
			window.localStorage.setItem('Token', data);
		},
		saveTokenExpire(state, data) {
			state.tokenExpire = data;
			window.localStorage.setItem('TokenExpire', data);
		},
	},
	actions: {}
};
