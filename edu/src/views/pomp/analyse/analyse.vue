/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="analyse">
        <bread-crumb></bread-crumb>
        <div id="search-container">
            <search-box :searchData=searchData></search-box>
        </div>
        <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer">阅读量</li>
                    <li class="pointer">时间</li>
                </ul>
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

                    <!--<el-button type="primary" icon="plus" class="button-icon">事件库</el-button>-->

                    <el-button type="primary" icon="plus" class="button-icon">批量关注</el-button>
                </div>
                <div class="content-bar-page">
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
            <articleContainer :articleData=articleData></articleContainer>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import "vue-style-loader!css-loader!sass-loader!./css/analyse.scss";
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    import searchBox from '../../../components/searchBox/searchBox.vue'
    import articleContainer from '../../../components/content/article.vue'

    export default{
        data(){
            return {
                msg: "舆情监测",
                searchData:"",
                articleData: "",
                activeIndex: '1',
                currentPage: 1,
            }
        },
        components: {breadCrumb, searchBox, articleContainer},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/"}
                    },
                    {
                        name:"舆情监测",to:{path:"/analyse"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            handleSelect(key, keyPath){
                console.log(key)
                console.log(keyPath)
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            }
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){
            let searchData = [
                {
                    'title' :  '选择高校:',
                    'searchList': [
                        {id: 0, text: '全部', selected: true},
                        {id: 1, text: '北京大学'},
                        {id: 2, text: '北京航空航天大学'},
                        {id: 3, text: '清华大学'},
                        {id: 4, text: '中央民族大学'},
                        {id: 5, text: '北京邮电大学'},
                        {id: 6, text: '北京传媒大学'},
                        {id: 7, text: '北京科技大学'},
                        {id: 8, text: '北京科技大学'},
                        {id: 9, text: '北京科技大学'},
                        {id: 10, text: '北京科技大学'},
                        {id: 11, text: '北京科技大学'}
                    ],
                    'hasMore': true,
                    'multiple': true,
                    'buttons': [
                        {'buttonText': '添加高校', 'id': 'add-college-btn'},
                        {'buttonText': '清空', 'id': 'clear-college-btn'}
                    ]
                },
                {
                    'title': '高校维度:',
                    'searchList': [
                        {id: 0, text: '校园舆情', selected: true},
                        {id: 1, text: '校园安全'},
                        {id: 2, text: '违规违纪'},
                        {id: 3, text: '媒体报道'},
                        {id: 4, text: '人才培养'},
                        {id: 5, text: '科学研究'},
                        {id: 6, text: '微信微博'},
                        {id: 7, text: '论坛贴吧'},
                        {id: 8, text: '敏感时期'},
                        {id: 9, text: '人物聚焦'}
                    ],
                    'hasMore': false,
                    'multiple': true,
                    'buttons': []
                },
                {
                    'title': '载体:',
                    'searchList': [
                        {id: 0, text: '不限', selected: true},
                        {id: 1, text: '论坛'},
                        {id: 2, text: '微博'},
                        {id: 3, text: '微信'},
                        {id: 4, text: 'QQ群'},
                        {id: 5, text: '博客'},
                        {id: 6, text: '网站门户'},
                        {id: 7, text: '贴吧'}
                    ],
                    'hasMore': false,
                    'multiple': true,
                    'buttons': []
                },
                {
                    'title': '情感:',
                    'searchList': [
                        {id: 0, text: '不限'},
                        {id: 1, text: '正面', selected: true},
                        {id: 2, text: '负面'}
                    ],
                    'hasMore': false,
                    'multiple': false,
                    'buttons': []
                },
                {
                    'title': '时间:',
                    'searchList': [
                        {id: 0, text: '不限'},
                        {id: 1, text: '今天', selected: true},
                        {id: 2, text: '昨天'},
                        {id: 3, text: '近7天'},
                        {id: 4, text: '近一个月'},
                        {id: 5, text: '自定义时间', dateBox: 'show'}
                    ],
                    'hasMore': false,
                    'multiple': false,
                    'buttons': []
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
        },

    }
</script>