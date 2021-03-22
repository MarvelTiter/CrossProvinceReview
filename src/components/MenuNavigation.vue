<template>
	<div class="wrap">
		<el-drawer :with-header="false" :visible.sync="Show" direction="ltr" size="200px" @close="Close">
			<!-- <div class="MenuIcon">
				<i :class="{
					'el-icon-s-unfold': MenuCollapse,
					'el-icon-s-fold': !MenuCollapse
				}" @click.stop="Collapse"></i>
			</div> -->
			<el-menu :default-active="activePath" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router :collapse-transition="false" unique-opened>

				<el-menu-item index="/detect">
					<template slot="title">
						<i class="el-icon-s-grid"></i>
						<span>车辆列表</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/vehiclelogin">
					<template slot="title">
						<i class="el-icon-s-order"></i>
						<span>车辆登录</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/vehicleonline">
					<template slot="title">
						<i class="el-icon-finished"></i>
						<span>车辆上线</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/setting">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span>系统设置</span>
					</template>
				</el-menu-item>
			</el-menu>
		</el-drawer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// MenuCollapse: false,
			Show: this.visiable,
		}
	},
	model: {
		prop: 'visiable',
		event: 'click',
	},
	watch: {
		visiable() {
			this.Show = this.visiable
		},
	},
	props: {
		visiable: {
			type: Boolean,
			default: function() {
				return true
			},
		},
	},
	computed: {
		activePath() {
			return this.$store.state.activePath
		},
	},
	methods: {
		Close() {
			this.$emit('click', false)
		},
	},
	mounted() {},
}
</script>
<style scoped lang="scss">
.wrap /deep/ {
	.el-drawer {
		background-color: #545c64;
		&:focus {
			outline: none;
		}
		.el-menu {
			border-right: none;
		}
	}
}
</style>
