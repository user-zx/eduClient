<template>
    <div id="refDetails" class="container">
        <div class="load-btn">
            <el-button type="primary" @click="downloadReport" :loading="loading">下载</el-button>
        </div>
        <div id="reportDetails" class="reportDetails">
            <div class="title-box">
                <div>
                    <h3 class="title">{{param.title}}</h3>
                </div>
                <div>
                    <h3 class="date">{{param.startDate}} 至 {{param.endDate}}</h3>
                </div>
            </div>
            <div class="introduction section">
                <h3 class="title">一、导读</h3>
                <div class="text">
                    慧数教育通过对教育行业大数据的解析、聚类、计算和挖掘，按照教育头条、人物动态、两微洞察和媒体声誉四大功能模块，对数据进行多维度的匹配。
                    本报告中总共有 <span class="red">180</span> 篇文章、 <span class="red">20</span> 位人物、 <span class="red">40</span> 个微博、
                     <span class="red">40</span> 个微信，
                    其中 <span class="red">教育头条50篇，省厅领导10位、高校领导10位、知名学者20位、省厅微信30条、省厅微博30条、高校微信30条、高校微博30条、
                    微博大V10条、微信大V10条，关键词云50个。</span>
                </div>
            </div>
            <div class="summarize section">
                <h3 class="title">二、内参概述</h3>
                <div class="text">
                    {{detail.summarize}}
                </div>
            </div>
            <div class="source section">
                <h3 class="title">三、信息来源统计</h3>
                <div class="echart-box">
                    <div id="sourceEchart"></div>
                </div>
            </div>
            <div class="emotion section">
                <h3 class="title">四、情感分布图</h3>
                <div class="echart-box">
                    <div id="emotionEchart"></div>
                </div>
            </div>
            <div class="reference section">
                <h3 class="title">五、内参关键词云</h3>
                <div class="echart-box">
                    <div id="cloudEchart"></div>
                </div>
            </div>
            <div class="eduTop section">
                <h3 class="title">教育头条</h3>
                <div class="subTitle">6.1、部委省厅</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                        <el-table-column label="文章标题" prop="title" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="来源" prop="source" align="center"></el-table-column>
                        <el-table-column label="媒体" prop="coverage" align="center" width="120"></el-table-column>
                        <el-table-column label="相同文章" prop="same" align="center" width="120"></el-table-column>
                        <el-table-column label="作者" prop="author" align="center" width="120"></el-table-column>
                        <el-table-column label="日期" prop="date" align="center" width="120"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">6.2、高校焦点</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                        <el-table-column label="文章标题" prop="title" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="来源" prop="source" align="center"></el-table-column>
                        <el-table-column label="媒体" prop="coverage" align="center" width="120"></el-table-column>
                        <el-table-column label="相同文章" prop="same" align="center" width="120"></el-table-column>
                        <el-table-column label="作者" prop="author" align="center" width="120"></el-table-column>
                        <el-table-column label="日期" prop="date" align="center" width="120"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">6.3、政策聚焦</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                        <el-table-column label="文章标题" prop="title" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="来源" prop="source" align="center"></el-table-column>
                        <el-table-column label="媒体" prop="coverage" align="center" width="120"></el-table-column>
                        <el-table-column label="相同文章" prop="same" align="center" width="120"></el-table-column>
                        <el-table-column label="作者" prop="author" align="center" width="120"></el-table-column>
                        <el-table-column label="日期" prop="date" align="center" width="120"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="character section">
                <h3 class="title">七、人物动态</h3>
                <div class="subTitle">7.1、部委省厅领导</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                        <el-table-column label="文章标题" prop="title" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="来源" prop="source" align="center"></el-table-column>
                        <el-table-column label="媒体" prop="coverage" align="center" width="120"></el-table-column>
                        <el-table-column label="相同文章" prop="same" align="center" width="120"></el-table-column>
                        <el-table-column label="作者" prop="author" align="center" width="120"></el-table-column>
                        <el-table-column label="日期" prop="date" align="center" width="120"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">7.2、高校领导</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">7.3、知名学者</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="seeClearly section">
                <h3 class="title">八、两微洞察</h3>
                <div class="subTitle">8.1、部委省厅微博排行</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">8.2、部委省厅微信排行</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">8.3、高校微博排行</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">8.4、高校微信排行</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="mediaFame section">
                <h3 class="title">九、媒体声誉</h3>
                <div class="subTitle">9.1、官媒报道</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">9.2、高校媒体声量排行</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="point section">
                <h3 class="title">大微观点</h3>
                <div class="subTitle">10.1、微博大V</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="subTitle">10.2、微信大V</div>
                <div class="table-wrap">
                    <el-table :data="provinceTable" :resizable="false" style="width: 100%" border class="tran-table">
                        <el-table-column label="排名" align="center" type="index"></el-table-column>
                        <el-table-column label="人物" prop="name" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="声量" prop="source" align="center"></el-table-column>
                        <el-table-column label="所在地区" prop="coverage" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="same" align="center"></el-table-column>
                        <el-table-column label="热度" prop="author" align="center"></el-table-column>
                        <el-table-column label="情感" prop="date" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="summary section">
                <h3 class="title">十一、小结</h3>
                <div class="text">

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .container {
        position: relative;
        .load-btn {
            position: absolute;
            top: 10px;
            right: 0;
            display: inline-block;
            .el-button{
                padding:7px 15px;
            }
        }
        .title-box {
            vertical-align: middle;
            padding-bottom: 20px;
            text-align: center;
            border-bottom: 2px solid #9A9A9A;

            .title {
                display: inline-block;
                max-width: 500px;
                font-size: 22px;
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #66a3ff;
            }

            .date {
                display: inline-block;
                max-width: 500px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .btn-box {
                display: inline-block;
                float: right;

                .el-button {
                    padding: 7px 15px;
                }
            }
        }

        .section{
            border-bottom: 1px solid #CFCFCF;
            padding: 20px 0px;

            h3.title{
                margin-bottom: 10px;
            }

            .text{
                line-height: 30px;
                text-indent: 2em;
            }

            span.red{
                color: red;
            }
        }
    }
</style>
<script>
    export default{
        data(){
           return{
               param: {},
               loading: false,
               detail: {
                   introduction: '慧数教育通过对教育行业大数据的解析、聚类、计算和挖掘，按照教育头条、人物动态、两微洞察和媒体声誉四大功能模块，对数据进行多维度的匹配。本报告中总共有180篇文章、20位人物、40个微博、40个微信，其中教育头条50篇，省厅领导10位、高校领导10位、知名学者20位、省厅微信30条、省厅微博30条、高校微信30条、高校微博30条、微博大V10条、微信大V10条，关键词云50个。',
                   summarize: ' 根据慧数教育情报大数据数据监测显示，2017年6月18日至20176月20日共监测数据20000条，其中负面信息2000条，占比10%，中性信息3000条，占比15%，正面信息15000条，占比75%。'
               },
               provinceTable: [
                   {
                       title: '2017年山东高招会启动 本科录取率有望突破50%',
                       source: 'http://yuqing.china.com.cn/show/157708.html',
                       coverage: '中国舆情网',
                       same: 30,
                       author: '海伦 凯勒',
                       date: '2017-01-01'
                   },
                   {
                       title: '2017年山东高招会启动 本科录取率有望突破50%',
                       source: 'http://yuqing.china.com.cn/show/157708.html',
                       coverage: '中国舆情网',
                       same: 30,
                       author: '海伦 凯勒',
                       date: '2017-01-01'
                   },
                   {
                       title: '2017年山东高招会启动 本科录取率有望突破50%',
                       source: 'http://yuqing.china.com.cn/show/157708.html',
                       coverage: '中国舆情网',
                       same: 30,
                       author: '海伦 凯勒',
                       date: '2017-01-01'
                   },
                   {
                       title: '2017年山东高招会启动 本科录取率有望突破50%',
                       source: 'http://yuqing.china.com.cn/show/157708.html',
                       coverage: '中国舆情网',
                       same: 30,
                       author: '海伦 凯勒',
                       date: '2017-01-01'
                   }
               ]
           }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/home/industryNews"}
                    },
                    {
                        name:"内参报告",to:{path:"/home/report"}
                    },
                    {
                        name:"报告详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            downloadReport(){
                console.log(111)
            },

            getIntroduction(){
                var requestParam = {
                    endDate: this.param.endDate,
                    startDate: this.param.startDate,
//                    keywords: this.param.keywords,
                    college: this.param.college.split(',')
                }
                console.log(requestParam)
                this.$http.post('/apis/referenceReport/findInternalControlReportIntroduction.json', requestParam).then(
                    (response) => {
                        if(response.data.success){
                            console.log(response.data.data)
                        }else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                )

                this.$http.post('/apis/referenceReport/findReferenceOverview.json', requestParam).then(
                    (response) => {
                        if(response.data.success){
                            console.log(response.data.data)
                        }else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                )
            },
        },
        mounted(){
            this.getIntroduction();
        },
        created(){
            this.param = this.$route.query;
            this.setBreadCrumb();
        }
    }
</script>