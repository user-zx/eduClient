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
                    <el-button type="primary" icon="plus" class="button-icon">事件库</el-button>
                    <el-button type="primary" icon="plus" class="button-icon">批量关注</el-button>
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
                articleData: ""
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
            }
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){
            let searchData = [
                {
                    'firstText' :  '选择高校:',
                    'searchText': [
                        {id: 0, text: '全部'},
                        {id: 1, text: '北京大学'},
                        {id: 2, text: '北京航空航天大学'},
                        {id: 3, text: '清华大学'},
                        {id: 4, text: '中央民族大学'},
                        {id: 5, text: '北京邮电大学'},
                        {id: 6, text: '北京传媒大学'},
                        {id: 7, text: '北京科技大学'}
                    ],
                    'buttonInfo': [
                        {'buttonText': '添加高校', 'id': 'add-college-btn'},
                        {'buttonText': '清空', 'id': 'clear-college-btn'}
                    ]
                },
                {
                    'firstText': '高校维度:',
                    'searchText': [
                        {id: 0, text: '校园舆情'},
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
                    'buttonInfo': 'N'
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