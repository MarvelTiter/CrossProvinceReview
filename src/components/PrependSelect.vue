<template>
	<div class="prepend-select">
		<div class="prepend">
			<slot></slot>
		</div>
		<el-select v-model="selected">
			<el-option v-for="item in source" :key="item[Value]" :label="item[Label]" :value="item[Value]">
			</el-option>
		</el-select>
	</div>
</template>

<script>
export default {
	data() {
		return {
			Label: this.label,
			Value: this.value,
			source: this.data,
			selected: this.selectedValue,
		}
	},
	model: {
		prop: 'selectedValue',
		event: 'click',
	},
	watch: {
		selected() {
			console.log(this.selected)
			this.$emit('click', this.selected)
		},
		data() {
			this.source = this.data
		},
	},
	props: {
		selectedValue: {
			type: String,
			default: function() {
				return ''
			},
		},
		data: {
			type: Array,
			default: function() {
				return []
			},
		},
		label: {
			type: String,
			default: function() {
				return ''
			},
		},
		value: {
			type: String,
			default: function() {
				return ''
			},
		},
	},
	computed: {},
	components: {},
	methods: {},
	mounted() {},
}
</script>
<style scoped lang="scss">
.prepend-select /deep/ {
	display: inline-table;
	border-collapse: separate;
	border-spacing: 0;
	line-height: normal;
	width: 100%;
	font-size: 14px;
	.prepend {
		background-color: #f5f7fa;
		color: #909399;
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
</style>
