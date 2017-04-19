/**
* Created by yu-bing on 2017/3/17.
*/
<template>
    <div class="characterNews article-wrap">
        <bread-crumb></bread-crumb>
        <cascadeBox  @onSearchLoad="onSearchLoad" @onSearchChange="onSearchChange"></cascadeBox>
        <div class="content dark">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer">
                        阅读量 <i class="arrow arrow-up"></i>
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
                    <el-button type="primary" icon="plus">取消关注</el-button>
                </div>
                <div class="content-bar-pagination">
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
            <character-table class="dark" :tableData="getTableList"></character-table>
        </div>
    </div>
</template>
<script>
    import characterTable from '../../../components/content/characterTable.vue';
    import breadCrumb from "../../../components/breadCrumb/breadCrumb.vue";
    import cascadeBox from "../../../components/searchBox/cascadeBox.vue";
    export default{
        data(){
            return {
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                currentPage: 1,
                getBodyData:{
                    personageType:[],
                    reportPersonage : [],
                    pageSize:10,
                    pageNumber:0,
                },
                allPerson:["习大大","彭麻麻"],
                labelPosition: 'left',
                activeName:"all",
                valueTime:'',
                formInline: {
                    all:'',
                    stateLeader:'',
                    office:'',
                    officeArea:'',
                    school:'',
                    schoolArea:'',
                    scholar:'',
                    scholarArea:'',
                },
                conditionOption:"",
                getTableList: [
                    {
                        'id': 1,
                        'all': 1,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    }
                ],
            }
        },
        components:{breadCrumb, cascadeBox, characterTable} ,
        methods:{
            profession(item){
                this.selectedProfession = item;
            },
             handleClick(tab, event) {
                console.log(tab, event);
            },
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
            sort() {
                this.param.orders[0].direction = this.param.orders[0].direction == 'DESC' ? 'ASC' : 'DESC';
                this.getArticleList();
            },
            onSearchLoad(param) {
                console.log("onSearchLoad", param);
            },
            onSearchChange(param) {
                console.log("onSearchChange", param);
            }
        },
        mounted(){
           
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>