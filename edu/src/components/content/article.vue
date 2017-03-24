/**
* Created by lifei on 2017/3/21.
*/

<template>
    <div class="article-container" id="article-container">
        <div class="article" v-for="(item, index) in articleData">
            <div class="article-left">
                <el-checkbox></el-checkbox>
            </div>
            <div class="article-right">
                <div class="article-title-box">
                    <p class="article-title">
                        <span>{{item.title}}</span>
                        <i class="title-icon positive-icon" v-if="item.attitude == 'positive'"></i>
                        <i class="title-icon negative-icon" v-else></i>
                    </p>
                    <p class="button-box">
                        <el-button type="danger" class="article-danger-button" v-if="item.buttonType == 'warning'"
                                   @click="alertBtnClick(item)">
                            {{item.buttonText}}
                        </el-button>
                    </p>
                </div>
                <p class="article-describe">
                    <span class="article-source">
                        来源： {{item.source}}
                    </span>
                    <span class="article-author">
                        作者： {{item.author}}
                    </span>
                    <span class="article-clickNum blue">
                        阅读量： {{item.readNum}}
                    </span>
                    <span class="article-publishDate blue">
                        {{item.publishDate}}
                    </span>
                </p>
                <p class="article-main">
                    {{item.content}}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .article-container{
        background: #ffffff;

        .article{
            height: 196px;
            border-bottom: 1px solid #E3EDFB;

        .article-left{
            width: 6%;
            height: inherit;
            float: left;
            text-align: center;
            line-height: 198px;
            border-right: 1px solid #E3EDFB;
        }

            .article-right{
                height: inherit;
                width:94%;
                float: right;
                padding: 30px 30px 30px 12px;
                color: #6a6a6a;

                .article-title-box{
                    clear: both;
                    height: 28px;

                    .article-title{
                        font-weight: normal;
                        font-size: 20px;
                        width: 80%;
                        height: 28px;
                        float: left;
                        display: inline-block;
                        overflow: hidden;
                        position: relative;

                            span:first-child{
                                display: inline-block;
                                height:100%;
                                max-width: calc(100% - 58px);
                                overflow: hidden;
                                margin-right: 10px;
                            }
                            .title-icon{
                                position: absolute;
                                display: inline-block;
                                width: 46px;
                                font-size: 14px;
                                text-align: center;
                                border-radius: 3px;
                                top: 3px;
                            }

                            .positive-icon{
                                color: #e60012;
                                border: 1px solid #e60012;
                            }

                            .positive-icon::before{
                                content: '正面';
                            }

                            .negative-icon{
                                color: #22ac38;
                                border: 1px solid #22ac38;
                            }

                            .negative-icon::before{
                                content: '负面';
                            }
                    }
                    .button-box{
                        width: 20%;
                        display: inline-block;
                    }
                }

                .article-describe{
                    font-size: 12px;
                    margin-top: 10px;
                    margin-bottom: 10px;

                    .article-source{
                        margin-right: 14px;
                    }
                    .article-author{
                        margin-right: 16px;
                    }

                    span.article-publishDate{
                        float: right;
                        line-height: 20px;
                    }

                    .blue{
                        color: #85b8ff;
                        font-size:14px;
                    }
                }

                .article-main{
                    height: 70px;
                    line-height: 24px;
                    overflow: hidden;
                }
            }

            .article-danger-button{
                float: right;
                background: #c71b1b;
                margin-top: -8px;
                transition: width 0.5s;
                -moz-transition: width 0.5s; /* Firefox 4 */
                -webkit-transition:width 0.5s; /* Safari 和 Chrome */
                -o-transition: width 0.5s; /* Opera */
            }

            /*.article-danger-button-width{*/
                /*width: 88px;*/
            /*}*/
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: ""
            }
        },
        components: {},
        methods: {
            alertBtnClick(item){
                if(!item.alerted){
                    item.alerted = true;
                    item.buttonText = '取消预警';
                }else {
                    item.alerted = false;
                    item.buttonText = '预警';
                }
            }
        },
        props: ["articleData"]
    }
</script>