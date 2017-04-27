<template>
	<div class="page_500">
		<div id="serverError">
			<img src="../../assets/images/qinggan-nodata.png" height="205" width="258" alt="">
			<p>抱歉小主,服务器因为太累了,需要休息下</p>
			<router-link to="/home/panorama">返回首页</router-link>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.page_500{ 
		width: 100%;
		height: 100%; 
		position: relative; 
		#serverError{
			position: absolute;
			left: 50%;
			margin-left: -129px; 
			top: 50%;
			margin-top: -180px;  
			color: #66a3ff;
			width: 258px;
			text-align: center;
			>p{
				margin-bottom: 10px; 
			}
		}
	}
</style>