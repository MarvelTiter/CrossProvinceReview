<template>
	<div class="wrap">
		<el-card>
			<el-row :gutter="5">
				<el-col>
					<el-input>
						<template slot="prepend">作业列表显示数量</template>
					</el-input>
				</el-col>
				<el-col>
					<el-input>
						<template slot="prepend">查验列表显示数量</template>
					</el-input>
				</el-col>
				<el-col>
					<el-input>
						<template slot="prepend">车牌前缀</template>
					</el-input>
				</el-col>
				<el-col>
					<prepend-select>
						号牌种类
					</prepend-select>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
import PrependSelect from '../components/PrependSelect.vue'
export default {
	data() {
		return {}
	},
	methods: {
		Test() {
			this.$message.success('Save')
		},
	},
	components: {
		PrependSelect,
	},
	mounted() {
		var menulist = [
			{ Label: '保存', Icon: 'el-icon-document', Func: this.Test },
		]
		this.$store.commit('SetBottomMenu', menulist)
	},
}
</script>
<style scoped lang="scss">
.wrap {
	.el-card {
		margin: 0.5em;
	}
	.el-col {
		margin: 0.2em 0;
	}
}
</style>
