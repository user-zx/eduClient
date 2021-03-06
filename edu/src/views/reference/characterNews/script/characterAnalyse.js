/**
 * Created by yuwei on 2017/4/1.
 */
import "vue-style-loader!css-loader!sass-loader!../css/characterAnalyse.scss";
import echarts from "echarts";
import vintage from "../../../../vintage.json";
import dropDown from "../../../../components/dropdown/dropdown.vue";
import warnDropDown from "../../../../components/dropdown/warnDropDown.vue";
import "echarts-wordcloud";

export default{
    data(){
        return {
            characterInfo: [{
                university: '',
                department: '',
                job: '',
                publicAccount: '',
                weibo: ''
            }],
            hasWarn: false,
            tableData: [],
            vectorTableColumn: [],
            param: {},
            timeLineData: [],
            activeName: 'related',
            selectDate: '',
            time_loading: true,
            warnPermission: true,
            eventPermission: true
        }
    },
    components: {dropDown, warnDropDown},
    methods: {
        setBreadCrumb(){
            let breadcrumb = [
                {
                    name: "情报内参", to: {path: "/"}
                },
                {
                    name: "人物动态", to: {path: "/home/characterNews"}
                },
                {
                    name: "人物分析"
                }
            ];
            this.$store.commit("setBreadCrumb", breadcrumb);
        },
        getPersonageInfo(){
            this.$http.post('/apis/opinionMonitor/getPersonageInfo.json', {personage: this.param.name}).then(
                (response) => {
                    if (response.data.success) {
                        this.characterInfo = [response.data.data];
                        this.hasWarn = response.data.data.hasWarn;
                    } else {
                        console.error(response.data.message);
                    }
                }, (response) => {
                    console.error(response);
                }
            );
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
        toDetail(data){
            this.$router.push({path: '/home/articleDetail', query: {id: data.id}});
        },
        onSaveEvent(eventId){
            let requestParam = {
                eventId: eventId,
                contents: [this.param.name]
            }
            this.$http.post('/apis/eventAnalysis/saveEventPersonage.json', requestParam).then(
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
                            message: '单个事件不能超过100个人物',
                            type: 'error',
                            duration: 2000
                        });
                    }
                }, (response) => {
                    console.error(response);
                }
            );
        },
        saveWarn(id) {
            let ids = [this.param.name];
            let param = {
                warnId: id,
                contents: ids
            };
            this.$http.post('/apis/opinionWarn/saveWarnPersonage.json', param).then(
                (response) => {
                    if (response.data.success) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success',
                            duration: 2000
                        });
                    } else {
                        console.error(response.data.message);
                    }
                }, (response) => {
                    console.error(response);
                }
            );
        },
        concernedPersonage(){
            let param = {};
            param.concernsType = 2;
            param.concernsContent = [this.param.name];
            this.$http.post("/apis/concerns/saveConcernsMore.json", param).then(res=>{
                this.hasWarn = true;
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
            });
        },
        cancelConcern(){
            let param = {};
            param.concernsType = 2;
            param.concernsContent = [this.param.name];
            this.$http.post("/apis/concerns/removeConcernsMore.json", param).then(res=>{
                this.hasWarn = false;
                if(res.data.success){
                    this.$notify({
                        title: '成功',
                        message: '取消关注成功',
                        type: 'success'
                    });
                }else{
                    this.$notify({
                        title: '失败',
                        message: '取消关注失败',
                        type: 'error',
                        duration: 2000
                    });
                }
            },err=>{
                console.log(err);
            });
        },
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
        if (this.param.name) {
            this.param.reportPersonage = this.param.name;
        }
    },
    mounted() {
        echarts.registerTheme('vintage', vintage);
        this.getPersonageInfo();
        this.getActionTrail();
        this.getPersonageArticle(this.param.endDate.split(' ')[0]);
        this.getEmotionTrend();
        this.getEmotionVal();
        this.getMediaVolume();
        this.getMediaHot();
        this.getKeyWordsData();
        this.$nextTick(function () {
            this.warnPermission = this.$root.$children[0].$children[0].warnPermission;
            this.eventPermission = this.$root.$children[0].$children[0].eventPermission;
        });
    }
}
