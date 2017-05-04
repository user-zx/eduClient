/**
* Created by lifei on 2017/3/30.
*/
<template>
    <div class="article-wrap myAttention-weibo">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
        <div class="content dark">
            <div class="content-bar clearfix">
                <div class="content-bar-button">
                    <el-dropdown class="event-store-box" trigger="click">
                        <el-button type="primary" icon="plus" class="button-icon">
                            事件库
                        </el-button>
                        <el-dropdown-menu slot="dropdown" class="event-store-item">
                            <el-dropdown-item>事件1</el-dropdown-item>
                            <el-dropdown-item>事件2</el-dropdown-item>
                            <el-dropdown-item>事件3</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" icon="plus">取消关注</el-button>
                </div>
                <div class="content-bar-pagination">
                    <el-pagination class="edu-pagination"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>
            <el-card class="box-card">
                <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                          :resizable="false">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column label="排名" align="center" prop="all">
                        <template scope="scope">
                            <span v-if="scope.row.all == 1">
                                 <i class="icon-rank icon-gold"></i>
                            </span>
                            <span v-else-if="scope.row.all == 2">
                                <i class="icon-rank icon-silver"></i>
                           </span>
                            <span v-else-if="scope.row.all == 3">
                                 <i class="icon-rank icon-copper"></i>
                            </span>
                            {{scope.row.all}}
                        </template>
                    </el-table-column>
                    <el-table-column label="微博号" prop="name" align="center">
                        <template scope="scope">
                            <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                                {{scope.row.microblogName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发博量" prop="sendCount" align="center"></el-table-column>
                    <el-table-column label="关注量" prop="concernsCount" align="center"></el-table-column>
                    <el-table-column label="粉丝量" prop="fansCount" align="center"></el-table-column>
                    <el-table-column label="转发量" prop="forwardCount" align="center"></el-table-column>
                    <el-table-column label="评论数" prop="replySum" align="center"></el-table-column>
                    <el-table-column label="点赞总数" prop="supportSum" align="center"></el-table-column>
                    <el-table-column label="平均点赞量" prop="supportAvg" align="center"></el-table-column>
                    <el-table-column label="认证状态" prop="authcStatus" align="center" width="140px">
                        <template scope="scope">
                            <span v-if="scope.row.authcStatus == '1'">已认证</span>
                            <span v-if="scope.row.authcStatus == '0'">
                                未认证
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .myAttention-weibo{
        .content .content-bar .content-bar-button{
            margin-left: 20px;
        }
        .blue{
            color: #60a3ff;
        }
    }
</style>
<script>
    import searchBox from '../../../components/searchBox/searchBox.vue';
    export default{
        data(){
            return {
                currentPage: 1,
                total: 0,
                param: {
                    pageSize: 5,
                    pageNumber: 0,
                    vector:[],
                    authcStatus:"",
                    startDate:"",
                    endDate:"",
                    university:[],
                },
                searchNames: ['university', 'type', 'verified', 'exactDate'],
                articleData: [],
                loading:true,
                curContent: this.$store.state.curContent,
                tableData: [],
            }
        },
        components: {searchBox},
        methods:{
            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
            },
            onSearchDataChange(data) {
                 this.param.vector = [];
                this.param.vector.push(data.type)
                this.param.authcStatus = data.verified;
                this.currentPage = 1;
                this.param = data;
                this.getWeiboData();
            },
            getWeiboData(){
                this.$http.post("/apis/concerns/getMicroblogData.json",this.param).then((res)=>{
                    if(res.data.success){
                        this.total = res.data.data.page.totalElements>10000?10000:res.data.data.page.totalElements;
                        for (var i = 0; i < res.data.data.page.content.length; i++) {
                            this.tableData.push(res.data.data.page.content[i])
                        }
                    }
                },(err)=>{
                    
                })
            },
            toVerified(data){

            }
        },
        created(){

        },
        mounted(){
            this.$nextTick(function(){
                this.getWeiboData();
            })          
        },
    }
</script>