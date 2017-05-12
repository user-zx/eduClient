  import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss"; 
  import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
  import overview from '../overview.vue';
  import echarts from 'echarts';
  import vintage from "../../../../vintage.json";
  import china from "../../../../china.json";
  import searchBox from "../../../../components/searchBox/searchBox.vue";
  import dropDown from "../../../../components/dropdown/dropdown.vue";

  export default{
        data(){
            return {
                loading1: true,
                total1: 0,
                param1: {
                    pageSize: 15,
                    pageNumber: 0
                },
                tableData1: [],
                searchNames1: ['university', 'selectDate'],

                loading2: true,
                total2: 0,
                param2: {
                    pageSize: 15,
                    pageNumber: 0
                },
                tableData2: [],
                searchNames2: ['university', 'officialAcctType', 'selectDate'],

                university: '',
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
                radio3: '微信',
                weChatDistribute: {},
                weBoDistribute: {},
                distributeData: [],
                multipleSelection1:{},
                multipleSelection2:{},
            }
        },
        components:{breadCrumb, dropDown, overview,searchBox},
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
                 echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(dom,'vintage');
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
            /**获取两微分布*/
            get2VDistribute(vector) {
                this.$http.post('/apis/twoMicroInsight/findTwoMicroInsightDistributedAll.json', {vector: vector}).then(
                    (response) => {
                        if (response.data.success) {
                            response.data.data.visualMap = {
                                min: 0,
                                max: 20,
                                left: 'left',
                                top: 'bottom',
                                text: ['高','低'],
                                calculable: true
                            }
                            response.data.data.tooltip = {
                                trigger: 'item'
                            }
                            let data = response.data.data.series[0].data;
                            if (vector == "微信") {
                                this.weChatDistribute = response.data.data;
                                for (let i  = 0; i < data.length; i++) {
                                    let area = data[i].name;
                                    let index = this.distributeData.indexOf(area);
                                    if (index != -1) {
                                        this.distributeData[index].wechat = data[i].value;
                                    } else {
                                        this.distributeData.push({
                                            area: area,
                                            wechat: data[i].value,
                                            webo: 0
                                        });
                                    }
                                }
                                this.initDistribute(this.weChatDistribute);
                            } else {
                                this.weBoDistribute = response.data.data;
                                for (let i  = 0; i < data.length; i++) {
                                    let area = data[i].name;
                                    let index = this.distributeData.indexOf(area);
                                    if (index != -1) {
                                        this.distributeData[index].webo = data[i].value;
                                    } else {
                                        this.distributeData.push({
                                            area: area,
                                            wechat: 0,
                                            webo: data[i].value
                                        });
                                    }
                                }
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            initDistribute(option) {
                echarts.registerTheme('vintage', vintage);
                let chart = echarts.init(document.getElementById("carrierDis_graph"),'vintage');
                chart.setOption(option);
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
            getTableData(vector) {
                let param;
                let apiUrl;
                if ("微博" == vector) {
                    this.loading1 = true;
                    param = this.param1;
                    apiUrl = '/apis/businessTool/getMicroblogIndexData2.json';
                } else {
                    this.loading2 = true;
                    param = this.param2;
                    apiUrl = '/apis/businessTool/getWechatIndexData2.json';
                }
                param.pageSize = 15;
                this.$http.post(apiUrl, param).then(
                    (response) => {
                        if (response.data.success) {
                            if (!response.data.data) {
                                if (vector == "微博") {
                                    this.tableData1 = [];
                                    this.total1 = 0;
                                    this.loading1 = false;
                                } else {
                                    this.tableData2 = [];
                                    this.total2 = 0;
                                    this.loading2 = false;
                                }
                                return;
                            }
                            let page = response.data.data.page
                            let content = page.content;
                            for (var i = 0; i < content.length; i++) {
                                content[i].rank = (param.pageNumber) * param.pageSize +  i + 1;
                            }
                            if (vector == "微博") {
                                this.tableData1 = content;
                                this.total1 = page.totalElements;
                                this.loading1 = false;
                            } else {
                                this.tableData2 = content;
                                this.total2 = page.totalElements;
                                this.loading2 = false;
                            }

                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },

            handleCurrentChange1(val) {
                this.param1.pageNumber = val - 1;
                this.getTableData("微博");
            },
            onSearchDataChange1(data) {
                data.pageNumber = 0;
                this.param1 = data;
                this.getTableData("微博");
            },
            onSearchLoad1(data) {
                data.pageNumber = 0;
                this.param1 = data;
                this.getTableData("微博");
            },

            handleCurrentChange2(val) {
                this.param2.pageNumber = val - 1;
                this.getTableData("微信");
            },
            onSearchDataChange2(data) {
                data.pageNumber = 0;
                this.param2 = data;
                if (data.officialAcctType) {
                    let types = [];
                    types.push(data.officialAcctType);
                    data.officialAcctType = types;
                }
                this.getTableData("微信");
            },
            onSearchLoad2(data) {
                data.pageNumber = 0;
                this.param2 = data;
                this.getTableData("微信");
            },
            onSaveEvent1(eventId) {
                let contents = this.multipleSelection1.concernsContent;
                if (contents && contents.length > 0) {
                    let param = {
                        eventId: eventId,
                        contents: contents
                    };
                    this.$http.post('/apis/eventAnalysis/saveEventWeBo.json', param).then(
                        (response) => {
                            if (response.data.success) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: '单个事件不能超过100个微博号',
                                    type: 'error',
                                    duration: 2000
                                });
                            }
                        }, (response) => {
                            console.error(response);
                        }
                    );
                } else {
                    this.$message({
                        type: 'info',
                        message: '未选择微博号'
                    });
                }
            },
            onSaveEvent2(eventId) {
                let contents = this.multipleSelection2.concernsContent;
                if (contents && contents.length > 0) {
                    let param = {
                        eventId: eventId,
                        contents: contents
                    };
                    this.$http.post('/apis/eventAnalysis/saveEventWeChat.json', param).then(
                        (response) => {
                            if (response.data.success) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: '单个事件不能超过100个微信号',
                                    type: 'error',
                                    duration: 2000
                                });
                            }
                        }, (response) => {
                            console.error(response);
                        }
                    );
                } else {
                    this.$message({
                        type: 'info',
                        message: '未选择微信号'
                    });
                }
            },
            batchConcerned1(){
                this.multipleSelection1.concernsType = 4;
                if(this.multipleSelection1.concernsContent && this.multipleSelection1.concernsContent.length>0){
                    this.$http.post("/apis/concerns/saveConcernsMore.json",this.multipleSelection1).then(res=>{
                        if(res.data.success){
                            this.$notify({
                                title: '成功',
                                message: '关注成功',
                                type: 'success'
                            });
                        }else{
                            this.$notify({
                                title: '失败',
                                message: '关注失败',
                                type: 'error',
                                duration: 2000
                            });
                        }
                    },err=>{
                        console.log(err);
                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '未选择微博号'
                    });
                }
            },
            batchConcerned2(){
                this.multipleSelection2.concernsType = 3;
                if(this.multipleSelection2.concernsContent && this.multipleSelection2.concernsContent.length>0){
                    this.$http.post("/apis/concerns/saveConcernsMore.json",this.multipleSelection2).then(res=>{
                        if(res.data.success){
                            this.$notify({
                                title: '成功',
                                message: '关注成功',
                                type: 'success'
                            });
                        }else{
                            this.$notify({
                                title: '失败',
                                message: '关注失败',
                                type: 'error',
                                duration: 2000
                            });
                        }
                    },err=>{
                        console.log(err);
                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '未选择微信号'
                    });
                }
            },
            toWeiboDetail(data){
                data.startDate = this.param1.startDate;
                data.endDate = this.param1.endDate;
                this.$router.push({path:"/home/weiboDetail", query: data});
            },
            toWechatDetail(data){
                data.startDate = this.param2.startDate;
                data.endDate = this.param2.endDate;
                this.$router.push({path:"/home/weChatDetail", query: data});
            },
            batchConcerned() {

            },
            handleSelectionChange1(val) {
                this.multipleSelection1.concernsContent = [];
                for (var i = 0; i < val.length; i++) {
                    this.multipleSelection1.concernsContent.push(val[i].author)
                }
            },
            handleSelectionChange2(val) {
                this.multipleSelection2.concernsContent = [];
                for (var i = 0; i < val.length; i++) {
                    this.multipleSelection2.concernsContent.push(val[i].author)
                }
            },
            toDetail(data){
                this.$router.push({path: '/home/articleDetail', query: {id: data.id}});
            }
        },
        mounted(){
            echarts.registerMap('china', china);

            this.getVectorTrend($('#TREND_TODAY>.text')[0], 'TODAY');
            this.get2VHot('微信');
            this.get2VHot('微博');
            this.get2VOpinion('微信');
            this.get2VOpinion('微博');
            this.get2VDistribute("微信");
            this.get2VDistribute("微博");
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
            },
            radio3: function(val, oldVal) {
                if ('微信' == val) {
                    this.initDistribute(this.weChatDistribute)
                } else {
                    this.initDistribute(this.weBoDistribute);
                }
            }
        }
  }