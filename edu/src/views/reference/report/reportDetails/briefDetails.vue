<template>
    <div class="container">
        <div class="load-btn">
            <el-button type="primary" @click="downloadReport" :loading="loading">下载</el-button>
        </div>
        <div class="reportDetails" id="reportDetails">
            <div class="title-box">
                <div>
                    <h3 class="title">{{param.title}}</h3>
                </div>
                <div>
                    <h3 class="date">{{param.startDate}} 至 {{param.endDate}}</h3>
                </div>
            </div>
            <div class="eventCharts">
                <el-row :gutter="10">
                    <el-card class="box-card">
                        <div class="clearfix" slot="header">
                            <span class="icons icons-chart1"></span><span> 媒体热点</span>
                        </div>
                        <div class="text item">
                            <el-table class="tran-table" border style="width: 100%" :resizable="false" :data="mediaHotArticle">
                                <el-table-column label="序号" type="index" width="80"></el-table-column>
                                <el-table-column label="标题" prop="title" align="center"></el-table-column>
                                <el-table-column label="来源" prop="source" align="center" width="150"></el-table-column>
                                <el-table-column label="日期" prop="publishDate" align="center" width="150"></el-table-column>
                                <el-table-column label="报道学校" prop="college" align="center" width="150"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="icons icons-chart2"></span><span>人物TOP(前十)</span>
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
                                <span class="icons icons-chart4"></span><span>重点高校媒体关注度</span>
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
                                <span class="icons icons-chart5"></span><span>活跃微博排行</span>
                            </div>
                            <div class="text item">
                                <el-table :data="webo" :resizable="false" style="width: 100%" border class="tran-table">
                                    <el-table-column label="排名" align="center" width="110px">
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
                                    <el-table-column label="微博号" prop="author" align="center" :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column label="发博量" prop="sendCount" align="center" width="110px"></el-table-column>
                                    <el-table-column label="关注量" prop="concernsCount" align="center" width="110px"></el-table-column>
                                    <el-table-column label="粉丝量" prop="fansCount" align="center" width="110px"></el-table-column>
                                    <el-table-column label="转发量" prop="forwardCount" align="center" width="110px"></el-table-column>
                                    <el-table-column label="评论数" prop="replySum" align="center" width="110px"></el-table-column>
                                    <el-table-column label="点赞总数" prop="supportSum" align="center" width="110px"></el-table-column>
                                    <el-table-column label="平均点赞量" prop="supportAvg" align="center" width="110px"></el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="icons icons-chart5"></span><span>活跃微信排行</span>
                            </div>
                            <div class="text item">
                                <el-table :data="wechat" :resizable="false" style="width: 100%" border class="tran-table">
                                    <el-table-column label="排名" align="center" prop="rank">
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
                                    <el-table-column label="公众号" prop="author" align="center" :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column label="文章数" prop="articleCount" align="center"></el-table-column>
                                    <el-table-column label="总点赞量" prop="supportSum" align="center"></el-table-column>
                                    <el-table-column label="总阅读量" prop="hitSum" align="center"></el-table-column>
                                    <el-table-column label="平均阅读量" prop="hitAvg" align="center"></el-table-column>
                                    <el-table-column label="平均点赞量" prop="supportAvg" align="center"></el-table-column>
                                    <el-table-column label="活跃指数" prop="activityIndex" align="center"></el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-card class="box-card educationBox" style="margin-top: 0px">
                            <div slot="header" class="clearfix">
                                <span class="icons icons-chart6"></span><span>微信热点</span>
                            </div>
                            <div class="text item">
                                <el-card class="box-card educationBox">
                                    <el-table :data="wechatHot" :resizable="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="left" width="245">
                                            <template scope="scope" >
                                                    <span  class="pointer" @click="toDetail(scope.row)">
                                                        {{scope.row.title}}
                                                    </span>
                                            </template>
                                        </el-table-column>
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
                                <span class="icons icons-chart7"></span><span>微博热点</span>
                            </div>
                            <div class="text item">
                                <el-card class="box-card educationBox">
                                    <el-table :data="weboHot" :resizable="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="left" width="245">
                                            <template scope="scope">
                                                    <span class="pointer" @click="toDetail(scope.row)">
                                                        {{scope.row.title}}
                                                    </span>
                                            </template>
                                        </el-table-column>
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
    </div>
</template>
<style lang="scss" scoped>
 $img-url:url("../../../../assets/images/zhongtubiao@1x.png") no-repeat;
     .container {
         position: relative;
         .load-btn {
             position: absolute;
             top: 35px;
             right: 0;
             display: inline-block;
             .el-button{
                 padding:7px 15px;
             }
         }
     }
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
    .icons-chart1{
        width: 21px;
        height: 20px;
        background:  $img-url -14px -362px;
    }
    .icons-chart2{
        width: 21px;
        height: 17px;
        background:  $img-url -15px -398px;
    }
    .icons-chart3{
        width: 21px;
        height: 21px;
        background:  $img-url -14px -27px;
    }
    .icons-chart4{
        width: 24px;
        height: 18px;
        background:  $img-url -14px -424px;
    }
    .icons-chart5{
        width: 20px;
        height: 19px;
        background:  $img-url -50px -425px;
    }
    .icons-chart6{
        width: 24px;
        height: 20px;
        background:  $img-url -14px -117px;
    }
    .icons-chart7{
        width: 24px;
        height: 19px;
        background:  $img-url -48px -119px;
    }
</style>
<script>
    import echarts from 'echarts';
    import vintage from '../../../../vintage.json';
    import html2canvas from 'html2canvas';
    export default{
        data(){
            return {
                loading: false,
                wechatLoading: true,
                weboLoading: true,
                param: {},
                personageTop10: [],
                personageTop10Details: [],
                distributeData: [],
                wechat: [],
                webo: [],
                wechatHot: [],
                weboHot: [],
                hasCompleted: 0,
                mediaHotArticle: [
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},
                    {id: 1, title: '清华研究生参加毕业典礼要抽签？学校回应', source: '北京青年报', publishDate: '2016-01-01', college: '清华大学'},

                ]
            }
        },
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/home/industryNews"}
                    },
                    {
                        name:"教育简报",to:{path:"/home/report"}
                    },
                    {
                        name:"报告详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            downloadReport() {
                let obj = $('#reportDetails');
                let width = obj.width();
                let height = obj.height();
                let vm = this;
                html2canvas(obj[0], {
                    width: width,
                    height: height,
                    background: "rgba(20,23,37,1)",
                    onrendered: function (canvas) {
                        let ie = vm.isIE();
                        if (ie) {
                            let html = "<html><body style='margin: 0'>"
                                + "<img src='" + canvas.toDataURL() + "'>"
                                + "</body></html>";
                            let myWindow = window.open();
                            myWindow.document.write(html);
                            return;
                        }
                        let aTag = document.createElement("a");
                        aTag.href = canvas.toDataURL("image/png");
                        aTag.download = vm.param.title + '.png';
                        document.body.appendChild(aTag);
                        aTag.click();
                        document.body.removeChild(aTag);
                    }
                });
            },

            getPersonageRank() {
                echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(document.getElementById('personageTop10Chart'),'vintage');
                chart.showLoading();
                this.$nextTick(function() {
                    this.$http.get('/apis/briefReport/findInternalRefPersonTOP10.json/' + this.param.id).then(
                        (response) => {
                            if (response.data.success) {
                                chart.setOption(response.data.data.echarts);
                                chart.hideLoading();
                                this.personageTop10 = response.data.data.personTOP10;
                                this.personageTop10Details = response.data.data.tableData;
                                // 最多允许翻1000页
                                this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            } else {
                                console.error(response.data.message);
                            }
                            this.handleBack()
                        }, (response) => {
                            this.handleBack()
                            console.error(response);
                        }
                    );
                });
            },

            getVectorTable() {
                this.$http.get('/apis/briefReport/getVectorTable.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.distributeData = response.data.data;
                        } else {
                            console.error(response.data.message);
                        }
                        this.handleBack()
                    }, (response) => {
                        this.handleBack()
                        console.error(response);
                    }
                );
            },
            /**获取高校关注度*/
            getUnivsMediaFocus() {
                echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(document.getElementById('univsChart'),'vintage');
                chart.showLoading();
                this.$http.get('/apis/briefReport/findUniversityMediaAttention.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                        } else {
                            console.error(response.data.message);
                        }
                        this.handleBack()
                    }, (response) => {
                        this.handleBack()
                        console.error(response);
                    }
                );
            },
            get2VSee(vector) {
                let param = {pageNumber: 0, pageSize: 10, vector: [vector], startDate: this.param.startDate + ' 00:00:00', endDate: this.param.endDate + ' 23:59:59'};
                let apiUrl;
                if ("微博" == vector) {
                    this.weboLoading = true;
                    apiUrl = '/apis/businessTool/getMicroblogIndexData2.json';
                } else {
                    this.wechatLoading = true;
                    apiUrl = '/apis/businessTool/getWechatIndexData2.json';
                }
                this.$http.post(apiUrl, param).then(
                    (response) => {
                        if (response.data.success) {
                            if (!response.data.data) {
                                if (vector == "微博") {
                                    this.webo = [];
                                } else {
                                    this.wechat = [];
                                }
                                return;
                            }
                            let page = response.data.data.page
                            let content = page.content;
                            for (var i = 0; i < content.length; i++) {
                                content[i].rank = i + 1;
                            }
                            if (vector == "微博") {
                                this.webo = content;
                                this.weboLoading = false;
                            } else {
                                this.wechat = content;
                                this.wechatLoading = false;
                            }

                        } else {
                            console.error(response.data.message);
                        }
                        this.handleBack()
                    }, (response) => {
                        this.handleBack()
                        console.error(response);
                    }
                );
            },
            getWechatHot() {
                this.$http.get('/apis/briefReport/findWeChatInsightInfo.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.wechatHot = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                        this.handleBack()
                    }, (response) => {
                        console.error(response);
                        this.handleBack()
                    }
                );
            },
            getWeboHot() {
                this.$http.get('/apis/briefReport/findWeboInsightInfo.json/' + this.param.id).then(
                    (response) => {
                        if (response.data.success) {
                            this.weboHot = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                        this.handleBack()
                    }, (response) => {
                        console.error(response);
                        this.handleBack()
                    }
                );
            },
            handleBack() {
                if (++ this.hasCompleted == 9) {
                    this.loading = false;
                }
            },
            toDetail(data){
                this.$router.push({path: '/home/articleDetail', query: {id: data.id}});
            },
            isIE() {
                if (!!window.ActiveXObject || "ActiveXObject" in window)
                    return true;
                else
                    return false;
            }
        },
        mounted(){
            this.getPersonageRank();
            this.getVectorTable();
            this.getUnivsMediaFocus();
            this.get2VSee('微博');
            this.get2VSee('微信');
            this.getWechatHot();
            this.getWeboHot();
        },
        created() {
            this.param = this.$route.query;
            this.setBreadCrumb();
        }
    }
</script>