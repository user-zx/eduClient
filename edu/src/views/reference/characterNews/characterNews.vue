/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="characterNews article-wrap">
        <bread-crumb></bread-crumb>
        <div id="search-container">
            <search-box :searchData=searchData></search-box>
        </div>
        <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer arrow-up">
                        阅读量
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
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="100">
                    </el-pagination>
                </div>
            </div>
            <character-table></character-table>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .characterNews{
        .content-bar-list{
            width:200px;
        }
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
     import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
     import searchBox from '../../../components/searchBox/searchBox.vue';
     import characterTable from '../../../components/content/characterTable.vue'

    export default{
        data(){
            return {
                searchData: '',
                currentPage: 1,
            }
        },
        components:{breadCrumb, searchBox, characterTable} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/"}
                    },
                    {
                        name:"人物动态",to:{path:"/characterNews"}
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
        },
        mounted(){
            let searchData = [
                {
                    'title' :  '选择人物:',
                    'searchList': [
                        {id: 0, text: '全部', selected: true},
                        {id: 1, text: '国家领导', selected: false},
                        {id: 2, text: '政/厅', selected: false},
                        {id: 3, text: '高校领导', selected: false},
                        {id: 4, text: '知名学者', selected: false},
                        {id: 5, text: '我添加的人物', selected: false}
                    ],
                    'hasMore': true,
                    'multiple': false,
                    'buttons': [
                        {'buttonText': '添加人物', 'id': 'add-character-btn'}
                    ],
                    'hasDateBox': false
                },
                {
                    'title': '国家领导:',
                    'searchList': [
                        {id: 0, text: '全部', selected: true},
                        {id: 1, text: '习近平', selected: false},
                        {id: 2, text: '李克强', selected: false},
                        {id: 3, text: '张德江', selected: false},
                        {id: 4, text: '俞正声', selected: false},
                        {id: 5, text: '王岐山', selected: false},
                        {id: 6, text: '刘云山', selected: false},
                        {id: 7, text: '张高丽', selected: false}
                    ],
                    'hasMore': false,
                    'multiple': false,
                    'buttons': [],
                    'hasDateBox': false
                },
                {
                    'title': '时间:',
                    'searchList': [
                        {id: 0, text: '全部', selected: false},
                        {id: 1, text: '今天', selected: true},
                        {id: 2, text: '昨天', selected: false},
                        {id: 3, text: '近7天', selected: false},
                        {id: 4, text: '近一个月', selected: false},
                        {id: 5, text: '自定义时间', dateBox: 'show', selected: false}
                    ],
                    'hasMore': false,
                    'multiple': false,
                    'buttons': [],
                    'hasDateBox': true
                }
            ];
            this.searchData = searchData;
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>