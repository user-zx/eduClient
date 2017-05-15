<template>
    <div class="aboutMe">
        <div class="form-wrap">
            <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth" name="addForm" class="edu-form dark">
                <el-form-item label="主账号">
                    <el-input v-model="form.primaryAccount" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="子账号"  prop="userAccount">
                    <el-input v-model="form.userAccount" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="userDepartment">
                    <el-input v-model="form.userDepartment"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="userPhone">
                    <el-input v-model="form.userPhone"></el-input>
                </el-form-item>
                <el-form-item class="text-center">
                    <el-button type="primary" @click="updateUserInfo('form')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .aboutMe{
        background: #21273d;
        padding: 20px;
        overflow: hidden;

        .form-wrap{
            width: 60%;
            margin: auto;
        }
    }
</style>
<script>
    export default{
        data(){
            var validPhone = (rule, value, callback) => {
                if(value == ''){
                    return callback(new Error('请输入手机号码'));
                }
                let phoneReg =  /^1(3|4|5|7|8)\d{9}$/;
                if(!phoneReg.test(value)){
                    return callback(new Error('手机号码格式不正确'));
                }
                callback();
            };
            return{
                formLabelWidth: '100px',
                form: {
                    primaryAccount: '',
                    userAccount: '',
                    realName: '',
                    userDepartment: '',
                    userPhone: ''
                },
                rules: {
                    realName: [
                        {required: true, message: '请输入您的姓名', trigger: 'blur'}
                    ],
                    userDepartment: [
                        {required: true, message: '请输入您的部门',trigger: 'blur'}
                    ],
                    userPhone: [
                        {required: true, message: '请输入您的手机号码',trigger: 'blur'},
                        {validator: validPhone, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            getUserData(){
                this.$http.post("/apis/user/getMemberInfo.json").then((res)=>{
                    if(res.data.success){
                        this.form = res.data.data;
                    }else{
                        this.$message.error('获取用户信息出错');
                    }
                },(err)=>{
                    console.log(err);
                });
            },

            updateUserInfo(formName){
                this.$refs[formName].validate(
                    (valid) => {
                        if(valid){
                            this.$http.post("/apis/user/updateMemberInfo.json",this.form).then((res)=>{
                                if(res.data.success){
                                    this.$message(res.data.data);
                                }else{
                                    this.$message.error(res.data.message);
                                }
                            },(err)=>{
                                console.log(err);
                            });
                        }else{
                            return false;
                        }
                    }
                )
            }
        },
        mounted(){
            this.getUserData();
        }
    }
</script>