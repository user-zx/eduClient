/**
* Created by lifei on 2017/3/30.
*/
<template>
    <div class="industryNews article-wrap" v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @onload="onSearchLoad" @searchDataChange="onSearchDataChange"></search-box>
        <articleView :articleData="articleData" :total="total" :eventBtn="true" :concernBtn="true" @onchange="pageChange"></articleView>
    </div>
</template>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import searchBox from '../../../../components/searchBox/searchBox.vue'
    import articleView from '../../../../components/content/article.vue'

    export default{
        data(){
            return {
                total:0,
                searchNames: ['university', 'vector', 'emotion', 'publishDateTime'],
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
                articleData:[],
                loading: false,
            }
        },
        components:{searchBox, articleView} ,
        methods:{
            onSearchLoad(data) {
                data.pageSize = 5; 
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.getArticleList();
            },
             onSearchDataChange(data) {
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
                    this.$http.post('/apis/industryNews/findEduInfoByCondation.json', this.param).then(
                        (response) => {
                            console.log(response);
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
                        }, (err) => {
                            this.loading = false;
                            console.error(err);
                        }
                    );
                });
            }
        },
        mounted(){

        },
        created(){
        }
    }
</script>