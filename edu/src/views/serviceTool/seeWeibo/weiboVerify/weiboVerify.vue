/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="weiboVerify" id="weiboVerify">
        <div class="form-wrap dark">
            <el-row :gutter="20" align="middle">
                <el-col :span="4" class="text-right">微博昵称</el-col>
                <el-col :span="6">
                    <el-input id="blogNickname" v-model="weiboInfo.blogNickname" :maxlength=30></el-input>
                </el-col>
                <el-col :span="4" class="text-right uploadLabel">添加微博头像</el-col>
                <el-col :span="6">
                    <div class="avatar-uploader">
                        <div class="el-upload el-upload--text" @click="uploadImg">
                            <i class="el-icon-plus avatar-uploader-icon" v-if="weiboInfo.microblogAvatar == ''"></i>
                            <img :src="weiboInfo.microblogAvatar" alt="" v-else="" class="avatar">
                            <input type="file" class="el-upload__input" id="uploadImg" @change="imgFileChange">
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">学校</el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.blogColleage" :maxlength=30></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">所在地</el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.blogAddress" :maxlength=60></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">所属院系</el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.belongDepartment" :maxlength=60></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">简介</el-col>
                <el-col :span="6">
                    <el-input type="textarea" :rows="8" :maxlength=200 v-model="weiboInfo.instruction"></el-input>
                </el-col>
            </el-row>
            <div class="line"></div>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">负责人</el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.responsibleUser" :maxlength=30></el-input>
                </el-col>
                <el-col class="text-right" :span="4" :offset="1">
                    发布人
                </el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.publishUser" :maxlength=30></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col class="text-right" :span="4">负责人邮箱</el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.responsibleEmail" :maxlength=30></el-input>
                </el-col>
                <el-col class="text-right" :span="4" :offset="1">发布人邮箱</el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.publishEmail" :maxlength=30></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col class="text-right" :span="4">负责人电话</el-col>
                <el-col :span="6">
                    <el-input v-model="weiboInfo.responsibleTel"></el-input>
                </el-col>
                <el-col class="text-right" :span="4" :offset="1">发布人电话</el-col>
                <el-col :span="6"><el-input v-model="weiboInfo.publishTel"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col class="text-center" :offset="9" :span="6">
                    <el-button type="primary" @click="submitInfo">确认并提交</el-button>
                    <el-button type="primary" @click="resetInfo">清空</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .weiboVerify{
        background: #21273d;
        overflow: hidden;

        .form-wrap{
            margin: 50px;

            .text-right{
                line-height: 36px;
            }

            .avatar-uploader .el-upload {
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #20a0ff;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 238px;
                height: 148px;
                line-height: 148px;
                text-align: center;
                background: #273451;
            }
            .avatar {
                max-width: 238px;
                max-height: 148px;
                display: block;
            }

            .el-row{
                margin-bottom: 22px;
            }

            .el-row:last-child{
                margin-top: 65px;
            }

            .line{
                width: calc(100% - 100px);
                height: 1px;
                border-top:1px solid #2d3e5f;
                border-bottom: none;
                border-left: none;
                border-right: none;
                margin: 55px auto;
            }
        }
    }
</style>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    export default{
        data(){
            return {
                imageUrl: '',
                weiboInfo: {
                    blogNickname : '',
                    blogColleage : '',
                    blogAddress: '',
                    belongDepartment: '',
                    instruction: '',
                    microblogAvatar: '',
                    responsibleUser: '',
                    responsibleEmail: '',
                    responsibleTel: '',
                    publishUser: '',
                    publishEmail: '',
                    publishTel: ''
                }
            }
        },
        components:{} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"业务平台",to:{path:"/home/seeWeibo"}
                    },
                    {
                        name:"微博监测",to:{path:"/home/seeWeibo"}
                    },
                    {
                        name: '微博认证'
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            submitInfo(){
                var info = this.verifyData();
                if(info === false){
                    return ;
                }
                this.$http.post('/apis/businessTool/saveMicroblog.json', this.weiboInfo).then(
                    (response) => {
                        if(response.data.success){
                            this.$message({message: '微博认证成功'});
                        }else{
                            this.$message.error(response.data.message);
                }
                    }
                )
            },

            verifyData(){
                let type = 'error';
                //名称校验
                if(this.weiboInfo.blogNickname == ''){
                    this.$message({
                        showClose: true,
                        message: '微博名称不能为空',
                        type: type
                    });
                    return false;
                }
                //学校校验
                if(this.weiboInfo.blogColleage == ''){
                    this.$message({
                        showClose: true,
                        message: '学校不能为空',
                        type: type
                    });
                    return false;
                }

                //所在地校验
                if(this.weiboInfo.blogAddress == ''){
                    this.$message({
                        showClose:　true,
                        message: '所在地不能为空',
                        type: type
                    });
                    return false;
                }

                //院系校验
                if(this.weiboInfo.belongDepartment == ''){
                    this.$message({
                        showClose: true,
                        message: '所属院系不能为空',
                        type: type
                    });
                    return false;
                }

                //头像校验
                if(this.weiboInfo.microblogAvatar == ''){
                    this.$message({
                        showClose: '',
                        message: '微博头像不能为空',
                        type:　type
                    });
                    return false;
                }

                //负责人校验
                if(this.weiboInfo.responsibleUser == ''){
                    this.$message({
                        showClose: true,
                        message: '负责人姓名不能为空',
                        type: type
                    });
                    return false;
                }

                //负责人邮箱校验
                let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                let responsibleEmail = this.weiboInfo.responsibleEmail;
                if(responsibleEmail == ''){
                    this.$message({
                        showClose: true,
                        message: '负责人邮箱不能为空',
                        type: type
                    });
                    return false;
                }else if(!reg.test(responsibleEmail)){
                    this.$message({
                        showClose: true,
                        message: '负责人邮箱格式不正确',
                        type: type
                    });
                    return false;
                }

                //负责人电话校验
                let phoneReg =  /^1(3|4|5|7|8)\d{9}$/;
                let responsibleTel = this.weiboInfo.responsibleTel;
                if(responsibleTel == ''){
                    this.$message({
                        showClose: true,
                        message: '负责人电话不能为空',
                        type: type
                    });
                    return false;
                }else if(!phoneReg.test(responsibleTel)){
                    this.$message({
                        showClose: true,
                        message: '负责人电话格式不正确',
                        type: type
                    });
                    return false;
                }

                //发布人校验
                if(this.weiboInfo.publishUser == ''){
                    this.$message({
                        showClose: true,
                        message: '发布人姓名不能为空',
                        type: type
                    });
                    return false;
                }

                //发布人邮箱校验
                let publishEmail = this.weiboInfo.publishEmail;
                if(publishEmail == ''){
                    this.$message({
                        showClose: true,
                        message: '发布人邮箱不能为空',
                        type: type
                    });
                    return false;
                }else if(!reg.test(publishEmail)){
                    this.$message({
                        showClose: true,
                        message: '发布人邮箱格式不正确',
                        type: type
                    });
                    return false;
                }

                //发布人电话校验
                let publishTel = this.weiboInfo.publishTel;
                if(publishTel == ''){
                    this.$message({
                        showClose: true,
                        message: '发布人电话不能为空',
                        type: type
                    });
                    return false;
                }else if(!phoneReg.test(publishTel)){
                    this.$message({
                        showClose: true,
                        message: '发布人电话格式不正确',
                        type: type
                    });
                    return false;
                }

                return true;
            },

            uploadImg(){
               $('#uploadImg').click();
            },

            imgFileChange(e){
                let vm = this;

                let fileEle = document.getElementById('uploadImg');
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
                    this.$message.error('上传图片大小不能超过1MB!');
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
                let canvas = document.createElement('canvas');
                let dataUrl = this.$compressImg(canvas, img, 200, 200, 0.5);
                this.weiboInfo.microblogAvatar = dataUrl;
            },

            resetInfo(){
                this.weiboInfo = {
                    blogNickname : '',
                    blogColleage : '',
                    blogAddress: '',
                    belongDepartment: '',
                    instruction: '',
                    microblogAvatar: '',
                    responsibleUser: '',
                    responsibleEmail: '',
                    responsibleTel: '',
                    publishUser: '',
                    publishEmail: '',
                    publishTel: ''
                };
            },

            getBlogInfoData(){
                let param = {
                    author: this.$route.query.author
                }

                this.$http.post('/apis/businessTool/getMicroblogInfo.json', param).then(
                    (response) => {
                        if(response.data.success){
                            this.weiboInfo = response.data.data;
                        }
                    }
                )
            },
        },
        created(){
            this.setBreadCrumb();
            let data = this.$route.query;
            this.weiboInfo.blogNickname = data.author;
            this.weiboInfo.blogColleage = data.university;
        },
        mounted(){
            this.getBlogInfoData();
        },
    }
</script>