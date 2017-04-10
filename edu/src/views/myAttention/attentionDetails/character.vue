<template>
    <div class="myAttention-character article-wrap">
        <div class="myAttention-character-div">
             <el-tabs v-model="activeName" @tab-click="handleClick" class="custom-tabs">
                <el-tab-pane label="全部" name="all">
                    <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="全部">
                            <el-select v-model="form.all" placeholder="请选择人物">
                              <el-option label="小习习" value="shanghai"></el-option>
                              <el-option label="小强" value="beijing"></el-option>
                           </el-select>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="国家领导" name="stateLeader">
                      <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
                            <el-form-item label="国家领导">
                                <el-select v-model="form.stateLeader" placeholder="请选择领导">
                                  <el-option label="小习习" value="shanghai"></el-option>
                                  <el-option label="小强" value="beijing"></el-option>
                               </el-select>
                            </el-form-item>
                      </el-form>
                </el-tab-pane>
                <el-tab-pane label="政/厅" name="office">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                      <el-form-item label="政/厅">
                        <el-select v-model="formInline.region" placeholder="请选择地区">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                       <el-form-item >
                          <el-select v-model="formInline.region" placeholder="请选择人物">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="高校领导" name="school">
                     <el-form :inline="true" :model="formInline" class="demo-form-inline">
                          <el-form-item label="高校领导">
                            <el-select v-model="formInline.region" placeholder="请选择地区">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                           <el-form-item >
                              <el-select v-model="formInline.region" placeholder="请选择人物">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                     </el-form>
                </el-tab-pane>
                <el-tab-pane label="知名学者" name="scholar">
                     <el-form :inline="true" :model="formInline" class="demo-form-inline">
                          <el-form-item label="知名学者">
                            <el-select v-model="formInline.region" placeholder="请选择地区">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                           <el-form-item>
                              <el-select v-model="formInline.region" placeholder="请选择人物">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                     </el-form>
                </el-tab-pane>
              </el-tabs> 
               <el-button type="primary" class="addPerson"><router-link to="/home/myCenter">添加人物</router-link></el-button>
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
                labelPosition: 'left',
                activeName:"all",
                form:{
                    all:'',
                },
                 formInline: {
                  user: '',
                  region: ''
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
                console.log(tab, event);
            },
            getCharacterList(){

            }
        },
        mounted(){
          
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
       .el-form-item__label{
           margin-left: 16px; 
       }
       .myAttention-character-div{
           position: relative;
           .addPerson{
               position: absolute;
               right: 0;
               top: 0;  
           }
       }
    }
</style>