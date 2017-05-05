
<template>
    <div class="seeWeChat" id="seeWeChat" v-loading="loading" element-loading-text="加载中……">
        <el-tabs v-model="activeName" class="custom-tabs left-tabs" @tab-click="handleClick">
            <el-tab-pane label="微信统计" name="todayHot">
                <div id="search_container">
                    <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="clearfix btn-box">
                    <div class="pull-left">
                        <el-button type="primary" @click="verifyWechat">微信认证</el-button>
                    </div>
                    <div class="pull-right content-bar-page">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleCurrentChange1"
                                       :current-page="statisticsParam.pageNumber + 1"
                                       :page-size="15"
                                       layout="prev, next, jumper, total"
                                       :total="total1">
                        </el-pagination>
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
                        <el-button type="primary" @click="batchConcerned">批量关注</el-button>
                        <el-button type="primary" @click="verifyWechat">微信认证</el-button>
                    </div>
                    <div class="pull-right content-bar-page">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleCurrentChange2"
                                       :current-page="exponentParam.pageNumber + 1"
                                       :page-size="15"
                                       layout="prev, next, jumper, total"
                                       :total="total2">
                        </el-pagination>
                    </div>
                </div>
                <el-card class="box-card">
                    <el-table :data="wechatExponentData" class="tran-table no-col-title yellow-table" stripe border style="width: 100%"
                              :resizable="false" @selection-change="handleSelectionChange">
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
        .pull-left{
            .el-button{
                margin-top: 25px;
                margin-left: 20px;
            }
        }
    }

    .character-name{
        cursor: pointer;
    }
    .blue{
        color: #60a3ff;
    }
</style>
<script>
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
                loading: true,
                multipleSelection:{},
                total1: 0,
                total2: 0
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
                this.loading = true;
                this.$http.post('/apis/businessTool/getWechatData.json', this.statisticsParam).then(
                    (response) => {
                        this.loading = false;
                        if(response.data.success){
                            this.wechatStatisticsData = response.data.data.page.content;
                            this.total1 = response.data.data.page.totalElements;
                        }
                    }
                )
            },

            getWechatExponentData(){
                this.loading = true;
                this.$http.post('/apis/businessTool/getWechatIndexData.json', this.exponentParam).then(
                    (response) => {
                        let content = response.data.data.page.content;
                        for(let i = 0; i < content.length; i++){
                            content[i].rank = i + 1;
                        }
                        this.total2 = response.data.data.page.totalElements;
                        this.wechatExponentData = content;
                        this.loading = false;
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
            },
            handleSelectionChange(val){
                  this.multipleSelection.concernsContent = [];
               for (var i = 0; i < val.length; i++) {
                   this.multipleSelection.concernsContent.push(val[i].wechatNumber)
               }
            },
            batchConcerned(){ 
               this.multipleSelection.concernsType = 3; 
				
               if(this.multipleSelection.concernsContent.length>0){
                    this.$http.post("/apis/concerns/saveConcernsMore.json",this.multipleSelection).then(res=>{
                        //console.log(res);
                        if(res.data.success){
                            this.$message({
                                type: 'success',
                                message: '关注成功'
                            })
                        }else{
                            this.$message.error('关注失败');
                        }
                    },err=>{
                        console.log(err);
                    })
               }
            },

            handleCurrentChange1(pageNumber){
                this.statisticsParam.pageNumber = pageNumber - 1;
                this.getWechatStatisticsData();
            },

            handleCurrentChange2(pageNumber){
                this.exponentParam.pageNumber = pageNumber - 1;
                this.getWechatExponentData();
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