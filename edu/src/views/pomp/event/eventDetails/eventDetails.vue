/**
* Created by zhangxin on 2017/3/22.
*/
<template>
    <div class="eventDetails" id="eventDetails">
        <div class="title-box">
            <h3 class="title">中央财经领导小组会议 释放了三点重磅信号</h3>
            <div class="btn-box">
                <el-button type="primary" icon="plus">关注</el-button>
                <el-button type="primary" icon="plus">预警</el-button>
                <el-button type="primary" icon="plus">事件库</el-button>
            </div>
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
            <el-col :span="24">
                <el-card class="box-card">
                    <el-col :span="8">
                        <div class=""></div>
                    </el-col>
                    <el-col :span="8"></el-col>
                    <el-col :span="8"></el-col>
                </el-card>
            </el-col>
        </el-row>
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
    .box-card{
        background-color: #21273d;
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
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
                ]
            }
        },
        components:{},
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
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){
            
        }
    }
</script>