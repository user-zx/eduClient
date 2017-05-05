<template>
    <div class="nav clearfix">
        <div class="search-wrap">
            <el-input icon="search" :on-icon-click="handleIconClick">
            </el-input>
        </div>
        <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" class="nav-menu" id="top-title">
            <el-menu-item index="3"><a href="/apis/logOut.do">退出</a></el-menu-item>
            <el-menu-item index="2"><a href="#">{{userAccount}}</a></el-menu-item>
            <el-menu-item index="1"><router-link to="/home/myCenter" class="topCenter">会员中心</router-link></el-menu-item>
            <el-menu-item index="0" @click="toSysNotice">系统通知</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                activeIndex: ''
            }
        },
        components:{} ,
        methods:{
            handleIconClick(ev) {
            },
            toSysNotice(){
                this.$router.push({path: '/home/myCenter', query: {defaultActive: 'sysNotice'}})
            }
        },
        mounted(){
        },
        props: ['userAccount']
    }
</script>
<style lang='scss'>
    .top-title .el-menu-item a, .top-title .el-menu-item a:hover{
        line-height: 65px;
        display: inline-block;
        color: #fefefe;
    }  
    #top-title .is-active{
        color: #fefefe;
    }   
</style>
