/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div class="characterTable article-wrap">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange"></search-box>
        <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer" @click="sort(1)">
                        时间
                        <i class="arrow arrow-up"></i>
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
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>
            <el-table :data="tableData" class="tran-table white-table" border style="width: 100%"
                      :resizable="false">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column label="全部" align="center" prop="all">
                    <template scope="scope">
                <span v-if="scope.row.all == 1">
                     <i class="icon-rank icon-gold"></i>
                </span>
                        <span v-else-if="scope.row.all == 2">
                    <i class="icon-rank icon-silver"></i>
               </span>
                        <span v-else-if="scope.row.all == 3">
                     <i class="icon-rank icon-copper"></i>
                </span>
                        {{scope.row.all}}
                    </template>
                </el-table-column>
                <el-table-column label="人物" prop="name" align="center">
                    <template scope="scope">
                <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                    {{scope.row.name}}
                </span>
                        <!--<router-link to="/home/characterAnalyse">-->
                        <!--{{scope.row.name}}-->
                        <!--</router-link>-->
                    </template>
                </el-table-column>
                <el-table-column label="声量" prop="voiceNum" align="center"></el-table-column>
                <el-table-column label="总阅读量" prop="readNum" align="center"></el-table-column>
                <el-table-column label="热度" prop="hot" align="center"></el-table-column>
                <el-table-column label="情感" prop="emotion" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .tran-table{
        margin-top: 10px;
    .character-name{
        cursor: pointer;
    }
    }

    .characterTable{
        .content-bar-list{
            width: 100px;
        }
    }
</style>

<script>
    import searchBox from '../../../../components/searchBox/searchBox.vue';
    export default{
        data(){
            return {
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                currentPage: 1,
                total: 0,
                tableData: [
                    {
                        'id': 1,
                        'all': 1,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 2,
                        'all': 2,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 3,
                        'all': 3,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 4,
                        'all': 4,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 5,
                        'all': 5,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 6,
                        'all': 6,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 7,
                        'all': 7,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'all': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 9,
                        'all': 9,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 10,
                        'all': 10,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 11,
                        'all': 11,
                        'name': '习1总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 12,
                        'all': 12,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },{
                        'id': 13,
                        'all': 13,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 14,
                        'all': 14,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 15,
                        'all': 15,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    }
                    ,
                    {
                        'id': 16,
                        'all': 16,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    }
                ]
            }
        },
        components: {searchBox},
        methods: {
            //带参跳转到人物分析页面
            toCharacterAnalyse(data){
                console.log(data);
                this.$router.push({path:"/home/characterAnalyse"});
            },

            onSearchDataChange(data) {
                console.log(data);

//                if(data.dimension == "人物聚焦"){
//                    this.$router.push({path:"/home/analyse"});
//                    return ;
//                }
            },

            handleCurrentChange(pageNumber) {
                //后台是从0开始
//                this.param.pageNumber = pageNumber - 1;
//                this.getArticleList();
            },

            sort(param){

            }
        },
        mounted(){

        }
    }

</script>