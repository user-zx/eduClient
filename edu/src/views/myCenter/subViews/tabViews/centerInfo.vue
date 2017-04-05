/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="centerInfo">
        <div class="logo-wrap">
            <div class="item logo">
                <img src="../../../../assets/images/lufei-logo.jpg" alt="">
            </div>
            <div class="item name-div">
                <p class="user-name">用户名： <span>唧唧复唧唧</span></p>
                <p class="register-date">注册时间：2017-01-22 19:19</p>
            </div>
        </div>
        <div class="summary-wrap">
            <div class="circle-wrap">
                <div class="circle-div">
                    <div class="text">
                        <p class="top">10</p>
                        <p class="middle">已选择高校</p>
                        <p class="bottom">剩余5个</p>
                    </div>
                    <div class="mask">
                        <div class="btn-wrap">
                            <el-button type="text" @click="addCollege()">添加</el-button>
                            <!--<div class="line"></div>-->
                            <el-button type="text" @click="setItem()">设置</el-button>
                        </div>
                    </div>
                </div>
            </div>
           <div class="circle-wrap">
               <div class="circle-div">
                   <div class="text">
                       <p class="top">15</p>
                       <p class="middle">已选择人物</p>
                       <p class="bottom">剩余5个</p>
                   </div>
                   <div class="mask">
                       <div class="btn-wrap">
                           <el-button type="text" @click="addCharacter()">添加</el-button>
                           <el-button type="text">设置</el-button>
                       </div>
                   </div>
               </div>
           </div>
            <div class="circle-wrap">
                <div class="circle-div">
                    <div class="text">
                        <p class="top">7</p>
                        <p class="middle">已添加子账号</p>
                        <p class="bottom">剩余5个</p>
                    </div>
                    <div class="mask">
                        <div class="btn-wrap">
                            <el-button type="text" @click="addSubCount()">添加</el-button>
                            <el-button type="text" @click="setSubCount()">设置</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false">
                <el-table-column label="订单编号" prop="orderNum" align="center"></el-table-column>
                <el-table-column label="产品类型" prop="productType" align="center"></el-table-column>
                <el-table-column label="支付时间" prop="payDate" align="center"></el-table-column>
                <el-table-column label="期限" prop="deadline" align="center"></el-table-column>
                <el-table-column label="到期时间" prop="expireDate" align="center"></el-table-column>
                <el-table-column label="支付金额" prop="money" align="center"></el-table-column>
                <el-table-column label="查看详情" prop="viewDetail" align="center">
                    <template scope="scope">
                            <span @click="viewDetail(scope.row)" class="pointer">
                                {{scope.row.viewDetail}}
                            </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .centerInfo{
        background: #21273d;
        overflow: hidden;

        .logo-wrap{
            height: 100px;
            margin: 50px 50px 10px 50px;

            .logo{
                width: 100px;
                height: 100px;
                display: inline-block;
                    img{
                        max-height:100px;
                    }
            }
            .name-div{
                width: calc(100% - 140px);
                height:inherit;
                display: inline-block;
                margin-left: 28px;
                vertical-align: top;

                p{
                    color: #c8cef5;
                    height: 35px;
                    line-height: 35px;
                }

                p.user-name{
                    font-size: 18px;
                    margin-top: 15px;

                    span{
                        color: #e4f09e;
                    }
                }
            }
        }

        .summary-wrap{
            text-align: center;

            .circle-wrap{
                margin: 140px 50px 85px 50px;
                display: inline-block;

                .circle-div{
                    width: 160px;
                    height: 160px;
                    border: 2px solid #60a3ff;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    border-radius:50%;
                    position: relative;

                .text{
                    overflow: hidden;
                    width: inherit;
                    height: inherit;

                    p.top{
                        font-size:40px;
                        color: #e4f09e;
                        margin-bottom: 5px;
                        margin-top: 20px;
                    }

                    p.middle{
                        font-size: 18px;
                        color: #d0d7ff;
                        margin-bottom: 10px;
                    }

                    p.bottom{
                        font-size: 16px;
                        color: #757a97;
                    }
                }

                .mask{
                    height: inherit;
                    width: inherit;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    border-radius:50%;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    background: rgba(117,112,151, 0.5);
                    z-index: -1;

                .btn-wrap{
                    margin-top: 55px;

                .el-button {
                    font-size: 20px;
                    font-weight: bold;
                    opacity: 1;
                }
                }

                .line{
                    width: 2px;
                    height: 40px;
                    display: inline-block;
                }
                }
                }
            }



            .circle-div:hover{
                .mask{
                    z-index: 9999;
                }
            }
        }

        .detail-wrap{
            margin: 0px 50px 30px 50px;
            .el-table{
                margin: auto;
            }
        }
    }

</style>
<script>
    export default{
        data(){
            return {
                tableData: [
                    {orderNum: 123456, productType: 'A套餐', payDate: '2017-01-01',
                        deadline: '一年', expireDate: '2018-01-01', money: 99, viewDetail: '查看'},
                    {orderNum: 123456, productType: 'A套餐', payDate: '2017-01-01',
                        deadline: '一年', expireDate: '2018-01-01', money: 99, viewDetail: '查看'},
                    {orderNum: 123456, productType: 'A套餐', payDate: '2017-01-01',
                        deadline: '一年', expireDate: '2018-01-01', money: 99, viewDetail: '查看'},
                    {orderNum: 123456, productType: 'A套餐', payDate: '2017-01-01',
                        deadline: '一年', expireDate: '2018-01-01', money: 99, viewDetail: '查看'},
                    {orderNum: 123456, productType: 'A套餐', payDate: '2017-01-01',
                        deadline: '一年', expireDate: '2018-01-01', money: 99, viewDetail: '查看'}
                ]
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            addCollege(){
                this.$router.push({path: "/home/centerCollege"});
            },

            addCharacter(){
                this.$router.push({path: "/home/centerCharacter"});
            },

            addSubCount(){
                $('.attend-tabs .el-col').removeClass('active');
                $('.attend-tabs .el-col-subCount').addClass('active');
                this.$parent.currentTabs.currentTab = "subCount";
            },

            setSubCount(){
                $('.attend-tabs .el-col').removeClass('active');
                $('.attend-tabs .el-col-subCount').addClass('active');
                this.$parent.currentTabs.currentTab = "subCount";
            }
        },
        mounted(){

        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>