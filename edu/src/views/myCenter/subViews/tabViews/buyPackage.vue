/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="buyPackage">
        <div class="content-wrap">
            <div class="item" @click="selectPackage(1)">
                <div class="title blue">A套餐</div>
                <div class="top">
                    <div class="info">
                        <div class="tree blue">舆情管理</div>
                        <div class="tree-node">
                            <span>全景舆情</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情预警</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>事件监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情报告</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">情报内参</div>
                        <div class="tree-node">
                            <span>行业动态</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>人物动态</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>两微洞察</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>媒体声量</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>内参报告</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">业务工具</div>
                        <div class="tree-node">
                            <span>两微监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="info">
                        可添加高校： <span class="blue">20</span>
                    </div>
                    <div class="info">
                        可添加高校： <span class="blue">20</span>
                    </div>
                    <div class="info">
                        使用期限：<div class="input-wrap"><el-input  size="small" class="dark"></el-input></div>
                    </div>
                </div>
                <div class="bottom">
                    应付金额： <span class="money">999</span>
                </div>
            </div>
            <div class="item" @click="selectPackage(2)">
                <div class="title blue">B套餐</div>
                <div class="top">
                    <div class="info">
                        <div class="tree blue">舆情管理</div>
                        <div class="tree-node">
                            <span>全景舆情</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情预警</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>事件监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情报告</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">情报内参</div>
                        <div class="tree-node">
                            <span>行业动态</span>
                            <div class="checkbox">
                                <el-checkbox v-model="unchecked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>人物动态</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>两微洞察</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>媒体声量</span>
                            <div class="checkbox">
                                <el-checkbox v-model="unchecked" disabled></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>内参报告</span>
                            <div class="checkbox">
                                <el-checkbox v-model="unchecked" disabled></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">业务工具</div>
                        <div class="tree-node">
                            <span>两微监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked" disabled></el-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="info">
                        可添加高校： <span class="blue">20</span>
                    </div>
                    <div class="info">
                        可添加高校： <span class="blue">20</span>
                    </div>
                    <div class="info">
                        使用期限：<div class="input-wrap"><el-input  size="small" class="dark"></el-input></div>
                    </div>
                </div>
                <div class="bottom">
                    应付金额： <span class="money">999</span>
                </div>
            </div>
            <div class="item" @click="selectPackage(3)">
                <div class="title blue">C套餐</div>
                <div class="top">
                    <div class="info">
                        <div class="tree blue">舆情管理</div>
                        <div class="tree-node">
                            <span>全景舆情</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情预警</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>事件监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>舆情报告</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">情报内参</div>
                        <div class="tree-node">
                            <span>行业动态</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>人物动态</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>两微洞察</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>媒体声量</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                        <div class="tree-node">
                            <span>内参报告</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">业务工具</div>
                        <div class="tree-node">
                            <span>两微监测</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="info">
                        可添加高校：
                        <div class="input-wrap small"><el-input class="dark input-small"></el-input></div>
                        500元/所
                    </div>
                    <div class="info">
                        可添加高校：
                        <div class="input-wrap small"><el-input class="dark input-small"></el-input></div>
                        500元/人
                    </div>
                    <div class="info">
                        使用期限：<div class="input-wrap"><el-input class="dark input-small"></el-input></div>
                    </div>
                </div>
                <div class="bottom">
                    应付金额： <span class="money">999</span>
                </div>
            </div>
            <hr class="line">
            <div class="btn-wrap">
                <el-button type="primary" @click="submit()">提交预定</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

    .buyPackage{
        background: #21273d;
        overflow: hidden;

        .content-wrap{
            width: 90%;
            margin: 50px auto 95px auto;

            .item{
                width: calc((100% - 310px)/3);
                border: 1px solid #3a598b;
                display: inline-block;
                margin-left: 50px;
                margin-right: 50px;
                vertical-align: top;
                cursor: pointer;
                
                .title{
                    font-size: 24px;
                    text-align: center;
                    margin: 26px auto 38px auto;
                }

                .top{
                    .info{
                        width: calc(100% - 50px);
                        margin: auto;
                        margin-bottom: 30px;

                        .tree{
                            font-size: 18px;
                            margin-bottom: 21px;
                        }
                        
                        .tree-node{
                            color: #d0d7ff;
                            margin: 0px 0px 15px 80px;

                            .checkbox{
                                display: inline-block;
                                margin-left: 29px;
                            }
                        }
                    }
                }

                .middle{
                    width: calc(100% - 50px);
                    border-top: 1px solid #33456b;
                    border-bottom: 1px solid #33456b;
                    margin: auto;

                    .info:first-child{
                        margin-top: 30px;
                    }
                    .info:last-child{
                        margin-bottom: 19px;
                    }

                    .info{
                        height: 35px;
                        line-height: 35px;
                    }

                    .input-wrap{
                        display: inline-block;
                        width: 105px;
                    }

                    .input-wrap.small{
                        width: 80px;
                        margin-right: 5px;
                    }
                }


                .bottom{
                    width: calc(100% - 50px);
                    height: 66px;
                    line-height: 66px;
                    margin: auto;
                    font-size: 18px;

                    .money{
                        font-size: 28px;
                        color: #ff8b2e;
                    }
                }
            }

            .line{
                width: calc(100% - 100px);
                height: 1px;
                border-top:1px solid #60a3ff;
                border-bottom: none;
                border-left: none;
                border-right: none;
                margin-top: 55px;
            }
            
            .selected{
                border-color: #60a3ff;
            }

            .btn-wrap{
                margin-top: 44px;
                text-align: center;

                .el-button{
                    width: 319px;
                    height: 56px;
                    line-height: 28px;
                    font-size: 18px;
                }
            }
        }

        .blue{
            color: #60a3ff;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                checked: true,
                unchecked: false,
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"购买套餐"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            selectPackage(index){
                $('.buyPackage .item').removeClass('selected');
                if(index == 1){
                    $('.buyPackage .item:eq(0)').addClass('selected');
                }else if(index == 2){
                    $('.buyPackage .item:eq(1)').addClass('selected');
                }else{
                    $('.buyPackage .item:eq(2)').addClass('selected');
                }
            },

            submit(){
                this.$router.push({path:"/home/centerPackageConfirm"});
            }
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>