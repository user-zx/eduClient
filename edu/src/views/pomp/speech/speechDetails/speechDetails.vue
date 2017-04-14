/**
* Created by zhangxin on 2017/3/22.
*/
<template>
    <div class="reportDetails" id="reportDetails">
        <breadCrumb></breadCrumb>
        <div class="title-box">
            <div>
                <h3 class="title">{{param.title}}</h3>
            </div>
            <div>
                <h3 class="date">{{param.createDate}}</h3>
                <div class="btn-box text-right">
                    <el-button type="primary" @click="downloadReport">下载</el-button>
                </div>
            </div>
        </div>
        <div class="eventCharts">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>舆情热点</span>
                        </div>
                        <div class="text item">
                            <el-table :data="opinionHot" :resizable="false" style="width: 100%" border class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>舆情监测</span>
                        </div>
                        <div class="col-item item-left">
                            <div class="charts" id="opinionMonitorChart" style="height: 400px;"></div>
                        </div>
                        <div class="col-item item-right">
                            <el-table :data="opinionMonitor" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title">
                                <el-table-column prop="name" label="属性" align="center"></el-table-column>
                                <el-table-column prop="num" label="文章数" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>载体分布</span>
                        </div>
                        <div class="col-item item-left">
                            <div class="charts" id="vectorDistributionChart" style="height: 400px;"></div>
                        </div>
                        <div class="col-item item-right">
                            <el-table :data="distributeData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title">
                                <el-table-column prop="name" label="载体" width="150" align="center"></el-table-column>
                                <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                                <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>重点高校关注度</span>
                        </div>
                        <div class="text item">
                            <div class="charts" id="univsChart" style="height: 400px;"></div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-card class="box-card educationBox" style="margin-top: 0px">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>微信热点</span>
                        </div>
                        <div class="text item">
                            <el-card class="box-card educationBox">
                                <el-table :data="wechatHot" :resizable="false" style="width: 100%" border class="tran-table">
                                    <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                </el-table>
                            </el-card>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card educationBox" style="margin-top: 0px">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>微博热点</span>
                        </div>
                        <div class="text item">
                            <el-card class="box-card educationBox">
                                <el-table :data="weboHot" :resizable="false" style="width: 100%" border class="tran-table">
                                    <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                </el-table>
                            </el-card>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .el-row{
        &+.el-row{
            margin-top: 10px;
        }
    }
    .title-box{
        vertical-align: middle;
        margin-bottom:20px;
        text-align: center;
        .title{
            display: inline-block;
            max-width: 500px;
            font-size: 22px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #66a3ff;
        }
        .date {
            display: inline-block;
            max-width: 500px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 60px;
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
    import echarts from 'echarts';
    export default{
        data(){
            return {
                param: {},
                opinionHot: [],
                opinionMonitor: [],
                distributeData: [],
                wechatHot: [],
                weboHot: [],
            }
        },
        components:{breadCrumb} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/home/panorama"}
                    },
                    {
                        name:"舆情报告",to:{path:"/home/speech"}
                    },
                    {
                        name:"报告详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            downloadReport() {
            },
            getOpinionHot() {
                this.$http.get('/apis/opinionReport/getOpinionHot.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.opinionHot = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取舆情监测图*/
            getOpinionMonitor() {
                let chart = echarts.init(document.getElementById('opinionMonitorChart'));
                chart.showLoading();
                this.$http.get('/apis/opinionReport/getOpinionMonitor.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });
                            let data = response.data.data.series[0].data;

                            for (let i = 0; i < data.length; i++) {
                                let obj = {};
                                obj.name = response.data.data.xAxis.data[i];
                                obj.num = data[i];
                                this.opinionMonitor.push(obj);
                            }


                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取载体分布图*/
            getVectorDistribution() {
                let chart = echarts.init(document.getElementById('vectorDistributionChart'));
                chart.showLoading();
                this.$http.get('/apis/opinionReport/getVectorDistribution.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            getVectorTable() {
                this.$http.get('/apis/opinionReport/getVectorTable.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.distributeData = response.data.data;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取高校关注度*/
            getUnivsMediaFocus() {
                let chart = echarts.init(document.getElementById('univsChart'));
                chart.showLoading();
                this.$http.get('/apis/opinionReport/getUnivsMediaFocus.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            getWechatHot() {
                this.$http.get('/apis/opinionReport/getWechatOpinionHot.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.wechatHot = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            getWeboHot() {
                this.$http.get('/apis/opinionReport/getWeboOpinionHot.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.weboHot = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            }
        },
        mounted(){
            this.getOpinionHot();
            this.getOpinionMonitor();
            this.getVectorDistribution();
            this.getVectorTable();
            this.getUnivsMediaFocus();
            this.getWechatHot();
            this.getWeboHot();
        },
        created() {
            this.param = this.$route.query;
            this.setBreadCrumb();
        }
    }
</script>