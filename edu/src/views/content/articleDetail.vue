/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="article-detail-news" v-loading="loading" element-loading-text="加载中……">
        <h2 class="article-title">
            {{article.title}}
        </h2>

        <div class="detail-left">
            <div class="article-info">
                <div class="info-item">
                    <div class="btn-wrap">
                        <drop-down @onSaveEvent="onSaveEvent"></drop-down>
                    </div>
                    <div class="share clearfix bdsharebuttonbox" data-tag="share_1">
                        <i>分享到: </i>
                        <a class="bds_tsina" data-cmd="tsina"></a>
                        <a class="bds_weixin" data-cmd="weixin"></a>
                        <a class="bds_tqq" data-cmd="tqq"></a>
                        <a class="bds_qzone" data-cmd="qzone"></a>
                    </div>
                </div>
                <div class="info-item">
                    <span class="item source">
                        来源： {{article.source}}
                    </span>
                    <span class="item type">
                    情感类型：
                        <span v-if="article.emotion == 'positive'">
                            正面
                        </span>
                        <span v-else-if="article.emotion == 'negative'">
                            负面
                        </span>
                        <span v-else>
                            中性
                        </span>
                    </span>
                </div>
                <div class="info-item">
                    <span class="item author">
                        作者：{{article.author}}
                    </span>
                    <span class="item relatedPeople">
                        相关人物：
                        <span v-if="article.reportPersonage != null" v-for="item in article.reportPersonage">
                            {{item}}
                        </span>
                    </span>
                </div>
                <div class="info-item">
                    <span class="item date">
                        日期： {{article.publishDate}}
                    </span>
                    <span class="item relatedCollege">
                        相关高校： <span v-for="item in article.university">{{item}} &nbsp;</span>
                    </span>
                </div>
                <div class="info-item">
                    <span class="item sourceLink">
                        来源站点： {{article.sourceLink}}
                    </span>
                </div>
            </div>
            <div class="article-content">
                {{article.content}}
            </div>
        </div>
        <div class="detail-right">
            <div class="top-box">
                <p class="item readNum">
                    <span class="describe">阅读量：</span>{{article.hitCount}}
                </p>
                <p class="item commentNum">
                    <span class="describe">评论量：</span>{{article.replyCount}}
                </p>
                <p class="item repostNum">
                    <span class="describe">转发量：</span>{{article.forwardCount}}
                </p>
                <p class="item likeNum">
                    <span class="describe">点赞量：</span>{{article.supportCount}}
                </p>
                <div class="btn-wrap">
                    <el-button v-if="article.hasConcern" @click="unfollow" type="primary" class="focus-btn">
                        取消关注
                    </el-button>
                    <el-button v-else @click="concernBtnClick" class="focus-btn">
                        添加关注
                    </el-button>
                    <el-button @click="warnBtnClick" v-if="article.hasWarn" type="primary"  class="alert-btn">
                        取消预警
                    </el-button>
                    <el-button @click="warnBtnClick" v-else class="alert-btn">
                        添加预警
                    </el-button>
                </div>
            </div>
            <div class="bottom-box">
                <div class="title">
                    相匹配文章
                </div>
                <div class="related-article">
                    <div v-for="art in similarArticles" class="related-title pointer"  @click="toDetail(art)">
                        {{art.title}}
                    </div>
                    <div class="no-data" v-if="similarArticles.length == 0">暂无匹配文章</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .article-detail-news{
        background: #fff;
        color: #000;

        .article-title{
            height: 110px;
            color: #60a3ff;
            line-height: 110px;
            border-bottom:1px solid #dbe9fb;
            text-align: center;
        }

        .detail-left{
            width: calc(70% - 90px);
            display: inline-block;
            vertical-align: top;
            margin-left: 70px;
            margin-bottom: 20px;
            border-left: 1px solid #dbe9fb;
            border-right: 1px solid #dbe9fb;
            border-bottom: 1px solid #dbe9fb;

            .article-info{
                margin-top: 20px;
                border-bottom:1px solid #dbe9fb;

                .info-item{
                    margin: 0px 20px 10px 30px;

                    .btn-wrap{
                        width: 50%;
                        display: inline-block;
                        vertical-align: top;
                    }
                    .share{
                        width: calc(50% - 10px);
                        display: inline-block;
                        vertical-align: top;
                        text-align: right;

                        a {
                            float: right;
                            display: inline-block;
                            width: 25px;
                            height: 26px;
                            margin: 0px 0px 0px 10px;
                            line-height: 26px;
                        }
                    }
                    .item{
                        display: inline-block;
                        width: 45%;
                    }
                    .sourceLink{
                        width: 100%;
                    }
                }

                .info-item:first-child{
                    margin-bottom: 30px;
                }

                .info-item:last-child{
                    margin-bottom: 30px;
                }
            }

            .article-content{
                margin: 20px;
                min-height: 500px;
                line-height: 30px;
            }
        }

        .detail-right{
            width: calc(30% - 10px);
            display: inline-block;
            vertical-align: top;

            .top-box{
                margin: 18px 0px 18px 20px;
                border:1px solid #dbe9fb;

                .item{
                    width: calc(50% - 2px);
                    vertical-align: top;
                    display: inline-block;
                    margin-top: 30px;
                    color: #60a3ff;

                    .describe{
                        display: inline-block;
                        width: 100px;
                        text-align: right;
                    }
                }

                .btn-wrap{
                    margin-top: 30px;
                    margin-bottom: 30px;
                    text-align: center;
                }
            }

            .bottom-box{
                margin: 18px 0px 18px 20px;
                border:1px solid #dbe9fb;

                .title{
                    height:40px;
                    line-height:40px;
                    color: #60a3ff;
                    background: #efefef;
                    padding-left:14px;
                }

                .related-title{
                    margin:10px 20px 20px 20px;
                    width: calc(100% - 40px);
                    overflow: hidden;
                    -ms-text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .related-title:first-child{
                    margin-top:30px;
                }
                .related-title:last-child{
                    margin-bottom: 30px;
                }
                .no-data {
                    text-align: center;
                    padding: 20px;
                }
            }
        }
    }
</style>
<script>
    import dropDown from "../../components/dropdown/dropdown.vue";
    export default{
        data(){
            return {
                loading: false,
                article: {
                    id: ''
                },
                similarArticles: []
            }
        },
        components:{dropDown} ,
        methods:{
            getArticleDetailsById(){
                if(this.article.id == ''){
                    this.$message.error('参数错误');
                    return;
                }
                this.loading = true;
                this.$http.post('/apis/lib/getArticleDetailsById.json', {id: this.article.id}).then(
                    function (response) {
                        if(response.data.success){
                            this.article = response.data.data.article;
                            this.similarArticles = response.data.data.similarArticles;
                            console.log(response.data.data);
                        }else{
                            this.$message.error('出错了， 请稍后再试');
                        }
                        this.loading = false;
                    }
                );
            },
            init: function () {
                let url = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5);
                let script = document.createElement('script')
                script.setAttribute('src', url)
                document.getElementsByTagName('head')[0].appendChild(script);
            },
            onSaveEvent(eventId) {
                let ids = [this.article.id];
                let param = {
                    eventId: eventId,
                    contents: ids
                };
                this.$http.post('/apis/eventAnalysis/saveEventArticle.json', param).then(
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
            },
            warnBtnClick() {
                var tmp = {};
                tmp.id = this.article.id;
                tmp.hasWarn = !this.article.hasWarn;
                tmp.emotion = this.article.emotion;
                tmp.vector = this.article.vector;
                tmp.hitCount = this.article.hitCount;
                tmp.publishDateTime = this.article.publishDateTime;
                this.$http.post('/apis/opinionWarn/warnOrCancel.json', tmp).then(
                    (response) => {
                        if (response.data.success) {
                            if (!this.article.hasWarn) {
                                this.article.hasWarn = true;
                                this.$message('添加预警成功');
                            } else {
                                this.article.hasWarn = false;
                                this.$message('取消预警成功');
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            concernBtnClick() {
                let followParam = {
                    concernsType: 1,
                    concernsContent: [this.article.id]
                };
                this.$http.post('/apis/concerns/saveConcernsMore.json',followParam).then(
                    (response) => {
                        if (response.data.success) {
                            this.$message("添加关注成功")
                            this.article.hasConcern = true;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            unfollow(){
                let followParam = {
                    concernsType: 1,
                    concernsContent: [this.article.id]
                };
                this.$http.post("/apis/concerns/removeConcernsMore.json", followParam).then(res=>{
                    if (res.data.success) {
                        if (res.data.data.message == null) {
                            this.$message("取消关注成功");
                            this.article.hasConcern = false;
                        } else {
                            this.$message(res.data.data.message)
                        }
                    }
                },err => {
                    console.log(err);
                });
            },
            toDetail(data){
                this.article.id = data.id;
                this.getArticleDetailsById();
            }
        },
        mounted(){
            this.getArticleDetailsById();
            window._bd_share_config = {
                share : [{
                    "bdSize" : 24
                }],
                slide : [{
                    bdImg : 0,
                    bdPos : "right",
                    bdTop : 100
                }],
                image : [{
                    viewType : 'list',
                    viewPos : 'top',
                    viewColor : 'black',
                    viewList : ['tsina','weixin','tqq','qzone']
                }],
                selectShare : [{
                    "bdselectMiniList" : ['tsina','weixin','tqq','qzone']
                }]
            }
            this.init();

        },
        created(){
            this.article.id = this.$route.query.id;
        }
    }
</script>