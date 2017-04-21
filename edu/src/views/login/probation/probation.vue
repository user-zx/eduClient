/**
* Created by zhangxin on 2017/4/5.
*/
<template>
    <div class="right-form probation">
        <h1 class="login-title">
            <span>申请试用</span>
        </h1>
        <el-form :model="form" method="post" :rules="rules" ref="ruleForm" label-width="0" class="ruleForm dark">
            <el-form-item label="" prop="realName">
                <el-input v-model="form.realName" placeholder="请输入您的称呼"></el-input>
            </el-form-item>
            <el-form-item label="" prop="collegeName">
                <el-input v-model="form.collegeName" placeholder="请输入您所在高校全称"></el-input>
            </el-form-item>
            <el-form-item label="" prop="userDepartment">
                <el-input v-model="form.userDepartment" placeholder="请输入您的职称"></el-input>
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
                    <img src="/apis/security/captcha.do" ID="captcha" onclick="this.src = this.src + '?' + Math.random()"/>
                </el-col>
            </el-form-item>
            <el-form-item label="" prop="userEmail">
                <el-input v-model="form.userEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
           <!--  <el-form-item label="" prop="userPosition">
               <el-input v-model="form.userPosition" placeholder="请输入您的所在地"></el-input>
           </el-form-item> --> 
            <el-form-item label="" prop="position">
                 <el-col :span="24">
                   <el-cascader size="large" :options="options" v-model="position" @change="handleChange" class="edu-cascader"  placeholder="请输入您的所在地">
                   </el-cascader>
                 </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary submit" @click="submitForm('ruleForm')">提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {regionData,CodeToText} from "element-china-area-data"
    export default{
        data(){
            return {
                msg:"申请试用",
                options: regionData,
                position: [],
                form: {
                    realName: '',
                    collegeName: '',
                    userDepartment: '',
                    userPhone: '',
                    userEmail: '',
                    captcha: '',
                    area:'',
                    areaCode:'',
                },
                rules:{
                    realName:[
                        {required:true, message:"请输入称呼", trigger: 'blur' },
                        {min:2,max:10,message: "长度在 2 到 10 个字符",trigger: 'blur' },
                    ],
                    collegeName:[
                        {required:true, message:"请输入高校全称", trigger: 'blur' },
                        {min:4,max:20,message: "长度在 4 到 20 个字符",trigger: 'blur' },
                    ],
                    userDepartment:[
                        {required:true, message:"请输入职称", trigger: 'blur' },
                        {min:2,max:10,message: "长度在 2 到 10 个字符",trigger: 'blur' },
                    ],
                    userPhone:[
                        {required:true,message:"请输入手机号",trigger: 'blur' },
                        {min:11, max:11, message: "请输入正确手机号",trigger: 'blur' }
                    ],
                    userEmail:[
                        {required:true,message:"请输入邮箱",trigger: 'blur' },
                        {type: 'email', message: "请输入正确的邮箱",trigger: 'blur' }
                    ],
                  /*  position:[ 
                        {required:true, message:"请输入地区", trigger: 'blur' },
                        {min:2, max:10, message: "长度在 2 到 10 个字符", trigger: 'blur' },
                    ],*/
                    captcha:[
                        {required:true, message:"请输入验证码", trigger: 'blur' },
                        {min:4,max:4,message: "长度在 4 个字符",trigger: 'blur' },
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
                                    this.$message({
                                        message: '申请成功, 我们回尽快处理',
                                        type: 'success'
                                    });
                                    this.resetForm(formName);
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
            handleChange(val){
              let str = "";
             for (var i = 0; i < val.length; i++) {
                if(i==val.length-1){
                    str += val[i];
                }else{
                     str += val[i] + ","
                }
             }
             this.form.areaCode = str;
             this.form.area = CodeToText[this.position[0]];
            }
        },
        mounted(){
            
        }
    }
</script>