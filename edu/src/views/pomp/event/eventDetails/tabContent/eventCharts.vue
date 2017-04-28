/**
* Created by zhangxin on 2017/3/24.
*/
<template>
    <div class="eventCharts">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart1"></span><span>载体趋势统计图</span>
                    </div>
                    <div class="text item" id="vectorTrendsChart" style="height: 400px;">
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
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart2"></span><span>载体分布统计图</span>
                    </div>
                    <div class="col-item item-left">
                        <div class="charts" id="vectorDistributionChart" style="height: 400px;"></div>
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
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart3"></span><span>站点分布TOP10</span>
                    </div>
                    <div class="col-item item-left">
                        <div class="charts" id="sourceTop10" style="height: 400px;"></div>
                    </div>
                    <div class="col-item item-right">
                        <el-table :data="sourceTop10" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                            <el-table-column prop="rank" label="排名" align="center"></el-table-column>
                            <el-table-column prop="name" label="媒体名称" align="center"></el-table-column>
                            <el-table-column prop="relevant" label="相关文章数" align="center"></el-table-column>
                            <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                            <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart4"></span><span>人物活跃度TOP10</span>
                    </div>
                    <div class="col-item item-left">
                        <div class="charts" id="personageTop10" style="height: 400px;"></div>
                    </div>
                    <div class="col-item item-right">
                        <el-table :data="personageTop10" :resizable="false" :show-overflow-tooltip="true" style="width: 100%" border class="tran-table no-col-title white-table-text">
                            <el-table-column prop="rank" label="排名" align="center"></el-table-column>
                            <el-table-column prop="name" label="人物" align="center"></el-table-column>
                            <el-table-column prop="relevant" label="相关文章数" align="center"></el-table-column>
                            <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                            <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    $img-url:url("../../../../../assets/images/zhongtubiao@1x.png") no-repeat;
    .el-row{
        &+.el-row{
              margin-top: 10px;
        }
        
        .icons{
        margin-right: 10px; 
        vertical-align: text-bottom;
        }
        .icons-chart1{
        width: 22px;
        height: 18px;
        background:  $img-url -14px -57px;
        }
        .icons-chart2{
        width: 21px;
        height: 21px;
        background:  $img-url -14px -27px;
        }
        .icons-chart3{
        width: 21px;
        height: 21px;
        background:  $img-url -15px -267px;
        }
        .icons-chart4{
        width: 19px;
        height: 23px;
        background:  $img-url -50px -267px;
        }
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    import echarts from 'echarts';
    export default{
        data(){
            return {
                msg:"事件图表",
                param: {},
                vectorTableColumn: [],
                vectorTableData: [],
                tableData: [],
                distributeData: [],
                sourceTop10: [],
                personageTop10: []
            }
        },
        components:{} ,
        methods:{
            onEventLoad() {
                this.param.startDate = this.eventDetail[0].monitorStartDateStr;
                this.param.endDate = this.eventDetail[0].monitorEndDateStr;
                this.param.keywords = this.eventDetail[0].eventKeyword.split(',');
                this.getVectorTrend();
                this.getVectorDistribution();
                this.getVectorTable();
                this.getSourceDistributionTop10();
                this.getPersonageTop10();
            },
            /**获取载体走势图*/
            getVectorTrend() {
                let chart = echarts.init(document.getElementById('vectorTrendsChart'));
                chart.showLoading();
                this.$http.post('/apis/eventAnalysis/getVectorTrend.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                            let data = response.data.data;
                            this.vectorTableColumn = data.xAxis.data;
                            for (let i = 0; i < data.series.length; i++) {
                                for (let j = 0; j < data.series[i].data.length; j++) {
                                    data.series[i][data.xAxis.data[j]] = data.series[i].data[j];
                                }
                            }
                            this.vectorTableData = data.series;

                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取载体分布图*/
            getVectorDistribution() {
                let chart = echarts.init(document.getElementById('vectorDistributionChart'));
                chart.showLoading();
                this.$http.post('/apis/eventAnalysis/getVectorDistribution.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            getVectorTable() {
                this.$http.post('/apis/eventAnalysis/getVectorTable.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            this.distributeData = response.data.data;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取站点分布top10*/
            getSourceDistributionTop10() {
                let chart = echarts.init(document.getElementById('sourceTop10'));
                chart.showLoading();
                this.$http.post('/apis/eventAnalysis/getSourceDistributionTop10.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            console.log(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                            let data = response.data.data;
                            for (let i = 0; i < data.yAxis.data.length; i++) {
                                let obj = {};
                                obj.rank = i + 1;
                                obj.name = data.yAxis.data[i];
                                obj.positive = data.series[0].data[i];
                                obj.negative = data.series[1].data[i];
                                obj.relevant = data.series[2].data[i];
                                this.sourceTop10.push(obj);
                            }

                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取人物top10*/
            getPersonageTop10() {
                let chart = echarts.init(document.getElementById('personageTop10'));
                chart.showLoading();
                this.$http.post('/apis/eventAnalysis/getPersonageTop10.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            console.log(response.data.data);
                            this.$nextTick(function (){
                                chart.hideLoading();
                            });

                            let data = response.data.data;
                            for (let i = 0; i < data.yAxis.data.length; i++) {
                                let obj = {};
                                obj.rank = i + 1;
                                obj.name = data.yAxis.data[i];
                                obj.positive = data.series[0].data[i];
                                obj.negative = data.series[1].data[i];
                                obj.relevant = data.series[2].data[i];
                                this.personageTop10.push(obj);
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
        },
        mounted(){
            
        },
        props: ['eventDetail']
    }
</script>