<template>
	<div class="list">
		<ul>
			<li v-for="(o,k) of source" :key="k" @click.stop="handleClick(o,k)" :class="{selected:o[IsSelected]}">
				<span>{{ o[displayMember] }}</span>
			</li>
			<label v-if="!source || source.length === 0">暂无数据</label>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'MtList',
	props: {
		data: Array,
		displayMember: {
			type: String,
			required: true,
		},
		valueMember: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			source: this.data,
			IsSelected: 'IsItemSelected',
		}
	},
	watch: {
		data(newValue) {
			this.source = newValue
			this.DataFilter()
		},
	},
	components: {},
	methods: {
		DataFilter() {
			for (const e of this.source) {
				this.$set(e, this.IsSelected, false)
			}
		},
		handleClick(item, index) {
			this.DataFilter()
			item[this.IsSelected] = true
			var val = this.data[index]
			this.$emit('change', val)
		},
	},
	mounted() {
		this.DataFilter()
	},
}
</script>
<style scoped lang="scss">
.list {
	ul {
		list-style: none;
		li {
			padding: 10px 20px;
			background-color: #dcdfe6;
			// box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			border: 1px solid rgba(0, 0, 0, 0.1);
			position: relative;
			&:nth-child(2n) {
				background-color: #fff;
			}
			&:hover {
				cursor: pointer;
				background-color: rgba(0, 0, 0, 0.1);
			}
			span {
				display: inline-block;
				vertical-align: middle;
			}
			&.selected {
				font-weight: bold;
				color: #409eff;
				&::after {
					content: '';
					height: 0;
					width: 0;
					position: absolute;
					border: 10px solid;
					border-top-color: transparent;
					border-right-color: transparent;
					border-bottom-color: transparent;
					border-left-width: 20px;
					right: 0;
				}
			}
		}
	}
}
</style>
