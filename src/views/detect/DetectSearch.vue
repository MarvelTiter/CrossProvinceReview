<template>
	<div class="wrap">
		<el-card class="query-info">
			<el-row :gutter="10">
				<el-col :xs=24 :sm=7>
					<el-input placeholder="号牌号码" v-model="queryObject.Hphm">
						<template slot="prepend">号牌号码</template>
					</el-input>
				</el-col>
				<el-col :xs=20 :sm=7>
					<el-select placeholder="号牌种类" v-model="queryObject.Hpzl">

					</el-select>
				</el-col>
				<el-col :xs=4 :sm=3>
					<el-button icon="el-icon-search" type="primary"></el-button>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			queryObject: {
				Hphm: '',
				Hpzl: '',
			},
		}
	},
	computed: {},
	components: {},
	methods: {},
	mounted() {},
}
</script>
<style scoped lang="scss">
.wrap /deep/ {
	.el-col {
		margin: 0.2em 0;
	}
	.query-info /deep/ {
		.el-select {
			width: 100%;
		}
		.el-input-group__prepend {
			width: 60px;
		}
	}
	.vehicle-info /deep/ {
		.el-input-group__prepend {
			min-width: 6em;
			text-align: right;
		}
		.select {
			display: inline-table;
			border-collapse: separate;
			border-spacing: 0;
			line-height: normal;
			width: 100%;
			font-size: 14px;
			.prepend {
				background-color: #f5f7fa;
				color: #909399;
				min-width: 6em;
				display: table-cell;
				text-align: right;
				position: relative;
				border: 1px solid #dcdfe6;
				border-radius: 4px;
				padding: 0 20px;
				white-space: nowrap;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				border-right: none;
				width: 1px;
			}
			.el-select {
				width: 100%;
				input {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}
			}
		}
	}
}
</style>
