<template>
	<div class="view-wrapper">
		<div class="form-wrapper">
			<div class="header">
				机动车检验
			</div>
			<div class="input-wrapper">
				<div class="border-wrapper">
					<input type="text" v-model="loginForm.UserName" name="username" placeholder="用户名" class="border-item">
				</div>
				<div class="border-wrapper">
					<input type="password" v-model="loginForm.Password" name="password" placeholder="用户密码" class="border-item">
				</div>
			</div>
			<div class="action">
				<div class="btn" @click="Login">
					<div v-loading="loginFlag" element-loading-background="rgba(0, 0, 0, 0.8)">
						<span>登录</span>
					</div>
				</div>
			</div>
			<div class="icon-wrapper">
				<i class="el-icon-setting"></i>
				<i class="el-icon-edit"></i>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			loginForm: {
				UserName: '',
				Password: '',
			},
			loginFlag: false,
		}
	},
	computed: {
		Api() {
			return this.$store.state.Config.Api
		},
	},
	methods: {
		async Login() {
			if (this.loginFlag) {
				return
			}
			this.loginFlag = true
			try {
				var ret = await this.$http.get(this.Api.Login, {
					params: this.loginForm,
				})
				if (ret.status === 200) {
					this.$store.commit('SetUser', ret.data.User)
					this.$store.commit('UpdateToken', ret.data.Token)
					this.$router.push('/home')
				}
			} catch (error) {}
			this.loginFlag = false
		},
	},
	mounted() {
		this.$eventHub.Register('Enter', this.$route.path, this.Login)
	},
}
</script>
<style scoped lang="scss">
.el-loading-mark {
	background-color: rgba(255, 255, 255, 0);
}
.view-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url('../assets/banner_bg.jpg');
	.form-cover {
		width: 40%;
	}
	.form-wrapper {
		width: 40%;
		color: #000;
		border-radius: 2px;
		padding: 50px;
		letter-spacing: 0.2em;
		z-index: 1;
		@media screen and (max-width: 768px) {
			width: 100%;
		}
		@media screen and (min-width: 1200px) {
			width: 30%;
		}
		&::before {
			content: '';
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			-webkit-filter: blur(10em);
			-moz-filter: blur(10em);
			-ms-filter: blur(10em);
			-o-filter: blur(10em);
			filter: blur(10em);
			position: absolute;
			z-index: -1;
			background: rgba(255, 255, 255, 0.5);
		}
		.header {
			text-align: center;
			font-size: 35px;
			text-transform: uppercase;
			line-height: 100px;
		}
		.input-wrapper {
			.border-wrapper {
				background-image: linear-gradient(to right, #e8198b, #0eb4dd);
				width: 100%;
				height: 50px;
				margin-bottom: 20px;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				.border-item {
					height: calc(100% - 6px);
					width: calc(100% - 6px);
					border-radius: 30px;
				}
			}
			input {
				background-color: rgb(41, 45, 62);
				border: 0;
				width: 100%;
				text-align: center;
				font-size: 15px;
				color: #fff;
				outline: none;
				&::placeholder {
					text-transform: uppercase;
				}
			}
		}
		.action {
			display: flex;
			justify-content: center;
			font-weight: bold;
			font-size: 1.6em;
			.btn {
				width: 60%;
				text-transform: uppercase;
				border: 2px solid rgba(41, 45, 62, 1);
				background-color: rgba(41, 45, 62, 0.2);
				text-align: center;
				line-height: 50px;
				border-radius: 30px;
				cursor: pointer;
				transition: 0.2s;
				overflow: hidden;
				&:hover {
					background-color: rgba(41, 45, 62, 0.7);
					color: rgba(0, 0, 255, 0.7);
				}
				&:visited {
					color: red;
				}
			}
		}
		.icon-wrapper {
			text-align: center;
			width: 60%;
			margin: 0 auto;
			margin-top: 20px;
			border-top: 1px dashed rgb(146, 146, 146);
			padding: 20px;
			i {
				margin: 0 1em;
				font-size: 1.5em;
				font-weight: bold;
				// background-color: rgba(41, 45, 62, 0.2);
				cursor: pointer;
				// border: 1px solid rgba(41, 45, 62, 0.7);
				transition: 0.2s;
				&:hover {
					color: rgba(0, 0, 255, 0.7);
				}
			}
		}
	}
}
</style>
