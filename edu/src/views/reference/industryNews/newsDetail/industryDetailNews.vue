/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="industry-detail-news">
        <h2 class="article-title">
            清华研究生参加毕业典礼要抽签
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
                    来源： 北京青年社
                </span>
                   <span class="item type">
                    情感类型：正面
                </span>
               </div>
               <div class="info-item">
                <span class="item author">
                    作者：疯狂的蜗牛
                </span>
                   <span class="item relatedPeople">
                    相关人物：美少女战士
                </span>
               </div>
               <div class="info-item">
                <span class="item date">
                    日期： 2019-01-01 12:12
                </span>
                   <span class="item relatedCollege">
                    相关高校： 火星理工大  火星文学院
                </span>
               </div>
               <div class="info-item">
                <span class="item from">
                    来源站点： https://www.taobao.com
                </span>
               </div>
           </div>
           <div class="article-content">
               我是文章内容，脑子是个好东西，可是我没有。哈哈哈哈
           </div>
       </div>
        <div class="detail-right">
            <div class="top-box">
                <p class="item readNum">
                    阅读量： 1212
                </p>
                <p class="item commentNum">
                    评论量： 1212
                </p>
                <p class="item repostNum">
                    转发量： 1212
                </p>
                <p class="item likeNum">
                    点赞量： 1212
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
    .industry-detail-news{
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
            border-left: 1px solid #dbe9fb;
            border-right: 1px solid #dbe9fb;

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
                }

                .info-item:first-child{
                    margin-bottom: 30px;
                }

                .info-item:last-child{
                    margin-bottom: 30px;
                }
            }

            .article-content{
                margin: 28px 20px 0 20px;
                min-height: 500px;
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

            }
        },
        components:{} ,
        methods:{
        },
        mounted(){
        },
        created(){

        }
    }
</script>