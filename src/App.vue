<template>
	<div id="app">
		<keep-alive :include="CacheList">
			<router-view />
		</keep-alive>
		<!-- <router-view /> -->
	</div>
</template>
<script>
export default {
	computed: {
		CacheList() {
			return this.$store.state.CacheList
		},
	},
}
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
}
</style>
