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
                              <span class="icons icons-chart2"></span>
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
                              <span class="icons icons-chart3"></span><span>两微舆情</span>
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
                    <el-col :span="24">
                        <el-card class="educationBox box-card">
                            <div slot="header" class="clearfix">
                                <span class="icons icons-chart12"></span><span>两微分布</span>
                            </div>
                            <div class="col-item item-left" style="position: relative;">
                                <div class="vector-radio">
                                    <div>
                                        <el-radio class="radio" v-model="radio3" label="微信">微信</el-radio>
                                    </div>
                                    <div>
                                        <el-radio class="radio" v-model="radio3" label="微博">微博</el-radio>
                                    </div>
                                </div>
                                <div class="charts" id="carrierDis_graph" style="height: 400px;"></div>
                            </div>
                            <div class="col-item item-right">
                                <el-table :data="distributeData" :resizable="false" :show-overflow-tooltip="true" height="400"
                                          style="width: 100%" border class="tran-table no-col-title white-table-text scroll-table">
                                    <el-table-column prop="area" label="地域" width="150" align="center"></el-table-column>
                                    <el-table-column prop="wechat" label="微信" align="center"></el-table-column>
                                    <el-table-column prop="webo" label="微博" align="center"></el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="微博" name="configuration">
                <div class="article-wrap" v-loading="loading1" element-loading-text="加载中……">
                    <search-box class="dark" :searchNames=searchNames1 @searchDataChange="onSearchDataChange1" @onload="onSearchLoad1"></search-box>
                    <div class="content dark">
                        <div class="content-bar dark">
                            <div class="content-bar-button" style="margin-left: 10px;">
                                <el-dropdown class="event-store-box" trigger="click">
                                    <el-button type="primary" icon="plus" class="button-icon">
                                        事件库
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown" class="event-store-item">
                                        <el-dropdown-item>事件1</el-dropdown-item>
                                        <el-dropdown-item>事件2</el-dropdown-item>
                                        <el-dropdown-item>事件3</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-button type="primary" icon="plus" class="button-icon" @click="batchConcerned">批量关注</el-button>
                            </div>

                            <div class="content-bar-page">
                                <el-pagination class="edu-pagination"
                                               @current-change="handleCurrentChange1"
                                               :current-page="param1.pageNumber + 1"
                                               :page-size="15"
                                               layout="prev, next, jumper, total"
                                               :total="total1">
                                </el-pagination>
                            </div>
                        </div>
                        <el-table :data="tableData1" class="tran-table" border style="width: 100%"
                                  :resizable="false" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="50px" align="center"></el-table-column>
                            <el-table-column label="排名" align="center" width="110px">
                                <template scope="scope">
                                    <span v-if="scope.row.rank == 1">
                                         <i class="icon-rank icon-gold"></i>
                                    </span>
                                    <span v-else-if="scope.row.rank == 2">
                                        <i class="icon-rank icon-silver"></i>
                                   </span>
                                    <span v-else-if="scope.row.rank == 3">
                                         <i class="icon-rank icon-copper"></i>
                                    </span>
                                    {{scope.row.rank}}
                                </template>
                            </el-table-column>
                            <el-table-column label="微博号" prop="author" align="center" :show-overflow-tooltip="true">
                                <template scope="scope">
                                    <span @click="toWeiboDetail(scope.row)" style="cursor: pointer">
                                        {{scope.row.author}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="发博量" prop="sendCount" align="center" width="110px"></el-table-column>
                            <el-table-column label="关注量" prop="concernsCount" align="center" width="110px"></el-table-column>
                            <el-table-column label="粉丝量" prop="fansCount" align="center" width="110px"></el-table-column>
                            <el-table-column label="转发量" prop="forwardCount" align="center" width="110px"></el-table-column>
                            <el-table-column label="评论数" prop="replySum" align="center" width="110px"></el-table-column>
                            <el-table-column label="点赞总数" prop="supportSum" align="center" width="110px"></el-table-column>
                            <el-table-column label="平均点赞量" prop="supportAvg" align="center" width="110px"></el-table-column>
                            <el-table-column label="认证状态" prop="authcStatus" align="center">
                                <template scope="scope">
                                    <span v-if="scope.row.authcStatus == '1'">已认证</span>
                                    <span v-else>未认证</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="微信" name="rule">
                <div class="article-wrap" v-loading="loading2" element-loading-text="加载中……">
                    <search-box class="dark" :searchNames=searchNames2 @searchDataChange="onSearchDataChange2" ></search-box>
                    <div class="content dark">

                        <div class="content-bar dark">
                            <div class="content-bar-button" style="margin-left: 10px;">
                                <el-dropdown class="event-store-box" trigger="click">
                                    <el-button type="primary" icon="plus" class="button-icon">
                                        事件库
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown" class="event-store-item">
                                        <el-dropdown-item>事件1</el-dropdown-item>
                                        <el-dropdown-item>事件2</el-dropdown-item>
                                        <el-dropdown-item>事件3</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <el-button type="primary" icon="plus" class="button-icon" @click="batchConcerned">批量关注</el-button>
                            </div>

                            <div class="content-bar-page">
                                <el-pagination class="edu-pagination"
                                               @current-change="handleCurrentChange2"
                                               :current-page="param2.pageNumber + 1"
                                               :page-size="15"
                                               layout="prev, next, jumper, total"
                                               :total="total2">
                                </el-pagination>
                            </div>
                        </div>
                        <el-table :data="tableData2" class="tran-table" border style="width: 100%"
                                  :resizable="false" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="50" align="center"></el-table-column>
                            <el-table-column label="排名" align="center" prop="rank">
                                <template scope="scope">
                                <span v-if="scope.row.rank == 1">
                                     <i class="icon-rank icon-gold"></i>
                                </span>
                                    <span v-else-if="scope.row.rank == 2">
                                    <i class="icon-rank icon-silver"></i>
                               </span>
                                    <span v-else-if="scope.row.rank == 3">
                                     <i class="icon-rank icon-copper"></i>
                                </span>
                                    {{scope.row.rank}}
                                </template>
                            </el-table-column>
                            <el-table-column label="公众号" prop="author" align="center" :show-overflow-tooltip="true">
                                <template scope="scope">
                                    <span @click="toWechatDetail(scope.row)" style="cursor: pointer">
                                        {{scope.row.author}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="文章数" prop="articleCount" align="center"></el-table-column>
                            <el-table-column label="总点赞量" prop="supportSum" align="center"></el-table-column>
                            <el-table-column label="总阅读量" prop="hitSum" align="center"></el-table-column>
                            <el-table-column label="平均阅读量" prop="hitAvg" align="center"></el-table-column>
                            <el-table-column label="平均点赞量" prop="supportAvg" align="center"></el-table-column>
                            <el-table-column label="活跃指数" prop="activityIndex" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
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
  .icons-chart2{
       width: 19px;
       height: 27px;
       background:  $img-url -48px -82px;
  }
  .icons-chart3{
       width: 22px;
       height: 18px;
       background:  $img-url -46px -202px;
  }
  .icons-chart12{
      width: 20px;
      height: 21px;
      background:  $img-url -15px -27px;
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
   .vector-radio {
       position: absolute;
       top: 10px;
       left: 24px;
       z-index: 100;
       .el-radio__label {
           color: #66a3ff;
       }
       >div:last-child {
           margin-top: 10px;
       }
   }
</style> 
<script src="./js/seeClearly.js"></script>