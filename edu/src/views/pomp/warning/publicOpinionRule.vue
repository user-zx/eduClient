<template>
	<div class="publicOpinionRule">
		 <bread-crumb></bread-crumb>
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="预警规则" name="first">用户管理</el-tab-pane>
		    <el-tab-pane label="预警接收人管理" name="second">配置管理</el-tab-pane>
  		</el-tabs>
	</div>
</template>
<script src="./script/publicOpinionRule">
	
</script>
<style lang="scss" scoped>
	.el-tabs__item:hover{
		color: #1f2d3d;
	}
</style>