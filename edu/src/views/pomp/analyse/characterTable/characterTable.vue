/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div class="characterTable article-wrap" v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" @onload="onSearchLoad"></search-box>
        <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer" @click="sort(0)">
                        阅读量<i class="arrow" :class="param.orders[0].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
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
                                   :page-size="param.pageSize"
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
                        <span v-if="scope.row.rank == 1">
                            <i class="icon-rank icon-gold"></i>
                        </span>
                        <span v-else-if="scope.row.rank == 2">
                            <i class="icon-rank icon-silver"></i>
                        </span>
                        <span v-else-if="scope.row.rank == 3">
                            <i class="icon-rank icon-copper"></i>
                        </span>
                        {{scope.row.rank}}
                    </template>
                </el-table-column>
                <el-table-column label="人物" prop="name" align="center">
                    <template scope="scope">
                        <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                            {{scope.row.name}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="声量" prop="volume" align="center"></el-table-column>
                <el-table-column label="总阅读量" prop="totalHitCount" align="center"></el-table-column>
                <el-table-column label="热度" prop="hot" align="center"></el-table-column>
                <el-table-column label="情感" prop="emotionVal" align="center"></el-table-column>
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
                loading: false,
                searchNames: ['university', 'dimension'],
                total: 0,
                param: {
                    pageSize: 10,
                    pageNumber: 0,
                    orders: [
                        {
                            property: 'totalHitCount',
                            direction: 'DESC'
                        }
                    ]
                },
                university: '',
                tableData: []
            }
        },
        components: {searchBox},
        methods: {
            //带参跳转到人物分析页面
            toCharacterAnalyse(data) {
                data.university = this.university;
                this.$router.push({path:"/home/characterAnalyse", query: data});
            },
            setBreadCrumb() {
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
            onSearchDataChange(data) {
                if(data.dimension != "人物聚焦"){
                    this.$router.push({path: "/home/analyse", query: {dimension: data.dimension, university: data.university}});
                    return;
                }
                this.university = data.university;
                data.pageSize = 10;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.getPersonageRank();
            },
            onSearchLoad(data) {
                data.pageSize = 10;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.getPersonageRank();
            },
            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
                this.getPersonageRank();
            },

            sort(index){
                this.param.orders[index].direction = this.param.orders[index].direction == 'DESC' ? 'ASC' : 'DESC';
                this.getPersonageRank();
            },
            getPersonageRank() {
                this.loading = true;
                this.$nextTick(function() {
                    this.$http.post('/apis/opinionMonitor/getPersonageRank.json', this.param).then(
                        (response) => {
                            if (response.data.success) {
                                this.tableData = response.data.data.content;
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
        mounted() {
        },
        created() {
            this.setBreadCrumb();
        }
    }

</script>