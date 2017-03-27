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
                        <el-tabs v-model="activeName" class="center-tabs" @tab-click="handleClick">
                            <el-tab-pane label="今日热点" name="todayHot">
                                <el-card class="box-card">
                                    <div class="text item" v-for="art in hotOpinion.todayHot" style="margin-top: 20px;">
                                        <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }}</a>
                                        <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                                    </div>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近7天热点" name="weekHot">
                                <el-card class="box-card">
                                    <div class="text item" v-for="art in hotOpinion.weekHot" style="margin-top: 20px;">
                                        <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }} </a>
                                        <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                                    </div>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近30天热点" name="monthHot">
                                <el-card class="box-card">
                                    <div class="text item" v-for="art in hotOpinion.monthHot" style="margin-top: 20px;">
                                        <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }} </a>
                                        <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                                    </div>
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
                        <el-tabs v-model="activeName2" class="center-tabs" @tab-click="handleClick">
                            <el-tab-pane label="今日热点" name="todayHot">
                                <el-card class="box-card">
                                    <div class="text item" v-for="art in hotPersonage.todayHot" style="margin-top: 20px;">
                                        <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }}</a>
                                        <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                                    </div>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近7天热点" name="weekHot">
                                <el-card class="box-card">
                                    <div class="text item" v-for="art in hotPersonage.weekHot" style="margin-top: 20px;">
                                        <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }} </a>
                                        <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                                    </div>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近30天热点" name="monthHot">
                                <el-card class="box-card">
                                    <div class="text item" v-for="art in hotPersonage.monthHot" style="margin-top: 20px;">
                                        <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }} </a>
                                        <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                                    </div>
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
                            <div class="text item" v-for="art in wechatHot" style="margin-top: 20px;">
                                <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }} </a>
                                <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                            </div>
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
                            <div class="text item" v-for="art in weboHot" style="margin-top: 20px;">
                                <a href="#"  style="float: left; margin-left: 30px;">{{ art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title }} </a>
                                <time class="time right" style="float: left;margin-left: 60px;">{{ art.publishDate }}</time>
                            </div>
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
                 height: 519px;
                 background-color: #21273d;
                >div>.item{
                     height: 440px;
                 }
             }
        }
    }
</style>
<style lang="scss">
    .center-tabs{
        .el-tabs__nav {
            float: none;
            margin: 0 auto;
            width: 289px;
        }
        .el-tabs__active-bar{
            border-radius: 4px;
            background-color: #e4f09e;
        }
        .el-tabs__header{
            margin-bottom: 0;
            border-bottom: none;
        }
        .el-tabs__item{
            position: relative;
            font-size: 16px;
            transition: color .25s;
            color:rgba(119,145,231,.4);
            &:after{
                position: absolute;
                right: 0;
                top:50%;
                margin-top: -8px;
                width: 1px;
                height:16px;
                content: " ";
                display: block;
                background-color: #2f4164;
            }
            &:last-child{
                &:after{
                     width: 0;
                 }
             }
            &:hover{
                color:#e4f09e;
            }
            &.is-active{
                color:#e4f09e;
            }
        }
    }
</style>
<script src="./script/panorama.js">
</script>