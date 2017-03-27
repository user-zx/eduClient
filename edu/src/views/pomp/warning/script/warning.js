
import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
 import searchBox from '../../../../components/searchBox/searchBox.vue';
 import "vue-style-loader!css-loader!sass-loader!../../analyse/css/analyse.scss";
  import articleContainer from '../../../../components/content/article.vue';
export default{
    data(){ 
        return {
            msg:"舆情预警",
            searchData:'',
            currentPage:1,
            showArticle: true,
            articleData:"",
        }
    },
    components:{breadCrumb,searchBox,articleContainer},
    methods:{
        setBreadCrumb(){
             /*设置面包屑*/
            let breadcrumb=[
                {
                    name:"舆情管理",to:{path:"/home/panorama"}
                },
                {
                    name:"舆情预警",to:{path:"/home/warning"}
                }
            ];
            this.$store.commit("setBreadCrumb",breadcrumb);
        },
        handleSizeChange(val){
            console.log(val);
        },
        handleCurrentChange(val){
          console.log(val); 
        }
    },
    created(){
        this.setBreadCrumb();
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
                'buttons': [
                     {'buttonText': '预警设置', 'id': 'add-college-btn'}
                ],
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
                'title': '杂志赤峰学院学报栏目设置和论文参考的目录杂志赤峰学院学报栏目设置和论文参考的目录杂志赤峰学院学报栏目设置和论文参考的目录',
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