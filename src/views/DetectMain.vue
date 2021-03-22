<template>
	<div class="wrap">
		<el-tabs v-model="activeName" :tab-position="TabPosition" stretch type="border-card">
			<el-tab-pane label="待提交" name="first">
				<detect-list></detect-list>
			</el-tab-pane>
			<el-tab-pane label="已驳回" name="second">
				<r-t>
					<res-table-column prop="test" label="测试" :formatter="testFunc"></res-table-column>
					<res-table-column></res-table-column>
					<res-table-column></res-table-column>
				</r-t>
			</el-tab-pane>
			<el-tab-pane label="查询" name="third">
				<detect-search></detect-search>
			</el-tab-pane>
			<el-tab-pane label="签到" name="fourth">
				<d-a></d-a>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import DetectList from '../views/detect/DetectList.vue'
import DetectSearch from '../views/detect/DetectSearch.vue'
import DA from '../views/detect/DetectAppearance.vue'
import RT from '../components/ResponsiveTable copy.vue'
import ResTableColumn from '../components/ResTableColumn.vue'
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
	components: {
		DetectList,
		DetectSearch,
		DA,
		RT,
		ResTableColumn,
	},
	methods: {
		testFunc() {
			console.log('from test')
		},
	},
	mounted() {},
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
