<template>
    <div class="right-form probation">
        <h1 class="login-title">
            <span>找回密码</span>
        </h1>
        <el-form :model="form" method="post" :rules="rules" ref="ruleForm" label-width="0" class="ruleForm dark">
            <el-form-item label="" prop="collegeName">
                <el-input v-model="form.collegeName" placeholder="请输入您所在高校全称"></el-input>
            </el-form-item>
            <el-form-item label="" prop="phoneNumber">
                <el-input v-model="form.phoneNumber" placeholder="请输入账号绑定手机号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="captcha">
                <el-col :span="11">
                    <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="2">
                    &nbsp;
                </el-col>
                <el-col :span="11" class="text-center">
                    <el-button type="primary" @click="getCaptcha()" :disabled="disabled">{{msg}}</el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="" prop="newPassword">
                <el-input v-model="form.newPassword" name="password" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import '../script/security';
    export default{
        data(){
            let userPhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    let reg = /^1(3|4|5|7|8)\d{9}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确的手机号'));
                    }
                    callback();
                }
            };
            return {
                msg:"获取验证码",
                disabled: false,
                form: {
                    collegeName: '',
                    phoneNumber: '',
                    captcha: '',
                    newPassword: '',
                },
                rules: {
                    collegeName:[
                        { required: true, message: '请输入高校全称', trigger: 'blur' },
                        { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
                    ],
                    phoneNumber:[
                        {validator: userPhone,trigger: 'blur' },
                    ],
                    captcha: [
                        { required: true, message: '验证码不能为空', trigger: 'blur'}
                    ],
                    newPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
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
                                    let vm = this;
                                    let exponent = response.data.data.publicKeyExponent;
                                    let modulus = response.data.data.publicKeyModulus;
                                    RSAUtils.setMaxDigits(200);
                                    let key = new RSAUtils.getKeyPair(exponent, "", modulus);
                                    let password =  $('input[name=password]').val();
                                    this.form.newPassword = RSAUtils.encryptedString(key,password);
                                    this.$http.post('/apis/findPassword.json', this.form).then((response) => {
                                            if (response.data.success) {
                                                this.$message({message:'修改密码成功，即将跳转到登录页面',type:"success"});
                                                setTimeout(() => {
                                                    vm.$router.push({path:"/login"})
                                                }, 2000);
                                            } else {
                                                this.$message({message:response.data.message,type:"error"});
                                                return false;
                                            }
                                        }, (response) => {
                                            console.error(response);
                                            return false;
                                        }
                                    );


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
                        this.$message({message:'校验失败!',type:"error"});
                        return false;
                    }
                });
            },
            getCaptcha() {
                let vm = this;
                if (this.form.collegeName === '') {
                    this.$message({message:'大学名称不能为空',type:"error"});
                    return;
                }
                let reg = /^1(3|4|5|7|8)\d{9}$/;
                if (this.form.phoneNumber === '') {
                    this.$message({message:'手机号不能为空',type:"error"});
                    return;
                }
                if (!reg.test(this.form.phoneNumber)) {
                    this.$message({message:'请输入正确的手机号',type:"error"});
                    return;
                }

                this.$http.post('/apis/getPhoneCaptcha.json', {collegeName: this.form.collegeName, phoneNumber: this.form.phoneNumber}).then((response) => {
                        if (response.data.success) {
                            this.disabled = true;
                            let num = 60;
                            this.msg = '重新发送(' + num + ')';
                            let cleanId = setInterval(() => {
                                num --;
                                vm.msg = '重新发送(' + num + ')';
                            }, 1000);
                            setTimeout(() => {
                                clearInterval(cleanId);
                                this.msg = '重新发送';
                                this.disabled = false;
                            }, 60 * 1000);
                        } else {
                            this.$message({message:response.data.message,type:"error"});
                            return false;
                        }
                    }, (response) => {
                        console.error(response);
                        return false;
                    }
                );
            }
        },
        mounted(){

        }
    }
</script>