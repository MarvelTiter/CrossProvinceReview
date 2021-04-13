<template>
	<div class="object-info">
		<table>
			<tr v-for="rowIndex of RowCount" :key="rowIndex">
				<template v-for="columnIndex of ColumnCount">
					<td class="left_label" :key="'label'+(rowIndex * columnIndex + columnIndex)">
						{{ GetLabel(rowIndex * column + columnIndex) }}
					</td>
					<td class="right_content" :key="'value'+(rowIndex * columnIndex + columnIndex)">
						{{ GetValue(rowIndex * column + columnIndex) }}
					</td>
				</template>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'objectInfo',
	props: {
		obj: Object,
		propLabel: Object,
		column: {
			type: Number,
			default: 2,
		},
	},
	data() {
		return {
			properties: [],
			label: this.propLabel,
			value: this.obj,
		}
	},
	watch: {
		obj(newValue) {
			this.value = newValue
		},
		propLabel(newValue) {
			this.label = newValue
		},
	},
	computed: {
		RowCount() {
			if (!this.obj) return 0
			var keys = Object.keys(this.obj)
			this.properties = keys
			this.InitValues()
			var t = Math.floor(keys.length / 2)
			var max = keys.length % 2 === 0 ? t : t + 1
			var ret = []
			for (let index = 0; index < max; index++) {
				ret.push(index)
			}
			return ret
		},
		ColumnCount() {
			var max = this.column
			var ret = []
			for (let index = 0; index < max; index++) {
				ret.push(index)
			}
			return ret
		},
	},
	components: {},
	methods: {
		GetLabel(index) {
			var prop = this.properties[index]
			var label = (this.label && this.label[prop]) || prop
			return label
		},
		GetValue(index) {
			var prop = this.properties[index]
			var val = this.value[prop]
			return val
		},
		InitValues() {
			this.values = []
			this.labels = []
			for (const k of this.properties) {
				this.values.push(this.obj[k])
				this.labels.push(this.propLabel[k])
			}
		},
	},
	mounted() {},
}
</script>
<style scoped lang="scss">
.object-info {
	table {
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		td {
			border: 1px solid #dcdfe6;
			padding: 5px;
		}
		tr {
			&:nth-child(2n) td {
				background-color: #bddeff;
			}
		}
	}
}
</style>
