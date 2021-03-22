<template>
	<div class="wrap"></div>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		label: String,
		prop: String,
		formatter: {
			type: Function,
			default: function() {
				return alert
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
</style>
