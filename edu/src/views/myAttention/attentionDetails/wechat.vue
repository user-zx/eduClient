/**
* Created by lifei on 2017/3/30.
*/
<template>
    <div class="article-wrap myAttention-wechat">
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
                    <el-table-column label="排名" align="center" prop="index">
                        <template scope="scope">
                            <span v-if="scope.row.index == 1">
                                 <i class="icon-rank icon-gold"></i>
                            </span>
                            <span v-else-if="scope.row.index == 2">
                                <i class="icon-rank icon-silver"></i>
                           </span>
                            <span v-else-if="scope.row.index == 3">
                                 <i class="icon-rank icon-copper"></i>
                            </span>
                            {{scope.row.index}}
                        </template>
                    </el-table-column>
                    <el-table-column label="公众号" prop="wechatNumber" align="center"></el-table-column>
                    <el-table-column label="文章数" prop="articleCount" align="center"></el-table-column>
                    <el-table-column label="总点赞量" prop="supportSum" align="center"></el-table-column>
                     <el-table-column label="平均点赞量" prop="supportAvg" align="center"></el-table-column>
                    <el-table-column label="总阅读量" prop="hitSum" align="center"></el-table-column>
                    <el-table-column label="平均阅读量" prop="hitAvg" align="center"></el-table-column>
                    <el-table-column label="活跃指数" prop="activityIndex" align="center"></el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .myAttention-wechat{
        .content-bar-button{
            margin-left: 20px;
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
                this.getWechatData();
            },
            onSearchDataChange(data) {
                this.param.vector = [];
                this.param.vector.push(data.type)
                this.param.authcStatus = data.verified;
                this.currentPage = 1;
                this.param = data;
                this.getWechatData();
            },
            getWechatData(){
                this.tableData = [];
                this.$http.post("/apis/concerns/getWechatData.json", this.param).then((res)=>{
                   // console.log(this.param);
                    console.log(res);
                    if(res.data.success){
                        this.total = res.data.data.page.totalElements> 10000 ? 10000 : res.data.data.page.totalElements;
                        for (var i = 0; i < res.data.data.page.content.length; i++) {
                            res.data.data.page.content[i].index = i+1;
                            this.tableData.push(res.data.data.page.content[i])
                        }
                    }
                },(err)=>{
                    console.log(err);
                })
            }
        },
        created(){

        },
        mounted(){
            this.$nextTick(function(){
                this.getWechatData();
            })
            /*let articleData = [
                {
                    'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                    'attitude': 'positive',
                    'buttonType': 'warning',
                    'buttonText': '预警',
                    'source': '新浪博客',
                    'author': '梦想家期刊',
                    'readNum': '2342',
                    'publishDate': '2016-12-12 12:12',
                    'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                },
                {
                    'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                    'attitude': 'negative',
                    'buttonType': 'warning',
                    'buttonText': '预警',
                    'source': '新浪博客',
                    'author': '梦想家期刊',
                    'readNum': '2342',
                    'publishDate': '2016-12-12 12:12',
                    'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                },
                {
                    'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                    'attitude': 'positive',
                    'buttonType': 'warning',
                    'buttonText': '预警',
                    'source': '新浪博客',
                    'author': '梦想家期刊',
                    'readNum': '2342',
                    'publishDate': '2016-12-12 12:12',
                    'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                },
                {
                    'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                    'attitude': 'positive',
                    'buttonType': 'warning',
                    'buttonText': '预警',
                    'source': '新浪博客',
                    'author': '梦想家期刊',
                    'readNum': '2342',
                    'publishDate': '2016-12-12 12:12',
                    'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                },
                {
                    'title': '杂志赤峰学院学报栏目设置和论文参考的目录',
                    'attitude': 'negative',
                    'buttonType': 'warning',
                    'buttonText': '预警',
                    'source': '新浪博客',
                    'author': '梦想家期刊',
                    'readNum': '2342',
                    'publishDate': '2016-12-12 12:12',
                    'content': '湖北工程学院新技术学院历来重视学生的心理健康教育问题，逐步健全了“测评—筛查—访谈—干预—跟踪”的心理健康教育体系；成立了由分管领导任组长的大学生心理健康教育工作领导小组；建立了心理咨询中心，安排一批经验丰富、心理学基础知识扎实思想道德素质高的教师对学生进行心理辅导,帮助学生克服心理障碍，减少大学生心理疾病的发生,避免由于心理危机而引起伤害行为的发生。'
                }
            ];
            
            this.articleData = articleData;*/
        },
    }
</script>