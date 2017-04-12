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
                            <span class="icons icons-chart"></span><span>行业内参概要</span>
                        </div>
                        <div class="text item">
                            <el-table :data="internalRefSummary" :resizable="false" style="width: 100%" border class="tran-table">
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
                            <span class="icons icons-chart"></span><span>人物TOP(前十)</span>
                        </div>
                        <div class="text item">
                            <el-table :data="personageTop10" class="tran-table" border style="width: 100%"
                                      :resizable="false">
                                <el-table-column label="排名" align="center" prop="all">
                                    <template scope="scope">
                                        <span v-if="scope.row.rank == 1">
                                            <i class="icon-rank icon-gold"></i>
                                        </span>
                                                        <span v-else-if="scope.row.rank == 2">
                                            <i class="icon-rank icon-silver"></i>
                                        </span>
                                                        <span v-else-if="scope.row.rank == 3">
                                            <i class="icon-rank icon-copper"></i>
                                        </span>
                                        {{scope.row.rank}}
                                     </template>
                                </el-table-column>
                                <el-table-column label="人物" prop="name" align="center">
                                    <template scope="scope">
                                        <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                                            {{scope.row.name}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="声量" prop="volume" align="center"></el-table-column>
                                <el-table-column label="总阅读量" prop="totalHitCount" align="center"></el-table-column>
                                <el-table-column label="热度" prop="hot" align="center"></el-table-column>
                                <el-table-column label="情感" prop="emotionVal" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="24">
                    <el-card class="box-card">
                        <div class="col-item item-left">
                            <div class="charts" id="personageTop10Chart" style="height: 400px;"></div>
                        </div>
                        <div class="col-item item-right">
                            <el-table :data="personageTop10Details" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title">
                                <el-table-column prop="rank" label="排名" align="center"></el-table-column>
                                <el-table-column prop="name" label="人物" align="center"></el-table-column>
                                <el-table-column prop="articleTotal" label="相关文章" align="center"></el-table-column>
                                <el-table-column prop="positive" label="正面文章" align="center"></el-table-column>
                                <el-table-column prop="negative" label="负面文章" align="center"></el-table-column>
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
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>两微洞察</span>
                        </div>
                        <div class="text item">
                            <el-table :data="webo" :resizable="false" style="width: 100%" border class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" prop="" label="排名" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="微博号" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="发博量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="关注量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="粉丝量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="转发量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="评论数" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="点赞总数" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="" label="平均点赞量" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="24">
                    <el-card class="box-card">
                        <div class="text item">
                            <el-table :data="wechat" :resizable="false" style="width: 100%" border class="tran-table">
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
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    import echarts from 'echarts';
    export default{
        data(){
            return {
                param: {},
                internalRefSummary: [],
                personageTop10: [],
                personageTop10Details: [],
                distributeData: [],
                wechat: [],
                webo: [],
                wechatHot: [],
                weboHot: [],
            }
        },
        components:{breadCrumb} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/home/industryNews"}
                    },
                    {
                        name:"内参报告",to:{path:"/home/report"}
                    },
                    {
                        name:"报告详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            downloadReport() {
            },
            findInternalRefSummary() {
                this.$http.get('/apis/internalRefReport/findInternalRefSummary.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.internalRefSummary = response.data.data;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            getPersonageRank() {
                this.loading = true;
                let chart = echarts.init(document.getElementById('personageTop10Chart'));
                chart.showLoading();
                this.$nextTick(function() {
                    this.$http.get('/apis/internalRefReport/findInternalRefPersonTOP10.json/' + this.param.id).then(
                        (response) => {
                            if (response.data.success) {
                                console.log(response.data.data);
                                chart.setOption(response.data.data.echarts);
                                chart.hideLoading();
                                this.personageTop10 = response.data.data.personTOP10;
                                this.personageTop10Details = response.data.data.tableData;
                                // 最多允许翻1000页
                                this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            } else {
                                console.error(response.data.message);
                            }
                            this.$nextTick(function() {
                                this.loading = false;
                            });
                        }, (response) => {
                            this.loading = false;
                            console.error(response);
                        }
                    );
                });
            },
            /**获取载体分布图*/
            getVectorDistribution() {
                let chart = echarts.init(document.getElementById('vectorDistributionChart'));
                chart.showLoading();
                this.$http.get('/apis/internalRefReport/findPersonNewsVectorDistributionByVector.json/' + this.param.id).then(
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
                this.$http.get('/apis/internalRefReport/getVectorTable.json/' + this.param.id).then(
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
                this.$http.get('/apis/internalRefReport/findUniversityMediaAttention.json/' + this.param.id).then(
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
            get2VSee() {
                this.$http.get('/apis/internalRefReport/findTwoMicroInsightIndexRanking.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            console.log(response.data.data);
                            this.wechat = response.data.data.wechat.content;
                            this.webo = response.data.data.webo.content;
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
            this.findInternalRefSummary();
            this.getPersonageRank();
            this.getVectorDistribution();
            this.getVectorTable();
            this.getUnivsMediaFocus();
            this.get2VSee();

            this.getWechatHot();
            this.getWeboHot();
        },
        created() {
            this.param = this.$route.query;
            this.setBreadCrumb();
        }
    }
</script>