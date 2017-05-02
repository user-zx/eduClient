/**
* Created by zhangxin on 2017/3/24.
*/
<template>
    <div class="article-wrap" v-loading="loading" element-loading-text="加载中……">
        <div id="search_container">
            <search-box :searchNames="searchNames" @searchDataChange="onSearchDataChange" class="dark"></search-box>
        </div>
        <articleContainer :articleData="articleData" :total="total" :eventBtn="true" :concernBtn="true" @onchange="pageChange" class="dark"></articleContainer>
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
                articleData: [],
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
                loading: false,
                searchNames: ['vector', 'emotion', 'publishDateTime']
            }
        },
        components:{ searchBox, articleContainer,} ,
        methods:{
            follows() {
                //TODO
            },
            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
                this.getArticleList();
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
            onEventLoad() {
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
                    this.param.startDate = this.eventDetail[0].monitorStartDateStr;
                    this.param.endDate = this.eventDetail[0].monitorEndDateStr;
                    this.param.keywords = this.eventDetail[0].eventKeyword.split(',');
                    this.$http.post('/apis/eventAnalysis/getEventArticleList.json', this.param).then(
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
            }
        },
        mounted(){

        },
        props: ['eventDetail']
    }
</script>