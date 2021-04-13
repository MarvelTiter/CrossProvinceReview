<template>
	<object-info :obj="auto" :propLabel="propLabel"></object-info>
</template>

<script>
import ObjectInfo from '../../components/ObjectInfo'
export default {
	props: {
		auto: Object,
		propLabel: Object,
	},
	data() {
		return {}
	},
	computed: {},
	components: { ObjectInfo },
	methods: {},
	mounted() {},
}
</script>
<style scoped lang="scss">
</style>
