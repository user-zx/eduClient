/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div class="characterAnalyse">
        <div class="character-info">
            <div class="info-left">
                <span class="characterName">
                    {{param.name}}
                </span>
                <span class="characterDate">
                   {{param.endDate ? param.endDate.split(' ')[0] : '' }}
               </span>
            </div>
            <div class="info-right">
                <el-button type="primary" icon="plus" @click="concernedPersonage">
                    关注
                </el-button>
                <warn-drop-down @onSaveWarn="saveWarn" style="margin-left: 10px; margin-right: 10px;" v-show="warnPermission"></warn-drop-down>
                <dropDown @onSaveEvent="onSaveEvent" v-show="eventPermission"></dropDown>
            </div>
        </div>

        <div class="base-info-box">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart1"></span><span>基本信息</span>
                        </div>
                        <div class="text item">
                            <el-table :data="characterInfo" class="tran-table no-col-title" border style="width: 100%"
                                      :resizable="false">
                                <el-table-column label="所属" prop="university" align="center"></el-table-column>
                                <el-table-column label="部门" prop="department" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" label="职务" prop="job" align="center"></el-table-column>
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
                            <span class="icons icons-chart2"></span><span>热度排行榜</span>
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
        <div class="base-info-box">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart3"></span><span>活动轨迹</span>
                        </div>
                        <div class="col-item item-left" style="width: 59.5%">
                            <div class="charts" id="character_activity_graph" style="height: 400px;"></div>
                        </div>
                        <div class="col-item item-right" style="width: 39.5%">
                            <div class="activity-describe">
                                <h3>{{selectDate}}概况</h3>
                                <div class="time-line" v-loading="time_loading" element-loading-text="加载中……">
                                    <div class="time-line-item" v-if="timeLineData.length > 0" v-for="item in timeLineData">
                                        <div class="circle-box">
                                            <div class="circle"></div>
                                        </div>
                                        <div class="time-line-content">
                                            <p class="content pointer" @click="toDetail(item)"> {{item.title}}</p>
                                            <p class="datetime">{{item.publishDateTime}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <span class="icons icons-chart4"></span><span>关键词云</span>
                        </div>
                        <div class="text item">
                            <div class="charts" id="keywords" style="height: 400px;"></div>
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
                            <span class="icons icons-chart5"></span><span>情感走势</span>
                        </div>
                        <div class="text item">
                            <div class="charts" id="trend_graph" style="height: 400px;"></div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="base-info-box">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-card class="box-card educationBox" style="height: 520px;margin-top: 0px">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart6"></span><span>情感指数</span>
                        </div>
                        <div class="text item">
                            <div class="charts" id="emotionIndex_graph" style="height: 400px;"></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card educationBox" style="height: 520px;margin-top: 0px">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart7"></span><span>热点信息</span>
                        </div>
                        <div class="text item">
                            <el-tabs v-model="activeName" class="custom-tabs">
                                <el-tab-pane label="相关信息" name="related">
                                    <el-card class="box-card">
                                        <el-table :data="relatedData" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                            <el-table-column :show-overflow-tooltip="true" label="标题" align="center" width="245">
                                                <template scope="scope">
                                                    <span class="pointer" @click="toDetail(scope.row)">
                                                        {{scope.row.title}}
                                                    </span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                        </el-table>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="正面" name="positive">
                                    <el-card class="box-card">
                                        <el-table :data="positiveData" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                            <el-table-column :show-overflow-tooltip="true" label="标题" align="center" width="245">
                                                <template scope="scope">
                                                    <span class="pointer" @click="toDetail(scope.row)">
                                                        {{scope.row.title}}
                                                    </span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                        </el-table>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="负面" name="negative">
                                    <el-card class="box-card">
                                        <el-table :data="negativeData" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                                            <el-table-column :show-overflow-tooltip="true" label="标题" align="center" width="245">
                                                <template scope="scope">
                                                    <span class="pointer" @click="toDetail(scope.row)">
                                                        {{scope.row.title}}
                                                    </span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                        </el-table>
                                    </el-card>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="base-info-box">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-card class="box-card educationBox" style="height: 480px;margin-top: 0px">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart8"></span><span>媒体声量</span>
                        </div>
                        <div class="text item">
                            <div class="charts" id="volume_graph" style="height: 400px;"></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card educationBox" style="height: 480px;margin-top: 0px">
                        <el-card class="box-card educationBox">
                            <div slot="header" class="clearfix">
                                <span class="icons icons-chart9"></span><span>媒体热度</span>
                            </div>
                            <div class="text item">
                                <div class="charts" id="hot_graph" style="height: 400px;"></div>
                            </div>
                        </el-card>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="base-info-box">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="icons icons-chart10"></span><span>载体趋势周统计图</span>
                        </div>
                        <div class="text item">
                            <div class="charts" id="vectorTrend_graph" style="height: 400px;"></div>
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
                            <span class="icons icons-chart11"></span><span>舆情数据统计</span>
                        </div>
                        <div class="text item">
                            <el-table :data="vectorTableData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table fixed-table">
                                <el-table-column prop="name" label="载体\时间" width="150" align="center">
                                </el-table-column>
                                <el-table-column v-for="item in vectorTableColumn" width="150" :prop="item" :label="item" align="center">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart12"></span><span>载体分布统计图</span>
                    </div>
                    <div class="col-item item-left">
                        <div class="charts" id="carrierDis_graph" style="height: 400px;"></div>
                    </div>
                    <div class="col-item item-right">
                        <el-table :data="distributeData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                            <el-table-column prop="name" label="载体" width="150" align="center"></el-table-column>
                            <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                            <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<style lang="scss" scoped>
    $img-url:url("../../../../assets/images/zhongtubiao@1x.png") no-repeat;
    .icons-chart1{
        width: 22px;
        height: 23px;
        background:  $img-url -13px -147px;
    }
    .icons-chart2{
        width: 19px;
        height: 19px;
        background:  $img-url -47px -149px;
    }
    .icons-chart3{
        width: 22px;
        height: 16px;
        background:  $img-url -13px -177px;
    }
    .icons-chart4{
        width: 22px;
        height: 19px;
        background:  $img-url -47px -175px;
    }
    .icons-chart5{
        width: 22px;
        height: 22px;
        background:  $img-url -13px -201px;
    }
    .icons-chart6{
        width: 22px;
        height: 20px;
        background:  $img-url -46px -201px;
    }
    .icons-chart7{
        width: 20px;
        height: 27px;
        background:  $img-url -13px -231px;
    }
    .icons-chart8{
        width: 21px;
        height: 25px;
        background:  $img-url -45px -231px;
    }
    .icons-chart9{
        width: 19px;
        height: 27px;
        background:  $img-url -15px -327px;
    }
    .icons-chart10{
        width: 22px;
        height: 20px;
        background:  $img-url -14px -56px;
    }
    .icons-chart11{
        width: 22px;
        height: 18px;
        background:  $img-url -13px 0px;
    }
    .icons-chart12{
        width: 20px;
        height: 21px;
        background:  $img-url -15px -27px;
    }
</style>

<script type="text/javascript" src="./script/characterAnalyse.js"></script>