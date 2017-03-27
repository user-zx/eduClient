/*
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/table/tran-table.css.scss";
import overview from '../overview/overview.vue';
import echarts from 'echarts';

export default{
    data(){
        return {
            msg:"全景舆情",
            tableData: [{
                col: '论坛',
                today: '7263',
                yesterday: '231',
                week: '824682',
                month: '21472332'
            }, {
                col: '博客',
                today: '7263',
                yesterday: '231',
                week: '824682',
                month: '21472332'
            }, {
                col: '新闻',
                today: '7263',
                yesterday: '231',
                week: '824682',
                month: '21472332'
            }, {
                col: '微博',
                today: '7263',
                yesterday: '231',
                week: '824682',
                month: '21472332'
            },
                {
                    col: '全部',
                    today: '7263',
                    yesterday: '231',
                    week: '824682',
                    month: '21472332'
                },
                {
                    col: '相关',
                    today: '7263',
                    yesterday: '231',
                    week: '824682',
                    month: '21472332'
                },
                {
                    col: '舆情',
                    today: '7263',
                    yesterday: '231',
                    week: '824682',
                    month: '21472332'
                },
                {
                    col: '负面',
                    today: '7263',
                    yesterday: '231',
                    week: '824682',
                    month: '21472332'
                },
                {
                    col: '微信',
                    today: '7263',
                    yesterday: '231',
                    week: '824682',
                    month: '21472332'
                }],
            opinionData: [],
            hotOpinion: {todayHot: [], weekHot: [], monthHot: []},
            hotPersonage: {todayHot: [], weekHot: [], monthHot: []},
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
                        console.error(response.data.msg);
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
        handleClick(event) {
            console.log(event);
        }
    },
    mounted(){
        this.getOpinionData();
        this.getOpinionFunnel();
        this.getVectorDistribute('2001-01-01', '2017-03-24');
        this.getPersonageCount();
        this.getVectorTrend('2001-01-01 00:00:00', '2017-03-24 00:00:00');
    }
}