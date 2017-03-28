/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="analyse article-wrap">
        <bread-crumb></bread-crumb>
        <div id="search-container">
            <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange"></search-box>
        </div>
        <div class="content">
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
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="100">
                    </el-pagination>
                </div>
            </div>
            <components :is="currentTabs.currentTab"></components>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import "vue-style-loader!css-loader!sass-loader!./css/analyse.scss";
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    import searchBox from '../../../components/searchBox/searchBox.vue';
    import articleView from '../../../components/content/article.vue';
    import characterTable from '../../../components/content/characterTable.vue';
    
    export default{
        data(){
            return {
                msg: "舆情监测",
                currentPage: 1,
                currentTabs: {
                    articleView: 'articleView',
                    characterTable: 'characterTable',
                    currentTab: 'articleView'
                },
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime']
            }
        },
        components: {breadCrumb, searchBox, articleView, characterTable},
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

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            },
            onSearchDataChange(data) {
                console.log("change callback, data :");
                console.log(data);
            }

        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){
        },
    }
</script>