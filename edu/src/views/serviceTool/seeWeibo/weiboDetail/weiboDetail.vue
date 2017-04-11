<template>
    <div class="weiboDetail">
        <div class="info-wrap">
            <div class="logo-div">
                <img src="../../../../assets/images/university-logo-temp.png" alt="" class="logo">
            </div>
            <div class="info">
                <p>微博昵称： <span>北京大学</span></p>
                <p>微博认证：<span>北京大学官方微博、教育管委联盟成员</span> </p>
                <p>学校： <span>北京大学</span></p>
                <p>所在地： <span>北京</span></p>
                <p>简介： <span>发布北大权威信息，展示北大校园生活，服务广大师生校友，哈哈哈</span> </p>
            </div>
            <div class="btn-area">
                <el-button type="primary" icon="plus">关注</el-button>
                <el-button type="primary" icon="plus">预警</el-button>
            </div>
            <div class="qrcode-area">
                <img src="../../../../assets/images/qrcode-temp.png" alt="">
            </div>
        </div>
        <div class="summary-wrap">
            <div class="left">
                <p class="bigSize">2月22日</p>
                <p class="bigSize">排行</p>
                <p class="bigSize">60位</p>
                <p class="bigSize">当天指数</p>
                <p class="bigSize">0.89</p>
            </div>
            <div class="right">
                <div class="circle-wrap">
                    <div class="circle">
                        <div class="text">
                            <p class="title">发布文章数</p>
                            <p class="value">6</p>
                        </div>
                    </div>
                </div>
                <div class="circle-wrap">
                    <div class="circle">
                        <div class="text">
                            <p class="title">发布文章数</p>
                            <p class="value">6</p>
                        </div>
                    </div>
                </div>
                <div class="circle-wrap">
                    <div class="circle">
                        <div class="text">
                            <p class="title">发布文章数</p>
                            <p class="value">6</p>
                        </div>
                    </div>
                </div>
                <div class="circle-wrap">
                    <div class="circle">
                        <div class="text">
                            <p class="title">发布文章数</p>
                            <p class="value">6</p>
                        </div>
                    </div>
                </div>
                <div class="circle-wrap">
                    <div class="circle">
                        <div class="text">
                            <p class="title">发布文章数</p>
                            <p class="value">6</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="graph-wrap"></div>
        <div class="article-wrap"></div>
    </div>
</template>
<style lang="scss" scoped>
    .weiboDetail{
        .info-wrap{
            margin: 15px 20px 10px;
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
                display:  inline-block;
            }

            .btn-area{
                display: inline-block;
            }

            .qrcode-area{
                display: inline-block;
                width: 162px;
                height: 162px;

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
        components:　{},
        methods: {

        },
        created(){

        },
        mounted(){

        }
    }
</script>