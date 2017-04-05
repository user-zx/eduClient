/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="packageConfirm">
        <div class="content-wrap">
            <div class="title blue">预购套餐列表</div>
            <div class="content">
                <div class="top">
                    <div class="memberInfo dark">
                        <el-row>
                            <el-col :span="6" :offset="2">
                                使用期限：
                            </el-col>
                            <el-col :span="13">
                                <span class="yellow deadline">一年</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                联系电话：
                            </el-col>
                            <el-col :span="13">
                                <el-input class="dark input-small"></el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                电子邮箱：
                            </el-col>
                            <el-col :span="13">
                                <el-input class="dark input-small"></el-input>
                            </el-col>
                        </el-row>
                        <el-row class="service-phone">
                            <el-col :span="7" :offset="2">客户咨询热线：</el-col>
                            <el-col :span="13">400-0617-8888</el-col>
                        </el-row>
                    </div>
                </div>
                <div class="middle package-detail">
                    <p class="package-title">套餐类型：<span class="yellow">C套餐</span></p>
                    <div class="item">
                        <p class="tree blue">舆情管理</p>
                        <p class="tree-node">全景舆情</p>
                        <p class="tree-node">舆情预警</p>
                        <p class="tree-node">舆情报告</p>
                    </div>
                    <div class="item">
                        <p class="tree blue">情报内参</p>
                        <p class="tree-node">两微洞察</p>
                        <p class="tree-node">媒体声誉</p>
                    </div>
                </div>
                <div class="bottom">
                    <p>可关注高校：<span class="blue">6</span></p>
                    <p>可添加人物：<span class="blue">10</span></p>
                </div>
            </div>

            <div class="btn-wrap">
                <div class="left">
                    应支付金额： <span class="money">999</span>
                </div>
                <div class="right">
                    <el-button type="primary" @click="submitOrder('data')" class="save-btn">确认提交</el-button>
                </div>
            </div>
        </div>

        <div class="line"></div>
    </div>
</template>
<style lang="scss" scoped>

    .packageConfirm{
        background: #21273d;
        overflow: hidden;

        .content-wrap{
            margin: 52px 0px 59px 66px;
            width: 766px;
            border: 1px solid #3a598b;

            .title{
                font-size: 24px;
                text-align: center;
                margin: 45px auto 60px auto;
                font-weight: normal;
            }

            .content{
                width: calc(100% - 26px);
                margin: auto;

                .top{
                    border-bottom: 1px solid #33456b;

                    .memberInfo{
                        width: 50%;
                        margin: auto;

                        .el-row{
                            font-size: 16px;
                            margin-bottom: 16px;

                            .deadline{
                                font-size: 16px;
                            }
                        }

                        .service-phone{
                            font-size: 14px;
                            color: #7c82a0;
                            margin-bottom: 28px;
                        }
                    }
                }

                .middle{
                    border-bottom: 1px solid #33456b;
                    margin-top: 40px;

                    .package-title{
                        font-size: 18px;
                        text-align: center;
                        margin-bottom: 30px;
                    }

                    .item{
                        width: 140px;
                        margin: auto;

                        .tree{
                            font-size: 16px;
                            margin-bottom: 21px;
                        }

                        .tree-node{
                            margin: 0px 0px 15px 80px;
                        }

                        .tree-node:last-child{
                            margin-bottom: 28px;
                        }
                    }
                }

                .bottom{
                    font-size: 16px;
                    text-align: center;
                    margin-top: 42px;
                    border-bottom: 1px solid #33456b;

                    p{
                        margin-bottom: 19px;
                    }
                    p:last-child{
                        margin-bottom: 42px;
                    }
                }
            }

            .btn-wrap{
                width: calc(100% - 26px);
                margin: auto;
                margin-top: 26px;
                margin-bottom: 26px;

                .left{
                    font-size: 18px;
                    margin-left: 20px;
                    width: calc(50% - 22px);
                    display: inline-block;

                    .money{
                        color: #ff8b2e;
                        font-size: 28px;
                    }
                }

                .right{
                    width: calc(50% - 48px);
                    display: inline-block;
                    margin-right: 46px;
                    text-align: right;

                        .el-button{
                            width: 179px;
                            height: 46px;
                            font-size: 18px;
                        }
                }
            }
        }

        .line{
            width: 85%;
            height: 1px;
            border-top: 1px solid #33456b;
            margin-bottom: 195px;
        }

        .blue{
            color: #60a3ff;
        }

        .yellow{
            color: #e4f09e;
        }

        .el-form-item__label{
            font-size: 16px;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: ''
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"个人中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"购买套餐", to: {path: ""}
                    },
                    {
                        name: "预定提交"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            submitOrder(){
                this.$router.push({path: "/home/centerPackageResult"})
            }
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>