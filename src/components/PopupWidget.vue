<template>
	<div class="mt-popup-widget" :class="{visible:show}" :style="style" ref="widget">
		<div class="header">
			<slot name="header"></slot>
			<label :class="{'close-button':true,'close-visible':showButton}" type="text" @click="show=false">X</label>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'MtPopupWidget',
	props: {
		visible: Boolean,
		position: {
			type: String,
		},
		showButton: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			show: this.visible,
			location: {
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
			},
		}
	},
	watch: {
		visible(newValue) {
			this.show = newValue
		},
		show(newValue) {
			this.$emit('update:visible', newValue)
			if (newValue) {
				this.$nextTick(() => {
					this.UpdatePosition()
				})
			}
		},
	},
	computed: {
		style() {
			return {
				left: this.location.x + 'px',
				top: this.location.y + 'px',
			}
		},
	},
	components: {},
	methods: {
		UpdatePosition() {
			var e = window.event
			var posX = e.clientX
			var posY = e.clientY
			var dom = this.$refs['widget']
			var width = dom.offsetWidth
			var height = dom.offsetHeight
			var winWidth = window.innerWidth
			var winHeight = window.innerHeight
			var left = posX - width / 2
			var top = posY + 50
			if (left + width > winWidth) {
				left = winWidth - width - 50
			}
			if (top + height > winHeight) {
				top = posY - height - 50
			}
			this.location.x = left
			this.location.y = top
		},
	},
	mounted() {},
}
</script>
<style scoped lang="scss">
.mt-popup-widget {
	position: fixed;
	transition: all 0.3s;
	z-index: 9999;
	padding: 10px 20px 20px 20px;
	border-radius: 10px;
	border: 1px solid #dcdfe6;
	background: #fff;
	display: none;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	&::before {
		content: '';
		// display: inline-block;
		// box-sizing: border-box;
		// width: 10px;
		// height: 10px;
		// border-top: 1px solid #dcdfe6;
		// border-left: 1px solid #dcdfe6;
		// transform: rotate(45deg);
		// top: -20px;
		// position: relative;
		// background: #fff;
	}
	.header {
		padding: 0 10px 10px 10px;
		text-align: left;
		* {
			display: inline-block;
		}
		.close-button {
			display: none;
			&:hover {
				cursor: pointer;
				color: #409eff;
			}
		}
		.close-visible {
			display: block;
			float: right;
		}
	}
	&.visible {
		display: block;
	}
}
</style>
