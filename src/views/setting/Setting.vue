<template>
	<div class="setting">
		<el-tabs v-model="activeName" @tab-click="tabClick">
			<el-tab-pane label="业务照片设置" name="photosetting" lazy>
				<PhotoMapperSetting></PhotoMapperSetting>
			</el-tab-pane>
			<el-tab-pane label="照片定义设置">
				<PhotoDefinitionSetting></PhotoDefinitionSetting>
			</el-tab-pane>
			<el-tab-pane label="驳回设置" lazy>
				<reject-setting></reject-setting>
			</el-tab-pane>
			<el-tab-pane label="用户组设置" lazy>
				<h1>用户组设置</h1>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import PhotoMapperSetting from '../setting/PhotoMapperSetting'
import PhotoDefinitionSetting from '../setting/PhotoDefinitionSetting'
import RejectSetting from '../setting/RejectSetting'
export default {
	data() {
		return {
			activeName: 'photosetting',
		}
	},
	computed: {},
	components: {
		PhotoMapperSetting,
		RejectSetting,
		PhotoDefinitionSetting,
	},
	methods: {
		tabClick(e) {
			if (e.loaded) {
				return
			}

			// this.$router.push(e.name)
		},
	},
	async mounted() {},
}
</script>
<style scoped lang="scss">
.setting {
	height: 100%;
	.el-tabs /deep/ {
		height: 100%;
	}
}
</style>
