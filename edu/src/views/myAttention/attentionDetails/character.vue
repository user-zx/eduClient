<template>
    <div class="myAttention-character article-wrap">
        <cascade-box @onSearchLoad="loadData" @onSearchChange="getParams"></cascade-box>
        <div class="content dark">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer" @click="sort(0)">
                        阅读量 <i class="arrow" :class="order0 == 'DESC' ? 'arrow-down' : 'arrow-up'"></i>
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
                    <el-button type="primary" icon="plus" @click="cancelAttention">取消关注</el-button>
                </div>
                <div class="content-bar-pagination">
                    <el-pagination class="edu-pagination"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="5"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>  
            <character-table class="dark" ref="table" :tableData="getPersonList" @select="removeData"></character-table>
        </div> 
    </div>
</template> 
<script> 
    import cascadeBox from '../../../components/searchBox/cascadeBox.vue';
    import characterTable from '../../../components/content/characterTable.vue';
    export default{
        data(){
            return {
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                currentPage: 1,
                order0: "DESC",
                getBodyData:{
                    personageType:[],
                    reportPersonage : [],
                    pageSize:5,
                    pageNumber:0,
                },
                total:1,
                labelPosition: 'left',
                getPersonList: [],
                params:{},
                removeParams:{},
            }
        },
        components:{characterTable,cascadeBox},
        methods:{
            sort(index){
              let order = {};
              console.log(index);
               order.direction = this.order0 == 'DESC' ? 'ASC' : 'DESC';
              },
            removeData(val){
              this.removeParams.concernsContent = [];
               for (let i = 0; i < val.length; i++) {
                 this.removeParams.concernsContent.push(val[i].name);
               } 
               console.log(this.removeParams.concernsContent);
            },
            cancelAttention(){
              this.removeParams.concernsType = 2;
              console.log(this.removeParams.concernsContent); 
               this.$http.post("/apis/concerns/removeConcernsMore.json",this.removeParams).then(res=>{
                  if(res.data.success){
                    this.$message("取消关注成功");
                    this.getDataList();
                  }else{
                    this.$message(res.data.message);
                  }
               },err=>{
                  console.log(err);
               })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                 this.params.pageNumber = val - 1;
                // console.log(this.params.pageNumber);
                this.getDataList();
            },
           getParams(params){
              this.params.personageType = [];
              this.params.reportPersonage.push(params.reportPersonage);
              this.params.startDate = params.startDate;
              this.params.endDate = params.endDate;
              this.getDataList()
           },  
           loadData(params){
              this.params.personageType = [];
              this.params.reportPersonage = [];
              this.params.startDate = params.startDate;
              this.params.endDate = params.endDate;
              this.params.pageSize = 5;
              this.params.pageNumber = 0;
              this.getDataList();
           },
           getDataList(){ 
              this.getPersonList = [];
              this.$http.post("/apis/concerns/getPersonData.json",this.params).then((res)=>{
                  if(res.data.success){
                  //   console.log(res);
                      for (var i = 0; i < res.data.data.page.content.length; i++) {
                        this.getPersonList.push(res.data.data.page.content[i])
                      }
                      this.$refs.table.getTableDataEvent()
                     this.total = res.data.data.page.totalElements > 10000 ? 10000 : res.data.data.page.totalElements;
                  }
              },(err)=>{
                 console.log(err);
              })
           },
        },

        mounted(){

        },
        created(){
         
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