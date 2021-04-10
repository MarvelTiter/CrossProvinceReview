<template>
	<div class="mt-split-view">
		<div class="layout menu" :style="leftStyle">
			<slot name="left"></slot>
		</div>
		<div class="layout content" :class="{visible:open}" :style="contentStyle">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MtSplitView',
	props: {
		open: Boolean,
		leftWidth: {
			type: [Number, String],
			default: 250,
		},
		zIndex: {
			type: Number,
			default: 11,
		},
	},
	data() {
		return {}
	},
	computed: {
		leftStyle() {
			var unit = isNaN(this.leftWidth) ? '' : 'px'
			return {
				width: this.leftWidth + unit,
				zIndex: this.zIndex,
				backgroundColor: '#fff',
			}
		},
		contentStyle() {
			return {
				zIndex: this.zIndex - 1,
			}
		},
	},
	components: {},
	methods: {},
	mounted() {},
}
</script>
<style scoped lang="scss">
.mt-split-view {
	overflow: hidden;
	display: flex;
	justify-content: flex-start;
	height: 100%;
	* {
		transition: all 0.3s;
	}
	.layout {
		display: inline-flex;
	}
	.menu {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		justify-content: center;
	}
	.content {
		flex: 1;
		position: relative;
		left: -100%;
		&.visible {
			left: 0;
		}
	}
}
</style>
