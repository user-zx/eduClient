/**
* Created by yu-bing on 2017/3/17.
*/
<template>
    <div class="characterNews article-wrap">
        <bread-crumb></bread-crumb>
        <div class="content">
            <el-row>
               <el-col :span="4" v-for="item in selectProfession"><div class="text-center"><el-button type="text" @click="profession(item)">{{item}}</el-button></div></el-col>
              <el-col :span="4"><div class="text-center"><el-button type="primary">添加人物</el-button></div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="text-center">
                        <el-button type="text">{{selectedProfession}}</el-button>
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" :offset="7">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-col>
            </el-row>
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
<style lang="scss" scoped>
    .characterNews{
        .content-bar-list{
            width:200px;
        }
        .el-row{
            margin-bottom: 10px; 
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
                selectProfession:["全部","国家领导","政/厅","高校领导","知名学者"],
                selectedProfession:"全部",
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