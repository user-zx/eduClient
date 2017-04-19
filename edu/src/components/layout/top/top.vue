/**
* Created by zhangxin on 2017/3/14.
*/
<template>
    <div class="nav clearfix">
        <div class="search-wrap">
            <el-input icon="search" :on-icon-click="handleIconClick">
            </el-input>
        </div>
        <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav-menu">
            <el-menu-item index="3"><a href="/apis/logOut.do">退出</a></el-menu-item>
            <el-menu-item index="2"><a href="#">admin</a></el-menu-item>
            <el-menu-item index="1"><router-link to="/home/myCenter">会员中心</router-link></el-menu-item>
            <el-menu-item index="0"><a href="javascript:void(0);">系统通知</a></el-menu-item>
        </el-menu>
    </div>
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

            },
            handleIconClick(ev) {
                console.log(ev);
            }
        },
        mounted(){
            
        }
    }
</script>