<template>
	<div class="wrap">
		<el-card>
			<el-row :gutter="10">
				<!-- <el-col :xs="7" :sm="7" :md="6" :lg="4">
					<el-select v-model="queryObject.StnId" clearable filterable placeholder="检测机构">
						<el-option v-for="item in responObject.StnList" :key="item.Value" :label="item.Display" :value="item.Value">
						</el-option>
					</el-select>
				</el-col> -->
				<el-col :xs="7" :sm="7" :md="6" :lg="4">
					<el-input placeholder="关键字搜索"></el-input>
				</el-col>
				<el-col :xs="3" :sm="3" :md="6" :lg="12">
					<el-button type="primary" icon="el-icon-search">
					</el-button>
					<el-button type="primary" icon="el-icon-plus" class="hidden-sm-and-down">
					</el-button>
					<el-button type="primary" class="hidden-md-and-down">删除
					</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card style="margin-top:10px;">
			<el-table :data="PhotoList">
				<el-table-column label="照片名称" prop="USR_ID"></el-table-column>
				<el-table-column label="照片种类" prop="USR_NAME"></el-table-column>
				<el-table-column label="照片说明" prop="USR_IDENTITY"></el-table-column>
			</el-table>
			<el-pagination :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, next, jumper"></el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			PhotoList: [],
		}
	},
	computed: {},
	components: {},
	methods: {},
	mounted() {},
}
</script>
<style scoped lang="scss">
</style>
