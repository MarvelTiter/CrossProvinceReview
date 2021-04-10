<template>
	<div class="wrap">
		<split-view :open="levelTwoOpen" :left-width="LeftWidth">
			<template v-slot:left>
				<!-- 业务类型 -->
				<div>
					<el-input placeholder="关键字搜索" prefix-icon="el-icon-search">
						<template v-slot:append>
							<el-button icon="el-icon-plus"></el-button>
						</template>
					</el-input>
					<list :data="BussinessList" display-member="BNS_NAME" value-member="BNS_ID" @change="handle1"></list>
				</div>
			</template>
			<template v-slot:content>
				<split-view :open="levelThreeOpen" :left-width="LeftWidth" :z-index="9">
					<template v-slot:left>
						<!-- 检验种类 -->
						<div>
							<el-input placeholder="关键字搜索" prefix-icon="el-icon-search">
								<template v-slot:append>
									<el-button icon="el-icon-plus"></el-button>
								</template>
							</el-input>
							<list :data="DetectTypeList" display-member="BNS_NAME" value-member="value" @change="handle2"></list>
						</div>
					</template>
					<template v-slot:content>
						<!-- 图片设置 -->
						<h1>设置</h1>
					</template>
				</split-view>
			</template>
		</split-view>
	</div>
</template>

<script>
import SplitView from '../components/SplitView'
import List from '../components/List'
export default {
	data() {
		return {
			BussinessList: [
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
			],
			DetectTypeList: [
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
				{ BNS_NAME: '123', value: '123' },
			],
			levelTwoOpen: false,
			levelThreeOpen: false,
		}
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
	components: { SplitView, List },
	methods: {
		async handle1(v) {
			this.levelTwoOpen = true

			var result = await this.$http.get(this.Api.Setting.InspectType, {
				params: {},
			})
			if (result.state === 200) {
				this.DetectTypeList = result.data
			}
		},
		async handle2(v) {
			this.levelThreeOpen = true

			var result = await this.$http.get(this.Api.Setting.Photos, {
				params: {},
			})
		},
	},
	async mounted() {
		// 业务类型
		var buss = await this.$http.get(this.Api.Setting.Bussiness)
		if (buss.state === 200) {
			this.BussinessList = buss.data
		}
	},
}
</script>

<style scoped lang="scss">
.wrap {
	height: 100%;
	.list {
		margin-top: 20px;
	}
}
</style>
