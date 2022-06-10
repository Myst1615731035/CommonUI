<template>
	<div class="container wrapper">
		<ul class="bg-bubbles">
			<li v-for="n in 10" :key="n + 'n'"></li>
			<ol v-for="m in 5" :key="m + 'm'"></ol>
		</ul>
		<div class="bg bg-blur" style="display: none;"></div>
		<div style="height: 10%;"></div>
		<el-form ref="form" :model="data" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
			<h3 class="title">Welcome</h3>
			<el-form-item prop="account"><el-input type="text" v-model="data.account" auto-complete="off" placeholder="Account"></el-input></el-form-item>
			<el-form-item prop="pass"><el-input v-model="data.pass" auto-complete="off" show-password placeholder="Password"></el-input></el-form-item>
			<el-form-item style="width:100%;">
				<el-button type="primary" style="width:100%;" @click.native.prevent="submit" @keydown.enter="submit" :loading="logining">{{ loginStr }}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { h, toRaw } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
	created() {
		const self = this;
		document.onkeydown = function(e) {
			let key = window.event.keyCode;
			if (key === 13) {
				self.submit();
			}
		};
	},
	data() {
		return {
			logining: false,
			loginStr: '登录',
			data: { account: 'admin', pass: '123456' },
			rules: {
				account: [{ required: true, message: 'Please enter account', trigger: 'blur' }],
				pass: [{ required: true, message: 'Please enter password', trigger: 'blur' }]
			}
		};
	},
	methods: {
		async submit() {
			const valid = await this.$refs.form.validate(valid => valid);
			if (valid) {
				this.logining = true;
				this.loginStr = '登录...';

				this.$get(this.$store.state.serverApi.login, toRaw(this.data))
					.then(res => {
						if (res.success) {
							this.logining = false;
							this.loginStr = '登录成功';
							this.$Notic({ title: 'Success', message: h('i', { style: 'color: teal' }, 'Welcome'), type: 'success', duration: 5000 });
							//登录成功
							var curTime = new Date();
							//提交数据仓库
							this.$store.commit('loginInfo/saveToken', res.response.token);
							this.$store.commit('loginInfo/saveTokenExpire', new Date(curTime.setSeconds(curTime.getSeconds() + res.response.expires_in)));
							this.getUserInfo();
						} else {
							this.reset();
							this.$XModal.message({ content: res.message, state: 'error' });
						}
					})
					.catch(ex => {
						this.reset();
					});
			} else {
				this.reset();
			}
		},
		reset() {
			this.logining = false;
			this.loginStr = '登录';
		},
		getUserInfo() {
			this.$get(this.$store.state.serverApi.user.info, { token: this.$store.state.loginInfo.token }).then(res => {
				console.log(res)
			});
		}
	}
};
</script>

<style>
.bg {
	margin: 0px;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: url(../../assets/loginbck.png) no-repeat top left;
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 100%;
}

.login-container {
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin: auto;
	width: 350px;
	padding: 35px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
	z-index: 9999;
	position: relative;
}

.login-container .title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}

.login-container .remember {
	float: right;
	margin: 0px 0px 25px 0px;
}

.wrapper {
	background: #50a3a2;
	background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
	background: linear-gradient(to bottom right, #127c7b 0, #50a3a2);
	opacity: 0.8;
	position: absolute;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.wrapper.form-success .containerLogin h1 {
	-webkit-transform: translateY(85px);
	-ms-transform: translateY(85px);
	transform: translateY(85px);
}

.containerLogin {
	max-width: 600px;
	margin: 0 auto;
	padding: 80px 0;
	height: 400px;
	text-align: center;
}

.containerLogin h1 {
	font-size: 40px;
	-webkit-transition-duration: 1s;
	transition-duration: 1s;
	-webkit-transition-timing-function: ease-in-put;
	transition-timing-function: ease-in-put;
	font-weight: 200;
}
.bg-bubbles {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
}
.bg-bubbles li,
.bg-bubbles ol {
	position: absolute;
	list-style: none;
	display: block;
	width: 40px;
	height: 40px;
	background-color: rgba(255, 255, 255, 0.15);
	bottom: -160px;
	-webkit-animation: square 25s infinite;
	animation: square 25s infinite;
	-webkit-transition-timing-function: linear;
	transition-timing-function: linear;
}

ol {
	padding: 0 !important;
}

.bg-bubbles ol:nth-child(11) {
	left: 10%;
	top: 10%;
	width: 20px;
	height: 20px;
}

.bg-bubbles ol:nth-child(12) {
	left: 20%;
	top: 40%;

	width: 60px;
	height: 60px;
}

.bg-bubbles ol:nth-child(13) {
	left: 65%;
	top: 30%;

	width: 100px;
	height: 60px;
}

.bg-bubbles ol:nth-child(14) {
	left: 70%;
	top: 30%;
	width: 100px;
	height: 150px;
}

.bg-bubbles ol:nth-child(15) {
	left: 50%;
	top: 70%;

	width: 40px;
	height: 60px;
}

.bg-bubbles li:nth-child(1) {
	left: 10%;
}

.bg-bubbles li:nth-child(2) {
	left: 20%;
	width: 80px;
	height: 80px;
	-webkit-animation-delay: 2s;
	animation-delay: 2s;
	-webkit-animation-duration: 17s;
	animation-duration: 17s;
}

.bg-bubbles li:nth-child(3) {
	left: 25%;
	-webkit-animation-delay: 4s;
	animation-delay: 4s;
}

.bg-bubbles li:nth-child(4) {
	left: 40%;
	width: 60px;
	height: 60px;
	-webkit-animation-duration: 22s;
	animation-duration: 22s;
	background-color: rgba(255, 255, 255, 0.25);
}

.bg-bubbles li:nth-child(5) {
	left: 70%;
}

.bg-bubbles li:nth-child(6) {
	left: 80%;
	width: 120px;
	height: 120px;
	-webkit-animation-delay: 3s;
	animation-delay: 3s;
	background-color: rgba(255, 255, 255, 0.2);
}

.bg-bubbles li:nth-child(7) {
	left: 32%;
	width: 160px;
	height: 160px;
	-webkit-animation-delay: 7s;
	animation-delay: 7s;
}

.bg-bubbles li:nth-child(8) {
	left: 55%;
	width: 20px;
	height: 20px;
	-webkit-animation-delay: 15s;
	animation-delay: 15s;
	-webkit-animation-duration: 40s;
	animation-duration: 40s;
}

.bg-bubbles li:nth-child(9) {
	left: 25%;
	width: 10px;
	height: 10px;
	-webkit-animation-delay: 2s;
	animation-delay: 2s;
	-webkit-animation-duration: 40s;
	animation-duration: 40s;
	background-color: rgba(255, 255, 255, 0.3);
}

.bg-bubbles li:nth-child(10) {
	left: 90%;
	width: 160px;
	height: 160px;
	-webkit-animation-delay: 11s;
	animation-delay: 11s;
}
@-webkit-keyframes square {
	0% {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}

	100% {
		-webkit-transform: translateY(-700px) rotate(600deg);
		transform: translateY(-700px) rotate(600deg);
	}
}

@keyframes square {
	0% {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}

	100% {
		-webkit-transform: translateY(-700px) rotate(600deg);
		transform: translateY(-700px) rotate(600deg);
	}
}
</style>
