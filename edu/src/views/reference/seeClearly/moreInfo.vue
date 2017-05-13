<template>
    <div class="moreInfo article-wrap" v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @onload="onSearchLoad" @searchDataChange="onSearchDataChange"></search-box>
        <articleView :articleData="articleData" :total="total" :pageNumber="param.pageNumber" :eventBtn="true" :concernBtn="true" @onchange="pageChange" ref="article"></articleView>
    </div>
</template>
<script>
    import searchBox from '../../../components/searchBox/searchBox.vue'
    import articleView from '../../../components/content/article.vue'
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';

    export default{
        data(){
            return{
                searchNames: ['university', 'vectorForWechatWeibo', 'emotion', 'publishDateTime'],
                param: {
                    pageSize: 5,
                    pageNumber: 0,
                    vector: '微博',
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
                total:0,
                articleData:[],
                loading: false,
                type: ''
            }
        },
        components:{breadCrumb,searchBox,articleView},
        methods: {
            setBreadCrumb(){
                /*设置面包屑*/
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/home/industryNews"}
                    },
                    {
                        name:"两微洞察",to:{path:"/home/seeClearly"}
                    },
                    {
                        name:"信息聚合"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            onSearchLoad(data) {
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                data.vector = data.vectorForWechatWeibo;
                this.param = data;
                this.getArticleList();
            },

            onSearchDataChange(data,event) {
                console.log(event)
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                data.vector = data.vectorForWechatWeibo;
                this.param = data;
                this.getArticleList();
            },

            pageChange(param) {
                this.param.pageNumber = param.pageNumber;
                this.param.orders = param.orders;
                this.getArticleList();
            },

            getArticleList(){
                this.loading = true;
                console.log(this.param);

                //根据上级页面传的参数判断是获取热点更多文章还是舆情更多文章
                if(this.type == 'hot'){
                    this.$http.post('/apis/twoMicroInsight/findTwoMicroInsightInfo.json', this.param).then(
                        (response) => {
                            if (response.data.success) {
//                                this.wechatHot = response.data.data.content;
                                this.articleData = response.data.data.content;
                                // 最多允许翻1000页
                                this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            } else {
                                console.error(response.data.message);
                            }
                            this.$nextTick(function() {
                                this.loading = false;
                            });
                        }, (response) => {
                            console.error(response);
                        }
                    );
                }else {
                    console.log(this.type)
                }
            }
        },
        created(){
            this.setBreadCrumb();
            this.type = this.$route.query.type;
            console.log(this.type)
        }
    }
</script>
