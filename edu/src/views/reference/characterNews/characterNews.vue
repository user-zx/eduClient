/**
* Created by yu-bing on 2017/3/17.
*/
<template>
    <div class="characterNews article-wrap">
        <bread-crumb></bread-crumb>
        <div class="content">
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
            <character-table class="white-table"></character-table>
        </div>
    </div>
</template>
<style lang="scss">
    .characterNews{
        .content-bar-list{
            width:200px;
        }
        .el-row{
            margin-bottom: 10px; 
        }
         .custom-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav{
                margin: 0;         
            }
        .custom-tabs .el-tabs__content{
            margin-top: 10px; 
        }
      
       .myAttention-character-div{
           position: relative;
           .addPerson{
               position: absolute;
               right: 0;
               top: 0;  
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
<script>
     import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
     import searchBox from '../../../components/searchBox/searchBox.vue';
     import characterTable from '../../../components/content/characterTable.vue'
    export default{
        data(){
            return {
                searchData: '',
                currentPage: 1,
                selectedProfession:"全部",
                form:{},
                activeName:"all",
                labelPosition: 'left',
                formInline: {
                  user: '',
                  region: ''
                },
                options: [{
                      value: '选项1',
                      label: '黄金糕'
                    }, {
                      value: '选项2',
                      label: '双皮奶'
                    }, {
                      value: '选项3',
                      label: '蚵仔煎'
                    }, {
                      value: '选项4',
                      label: '龙须面'
                    }, {
                      value: '选项5',
                      label: '北京烤鸭'
                    }],
                value: '',
                 pickerOptions0: {
                  disabledDate(time) {
                    //return time.getTime() < Date.now() - 8.64e7;
                    
                  }
                },
                value1: '',
            }
        },
        components:{breadCrumb, searchBox, characterTable} ,
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
        },
        mounted(){
           
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>