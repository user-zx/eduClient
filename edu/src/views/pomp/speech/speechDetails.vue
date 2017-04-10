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
                    <el-button type="primary" @click="addEvent">下载</el-button>
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
                            <div class="charts" id="vectorDistributionChart" style="height: 400px;"></div>
                        </div>
                        <div class="col-item item-right">
                            <el-table :data="distributeData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
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
                            <span class="icons icons-chart"></span><span>站点分布TOP10</span>
                        </div>
                        <div class="col-item item-left">
                            <div class="charts" id="sourceTop10" style="height: 400px;"></div>
                        </div>
                        <div class="col-item item-right">
                            <el-table :data="sourceTop10" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                                <el-table-column prop="rank" label="排名" align="center"></el-table-column>
                                <el-table-column prop="name" label="媒体名称" align="center"></el-table-column>
                                <el-table-column prop="relevant" label="相关文章数" align="center"></el-table-column>
                                <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                                <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>人物活跃度TOP10</span>
                        </div>
                        <div class="col-item item-left">
                            <div class="charts" id="personageTop10" style="height: 400px;"></div>
                        </div>
                        <div class="col-item item-right">
                            <el-table :data="personageTop10" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                                <el-table-column prop="rank" label="排名" align="center"></el-table-column>
                                <el-table-column prop="name" label="人物" align="center"></el-table-column>
                                <el-table-column prop="relevant" label="相关文章数" align="center"></el-table-column>
                                <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                                <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-card class="box-card educationBox">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>微信热点</span>
                        </div>
                        <div class="text item">
                            <el-card class="box-card educationBox" style="border: 0px">
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
                    <el-card class="box-card educationBox">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>微博热点</span>
                        </div>
                        <div class="text item">
                            <el-card class="box-card educationBox" style="border: 0px">
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
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    import echarts from 'echarts';
    export default{
        data(){
            return {
                param: {},
                opinionHot: [],
                vectorTableColumn: [],
                vectorTableData: [],
                tableData: [],
                distributeData: [],
                sourceTop10: [],
                personageTop10: []
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
            onEventLoad() {
                this.param.startDate = this.eventDetail[0].monitorStartDateStr;
                this.param.endDate = this.eventDetail[0].monitorEndDateStr;
                this.param.keywords = this.eventDetail[0].eventKeyword.split(',');
                this.getVectorTrend();
                this.getVectorDistribution();
                this.getVectorTable();
                this.getSourceDistributionTop10();
                this.getPersonageTop10();
            },
            /**获取载体走势图*/
            getVectorTrend() {
                let chart = echarts.init(document.getElementById('vectorTrendsChart'));
                chart.showLoading();
                this.$http.post('/apis/eventAnalysis/getVectorTrend.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                            let data = response.data.data;
                            this.vectorTableColumn = data.xAxis.data;
                            for (let i = 0; i < data.series.length; i++) {
                                for (let j = 0; j < data.series[i].data.length; j++) {
                                    data.series[i][data.xAxis.data[j]] = data.series[i].data[j];
                                }
                            }
                            this.vectorTableData = data.series;

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
                this.$http.post('/apis/eventAnalysis/getVectorDistribution.json', this.param).then(
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
                this.$http.post('/apis/eventAnalysis/getVectorTable.json', this.param).then(
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
            /**获取站点分布top10*/
            getSourceDistributionTop10() {
                let chart = echarts.init(document.getElementById('sourceTop10'));
                chart.showLoading();
                this.$http.post('/apis/eventAnalysis/getSourceDistributionTop10.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            console.log(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                            let data = response.data.data;
                            for (let i = 0; i < data.yAxis.data.length; i++) {
                                let obj = {};
                                obj.rank = i + 1;
                                obj.name = data.yAxis.data[i];
                                obj.positive = data.series[0].data[i];
                                obj.negative = data.series[1].data[i];
                                obj.relevant = data.series[2].data[i];
                                this.sourceTop10.push(obj);
                            }

                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取人物top10*/
            getPersonageTop10() {
                let chart = echarts.init(document.getElementById('personageTop10'));
                chart.showLoading();
                this.$http.post('/apis/eventAnalysis/getPersonageTop10.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            console.log(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                            let data = response.data.data;
                            for (let i = 0; i < data.yAxis.data.length; i++) {
                                let obj = {};
                                obj.rank = i + 1;
                                obj.name = data.yAxis.data[i];
                                obj.positive = data.series[0].data[i];
                                obj.negative = data.series[1].data[i];
                                obj.relevant = data.series[2].data[i];
                                this.personageTop10.push(obj);
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
        },
        mounted(){

        },
        created() {
            this.param = this.$route.query;
            this.setBreadCrumb();
        }
    }
</script>