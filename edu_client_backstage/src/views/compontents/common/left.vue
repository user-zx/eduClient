<template>
	<div class="left">
		<el-menu :default-active="activeMenu"  :router=true class="" @open="handleOpen" @close="handleClose"  theme="dark">
			<el-menu-item index="overallManage">全局管理</el-menu-item>
			<el-submenu index="memberManage">
				<template slot="title">会员管理</template>
				<el-menu-item-group>
					<el-menu-item index="memberCheck">会员审核</el-menu-item>
					<el-menu-item index="memberAdd">添加会员</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="management">管理员</el-menu-item>
			<el-menu-item index="systemNotice">系统通知</el-menu-item>
			<el-menu-item index="packageManage">套餐管理</el-menu-item>
			<el-menu-item index="systemSet">系统设置</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	 export default{
	     data(){
	        return{
                activeMenu: 'overallManage',
			}
		 },
		 methods: {
             handleOpen(key, keyPath){
                 console.log(key, keyPath);
			 },

             handleClose(key, keyPath){
                 console.log(key, keyPath);
			 }
		 }

	}
</script>