/**
* Created by yu-bing on 2017/3/30.
*/
<template>
    <div class="article-wrap myAttention-pomp" v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
        <articleView :articleData="articleData" class="dark" :total="total" :pageNumber="param.pageNumber" :eventBtn="true" :unfollowBtn="true" @onchange="pageChange" ref="article"></articleView>
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
                loading: false,
                msg: "舆情",
                currentPage: 1,
                total: 0,
                param: {
                    pageSize: 5,
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
                curContent: this.$store.state.curContent,
            }
        },
        components: {searchBox, articleView},
        methods:{
            onSearchDataChange(data,event) {
               if(data.university.length>0){
                 this.param.university = data.university;
               }else{
                this.param.university = [];
               }
               if(data.vector!=undefined){
                  this.param.vector = [];
                  this.param.vector.push(data.vector);   
               }else{
                 this.param.vector = [];
               }
               if(data.emotion!=undefined){
                     this.param.emotion = data.emotion;
               }else{
                    this.param.emotion = "";
               }
               if(data.startDate!=undefined){
                    this.param.startDate = data.startDate;
               }else{
                    this.param.startDate = "";
               }
                if(data.endDate!=undefined){
                    this.param.endDate = data.endDate;
                }else{
                    this.param.endDate = "";
                }
                this.param.pageSize = 5;
                this.param.pageNumber = 0;
                this.$refs.article.allSelect = false;
                this.$refs.article.handleCheckAllChange();
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
                        if (response.data.success) {
                            if(response.data.data.page){
                                this.articleData = response.data.data.page.content;
                                // 最多允许翻10000页
                                this.total = response.data.data.page.totalElements > 10000 ? 10000 : response.data.data.page.totalElements;
                            } else {
                                this.articleData = [];
                            }
                            
                            this.loading = false;
                        } else {
                            console.error(response.data.message);
                            this.loading = false;
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