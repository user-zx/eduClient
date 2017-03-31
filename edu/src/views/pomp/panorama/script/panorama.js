/*
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/table/tran-table.css.scss";
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss";
import overview from '../overview/overview.vue';
import echarts from 'echarts';

export default{
    data(){
        return {
            msg:"全景舆情",
            opinionData: [],
            hotOpinion: {todayHot: [], weekHot: [], monthHot: []},
            hotPersonage: {todayHot: [], weekHot: [], monthHot: []},
            wechatHot: [],
            weboHot: [],
            activeName: 'todayHot',
            activeName2:'todayHot',
        }
    },
    components:{overview} ,
    methods:{
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
            let chart = echarts.init(document.getElementById('opinionFunnel'));
            chart.showLoading();
            this.$http.post('/apis/allViewOpinion/getOpinionFunnel.json').then(
                (response) => {
                    if (response.data.success) {
                        chart.setOption(response.data.data);
                        this.$nextTick(function(){
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
        getVectorDistribute(startDate, endDate) {
            let chart = echarts.init(document.getElementById('vectorDistribute'));
            chart.showLoading();
            this.$http.post('/apis/allViewOpinion/getVectorDistribute.json',{startDate: startDate, endDate: endDate}).then(
                (response) => {
                    if (response.data.success) {
                        chart.setOption(response.data.data);
                        this.$nextTick(function(){
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
            let chart = echarts.init(document.getElementById('personageCount'));
            chart.showLoading();
            this.$http.post('/apis/allViewOpinion/getPersonageCount.json').then(
                (response) => {
                    if (response.data.success) {
                        chart.setOption(response.data.data);
                        this.$nextTick(function(){
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
        getVectorTrend(startDate, endDate) {
            let chart = echarts.init(document.getElementById('vectorTrend'));
            chart.showLoading();
            this.$http.post('/apis/allViewOpinion/getVectorTrend.json',{startDate: startDate, endDate: endDate}).then(
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
        /**获取热点舆情*/
        getHotOpinion(type) {
            this.$http.post('/apis/allViewOpinion/getHotOpinion.json',{type: type}).then(
                (response) => {
                    if (response.data.success) {
                        switch (type) {
                            case 'TODAY' :
                                this.hotOpinion.todayHot = response.data.data;
                                break;
                                return;
                            case 'LASTWEEK' :
                                this.hotOpinion.weekHot = response.data.data;
                                break;
                                return;
                            case 'LASTMONTH' :
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
            this.$http.post('/apis/allViewOpinion/getHotPersonage.json',{type: type}).then(
                (response) => {
                    if (response.data.success) {
                        switch (type) {
                            case 'TODAY' :
                                this.hotPersonage.todayHot = response.data.data;
                                break;
                                return;
                            case 'LASTWEEK' :
                                this.hotPersonage.weekHot = response.data.data;
                                break;
                                return;
                            case 'LASTMONTH' :
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
            this.$http.post('/apis/allViewOpinion/getHotByVector.json',{vector: vector}).then(
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
        }
    },
    mounted(){
        this.getOpinionData();
        this.getOpinionFunnel();
        this.getVectorDistribute('2016-03-01', '2017-03-24');
        this.getPersonageCount();
        this.getVectorTrend('2016-12-21 00:00:00', '2017-03-24 00:00:00');
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