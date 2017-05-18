<template>
    <div class="myAttention-character article-wrap" v-loading="loading" element-loading-text="加载中……">
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
                    <dropDown @onSaveEvent="onSaveEvent" v-show="eventPermission"></dropDown>
                    <el-button type="primary" icon="plus" @click="cancelAttention">取消关注</el-button>
                </div>
                <div class="content-bar-pagination">
                    <el-pagination class="edu-pagination"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="10"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>  
            <character-table class="dark" ref="table" :tableData="getPersonList" :param="this.params" @select="removeData"></character-table>
        </div>
    </div>
</template>
<script>
    import cascadeBox from '../../../components/searchBox/cascadeBox.vue';
    import characterTable from '../../../components/content/characterTable.vue';
    import dropDown from "../../../components/dropdown/dropdown.vue";

    export default{
        data(){
            return {
                loading: false,
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                currentPage: 1,
                order0: "DESC",
                getBodyData:{
                    personageType:[],
                    reportPersonage : [],
                    pageSize:10,
                    pageNumber:0,
                },
                total:0,
                labelPosition: 'left',
                getPersonList: [],
                params:{},
                removeParams:{},
                eventPermission: true
            }
        },
        components:{characterTable,cascadeBox,dropDown},
        methods:{
            sort(index){
             let orders = [{property: "totalHitCount"}];
              if(this.order0 == 'DESC'){
                this.order0 = 'ASC'
              }else{
                this.order0 = 'DESC'
              }
             orders[0].direction =  this.order0 ;
             this.params.orders = orders;
              this.getDataList();
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
              this.params.reportPersonage = []; 

              if(params.reportPersonage==null){
                this.params.reportPersonage = [];
              } else{
                this.params.reportPersonage.push(params.reportPersonage);
              }
              //this.params.startDate = params.endDate.split(" ")[0] + " 00:00:00";
               this.params.startDate = params.startDate;
               this.params.endDate = params.endDate;
              this.getDataList()
           },  
           loadData(params){
              this.params.personageType = [];
              this.params.reportPersonage = [];
              //this.params.startDate = params.endDate.split(" ")[0] + " 00:00:00";
               this.params.startDate = params.startDate;
               this.params.endDate = params.endDate;
              this.params.pageSize = 10;
              this.params.pageNumber = 0;
              this.params.orders = [{property: "totalHitCount", direction: "DESC"}];
              this.getDataList();
           },
           getDataList(){
              this.getPersonList = [];
              this.loading = true;
              this.$http.post("/apis/concerns/getPersonData.json",this.params).then((res)=>{
                 console.log(res);
                  if(res.data.success){
                      if (res.data.data.page) {
                          for (var i = 0; i < res.data.data.page.content.length; i++) {
                              res.data.data.page.content[i].rank = this.params.pageNumber * this.params.pageSize + i + 1;
                              this.getPersonList.push(res.data.data.page.content[i]);
                          }
                          this.total = res.data.data.page.totalElements > 10000 ? 10000 : res.data.data.page.totalElements;
                      }else{
                        this.total = 0;
                      }
                      this.$refs.table.getTableDataEvent()
                      this.loading = false;
                  }
              },(err)=>{
                 console.log(err);
                  this.loading = false;
              })
           },
            onSaveEvent(eventId){
               if(this.removeParams.concernsContent == undefined || this.removeParams.concernsContent.length == 0){
                   this.$message('没有选中的人物');
                   return ;
               }

               let param = {
                   eventId: eventId,
                   contents: this.removeParams.concernsContent
               }
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
            }
        },

        mounted(){
            this.$nextTick(function () {
                this.eventPermission = this.$root.$children[0].$children[0].eventPermission;
            });
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