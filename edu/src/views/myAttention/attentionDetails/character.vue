<template>
    <div class="myAttention-character article-wrap">
        <div class="myAttention-character-div">
             <el-tabs v-model="activeName" @tab-click="handleClick" class="custom-tabs" >
                <el-tab-pane label="全部" name="all">
                             <el-row  type="flex" class="row-bg row-time">
                                   <el-col :span="2">
                                       <span class="chooseTime">全部</span>
                                   </el-col>
                                   <el-col :span="20">
                                        <el-select v-model="formInline.all" placeholder="请选择人物">
                                          <el-option label="小习习" value="shanghai"></el-option>
                                          <el-option label="小强" value="beijing"></el-option>
                                        </el-select>
                                   </el-col>
                             </el-row>
                </el-tab-pane>
                <el-tab-pane label="国家领导" name="stateLeader">
                            <el-row type="flex" class="row-bg row-time">
                                <el-col :span="2">
                                    <span class="chooseTime">国家领导</span>
                                </el-col>
                                <el-col :span="20">
                                     <el-select v-model="formInline.stateLeader" placeholder="请选择领导">
                                          <el-option label="小习习" value="shanghai"></el-option>
                                          <el-option label="小强" value="beijing"></el-option>
                                     </el-select>
                                </el-col>
                            </el-row>
                </el-tab-pane>
                <el-tab-pane label="政/厅" name="office">
                         <el-row type="flex" class="row-bg row-time">
                             <el-col :span="2">
                                 <span class="chooseTime">政/厅</span>
                             </el-col>
                             <el-col :span="20">
                                  <el-select v-model="formInline.officeArea" placeholder="请选择地区">
                                      <el-option label="北京" value="shanghai"></el-option>
                                      <el-option label="河南" value="beijing"></el-option>
                                  </el-select>
                                  <el-select v-model="formInline.region" placeholder="请选择人物">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                  </el-select>
                             </el-col>
                         </el-row>
                </el-tab-pane>
                <el-tab-pane label="高校领导" name="school">
                         <el-row type="flex" class="row-bg row-time">
                             <el-col :span="2">
                                 <span class="chooseTime">高校领导</span>
                             </el-col>  
                             <el-col :span="20">
                                 <el-select v-model="formInline.schoolArea" placeholder="请选择地区">
                                      <el-option label="北京" value="shanghai"></el-option>
                                      <el-option label="河南" value="beijing"></el-option>
                                    </el-select>
                                    <el-select v-model="formInline.school" placeholder="请选择人物">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                             </el-col>
                         </el-row>  
                </el-tab-pane>
                <el-tab-pane label="知名学者" name="scholar">
                         <el-row type="flex" class="row-bg row-time">
                             <el-col :span="2">
                                 <span class="chooseTime">知名学者</span>
                             </el-col>
                              <el-col :span="20">
                                   <el-select v-model="formInline.regionArea" placeholder="请选择地区">
                                      <el-option label="北京" value="shanghai"></el-option>
                                      <el-option label="河南" value="beijing"></el-option>
                                    </el-select>
                                      <el-select v-model="formInline.region" placeholder="请选择人物">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                  </el-select>
                              </el-col>
                         </el-row>   
                           
                </el-tab-pane>
              </el-tabs> 
               <el-button type="primary" class="addPerson"><router-link to="/home/myCenter">添加人物</router-link></el-button>
               <el-row  type="flex" class="row-bg row-time">
                   <el-col :span="2">
                       <span class="chooseTime">选择时间</span>
                   </el-col>
                   <el-col :span="8">
                       <div class="block">
                            <el-date-picker
                              v-model="valueTime"
                              type="daterange"
                              placeholder="选择日期范围">
                            </el-date-picker>
                        </div>
                   </el-col>
               </el-row>
        </div> 
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
    export default{
        data(){
            return {
                searchNames: ['university', 'dimension', 'vector', 'emotion', 'publishDateTime'],
                currentPage: 1,
                getBodyData:{
                    personageType:[],
                    reportPersonage : [],
                    pageSize:10,
                },
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
        components:{characterTable},
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
            handleClick(tab, event) {
                let vm = this;
                vm.getBodyData.personageType = tab.label;
                switch(tab.label) {
                    case "全部":
                         vm.getBodyData.reportPersonage = vm.formInline.all;
                        break;
                    case "国家领导":
                         vm.getBodyData.reportPersonage = vm.formInline.stateLeader;
                        break;
                    case "政/厅":
                        vm.getBodyData.reportPersonage = vm.formInline.office;
                    case "高校领导":
                        vm.getBodyData.reportPersonage = vm.formInline.school;
                    case "知名学者":
                        vm.getBodyData.reportPersonage = vm.formInline.scholar;
                }
            },
            getCharacterList(){
               if(this.valueTime===""){
                    this.getBodyData.startDate = "";
                    this.getBodyData.endDate = ""; 
               }else{
                    console.log(this.valueTime);
               }

                this.$http.post("/apis/concerns/getPersonData.json",this.getBodyData).then((res)=>{
                    console.log(res);
                },(err)=>{
                    console.log(err);
                })
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.getCharacterList();
            });
            
        },
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
       .myAttention-character-div{
           position: relative;
           background-color: rgba(96, 163, 255, 0.1); 
           margin-bottom: 10px; 
           .addPerson{
               position: absolute;
               right: 20px;
               top: 10px;  
           }
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