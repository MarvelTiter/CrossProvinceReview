<template>
	<div class="wrap">
		<el-card class="query">
			<template v-slot:header>
				<h3>
					<i class="el-icon-search" style="color:#409eff"></i>&nbsp;
					<span>流水查询</span>
				</h3>
			</template>
			<table>
				<tr>
					<td class="query_left"><label>开始时间</label></td>
					<td class="query_right">
						<el-date-picker v-model="queryObject.KSSJ"></el-date-picker>
					</td>
					<td class="query_left"><label>流水号</label></td>
					<td class="query_right">
						<el-input v-model="queryObject.JYLSH"></el-input>
					</td>
					<td class="query_left"><label>检验类别</label></td>
					<td class="query_right">
						<el-select filterable v-model="queryObject.JYLB"></el-select>
					</td>
					<td class="query_left"><label>流水状态</label></td>
					<td class="query_right">
						<el-select filterable v-model="queryObject.LSZT"></el-select>
					</td>
				</tr>
				<tr>
					<td class="query_left"><label>结束时间</label></td>
					<td class="query_right">
						<el-date-picker v-model="queryObject.JSSJ"></el-date-picker>
					</td>
					<td class="query_left"><label>号牌种类</label></td>
					<td class="query_right">
						<el-select filterable v-model="queryObject.HPZL"></el-select>
					</td>
					<td class="query_left"><label>号牌号码</label></td>
					<td class="query_right">
						<el-input v-model="queryObject.HPHM">
							<template v-slot:prepend>
								<el-select style="width:70px" size="mini" v-model="PrePlate"></el-select>
							</template>
						</el-input>
					</td>
					<td class="query_left"><label>车架号</label></td>
					<td class="query_right">
						<el-input v-model="queryObject.CLSBDH"></el-input>
					</td>
				</tr>
				<tr>
					<td colspan="8" style="text-align:right">
						<el-button type="primary" @click="Query">查询(Enter)</el-button>
					</td>
				</tr>
			</table>
		</el-card>
		<el-card style="margin-top:10px;">
			<template v-slot:header>
				<h3>
					<i class="el-icon-s-order" style="color:#409eff"></i>&nbsp;
					<span>车辆检验流水列表</span>
				</h3>
			</template>
			<el-table :data="resValue.JobList" @row-dblclick="RowClick">
				<el-table-column label="作业ID" prop="JOB_ID"></el-table-column>
				<el-table-column label="检验流水号" prop="JOB_SN"></el-table-column>
				<el-table-column label="机构名称" prop="STN_ID"></el-table-column>
				<el-table-column label="检验类别" prop="BNS_ID"></el-table-column>
				<el-table-column label="号牌号码" prop="JOB_PLATE"></el-table-column>
				<el-table-column label="号牌种类" prop="JOB_PCLASS"></el-table-column>
				<el-table-column label="车辆识别代号" prop="CLSBDH"></el-table-column>
				<el-table-column label="作业时间" prop="JOB_DATE"></el-table-column>
				<el-table-column label="流水状态" prop="JOB_STATE"></el-table-column>
			</el-table>
			<el-pagination :page-size="queryObject.PageSize" :total="resValue.TotalCount" @current-change="PageIndexChange" :current-page="queryObject.PageIndex" layout="total, prev, next, jumper"></el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'InfoCollect',
	data() {
		return {
			queryObject: {
				PageIndex: 1,
				PageSize: 10,
				HPHM: '',
				HPZL: '',
				KSSJ: new Date(),
				JSSJ: new Date(),
				JYLSH: '',
				JYLB: '',
				CLSBDH: '',
				LSZT: '',
			},
			resValue: {
				TotalCount: 0,
				JobList: [],
			},
			PrePlate: '粤',
		}
	},
	computed: {
		Message() {
			return ''
		},
		FZJG() {
			return this.$store.state.Config.BasicInfo['FZJG']
		},
		Api() {
			return this.$store.state.Config.Api
		},
	},
	components: {},
	methods: {
		async Query() {
			var ret = await this.$http.get(this.Api.JobList, {
				params: this.queryObject,
			})
			if (ret.data.status === 'Success') {
				this.resValue.JobList = ret.data.value.DataList
				this.resValue.TotalCount = ret.data.value.TotalCount
			}
		},
		RowClick(row, col, e) {
			this.$store.commit('SetJob', row)
			this.$router.push('/review')
		},
		PageIndexChange(index) {
			this.queryObject.PageIndex = index
			this.Query()
		},
	},
	mounted() {
		// console.log(EventHub)
		this.$eventHub.Register('Enter', this.$route.path, this.Query)
	},
	beforeRouteLeave(to, from, next) {
		// this.$store.commit('AddCache','home')
		next()
	},
}
</script>
<style scoped lang="scss">
.wrap {
	.query {
		.el-input /deep/ {
			width: 180px;
		}
		.el-select /deep/ {
			width: 180px;
		}
		.el-button /deep/ {
			margin-left: 10px;
		}
		.query_left {
			text-align: right;
			padding: 0 10px;
		}
	}
}
</style>
