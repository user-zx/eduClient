/**
* Created by lifei on 2017/3/30.
*/
<template>
    <div class="article-wrap myAttention-wechat">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
        <div class="content dark">
            <div class="content-bar">
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
                <el-table-column label="公众号" prop="name" align="center"></el-table-column>
                <el-table-column label="文章数" prop="voiceNum" align="center"></el-table-column>
                <el-table-column label="总点赞量" prop="readNum" align="center"></el-table-column>
                <el-table-column label="总阅读量" prop="readNum" align="center"></el-table-column>
                <el-table-column label="平均阅读量" prop="readNum" align="center"></el-table-column>
                <el-table-column label="平均点赞量" prop="readNum" align="center"></el-table-column>
                <el-table-column label="活跃指数" prop="readNum" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .myAttention-wechat{
        .content-bar-button{
            margin-left: 15px;
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
                    dimension: '微信',
                    orders: [
                        {
                            property: 'hitCount',
                            direction: 'DESC'
                        },
                        {
                            property: 'publishDateTime',
                            direction: 'DESC'
                        }
                    ]
                },
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                articleData: [],
                loading:true,
                curContent: this.$store.state.curContent,
                tableData: [
                    {
                        'id': 1,
                        'all': 1,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 2,
                        'all': 2,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 3,
                        'all': 3,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 4,
                        'all': 4,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 5,
                        'all': 5,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 6,
                        'all': 6,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 7,
                        'all': 7,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 8,
                        'all': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 9,
                        'all': 9,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 10,
                        'all': 10,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 11,
                        'all': 11,
                        'name': '习1总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 12,
                        'all': 12,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },{
                        'id': 13,
                        'all': 13,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 14,
                        'all': 14,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    },
                    {
                        'id': 15,
                        'all': 15,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    }
                    ,
                    {
                        'id': 16,
                        'all': 16,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': '已认证'
                    }
                ]
            }
        },
        components: {searchBox},
        methods:{
            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
            },
            onSearchDataChange(data) {
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.currentPage = 1;

            },
            sort(index) {
                this.param.orders[index].direction = this.param.orders[index].direction == 'DESC' ? 'ASC' : 'DESC';
            },
        },
        created(){

        },
        mounted(){

            let articleData = [
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

            this.articleData = articleData;
        },
    }
</script>