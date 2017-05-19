<template>
    <div class="weiboDetail">
        <div class="info-wrap space">
            <div class="logo-div">
                <img :src="blogInfo.microblogAvatar" alt="" class="logo">
            </div>
            <div class="info">
                <p>微博昵称： {{blogInfo.blogNickname}}</p>
                <p>微博认证：{{blogInfo.blogSubject}} </p>
                <p>学校：{{blogInfo.blogColleage}}</p>
                <p>所在地： {{blogInfo.blogAddress}}</p>
                <p>简介： {{blogInfo.instruction}} </p>
            </div>
            <div class="btn-area">
                <div class="btn attention">
                    <el-button :type="concerned == true ? 'warning' : 'primary'" icon="plus" @click="attentionClick" id="attentionBtn">
                        <span v-if="concerned == true">取消关注</span>
                        <span v-else>添加关注</span>
                    </el-button>
                </div>
                <div class="btn alert">
                    <warn-drop-down @onSaveWarn="saveWarn" v-show="warnPermission"></warn-drop-down>
                </div>
            </div>
        </div>
        <div class="summary-wrap space clearfix">
            <div class="left">
                <p>微博全量统计</p>
            </div>
           <div class="right">
               <div class="data-area">
                   <p class="data bigSize">{{blogData.rank}}</p>
                   <p class="data smallSize">{{parentEndDate}} 排行</p>
               </div>
               <div class="data-area">
                   <p class="data bigSize">{{blogData.sendCount}}</p>
                   <p class="data smallSize">发博量</p>
               </div>
               <div class="data-area">
                   <p class="data bigSize">{{blogData.concernsCount}}</p>
                   <p class="data smallSize">关注量</p>
               </div>
               <div class="data-area">
                   <p class="data bigSize">{{blogData.fansCount}}</p>
                   <p class="data smallSize">粉丝量</p>
               </div>
               <div class="data-area">
                   <p class="data bigSize">{{blogData.forwardCount}}</p>
                   <p class="data smallSize">转发量</p>
               </div>
               <div class="data-area">
                   <p class="data bigSize">{{blogData.replySum}}</p>
                   <p class="data smallSize">评论数</p>
               </div>
               <div class="data-area">
                   <p class="data bigSize">{{blogData.supportSum}}</p>
                   <p class="data smallSize">点赞总数</p>
               </div>
           </div>

        </div>
        <div class="graph-wrap">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-card class="box-card educationBox">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>平均点赞量</span>
                        </div>
                        <div class="text item" id="supportAvgGraph"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs shorter-tabs" @tab-click="rankSendTabClick" v-model="activeNameOne">
                        <el-tab-pane label="排名变化" name="rank" class="is-active">
                            <div class="rankChange text item" id="rankGraph"></div>
                        </el-tab-pane>
                        <el-tab-pane label="发博量" name="publish">
                            <div class="publishNum text item" id="sendGraph"></div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs shorter-tabs" @tab-click="concernFanTabClick" v-model="activeNameTwo">
                        <el-tab-pane label="关注量" name="focus" class="is-active">
                            <div class="rankChange text item" id="concernGraph"></div>
                        </el-tab-pane>
                        <el-tab-pane label="粉丝量" name="fans">
                            <div class="publishNum text item" id="fansGraph"></div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs shorter-tabs" @tab-click="forwardSupportHitTabClick" v-model="activeNameThree">
                        <el-tab-pane label="转发量" name="repost" class="is-active">
                            <div class="rankChange text item" id="forwardGraph"></div>
                        </el-tab-pane>
                        <el-tab-pane label="评论数" name="comment">
                            <div class="publishNum text item" id="hitGraph"></div>
                        </el-tab-pane>
                        <el-tab-pane label="点赞总数" name="like">
                            <div class="publishNum text item" id="supportGraph"></div>
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
                        <li class="pointer selected parentEndDate" @click="sort('original')">
                            {{parentEndDate}}
                        </li>
                        <li class="pointer dateRange" @click="sort('range')">
                            一周热门
                        </li>
                    </ul>
                </div>
                <articleView :articleData="articleData" :total="total" :pageNumber="articleParam.pageNumber" @onchange="pageChange"></articleView>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .weiboDetail{

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
                width: calc(100% - 428px);
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
                margin-left: 50px;

                .btn{
                    margin-top: 40px;
                }
            }
        }

        .summary-wrap{
            height: 114px;

            .left{
                float: left;
                width: 176px;
                height: 100%;
                line-height: 114px;
                text-align: center;
            }

            .right{
                float: right;
                width: calc(100% - 180px);
                vertical-align: top;
                height: 100%;

                .data-area{
                    display: inline-block;
                    width: calc(100% / 9);
                    margin-top: 32px;
                    height: 58px;

                    .data{
                        text-align: center;
                    }

                    .bigSize{
                        font-size: 26px;
                        line-height: 33px;
                        line-height: 33px;
                    }

                    .smallSize{
                        line-height: 25px;
                        height: 25px;
                    }
                }
            }
        }


        .graph-wrap{
            background: inherit;
            margin-top: 5px;

            .custom-tabs{
                .item{
                    height: 440px;
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
    import echarts from "echarts";
    import vintage from "../../../../vintage.json";
    import articleView from "../../../../components/content/article.vue";
    import warnDropDown from "../../../../components/dropdown/warnDropDown.vue";

    export default{
        data(){
            return {
                articleParam: {
                    pageSize: 5,
                    pageNumber: 0,
                    orders: [
                        {
                            property: 'hitCount',
                            direction: 'DESC'
                        },
                        {
                            property: 'publishDateTime',
                            direction: 'DESC'
                        }
                    ]
                },
                requestParam: {
                    id: '',
                    author: '',
                    startDate: '',
                    endDate: '',
                },
                total: 0,
                blogInfo: {
                    authcStatus: "",
                    belongDepartment: "",
                    blogAddress: "",
                    blogColleage: "",
                    blogNickname: "",
                    blogSubject: "",
                    instruction: "",
                    microblogAvatar: ""
                },
                articleData: [],
                blogData: '',
                activeNameOne: 'rank',
                activeNameTwo: 'focus',
                activeNameThree: 'repost',
                rankOption: [],
                sendOption: [],
                concernOption: [],
                fansOption: [],
                supportOption: [],
                hitOption: [],
                forwardOption: [],
                //上一级传来的结束时间  格式化为 1970-01-01
                parentEndDate: '',
                concerned:　false,
                warnPermission: true
            }
        },
        components:　{articleView, warnDropDown},
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"业务平台",to:{path:"/home/seeWeibo"}
                    },
                    {
                        name:"微博监测", to:{path: "/home/seeWeibo"}
                    },
                    {
                        name: "指数详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.articleParam.pageNumber = pageNumber - 1;
                this.getBlogArticleData();
            },

            getBlogInfoData(){
                let param = {
                    id: this.requestParam.id,
                    author:　this.requestParam.author
                }

                this.$http.post('/apis/businessTool/getMicroblogInfo.json', param).then(
                    (response) => {
                        if(response.data.success){
                            this.blogInfo = response.data.data;
                        }
                    }
                )
            },

            getBlogSupportAvgData(){
                let chart = echarts.init(document.getElementById('supportAvgGraph'), 'vintage');
                chart.showLoading();
                this.$http.post('/apis/businessTool/getMicroblogSupportAvgData.json', this.requestParam).then(
                    (response) => {
                        if(response.data.success){
                            let data = response.data.data.echart;
                            chart.setOption(data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });
                        }else {
                            console.error(response.data.message);
                        }
                    }
                )
            },

            getBlogRankAndSendData(){
                //因为存在tab页  只初始化默认显示的chart
                let chart = echarts.init(document.getElementById('rankGraph'), 'vintage');
                chart.showLoading();
                this.$http.post('/apis/businessTool/getMicroblogRankAndSendNumData.json', this.requestParam).then(
                    (response) => {
                        if(response.data.success){
                            let option = response.data.data.echart;
                            let seriesOne = [], seriesTwo = [];

                            seriesOne.push(option.series[0]);//发博量
                            seriesTwo.push(option.series[1]);//排行

                            let optionOne = Object.assign({}, option),
                                optionTwo = Object.assign({}, option);
                            optionOne.series = seriesOne;//发博量
                            optionOne.legend = {data: ['发博量']};
                            optionTwo.series = seriesTwo;//排名变化
                            optionTwo.legend = {data: ['排行']};
                            this.rankOption = optionTwo;
                            this.sendOption = optionOne;

                            this.$nextTick(function () {
                                chart.setOption(this.rankOption);
                                chart.hideLoading();
                            });
                        }else{
                            console.error(response.data.message);
                        }
                    }
                )
            },

            //tab的切换 每次都要重新初始化一下echart
            rankSendTabClick(event){
                this.$nextTick(function () {
                    if(event.index == 0){
                        let chart = echarts.init(document.getElementById('rankGraph'), 'vintage');
                        chart.setOption(this.rankOption);
                    }else {
                        let chart = echarts.init(document.getElementById('sendGraph'), 'vintage');
                        chart.setOption(this.sendOption);
                    }
                });
            },

            getConcernAndFansData(){
                //因为存在tab页  只初始化默认显示的chart
                let chart = echarts.init(document.getElementById('concernGraph'), 'vintage');
                chart.showLoading();
                this.$http.post('/apis/businessTool/getMicroblogConcersAndFansSumData.json', this.requestParam).then(
                    (response) => {

                        if(response.data.success){
                            let option = response.data.data.echart;
                            let seriesOne = [], seriesTwo = [];

                            seriesOne.push(option.series[0]);//关注量
                            seriesTwo.push(option.series[1]);//粉丝量

                            let optionOne = Object.assign({}, option),
                                optionTwo = Object.assign({}, option);
                            optionOne.series = seriesOne;//关注量
                            optionOne.legend = {data: ['关注量']};
                            optionTwo.series = seriesTwo;//粉丝量
                            optionTwo.legend = {data: ['粉丝量']};
                            this.fansOption = optionTwo;
                            this.concernOption = optionOne;

                            this.$nextTick(function () {
                                chart.setOption(this.concernOption);
                                chart.hideLoading();
                            });
                        }else{
                            console.error(response.data.message);
                        }
                    }
                )
            },

            concernFanTabClick(event){
                this.$nextTick(function () {
                    if(event.index == 0){
                        //关注量
                        let chart = echarts.init(document.getElementById('concernGraph'), 'vintage');
                        chart.setOption(this.concernOption);
                    }else{
                        //粉丝量
                        let chart = echarts.init(document.getElementById('fansGraph'), 'vintage');
                        chart.setOption(this.fansOption);
                    }
                });
            },

            //转发、评论、点赞后台请求
            getForwardSupportHitData(){
                let chart = echarts.init(document.getElementById('forwardGraph'), 'vintage');
                chart.showLoading();
                this.$http.post('/apis/businessTool/getMicroblogForwardAndSupportAndHitSumData.json', this.requestParam).then(
                    (response) => {
                        if(response.data.success){
                            let option = response.data.data.echart;
                            let seriesOne = [], seriesTwo = [], seriesThree = [];

                            seriesOne.push(option.series[0]);//评论量
                            seriesTwo.push(option.series[1]);//点赞量
                            seriesThree.push(option.series[2]);//转发量

                            let optionOne = Object.assign({}, option),
                                optionTwo = Object.assign({}, option),
                                optionThree = Object.assign({}, option);
                            optionOne.series = seriesOne;//关注量
                            optionOne.legend = {data: ['评论量']};
                            optionTwo.series = seriesTwo;//粉丝量
                            optionTwo.legend = {data: ['点赞量']};
                            optionThree.series = seriesThree;
                            optionThree.legend = {data: ['转发量']};

                            this.forwardOption = optionThree;
                            this.supportOption = optionTwo;
                            this.hitOption = optionOne;

                            this.$nextTick(function () {
                                chart.setOption(this.forwardOption);
                                chart.hideLoading();
                            });
                        }
                    }
                )
            },

            forwardSupportHitTabClick(event){
                this.$nextTick(function () {
                    if(event.index == 0){
                        //转发
                        let chart = echarts.init(document.getElementById('forwardGraph'), 'vintage');
                        chart.setOption(this.forwardOption);
                    }else if(event.index == 1){
                        //评论
                        let chart = echarts.init(document.getElementById('hitGraph'), 'vintage');
                        chart.setOption(this.hitOption);
                    }else{
                        //点赞
                        let chart = echarts.init(document.getElementById('supportGraph'), 'vintage');
                        chart.setOption(this.supportOption);
                    }
                });
            },

            getBlogArticleData(){
                this.$http.post('/apis/businessTool/getMicroblogArticleData.json', this.articleParam).then(
                    (response) => {
                        //没有数据
                        this.articleData = response.data.data.page.content;
                        this.total = response.data.data.page.totalElements;
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
                    $('#sortUl li.dateRange').addClass('selected');
                    this.articleParam.endDate = this.blogData.endDate;
                    //
                    let mill = new Date(this.parentEndDate).getTime() - 8.64e7 * 6;
                    this.articleParam.startDate = new Date(mill).format('yyyy-MM-dd 00:00:00');
                }else{
                    $('#sortUl li.parentEndDate').addClass('selected');
                    this.articleParam.startDate = new Date(this.parentEndDate).format('yyyy-MM-dd 00:00:00');
                    this.articleParam.endDate = this.blogData.endDate;
                }
                this.getBlogArticleData();
            },

            attentionClick(){
                let param = {
                    content: this.blogData.author,
                    type: 4
                }

                //取消关注
                if(this.concerned){
                    this.$http.post('/apis/concerns/deleteConcernByTypeAndContent.json', param).then(
                        function (response) {
                            if(response.data.success){
                                this.$message({
                                    type: 'success',
                                    message: '取消关注成功'
                                });
                                this.concerned = false;
                            }else {
                                if(response.data.message != ''){
                                    this.$message.error(response.data.message);
                                }else {
                                    this.$message.error('取消关注失败，请稍后再试');
                                }
                            }
                        }
                    )
                }else {
                    //关注
                    this.$http.post('/apis/concerns/saveConcerns.json', param).then(
                        function (response) {
                            if(response.data.success){
                                this.$message({
                                    type: 'success',
                                    message: '关注成功'
                                });
                                this.concerned = true;
                            }else{
                                if(response.data.message != ''){
                                    this.$message(response.data.message);
                                }else {
                                    this.$message.error('关注失败，请稍后再试');
                                }
                            }
                        }
                    )
                }
            },

            pageChange(param){
                this.articleParam.pageNumber = param.pageNumber;
                this.articleParam.orders = param.orders;
                this.getBlogArticleData();
            },

            judgeConcerned(){
                let param = {
                    concernsContent: [this.blogData.author],
                    concernsType: 4,
                }

                //判断当前微博是否已关注； true 已关注  false 未关注
                this.$http.post('/apis/concerns/searchConcernsSingle.json', param).then(
                    function (response) {
                        if(response.data.success){
                            this.concerned = response.data.data;
                        }
                    }
                )
            },
            saveWarn(id) {
                let ids = [this.requestParam.author];
                let param = {
                    warnId: id,
                    contents: ids
                };
                this.$http.post('/apis/opinionWarn/saveWarnWeBo.json', param).then(
                    (response) => {
                        if (response.data.success) {
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success',
                                duration: 2000
                            });
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            }
        },
        created(){
            this.blogData = this.$route.query;
            this.requestParam.id = this.blogData.id;
            this.requestParam.author = this.blogData.author;
            this.articleParam.author = this.blogData.author;
            this.articleParam.id = this.blogData.id;

            if(this.blogData.startDate != undefined){
                this.requestParam.startDate = this.blogData.startDate;
                this.requestParam.endDate = this.blogData.endDate;
                this.articleParam.startDate = new Date(this.blogData.endDate).format('yyyy-MM-dd 00:00:00');
                this.articleParam.endDate = this.blogData.endDate;
                this.parentEndDate = this.blogData.endDate.substring(0,10);
            }
            this.setBreadCrumb();
        },
        mounted(){
            echarts.registerTheme('vintage', vintage);
            this.getBlogInfoData();
            this.getBlogSupportAvgData();
            this.getBlogRankAndSendData();
            this.getConcernAndFansData();
            this.getForwardSupportHitData();
            this.getBlogArticleData();
            this.judgeConcerned();
            this.$nextTick(function () {
                this.warnPermission = this.$root.$children[0].$children[0].warnPermission;
            });
        }
    }
</script>