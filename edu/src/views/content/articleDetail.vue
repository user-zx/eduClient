/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="article-detail-news">
        <h2 class="article-title">
            {{article.title}}
        </h2>

        <div class="detail-left">
            <div class="article-info">
                <div class="info-item">
                    <div class="btn-wrap">
                        <el-dropdown class="event-store-box" trigger="click">
                            <el-button type="primary" class="addToEventStore">
                                添加到事件库
                            </el-button>
                            <el-dropdown-menu slot="dropdown" class="event-store-item">
                                <el-dropdown-item>事件1</el-dropdown-item>
                                <el-dropdown-item>事件2</el-dropdown-item>
                                <el-dropdown-item>事件3</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="share">
                        分享到:
                        <i class="icon icon-weibo">微博图标</i>
                        <i class="icon icon-wechat">微信图标</i>
                        <i class="icon icon-qqweibo">qq微博图标</i>
                        <i class="icon icon-qqZone">qq空间图标</i>
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
                        <span v-else-if="article.emotion == 'neutral'">
                            中性
                        </span>
                        <span v-else>
                            负面
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
                    <span class="describe">阅读量： </span> {{article.hitCount}}
                </p>
                <p class="item commentNum">
                    <span class="describe">评论量： </span>
                    {{article.replyCount}}
                </p>
                <p class="item repostNum">
                   <span class="describe">转发量：</span>
                </p>
                <p class="item likeNum">
                    <span class="describe">点赞量： </span>
                    {{article.supportCount}}
                </p>
                <div class="btn-wrap">
                    <el-button type="primary" class="focus-btn" icon="plus">
                        关注
                    </el-button>
                    <el-button type="primary"  class="alert-btn" icon="plus">
                        预警
                    </el-button>
                </div>
            </div>
            <div class="bottom-box">
                <div class="title">
                    相匹配文章
                </div>
                <div class="related-article">
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业 教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
                    <div class="related-title pointer">
                        教育部部长陈宝生：让教师成为让人羡慕的职业
                    </div>
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

                        .icon{
                            margin-left:10px;
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
                    text-align: center;
                    margin-top: 30px;
                    color: #60a3ff;

                    .describe{
                        display: inline-block;
                        width: 100px;
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
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                article: {
                    id: ''
                }
            }
        },
        components:{} ,
        methods:{
            getArticleDetailsById(){
                if(this.article.id == ''){
                    this.$message.error('参数错误');
                    return
                }

                this.$http.post('/apis/lib/getArticleDetailsById.json', {id: this.article.id}).then(
                    function (response) {
                        if(response.data.success){
                            this.article = response.data.data;
                            console.log(this.article)
                        }else{
                            this.$message.error('出错了， 请稍后再试');
                        }
                    }
                );
            }
        },
        mounted(){
            this.getArticleDetailsById();
        },
        created(){
            this.article.id = this.$route.query.id;
        }
    }
</script>