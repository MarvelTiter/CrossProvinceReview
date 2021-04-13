<template>
	<div class="wrap">
		<div class="back">
			<i class="el-icon-back" @click="GoBack"></i>
			<span>审核信息:{{ Job.JOB_PLATE }}({{ Job.JOB_PCLASS }})</span>
		</div>
		<div class="region left">
			<el-card>
				<template v-slot:header>
					<h3>
						<i class="el-icon-info" style="color:#409eff"></i>&nbsp;
						<span>车辆基本信息</span>
					</h3>
				</template>
				<div v-loading="CarInfoLoading">
					<auto-info :auto="AutoInfo.Auto" :propLabel="AutoInfo.Labels"></auto-info>
				</div>
			</el-card>
		</div>
		<div class="region right">
			<el-card>
				<template v-slot:header>
					<h3>
						<i class="el-icon-picture" style="color:#409eff"></i>&nbsp;
						<span>照片审核</span>
						<div style="display: inline-block;right: 20px;top: 10px;position: absolute;">
							<el-button type="primary" @click="CompleteReview">完成审核</el-button>
						</div>
					</h3>
				</template>
				<div v-loading="FileLoading" class="image_container">
					<el-card class="image_card" v-for="(img,key) of FileList" :key="key">
						<h4 title="照片名称">{{ img.FLT_ID }}</h4>
						<img :src="img.FLT_FILE" @click.stop="Show(img, key)" />
						<label>
							<el-checkbox v-model="img.JFL_OK" :true-label="1" :false-label="0"></el-checkbox>
							<el-button type="text" @click="Judge(key)">是否合格</el-button>
						</label>
						<span style="display:block;color:red;font-size:14px">{{img.JFL_REMARK}}</span>
					</el-card>
					<!-- <el-image v-for="(img,key) of FileList" :key="key" :src="'data:image/jpeg;base64,'+img.ImageData" lazy></el-image> -->
				</div>
			</el-card>
		</div>
		<mt-popup-widget :visible.sync="widgetShow">
			<template v-slot:header>
				<h4>驳回理由</h4>
			</template>
			<ul>
				<li v-for="(r,k) of RejectReason" :key="k" @click="handleReject(r)">{{ ( k + 1 ) + ':' + r }}</li>
				<li v-if="RejectReason.length === 0 ">无驳回理由</li>
				<li>
					<el-input v-model="currentRemark" style="width:220px;">
						<template v-slot:prepend>
							备注
						</template>
					</el-input>
					<el-button type="primary" size="medium" style="margin-left:10px;display:inline-block" @click="Save">保存</el-button>
				</li>
			</ul>
		</mt-popup-widget>
		<mt-image-preview :image-list="FileList" :visible.sync="Showing" :active-index="ShowIndex" src="FLT_FILE" @index-change="IndexChange">
			<template v-slot:detial>
				<h3>驳回理由:</h3>
				<el-select v-model="currentRemark" @change="handleReject">
					<el-option v-for="(r,k) of RejectReason" :key="k" :label="r" :value="r"> </el-option>
				</el-select>
				<el-button type="primary" size="medium" style="margin-left:10px" @click="Save">保存</el-button>
			</template>
		</mt-image-preview>
	</div>
</template>

<script>
import MtImagePreview from '../components/MtImagePreview'
import MtPopupWidget from '../components/PopupWidget'
import AutoInfo from '../views/partialView/AutoInfo'
export default {
	data() {
		return {
			CarInfoLoading: false,
			FileLoading: false,
			Showing: false,
			widgetShow: false,
			ShowIndex: 0,
			AutoInfo: {
				Auto: {},
				Labels: {},
			},
			FileList: [{ JFL_OK: 1 }],
			RejectReason: ['理由1', '理由2', '理由3'],
			currentRemark: '',
		}
	},
	computed: {
		Api() {
			return this.$store.state.Config.Api
		},
		Job() {
			return this.$store.state.CurrentJob
		},
	},
	watch: {
		currentRemark(newValue) {
			var img = this.FileList[this.ShowIndex]
			img.JFL_REMARK = newValue
			if (newValue) {
				img.JFL_OK = 0
			}
		},
	},
	components: {
		MtImagePreview,
		MtPopupWidget,
		AutoInfo,
	},
	methods: {
		GoBack() {
			this.$router.back(-1)
		},
		Show(img, index) {
			this.ShowIndex = index
			this.Showing = true
			this.currentImg = img
			// return 'data:image/jpeg;base64,' + img.ImageData
		},
		IndexChange(index) {
			this.ShowIndex = index
			var img = this.FileList[this.ShowIndex]
			this.currentRemark = img.JFL_REMARK
		},
		// Api.Auto
		async LoadCarInfo() {
			this.CarInfoLoading = true
			var auto = await this.$http.get(this.Api.Auto, {
				params: {
					Plate: this.Job.JOB_PLATE,
					PClass: this.Job.JOB_PCLASS,
				},
			})
			this.CarInfoLoading = false
			if (auto.data.status === 'Success') {
				this.AutoInfo.Auto = auto.data.value.Auto
				this.AutoInfo.Labels = auto.data.value.Labels
			} else {
				this.$message.error(auto.data.value)
			}
		},
		// Api.FileList
		async LoadFiles() {
			this.FileLoading = true
			var files = await this.$http.get(this.Api.FileList, {
				params: {
					JOB_ID: this.Job.JOB_ID,
				},
			})
			this.FileLoading = false
			if (files.data.status === 'Success') {
				for (const e of files.data.value) {
					e.FLT_FILE = 'data:image/jpeg;base64,' + e.FLT_FILE
					if (!e.JFL_OK && e.JFL_OK !== 0) e.JFL_OK = 1
				}
				this.FileList = files.data.value
			}
		},
		Judge(key) {
			this.ShowIndex = key
			var img = this.FileList[key]
			img.JFL_OK = (img.JFL_OK + 1) % 2
			if (img.JFL_OK == 0) this.widgetShow = true
			if (img.JFL_OK == 1) {
				img.JFL_REMARK = ''
				this.Save()
			}
		},
		handleReject(remark) {
			if (remark) this.currentRemark = remark
			this.$nextTick(() => {
				this.Save()
			})
		},
		// Api.Review
		async Save() {
			var img = this.FileList[this.ShowIndex]
			var bak_ok = img.JFL_OK
			var bak_remark = img.JFL_REMARK
			var result = await this.$http.put(this.Api.Review, {
				FLT_ID: img.FLT_ID,
				JFL_OK: img.JFL_OK,
				JFL_REMARK: img.JFL_REMARK,
				JOB_ID: img.JOB_ID,
			})
			if (result.data.status === 'Success') {
				this.$message.success(result.data.value)
			} else {
				this.$message.error(result.data.value)
				img.JFL_OK = bak_ok
				img.JFL_REMARK = bak_remark
			}
			this.widgetShow = false
		},
		// Api.CompleteReview
		async CompleteReview() {
			var jobState = 0
			for (const e of this.FileList) {
				if (e.JFL_OK === 0) {
					jobState = 31
					break
				}
			}
			var result = await this.$http.put(this.Api.CompleteReview, {
				JOB_ID: this.Job.JOB_ID,
				JOB_STATE: jobState,
			})
			if (result.data.status === 'Success') {
				this.$message.success(result.data.value)
			} else {
				this.$message.error(result.data.value)
			}
		},
	},
	mounted() {
		this.LoadFiles()
		this.LoadCarInfo()
	},
}
</script>
<style scoped lang="scss">
.wrap {
	height: 100%;
	overflow: hidden;
	position: relative;
	.region {
		display: inline-block;
		height: 100%;
		width: 100%;
		top: 0;
		position: absolute;
	}
	.left {
		// background: rgb(78, 152, 226);
		width: 40%;
		box-sizing: border-box;
		margin-top: 75px;
		padding: 0 10px;
		// border-right: 1px solid #dcdfe6;
		left: 0;
	}
	.right {
		// background: rgb(100, 62, 62);
		width: 60%;
		box-sizing: border-box;
		padding: 10px;
		right: 0;
		border-left: 1px solid #dcdfe6;

		.el-card /deep/ {
			height: 100%;
			position: relative;
		}
		.image_container {
			overflow-y: auto;
			position: absolute;
			height: 91%;
			text-align: center;
			.image_card {
				width: 200px;
				height: 360px;
				margin: 10px;
				display: inline-block;
				box-sizing: border-box;
				text-align: center;

				img {
					width: 100%;
					height: 240px;
					margin-top: 5px;
				}
			}
		}
	}
	.back {
		position: absolute;
		top: 20px;
		left: 20px;
		border-bottom: 1px solid #909399;
		padding-bottom: 5px;
		i {
			font-size: 28px;
			font-weight: bold;
			margin-right: 20px;
			&:hover {
				cursor: pointer;
			}
		}
		span {
			font-size: 28px;
			font-weight: bold;
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		li {
			font-size: 14px;
			padding: 10px;
			text-align: left;
		}
		li:nth-child(2n + 1) {
			background: #dcdfe6;
		}
	}
}
</style>
