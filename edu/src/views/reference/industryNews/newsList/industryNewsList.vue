/**
* Created by lifei on 2017/3/30.
*/
<template>
    <div class="industryNews article-wrap" v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @onload="onSearchLoad"></search-box>
        <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer" @click="sort(0)">
                        阅读量<i class="arrow" :class="param.orders[0].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
                    </li>
                    <li class="pointer" @click="sort(1)">
                        时间<i class="arrow" :class="param.orders[1].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
                    </li>
                </ul>
                <div class="content-bar-button">
                    <el-dropdown class="event-store-box" trigger="click">
                        <el-button type="primary" icon="plus" class="button-icon">
                            事件库
                        </el-button>
                        <el-dropdown-menu slot="dropdown" class="event-store-item">
                            <el-dropdown-item>事件1</el-dropdown-item>
                            <el-dropdown-item>事件2</el-dropdown-item>
                            <el-dropdown-item>事件3</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" icon="plus" class="button-icon" @click="btnClick()">批量关注</el-button>
                </div>
                <div class="content-bar-page">
                    <el-pagination class="edu-pagination"
                                   @current-change="handleCurrentChange"
                                   :current-page="param.pageNumber + 1"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>
            <articleView :articleData="articleData"></articleView>
        </div>
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
            handleCurrentChange(val) {
                this.param.pageNumber = val - 1;
                this.getArticleList();
            },
            btnClick(){
//                跳转到人物详情是以下这个方法  暂时注释
//                this.$router.push({path:"/home/industryDetailNews"});
            },
            onSearchLoad(data) {
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.getArticleList();
            },
            sort(index) {
                this.param.orders[index].direction = this.param.orders[index].direction == 'DESC' ? 'ASC' : 'DESC';
                this.getArticleList();
            },
            getArticleList() {
                this.loading = true;
                this.$nextTick(function() {
                    console.log(JSON.stringify(this.param))
                    this.$http.post('/apis/industryNews/findEduInfoByCondation.json', this.param).then(
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
        created(){
        }
    }
</script>