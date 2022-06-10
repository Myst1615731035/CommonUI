import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../../views/System/Home/index.vue';
import Login from '../../../views/System/Home/Login.vue';

const routes = [
	{ path: '/login', component: Login, name: 'login', iconCls: 'fa-address-card', meta: { title: 'Sign In', notTab: true, notLayout: true } },
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: []
	}
];

const router = createRouter({ history: createWebHistory(), routes });

// router.beforeEach((to, from, next) => {
// 	document.title = `${to.meta.title} | vue-manage-system`;
// 	const role = localStorage.getItem('ms_username');
// 	if (!role && to.path !== '/login') {
// 		next('/login');
// 	} else if (to.meta.permission) {
// 		role === 'admin' ? next() : next('/403');
// 	} else {
// 		next();
// 	}
// });

export default router;
