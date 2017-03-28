/**
* Created by zhangxin on 2017/3/27.
*/
<template>
    <div class="seeWeibo" id="seeWeibo">
        <bread-crumb></bread-crumb>
        <el-tabs v-model="activeName" class="custom-tabs left-tabs" @tab-click="handleClick">
            <el-tab-pane label="微博统计" name="todayHot">
                <el-card class="box-card">
                    <el-table :data="hotOpinion" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="微博指数" name="weekHot">
                <el-card class="box-card">
                    <el-table :data="hotOpinion" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table">
                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="scss" scoped>
    .left-tabs{
        background-color: #21273d;
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
     import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
     import "vue-style-loader!css-loader!sass-loader!../../../assets/css/tabs/tabs.scss";
     export default{
         data(){
             return {
                 activeName: 'todayHot',
                 hotOpinion:[]
             }
         },
         components:{breadCrumb} ,
         methods:{
             setBreadCrumb(){
                 let breadcrumb=[
                     {
                         name:"业务平台",to:{path:"/home/seeWeibo"}
                     },
                     {
                         name:"微博监测"
                     }
                 ];
                 this.$store.commit("setBreadCrumb",breadcrumb);
             },
             handleClick(event) {
                 console.log(event);
             }
         },
         created(){
             this.setBreadCrumb();
         },
         mounted(){

         }
     }
</script>