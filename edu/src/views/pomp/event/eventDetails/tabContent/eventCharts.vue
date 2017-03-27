/**
* Created by zhangxin on 2017/3/24.
*/
<template>
    <div class="eventCharts">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>载体趋势统计图</span>
                    </div>
                    <div class="text item">
                        图表的位置
                    </div>
                    <div class="text item">
                        <el-table :data="tableData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table fixed-table">
                            <el-table-column
                                    fixed
                                    prop="left_title"
                                    label="载体\时间"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="province"
                                    label="省份"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="city"
                                    label="市区"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="zip"
                                    label="邮编"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="zip"
                                    label="邮编"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="zip"
                                    label="邮编"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="zip"
                                    label="邮编"
                                    width="120">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>载体分布统计图</span>
                    </div>
                    <div class="col-item item-left">
                        <div class="charts"></div>
                    </div>
                    <div class="col-item item-right">
                        <el-table :data="tableData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                            <el-table-column prop="nature" label="载体" align="center"></el-table-column>
                            <el-table-column prop="fNumber" label="负面文章数" align="center"></el-table-column>
                            <el-table-column prop="zNumber" label="正面文章数" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>站点分布TOP10</span>
                    </div>
                    <div class="col-item item-left">
                        <div class="charts"></div>
                    </div>
                    <div class="col-item item-right">
                        <el-table :data="tableData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                            <el-table-column prop="siteTop" label="排名" align="center"></el-table-column>
                            <el-table-column prop="nature" label="媒体名称" align="center"></el-table-column>
                            <el-table-column prop="fNumber" label="相关文章数" align="center"></el-table-column>
                            <el-table-column prop="fNumber" label="负面文章数" align="center"></el-table-column>
                            <el-table-column prop="zNumber" label="正面文章数" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart"></span><span>人物活跃度TOP10</span>
                    </div>
                    <div class="col-item item-left">
                        <div class="charts"></div>
                    </div>
                    <div class="col-item item-right">
                        <el-table :data="tableData" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                            <el-table-column prop="siteTop" label="排名" align="center"></el-table-column>
                            <el-table-column prop="nature" label="人物" align="center"></el-table-column>
                            <el-table-column prop="fNumber" label="相关文章数" align="center"></el-table-column>
                            <el-table-column prop="fNumber" label="负面文章数" align="center"></el-table-column>
                            <el-table-column prop="zNumber" label="正面文章数" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .el-row{
        &+.el-row{
              margin-top: 10px;
        }
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    export default{
        data(){
            return {
                msg:"事件图表",
                tableData: [{
                    left_title:"门户网站",
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"新闻",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:1,
                }, {
                    left_title:"微信",
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"其他",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:2
                }, {
                    left_title:"微博",
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"微信",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:3
                }, {
                    left_title:"论坛",
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"QQ群",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:4
                }, {
                    left_title:"报纸",
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"综合",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:5
                }, {
                    left_title:"贴吧",
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"博客",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:6
                }, {
                    left_title:"QQ群",
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"微博",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:7
                }, {
                    left_title:"QQ群",
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    nature:"论坛",
                    fNumber:"1242",
                    zNumber:"1242",
                    siteTop:8
                }]
            }
        },
        components:{} ,
        methods:{
            
        },
        mounted(){
            
        }
    }
</script>