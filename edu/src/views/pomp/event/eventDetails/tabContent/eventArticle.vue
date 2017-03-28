/**
* Created by zhangxin on 2017/3/24.
*/
<template>
    <div class="article-wrap">
        <div id="search_container">
            <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
        </div>
        <div class="content dark">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer arrow-up">
                        阅读量
                    </li>
                    <li class="pointer arrow-down">时间</li>
                </ul>
                <div class="content-bar-button">
                    <el-button type="primary" icon="plus" class="button-icon" @click="follows()">批量关注</el-button>
                </div>
                <div class="content-bar-pagination">
                    <el-pagination class="edu-pagination"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="100">
                    </el-pagination>
                </div>
            </div>
            <articleContainer :articleData="articleData" class="dark"></articleContainer>
        </div>
    </div>
</template>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    import "vue-style-loader!css-loader!sass-loader!../../../analyse/css/analyse.scss"
    import searchBox from '../../../../../components/searchBox/searchBox.vue';
    import articleContainer from '../../../../../components/content/article.vue';
    export default{
        data(){
            return {
                msg:"事件文章",
                searchData:"",
                articleData: "",
                activeIndex: '1',
                currentPage: 1,
                searchNames: ['vector', 'emotion', 'publishDateTime']
            }
        },
        components:{ searchBox, articleContainer,} ,
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            },
            follows(){
                this.$notify({
                    title:"成功",
                    message:"批量添加关注成功！",
                    type:"success"
                })
            },
            onSearchDataChange(data) {
                console.log("change callback, data :");
                console.log(data);
            }
        },
        mounted(){
            let searchData = [
                {
                    'title': '载体:',
                    'searchList': [
                        {id: 0, text: '不限', selected: true},
                        {id: 1, text: '论坛', selected: false},
                        {id: 2, text: '微博', selected: false},
                        {id: 3, text: '微信', selected: false},
                        {id: 4, text: 'QQ群', selected: false},
                        {id: 5, text: '博客', selected: false},
                        {id: 6, text: '网站门户', selected: false},
                        {id: 7, text: '贴吧', selected: false}
                    ],
                    'hasMore': false,
                    'multiple': false,
                    'buttons': [],
                    'hasDateBox': false
                },
                {
                    'title': '情感:',
                    'searchList': [
                        {id: 0, text: '不限', selected: false},
                        {id: 1, text: '正面', selected: true},
                        {id: 2, text: '负面', selected: false}
                    ],
                    'hasMore': false,
                    'multiple': false,
                    'buttons': [],
                    'hasDateBox': false
                },
                {
                    'title': '时间:',
                    'searchList': [
                        {id: 0, text: '不限', selected: false},
                        {id: 1, text: '今天', selected: true},
                        {id: 2, text: '昨天', selected: false},
                        {id: 3, text: '近7天', selected: false},
                        {id: 4, text: '近一个月', selected: false},
                        {id: 5, text: '自定义时间', dateBox: 'show', selected: false}
                    ],
                    'hasMore': false,
                    'multiple': false,
                    'buttons': [],
                    'hasDateBox': true
                }
            ];
            this.searchData = searchData;

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
        }
    }
</script>