<template>
    <div class="wechatDetail">
        <div class="info-wrap space">
            <div class="logo-div">
                <img src="../../../../assets/images/university-logo-temp.png" alt="" class="logo">
            </div>
            <div class="info">
                <p>微信昵称： 北京大学</p>
                <p>微信认证：北京大学官方微信、教育管委联盟成员 </p>
                <p>学校：北京大学</p>
                <p>所在地： 北京</p>
                <p>简介： 发布北大权威信息，展示北大校园生活，服务广大师生校友，哈哈哈发布北大权威信息，展示北大校园生活，服务广大师生校友，哈哈哈发布北大权威信息，展示北大校园生活，服务广大师生校友，哈哈哈 </p>
            </div>
            <div class="btn-area">
                <div class="btn attention">
                    <el-button type="primary" icon="plus">关注</el-button>
                </div>
                <div class="btn alert">
                    <el-button type="primary" icon="plus">预警</el-button>
                </div>
            </div>
            <div class="qrcode-area">
                <img src="../../../../assets/images/qrcode-temp.png" alt="">
            </div>
        </div>
        <div class="summary-wrap space">
            <div class="left">
                <p>微信全量统计</p>
            </div>
            <div class="right">
                <div class="data-area">
                    <p class="data bigSize">60</p>
                    <p class="data smallSize">2月22日 排行</p>
                </div>
                <div class="data-area">
                    <p class="data bigSize">0.89</p>
                    <p class="data smallSize">当天指数</p>
                </div>
                <div class="data-area">
                    <p class="data bigSize">1260</p>
                    <p class="data smallSize">发博量</p>
                </div>
                <div class="data-area">
                    <p class="data bigSize">102</p>
                    <p class="data smallSize">关注量</p>
                </div>
                <div class="data-area">
                    <p class="data bigSize">610</p>
                    <p class="data smallSize">粉丝量</p>
                </div>
                <div class="data-area">
                    <p class="data bigSize">20</p>
                    <p class="data smallSize">转发量</p>
                </div>
                <div class="data-area">
                    <p class="data bigSize">260</p>
                    <p class="data smallSize">评论数</p>
                </div>
                <div class="data-area">
                    <p class="data bigSize">570</p>
                    <p class="data smallSize">点赞总数</p>
                </div>
            </div>

        </div>
        <div class="graph-wrap space">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-card class="box-card educationBox">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>活跃指数变化</span>
                        </div>
                        <div class="text item" id="activeIndexGraph"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs shorter-tabs" @tab-click="rankArticleTabClick" v-model="activeNameOne">
                        <el-tab-pane label="排名变化" name="rank" class="is-active">
                            <el-card class="box-card educationBox">
                                <div class="rankChange text item" id="rankGraph"></div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="发布文章数" name="publish">
                            <el-card class="box-card educationBox">
                                <div class="publishNum text item" id="articleGraph"></div>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs shorter-tabs" @tab-click="supportHitSumClick" v-model="activeNameTwo">
                        <el-tab-pane label="总阅读量" name="hitSum" class="is-active">
                            <el-card class="box-card educationBox">
                                <div class="rankChange text item" id="hitSumGraph"></div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="总点赞量" name="supportSum">
                            <el-card class="box-card educationBox">
                                <div class="publishNum text item" id="supportSumGraph"></div>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs shorter-tabs" @tab-click="supportHitAvgTabClick" v-model="activeNameThree">
                        <el-tab-pane label="平均阅读量" name="hitAvg" class="is-active">
                            <el-card class="box-card educationBox">
                                <div class="rankChange text item" id="hitAvgGraph"></div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="平均点赞量" name="supportAvg">
                            <el-card class="box-card educationBox">
                                <div class="publishNum text item" id="supportAvgGraph"></div>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
        <div class="article-wrap">
            <div class="content space dark">
                <div class="content-bar">
                    <ul class="content-bar-list" id="sortUl">
                        <li>
                            文章排行
                        </li>
                        <li class="pointer selected" @click="sort('orinigal')">
                            获取日期
                        </li>
                        <li class="pointer" @click="sort('today')">
                            今日
                        </li>
                        <li class="pointer" @click="sort('yesterday')">
                            昨日
                        </li>
                        <li class="pointer" @click="sort('range')">
                            一周热门
                        </li>
                    </ul>
                    <div class="content-bar-pagination">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleCurrentChange"
                                       :current-page="articleParam.pageNumber + 1"
                                       :page-size="5"
                                       layout="prev, next, jumper, total"
                                       :total="total">
                        </el-pagination>
                    </div>
                </div>
                <articleView :articleData="articleData"></articleView>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .wechatDetail{

        .space{
            margin-top: 15px;
            background: #21273d;
        }
        .info-wrap{
            height: 220px;

            .logo-div{
                display: inline-block;
                height: 118px;
                width: 118px;
                margin: 42px 60px 60px 54px;

                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .info{
                display: inline-block;
                width: calc(100% - 642px);
                height: 100%;
                vertical-align: top;
                border-right: 1px solid #383451;

                p{
                    width: calc(100% - 40px);
                    height: 28px;
                    line-height: 28px;
                    overflow: hidden;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                p:first-child{
                    margin-top: 40px;
                }
            }

            .btn-area{
                display: inline-block;
                height: 100%;
                vertical-align: top;
                margin-left: 49px;

                .btn{
                    margin-top: 40px;
                }
            }

            .qrcode-area{
                display: inline-block;
                width: 162px;
                height: 162px;
                margin: 26px 57px 32px 50px;
                vertical-align: top;
                padding: 8px;
            }
        }

        .summary-wrap{
            height: 114px;

            .left{
                display: inline-block;
                width: 176px;
                height: 100%;
                line-height: 114px;
                text-align: center;
            }

            .right{
                display: inline-block;
                width: calc(100% - 180px);
                vertical-align: top;
                height: 100%;

                .data-area{
                    display: inline-block;
                    width: calc(100% / 9);

                    .data{
                        text-align: center;
                    }

                    .bigSize{
                        font-size: 26px;
                        margin-top: 30px;
                    }
                }
            }
        }


        .graph-wrap{

            .custom-tabs.left-tabs{
                .el-tabs__header{
                    height: 64px;
                    padding-top: 18px;
                    padding-bottom: 18px;
                }

                .el-tabs__content{
                    .el-card__body{
                        padding-top: 0px;
                    }
                }
            }
        }

        .article-wrap{
            .content{
                .content-bar-list{
                    width: 490px;

                    .selected{
                        color: #60a3ff;
                    }
                }
            }
        }
    }
</style>
<script>
    import echarts from "echarts"
    import articleView from "../../../../components/content/article.vue";

    export default{
        data(){
            return {
                articleParam: {
                    pageSize: 5,
                    pageNumber: 0
                },
                requestParam: {
                    author: '',
                    startDate: '',
                    endDate: '',
                },
                total: 0,
                articleData: [],
                activeNameOne: 'rank',
                activeNameTwo: 'hitSum',
                activeNameThree: 'hitAvg',
                rankOption: [],
                articleOption: [],
                supportSumOption: [],
                hitSumOption: [],
                supportAvgOption: [],
                hitAvgOption: [],
                originalStartDate: '',
                originalEndDate: ''
            }
        },
        components:　{articleView},
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"业务平台",to:{path:"/home/seeWechat"}
                    },
                    {
                        name:"微信监测", to:{path: "/home/seeWechat"}
                    },
                    {
                        name: "指数详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
                this.getArticleList();
            },

            getBlogSupportAvgData(){
                let chart = echarts.init(document.getElementById('activeIndexGraph'));
                chart.showLoading();
                this.$http.post('/apis/businessTool/getWechatActiveIndexData.json', this.requestParam).then(
                    (response) => {
                        if(response.data.success){
                            chart.setOption(response.data.data.echart);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });
                        }else {
                            console.error(response.data.message);
                        }
                    }
                )
            },

            getRankAndArticleData(){
                //因为存在tab页  只初始化默认显示的chart
                let chart = echarts.init(document.getElementById('rankGraph'));
                chart.showLoading();
                this.$http.post('/apis/businessTool/getWechatRankAndArticleNumData.json', this.requestParam).then(
                    (response) => {
                        if(response.data.success){
                            let option = response.data.data.echart;
                            let seriesOne = [], seriesTwo = [];

                            seriesOne.push(option.series[0]);//发布文章
                            seriesTwo.push(option.series[1]);//排行

                            let optionOne = Object.assign({}, option),
                                optionTwo = Object.assign({}, option);

                            optionOne.series = seriesOne;//发布文章
                            optionOne.legend = {data: ['发布文章']};
                            optionTwo.series = seriesTwo;//排名变化
                            optionTwo.legend = {data: ['排行']};
                            this.rankOption = optionTwo;
                            this.articleOption = optionOne;
                            chart.setOption(this.rankOption);
                            this.$nextTick(function () {
                                chart.hideLoading();
                            });
                        }else{
                            console.error(response.data.message);
                        }
                    }
                )
            },

            //tab的切换 每次都要重新初始化一下echart
            rankArticleTabClick(event){
                this.$nextTick(function () {
                    if(event.index == 0){
                        let chart = echarts.init(document.getElementById('rankGraph'));
                        chart.setOption(this.rankOption);
                    }else {
                        let chart = echarts.init(document.getElementById('articleGraph'));
                        chart.setOption(this.articleOption);
                    }
                });
            },

            getSupportHitSumData(){
                //因为存在tab页  只初始化默认显示的chart
                let chart = echarts.init(document.getElementById('hitSumGraph'));
                chart.showLoading();
                this.$http.post('/apis/businessTool/getWechatSupportAndHitSumData.json', this.requestParam).then(
                    (response) => {
                        if(response.data.success){
                            let option = response.data.data.echart;
                            let seriesOne = [], seriesTwo = [];

                            seriesOne.push(option.series[0]);//关注量
                            seriesTwo.push(option.series[1]);//粉丝量
                            
                            let optionOne = Object.assign({}, option),
                                optionTwo = Object.assign({}, option);
                            optionOne.series = seriesOne;//总阅读
                            optionOne.legend = {data: ['总阅读量']};
                            optionTwo.series = seriesTwo;//总点赞
                            optionTwo.legend = {data: ['总点赞量']};
                            this.hitSumOption = optionOne;
                            this.supportSumOption = optionTwo;
                            chart.setOption(this.hitSumOption);
                            this.$nextTick(function () {
                                chart.hideLoading();
                            });
                        }else{
                            console.error(response.data.message);
                        }
                    }
                )
            },

            supportHitSumClick(event){
                this.$nextTick(function () {
                    if(event.index == 0){
                        //总阅读
                        let chart = echarts.init(document.getElementById('hitSumGraph'));
                        chart.setOption(this.hitSumOption);
                    }else{
                        //总点赞
                        let chart = echarts.init(document.getElementById('supportSumGraph'));
                        chart.setOption(this.supportSumOption);
                    }
                });
            },
            
            getForwardSupportHitData(){
                let chart = echarts.init(document.getElementById('hitAvgGraph'));
                chart.showLoading();
                this.$http.post('/apis/businessTool/getWechatSupportAndHitAvgData.json', this.requestParam).then(
                    (response) => {
                        if(response.data.success){
                            let option = response.data.data.echart;
                            let seriesOne = [], seriesTwo = [];

                            seriesOne.push(option.series[0]);//点赞
                            seriesTwo.push(option.series[1]);//阅读

                            let optionOne = Object.assign({}, option),
                                optionTwo = Object.assign({}, option);
                            optionOne.series = seriesOne;//平均点赞量
                            optionOne.legend = {data: ['平均点赞量']};
                            optionTwo.series = seriesTwo;//平均阅读量
                            optionTwo.legend = {data: ['平均阅读量']};

                            this.hitAvgOption = optionTwo;
                            this.supportAvgOption = optionOne;

                            chart.setOption(this.hitAvgOption);
                            this.$nextTick(function () {
                                chart.hideLoading();
                            });
                        }
                    }
                )
            },

            supportHitAvgTabClick(event){
                this.$nextTick(function () {
                    if(event.index == 0){
                        //平均阅读
                        let chart = echarts.init(document.getElementById('hitAvgGraph'));
                        chart.setOption(this.hitAvgOption);
                    }else if(event.index == 1){
                        //平均点赞
                        let chart = echarts.init(document.getElementById('supportAvgGraph'));
                        chart.setOption(this.supportAvgOption);
                    }
                });
            },

            getWechatArticleList(){
//                console.log(this.articleParam)
                this.$http.post('/apis/businessTool/getWechatArticleData.json', this.articleParam).then(
                    (response) => {
                        console.log(response.data)
                        this.articleData = response.data.data.page.content;
                    }
                )
            },

            sort(param){
                let date = new Date();
                $('#sortUl li').removeClass('selected');
                if(param == 'today'){
                    //
                    $('#sortUl li:eq(2)').addClass('selected');
                    this.articleParam.startDate = date.format('yyyy-MM-dd 00:00:00');
                    this.articleParam.endDate = date.format('yyyy-MM-dd 23:59:59');
                }else if(param == 'yesterday'){
                    $('#sortUl li:eq(3)').addClass('selected');
                    let yesterday = date.getTime() - 24 * 3600 * 1000;
                    this.articleParam.startDate = new Date(yesterday).format('yyyy-MM-dd 00:00:00');
                    this.articleParam.endDate = new Date(yesterday).format('yyyy-MM-dd 23:59:59');
                }else if(param == 'range'){
                    $('#sortUl li:eq(4)').addClass('selected');
                    let week = date.getTime() - 24 * 7 * 3600 * 1000;
                    this.articleParam.startDate = new Date(week).format('yyyy-MM-dd 00:00:00');
                    this.articleParam.endDate = date.format('yyyy-MM-dd 23:59:59');
                }else{
                    $('#sortUl li:eq(1)').addClass('selected');
                    this.articleParam.startDate = this.originalStartDate;
                    this.articleParam.endDate = this.originalEndDate;
                }

                this.getWechatArticleList();
            },
        },
        created(){
            let data = this.$route.query;
//            this.requestParam.author = data.author;
//            this.articleParam.author = data.author;
            //因为后台数据库的原因  暂时athor写死
            this.requestParam.author = '南京大学';
            this.articleParam.author = '南京大学';
            //父级传的参数没有起止时间 则默认为今天
            if(data.startDate == undefined){
                let date = new Date();
                this.requestParam.startDate = date.format('yyyy-MM-dd 00:00:00');
                this.requestParam.endDate = date.format('yyyy-MM-dd 23:59:59');
                this.articleParam.startDate = date.format('yyyy-MM-dd 00:00:00');
                this.articleParam.endDate = date.format('yyyy-MM-dd 23:59:59');
                this.originalStartDate = date.format('yyyy-MM-dd 00:00:00');
                this.originalEndDate = date.format('yyyy-MM-dd 23:59:59');
            }else{
                this.requestParam.startDate = data.startDate;
                this.requestParam.endDate = data.endDate;
                this.articleParam.startDate = data.startDate;
                this.articleParam.endDate = data.endDate;
                this.originalStartDate = data.startDate;
                this.originalEndDate = data.endDate;
            }
            this.setBreadCrumb();
        },
        mounted(){
            this.getBlogSupportAvgData();
            this.getRankAndArticleData();
            this.getSupportHitSumData();
            this.getForwardSupportHitData();
            this.getWechatArticleList();
        }
    }
</script>