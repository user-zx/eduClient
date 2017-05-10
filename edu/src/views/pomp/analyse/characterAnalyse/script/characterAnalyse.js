/**
 * Created by yuwei on 2017/4/1.
 */
import "vue-style-loader!css-loader!sass-loader!../css/characterAnalyse.scss";
import echarts from "echarts";
import vintage from "../../../../../vintage.json";
import "echarts-wordcloud";

export default{
    data(){
        return {
            characterInfo: [{
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
            relatedData: [],
            positiveData: [],
            negativeData: [],
            param: {},
            timeLineData: [],
            activeName: 'related',
            selectDate: '',
            time_loading: true
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
                    name: "人物分析"
                }
            ];
            this.$store.commit("setBreadCrumb", breadcrumb);
        },
        /**获取活动轨迹echart图*/
        getActionTrail(){
            let chart = echarts.init(document.getElementById('character_activity_graph'), 'vintage');
            chart.showLoading();
            let vm = this;
            this.$http.post('/apis/opinionMonitor/getActionTrail.json', this.param).then(
                (response) => {
                    if (response.data.success) {
                        chart.setOption(response.data.data);
                        this.$nextTick(() => {
                            chart.hideLoading();
                            chart.on('click', (params) => {
                                vm.getPersonageArticle(params.name);
                            });
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
        getPersonageArticle(date) {
            this.time_loading = true;
            this.selectDate = date;
            let tmpParam = jQuery.extend({}, this.param);
            tmpParam.startDate = date + ' 00:00:00';
            tmpParam.endDate = date + ' 23:59:59';
            this.$http.post('/apis/opinionMonitor/getPersonageArticle.json', tmpParam).then(
                (response) => {
                    if (response.data.success) {
                        this.timeLineData = response.data.data.content;
                    } else {
                        console.error(response.data.message);
                    }
                    this.time_loading = false;
                }, (response) => {
                    console.error(response);
                }
            );
        },
        getEmotionTrend() {

            let chart = echarts.init(document.getElementById('trend_graph'), 'vintage');
            chart.showLoading();

            this.$http.post('/apis/opinionMonitor/getEmotionTrend.json', this.param).then(
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
        getEmotionVal() {
            let chart = echarts.init(document.getElementById('emotionIndex_graph'), 'vintage');
            chart.showLoading();

            this.$http.post('/apis/opinionMonitor/getEmotionVal.json', this.param).then(
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
        getMediaVolume() {
            let chart = echarts.init(document.getElementById('volume_graph'), 'vintage');
            chart.showLoading();

            this.$http.post('/apis/opinionMonitor/getMediaVolume.json', this.param).then(
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
        getMediaHot() {
            let chart = echarts.init(document.getElementById('hot_graph'), 'vintage');
            chart.showLoading();

            this.$http.post('/apis/opinionMonitor/getMediaHot.json', this.param).then(
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

        getVectorTrend(){
            let chart = echarts.init(document.getElementById('vectorTrend_graph'), 'vintage');
            chart.showLoading();

            this.$http.post('/apis/opinionMonitor/getVectorTrend.json', this.param).then(
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
        getVectorDistribution() {
            let chart = echarts.init(document.getElementById('carrierDis_graph'), 'vintage');
            chart.showLoading();

            this.$http.post('/apis/opinionMonitor/getVectorDistribution.json', this.param).then(
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

            this.$http.post('/apis/opinionMonitor/getVectorTable.json', this.param).then(
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
            let chart = echarts.init(document.getElementById('keywords'), 'vintage');
            chart.showLoading();

            this.$http.post('/apis/opinionMonitor/getWordCloud.json', this.param).then(
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
        getArticleByEmotion(emotion) {

            let tmpParam = jQuery.extend({}, this.param);

            if (emotion) {
                tmpParam.emotion = emotion;
            }

            this.$http.post('/apis/opinionMonitor/getPersonageArticle.json', tmpParam).then(
                (response) => {
                    if (response.data.success) {
                        if ('positive' == emotion) {
                           this.positiveData = response.data.data.content;
                        } else if ('negative' == emotion) {
                            this.negativeData = response.data.data.content;
                        } else {
                            this.relatedData = response.data.data.content;;
                        }
                    } else {
                        console.error(response.data.message);
                    }
                    this.time_loading = false;
                }, (response) => {
                    console.error(response);
                }
            );
        }
    },
    created(){
        this.setBreadCrumb();
        this.tableData.push(this.$route.query);
        var univs = [];
        if (this.$route.query.university && typeof this.$route.query.university == 'string') {
            univs.push(this.$route.query.university);
        }
        this.$route.query.university = univs;
        this.param = this.$route.query;
    },
    mounted() {
        echarts.registerTheme('vintage', vintage);
        this.getActionTrail();
        this.getPersonageArticle(this.param.endDate.split(' ')[0]);
        this.getEmotionTrend();
        this.getEmotionVal();
        this.getMediaVolume();
        this.getMediaHot();
        this.getVectorTrend();
        this.getVectorDistribution();
        this.getVectorTable();
        this.getKeyWordsData();
        this.getArticleByEmotion();
        this.getArticleByEmotion('positive');
        this.getArticleByEmotion('negative');
    }
}
