export default {
	namespaced: true,
	state: () => ({
		login: '/api/Login/Token',
		user:{
			info:'/api/user/getInfoByToken',
			
		}
	}),
	getters: {},
	mutations: {},
	actions: {}
};
