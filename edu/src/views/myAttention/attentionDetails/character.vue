<template>
    <div class="myAttention-character article-wrap">
        <cascade-box @onSearchLoad="loadData" @onSearchChange="getData"></cascade-box>
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
    import cascadeBox from '../../../components/searchBox/cascadeBox.vue';
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
                labelPosition: 'left',
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
        components:{characterTable,cascadeBox},
        methods:{
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            },
           getData(params){
              console.log(params);
           }, 
           loadData(params){
              console.log(params);
           },
           
        },
        mounted(){
            this.$nextTick(function(){
              
            });
        },
        watch:{ 
          
        }    
    }
</script>
<style lang="scss">
    .myAttention-character{
        .custom-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav{
                margin: 0;         
            }
        .custom-tabs .el-tabs__content{
            margin-top: 10px; 
        }
       .chooseTime{
           padding-left: 16px;
           line-height: 50px; 
           display: inline-block;
           width: 100%;
           color: #d0d7ff;   
       }
       .row-time{
           border-bottom: 1px solid rgba(96, 163, 255, 0.1);
       }
       .el-select{
           margin-top: 7px; 
       }
       .block{
           margin-top: 7px; 
       }
      
    }
</style>