/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="modifyPwd">
       <div class="form-wrap">
           <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="pwdForm dark">
               <el-form-item prop="curPwd">
                   <el-input type="password" v-model="ruleForm2.curPwd" placeholder="输入当前密码" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="" prop="pass">
                   <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="输入新密码"></el-input>
               </el-form-item>
               <el-form-item prop="checkPass">
                   <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认新密码"></el-input>
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
            var checkCurPwd = (rule, value, callback) => {
                //验证当前密码是否正确
                if(value === ''){
                    callback(new Error('请输入当前密码'));
                }else{
                    callback();
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
                    curPwd: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    curPwd: [
                        { validator: checkCurPwd, trigger: 'blur' }
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

            submitForm(data){
                console.log(data)
            }
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>