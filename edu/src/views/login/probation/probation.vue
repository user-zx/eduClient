/**
* Created by zhangxin on 2017/4/5.
*/
<template>
    <div class="right-form probation">
        <h1 class="login-title">
            <span>申请试用</span>
        </h1>
        <el-form :model="form" method="post" :rules="rules" ref="ruleForm" label-width="0" class="ruleForm dark">
            <el-form-item label="" prop="userAccount">
                <el-input v-model="form.userAccount" placeholder="请输入账号, 3-20位英文数字组合"></el-input>
            </el-form-item>
            <el-form-item label="" prop="userPhone">
                <el-input v-model="form.userPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="captcha">
                <el-col :span="11">
                    <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="2">
                </el-col>
                <el-col :span="11" class="text-center">
                    <el-button type="primary" @click="getCaptcha()" :disabled="disabled">{{msg}}</el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="" prop="userEmail">
                <el-input v-model="form.userEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="" prop="collegeName">

                <el-select filterable v-model="form.collegeName" placeholder="请选择大学名称">
                    <el-option-group
                            v-for="group in options"
                            :key="group.label"
                            :label="group.label">
                        <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary submit" @click="submitForm('ruleForm')">提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    .el-select {
        width: 100%;
    }
    .el-icon-close {
        display: none !important;
    }
</style>
<script>
    import {regionData,CodeToText} from "element-china-area-data";
    import schools from "../../../school.json";
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
            let userAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    let reg = /^[a-zA-Z\d]{3,20}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入3-20位英文数字组合'));
                    }
                    callback();
                }
            };
            return {
                msg:"获取验证码",
                disabled: false,
                options: schools,
                form: {
                    userAccount: '',
                    collegeName: '',
                    userPhone: '',
                    userEmail: '',
                    captcha: '',
                    type: 'register',
                },
                rules:{
                    userAccount: [
                        {required:true, message:"请输入账号", trigger: 'blur' },
                        {validator: userAccount,trigger: 'blur' },
                    ],
                    collegeName:[
                        {required:true, message:"请输入高校全称", trigger: 'change' },
                    ],
                    userPhone:[
                        {required:true, message:"请输入手机号", trigger: 'blur' },
                        {validator: userPhone,trigger: 'blur' },
                    ],
                    userEmail:[
                        {required:true,message:"请输入邮箱",trigger: 'blur' },
                        {type: 'email', message: "请输入正确的邮箱",trigger: 'blur' }
                    ],
                    captcha:[
                        {required:true, message:"请输入验证码", trigger: 'blur' },
                        {min:6,max:6,message: "长度在 6 个字符",trigger: 'blur' },
                    ]
                }
            }
        },
        components:{} ,
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/apis/addTrial.json', this.form).then((response) => {
                            if (response.data.success) {
                                this.resetForm(formName);
                                this.$alert('提交成功，审核通过后您将收到短信通知', {
                                    confirmButtonText: '确定',
                                    type: 'success',
                                    callback: action => {
                                        this.$router.push({path:"/login"});
                                    }
                                });
                            } else {
                                this.$message({
                                    message: response.data.message,
                                    type: 'error'
                                });
                                $('#captcha').attr('src', $('#captcha').attr('src') + '?' + Math.random());
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
            resetForm(formName) {
                /*重置表单*/
                this.$refs[formName].resetFields();
            },
            getCaptcha() {
                let vm = this;
                let reg = /^1(3|4|5|7|8)\d{9}$/;
                if (this.form.userPhone === '') {
                    this.$message({message:'手机号不能为空',type:"error"});
                    return;
                }
                if (!reg.test(this.form.userPhone)) {
                    this.$message({message:'请输入正确的手机号',type:"error"});
                    return;
                }
                this.disabled = true;
                this.$http.post('/apis/getPhoneCaptcha.json', {phoneNumber: this.form.userPhone, type: 'register'}).then((response) => {
                        if (response.data.success) {
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
                            this.disabled = false;
                            return false;
                        }
                    }, (response) => {
                        console.error(response);
                        return false;
                    }
                );
            }
        }
    }
</script>