<template>
	<div class="page_404">
		<div id="notPage">
			<img src="../../assets/images/qinggan-404.png" height="205" width="258" alt="">
			<p>抱歉小主,您访问的页面不存在</p>
			<router-link to="/home/panorama">返回首页</router-link>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.page_404{
		width: 100%;
		height: 100%;
		position: relative; 
			#notPage{
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