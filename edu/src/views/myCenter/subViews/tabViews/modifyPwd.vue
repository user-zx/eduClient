/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="modifyPwd">
       <div class="form-wrap">
           <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="pwdForm dark" id="pwdForm">
               <el-form-item prop="oldPwd">
                   <el-input type="password" v-model="ruleForm2.oldPwd" placeholder="输入当前密码" auto-complete="off" name="oldPwd"></el-input>
               </el-form-item>
               <el-form-item label="" prop="pass">
                   <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="输入新密码" name="newPwd1"></el-input>
               </el-form-item>
               <el-form-item prop="checkPass">
                   <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认新密码" name="newPwd2"></el-input>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="submitForm('ruleForm2')">确认修改</el-button>
               </el-form-item>
           </el-form>
       </div>
    </div>
</template>
<style lang="scss" scoped>
    .modifyPwd{
        background: #21273d;
        overflow: hidden;

        .form-wrap{
            width: 350px;
            margin: 67px auto 134px auto;

            .el-button{
                width: 100%;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            var checkOldPwd = (rule, value, callback) => {
                //验证当前密码是否正确
                if(value === ''){
                    callback(new Error('请输入当前密码'));
                }else{
                    callback();
                }
            };
            var validNewOldPass = (rule, value, callback) =>{
                    if(value == ''){
                        callback(new Error('请输入密码'));
                    }else {
                        if(this.ruleForm2.oldPwd != '' && this.ruleForm2.oldPwd == value){
                            callback(new Error('新密码不能与旧密码相同!'));
                        }else {
                            callback();
                        }
                    }
            };

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    oldPwd: ''
                },
                rules2: {
                    pass: [
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
                        {validator: validNewOldPass, trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    oldPwd: [
                        { validator: checkOldPwd, trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"修改密码"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            submitForm(formName){
                this.$refs[formName].validate(
                    (valid) => {
                        if(valid){
                            this.$http.post('/apis/security/generateKey.do').then(
                                (response) => {
                                    if (response.data.success) {
                                        let exponent = response.data.data.publicKeyExponent;
                                        let modulus = response.data.data.publicKeyModulus;
                                        RSAUtils.setMaxDigits(200);
                                        let key = new RSAUtils.getKeyPair(exponent, "", modulus);
                                        //新密码
                                        let password =  this.ruleForm2.pass;
                                        //旧密码
                                        let oldPwd = this.ruleForm2.oldPwd;
                                        let encrypedNewPwd = RSAUtils.encryptedString(key,password);
                                        let encrypedOldPwd = RSAUtils.encryptedString(key,oldPwd);
                                        $('input[name=oldPwd]').val(encrypedOldPwd);
                                        $('input[name=newPwd1]').val(encrypedNewPwd);
                                        $('input[name=newPwd2]').val(encrypedNewPwd);
                                        this.ruleForm2.oldPwd = encrypedOldPwd;
                                        this.ruleForm2.pass = encrypedNewPwd;
                                        this.ruleForm2.checkPass = encrypedNewPwd;
                                        this.updatePwd();
                                    } else {
                                        console.error(response.data.msg);
                                        return false;
                                    }
                                }
                            )
                        }else{
                            //表单填写是否完全

                        }
                    }
                )
            },

            updatePwd(){
                let param = {
                    oldPassword: this.ruleForm2.oldPwd,
                    newPassword: this.ruleForm2.pass
                }
                this.$http.post('/apis/user/updatePassword.json', param).then(
                    (res) => {
                        if(res.data.success){
                            //console.log();
                            this.$message({
                                type: 'success',
                                message: '密码修改成功'
                            });
                            this.$refs['ruleForm2'].resetFields();
                        }else {
                            this.$message.error(res.data.message);
                            this.ruleForm2.oldPwd = "";
                            this.ruleForm2.pass = "";
                            this.ruleForm2.checkPass = "";
                            this.$refs['ruleForm2'].resetFields();
                            return false;
                        }
                    }
                )
            }
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>