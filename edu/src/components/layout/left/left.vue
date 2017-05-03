/**
* Created by zhangxin on 2017/3/14.
*/
<template>
    <div class="left-nav">
        <div class="logo-aside">
            <a href="javascript:void(0)" class="logo">
                <img src="../../../assets/images/logo.png" alt="logo" />
            </a>
        </div>
        <el-menu mode="vertical" :default-active="routerName" :router="true" :unique-opened="true" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
            <el-submenu index="home">
                <template slot="title"><i class="nav-icon nav-icon1"></i>舆情管理</template>
                <el-menu-item-group>
                    <el-menu-item v-if="permissions.indexOf(22) != -1" index="panorama">全景舆情</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(12) != -1" index="analyse">舆情监测</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(21) != -1" index="warning">舆情预警</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(13) != -1" index="event">事件监测</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(14) != -1" index="speech">舆情报告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="nav-icon nav-icon2"></i>情报内参</template>
                <el-menu-item-group>
                    <el-menu-item v-if="permissions.indexOf(15) != -1" index="industryNews">行业动态</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(16) != -1" index="characterNews">人物动态</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(17) != -1" index="seeClearly">两微洞察</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(18) != -1" index="mediaCoverage">媒体声量</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(19) != -1" index="report">内参报告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3"  v-if="permissions.indexOf(20) != -1">
                <template slot="title"><i class="nav-icon nav-icon3"></i>业务平台</template>
                <el-menu-item-group>
                    <el-menu-item index="seeWeChat">微信监测</el-menu-item>
                    <el-menu-item index="seeWeibo">微博监测</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="myAttention"><i class="nav-icon nav-icon4"></i>我的关注</el-menu-item>
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
                routerName:"",
                permissions: []
            }
        },
        components:{} ,
        watch: {
            /*
            * 监测路由地址，当地址变化时，对应不同的菜单。
            * */
            '$route.path': {
                immediate: true,
                handler(val) {
                    if(val=="/home/myCenter"){
                        $("#top-title .topCenter").css("color","#365a8b")
                    }else{
                         $("#top-title .topCenter").css("color","#fefefe")
                    }
                    if(val){
                        let url=val.split('/')[2],nowNav=null;

                        if(url.indexOf("panorama")!= -1) nowNav="panorama";
                        if(url.indexOf("event")!= -1) nowNav="event";
                        if(url.indexOf("Analyse") != -1) nowNav="analyse";
                        if(url.indexOf("speech") != -1) nowNav="speech";
                        if(url.indexOf("report") != -1) nowNav="report";
                        if(url.indexOf("industry") != -1) nowNav="industryNews";
                        if(url.indexOf("weChat") != -1) nowNav="seeWeChat";
                        if(url.indexOf("weibo") != -1) nowNav="seeWeibo";

                        if(nowNav)
                            this.routerName=nowNav;
                        else
                            this.routerName=url;


                    }
                }
            }
        },
        methods:{
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            onPermissionsLoad(permissions) {
                this.permissions = permissions;
            }
        },
        mounted() {
        }
    }
</script>