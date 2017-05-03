/**
* Created by yu-bing on 2017/3/30.
*/
<template>
    <div class="article-wrap myAttention-pomp">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
        <articleView :articleData="articleData" class="dark" :total="total" :eventBtn="true" @onchange="pageChange"></articleView>
    </div>
</template>
<style>

</style>
<script>
    import searchBox from '../../../components/searchBox/searchBox.vue';
    import articleView from '../../../components/content/article.vue';
    export default{
        data(){
            return {
                msg: "舆情",
                currentPage: 1,
                total: 0,
                param: {
                    pageSize: 10,
                    pageNumber: 0,
                    startDate:"",
                    endDate:"",
                    sortField:"阅读量",
                    sortType:"ASC",
                    vector:[],
                    university:[],
                    emotion:"",
                },
                orders: [
                        {
                            property: 'hitCount',
                            direction: 'DESC'
                        },
                        {
                            property: 'publishDateTime',
                            direction: 'DESC'
                        }
                    ],
                searchNames: ['university', 'vector', 'emotion', 'publishDateTime'],
                articleData: "",
                loading:true,
                curContent: this.$store.state.curContent,
            }
        },
        components: {searchBox, articleView},
        methods:{
            onSearchDataChange(data) {
                console.log(data);
                this.param.university.push  = data.university;
                this.param.vector.push(data.vector);
                this.param.emotion = data.emotion;
                this.param.startDate = data.startDate;
                this.param.endDate = data.endDate;
                this.getArticleList();
            },
            pageChange(param) {
                this.param.pageNumber = param.pageNumber;
                this.param.orders = param.orders;
                this.getArticleList();
            },
            getArticleList() {
                this.loading = true;
                    this.$http.post('/apis/concerns/getOpinionData.json',this.param).then(
                        (response) => {
                            console.log(response);
                            if (response.data.success) {
                                     this.articleData = response.data.data.page.content;
                                // 最多允许翻10000页
                                this.total = response.data.data.page.totalElements > 10000 ? 10000 : response.data.data.page.totalElements;
                                 this.loading = false;
                            } else {
                                console.error(response.data.message);
                            }
                        }, (response) => {
                            console.error(response);
                            this.loading = false;
                        }
                    );
            },
        },
        created(){

        },
        mounted(){
            this.getArticleList();
        },
    }
</script>