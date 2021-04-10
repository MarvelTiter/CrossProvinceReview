<template>
	<div>
		<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb> -->
		<el-card>
			<el-row :gutter="10">
				<el-col :xs="7" :sm="7" :md="6" :lg="4">
					<el-select v-model="queryObject.StnId" clearable filterable placeholder="检测机构">
						<el-option v-for="item in responObject.StnList" :key="item.Value" :label="item.Display" :value="item.Value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :xs="7" :sm="7" :md="6" :lg="4">
					<el-input placeholder="搜索用户名" v-model="queryObject.UserName"></el-input>
				</el-col>
				<el-col :xs="7" :sm="7" :md="6" :lg="4">
					<el-select v-model="queryObject.Enabled" clearable placeholder="是否启用">
						<el-option value="1" label="是"></el-option>
						<el-option value="0" label="否"></el-option>
					</el-select>
				</el-col>
				<el-col :xs="3" :sm="3" :md="6" :lg="12">
					<el-button type="primary" icon="el-icon-search" @click="Search">
					</el-button>
					<el-button type="primary" @click.stop="Add" icon="el-icon-plus" class="hidden-sm-and-down">
					</el-button>
					<el-button type="primary" @click.stop="Extend(0)" class="hidden-md-and-down">延长有效期
					</el-button>
					<el-button type="primary" @click="Reset(0)" class="hidden-md-and-down">重置密码
					</el-button>
					<el-button type="primary" @click="Delete(0)" class="hidden-md-and-down">删除
					</el-button>
				</el-col>
			</el-row>
			<!-- <ResponsiveTable :columns="[
					{
						Label: '用户账号',
						Prop: 'USR_ID',
						ResponsiveClass: ''
					},
					{
						Label: '用户名称',
						Prop: 'USR_NAME',
						ResponsiveClass: ''
					},
					{
						Label: '身份证号',
						Prop: 'USR_IDENTITY',
						ResponsiveClass: 'hidden-sm-only'
					},
					{
						Label: '是否启用',
						Prop: 'USR_ENABLE',
						ResponsiveClass: '',
						Formatter: function(v) {
							if (v === 1) {
								return '是'
							} else {
								return '否'
							}
						}
					},
					{
						Label: '检测站',
						Prop: 'STN_ID',
						ResponsiveClass: 'hidden-sm-only'
					},
				]" :data="responObject.UserList" :checkbox="true" @rowclick="Edit" :selection-change="TableSelectionChange" text-align="center">
			</ResponsiveTable> -->
		</el-card>
		<el-card style="margin-top:10px;">
			<el-pagination @size-change="PageSizeChange" @current-change="PageIndexChange" :current-page="queryObject.PageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="queryObject.PageSize" layout="total, sizes, prev, next, jumper" :total="responObject.TotalCount"></el-pagination>

		</el-card>
		<el-dialog :title="formTitle" :width="WinSize.Width" :visible="UserFormVisiable" :show-close="false" :fullscreen="WinSize.FullScreen">
			<el-form :model="currentUser" ref="UserForm" label-width="100px">
				<el-row>
					<el-col :xs="24" :span="12">
						<el-form-item label="账户">
							<el-input v-model="currentUser.USR_ID" autocomplete="off" :disabled="EditMode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :span="12">
						<el-form-item label="姓名">
							<el-input v-model="currentUser.USR_NAME"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="24" :span="12">
						<el-form-item label="密码">
							<el-input type="password" v-model="currentUser.USR_PASS" autocomplete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :span="12">
						<el-form-item label="身份证号">
							<el-input v-model="currentUser.USR_IDENTITY"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="24" :span="12">
						<el-form-item label="确认密码">
							<el-input type="password" v-model="currentUser.USR_PASS_Confirm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :span="12">
						<el-form-item label="用户组">
							<el-select v-model="currentUser.GRP_ID" placeholder="请选择">
								<el-option v-for="item in responObject.GroupList" :key="item.Value" :label="item.Display" :value="item.Value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="24" :span="12">
						<el-form-item label="是否启用">
							<el-radio-group v-model="currentUser.USR_ENABLE">
								<el-radio-button label="1">是</el-radio-button>
								<el-radio-button label="0">否</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :span="12">
						<el-form-item label="检测站">
							<el-select v-model="currentUser.STN_ID" filterable placeholder="请选择">
								<el-option v-for="item in responObject.StnList" :key="item.Value" :label="item.Display" :value="item.Value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="24" :span="12">
						<el-form-item label="密码有效期">
							<el-date-picker type="date" style="width:100%;" placeholder="选择日期" @focus="clearFocus" v-model="currentUser.PSW_DEADLINE" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :span="12">
						<el-form-item label="用户有效期">
							<el-date-picker type="date" style="width:100%;" placeholder="选择日期" @focus="clearFocus" v-model="currentUser.USR_DEADLINE" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-button type="primary" @click="Save">保存</el-button>
					</el-col>
					<el-col :span="12">
						<el-button type="primary" @click="UserFormVisiable = false">关闭</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import Common from '../../plugins/common.js'
import ResponsiveTable from '../../components/ResponsiveTable.vue'
export default {
	data() {
		return {
			queryObject: {
				UserName: '',
				StnId: '',
				Enabled: '',
				PageIndex: 1,
				PageSize: 10,
			},
			responObject: {
				UserList: [],
				groupList: [],
				StnList: [],
				TotalCount: 0,
			},
			UserFormVisiable: false,
			currentUser: {},
			formTitle: '',
			bUSR_ENABLE: false,
			EditMode: false,
			SelectedUsers: [],
			WinSize: {
				Width: '70%',
				FullScreen: false,
			},
		}
	},
	components: {
		ResponsiveTable,
	},
	methods: {
		Search: function() {
			var ret = this.$http.get('/user', {
				params: this.queryObject,
			})
			ret.then(response => {
				this.responObject.TotalCount = response.data.TotalCount
				this.responObject.UserList = response.data.DataList
			})
		},
		PageIndexChange: function(v) {
			this.queryObject.PageIndex = v
			this.Search()
		},
		PageSizeChange: function(v) {
			this.queryObject.PageSize = v
			this.Search()
		},
		clearFocus() {
			document.activeElement.blur()
		},
		Add: function() {
			this.formTitle = '添加用户'
			this.currentUser = {}
			this.currentUser.USR_ENABLE = 1
			this.currentUser.PSW_DEADLINE = Common.DateAdd(
				new Date(),
				'yyyy',
				1,
			)
			this.currentUser.USR_DEADLINE = Common.DateAdd(
				new Date(),
				'yyyy',
				1,
			)
			this.UserFormVisiable = true
			this.EditMode = false
		},
		Edit: function(u) {
			this.formTitle = '编辑用户'
			var editObject = {}
			u.USR_PASS_Confirm = u.USR_PASS
			this.currentUser = Object.assign(editObject, u)
			this.UserFormVisiable = true
			this.EditMode = true
		},
		Delete: function(u) {
			if (confirm('此操作无法恢复，确认删除用户吗')) {
				if (u !== 0) {
					this.SelectedUsers = []
					this.SelectedUsers.push(u)
				}
				this.BatchHandler('Delete')
			}
		},
		Save: function() {
			var ret = null
			if (this.EditMode) {
				ret = this.$http.put('/user', this.currentUser)
			} else {
				ret = this.$http.post('/user', this.currentUser)
			}
			ret.then(response => {
				var msg = response.data.Msg
				if (response.data.Code === 1) {
					this.$message.success(msg)
					this.UserFormVisiable = false
					this.Search()
				} else {
					this.$message.error(msg)
				}
			})
		},
		Extend: function(u) {
			if (u !== 0) {
				this.SelectedUsers = []
				this.SelectedUsers.push(u)
			}
			this.BatchHandler('Extend')
		},
		Reset: function(u) {
			if (u !== 0) {
				this.SelectedUsers = []
				this.SelectedUsers.push(u)
			}
			this.BatchHandler('Reset')
		},
		TableSelectionChange: function(v) {
			console.log(v)
			this.SelectedUsers = v
		},
		BatchHandler: function(action) {
			if (this.SelectedUsers.length === 0) {
				this.$message.error('请勾选记录！')
			}
			var ret = this.$http.put('/user/batch', {
				Action: action,
				Data: this.SelectedUsers,
			})
			ret.then(response => {
				var msg = response.data.Msg
				if (response.data.Code === 1) {
					this.$message.success(msg)
					this.Search()
				} else {
					this.$message.error(msg)
				}
			})
		},
		WindowResize() {
			if (window.innerWidth < 768) {
				this.WinSize.FullScreen = true
			} else if (window.innerWidth < 992) {
				this.WinSize.Width = '90%'
				this.WinSize.FullScreen = false
			} else if (window.innerWidth < 1200) {
				this.WinSize.Width = '80%'
				this.WinSize.FullScreen = false
			} else if (window.innerWidth < 1920) {
				this.WinSize.Width = '70%'
				this.WinSize.FullScreen = false
			} else {
				this.WinSize.Width = '60%'
				this.WinSize.FullScreen = false
			}
		},
	},
	mounted() {
		var g = this.$http.get('/options/groups')
		var s = this.$http.get('/options/stations')
		g.then(response => {
			this.responObject.GroupList = response.data.Options
		})
		s.then(response => {
			this.responObject.StnList = response.data.Options
		})
		this.Search()
		this.WindowResize()
		window.addEventListener('resize', this.WindowResize)
	},
}
</script>

<style scoped lang="scss">
@import '../../assets/base.scss';
.el-table td {
	padding: 8px 0;
}

.el-table .el-button--small {
	padding: 0 0;
}
.el-card {
	.el-card__body /deep/ {
		padding: 0.5em;
	}
}
.el-select {
	width: 100%;
}
</style>
