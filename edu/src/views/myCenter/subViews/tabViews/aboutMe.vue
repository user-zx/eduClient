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
                <el-form-item label="职称" prop="userDepartment">
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
                if (value === '') {
                    callback(new Error('联系电话不能为空'));
                } else {
                    let cellPhone = /^1(3|4|5|7|8)\d{9}$/, phone = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
                    if(!cellPhone.test(value) && !phone.test(value)){
                        callback(new Error('请输入正确手机号或座机号'));
                    }
                    callback();
                }
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
                        {required: true, message: '请输入您的职称',trigger: 'blur'}
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