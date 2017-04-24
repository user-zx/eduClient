/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="memberInfo">
       <div class="form-wrap">
           <el-form :model="memberForm" :rules="rules" ref="memberForm" label-width="100px" class="member-form dark">
               <el-form-item label="用户名" prop="name">
                   <el-input v-model="memberForm.name" :disabled="true"></el-input>
               </el-form-item>
               <el-form-item label="注册时间" prop="registDate">
                   <el-input v-model="memberForm.registDate" :disabled="true"></el-input>
               </el-form-item>
               <el-form-item label="高校">
                   <el-input v-model="memberForm.college" :disabled="true"></el-input>
               </el-form-item>
               <el-form-item label="部门" prop="job">
                   <el-input v-model="memberForm.job" placeholder="请输入您的职务"></el-input>
               </el-form-item>
               <el-form-item label="手机" prop="phone">
                   <el-input v-model="memberForm.phone" placeholder="请输入手机号码"></el-input>
               </el-form-item>
               <el-form-item label="邮箱" prop="email">
                   <el-input v-model="memberForm.email" placeholder="请输入邮箱"></el-input>
               </el-form-item>
               <el-form-item label="所在地">
                   <el-col :span="24">
                       <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange" class="edu-cascader">

                       </el-cascader>
                   </el-col>
               </el-form-item>
               <el-form-item label="头像">
                   <div class="img-wrap">
                       <img :src="imageUrl" alt="" >
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
                    name: '',
                    registDate: '',
                    college: '',
                    job: '',
                    phone: '',
                    email: ''
                },
                rules: {
                    job: [{required: true, message: '请输入您的职务',trigger: 'blur'}],
                    phone: [{required: true, message: '请输入您的手机号码',trigger: 'blur'}],
                    email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}]
                },
                imageUrl: '',
                options: regionData,
                selectedOptions: []
            }
        },
        methods: {
            submitForm(){
                let params = {}
                params.userDepartment = this.memberForm.job;
                params.userPhone = this.memberForm.phone;
                params.userEmail = this.memberForm.email;
                params.userPosition = "";
                params.userImg = this.imageUrl;
                if(params.userPhone==""||params.userDepartment==""){
                  this.$message('手机号或部门不能为空');
                }else{
                    this.$http.post("/apis/user/updateMemberInfo.json",params).then((res)=>{
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
              console.log(val);
              console.log(CodeToText[this.selectedOptions[0]]);
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
                console.log(res)
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(this.imageUrl);
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
                        vm.imageUrl = this.result;
                    }
                    reader.readAsDataURL(file);
                }
            },
            getUserData(){
              this.$http.post("/apis/user/getMemberInfo.json").then((res)=>{
                console.log(res);
                if(res.data.success){
                  this.memberForm.name = res.data.data.realName;
                  this.memberForm.registDate = res.data.data.createDate;
                  this.memberForm.college = res.data.data.collegeName;
                  this.memberForm.phone = res.data.data.userPhone;
                  this.memberForm.email = res.data.data.userEmail;
                  this.memberForm.job = res.data.data.userDepartment;
                  this.imageUrl = res.data.data.userImg;
                  //this.selectedOptions[0] = "北京"; 
                }
              },(err)=>{
                console.log(err);
              })
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