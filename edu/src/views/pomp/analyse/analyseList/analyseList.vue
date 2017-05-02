/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" @onload="onSearchLoad"></search-box>
        <articleView :articleData="articleData" :total="total" :eventBtn="true" :concernBtn="true" @onchange="pageChange"></articleView>
    </div>
</template>
<script>
    import searchBox from '../../../../components/searchBox/searchBox.vue';
    import articleView from '../../../../components/content/article.vue';
    export default{
        data(){
            return {
                msg: "舆情监测",
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
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                articleData: [],
                loading: false,
                curContent: this.$store.state.curContent,
            }
        },
        components: {searchBox, articleView},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/"}
                    },
                    {
                        name:"舆情监测"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            onSearchDataChange(data) {
                if(data.dimension == "人物聚焦"){
                    this.$router.push({path: "/home/characterTableAnalyse", query: {dimension: '人物聚焦', university: data.university}});
                    return;
                }
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.getArticleList();
            },
            onSearchLoad(data) {
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
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
                    this.$http.post('/apis/opinionMonitor/getOpinionMonitor.json', this.param).then(
                        (response) => {
                            if (response.data.success) {
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
                            this.loading = false;
                            console.error(response);
                        }
                    );
                });
            },

        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>