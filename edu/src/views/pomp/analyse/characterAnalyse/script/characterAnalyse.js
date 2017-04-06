/**
 * Created by yuwei on 2017/4/1.
 */
import "vue-style-loader!css-loader!sass-loader!../css/characterAnalyse.scss";
import echarts from "echarts"
import echartsWordCloud from "echarts-wordcloud"

export default{
    data(){
        return {
            characterInfo: [{
                name: '习总',
                date: '2月22日',
                college: '清华大学',
                department: '电子生物',
                job: '教授',
                publicAccount: '暂无',
                weibo: '暂无'
            }],
            tableData: [],
            vectorTableColumn: [],
            vectorTableData: [],
            distributeData: [],
            relatedInfoData: [],
            param: {},
            timeLineData: [],
            activeName: 'positive'
        }
    },
    components: {},
    methods: {
        setBreadCrumb(){
            let breadcrumb = [
                {
                    name: "舆情管理", to: {path: "/"}
                },
                {
                    name: "舆情监测", to: {path: "/home/analyse"}
                },
                {
                    name: "人物聚焦"
                },
                {
                    name: "人物分析", to: {path: "/characterAnalyse"}
                }
            ];
            this.$store.commit("setBreadCrumb", breadcrumb);
        },
        /**获取活动轨迹echart图*/
        getActionTrail(startDate, endDate){
            let chart = echarts.init(document.getElementById('character_activity_graph'));
            chart.showLoading();

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getActionTrail.json', tmpParam).then(
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
        /**获取人物概况*/
        getPersonageArticle(startDate, endDate) {

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getPersonageArticle.json', tmpParam).then(
                (response) => {
                    if (response.data.success) {
                        this.timeLineData = response.data.data.content;
                    } else {
                        console.error(response.data.message);
                    }
                }, (response) => {
                    console.error(response);
                }
            );
        },
        getEmotionTrend(startDate, endDate) {

            let chart = echarts.init(document.getElementById('trend_graph'));
            chart.showLoading();

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getEmotionTrend.json', tmpParam).then(
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
        getEmotionVal(startDate, endDate) {
            let chart = echarts.init(document.getElementById('emotionIndex_graph'));
            chart.showLoading();

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getEmotionVal.json', tmpParam).then(
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
        getMediaVolume(startDate, endDate) {
            let chart = echarts.init(document.getElementById('volume_graph'));
            chart.showLoading();

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getMediaVolume.json', tmpParam).then(
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
        getMediaHot(startDate, endDate) {
            let chart = echarts.init(document.getElementById('hot_graph'));
            chart.showLoading();

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getMediaHot.json', tmpParam).then(
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

        getVectorTrend(startDate, endDate){
            let chart = echarts.init(document.getElementById('vectorTrend_graph'));
            chart.showLoading();

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getVectorTrend.json', tmpParam).then(
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
        getVectorDistribution(startDate, endDate) {
            let chart = echarts.init(document.getElementById('carrierDis_graph'));
            chart.showLoading();

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getVectorDistribution.json', tmpParam).then(
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
        getVectorTable(startDate, endDate) {

            let tmpParam = this.param;
            tmpParam.startDate = startDate;
            tmpParam.endDate = endDate;

            this.$http.post('/apis/opinionMonitor/getVectorTable.json', tmpParam).then(
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
        getKeyWordsData(){
            this.$nextTick(function () {
                let chart = echarts.init(document.getElementById('keywords'));
            })
        },

        handleClick(event){
            console.log(event)
        }
    },
    created(){
        this.setBreadCrumb();
        this.tableData.push(this.$route.query);
        this.param = this.$route.query;
        var univs = [];
        if (this.param.university) {
            univs.push(this.param.university);
        }
        this.param.university = univs;

    },
    mounted() {
        this.getActionTrail('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getPersonageArticle('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getEmotionTrend('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getEmotionVal('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getMediaVolume('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getMediaHot('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getVectorTrend('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getVectorDistribution('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getVectorTable('2016-12-01 00:00:00', '2016-12-31 00:00:00');
        this.getKeyWordsData();
    }
}
