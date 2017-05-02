  import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss"; 
  import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
  import overview from '../overview.vue';
  import echarts from 'echarts';

  export default{
        data(){
            return {
                activeName2: 'TODAY',
                msg:"两微洞察",
                activeName: 'informationAggregation',
                tab1: 'relation',
                tab2: 'relation',
                wechatHot: [],
                weboHot: [],
                wechatOpinion: [],
                weboOpinion: [],
                radio1: '',
                radio2: '',
            }
        },
        components:{breadCrumb,overview},
        methods:{
            setBreadCrumb(){
                 /*设置面包屑*/
                let breadcrumb=[
                     {
                        name:"情报内参",to:{path:"/home/industryNews"}
                    },
                    {
                        name:"两微洞察",to:{path:"/home/seeClearly"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            information(tab, event) {
                console.log(tab, event);
            },
            vectorTrendClick(tab, event) {
                let vm = this;
                let dom = $(tab.$el).children()[0];
                //wait for vue render
                setTimeout(() => {
                    vm.getVectorTrend(dom, tab.name);
                }, 10);
            },
            /**获取载体走势*/
            getVectorTrend(dom, type) {
                let chart = echarts.init(dom);
                chart.showLoading();
                this.$http.post('/apis/twoMicroInsight/findTwoMicroInsightVectorTrend.json', {type: type}).then(
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
            get2VHot(vector, emotion) {
                let param = {
                    pageSize: 10,
                    pageNumber: 0,
                    orders: [
                        {
                            property: 'hitCount',
                            direction: 'DESC'
                        }
                    ],
                    vector: vector
                };
                if (emotion) {
                    param.emotion = emotion;
                }
                this.$http.post('/apis/twoMicroInsight/findTwoMicroInsightInfo.json', param).then(
                    (response) => {
                        if (response.data.success) {
                            if ('微信' == vector) {
                                this.wechatHot = response.data.data.content;
                            } else {
                                this.weboHot = response.data.data.content;
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            get2VOpinion(vector, emotion) {
                let param = {
                    pageSize: 10,
                    pageNumber: 0,
                    orders: [
                        {
                            property: 'publishDateTime',
                            direction: 'DESC'
                        }
                    ],
                    vector: vector
                };
                if (emotion) {
                    param.emotion = emotion;
                }
                this.$http.post('/apis/twoMicroInsight/findTwoMicroInsightInfo.json', param).then(
                    (response) => {
                        if (response.data.success) {
                            console.log(response.data.data);
                            if ('微信' == vector) {
                                this.wechatOpinion = response.data.data.content;
                            } else {
                                this.weboOpinion = response.data.data.content;
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
            this.getVectorTrend($('#TREND_TODAY>.text')[0], 'TODAY');
            this.get2VHot('微信');
            this.get2VHot('微博');
            this.get2VOpinion('微信');
            this.get2VOpinion('微博');
        },
        created(){
            this.setBreadCrumb();
        },
        watch: {
            radio1: function (val, oldVal) {
                this.get2VHot('微信', val);
                this.get2VHot('微博', val);
            },
            radio2: function(val, oldVal) {
                this.get2VOpinion('微信', val);
                this.get2VOpinion('微博', val);
            }
        }
  }