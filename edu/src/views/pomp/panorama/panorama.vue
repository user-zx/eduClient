/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="panorama">
        <overview></overview>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>舆情数据统计</span>
                    </div>
                    <div class="text item">
                        <el-table :data="opinionData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table">
                            <el-table-column prop="col" label="" align="center"></el-table-column>
                            <el-table-column prop="today" label="今天" align="center"></el-table-column>
                            <el-table-column prop="yesterday" label="昨天" align="center"></el-table-column>
                            <el-table-column prop="week" label="近7天" align="center"></el-table-column>
                            <el-table-column prop="month" label="近30天" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>舆情数据锥形图</span>
                    </div>
                    <div class="text item" id="opinionFunnel">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>载体分布统计</span>
                    </div>
                    <div class="text item" id="vectorDistribute">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>人物统计</span>
                    </div>
                    <div class="text item" id="personageCount">

                    </div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>载体趋势分析</span>
                    </div>
                    <div class="text item" id="vectorTrend">

                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>热点舆情</span>
                    </div>
                    <div class="text item">
                        <el-tabs v-model="activeName" class="custom-tabs" @tab-click="handleClick">
                            <el-tab-pane label="今日热点" name="todayHot">
                                <el-card class="box-card">
                                    <el-table :data="hotOpinion.todayHot" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近7天热点" name="weekHot">
                                <el-card class="box-card">
                                    <el-table :data="hotOpinion.weekHot" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近30天热点" name="monthHot">
                                <el-card class="box-card">
                                    <el-table :data="hotOpinion.monthHot" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>人物热点</span>
                    </div>
                    <div class="text item">
                        <el-tabs v-model="activeName2" class="custom-tabs" @tab-click="handleClick">
                            <el-tab-pane label="今日热点" name="todayHot">
                                <el-card class="box-card">
                                    <el-table :data="hotPersonage.todayHot" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近7天热点" name="weekHot">
                                <el-card class="box-card">
                                    <el-table :data="hotPersonage.weekHot" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近30天热点" name="monthHot">
                                <el-card class="box-card">
                                    <el-table :data="hotPersonage.monthHot" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>微信热点</span>
                    </div>
                    <div class="text item">
                        <el-card class="box-card">
                            <el-table :data="wechatHot" :resizable="false" style="width: 100%" border class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>微博热点</span>
                    </div>
                    <div class="text item">
                        <el-card class="box-card">
                            <el-table :data="weboHot" :resizable="false" style="width: 100%" border class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .el-row {
        z-index:0;
        .el-col {
            margin-top: 10px;
            >div {
                 height: 520px;
                 background-color: #21273d;
                >div>.item{
                     height: 440px;
                }
             }
        }
    }
</style>
<script src="./script/panorama.js">
</script>