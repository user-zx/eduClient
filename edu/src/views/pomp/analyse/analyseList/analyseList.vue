/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" @onload="onSearchLoad"></search-box>
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

                    <el-button type="primary" icon="plus" class="button-icon">批量关注</el-button>
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
            }

        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>