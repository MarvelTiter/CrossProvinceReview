<template>
	<div class="setting">
		<el-tabs v-model="activeName" @tab-click="tabClick">
			<el-tab-pane label="照片设置" name="photosetting" lazy>
				<photo-setting></photo-setting>
			</el-tab-pane>
            <el-tab-pane label="其他" lazy>待处理</el-tab-pane>
		</el-tabs>
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
import PhotoSetting from '../views/PhotoSetting'
export default {
	data() {
		return {
			activeName: 'photosetting',
		}
	},
	computed: {},
	components: {
		PhotoSetting,
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
