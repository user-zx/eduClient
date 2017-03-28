/**
* Created by lifei on 2017/3/21.
*/

<template>
    <div class="article-container" id="article-container" :data="articleData">
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
                        阅读量： {{item.readNum}}
                    </span>
                    <span class="article-publishDate blue">
                        发布时间：{{item.publishDate}}
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
                msg: "",
                articleData: [
                    {
                        'title': '杂志赤峰学院学报栏目设置和论文参考的目录杂志赤峰学院学报栏目设置和论文参考的目录杂志赤峰学院学报栏目设置和论文参考的目录',
                        'attitude': 'positive',
                        'buttonType': 'warning',
                        'buttonText': '预警',
                        'source': '新浪博客',
                        'author': '梦想家期刊',
                        'readNum': '2342',
                        'publishDate': '2016-12-12 12:12',
                        'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                    },
                    {
                        'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                        'attitude': 'negative',
                        'buttonType': 'warning',
                        'buttonText': '预警',
                        'source': '新浪博客',
                        'author': '梦想家期刊',
                        'readNum': '2342',
                        'publishDate': '2016-12-12 12:12',
                        'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                    },
                    {
                        'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                        'attitude': 'positive',
                        'buttonType': 'warning',
                        'buttonText': '预警',
                        'source': '新浪博客',
                        'author': '梦想家期刊',
                        'readNum': '2342',
                        'publishDate': '2016-12-12 12:12',
                        'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                    },
                    {
                        'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                        'attitude': 'positive',
                        'buttonType': 'warning',
                        'buttonText': '预警',
                        'source': '新浪博客',
                        'author': '梦想家期刊',
                        'readNum': '2342',
                        'publishDate': '2016-12-12 12:12',
                        'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                    },
                    {
                        'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                        'attitude': 'negative',
                        'buttonType': 'warning',
                        'buttonText': '预警',
                        'source': '新浪博客',
                        'author': '梦想家期刊',
                        'readNum': '2342',
                        'publishDate': '2016-12-12 12:12',
                        'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                    }
                ]
            }
        },
        components: {},
        methods: {
            alertBtnClick(item){
                //向后台发送请求 改变预警状态 然后根据返回参数判断页面展示效果

                if(!item.alerted){
                    item.alerted = true;
                    item.buttonText = '取消预警';
                    this.$notify({
                        title: '成功',
                        message: '添加预警成功',
                        type: 'success',
                        duration: 2000
                    });
                }else {
                    item.alerted = false;
                    item.buttonText = '预警';
                    this.$notify({
                        title: '成功',
                        message: '取消预警成功',
                        type: 'success',
                        duration: 2000
                    })
                }

            }
        },
//        props: ["articleData"]
    }
</script>