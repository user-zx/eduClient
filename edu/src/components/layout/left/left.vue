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
            <el-submenu index="1">
                <template slot="title"><i class="nav-icon nav-icon1"></i>舆情管理</template>
                <el-menu-item-group>
                    <el-menu-item index="panorama">全景舆情</el-menu-item>
                    <el-menu-item index="analyse">舆情监测</el-menu-item>
                    <el-menu-item index="warning">舆情预警</el-menu-item>
                    <el-menu-item index="event">事件监测</el-menu-item>
                    <el-menu-item index="speech">舆情报告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="nav-icon nav-icon2"></i>情报内参</template>
                <el-menu-item-group>
                    <el-menu-item index="industryNews">行业动态</el-menu-item>
                    <el-menu-item index="characterNews">人物动态</el-menu-item>
                    <el-menu-item index="seeClearly">两微洞察</el-menu-item>
                    <el-menu-item index="mediaCoverage">媒体声量</el-menu-item>
                    <el-menu-item index="report">内参报告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="nav-icon nav-icon3"></i>业务工具</template>
                <el-menu-item-group>
                    <el-menu-item index="seeWbWeChat">两微监测</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="myAttention"><i class="nav-icon nav-icon4"></i>我的关注</el-menu-item>
            <!--<div class="column">-->
                <!--<el-menu-item class="title" index="1"></el-menu-item>-->
                <!--<el-menu-item index="1-1">全景舆情</el-menu-item>-->
                <!--<el-menu-item index="1-2">舆情监测</el-menu-item>-->
                <!--<el-menu-item index="1-3">舆情预警</el-menu-item>-->
                <!--<el-menu-item index="1-4">事件监测</el-menu-item>-->
                <!--<el-menu-item index="1-5">舆情报告</el-menu-item>-->
            <!--</div>-->
            <!--<div class="column">-->
                <!--<el-menu-item class="title" index="2"><i class="nav-icon nav-icon2"></i>情报内参</el-menu-item>-->

            <!--</div>-->
            <!--<div class="column">-->
                <!--<el-menu-item class="title" index="3"><i class="nav-icon nav-icon3"></i>业务工具</el-menu-item>-->
                <!--<el-menu-item index="3-1">两微监测</el-menu-item>-->
            <!--</div>-->
            <!--<div class="column">-->
                <!--<el-menu-item class="title" index="4"><i class="nav-icon nav-icon4"></i>我的关注</el-menu-item>-->
            <!--</div>-->
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
                    if(val){
                        let url=val.split('/')[1];
                        this.routerName=url;
                    }

                }
            }
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted(){
            
        }
    }
</script>