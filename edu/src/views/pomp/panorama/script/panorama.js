import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/table/tran-table.css.scss";
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss";
import overview from '../overview/overview.vue';
import echarts from 'echarts';
import vintage from "../../../../vintage.json";
export default {
    data() {
            return {
                msg: "全景舆情",
                opinionData: [],
                hotOpinion: {todayHot: [], weekHot: [], monthHot: []},
                hotPersonage: {todayHot: [], weekHot: [], monthHot: []},
                wechatHot: [],
                weboHot: [],
                activeName: 'todayHot',
                activeName2: 'todayHot',
                activeName3: 'TODAY',
                activeName4: 'TODAY',
                opinionFunnel: []

            }

        },
        components: { overview },
        methods: {
            vectorDistributeClick(tab, event) {
                let vm = this;
                let dom = $(tab.$el).children()[0];
                setTimeout(() => {
                    vm.getVectorDistribute(dom, tab.name);
                }, 10);
            },
            vectorTrendClick(tab, event) {
                let vm = this;
                let dom = $(tab.$el).children()[0];
                setTimeout(() => {
                    vm.getVectorTrend(dom, tab.name);
                }, 10);
            },
            /**获取舆情数据*/
            getOpinionData() {
                this.$http.post('/apis/allViewOpinion/getOpinionData.json').then(
                    (response) => {
                        if (response.data.success) {
                            this.opinionData = response.data.data;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取舆情漏斗*/
            getOpinionFunnel() {
                echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(document.getElementById('opinionFunnel'), 'vintage');
                chart.showLoading();
                let vm = this;
                this.$http.post('/apis/allViewOpinion/getOpinionFunnel.json').then(
                    (response) => {
                        if (response.data.success) {
                            let formatData = [
                                {value: 20, name: '预警'},
                                {value: 40, name: '负面'},
                                {value: 60, name: '正面'},
                                {value: 80, name: '相关'},
                                {value: 100, name: '舆情'}
                                ];
                            this.opinionFunnel = response.data.data.series[0].data;
                            response.data.data.series[0].data = formatData;
                           /* response.data.data.series[0].label = {
                                 normal: {
                                 show: true,
                                    position: 'inside'
                                },
                                emphasis: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            }*/ 
                            response.data.data.tooltip = {
                                trigger: 'item',
                                formatter: function (params, ticket, callback) {
                                    let name = params.name;
                                    for (let i = 0; i < vm.opinionFunnel.length; i++) {

                                        if (vm.opinionFunnel[i].name == name) {
                                            let val = vm.opinionFunnel[i].value;
                                            return "锥形图<br/>" + name + ":" + val;
                                        }
                                    }
                                }
                            }
                            
                            response.data.data.color = ["#fbff85","#60dab3","#60a3fe","#6076ff","#5356ed"];
                            response.data.data.textStyle = null;
                            chart.setOption(response.data.data);
                            this.$nextTick(function() {
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
            /**获取载体分布*/
            getVectorDistribute(dom, type) {
                echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(dom, 'vintage');
                chart.showLoading();
                this.$http.post('/apis/allViewOpinion/getVectorDistribute.json', { type: type }).then(
                    (response) => {
                        if (response.data.success) {
                           // console.log(response);
                             response.data.data.textStyle = null;
                            chart.setOption(response.data.data);
                            this.$nextTick(function() {
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
            /**获取人物统计*/
            getPersonageCount() {
                 echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(document.getElementById('personageCount'), 'vintage');
                chart.showLoading();
                this.$http.post('/apis/allViewOpinion/getPersonageCount.json').then(
                    (response) => {
                        if (response.data.success) {
                             response.data.data.textStyle = null;
                            chart.setOption(response.data.data);
                            this.$nextTick(function() {
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
            /**获取载体走势*/
            getVectorTrend(dom, type) {
                echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(dom, 'vintage');
                chart.showLoading();
                this.$http.post('/apis/allViewOpinion/getVectorTrend.json', { type: type }).then(
                    (response) => {
                        if (response.data.success) {
                            chart.setOption(response.data.data);
                            this.$nextTick(function() {
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
            /**获取热点舆情*/
            getHotOpinion(type) {
                this.$http.post('/apis/allViewOpinion/getHotOpinion.json', { type: type }).then(
                    (response) => {
                        if (response.data.success) {
                            switch (type) {
                                case 'TODAY':
                                    this.hotOpinion.todayHot = response.data.data;
                                    break;
                                    return;
                                case 'LASTWEEK':
                                    this.hotOpinion.weekHot = response.data.data;
                                    break;
                                    return;
                                case 'LASTMONTH':
                                    this.hotOpinion.monthHot = response.data.data;
                                    break;
                                    return;

                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取热点人物*/
            getHotPersonage(type) {
                this.$http.post('/apis/allViewOpinion/getHotPersonage.json', { type: type }).then(
                    (response) => {
                        if (response.data.success) {
                            switch (type) {
                                case 'TODAY':
                                    this.hotPersonage.todayHot = response.data.data;
                                    break;
                                    return;
                                case 'LASTWEEK':
                                    this.hotPersonage.weekHot = response.data.data;
                                    break;
                                    return;
                                case 'LASTMONTH':
                                    this.hotPersonage.monthHot = response.data.data;
                                    break;
                                    return;
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            getHotByVector(vector) {
                this.$http.post('/apis/allViewOpinion/getHotByVector.json', { vector: vector }).then(
                    (response) => {
                        if (response.data.success) {
                            if ('微信' == vector) {
                                this.wechatHot = response.data.data;
                            } else {
                                this.weboHot = response.data.data;
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            handleClick(event) {
                console.log(event);
            },

            toDetail(data){
                this.$router.push({path: '/home/articleDetail', query: {id: data.id}});
            }
        },
        mounted() {
            this.getOpinionData();
            this.getOpinionFunnel();
            this.getVectorDistribute($('#TAB_TODAY>.text')[0], 'TODAY');
            this.getPersonageCount();
            this.getVectorTrend($('#TREND_TODAY>.text')[0], 'TODAY');
            this.getHotOpinion('TODAY');
            this.getHotOpinion('LASTWEEK');
            this.getHotOpinion('LASTMONTH');
            this.getHotPersonage('TODAY');
            this.getHotPersonage('LASTWEEK');
            this.getHotPersonage('LASTMONTH');
            this.getHotByVector('微信');
            this.getHotByVector('微博');
            
        }
}
