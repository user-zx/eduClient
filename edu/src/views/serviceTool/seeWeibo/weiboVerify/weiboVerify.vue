/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="weiboVerify" id="weiboVerify">
        <div class="form-wrap dark">
            <el-row :gutter="20" align="middle">
                <el-col :span="4" class="text-right">微博昵称</el-col>
                <el-col :span="6">
                    <el-input></el-input>
                </el-col>
                <el-col :span="4" class="text-right uploadLabel">添加微博头像</el-col>
                <el-col :span="6">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            class="avatar-uploader"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">学校</el-col>
                <el-col :span="6">
                    <el-input></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">所在地</el-col>
                <el-col :span="6">
                    <el-input></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">所属院系</el-col>
                <el-col :span="6">
                    <el-input></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">简介</el-col>
                <el-col :span="6">
                    <el-input type="textarea" :rows="8"></el-input>
                </el-col>
            </el-row>
            <div class="line"></div>
            <el-row :gutter="20">
                <el-col :span="4" class="text-right">负责人</el-col>
                <el-col :span="6">
                    <el-input></el-input>
                </el-col>
                <el-col class="text-right" :span="4" :offset="1">
                    发布人
                </el-col>
                <el-col :span="6">
                    <el-input></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col class="text-right" :span="4">负责人邮箱</el-col>
                <el-col :span="6"><el-input></el-input></el-col>
                <el-col class="text-right" :span="4" :offset="1">发布人邮箱</el-col>
                <el-col :span="6"><el-input></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col class="text-right" :span="4">负责人电话</el-col>
                <el-col :span="6"><el-input></el-input></el-col>
                <el-col class="text-right" :span="4" :offset="1">发布人电话</el-col>
                <el-col :span="6"><el-input></el-input></el-col>
            </el-row>
            <el-row>
                <el-col class="text-center" :offset="9" :span="6">
                    <el-button type="primary">确认并提交</el-button>
                    <el-button type="primary">清空</el-button>
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
        border: 1px dashed #d9d9d9;
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
            }
        },
        components:{} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"业务平台",to:{path:"/home/seeWebo"}
                    },
                    {
                        name:"微博监测",to:{path:"home/seeWebo"}
                    },
                    {
                        name: '微博认证'
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            handleAvatarSuccess(res, file){
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file){
                console.log(file.type)
            }
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){

        }
    }
</script>