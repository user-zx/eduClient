/**
* Created by zhangxin on 2017/3/14.
*/
<template>
    <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="4"><a href="javascript:void(0);">退出</a></el-menu-item>
        <el-menu-item index="3"><a href="/home/myCenter">admin</a></el-menu-item>
        <el-menu-item index="2"><a href="javascript:void(0);">系统管理</a></el-menu-item>
        <el-menu-item index="1"><a href="javascript:void(0);">高级搜索</a></el-menu-item>
    </el-menu>
</template>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    export default{
        data(){
            return {
                activeIndex: '0',
            }
        },
        components:{} ,
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted(){
            
        }
    }
</script>