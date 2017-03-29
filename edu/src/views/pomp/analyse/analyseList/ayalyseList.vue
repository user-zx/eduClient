/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div>
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange"></search-box>
        <div class="content" v-loading="loading" element-loading-text="加载中……">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer arrow-up">
                        阅读量
                    </li>
                    <li class="pointer arrow-down">时间</li>
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
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>
            <components :is="currentTabs.currentTab" :articleData="articleData"></components>
        </div>
    </div>
</template>
<script>
    import searchBox from '../../../../components/searchBox/searchBox.vue';
    import articleView from '../../../../components/content/article.vue';
    import characterTable from '../characterTable/characterTable.vue';
    export default{
        data(){
            return {
                msg: "舆情监测",
                currentPage: 1,
                total: 0,
                currentTabs: {
                    articleView: 'articleView',
                    characterTable: 'characterTable',
                    currentTab: 'articleView'
                },
                param: {
                    pageSize: 5,
                    pageNumber: 0,
                    dimension: '校园舆情'
                },
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                articleData: [],
                loading:true
            }
        },
        components: {searchBox, articleView, characterTable},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/"}
                    },
                    {
                        name:"舆情监测",to:{path:"/analyse"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            handleCurrentChange(pageNumber) {
                this.param.pageNumber = pageNumber;
                this.getArticleList();
            },
            onSearchDataChange(data) {
                data.pageSize = 5;
                data.pageNumber = 0;
                this.param = data;
                this.getArticleList();
            },
            getArticleList() {
                this.loading = true;
                this.$http.post('/apis/opinionMonitor/getOpinionMonitor.json', this.param).then(
                    (response) => {
                        if (response.data.success) {
                            this.articleData = response.data.data.content;
                            // 最多允许翻1000页
                            this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            console.log("articleData :", this.articleData);
                            this.$nextTick(function() {
                               this.loading = false;
                            });
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            }

        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){
            this.getArticleList();
        },
    }
</script>