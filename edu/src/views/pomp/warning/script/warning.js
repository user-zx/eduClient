
 import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
 import searchBox from '../../../../components/searchBox/searchBox.vue';
 import "vue-style-loader!css-loader!sass-loader!../../analyse/css/analyse.scss";
 import articleContainer from '../../../../components/content/article.vue';
export default{
    data(){ 
        return {
            msg: "舆情预警",
            total: 0,
            param: {
                pageSize: 5,
                pageNumber: 0,
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
            searchNames: ['vector', 'emotion', 'publishDateTime'],
            articleData: [],
            loading:true
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
                    name:"舆情预警"
                }
            ];
            this.$store.commit("setBreadCrumb",breadcrumb);
        },
        onSearchDataChange(data,event) {
            data.pageSize = 5;
            data.pageNumber = 0;
            data.orders = this.param.orders;
            this.param = data;
               this.$refs.article.allSelect = false;
                this.$refs.article.handleCheckAllChange(event)
            this.getArticleList();
        },
        pageChange(param) {
            this.param.pageNumber = param.pageNumber;
            this.param.orders = param.orders;
            this.getArticleList();
        },
        getArticleList() {
            this.loading = true;
            this.$nextTick(function() {
                this.$http.post('/apis/opinionWarn/getWarnInfo.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            this.articleData = response.data.data.content;
                            // 最多允许翻1000页
                            this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            this.$nextTick(function() {
                                this.loading = false;
                            });
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                        this.loading = false;
                    }
                );
            });
        },
        warnSetting() {
            this.$router.push({path:"/home/publicOpinionRule"});
        }

    },
    created(){
        this.setBreadCrumb();
    },
    mounted() {
        this.getArticleList();
    }
}