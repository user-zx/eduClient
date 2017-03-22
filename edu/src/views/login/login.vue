<template>
    <div id="login" class="login">
        <el-form :model="ruleForm" action="/apis/login.do" method="post" :rules="rules" ref="ruleForm" label-width="70px" class="ruleForm">
            <el-form-item label="账号：" prop="user">
                <el-input type="text" name="username" v-model="ruleForm.user" placeholder="请输入账号" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
                <el-input type="password" name="password" v-model="ruleForm.pass" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="ruleForm.remember" name="remamberMe">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    %full{height:100%}
    html,body,#edu,.login{@extend %full}
</style>
<style lang="scss" scoped>
    .login{
        padding:1px 0;
        background-image: url(./images/bg.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        .ruleForm{
            width: 400px;
            margin:50px auto 0;
            padding:30px 20px;
            background-color: rgba(255,255,255,.8);
            border-radius: 10px;
        }
    }
</style>
<script>
    import './script/security';
    export default{
        data(){
            return {
                ruleForm: {
                    user: '',
                    pass: '',
                    remember: false,
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
        components:{},
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
            }
        },
        mounted(){
            let vm=this;
        }
    }
</script>