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
            activeName: 'todayHot',
            activeName2:'todayHot',
            opinionFunnel:{},
            opinionFunnelLoading: true
        }
    },
    components:{overview} ,
    methods:{
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
                        console.error(response.data.msg);
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
    }
}