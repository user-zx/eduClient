<template>
    <div class="weiboDetail">
        <div class="info-wrap space">
            <div class="logo-div">
                <img src="../../../../assets/images/university-logo-temp.png" alt="" class="logo">
            </div>
            <div class="info">
                <p>微博昵称： 北京大学</p>
                <p>微博认证：北京大学官方微博、教育管委联盟成员 </p>
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
                <p>微博全量统计</p>
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
                            <span class="icons icons-chart"></span><span>平均点赞量</span>
                        </div>
                        <div class="text item" id="likeAvg">
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs" @tab-click="handleClick" v-model="activeNameOne">
                        <el-tab-pane label="排名变化" name="rank" class="is-active">
                            <el-card class="box-card educationBox">
                                <div class="rankChange text item"></div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="发博量" name="publish">
                            <el-card class="box-card educationBox">
                                <div class="publishNum text item"></div>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs" @tab-click="handleClick" v-model="activeNameTwo">
                        <el-tab-pane label="关注量" name="focus" class="is-active">
                            <el-card class="box-card educationBox">
                                <div class="rankChange text item"></div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="粉丝量" name="fans">
                            <el-card class="box-card educationBox">
                                <div class="publishNum text item"></div>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12">
                    <el-tabs class="custom-tabs left-tabs" @tab-click="handleClick" v-model="activeNameThree">
                        <el-tab-pane label="转发量" name="repost" class="is-active">
                            <el-card class="box-card educationBox">
                                <div class="rankChange text item"></div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="评论数" name="comment">
                            <el-card class="box-card educationBox">
                                <div class="publishNum text item"></div>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="点赞总数" name="like">
                            <el-card class="box-card educationBox">
                                <div class="publishNum text item"></div>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
        <div class="article-wrap">
            <div class="content space  dark">
                <div class="content-bar">
                    <ul class="content-bar-list">
                        <li class="pointer">
                            <el-button>今日</el-button>
                        </li>
                        <li class="pointer">
                            <el-button>昨日</el-button>
                        </li>
                        <li class="pointer">
                            <el-button>一周热门</el-button>
                        </li>
                    </ul>
                    <div class="content-bar-page">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleCurrentChange"
                                       :current-page="param.pageNumber + 1"
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


        .article-wrap{
            .content{
                .content-bar-list{
                    width: 400px;
                }
            }
        }

    }
</style>
<script>

    import articleView from "../../../../components/content/article.vue"

    export default{
        data(){
            return {
                param: {
                    pageNumber: 0
                },
                total: 0,
                articleData: [],
                blogData: '',
                activeNameOne: 'rank',
                activeNameTwo: 'focus',
                activeNameThree: 'repost'
            }
        },
        components:　{articleView},
        methods: {
            handleClick(){

            },
            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
                this.getArticleList();
            },

            getBlogSupportAvgData(){

                this.$http.post('/apis/businessTool/getMicroblogSupportAvgData.json').then(
                    (response) => {
                        console.log(response.data)
                    }
                )
            },
        },
        created(){
            this.blogData = this.$route.query;
        },
        mounted(){

        }
    }
</script>