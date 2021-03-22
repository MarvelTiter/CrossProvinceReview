<template>
	<div class="wrap">
		<TheNav v-model="Visiable" />
		<el-button icon="el-icon-back" v-show="ShowBack" @click.stop="Back" class="nav-back" />
		<el-button v-for="(menu,i) in MenuList" :key="i" class="bottom-nav-button nav-route" :icon="menu.Icon" @click.stop="clickHandler(menu)">
			{{ menu.Label }}
		</el-button>
		<el-button class="meun-button" icon="el-icon-menu" @click.stop="MenuCollapse" />
	</div>
</template>

<script>
import TheNav from '../components/MenuNavigation.vue'
export default {
	data() {
		return {
			Visiable: false,
		}
	},
	components: {
		TheNav,
	},
	computed: {
		MenuList() {
			return this.$store.state.MenuList
		},
		ShowBack() {
			return this.$store.state.ShowBack
		},
	},
	methods: {
		Back() {
			this.$router.back(-1)
		},
		MenuCollapse() {
			this.Visiable = !this.Visiable
		},
		clickHandler(m) {
			if (m.path) {
				this.$router.push(m.path)
			} else if (m.Func) {
				m.Func()
			}
		},
	},
	mounted() {},
}
</script>
<style scoped lang="scss">
.wrap /deep/ {
	background-color: rgb(41, 45, 62);
	height: 60px;
	display: -webkit-flex;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	-ms-flex-negative: 0;
	flex-shrink: 0;
	.bottom-nav-button {
		border: none;
		background: transparent;
		color: #fff;
		font-size: 1em;
	}
	.nav-back {
		border: none;
		background: transparent;
		color: #fff;
		font-size: 1.5em;
	}
	.meun-button {
		border: none;
		background-color: #fff;
		color: #fff;
		background: transparent;
		font-size: 1.5em;
	}
	.nav-route {
		flex: 1;
		@media screen and (min-width: 768px) {
			flex: 0;
		}
	}
}
</style>
