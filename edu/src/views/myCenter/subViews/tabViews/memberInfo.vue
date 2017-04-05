/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="memberInfo">
       <div class="form-wrap">
           <el-form :model="memberForm" :rules="rules" ref="memberForm" label-width="100px" class="member-form dark">
               <el-form-item label="用户名" prop="name">
                   <el-input v-model="memberForm.name" :disabled="true">{{memberForm.name}}</el-input>
               </el-form-item>
               <el-form-item label="注册时间" prop="registDate">
                   <el-input v-model="memberForm.registDate" :disabled="true">2017-01-01 12:12</el-input>
               </el-form-item>
               <el-form-item label="高校">
                   <el-input v-model="memberForm.college" :disabled="true">火星理工大学</el-input>
               </el-form-item>
               <el-form-item label="职务" prop="job">
                   <el-input v-model="memberForm.job" placeholder="请输入您的职务">挖掘机师傅</el-input>
               </el-form-item>
               <el-form-item label="手机" prop="phone">
                   <el-input v-model="memberForm.phone" placeholder="请输入手机号码">15115111511</el-input>
               </el-form-item>
               <el-form-item label="邮箱" prop="mail">
                   <el-input v-model="memberForm.mail" placeholder="请输入邮箱"></el-input>
               </el-form-item>
               <el-form-item label="所在地">
                   <el-col :span="8">
                       <el-select placeholder="请选择" id="memberInfo_province">

                       </el-select>
                   </el-col>
                   <el-col :span="8">
                       <el-select placeholder="请选择" id="memberInfo_city">

                       </el-select>
                   </el-col>
                   <el-col :span="8">
                       <el-select placeholder="请选择" id="memberInfo_areaId">

                       </el-select>
                   </el-col>
               </el-form-item>
               <el-form-item label="头像">
                   <div class="img-wrap">
                       <img src="../../../../assets/images/lufei-logo.jpg" alt="">
                   </div>
                   <div class="btn-wrap">
                       <el-button type="text">修改头像</el-button>
                   </div>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="submitForm('memberForm')" class="save-btn">保存</el-button>
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

<!--<script src="../../js/selectCity.js"></script>-->
<script>
//    import select from "../../js/selectCity"

    export default{
        data(){
            return {
                memberForm: {
                    name: '唧唧复唧唧',
                    registDate: '2017-01-01 12:12',
                    college: '火星理工大',
                    job: '',
                    phone: '',
                    mail: ''
                },
                rules: {
                    job: [{required: true, message: '请输入您的职务'}],
                    phone: [{required: true, message: '请输入您的手机号码'}]
                }
            }
        },
        methods: {
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
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>