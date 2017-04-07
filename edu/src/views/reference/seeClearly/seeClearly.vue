/**
* Created by yu-bing on 2017/3/17.
*/
<template>
    <div class="seeClearly">
       <bread-crumb></bread-crumb>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="custom-tabs">
            <el-tab-pane label="信息聚合" name="first">
            	<overview></overview>
                <el-row :gutter="10">
                  <el-col :span="24">
                       <el-card class="box-card educationBox">
                            <div slot="header" class="clearfix">
                                <span class="icons icons-chart"></span>
                                <span>载体趋势分析</span>
                            </div>
                            <div class="text item" id="vectorTrend">
                                
                            </div>
                       </el-card>
                  </el-col>
                  <el-col :span="12">
                      <el-card class="educationBox box-card">
                          <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="相关" name="first">相关</el-tab-pane>
                            <el-tab-pane label="正面" name="second">正面</el-tab-pane>
                            <el-tab-pane label="负面" name="third">负面</el-tab-pane>
                          </el-tabs>
                      </el-card>
                  </el-col>
                  <el-col :span="12">
                      <el-card class="educationBox box-card">
                          
                      </el-card>
                  </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="微博" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="微信" name="third">角色管理</el-tab-pane>
       </el-tabs>
    </div>
</template>
<style lang="scss">
	.seeClearly{
		.custom-tabs .el-tabs__nav{
            margin: 0;       
        }
	}
</style>
<script src="./js/seeClearly.js"></script>