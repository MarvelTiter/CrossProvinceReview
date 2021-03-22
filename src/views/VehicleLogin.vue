<template>
	<div class="wrap">
		<el-card class="query-info">
			<el-row :gutter="10">
				<el-col :xs=24 :sm=7>
					<el-input placeholder="号牌号码" v-model="queryObject.Hphm">
						<template slot="prepend">号牌号码</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=7>
					<el-input placeholder="车架号（后四位）" v-model="queryObject.Vin">
						<template slot="prepend">车 架 号</template>
					</el-input>
				</el-col>
				<el-col :xs=20 :sm=7>
					<prepend-select v-model="queryObject.Hpzl">
						号牌种类
					</prepend-select>
				</el-col>
				<el-col :xs=4 :sm=3>
					<el-button icon="el-icon-search" type="primary"></el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="vehicle-info">
			状态
			<el-row :gutter="5">
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKC">
						<template slot="prepend">外廓长(单位:mm)</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKK">
						<template slot="prepend">外廓宽(单位:mm)</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKG">
						<template slot="prepend">外廓高(单位:mm)</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKG">
						<template slot="prepend">轮胎规格</template>
					</el-input>
				</el-col>
			</el-row>
			<el-row :gutter="5">
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKC">
						<template slot="prepend">驱动轴位</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKK">
						<template slot="prepend">轴数</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKG">
						<template slot="prepend">前轴数</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKG">
						<template slot="prepend">登记日期</template>
					</el-input>
				</el-col>
			</el-row>
			<el-row :gutter="5">
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKC">
						<template slot="prepend">总质量</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKK">
						<template slot="prepend">整备质量</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKG">
						<template slot="prepend">车辆品牌</template>
					</el-input>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<el-input v-model="LoginVehicle.WKG">
						<template slot="prepend">车辆型号</template>
					</el-input>
				</el-col>
			</el-row>
			<el-row :gutter="5">
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<prepend-select>
						车辆用途
					</prepend-select>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<prepend-select>
						用途属性
					</prepend-select>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<prepend-select>
						车辆类别
					</prepend-select>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<prepend-select>
						使用性质
					</prepend-select>
				</el-col>
			</el-row>
			<el-row :gutter="5">
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<!-- <div class="select">
						<div class="prepend">车辆类型</div>
						<el-select></el-select>
					</div> -->
					<prepend-select :data="responObject.GroupList" label="Display" value="Value" v-model="selectTest">
						车辆类型
					</prepend-select>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<prepend-select>
						检验类别
					</prepend-select>
				</el-col>
				<el-col :xs=24 :sm=12 :md=6 :lg=6 :xl=6>
					<prepend-select>
						检测线号
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
		return {
			queryObject: {
				Hphm: '',
				Vin: '',
				Hpzl: '',
			},
			responObject: {
				GroupList: [],
			},
			LoginVehicle: {},
			selectTest: '',
			selectTest2: '',
		}
	},
	components: {
		PrependSelect,
	},
	methods: {
		Test() {
			this.$message.success(this.selectTest)
		},
	},
	mounted() {
		var menulist = [
			{ Label: '登录', Icon: 'el-icon-s-order', Func: this.Test },
		]
		this.$store.commit('SetBottomMenu', menulist)
		//
		var g = this.$http.get('/options/groups')
		g.then(response => {
			this.responObject.GroupList = response.data.Options
		})
	},
}
</script>
<style scoped lang="scss">
.wrap /deep/ {
	.el-card {
		margin: 0.5em;
	}
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
		.el-input-group__prepend {
			min-width: 5em;
			text-align: right;
		}
		.prepend-select {
			.prepend {
				min-width: 5em;
			}
		}
	}
	.vehicle-info /deep/ {
		.el-input-group__prepend {
			min-width: 6em;
			text-align: right;
		}
		.prepend-select {
			.prepend {
				min-width: 6em;
			}
		}
		// .select {
		// 	display: inline-table;
		// 	border-collapse: separate;
		// 	border-spacing: 0;
		// 	line-height: normal;
		// 	width: 100%;
		// 	font-size: 14px;
		// 	.prepend {
		// 		background-color: #f5f7fa;
		// 		color: #909399;
		// 		min-width: 6em;
		// 		display: table-cell;
		// 		text-align: right;
		// 		position: relative;
		// 		border: 1px solid #dcdfe6;
		// 		border-radius: 4px;
		// 		padding: 0 20px;
		// 		white-space: nowrap;
		// 		border-top-right-radius: 0;
		// 		border-bottom-right-radius: 0;
		// 		border-right: none;
		// 		width: 1px;
		// 	}
		// 	.el-select {
		// 		width: 100%;
		// 		input {
		// 			border-top-left-radius: 0;
		// 			border-bottom-left-radius: 0;
		// 		}
		// 	}
		// }
	}
}
</style>
