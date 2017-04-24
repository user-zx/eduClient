/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="memberInfo">
        <div class="form-wrap">
            <el-form :model="memberForm" :rules="rules" ref="memberForm" label-width="100px" class="member-form dark">
                <el-form-item label="用户名" prop="realName">
                    <el-input v-model="memberForm.realName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" prop="createDateFormat">
                    <el-input v-model="memberForm.createDateFormat" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="高校" prop="collegeName">
                    <el-input v-model="memberForm.collegeName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="userDepartment">
                    <el-input v-model="memberForm.userDepartment" placeholder="请输入您的职务"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="userPhone">
                    <el-input v-model="memberForm.userPhone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="memberForm.userEmail" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="所在地">
                    <el-col :span="24">
                        <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange" class="edu-cascader">

                        </el-cascader>
                    </el-col>
                </el-form-item>
                <el-form-item label="头像">
                    <div class="img-wrap">
                        <img :src="userImg" alt="" >
                        <!-- <img src="../../../../assets/images/lufei-logo.jpg" alt="" v-else> -->
                    </div>
                    <div class="btn-wrap">
                        <el-upload
                                class="upload-demo"
                                action="/"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload"
                                :on-success="handleAvatarSuccess">
                            <el-button type="text">修改头像</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" class="save-btn">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .memberInfo{
        background: #21273d;
        overflow: hidden;

        .form-wrap{
            width: 60%;
            margin: 67px auto 134px auto;

            .img-wrap{
                width: 100px;
                max-height: 100px;
                overflow: hidden;
                display: inline-block;

                img{
                    width: 100px;
                }
            }

            .btn-wrap{
                display: inline-block;
                margin-left: 10px;
                vertical-align: top;
                line-height: 100px;
            }
        }

        .save-btn{
            width: 100%;
        }
    }
</style>

<script>
    import {regionData,CodeToText} from "element-china-area-data"
    export default{
        data(){
            return {
                memberForm: {
                    realName: '',
                    createDate: '',
                    collegeName: '',
                    userDepartment: '',
                    userPhone: '',
                    userEmail: '',
                    createDateFormat: '',
                    area: '',
                    areaCode: ''
                },
                rules: {
                    userDepartment: [{required: true, message: '请输入您的职务',trigger: 'blur'}],
                    userPhone: [{required: true, message: '请输入您的手机号码',trigger: 'blur'}],
                    userEmail: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}]
                },
                userImg: '',
                options: regionData,
                selectedOptions: []
            }
        },
        methods: {
            submitForm(){

                if(this.memberForm.userPhone == "" || this.memberForm.userDepartment == ""){
                    this.$message('手机号或部门不能为空');
                }else{
                    this.$http.post("/apis/user/updateMemberInfo.json",this.memberForm).then((res)=>{
                        if(res.data.success){
                            this.$message(res.data.data);
                        }else{
                            this.$message(res.data.message);
                        }
                    },(err)=>{
                        console.log(err);
                    })
                }
            },
            handleChange(val){
                let str = "";
                for (var i = 0; i < val.length; i++) {
                    if(i == val.length-1){
                        str += val[i];
                    }else{
                        str += val[i] + ","
                    }
                }
                this.memberForm.areaCode = str;
                this.memberForm.area = CodeToText[this.selectedOptions[0]].replace("省", "").replace("市", "");
            },
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"会员资料"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            handleAvatarSuccess(res, file) {
                this.userImg = URL.createObjectURL(file.raw);
            },

            beforeAvatarUpload(file) {
                let vm = this;
                if(!/image\/\w+/.test(file.type)){
                    alert("请确保文件为图像类型");
                    return false;
                }
                let isLt1M = file.size / 1024 / 1024 < 1;
                if(!isLt1M){
                    this.$message.error('上传头像照片大小不能超过1MB!');
                    return isLt1M;
                }else{
                    var reader = new FileReader();
                    reader.onload = function(){
                        vm.userImg = this.result;
                    }
                    reader.readAsDataURL(file);
                }
            },
            getUserData(){
                this.$http.post("/apis/user/getMemberInfo.json").then((res)=>{
                    if(res.data.success){
                        this.memberForm = res.data.data;
                        if(res.data.data.createDate != null){
                            this.memberForm.createDateFormat = new Date(res.data.data.createDate).format('yyyy-MM-dd');
                        }
                        if(this.memberForm.areaCode != null){
                            this.selectedOptions = this.memberForm.areaCode.split(',');
                        }
                    }
                },(err)=>{
                    console.log(err);
                });
            }
        },
        mounted(){
            this.getUserData();
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>