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
                <div class="clearfix btn-box">
                    <div class="pull-right">
                        <el-button type="primary">微博认证</el-button>
                    </div>
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
                <div class="btn-box clearfix">
                    <div class="pull-left">
                        <el-button type="primary">批量关注</el-button>
                    </div>
                    <div class="pull-right">
                        <el-button type="primary">微博认证</el-button>
                    </div>
                </div>
                <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                          :resizable="false">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column label="排名" align="center" prop="all">
                        <template scope="scope">
                            <span v-if="scope.row.all == 1">
                                 <i class="icon-rank icon-gold"></i>
                            </span>
                            <span v-else-if="scope.row.all == 2">
                                <i class="icon-rank icon-silver"></i>
                           </span>
                            <span v-else-if="scope.row.all == 3">
                                 <i class="icon-rank icon-copper"></i>
                            </span>
                            {{scope.row.all}}
                        </template>
                    </el-table-column>
                    <el-table-column label="微博号" prop="name" align="center">
                        <template scope="scope">
                            <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                                {{scope.row.name}}
                            </span>
                            <!--<router-link to="/home/characterAnalyse">-->
                            <!--{{scope.row.name}}-->
                            <!--</router-link>-->
                        </template>
                    </el-table-column>
                    <el-table-column label="发博量" prop="voiceNum" align="center"></el-table-column>
                    <el-table-column label="关注量" prop="readNum" align="center"></el-table-column>
                    <el-table-column label="粉丝量" prop="readNum" align="center"></el-table-column>
                    <el-table-column label="转发量" prop="readNum" align="center"></el-table-column>
                    <el-table-column label="评论数" prop="readNum" align="center"></el-table-column>
                    <el-table-column label="点赞总数" prop="readNum" align="center"></el-table-column>
                    <el-table-column label="平均点赞量" prop="hot" align="center"></el-table-column>
                    <el-table-column label="认证状态" prop="emotion" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="scss" scoped>
    #search_container{
        padding: 15px 0 1px;
        background-color: #141725;
    }
    .btn-box{
        padding:20px 20px 0;
    }
    .mt20{margin-top: 20px;}
    .character-name{
        cursor: pointer;
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
                 searchNames: ['vector', 'emotion', 'publishDateTime'],
                 tableData: [
                     {
                         'id': 1,
                         'all': 1,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 2,
                         'all': 2,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 3,
                         'all': 3,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 4,
                         'all': 4,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 5,
                         'all': 5,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 6,
                         'all': 6,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 7,
                         'all': 7,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 8,
                         'all': 8,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 9,
                         'all': 9,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 10,
                         'all': 10,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 11,
                         'all': 11,
                         'name': '习1总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 12,
                         'all': 12,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },{
                         'id': 13,
                         'all': 13,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 14,
                         'all': 14,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     },
                     {
                         'id': 15,
                         'all': 15,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     }
                     ,
                     {
                         'id': 16,
                         'all': 16,
                         'name': '习总',
                         'voiceNum': 888,
                         'readNum': 1024,
                         'hot': 5,
                         'emotion': '已认证'
                     }
                 ]
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
             },
             toCharacterAnalyse(data){
                 console.log(data);
                 this.$router.push({path:"/home/characterAnalyse"});
             }
         },
         created(){
             this.setBreadCrumb();
         },
         mounted(){

         }
     }
</script>