<template>
	<div class="mainPageContainer">
		<el-container>
			<el-header>
				<div class="container_header_left">
					<img src="../assets/logo.png" />
					<span>
						{{ Title }}
					</span>
				</div>
				<div class="container_header_right">
					<el-button class="shutdown-button" @click="Exit" icon="el-icon-switch-button" />
				</div>
			</el-header>
			<el-container class="main-container">
				<el-main class="main" ref="mainWindow">
					<router-view></router-view>
				</el-main>
				<BottomNav />
				<el-backtop target=".el-main" style="bottom:80px;"> </el-backtop>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import BottomNav from '../components/BottomNavigation.vue'
export default {
	data() {
		return {}
	},
	components: {
		BottomNav,
	},
	computed: {
		Title() {
			return this.$store.state.HeaderTitle
		},
	},
	methods: {
		Exit() {
			this.$store.commit('UpdateToken', '')
			this.$router.push('/login')
		},
	},
	mounted() {
		if (window.innerWidth > 1200) {
			this.$store.commit('SetTabPosition', 'left')
		} else {
			this.$store.commit('SetTabPosition', 'top')
		}
		window.addEventListener('resize', () => {
			if (window.innerWidth > 1200) {
				this.$store.commit('SetTabPosition', 'left')
			} else {
				this.$store.commit('SetTabPosition', 'top')
			}
		})
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/base.scss';
.mainPageContainer {
	width: 100%;
	height: 100%;
	display: flex;
	.main-container {
		height: calc(100% - 60px);
		flex-direction: column;
		.main {
			height: 100%;
			width: 100%;
			overflow-y: auto;
			padding: 0; //0.5em;
		}
	}
}

.el-header {
	display: -webkit-flex;
	display: flex;
	align-items: center;
	background-color: rgb(41, 45, 62);
	.container_header_left {
		display: -webkit-flex;
		display: flex;
		justify-content: flex-start;
		span {
			display: inline-block;
			line-height: 60px;
			color: #fff;
			// @media screen and (max-width: 510px) {
			// 	display: none;
			// }
		}
		img {
			width: 40px;
			height: 40px;
			padding: 10px;
		}
	}
	.container_header_right {
		flex: 1;
		display: -webkit-flex;
		display: flex;
		justify-content: flex-end;
		.shutdown-button {
			border: none;
			background-color: #fff;
			color: #fff;
			background: transparent;
			font-size: 1.5em;
			&:hover {
				color: rgba(37, 162, 219, 1);
			}
		}
	}
}

.el-footer {
	background-color: rgb(41, 45, 62);
	height: 60px;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	.bottom-nav-button {
		border: none;
		background: transparent;
		color: #fff;
		flex: 1;
		font-size: 1.5em;
		&:hover {
			color: rgba(37, 162, 219, 1);
		}
	}
	.nav {
		flex: 0;
	}
}
</style>
