<template>
	<div class="top">
		<el-row type="flex" class="row-bg backStageTop" justify="space-around">
		  <el-col :span="6">
		  		<img src="../../../assets/images/logo.png" height="53" width="175" alt="">
		  </el-col>
		  <el-col :span="6"></el-col>
		  <el-col :span="6">
		  		<ul class="leftICON">
		  			<li></li>
		  			<li></li>
		  			<li></li>
		  		</ul>
		  </el-col>
		</el-row>
	</div>
</template>
<style lang="scss" scope>
	.backStageTop{
		height: 78px;
		border-bottom: 1px solid #66a3ff;
		line-height: 78px; 
		.leftICON{
			float: right;
			padding-top: 28px; 
			>li{
				float: left;
				width: 22px;
				height: 22px;
				margin-left: 20px; 
				cursor: pointer;
			}
			>li:first-child{
				background: url("../../../assets/images/leftICON.png") -1px -1px no-repeat;
			}
			>li:nth-child(2){
				background: url("../../../assets/images/leftICON.png") -47px -1px no-repeat;
			}
			>li:nth-child(3){
				background: url("../../../assets/images/leftICON.png") -93px -2px no-repeat;
			}
		}
	}
</style>
<script>
	export default{
		
	}
</script>