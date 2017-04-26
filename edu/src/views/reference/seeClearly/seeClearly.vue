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
                                
                            </div>
                       </el-card>
                  </el-col>
                  <el-col :span="12">
                      <el-card class="educationBox box-card">
                           <div slot="header" class="clearfix">
                              <span class="icons icons-chart"></span>
                              <span>信息热点</span>
                          </div>
                          <div class="text item">
                              <el-tabs v-model="together" @tab-click="hotspot">
                                <el-tab-pane label="相关" name="correlation">
                                    <el-table :data="tableData" style="width: 100%" class="tran-table">
                                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                        <el-table-column prop="address" label="地址"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="正面" name="front">
                                    <el-table :data="tableData" style="width: 100%" class="tran-table">
                                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                        <el-table-column prop="address" label="地址"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="负面" name="negative">
                                     <el-table :data="tableData" style="width: 100%" class="tran-table">
                                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                        <el-table-column prop="address" label="地址"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                              </el-tabs>
                          </div>
                          
                      </el-card>
                  </el-col>
                  <el-col :span="12">
                      <el-card class="educationBox box-card">
                           <div slot="header" class="clearfix">
                              <span class="icons icons-chart"></span><span>信息热点</span>
                          </div>
                          <div class="text item">
                              <el-tabs v-model="together" @tab-click="hotspot">
                                <el-tab-pane label="相关" name="correlation">
                                    <el-table :data="tableData" style="width: 100%" class="tran-table">
                                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                        <el-table-column prop="address" label="地址"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="正面" name="front">
                                    <el-table :data="tableData" style="width: 100%" class="tran-table">
                                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                        <el-table-column prop="address" label="地址"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="负面" name="negative">
                                     <el-table :data="tableData" style="width: 100%" class="tran-table">
                                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                        <el-table-column prop="address" label="地址"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                              </el-tabs>
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
</style> 
<script src="./js/seeClearly.js"></script>