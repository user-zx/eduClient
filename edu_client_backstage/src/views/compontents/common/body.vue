<template>
	<div class="body">
		<top></top>

		<el-row :gutter="20">
			<el-col :span="3">
				<div class="page-left">
					<left></left>
				</div>
			</el-col>
			<el-col :span="21">
				<div class="page-right">
					<!--内容区域-->
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<style lang="scss" scope>
	.body{
		width: 100%;
		height: 100%; 
	}
</style>
<script>
	import top from "../common/top.vue";
	import left from "../common/left.vue";
	export default{
		components:{top,left}
	}
</script>