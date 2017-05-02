<template>
    <div class="seeClearly">
       <bread-crumb></bread-crumb>
        <el-tabs v-model="activeName" @tab-click="information" class="custom-tabs">
            <el-tab-pane label="信息聚合" name="informationAggregation">
            	<overview></overview>
                <el-row :gutter="10">
                  <el-col :span="24">
                       <el-card class="box-card educationBox">
                            <div slot="header" class="clearfix">
                                <span class="icons icons-chart1"></span>
                                <span>载体趋势分析</span>
                            </div>
                            <div class="text item" id="vectorTrend">
                                <el-tabs v-model="activeName2" class="custom-tabs" @tab-click="vectorTrendClick">
                                    <el-tab-pane label="今日" name="TODAY" id="TREND_TODAY">
                                        <div class="text item" style="height: 400px;"></div>
                                    </el-tab-pane>
                                    <el-tab-pane label="昨日" name="YESTERDAY">
                                        <div class="text item" style="height: 400px;"></div>
                                    </el-tab-pane>
                                    <el-tab-pane label="近7天" name="LASTWEEK">
                                        <div class="text item" style="height: 400px;"></div>
                                    </el-tab-pane>
                                    <el-tab-pane label="近30天" name="LASTMONTH">
                                        <div class="text item" style="height: 400px;"></div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                       </el-card>
                  </el-col>
                  <el-col :span="12">
                      <el-card class="educationBox box-card">
                           <div slot="header" class="clearfix">
                              <span class="icons icons-chart"></span>
                              <span>两微热点</span>
                          </div>
                          <div class="text item" style="position: relative;">
                              <el-tabs v-model="tab1">
                                <el-tab-pane label="微信" name="relation">
                                    <el-table :data="wechatHot" :show-header="false" :resizable="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="微博" name="positive">
                                    <el-table :data="weboHot" :show-header="false" :resizable="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                              </el-tabs>
                              <div class="emotion-radio">
                                  <el-radio class="radio" v-model="radio1" label="">相关</el-radio>
                                  <el-radio class="radio" v-model="radio1" label="positive">正面</el-radio>
                                  <el-radio class="radio" v-model="radio1" label="negative">负面</el-radio>
                              </div>
                          </div>
                      </el-card>
                  </el-col>
                  <el-col :span="12">
                      <el-card class="educationBox box-card">
                           <div slot="header" class="clearfix">
                              <span class="icons icons-chart"></span><span>两微舆情</span>
                          </div>
                          <div class="text item" style="position: relative;">
                              <el-tabs v-model="tab2">
                                <el-tab-pane label="微信" name="relation">
                                    <el-table :data="wechatOpinion" :show-header="false" :resizable="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="微博" name="positive">
                                    <el-table :data="weboOpinion" :show-header="false" :resizable="false" style="width: 100%" border class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center" width="245"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                              </el-tabs>
                              <div class="emotion-radio">
                                  <el-radio class="radio" v-model="radio2" label="">相关</el-radio>
                                  <el-radio class="radio" v-model="radio2" label="positive">正面</el-radio>
                                  <el-radio class="radio" v-model="radio2" label="negative">负面</el-radio>
                              </div>
                          </div>
                      </el-card>
                  </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="微博" name="configuration">配置管理</el-tab-pane>
            <el-tab-pane label="微信" name="rule">角色管理</el-tab-pane>
       </el-tabs>
    </div>
</template>
<style lang="scss">
  $img-url:url("../../../assets/images/zhongtubiao@1x.png") no-repeat;
	.seeClearly{ 
		.custom-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav{
            margin: 0;         
        }
	}
  .icons-chart1{
        width: 22px;
        height: 18px;
        background:  $img-url -14px -57px;
  }
  .custom-tabs {
      .el-tabs__nav {
          float: left;
      }
  }
  .emotion-radio {
      position: absolute;
      top: 10px;
      right: 2px;
      .el-radio__label {
          color: #66a3ff;
      }
  }
</style> 
<script src="./js/seeClearly.js"></script>