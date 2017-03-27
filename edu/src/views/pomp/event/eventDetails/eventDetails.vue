/**
* Created by zhangxin on 2017/3/22.
*/
<template>
    <div class="eventDetails" id="eventDetails">
        <div class="title-box">
            <h3 class="title">中央财经领导小组会议 释放了三点重磅信号</h3>
            <!--<div class="btn-box">
                <el-button type="primary" icon="plus" @click="follow()">关注</el-button>
                <el-button type="primary" icon="plus" @click="earlyWarning()">预警</el-button>
                <el-dropdown class="event-store-box" trigger="click">
                    <el-button type="primary" icon="plus" class="button-icon">
                        事件库
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="event-store-item">
                        <el-dropdown-item @click="addEvent()">事件1</el-dropdown-item>
                        <el-dropdown-item @click="addEvent()">事件2</el-dropdown-item>
                        <el-dropdown-item @click="addEvent()">事件3</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="primary" icon="plus" >事件库</el-button>
            </div>-->
        </div>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>基本信息</span>
                    </div>
                    <div class="text item">
                        <el-table :data="opinionData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title">
                            <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
                            <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
                            <el-table-column prop="keyword" label="关键词" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="speech-tabs">
            <el-row :gutter="10">
                <el-col :span="8" class="active"><div class="tab-item" @click="currentFun('eventArticle')">事件文章</div></el-col>
                <el-col :span="8"><div class="tab-item" @click="currentFun('eventCharts')">事件图表</div></el-col>
                <el-col :span="8"><div class="tab-item" @click="currentFun('eventAnalyse')">演化分析</div></el-col>
            </el-row>
        </div>
        <components :is="currentTabs.currentTab"></components>
    </div>
</template>
<style lang="scss" scoped>
    .title-box{
        vertical-align: middle;
        margin-bottom:20px;
        .title{
            display: inline-block;
            max-width: 500px;
            font-size: 18px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .btn-box{
            display: inline-block;
            float: right;
            .el-button{
                padding:7px 15px;
            }
        }
    }
    .speech-tabs{
        background-color: #21273d;
        margin-top: 10px;
        margin-bottom:10px;
        padding:16px 22px;
        .el-col{
            .tab-item{
                height:125px;
                line-height: 125px;
                font-size: 16px;
                text-align: center;
                color:rgba(193,202,240,.5);
                background: #282e46;
                transition: all .25s;
                cursor: pointer;
                border:1px solid #273451;
                &:hover{
                     color:#60a3ff;
                 }
            }
            &.active{
                .tab-item{
                    color:#60a3ff;
                }
            }
        }
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
     import eventArticle from './tabContent/eventArticle.vue';
     import eventCharts from './tabContent/eventCharts.vue';
     import eventAnalyse from './tabContent/eventAnalyse.vue';
     export default{
        data(){
            return {
                msg:"事件详情",
                opinionData:[
                    {
                        startTime:"2017-03-03 17:00:00",
                        endTime:"2017-03-03 17:00:00",
                        keyword:"关键词，1123，啥都八十多，213自带",
                    }
                ],
                currentTabs:{
                    eventArticle:"eventArticle",
                    eventCharts:"eventCharts",
                    eventAnalyse:"eventAnalyse",
                    currentTab:"eventArticle",
                }
            }
        },
        components:{eventArticle,eventCharts,eventAnalyse},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/home/panorama"}
                    },
                    {
                        name:"事件监测",to:{path:"/home/event"}
                    },
                    {
                        name:"事件详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            currentFun(params){
                this.currentTabs.currentTab=params;
            },
            /*follow(){

            },
            earlyWarning(){

            },
            addEvent(){

            }*/
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){
            $(".speech-tabs").on("click",".tab-item",function () {
                $(this).parent().addClass("active").siblings().removeClass("active");
            });
        }
    }
</script>