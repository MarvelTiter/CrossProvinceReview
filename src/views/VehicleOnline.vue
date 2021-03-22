<template>
	<div class="wrap">
		<el-tabs v-model="activeName" :tab-position="TabPosition" stretch type="border-card">
			<el-tab-pane label="待检队列" name="first">
				<detect-list></detect-list>
			</el-tab-pane>
			<el-tab-pane label="在线队列" name="second">
				<detect-list></detect-list>
			</el-tab-pane>
			<el-tab-pane label="查询队列" name="third">
				<detect-list></detect-list>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeName: 'first',
		}
	},
	computed: {
		TabPosition() {
			return this.$store.state.TabPosition
		},
	},
	methods: {
		Test() {
			this.$message.success('车辆上线')
		},
	},
	mounted() {
		var menulist = [
			{ Label: '查询', Icon: 'el-icon-search', Func: this.Test },
			{ Label: '刷新', Icon: 'el-icon-refresh', Func: this.Test },
		]
		this.$store.commit('SetBottomMenu', menulist)
	},
}
</script>
<style scoped lang="scss">
.wrap {
	height: 100%;
	.el-tabs {
		box-sizing: border-box;
		height: 100%;
	}
}
</style>
