<template>
    <div class="nav clearfix">
        <div class="search-wrap">
            <el-input icon="search" :on-icon-click="handleIconClick">
            </el-input>
        </div>
        <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav-menu">
            <el-menu-item index="3"><a href="/apis/logOut.do">退出</a></el-menu-item>
            <el-menu-item index="2"><a href="#">{{userAccount}}</a></el-menu-item>
            <el-menu-item index="1"><router-link to="/home/myCenter">会员中心</router-link></el-menu-item>
            <el-menu-item index="0"><a href="javascript:void(0);">系统通知</a></el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                activeIndex: '0'
            }
        },
        components:{} ,
        methods:{
            handleSelect(key, keyPath) {

            },
            handleIconClick(ev) {
            },
        },
        mounted(){
        },
        props: ['userAccount']
    }
</script>
<style scope>
    .el-menu--horizontal .el-menu-item a, .el-menu--horizontal .el-menu-item a:hover{
        line-height: 65px;
        display: inline-block;
    }
</style>