/**
* Created by lifei on 2017/3/21.
*/

<template>
    <div class="article-container" id="articleContainer" :data="articleData">
        <div class="article" v-for="(item, index) in articleData">
            <div class="article-left">
                <div class="checkbox-div">
                    <el-checkbox></el-checkbox>
                </div>
            </div>
            <div class="article-right">
                <div class="article-title-box">
                    <p class="article-title">
                        <span>{{item.title}}</span>
                        <i class="title-icon positive-icon" v-if="item.emotion == 'positive'"></i>
                        <i class="title-icon negative-icon" v-else></i>
                    </p>
                    <p class="button-box">
                        <el-button type="warning" class="article-danger-button" v-if="item.hasWarn"
                                   @click="alertBtnClick(item)" :loading="item.loading">
                            取消预警
                        </el-button>
                        <el-button type="info" class="article-danger-button" v-else
                                   @click="alertBtnClick(item)" :loading="item.loading">
                            添加预警
                        </el-button>
                    </p>
                </div>
                <p class="article-main">
                    {{item.content}}
                </p>
                <p class="article-describe">
                    <span class="article-source">
                        来源： {{item.source}}
                    </span>
                    <span class="article-author">
                        作者： {{item.author}}
                    </span>
                    <span class="article-clickNum blue">
                        阅读量： {{item.hitCount}}
                    </span>
                    <span class="article-publishDate blue">
                        发布时间：{{item.publishDateTime}}
                    </span>
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
                                color: #22ac38;
                                border: 1px solid #22ac38;
                            }

                            .positive-icon::before{
                                content: '正面';
                            }

                            .negative-icon{
                                color: #e60012;
                                border: 1px solid #e60012;
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
                    text-align: right;

                    .article-source{
                        margin-right: 14px;
                    }
                    .article-author, .article-clickNum{
                        margin-right: 16px;
                    }

                    article-publishDate{
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
                    margin-top:10px;
                    overflow: hidden;
                }
            }

            .article-danger-button{
                float: right;
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
        &.dark{
             background-color: #21273d;
            .article{
                border-bottom-color: rgba(96,163,255,.1);
            }
            .article-left{
                border-right-color:rgba(96,163,255,.1);
            }
            .article-right{
                color:#d0d7ff;
                .article-title-box{
                    .article-title{
                        color:#60a3ff;
                    }
                }
            }
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
                item.loading = true;
                console.log(item);
                this.$nextTick(function () {
                    var tmp = {};
                    tmp.id = item.id;
                    tmp.hasWarn = !item.hasWarn;
                    tmp.emotion = item.emotion;
                    tmp.vector = item.vector;
                    tmp.hitCount = item.hitCount;
                    tmp.publishDateTime = item.publishDateTime;

                    this.$http.post('/apis/opinionWarn/warnOrCancel.json', tmp).then(
                        (response) => {
                            if (response.data.success) {
                                if (!item.hasWarn) {
                                    item.hasWarn = true;
                                    this.$notify({
                                        title: '成功',
                                        message: '添加预警成功',
                                        type: 'success',
                                        duration: 2000
                                    });
                                } else {
                                    item.hasWarn = false;
                                    this.$notify({
                                        title: '成功',
                                        message: '取消预警成功',
                                        type: 'success',
                                        duration: 2000
                                    })
                                }
                                item.loading = false;
                            } else {
                                console.error(response.data.message);
                            }
                        }, (response) => {
                            console.error(response);
                        }
                    );
                });
            }
        },
        props: ["articleData"]
    }
</script>