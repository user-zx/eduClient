/**
* Created by yu-bing on 2017/3/30.
*/
<template>
    <div class="article-wrap myAttention-pomp">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
        <div class="content dark">
            <div class="content-bar clearfix">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer" @click="sort(0)" >
                        阅读量<i class="arrow" :class="param.orders[0].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
                    </li>
                    <li class="pointer" @click="sort(1)">
                        时间<i class="arrow" :class="param.orders[1].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
                    </li>
                </ul>
                <div class="content-bar-pagination">
                    <el-pagination class="edu-pagination"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>
            <articleView :articleData="articleData" class="dark"></articleView>
        </div>
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
                searchNames: ['university', 'vector', 'emotion', 'publishDateTime'],
                articleData: [],
                loading:true,
                curContent: this.$store.state.curContent,
            }
        },
        components: {searchBox, articleView},
        methods:{

            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
                this.getArticleList();
            },
            onSearchDataChange(data) {
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.currentPage = 1;
                this.getArticleList();
            },
            sort(index) { 
                this.param.orders[index].direction = this.param.orders[index].direction == 'DESC' ? 'ASC' : 'DESC';
                this.getArticleList();
            },
            getArticleList() {
                this.loading = true;
                this.$nextTick(function() {
                    this.$http.post('/apis/opinionMonitor/getOpinionMonitor.json', this.param).then(
                        (response) => {
                            if (response.data.success) {
                                this.articleData = response.data.data.content;
                                // 最多允许翻10000页
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
            }

        },
        created(){

        },
        mounted(){
            this.getArticleList();
        },
    }
</script>