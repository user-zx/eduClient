/**
* Created by zhangxin on 2017/4/5.
*/
<template>
    <div class="right-form login-form">
        <h1 class="login-title">
            <span>登录</span>
        </h1>
        <el-form :model="ruleForm" action="/apis/login.do" method="post" :rules="rules" ref="ruleForm" label-width="70px" class="ruleForm">
            <el-form-item label="账号：" prop="user" class="login-input-box">
                <el-input type="text" name="username" icon="username" v-model="ruleForm.user" placeholder="请输入账号" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass" class="login-input-box">
                <el-input type="password" name="password" icon="password" v-model="ruleForm.pass" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="login-text-color">
                <el-col :span="12">
                    <el-checkbox v-model="ruleForm.rememberMe"  name="rememberMe" id="rememberMe">记住密码</el-checkbox>
                </el-col>
                <el-col :span="12" class="text-right">
                    <router-link to="/forget">忘记密码</router-link>
                </el-col>
            </el-form-item>
            <el-form-item class="btn-box">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
            <el-form-item class="btn-box ">
                <el-button type="primary white-primary" @click="probation()">申请试用</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    import '../script/security';
    export default{
        data(){
            return {
                ruleForm: {
                    user: '',
                    pass: '',
                    rememberMe: false,
                },
                rules:{
                    user:[
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    pass:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        components:{} ,
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/apis/security/generateKey.do').then((response) => {
                                if (response.data.success) {
                                    console.log(response.data);
                                    let exponent = response.data.data.publicKeyExponent;
                                    let modulus = response.data.data.publicKeyModulus;
                                    RSAUtils.setMaxDigits(200);
                                    let key = new RSAUtils.getKeyPair(exponent, "", modulus);
                                    var password =  $('input[name=password]').val();
                                    let encrypedPwd = RSAUtils.encryptedString(key,password);
                                    $('input[name=password]').val(encrypedPwd);
                                    $(".ruleForm").submit();
                                } else {
                                    console.error(response.data.msg);
                                    return false;
                                }
                            }, (response) => {
                                console.error(response);
                                return false;
                            }
                        );
                    } else {
                        this.$message({message:'登录校验失败!',type:"error"});
                        return false;
                    }
                });
            },
            resetForm(formName) {
                /*重置表单*/
                this.$refs[formName].resetFields();
            },
            probation(){
                this.$router.push({path:"/probation"})
            }
        },
        mounted(){
            
        }
    }
</script>