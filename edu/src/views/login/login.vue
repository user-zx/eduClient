<template>
    <div id="login" class="login">
        <header class="header">
            <div class="container">
                <router-link to="/login" class="header-brand">
                    <img src="./images/login_logo.png" alt="login" />
                </router-link>
                <div class="pull-right">
                    <img src="./images/tel.png" alt="电话" />
                    400-0617-888
                </div>
            </div>
        </header>
        <div class="wrapper">
            <div class="left-banner">
                <div class="text-center">
                    <img src="./images/trade.png" alt="教育行业">
                </div>
                <div class="text-center">
                    <img src="./images/pru.png" alt="大数据应用服务平台">
                </div>
                <img class="banner" src="./images/data.png" />
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="scss">
    %full{min-height:100%;min-width: 1200px;}
    html,body,#edu,.login{@extend %full}
    #edu{
        height:100%;
    }
    .login{
        .login-form{
            .ruleForm{
                .el-form-item{
                    margin-bottom:15px;
                    &.btn-box{
                        button{
                            width: 100%;
                            padding-top:20px;
                            padding-bottom:20px;
                            font-size:15px;
                        }
                        .white-primary{
                            background-color: rgba(96,163,255,.2);
                            border-color: transparent;
                            color:#d0d7ff;
                        }
                    }
                    &.login-text-color{
                         margin-top: 10px;
                        label{
                            color:#d0d7ff;
                        }
                        a{
                            color:rgba(96,163,255,.8);
                        }
                    }
                    .el-form-item__content {
                        margin-left: 0 !important;
                    }
                    &.login-input-box{
                         padding-left:3px;
                         padding-right:3px;
                         margin-bottom:0;
                         border:1px solid rgba(96,163,255,.3);
                         border-bottom:none;
                         border-radius:4px 4px 0 0;
                        .el-form-item__label{
                            display: none;
                        }
                        .el-form-item__content{
                            margin-left: 0 !important;
                            .el-input__icon{
                                left:0;
                                &+.el-input__inner{
                                      padding-right:0;
                                      padding-left:35px;
                                  }
                                &.el-icon-username{

                                 }
                                &.el-icon-password{

                                 }
                            }
                            .el-form-item__error{
                                left:35px;
                            }
                            input{
                                background-color: transparent;
                                box-shadow: none;
                                border:none;
                                outline: none;
                                height:70px;
                                font-size:16px;
                                color:#d0d7ff;
                            }
                        }
                        &+.login-input-box{
                              border-radius: 0 0 4px 4px;
                              border:1px solid rgba(96,163,255,.3);
                              border-top:none;
                            input{
                                border-radius: 0;
                                border-top:1px solid rgba(96,163,255,.3);
                            }
                        }
                    }
                }
            }
        }
        .right-form{
            position: absolute;
            right: 0;
            top:0;
            .ruleForm{
                width: 400px;
                margin: 0 auto;
                padding: 25px 20px;
            }
            .login-title{
                span{
                    display: block;
                    padding-top:60px;
                    font-size: 30px;
                    color:#d0d7ff;
                    text-align: center;
                    border-bottom: 1px solid #07080e;
                }
                &:after{
                     content: " ";
                     display: block;
                     width: 100%;
                     height:2px;
                     border-bottom: 1px solid #2f344f;
                 }
            }
            &.probation{
                padding-left:10px;
                padding-right:10px;
                border:1px solid rgba(96,163,255,.4);
                border-radius: 5px;
                .login-title{
                    span{
                        padding-top:15px;
                    }
                }
                .submit{
                    width: 100%;
                    background-color: #60a3ff;
                    border-color:#60a3ff;
                }
            }
        }
    }
    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
        background-color: transparent !important;
    }
</style>
<style lang="scss" scoped>
    %border_bottom{
        content: " ";
        display: block;
        width: 100%;
        height:2px;
        border-bottom: 1px solid #2f344f;
    }
    .login{
        min-height:100%;
        background-color: #191c2d;
        .header{
            height:89px;
            line-height:88px;
            border-bottom:1px solid #07080e;
            .container{
                width: 1200px;
                margin: 0 auto;
            }
            .header-brand{
                display:inline-block;
                img{
                    vertical-align: middle;
                }
            }
            .pull-right{
                img{
                    vertical-align: middle;
                    margin-right:5px;
                }
            }
            &:after{
                @extend %border_bottom
            }
        }
        .left-banner{
            position: relative;
            display: inline-block;
            text-align: left;
            .text-center{
                width:100%;
                position: absolute;
                transition: text-align 2s;
                top:-20px;
                &+.text-center{
                    top:40px;
                  }
            }
            img.banner{
                width: 835px;
                height: 581px;
            }
        }
        .wrapper{
            position: relative;
            width: 1200px;
            margin: 95px auto 0;

        }
    }
</style>
<script>
    export default{
        data(){
            return {

            }
        },
        components:{},
        methods:{

        },
        mounted(){
            let vm=this;
        }
    }
</script>