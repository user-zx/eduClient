/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="myCenter">
        <div class="attend-tabs">
            <el-row :gutter="10">
                <el-col :span="3" class="active"><div class="tab-item" @click="currentFun('centerInfo')">会员中心</div></el-col>
                <el-col :span="3"><div class="tab-item" @click="currentFun('memberInfo')">会员资料</div></el-col>
                <el-col :span="3" class="el-col-subCount">
                    <div class="tab-item" @click="currentFun('subCount')">子账号管理</div>
                </el-col>
                <el-col :span="3"><div class="tab-item" @click="currentFun('modifyPwd')">修改密码</div></el-col>
                <el-col :span="3"><div class="tab-item" @click="currentFun('operateLog')">操作日志</div></el-col>
                <el-col :span="3"><div class="tab-item" @click="currentFun('buyPackage')">购买套餐</div></el-col>
                <el-col :span="3"><div class="tab-item" @click="currentFun('systemNotice')">系统通知</div></el-col>
            </el-row>
        </div>
        <components :is="currentTabs.currentTab"></components>
    </div>
</template>
<style lang="scss" scoped>
    .attend-tabs{
        background-color: #21273d;
        margin-top: 10px;
        margin-bottom:10px;
        padding:16px 22px;
    .el-col-3{
        width: 14.25%;
    }
    .el-col{
    .tab-item{
        height:125px;
        line-height: 125px;
        font-size: 16px;
        text-align: center;
        color:rgba(193,202,240,.5);
        background: #282e46;
        transition: all .25s;
        cursor: pointer;
        border:1px solid #273451;
    &:hover{
         color:#60a3ff;
     }
    }
    &.active{
    .tab-item{
        color:#60a3ff;
    }
    }
    }
    }
</style>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import centerInfo from "./tabViews/centerInfo.vue";
    import memberInfo from "./tabViews/memberInfo.vue";
    import subCount from "./tabViews/subCountManage.vue";
    import modifyPwd from "./tabViews/modifyPwd.vue";
    import operateLog from "./tabViews/operateLog.vue";
    import buyPackage from "./tabViews/buyPackage.vue";
    import systemNotice from "./tabViews/systemNotice.vue";

    export default{
        data(){
            return {
                currentTabs:{
                    centerInfo: 'centerInfo',
                    memberInfo: 'memberInfo',
                    subCount: 'subCount',
                    modifyPwd: 'modifyPwd',
                    operateLog: 'operateLog',
                    buyPackage: 'buyPackage',
                    systemNotice: 'systemNotice',
                    currentTab: 'centerInfo'
                }
            }
        },
        components:{centerInfo,memberInfo,subCount,modifyPwd,operateLog,buyPackage,systemNotice} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"个人中心",to:{path:"/"}
                    },
                    {
                        name: "会员中心", to: {path: "home/myCenter"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            currentFun(params){
                this.currentTabs.currentTab = params;
            }
        },
        mounted(){
            $(".attend-tabs").on("click",".tab-item",function () {
                $(this).parent().addClass("active").siblings().removeClass("active");
            });
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>