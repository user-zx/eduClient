
<template>
    <div class="characterNews article-wrap" v-loading="loading" element-loading-text="加载中……">
        <cascadeBox  @onSearchLoad="onSearchLoad" @onSearchChange="onSearchChange"></cascadeBox>
        <div class="content dark">

            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer" @click="sort(0)">
                        阅读量<i class="arrow" :class="param.orders[0].direction == 'DESC' ? 'arrow-down' : 'arrow-up'"></i>
                    </li>
                </ul>
                <div class="content-bar-button">
                    <dropDown @onSaveEvent="onSaveEvent" v-show="eventPermission"></dropDown>
                    <el-button type="primary" icon="plus" class="button-icon" @click="batchConcerned">批量关注</el-button>
                </div>
                <div class="content-bar-page">
                    <el-pagination class="edu-pagination"
                                    v-initjump = "param.pageNumber + 1"
                                   @current-change="handleCurrentChange"
                                   :current-page="param.pageNumber + 1"
                                   :page-size="param.pageSize"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>
            <el-table :data="tableData" class="tran-table white-table" border style="width: 100%"
                      :resizable="false" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column label="排名" align="center" prop="all">
                    <template scope="scope">
                        <span v-if="scope.row.rank == 1 && hitDirection == 'DESC'">
                            <i class="icon-rank icon-gold"></i>
                        </span>
                        <span v-else-if="scope.row.rank == 2 && hitDirection == 'DESC'">
                            <i class="icon-rank icon-silver"></i>
                        </span>
                        <span v-else-if="scope.row.rank == 3 && hitDirection == 'DESC'">
                            <i class="icon-rank icon-copper"></i>
                        </span>
                        <span :class="hitDirection == 'DESC' && scope.row.rank == 1 ? 'rankFirst' : (hitDirection == 'DESC' && scope.row.rank == 2) ? 'rankSecond' : (hitDirection == 'DESC' && scope.row.rank == 3) ? 'rankThird' : ''">
                            {{scope.row.rank}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="人物" prop="name" align="center">
                    <template scope="scope">
                        <span @click="toCharacterAnalyse(scope.row)" class="character-name" style="cursor: pointer;">
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
<script>
    import characterTable from '../../../components/content/characterTable.vue';
    import cascadeBox from "../../../components/searchBox/cascadeBox.vue";
    import dropDown from "../../../components/dropdown/dropdown.vue";
    export default{
        data(){
            return {
                loading: false,
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
                events: [],
                university: '',
                tableData: [],
                multipleSelection:{},
                hitDirection: 'DESC',
                eventPermission: true
            }
        },
        components:{cascadeBox, dropDown, characterTable} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/"}
                    },
                    {
                        name:"人物动态"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            onSearchChange(data) {
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
                if(this.param.orders[index].property == 'totalHitCount'){
                    this.hitDirection = this.param.orders[index].direction;
                }
                //每次排序 分页都应该从第一页查询
                this.param.pageNumber = 0;
                this.getPersonageRank();
            },
            getAllEvent() {
                this.$http.post('/apis/eventAnalysis/getEventList.json', {pageSize: 5, pageNumber: 0}).then(
                    (response) => {
                        if (response.data.success) {
                            this.events = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            getPersonageRank() {
                this.loading = true;
                this.$nextTick(function() {
                    this.$http.post('/apis/personNews/findPersonNewRankingList.json', this.param).then(
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
            },
            //带参跳转到人物分析页面
            toCharacterAnalyse(data) {
                data.university = this.university;
                data.startDate = this.param.startDate;
                data.endDate = this.param.endDate;
                this.$router.push({path:"/home/characterAnalyse", query: data});
            },
            batchConcerned(){
                this.multipleSelection.concernsType = 2;
                if(!this.multipleSelection.concernsContent || this.multipleSelection.concernsContent.length == 0){
                    this.$message.info({
                        title: '提示',
                        message: '未选择人物',
                        duration: 2000
                    });
                    return ;
                }

                this.$http.post("/apis/concerns/saveConcernsMore.json",this.multipleSelection).then(res=>{
                    if(res.data.success){
                        this.$message({
                            title: '成功',
                            message: '关注成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            title: '失败',
                            message: '关注失败',
                            type: 'error',
                            duration: 2000
                        });
                    }
                },err=>{
                    console.log(err);
                });
            },
            handleSelectionChange(val){
                this.multipleSelection.concernsContent = [];
                for (var i = 0; i < val.length; i++) {
                    this.multipleSelection.concernsContent.push(val[i].name)
                }
            },
            onSaveEvent(eventId) {
                let contents = this.multipleSelection.concernsContent;

                if (contents && contents.length > 0) {
                    let param = {
                        eventId: eventId,
                        contents: contents
                    };
                    this.$http.post('/apis/eventAnalysis/saveEventPersonage.json', param).then(
                        (response) => {
                            if (response.data.success) {
                                this.$message({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            } else {
                                this.$message({
                                    title: '失败',
                                    message: '单个事件不能超过100个人物',
                                    type: 'error',
                                    duration: 2000
                                });
                            }
                        }, (response) => {
                            console.error(response);
                        }
                    );
                } else {
                    this.$message({
                        type: 'info',
                        message: '未选择人物'
                    });
                }
            }
        },

        mounted(){
            this.getAllEvent();
            this.$nextTick(function () {
                this.eventPermission = this.$root.$children[0].$children[0].eventPermission;
            });
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>