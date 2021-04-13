<template>
	<div class="wrap">
		<split-view :open="Buss.ContentVisible" :left-width="LeftWidth">
			<template v-slot:left>
				<!-- 业务类型 -->
				<div>
					<h1>业务类型设置
						<el-radio-group v-model="Buss.BnsType" size="small" style="float:right">
							<el-radio-button label="0">机动车</el-radio-button>
							<el-radio-button label="1">驾驶证</el-radio-button>
						</el-radio-group>
					</h1>

					<br />
					<el-input placeholder="关键字搜索" v-model="Buss.KeyWord" prefix-icon="el-icon-search">
						<template v-slot:append>
							<el-button icon="el-icon-plus" @click="AddBussiness"></el-button>
						</template>
					</el-input>
					<list :data="Buss.DataList" display-member="BNS_NAME" value-member="BNS_ID" @change="handle1">
						<template v-slot="item">
							<h5>{{item.obj.BNS_NAME}}</h5>
							<label class="bussitem" @click.stop="EditBussiness(item.obj)">
								<i class="el-icon-edit"></i>
							</label>
						</template>
					</list>
				</div>
			</template>
			<template v-slot:content>
				<split-view :open="BussRea.ContentVisible" :left-width="LeftWidth" :z-index="9">
					<template v-slot:left>
						<!-- 业务原因 -->
						<div>
							<h1>业务原因设置</h1>
							<br />
							<el-input placeholder="关键字搜索" prefix-icon="el-icon-search">
								<template v-slot:append>
									<el-button icon="el-icon-plus" @click="AddBussRea"></el-button>
								</template>
							</el-input>
							<list :data="BussRea.DataList" display-member="REA_NAME" value-member="REA_ID" @change="handle2">
								<template v-slot="item">
									<h5>{{item.obj.REA_NAME}}</h5>
									<label class="bussitem" @click.stop="EditBussRea(item.obj)">
										<i class="el-icon-edit"></i>
									</label>
								</template>
							</list>
						</div>
					</template>
					<template v-slot:content>
						<!-- 图片设置 -->
						<div style="padding:0 20px;" class="photos">
							<div v-for="(c,k) of Files.DataList" :key="k">
								<div class="close" @click="RemoveFile(c)">X</div>
								<h1>{{ c.FILE_NAME }}</h1>
							</div>
							<div class="button" @click.stop="AddFiles">
								<h1>＋</h1>
							</div>
						</div>
					</template>
				</split-view>
			</template>
		</split-view>
		<MtPopupWidget :visible.sync="Buss.PopupVisible" show-button>
			<template v-slot:header>
				<h4>{{ Buss.DialogTitle }}</h4>
			</template>
			<el-form>
				<el-form-item label="业务名称" label-width="80px">
					<el-input v-model="Buss.Entity.BNS_NAME"> </el-input>
				</el-form-item>
				<el-form-item label="业务编号" label-width="80px">
					<el-input v-model="Buss.Entity.BNS_NO" :disabled="Buss.EditFalg && Buss.Entity.BNS_NO"> </el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="SaveBussiness">保存</el-button>
		</MtPopupWidget>
		<MtPopupWidget :visible.sync="BussRea.PopupVisible" show-button>
			<template v-slot:header>
				<h4>{{ BussRea.DialogTitle }}</h4>
			</template>
			<el-form>
				<el-form-item label="业务原因" label-width="80px">
					<el-input v-model="BussRea.Entity.REA_NAME"></el-input>
				</el-form-item>
				<el-form-item label="原因编号" label-width="80px">
					<el-input v-model="BussRea.Entity.REA_NO" :disabled="BussRea.EditFalg && BussRea.Entity.REA_NO"></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="SaveBussRea">保存</el-button>
		</MtPopupWidget>
		<el-dialog :title="Files.DialogTitle" :visible.sync="Files.DialogVisible" show-close top="5vh">
			<template v-slot:title>
				<h1>{{Files.DialogTitle}}</h1>
			</template>
			<el-transfer style="text-align: left; display: inline-block; height:calc(100%-100px)" v-model="Files.SelectedID" filterable :props="{
	                  key: 'FILE_ID',
	                  label: 'FILE_NAME'
	                }" :titles="['未选择', '已选择']" :button-texts="['移除', '添加']" @change="handleChange" :data="Files.AllFiles">
			</el-transfer>
			<template v-slot:footer>
				<div style="text-align:center">
					<el-button type="primary" @click="SaveSelectedMapping">保存</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import SplitView from '../../components/SplitView'
import List from '../../components/List'
import MtPopupWidget from '../../components/PopupWidget'
export default {
	data() {
		return {
			// Bussiness
			Buss: {
				KeyWord: '',
				BnsType: 0,
				DataList: [],
				DialogTitle: '',
				PopupVisible: false,
				Entity: {},
				ContentVisible: false,
				EditFalg: false,
			},
			// BussinessReason
			BussRea: {
				KeyWord: '',
				DataList: [],
				DialogTitle: '',
				PopupVisible: false,
				Entity: {},
				ContentVisible: false,
				EditFalg: false,
			},
			Files: {
				AllFiles: [],
				DataList: [],
				SelectedID: [],
				DialogTitle: '',
				DialogVisible: false,
			},
		}
	},
	watch: {
		'Buss.KeyWord': function() {
			this.SearchBussiness()
		},
		'Buss.BnsType': function() {
			this.SearchBussiness()
		},
		'Files.DataList': function(newValue) {
			this.Files.SelectedID = []
			for (const e of newValue) {
				this.Files.SelectedID.push(e.FILE_ID)
			}
		},
	},
	computed: {
		Api() {
			return this.$store.state.Config.Api
		},
		LeftWidth() {
			var w = window.innerWidth * 0.18
			if (w < 345) w = 345
			return w
		},
	},
	components: { SplitView, List, MtPopupWidget },
	methods: {
		async handle1(v) {
			this.Buss.Entity = v
			this.SearchBussRea()
		},
		async handle2(v) {
			this.BussRea.Entity = v
			this.SearchFile(v)
		},
		// bussiness action
		AddBussiness() {
			this.Buss.DialogTitle = '新增业务类型'
			this.Buss.Entity = {}
			this.Buss.PopupVisible = true
			this.Buss.EditFalg = false
		},
		EditBussiness(e) {
			this.Buss.Entity = e
			this.Buss.DialogTitle = '编辑业务类型'
			this.Buss.PopupVisible = true
			this.Buss.EditFalg = true
		},
		async SaveBussiness() {
			var result = await this.$http.put(
				this.Api.Bussiness,
				this.Buss.Entity,
			)
			if (result.data.status === 'Success') {
				this.$message.success(result.data.value)
				this.SearchBussiness()
				this.Buss.PopupVisible = false
			} else {
				this.$message.success(result.data.value)
			}
		},
		async SearchBussiness() {
			this.Buss.ContentVisible = false
			this.BussRea.DataList = []
			this.BussRea.ContentVisible = false
			this.Files.DataList = []
			var buss = await this.$http.get(this.Api.Bussiness, {
				params: {
					KeyWord: this.Buss.KeyWord,
					BnsType: this.Buss.BnsType,
				},
			})
			if (buss.status === 200) {
				this.Buss.DataList = buss.data.value
			}
		},
		// bussiness reason action
		AddBussRea() {
			this.BussRea.Entity = {}
			this.BussRea.Entity.BNS_ID = this.Buss.Entity.BNS_ID
			this.BussRea.DialogTitle = '新增业务原因'
			this.BussRea.PopupVisible = true
			this.BussRea.EditFalg = false
		},
		EditBussRea(e) {
			this.BussRea.Entity = e
			this.BussRea.DialogTitle = '编辑业务原因'
			this.BussRea.PopupVisible = true
			this.BussRea.EditFalg = true
		},
		async SaveBussRea() {
			var result = await this.$http.put(
				this.Api.BussinessReason,
				this.BussRea.Entity,
			)
			if (result.data.status === 'Success') {
				this.$message.success(result.data.value)
				this.SearchBussRea()
				this.BussRea.PopupVisible = false
			} else {
				this.$message.success(result.data.value)
			}
		},
		async SearchBussRea() {
			this.BussRea.ContentVisible = false
			this.Files.DataList = []
			var result = await this.$http.get(
				this.Api.BussinessReason,
				{
					params: {
						BNS_ID: this.Buss.Entity.BNS_ID,
						KeyWord: this.BussRea.KeyWord,
					},
				},
			)
			if (result.status === 200) {
				this.Buss.ContentVisible = true
				this.BussRea.DataList = result.data.value
			}
		},
		// files action
		handleChange(value, direction, movedKeys) {
			this.Files.SelectedID = value
		},
		AddFiles() {
			this.Files.DialogTitle = `照片配置：业务类型[${this.Buss.Entity.BNS_NAME}]，业务原因[${this.BussRea.Entity.REA_NAME}]`
			this.Files.DialogVisible = true
		},
		async RemoveFile(mapped) {
			//
			if (!confirm('是否确认删除?')) {
				return
			}
			var result = await this.$http.delete(this.Api.Mapping, {
				params: {
					FILE_ID: mapped.FILE_ID,
					BNS_ID: this.Buss.Entity.BNS_ID,
					REA_ID: this.BussRea.Entity.REA_ID,
				},
			})
			if (result.data.status == 'Success') {
				this.$message.success(result.data.value)
				this.SearchFile(this.BussRea.Entity)
			} else {
				this.$message.error(result.data.value)
			}
		},
		async SaveSelectedMapping() {
			var result = await this.$http.put(this.Api.Mapping, {
				FileIds: this.Files.SelectedID,
				BNS_ID: this.Buss.Entity.BNS_ID,
				REA_ID: this.BussRea.Entity.REA_ID,
			})
			if (result.data.status == 'Success') {
				this.$message.success(result.data.value)
				this.SearchFile(this.BussRea.Entity)
				this.Files.DialogVisible = false
			} else {
				this.$message.error(result.data.value)
			}
		},
		async SearchFile(item) {
			var result = await this.$http.get(this.Api.Mapping, {
				params: item,
			})
			if (result.status === 200) {
				this.BussRea.ContentVisible = true
				if (item) this.Files.DataList = result.data.value
				else this.Files.AllFiles = result.data.value
			}
		},
	},
	mounted() {
		// 业务类型
		this.SearchBussiness()
		this.SearchFile()
	},
}
</script>

<style scoped lang="scss">
.wrap {
	height: 100%;
	.list {
		margin-top: 20px;
		.bussitem {
			float: right;
			&:hover {
				cursor: pointer;
			}
		}
	}
	.photos {
		div {
			border: 1px solid #409eff66;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			padding: 20px;
			float: left;
			margin: 10px;
			position: relative;
			.close {
				padding: 0;
				margin: 0;
				position: absolute;
				border: 0;
				right: 5px;
				top: 5px;
				color: rgba(0, 0, 0, 0.2);
				&:hover {
					cursor: pointer;
					color: #409eff;
				}
			}
		}
		.button {
			&:hover {
				cursor: pointer;
				color: #409eff;
			}
		}
	}
	.el-transfer /deep/ {
		.el-transfer-panel__body {
			height: 100%;
		}
		.el-transfer-panel__list.is-filterable {
			height: 550px;
		}
	}
}
</style>
