/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="weChatVerify" id="weChatVerify">
        <div class="form-wrap dark">
            <el-row :gutter="20" align="middle">
                <el-col :span="4" class="text-right">微信号名称</el-col>
                <el-col :span="6">
                    <el-input :maxlength=30 v-model="wechatInfo.wechatName"></el-input>
                </el-col>
                <el-col :span="4" class="text-right uploadLabel">添加账号标志</el-col>
                <el-col :span="6">
                    <div class="avatar-uploader">
                        <div class="el-upload el-upload--text" @click="uploadSign">
                            <i class="el-icon-plus avatar-uploader-icon" v-if="wechatInfo.accountSign == ''"></i>
                            <img :src="wechatInfo.accountSign" alt="" v-else="" class="avatar">
                            <input type="file" class="el-upload__input" @change="turnSignBaseFormat" id="accountSignInput">
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">微信号</el-col>
                <el-col :span="6">
                    <el-input :maxlength=30 v-model="wechatInfo.wechatNumber"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">账号主体</el-col>
                <el-col :span="6">
                    <el-input :maxlength=30 v-model="wechatInfo.wechatSubject"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">所属院系</el-col>
                <el-col :span="6">
                    <el-input :maxlength=60 v-model="wechatInfo.belongColleage"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">功能介绍</el-col>
                <el-col :span="6">
                    <el-input type="textarea" :rows="8" v-model="wechatInfo.instruction" :maxlength=200></el-input>
                </el-col>
                <el-col :span="4" class="text-right uploadLabel">添加二维码</el-col>
                <el-col :span="6">
                    <div class="avatar-uploader">
                        <div class="el-upload el-upload--text" @click="uploadQrCode">
                            <i class="el-icon-plus avatar-uploader-icon" v-if="wechatInfo.qrCode == ''"></i>
                            <img :src="wechatInfo.qrCode" alt="" v-else="" class="avatar">
                            <input type="file" class="el-upload__input" @change="turnQrCodeBaseFormat" id="qrCodeInput">
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="line"></div>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">负责人</el-col>
                <el-col :span="6">
                    <el-input v-model="wechatInfo.responsibleUser" :maxlength=30></el-input>
                </el-col>
                <el-col class="text-right" :span="4" :offset="1">
                    发布人
                </el-col>
                <el-col :span="6">
                    <el-input v-model="wechatInfo.publishUser" :maxlength=30></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col class="text-right" :span="4">负责人邮箱</el-col>
                <el-col :span="6">
                    <el-input v-model="wechatInfo.responsibleEmail"></el-input>
                </el-col>
                <el-col class="text-right" :span="4" :offset="1">发布人邮箱</el-col>
                <el-col :span="6">
                    <el-input v-model="wechatInfo.publishEmail"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col class="text-right" :span="4">负责人电话</el-col>
                <el-col :span="6">
                    <el-input v-model="wechatInfo.responsibleTel"></el-input>
                </el-col>
                <el-col class="text-right" :span="4" :offset="1">发布人电话</el-col>
                <el-col :span="6">
                    <el-input v-model="wechatInfo.publishTel"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="text-center" :offset="9" :span="6">
                    <el-button type="primary" @click="submitInfo">确认并提交</el-button>
                    <el-button type="primary">清空</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .weChatVerify{
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
                wechatInfo: {
                    wechatNumber: '',
                    wechatName: '',
                    wechatSubject: '',
                    belongColleage: '',
                    instruction: '',
                    accountSign: '',
                    qrCode: '',
                    responsibleUser: '',
                    responsibleEmail:'',
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
                let breadcrumb = [
                    {
                        name:"业务平台",to:{path:"/home/seeWeChat"}
                    },
                    {
                        name:"微信监测",to:{path:"home/seeWeChat"}
                    },
                    {
                        name: '微信认证'
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            uploadSign(){
                $('#accountSignInput').click();
            },
            uploadQrCode(){
                $('#qrCodeInput').click();
            },

            turnSignBaseFormat(e){
                let wechatInfo = this.wechatInfo;
                let callback = function (result) {
                    wechatInfo.accountSign = result;
                }
                this.convertImgToBase64(e.target, callback)
            },
            turnQrCodeBaseFormat(e){
                let wechatInfo = this.wechatInfo;
                let callback = function (result) {
                    wechatInfo.qrCode = result;
                }
                this.convertImgToBase64(e.target, callback)
            },

            convertImgToBase64(targetEle, callback){
                if(typeof(FileReader) == 'undefined'){
                    this.$message({
                        message: '抱歉，您的浏览器不能将图片转换成相应格式',
                        type: 'error'
                    });
                }else{
                    try {
                        let file = targetEle.files[0];
                        if(!/image\/\w+/.test(file.type)){
                            this.$message({
                                message: '请上传图片格式',
                                type: 'error'
                            });
                            return false;
                        }

                        if(file.size / 1024 / 1024 > 1){
                            this.$message({
                                message: '图片大小不能超过1M',
                                type: 'error'
                            });
                            return false;
                        }

                        let reader = new FileReader();
                        reader.onload = function () {
                            let result = this.result;
                            callback(result);
                        }
                        reader.readAsDataURL(file);
                    }catch (e){
                        this.$message({
                            message: '图片格式转换错误，请稍后再试',
                            type: 'error'
                        });
                        console.info(e)
                    }
                }
            },

            submitInfo(){
                var info = this.verifyData();
                if(info === false){
                    return ;
                }

                console.log(this.wechatInfo);

                this.$http.post('/apis/businessTool/saveWechat.json', this.wechatInfo).then(
                    (response) => {
                        console.log(response.data);
                        if(response.data.success){
                            this.$message({message: '微信认证成功'});
                        }
                    }
                )

            },

            verifyData(){
                let type = 'error';

                if(this.wechatInfo.wechatName == ''){
                    this.$message({message: '微信号名称不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.wechatNumber == ''){
                    this.$message({message: '微信号不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.wechatSubject == ''){
                    this.$message({message: '账号主体不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.belongColleage == ''){
                    this.$message({message: '所属院系不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.instruction == ''){
                    this.$message({message: '功能介绍不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.accountSign == ''){
                    this.$message({message: '账号标志不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.qrCode == ''){
                    this.$message({message: '账号二维码不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.responsibleUser == ''){
                    this.$message({message: '负责人姓名不能为空', type: type});
                    return false;
                }

                if(this.wechatInfo.publishUser == ''){
                    this.$message({message: '发布人姓名不能为空', type: type});
                    return false;
                }

                let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                let responsibleEmail = this.wechatInfo.responsibleEmail;
                if(responsibleEmail == ''){
                    this.$message({message: '负责人邮箱不能为空', type: type});
                    return false;
                }else if(!reg.test(responsibleEmail)){
                    this.$message({message: '负责人邮箱格式不正确', type: type});
                    return false;
                }

                let publishEmail = this.wechatInfo.publishEmail;
                if(publishEmail == ''){
                    this.$message({message: '发布人邮箱不能为空', type: type});
                    return false;
                }else if(!reg.test(publishEmail)){
                    this.$message({message: '发布人邮箱格式不正确', type: type});
                    return false;
                }

                //
                let phoneReg =  /^1(3|4|5|7|8)\d{9}$/;
                let  responsibleTel = this.wechatInfo.responsibleTel;
                if(responsibleTel == ''){
                    this.$message({message: '负责人电话不能为空', type: type});
                    return false;
                }else if(!phoneReg.test(responsibleTel)){
                    this.$message({message: '负责人电话格式不正确', type: type});
                    return false;
                }

                let publishTel = this.wechatInfo.publishTel;
                if(publishTel == ''){
                    this.$message({message: '发布人电话不能为空', type: type});
                    return false;
                }else if(!phoneReg.test(publishTel)){
                    this.$message({message: '发布人电话格式不正确', type: type});
                    return false;
                }
                return true;
            },
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){

        }
    }
</script>