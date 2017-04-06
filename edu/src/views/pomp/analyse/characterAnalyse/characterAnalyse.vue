/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div class="characterAnalyse">
        <div class="character-info">
            <div class="info-left">
                <span class="characterName">
                    {{characterInfo[0].name}}
                </span>
                <span class="characterDate">
                   {{characterInfo[0].date}}
               </span>
            </div>
            <div class="info-right">
                <el-button type="primary" icon="plus" class="btn-attend">
                    关注
                </el-button>
                <el-button type="primary" icon="plus" class="btn-alert">
                    预警
                </el-button>
                <el-dropdown class="event-store-box" style="margin-left: 10px;" trigger="click">
                    <el-button type="primary" icon="plus" class="button-icon">
                        事件库
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="event-store-item">
                        <el-dropdown-item>事件1</el-dropdown-item>
                        <el-dropdown-item>事件2</el-dropdown-item>
                        <el-dropdown-item>事件3</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <div class="base-info-box">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>基本信息</span>
                        </div>
                        <div class="text item">
                            <el-table :data="characterInfo" class="tran-table no-col-title" border style="width: 100%"
                                      :resizable="false">
                                <el-table-column label="所属" prop="college" align="center"></el-table-column>
                                <el-table-column label="部门" prop="department" align="center"></el-table-column>
                                <el-table-column label="职务" prop="job" align="center"></el-table-column>
                                <el-table-column label="公众号" prop="publicAccount" align="center"></el-table-column>
                                <el-table-column label="微博号" prop="weibo" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="base-info-box">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart"></span><span>热度排行榜</span>
                        </div>
                        <div class="text item">
                            <el-table :data="tableData" class="tran-table no-col-title" border style="width: 100%"
                                      :resizable="false">
                                <el-table-column label="排名" align="center" prop="rank"></el-table-column>
                                <el-table-column label="人物" prop="name" align="center"></el-table-column>
                                <el-table-column label="声量" prop="volume" align="center"></el-table-column>
                                <el-table-column label="总阅读量" prop="totalHitCount" align="center"></el-table-column>
                                <el-table-column label="热度" prop="hot" align="center"></el-table-column>
                                <el-table-column label="情感" prop="emotionVal" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="character-div character-activity">
            <div class="title">
                <span class="span-icon">活动轨迹</span>
            </div>
            <div class="graph-div item" id="character_activity_graph">
            </div>
            <div class="activity-describe">
                <h3>12月12日概况</h3>
                <div class="time-line">
                    <div class="time-line-item" v-for="item in timeLineData">
                        <div class="circle-box">
                            <div class="circle"></div>
                        </div>
                        <div class="time-line-content">
                           <p class="content"> {{item.title}}</p>
                            <p class="datetime">{{item.publishDateTime}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="character-div character-keywords">
            <div class="title"><span class="span-icon">关键词云</span></div>
            <div class="keywords-list graph-div" id="keywords">
            </div>
        </div>
        <div class="character-div character-emotionTrend">
            <div class="title"><span class="span-icon">情感走势</span></div>
            <div class="graph-div trend-graph" id="trend_graph">
            </div>
        </div>
        <div class="character-div leftDiv character-emotionIndex">
            <div class="title"><span class="span-icon">情感指数</span></div>
            <div class="graph-div emotionIndex-graph" id="emotionIndex_graph">

            </div>
        </div>
        <div class="character-div rightDiv character-relatedInfo">
            <div class="title">
                <el-tabs class="custom-tabs left-tabs" @tab-click="handleClick"  v-model="activeName">
                    <el-tab-pane label="相关信息" name="related" disabled>
                    </el-tab-pane>
                    <el-tab-pane label="正面" name="positive" class="is-active">
                        <el-card class="box-card">
                            <el-table :data="relatedInfoData" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="date" label="时间" align="center" width="150px"></el-table-column>
                            </el-table>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="负面" name="negative">
                        <el-card class="box-card">
                            <el-table :data="relatedInfoData" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="date" label="时间" align="center" width="150px"></el-table-column>
                            </el-table>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="character-div leftDiv character-mediaVolume">
            <div class="title"><span class="span-icon">媒体声量</span></div>
            <div class="graph-div volume-graph" id="volume_graph">
            </div>
        </div>
        <div class="character-div rightDiv mediaHot">
            <div class="title"><span class="span-icon">媒体热度</span></div>
            <div class="graph-div hot-graph" id="hot_graph"></div>
        </div>
        <div class="character-div character-mediaWeek">
            <div class="title">
                <span class="span-icon">载体趋势周统计图</span>
            </div>
            <div class="graph-div weekMedia-graph" id="vectorTrend_graph"></div>
        </div>
        <div class="character-div character-statistics">
            <div class="title"><span class="span-icon">舆情数据统计</span></div>
            <div class="statistics-table graph-div">
                <el-table :data="vectorTableData" class="tran-table" border style="width: 100%" :resizable="false">
                    <el-table-column prop="name" label="载体\时间" width="150" align="center">
                    </el-table-column>
                    <el-table-column v-for="item in vectorTableColumn" width="150" :prop="item" :label="item" align="center">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--carrier dis: carrier:载体  distribute:分布-->
        <div class="character-div character-carrierDis">
            <div class="title"><span class="span-icon">载体分布统计图</span></div>
            <div class="graph-div item carrierDis-graph" id="carrierDis_graph"></div>
            <div class="carrierDis-table">
                <el-table :data="distributeData" class="tran-table no-col-title" style="width: 100%" :resizable="false">
                    <el-table-column prop="name" label="载体" width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                    <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript" src="./script/characterAnalyse.js"></script>