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
                        <canvas id="canvas" style="display: none;"></canvas>
                        <img :src="memberForm.userImg" alt="" id="userImg">
                    </div>
                    <div class="btn-wrap">
                        <el-button type="text" @click="triggerUpload">修改头像</el-button>
                        <input type="file" class="el-upload__input" id="uploadInput" @change="uploadFileChange" accept="image/png,image/jpg,image/jpeg">
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
                    areaCode: '',
                    userImg: '',
                },
                rules: {
                    userDepartment: [{required: true, message: '请输入您的职务',trigger: 'blur'}],
                    userPhone: [{required: true, message: '请输入您的手机号码',trigger: 'blur'}],
                    userEmail: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}]
                },
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

            getUserData(){
                this.$http.post("/apis/user/getMemberInfo.json").then((res)=>{
                    if(res.data.success){
                        this.memberForm = res.data.data;
                       console.log(res);
                        if(res.data.data.createDate != null){
                            this.memberForm.createDateFormat = new Date(res.data.data.createDate).format('yyyy-MM-dd');
                        }
                        if(this.memberForm.areaCode != null){
                            this.selectedOptions = this.memberForm.areaCode.split(',');
                        }
                        this.userImg = res.data.data.userImg;
                    }
                },(err)=>{
                    console.log(err);
                });
            },

            triggerUpload(){
                $('#uploadInput').click();
            },

            uploadFileChange(e){
                let vm = this;

                let fileEle = document.getElementById('uploadInput');
                let file = null;

                if(fileEle.files){
                    file = fileEle.files[0];
                }else {
                    let fso = new ActiveXObject("Scripting.FileSystemObject");
                    fileEle.select();
                    fileEle.blur();
                    let filePath = document.selection.createRange().text;
                    if(fso.FileExists(filePath)){
                        file = fso.GetFile(filePath);
                    }
                }

                if(!file){
                    this.$message.error('上传图片失败');
                    return false;
                }

                if(!/image\/\w+/.test(file.type)){
                    this.$message.error('请上传图片类型的文件');
                    return false;
                }
                let isLt1M = file.size / 1024 / 1024 < 1;
                if(!isLt1M){
                    this.$message.error('上传头像照片大小不能超过1MB!');
                    return isLt1M;
                }

                let _URL = window.URL || Window.webkitURL;

                let img = new Image();
                img.onload = function () {
                    vm.handleImgWidthHeight(this);
                }
                img.src = _URL.createObjectURL(file);
            },

            //按照图片宽高比例压缩
            handleImgWidthHeight(img){
                let canvas = document.getElementById('canvas');
                let dataUrl = this.$compressImg(canvas, img, 200, 200, 0.5);
                this.memberForm.userImg = dataUrl;
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