/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="myCenter">
        <div class="attend-tabs">
            <el-row :gutter="10">
                <el-col :span="3" class="active" v-show="isPrimaryAccount">
                    <div class="tab-item" @click="currentFun('centerInfo')">
                        <i class="icon icon-1"></i>
                        会员中心
                    </div>
                </el-col>
                <el-col :span="3" v-show="isPrimaryAccount">
                    <div class="tab-item" @click="currentFun('memberInfo')">
                       <i class="icon icon-2"></i>
                        会员资料
                    </div>
                </el-col>
                <el-col :span="6" v-show="isPrimaryAccount == false" class="active">
                    <div class="tab-item" @click="currentFun('aboutMe')">
                        <i class="icon icon-2"></i>
                        个人资料
                    </div>
                </el-col>
                <el-col :span="3" class="el-col-subCount" v-show="isPrimaryAccount">
                    <div class="tab-item" @click="currentFun('subCount')">
                       <i class="icon icon-3"></i> 子账号管理
                    </div>
                </el-col>
                <el-col :span="3" v-if="isPrimaryAccount == true">
                    <div class="tab-item" @click="currentFun('modifyPwd')">
                       <i class="icon icon-4"></i> 修改密码
                    </div>
                </el-col>
                <el-col :span="6" v-else-if="isPrimaryAccount == false">
                    <div class="tab-item" @click="currentFun('modifyPwd')">
                        <i class="icon icon-4"></i> 修改密码
                    </div>
                </el-col>
                <el-col :span="3" v-if="isPrimaryAccount == true">
                    <div class="tab-item" @click="currentFun('operateLog')">
                        <i class="icon icon-5"></i> 操作日志
                    </div>
                </el-col>
                <el-col :span="6" v-else-if="isPrimaryAccount == false">
                    <div class="tab-item" @click="currentFun('operateLog')">
                        <i class="icon icon-5"></i> 操作日志
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="tab-item" @click="currentFun('buyPackage')" v-show="isPrimaryAccount">
                        <i class="icon icon-6"></i> 购买套餐
                    </div>
                </el-col>
                <el-col :span="3" v-if="isPrimaryAccount == true">
                    <div class="tab-item systemNotice" @click="currentFun('systemNotice')">
                        <i class="icon icon-7"></i> 系统通知
                    </div>
                </el-col>
                <el-col :span="6" v-if="isPrimaryAccount == false">
                    <div class="tab-item systemNotice" @click="currentFun('systemNotice')">
                        <i class="icon icon-7"></i> 系统通知
                    </div>
                </el-col>
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
                    .icon{
                        background-image: url(../../../assets/images/huiyuan@1x.png);
                        background-repeat: no-repeat;
                    }
                }

                .icon{
                    background: url("../../../assets/images/huiyuan_gray@1x.png") no-repeat;
                    width: 24px;
                    height: 27px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 5px;
                    margin-top: -10px;
                }

                 .icon-1{
                     background-position: 0px 0px;
                 }

                 .icon-2{
                     background-position: -30px 0px;
                 }

                 .icon-3{
                     background-position: -60px 0px;
                 }

                 .icon-4{
                     background-position: -89px 0px;
                     height: 28px;
                 }

                 .icon-5{
                     background-position: -120px 0px;
                     width: 29px;
                     height: 27px;
                 }

                 .icon-6{
                     background-position: -155px 0px;
                     width: 27px;
                     height: 27px;
                 }

                 .icon-7{
                     background-position: -184px -2px;
                 }
            }
            &.active{
                .tab-item{
                    color:#60a3ff;

                    .icon{
                        background-image: url(../../../assets/images/huiyuan@1x.png);
                        background-repeat: no-repeat;
                    }
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
    import aboutMe from "./tabViews/aboutMe.vue";
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
                    aboutMe: 'aboutMe',
                    subCount: 'subCount',
                    modifyPwd: 'modifyPwd',
                    operateLog: 'operateLog',
                    buyPackage: 'buyPackage',
                    systemNotice: 'systemNotice',
                    currentTab: 'centerInfo'
                },
                isPrimaryAccount: false
            }
        },
        components:{centerInfo,memberInfo,aboutMe,subCount,modifyPwd,operateLog,buyPackage,systemNotice} ,
        methods:{
//            setBreadCrumb(){
//                let breadcrumb=[
//                    {
//                        name:"个人中心",to:{path:"/"}
//                    },
//                    {
//                        name: "会员中心", to: {path: "home/myCenter"}
//                    }
//                ];
//                this.$store.commit("setBreadCrumb",breadcrumb);
//            },
            currentFun(params){
                this.currentTabs.currentTab = params;
            },

            judgeAccountType(){
                this.$http.post('/apis/userMgrt/getUserPermission.json', {type: 'user'}).then(
                    (response) => {
                        if (response.data.success) {
                            if(response.data.data.primaryAccountId == null){
                                this.isPrimaryAccount = true;
                            }else {
                                this.isPrimaryAccount = false;
                                this.currentTabs = {
                                    aboutMe: 'aboutMe',
                                    modifyPwd: 'modifyPwd',
                                    operateLog: 'operateLog',
                                    systemNotice: 'systemNotice',
                                    currentTab: 'aboutMe'
                                };
                            }
                        } else {
                             console.error(response.data.message);
                        }
                     }, (response) => {
                        console.error(response);
                     }
                );
            }
        },
        mounted(){
            $(".attend-tabs").on("click",".tab-item",function () {
                $(this).parent().addClass("active").siblings().removeClass("active");
            });
            if(this.$route.query != undefined && this.$route.query.defaultActive != undefined){
                let defaultActive = this.$route.query.defaultActive;
                if(defaultActive == 'sysNotice'){
                    $(".tab-item").parent().removeClass('active');
                    $('.systemNotice').parent().addClass('active');
                    this.currentFun('systemNotice');
                }
            }
        },
        created(){
//            this.setBreadCrumb();
            this.judgeAccountType();
        }
    }
</script>