/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="seeWeChat" id="seeWeChat" v-loading="loading" element-loading-text="加载中……">
        <el-tabs v-model="activeName" class="custom-tabs left-tabs" @tab-click="handleClick">
            <el-tab-pane label="微信统计" name="todayHot">
                <div id="search_container">
                    <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="clearfix btn-box">
                    <div class="pull-right">
                        <el-button type="primary" @click="verifyWechat">微信认证</el-button>
                    </div>
                </div>
                <el-card class="box-card">
                    <el-table :data="wechatStatisticsData" :resizable="false" stripe style="width: 100%" border class="tran-table no-col-title yellow-table">
                        <el-table-column type="index" width="70" label="序号"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="author" label="公众号" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="university" label="所属" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="responsibleUser" label="负责人" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="responsibleEmail" label="负责人邮箱" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="responsibleTel" label="负责人电话" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishUser" label="发布人" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishEmail" label="发布人邮箱" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishTel" label="发布人电话" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="authcStatus" label="认证情况" align="center" width="140px">
                            <template scope="scope">
                                <span v-if="scope.row.authcStatus == '1'">已认证</span>
                                <span v-else>
                                    未认证，<span class="blue pointer" @click="toVerified(scope.row)">去认证</span>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="微信指数" name="weekHot">
                <div id="search_container1">
                    <search-box :searchNames=searchNames1 @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="btn-box clearfix">
                    <div class="pull-left">
                        <el-button type="primary">批量关注</el-button>
                    </div>
                    <div class="pull-right">
                        <el-button type="primary" @click="verifyWechat">微信认证</el-button>
                    </div>
                </div>
                <el-card class="box-card">
                    <el-table :data="wechatExponentData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                              :resizable="false">
                        <el-table-column type="selection" width="50" align="center"></el-table-column>
                        <el-table-column label="排名" align="center" prop="rank">
                            <template scope="scope">
                            <span v-if="scope.row.rank == 1">
                                 <i class="icon-rank icon-gold"></i>
                            </span>
                                <span v-else-if="scope.row.rank == 2">
                                <i class="icon-rank icon-silver"></i>
                           </span>
                                <span v-else-if="scope.row.rank == 3">
                                 <i class="icon-rank icon-copper"></i>
                            </span>
                                {{scope.row.rank}}
                            </template>
                        </el-table-column>
                        <el-table-column label="公众号" prop="author" align="center" :show-overflow-tooltip="true">
                            <template scope="scope">
                                <span @click="toWechatDetail(scope.row)" class="character-name">
                                    {{scope.row.author}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="文章数" prop="articleCount" align="center"></el-table-column>
                        <el-table-column label="总点赞量" prop="supportSum" align="center"></el-table-column>
                        <el-table-column label="总阅读量" prop="hitSum" align="center"></el-table-column>
                        <el-table-column label="平均阅读量" prop="hitAvg" align="center"></el-table-column>
                        <el-table-column label="平均点赞量" prop="supportAvg" align="center"></el-table-column>
                        <el-table-column label="活跃指数" prop="activityIndex" align="center"></el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="scss" scoped>
    #search_container{
        padding: 15px 0 1px;
        background-color: #141725;
    }
    .btn-box{
        padding:20px 20px 0;
    }
    .mt20{margin-top: 20px;}
    .character-name{
        cursor: pointer;
    }
    .blue{
        color: #60a3ff;
    }
</style>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import searchBox from  './../../../../components/searchBox/searchBox.vue';
    import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss";
    export default{
        data(){
            return {
                activeName: 'todayHot',
                //微信统计请求参数
                statisticsParam: {
                    pageSize: 15,
                    pageNumber: 0,
                    authcStatus: ''
                },
                //微信指数请求参数
                exponentParam: {
                    pageSize: 15,
                    pageNumber: 0,
                    authcStatus: ''
                },
                //微信统计返回参数
                wechatStatisticsData: [],
                //微信指数返回参数
                wechatExponentData: [],
                searchNames: ['verified', 'exactDate'],
                searchNames1: ['exactDate'],
                loading: true
            }
        },
        components:{searchBox} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"业务平台",to:{path:"/home/seeWeChat"}
                    },
                    {
                        name:"微信监测"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            handleClick(event) {
                if(event.index == 0){
                    //微博统计tab页，请求对应数据
                    this.getWechatStatisticsData();
                }else{
                    //微博指数tab页，请求对应数据
                    this.getWechatExponentData();
                }
            },
            onSearchDataChange(data) {
                //因为后台搜索认证条件时， 已认证、未认证传的参数是相应的汉字，但是全部要传空
                if(data.verified == '全部'){
                    data.verified = '';
                }
                data.pageSize = 15;
                data.pageNumber = 0;
                //根据tab页当前状态 判断请求的是微博指数还是微博统计的后台
                if($('#seeWeChat .el-tabs__nav .el-tabs__item:eq(0)').hasClass('is-active')){
                    this.statisticsParam = data;
                    this.statisticsParam.authcStatus = data.verified;
                    this.getWechatStatisticsData();
                }else{
                    this.exponentParam = data;
                    this.getWechatExponentData();
                }
            },

            toVerified(data){
                this.$router.push({path: "/home/weChatVerify", query: data});
            },

            getWechatStatisticsData: function () {
                this.$http.post('/apis/businessTool/getWechatData.json', this.statisticsParam).then(
                    (response) => {
                        this.loading = false;
                        if(response.data.success){
                            this.wechatStatisticsData = response.data.data.page.content;
                        }
                    }
                )
            },

            getWechatExponentData(){
                this.$http.post('/apis/businessTool/getWechatIndexData.json', this.exponentParam).then(
                    (response) => {
                        let content = response.data.data.page.content;
                        for(let i = 0; i < content.length; i++){
                            content[i].rank = i + 1;
                        }
                        this.wechatExponentData = content;
                    }
                )
            },

            toWechatDetail(data){
                data.startDate = this.exponentParam.startDate;
                data.endDate = this.exponentParam.endDate;
                this.$router.push({path:"/home/weChatDetail", query: data});
            },

            verifyWechat(){
                this.$router.push({path: "/home/weChatVerify"});
            }
        },
        created(){
            this.setBreadCrumb();
            this.getWechatStatisticsData();
        },
        mounted(){

        }
    }
</script>