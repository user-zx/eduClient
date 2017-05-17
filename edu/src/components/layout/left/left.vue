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
            <el-submenu index="home" v-show="showPomp">
                <template slot="title"><i class="nav-icon nav-icon1"></i>舆情管理</template>
                <el-menu-item-group>
                    <el-menu-item v-if="permissions.indexOf(22) != -1" index="panorama">全景舆情</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(12) != -1" index="analyse">舆情监测</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(21) != -1" index="warning">舆情预警</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(13) != -1" index="event">事件监测</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(14) != -1" index="speech">舆情报告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" v-show="showReference">
                <template slot="title"><i class="nav-icon nav-icon2"></i>情报内参</template>
                <el-menu-item-group>
                    <el-menu-item v-if="permissions.indexOf(15) != -1" index="industryNews">行业动态</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(16) != -1" index="characterNews">人物动态</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(17) != -1" index="seeClearly">两微洞察</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(18) != -1" index="mediaCoverage">媒体声誉</el-menu-item>
                    <el-menu-item v-if="permissions.indexOf(19) != -1" index="report">内参报告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3"  v-if="permissions.indexOf(20) != -1" v-show="showServiceTool">
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
                permissions: [],
                showPomp: true,
                showReference: true,
                showServiceTool: true
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
                        if(url.indexOf("seeClearly") != -1) nowNav = "seeClearly";

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
                //为了解决禅道2832: 左侧一级菜单下，二级菜单都没权限，则不显示一级菜单的问题  目前能想到的解决方案是这个了... 后期谁有更好的idea 再修改
                //written by lifei
                if(permissions.length == 0){
                    this.showPomp = false;
                    this.showReference = false;
                    this.showServiceTool = false;
                }else if(permissions.length > 0){
                    if(permissions.indexOf(22) < 0 && permissions.indexOf(12) < 0 && permissions.indexOf(21) < 0
                        && permissions.indexOf(13) < 0 && permissions.indexOf(14) < 0){
                        this.showPomp = false;
                    }
                    if(permissions.indexOf(15) < 0 && permissions.indexOf(16) < 0 && permissions.indexOf(17) < 0
                        && permissions.indexOf(18) < 0 && permissions.indexOf(19) < 0){
                        this.showReference = false;
                    }
                    if(permissions.indexOf(20) < 0){
                        this.showServiceTool = false;
                    }
                }
            }
        },
        mounted() {
        }
    }
</script>