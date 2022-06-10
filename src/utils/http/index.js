import axios from 'axios';
import $router from '../../structure/vue-plugins/router/router';
import $store from '../../structure/vue-plugins/store/store';
import { $XModal } from '../../plugins/vxe-table.js';
const loginInfo = $store.getters.get('loginInfo')

// 引入element-ui loading组件
const londing = ElLoading;

// 根据当前运行环境，判断api请求路径
let base = process.env.NODE_ENV == 'production' ? host : '';

axios.defaults.timeout = 400000;
let loadingInstance;
const loadingOption = { text: '正在处理中...', lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)', customClass: 'custom-loading' };
axios.interceptors.request.use(
	config => {
		if (config.loading) {
			loadingInstance = Loading.service(loadingOption);
		}
		var curTime = new Date();
		var expiretime = new Date(Date.parse(loginInfo.tokenExpire));
		if (loginInfo.token && (curTime < expiretime && loginInfo.tokenExpire)) {
			config.headers.Authorization = 'Bearer ' + loginInfo.token;
			config.headers.currentSite = window.localStorage.currentSite;
		}
		saveRefreshtime();
		return config;
	},
	err => {
		console.log(error)
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	response => {
		if (IsNotEmpty(loadingInstance)) {
			loadingInstance.close();
		}
		return response;
	},
	error => {
		console.log(error)
		if (IsNotEmpty(loadingInstance)) {
			loadingInstance.close();
		}

		let errInfo = { success: false, message: 'Error' };
		// 超时请求处理
		var originalRequest = error.config;
		if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
			errInfo.message = 'Request timed out！';
			originalRequest._retry = true;
		} else if (error.response) {
			switch (error.response.status) {
				case '401':
					var curTime = new Date();
					var refreshtime = new Date(Date.parse(window.localStorage.refreshtime));
					// 在用户操作的活跃期内
					if (window.localStorage.refreshtime && curTime <= refreshtime) {
						return refreshToken({ token: window.localStorage.Token }).then(res => {
							if (res.success) {
								$XModal.message({ content: 'refreshToken success! loading data...', status: 'success' });
								store.commit('saveToken', res.response.token);

								var curTime = new Date(),
									expiredate = new Date(curTime.setSeconds(curTime.getSeconds() + res.response.expires_in));
								store.commit('saveTokenExpire', expiredate);

								error.config.__isRetryRequest = true;
								error.config.headers.Authorization = 'Bearer ' + res.response.token;
								return axios(error.config);
							} else {
								// 刷新tokenFail 清除token信息并跳转到登录页面
								errInfo.message = 'The session has expired, please log in again';
								ToLogin();
							}
						});
					} else {
						// 返回 401，并且不知用户操作活跃期内 清除token信息并跳转到登录页面
						errInfo.message = 'The session has expired, please log in again';
						ToLogin();
					}
					break;
				case '403':
					// 403 无权限
					errInfo.message = 'Fail！No permission for this operation';
					break;
				case '404':
					// 404 不存在
					errInfo.message = 'Fail！Access interface does not exist';
					break;
				case '405':
					// 405 请求http方法错误
					errInfo.message = 'Fail！Request http method error';
					break;
				case '415':
					// 415 参数没有指定Body还是Query
					errInfo.message = 'Fail！The parameter does not specify Body or Query';
					break;
				case '429':
					// 429 ip限流
					errInfo.message = 'Too many refreshes, please rest and try again!';
					break;
				case '500':
					// 500 服务器异常
					errInfo.message = 'Fail！Server is busy';
					break;
				default:
					//其他错误参数
					errInfo.message = 'Fail！Request error:' + error.response.status;
					break;
			}
		} else {
			errInfo.message = 'Fail！Server disconnected';
		}
		$XModal.message({ content: errInfo.message, status: 'error' });
		return errInfo; // 返回接口返回的错误信息
	}
);

// 保存刷新时间
const saveRefreshtime = params => {
	let nowtime = new Date();
	let lastRefreshtime = window.localStorage.refreshtime ? new Date(window.localStorage.refreshtime) : new Date(-1);
	let expiretime = new Date(Date.parse(window.localStorage.TokenExpire));

	let refreshCount = 1; //滑动系数
	if (lastRefreshtime >= nowtime) {
		lastRefreshtime = nowtime > expiretime ? nowtime : expiretime;
		lastRefreshtime.setMinutes(lastRefreshtime.getMinutes() + refreshCount);
		window.localStorage.refreshtime = lastRefreshtime;
	} else {
		window.localStorage.refreshtime = new Date(-1);
	}
};


// 刷新Token
export const refreshToken = params => {
	return axios
		.get(`${base}/api/login/RefreshToken`, { params: params })
		.then(res => res.data)
		.catch(errAlert);
};

const errAlert = ex => {
	console.log(ex);
	$XModal.message({ content: 'Request Error!', status: 'error' });
	return;
};

export const BaseApiUrl = base;

// 登录过期,跳转/login
export const ToLogin = params => {
	router.replace({ path: '/login' });
	// if (global.IS_IDS4) {
	// 	applicationUserManager.login();
	// } else {
	// 	router.replace({ path: '/login' });
	// 	// router.replace({ path: '/login', query: { redirect: router.currentRoute.fullPath } });
	// }
};

//通用的请求方式
const getFile = url => {
	return axios
		.get(url, { responseType: 'blob' })
		.then(res => res.data)
		.catch(errAlert);
};

export const get = (url, params, config = null) => {
	if (config != null) {
		return axios
			.get(`${base}${url}`, { params }, config)
			.then(res => res.data)
			.catch(errAlert);
	} else {
		return axios
			.get(`${base}${url}`, { params })
			.then(res => res.data)
			.catch(errAlert);
	}
};

export const post = (url, params, configs = null) => {
	if (configs != null) {
		return axios
			.post(`${base}${url}`, params, configs)
			.then(res => res.data)
			.catch(errAlert);
	} else {
		return axios
			.post(`${base}${url}`, params)
			.then(res => res.data)
			.catch(errAlert);
	}
};

export const form = (url, params) => {
	return axios
		.post(`${base}${url}`, params, { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 30000 })
		.then(res => res.data)
		.catch(errAlert);
};

//通用的分页请求方式,分页请求也可以使用，返回的数据量在后台接口处控制
export const getPage = (url, params) => {
	return axios
		.get(`${base}${url}`, { params })
		.then(res => res.data.response)
		.catch(errAlert);
};

export const postPage = (url, params) => {
	return axios
		.post(`${base}${url}`, params)
		.then(res => res.data.response)
		.catch(errAlert);
};

export const installAxios = app => {
	app.config.globalProperties.baseUrl = BaseApiUrl;
	app.config.globalProperties.$get = get;
	app.config.globalProperties.$post = post;
	app.config.globalProperties.$getPage = getPage;
	app.config.globalProperties.$postPage = postPage;
	app.config.globalProperties.$form = form;
	app.config.globalProperties.$getFile = getFile;
};
