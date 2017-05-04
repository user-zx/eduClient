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
                                <span class="yellow deadline">{{data[0].time}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                联系电话：
                            </el-col> 
                            <el-col :span="13" class="verify_input" :class="{isShow_phone:phone_empty}">
                              <el-input class="dark input-small" placeholder="请输入手机号" v-model="ruleForm.phone" @blur="onBlurPhone()" @change="onChangePhone"></el-input> 
                              <p v-html="hintPhone"></p>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                电子邮箱：
                            </el-col>
                            <el-col :span="13" class="verify_input">
                                <el-input class="dark input-small" placeholder="请输入邮箱" v-model="ruleForm.email" :class="{isShow_email:email_empty}" @blur="onBlurEmail($event)" @change="onChangeEmail"></el-input>
                                <p v-html="hintEmail"></p>
                            </el-col>
                        </el-row>
                        <el-row class="service-phone">
                            <el-col :span="7" :offset="2">客户咨询热线：</el-col>
                            <el-col :span="13">{{consultHotLine}}</el-col>
                        </el-row>
                    </div>
                </div>
                <div class="middle package-detail">
                    <p class="package-title">套餐类型：<span class="yellow">{{data[0].setMeal}}</span></p>
                    <div class="item">
                        <p class="tree blue">{{data[0].name}}</p>
                        <p class="tree-node" v-for="item in data[0].item">{{item}}</p>
                    </div>
                    <div class="item">
                        <p class="tree blue">{{data[1].name}}</p>
                        <p class="tree-node" v-for="item in data[1].item">{{item}}</p>
                    </div>
                    <div class="item">
                        <p class="tree blue">{{data[2].name}}</p>
                        <p class="tree-node" v-for="item in data[2].item">{{item}}</p>
                    </div>
                </div>
                <div class="bottom">
                    <p>可关注高校：<span class="blue">{{data[0].concernCollegeNum}}</span></p>
                    <p>可添加人物：<span class="blue">{{data[0].concernPersonNum}}</span></p>
                </div>
            </div>
            <div class="btn-wrap">
                <div class="left">
                    应支付金额： <span class="money">{{data[0].price}}</span>
                </div>
                <div class="right">
                    <el-button type="primary" @click="submitOrder()" class="save-btn">确认提交</el-button>
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
                            margin-bottom: 25px;
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
        
        .isShow_phone,.isShow_email{
            border: 1px solid #ff4949; 
            -webkit-border-radius: 5px; 
            border-radius: 5px; 
        }
    }
</style>
<script>
    export default{
        data(){
              
            return {
                msg: '',
                data:"",
                hintPhone:"",
                hintEmail:"", 
                phone_empty:false,      
                email_empty:false,    
                ruleForm:{phone:"",email:""},
                sign:false,
                consultHotLine: '400-0617-8888'
            }
        },
        methods: {  
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name: "预定提交"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            onChangeEmail(){
                 this.hintEmail = "";
                 this.email_empty = false;
             },
            onBlurEmail(){
                 if(this.ruleForm.email == ""){
                    this.hintEmail = "邮箱不能为空!";
                    this.email_empty = true;
                    this.sign = false; 
                }else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.ruleForm.email)){
                    this.hintEmail = "邮箱格式不正确!";
                    this.email_empty = true;
                    this.sign = false; 
                }else{
                    this.sign = true;
                }
            },
            onChangePhone(){
                 this.hintPhone = "";
                 this.phone_empty = false;
            },
            onBlurPhone(){
                if(this.ruleForm.phone == ""){
                    this.hintPhone = "手机号码不能为空!";
                    this.phone_empty = true;
                    this.sign = false;
                }else if(!/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm.phone)){
                    this.hintPhone = "手机号个格式不正确!";
                    this.phone_empty = true;
                    this.sign = false;
                }else{
                    this.sign = true;
                }
            },
            submitOrder(){
                if(this.ruleForm.phone == ''){
                    this.$message.error('请输入手机号');
                    return ;
                }
                if(this.ruleForm.email == ''){
                    this.$message.error('请输入邮箱');
                    return ;
                }

                let obj = {};
                if(this.sign){
                    obj.packageType = this.data[0].setMeal;
                    obj.packageItem = this.data[0].itemNum;
                    obj.concernCollegeNum = this.data[0].concernCollegeNum;
                    obj.concernPersonNum = this.data[0].concernPersonNum;
                    obj.totalPrice = this.data[0].price;
                    obj.timeLimit = this.data[0].time;
                    obj.phone = this.ruleForm.phone;
                    obj.email = this.ruleForm.email;
                    obj.consultHotline = this.consultHotLine;
                }

                this.$http.post("/apis/packageBuy/packageBuy.json",obj).then((res)=>{
                    if(res.ok){
                        if(res.data.success){
                            this.$message(res.data.data)
                            this.$router.push({path: "/home/centerPackageResult"})
                        }else{
                            this.$message(res.data.message)
                        }
                    }
                },(err)=>{
                    console.log(err);
                })
               
            }
        },
        mounted(){
           
        },
        created(){
            this.setBreadCrumb();
            this.data = this.$route.query.selected;
           console.log(this.data)
        }
    }
</script>