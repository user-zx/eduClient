/**
* Created by zhangxin on 2017/3/27.
*/
<template>
    <div class="seeWeibo" id="seeWeibo" v-loading="loading" element-loading-text="加载中……">
        <el-tabs v-model="activeName" class="custom-tabs left-tabs" @tab-click="handleClick">
            <el-tab-pane label="微博统计" name="todayHot">
                <div id="search_container" class="search_container">
                    <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="clearfix btn-box">
                    <div class="pull-right">
                        <el-button type="primary" @click="verifyWeibo">微博认证</el-button>
                    </div>
                </div>
                <el-card class="box-card">
                    <el-table :data="weiboStatisticsData" :resizable="false" stripe style="width: 100%" border class="tran-table no-col-title yellow-table">
                        <el-table-column width="70" label="序号" align="center" type="index"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="author" label="微博号" align="center"></el-table-column>
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
            <el-tab-pane label="微博指数" name="weekHot">
                <div id="search_container1" class="search_container">
                    <search-box :searchNames=searchNames1 @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="btn-box clearfix">
                    <div class="pull-left">
                        <el-button type="primary">批量关注</el-button>
                    </div>
                    <div class="pull-right">
                        <el-button type="primary" @click="verifyWeibo">微博认证</el-button>
                    </div>
                </div>
                <el-card class="box-card">
                    <el-table :data="tableData" class="tran-table no-col-title yellow-table" stripe border style="width: 100%"
                              :resizable="false">
                        <el-table-column type="selection" width="50px" align="center"></el-table-column>
                        <el-table-column label="排名" align="center" width="110px">
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
                        <el-table-column label="微博号" prop="microblogName" align="center" :show-overflow-tooltip="true">
                            <template scope="scope">
                                <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                                    {{scope.row.microblogName}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="发博量" prop="sendCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="关注量" prop="concernsCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="粉丝量" prop="fansCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="转发量" prop="forwardCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="评论数" prop="replySum" align="center" width="110px"></el-table-column>
                        <el-table-column label="点赞总数" prop="supportSum" align="center" width="110px"></el-table-column>
                        <el-table-column label="平均点赞量" prop="supportAvg" align="center" width="110px"></el-table-column>
                        <el-table-column label="认证状态" prop="authcStatus" align="center">
                            <template scope="scope">
                                <span v-if="scope.row.authcStatus == '1'">已认证</span>
                                <span v-else>未认证</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="scss" scoped>
    .seeWeibo{
        .search_container{
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
                weiboStatisticsData: [],
                searchNames: ['verified', 'exactDate'],
                searchNames1: ['exactDate'],
                tableData:　[],
                hotParam: {
                    pageSize: 15,
                    pageNumber: 0,
                    authcStatus: '',
                    startDate: '',
                    endDate: ''
                },
                statisticsParam: {
                    pageSize: 15,
                    pageNumber: 0,
                    authcStatus: '',
                    startDate: '',
                    endDate: ''
                },
                loading:true,
            }
        },
        components:{searchBox} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"业务平台",to:{path:"/home/seeWeibo"}
                    },
                    {
                        name:"微博监测"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            handleClick(event) {
//                this.loading = true;
                if(event.index == 0){
                    //微博统计tab页，请求对应数据
                    this.getWeiboStatisticsData();
                }else{
                    //微博指数tab页，请求对应数据
                    this.getWeiboHotArticleList();
                }
            },
            onSearchDataChange(data) {
                //因为后台搜索认证条件时， 已认证、未认证传的参数是相应的汉字，但是全部要传空
                if(data.verified == '全部'){
                    data.verified = '';
                }
                //根据tab页当前状态 判断请求的是微博指数还是微博统计的后台
                if($('#seeWeibo .el-tabs__nav .el-tabs__item:eq(0)').hasClass('is-active')){
                    this.statisticsParam.authcStatus = data.verified;
                    this.statisticsParam.startDate = data.startDate;
                    this.statisticsParam.endDate = data.endDate;
                    this.getWeiboStatisticsData();
                }else{
                    this.hotParam = data;
                    this.hotParam.authcStatus = '';
                    this.hotParam.startDate = data.startDate;
                    this.hotParam.endDate = data.endDate;
                    this.getWeiboHotArticleList();
                }
            },
            toCharacterAnalyse(data){
                this.$router.push({path:"/home/characterAnalyse"});
            },
            toVerified(data){
//                console.log(data)
                this.$router.push({path: "/home/weiboVerify", query: data});
            },

            //微博指数数据获取
            getWeiboHotArticleList(){
//                console.log(this.hotParam)
                this.$http.post('/apis/businessTool/getMicroblogIndexData.json', this.hotParam).then(
                    (response) => {
                        if(response.data.success){
                            this.loading = false;
                            let content = response.data.data.page.content;
                            for(var i = 0; i < content.length; i++){
                                content[i].rank = i + 1;
                            }
                            this.tableData = content;
                        }
                    }
                )
            },

            //微博统计数据获取
            getWeiboStatisticsData(){
//                console.log(this.statisticsParam)
                this.$http.post('/apis/businessTool/getMicroblogData.json', this.statisticsParam).then(
                    (response) => {
                        this.loading = false;
//                        console.log(response.data)
                        if(response.data.success){
                            this.weiboStatisticsData = response.data.data.page.content;
                        }
                    }
                )
            },

            verifyWeibo(){
                this.$router.push({path: "/home/weiboVerify"});
            }
        },
        created(){
            this.setBreadCrumb();
            this.getWeiboStatisticsData()
        },
        mounted(){

        }
    }
</script>