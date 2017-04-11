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
                        阅读量<i class="arrow" :class="orders[0].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
                    </li> 
                    <li class="pointer" @click="sort(1)">
                        时间<i class="arrow" :class="orders[1].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
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
                console.log(data);
                this.param.university.push  = data.university;
                this.param.vector.push(data.vector);
                this.param.emotion = data.emotion;
                this.param.startDate = data.startDate;
                this.param.endDate = data.endDate;
                this.getArticleList();
            },
            sort(index) { 

                this.orders[index].direction = this.orders[index].direction == 'DESC' ? 'ASC' : 'DESC';
                if(index==0){
                    this.param.sortField = "阅读量"
                }else{
                     this.param.sortField = "时间"
                }
                this.param.sortType  = this.orders[index].direction;
                this.getArticleList();
            },
            getArticleList() {
                this.loading = true;
                    console.log(this.param);
                    this.$http.post('/apis/concerns/getOpinionData.json',this.param).then(
                        (response) => {
                            console.log(response);
                            if (response.data.success) {
                                this.articleData = response.data.data.content;
                                // 最多允许翻10000页
                                this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
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