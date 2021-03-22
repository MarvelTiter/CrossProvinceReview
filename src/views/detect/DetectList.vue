<template>
	<div>
		<responsive-table :columns="[
            {
                Label:'流水号',
                Prop:'JYLSH',
            },
            {
                Label:'号牌号码',
                Prop:'HPHM',
            },
            {
                Label:'检验',
                Prop:'JYBJ',
            },
            {
                Label:'拍照标记',
                Prop:'PZBJ',
                Formatter:function(e){
                    if (e === '1'){
                        return '已拍照'
                    }else{
                        return '未拍'
                    }
                }
            },
        ]" :data="DataList" text-align="center" v-loading="loading">
			<res-table-column label="流水号" prop="JYLSH"></res-table-column>
			<res-table-column label="号牌号码" prop="HPHM"></res-table-column>
			<res-table-column label="检验" prop="JYBJ"></res-table-column>
			<res-table-column label="拍照标记" prop="PZBJ"></res-table-column>
		</responsive-table>
	</div>
</template>

<script>
import ResponsiveTable from '../../components/ResponsiveTable.vue'
export default {
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		DataList() {
			return [
				{
					JYLSH: '12312321312312',
					HPHM: '粤A12345',
					JYBJ: '0',
					PZBJ: '1',
				},
			]
		},
	},
	components: {
		ResponsiveTable,
	},
	methods: {},
	mounted() {},
}
</script>
<style scoped lang="scss">
</style>
