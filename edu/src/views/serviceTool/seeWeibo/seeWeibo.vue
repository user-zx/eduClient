/**
* Created by zhangxin on 2017/3/27.
*/
<template>
    <div class="seeWeibo" id="seeWeibo">
        <bread-crumb></bread-crumb>
        <el-tabs v-model="activeName" class="custom-tabs left-tabs" @tab-click="handleClick">
            <el-tab-pane label="微博统计" name="todayHot">
                <div id="search_container">
                    <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="text-right clearfix">
                    <el-button type="primary">微博认证</el-button>
                </div>
                <el-card class="box-card">
                    <el-table :data="weiBoOption" :resizable="false" stripe style="width: 100%" border class="tran-table no-col-title yellow-table">
                        <el-table-column type="index" width="70" label="序号"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="weiBoNumber" label="微博号" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="source" label="所属" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="principal" label="负责人" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="principalEmail" label="负责人邮箱" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="principalTel" label="负责人电话" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publisher" label="发布人" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publisherEmail" label="发布人邮箱" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publisherTel" label="发布人电话" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="state" label="认证情况" align="center"></el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="微博指数" name="weekHot">
                <el-card class="box-card">
                    <el-table :data="weiBoOption" :resizable="false" :show-header="false" style="width: 100%" border class="tran-table yellow-table">
                        <el-table-column type="index" width="50"></el-table-column>
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
    #search_container{
        padding: 15px 0 1px;
        background-color: #141725;
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
     import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
     import searchBox from  './../../../components/searchBox/searchBox.vue';
     import "vue-style-loader!css-loader!sass-loader!../../../assets/css/tabs/tabs.scss";
     export default{
         data(){
             return {
                 activeName: 'todayHot',
                 weiBoOption:[
                     {
                         weiBoNumber:"清华讲座",
                         source:"人文学院",
                         principal:"刘主任",
                         principalEmail:"liuzhuren@163.com",
                         principalTel:"13212323123",
                         publisher:"找老师",
                         publisherEmail:"zhaolaoshi@163.com",
                         publisherTel:"13421212312",
                         state:"已认证",
                     },
                     {
                         weiBoNumber:"清华讲座",
                         source:"人文学院",
                         principal:"刘主任",
                         principalEmail:"liuzhuren@163.com",
                         principalTel:"13212323123",
                         publisher:"找老师",
                         publisherEmail:"zhaolaoshi@163.com",
                         publisherTel:"13421212312",
                         state:"已认证",
                     },
                     {
                         weiBoNumber:"清华讲座",
                         source:"人文学院",
                         principal:"刘主任",
                         principalEmail:"liuzhuren@163.com",
                         principalTel:"13212323123",
                         publisher:"找老师",
                         publisherEmail:"zhaolaoshi@163.com",
                         publisherTel:"13421212312",
                         state:"已认证",
                     },
                     {
                         weiBoNumber:"清华讲座",
                         source:"人文学院",
                         principal:"刘主任",
                         principalEmail:"liuzhuren@163.com",
                         principalTel:"13212323123",
                         publisher:"找老师",
                         publisherEmail:"zhaolaoshi@163.com",
                         publisherTel:"13421212312",
                         state:"已认证",
                     },
                     {
                         weiBoNumber:"清华讲座",
                         source:"人文学院",
                         principal:"刘主任",
                         principalEmail:"liuzhuren@163.com",
                         principalTel:"13212323123",
                         publisher:"找老师",
                         publisherEmail:"zhaolaoshi@163.com",
                         publisherTel:"13421212312",
                         state:"已认证",
                     }
                 ],
                 searchNames: ['vector', 'emotion', 'publishDateTime']
             }
         },
         components:{breadCrumb,searchBox} ,
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
             },
             onSearchDataChange(data) {
                 console.log("change callback, data :");
                 console.log(data);
             }
         },
         created(){
             this.setBreadCrumb();
         },
         mounted(){

         }
     }
</script>