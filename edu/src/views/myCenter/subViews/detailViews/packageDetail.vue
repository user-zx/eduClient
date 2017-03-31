/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="buyPackage">
        <h3 class="title">预购套餐列表</h3>
        <div class="top">
            <el-form :model="memberForm" ref="memberForm" label-width="100px" class="member-form">
                <el-form-item label="使用期限" prop="deadline">
                    <span>{{memberForm.deadline}}</span>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="memberForm.phone">{{memberForm.phone}}</el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="memberForm.email">{{memberForm.email}}</el-input>
                </el-form-item>
            </el-form>
        </div>

        <div class="middle package-detail">
            <p class="package-title">套餐类型：<span>C套餐</span></p>
            <div class="item">
                <p class="title">舆情管理</p>
                <p class="info">全景舆情</p>
                <p class="info">舆情预警</p>
                <p class="info">舆情报告</p>
            </div>
            <div class="item">
                <p class="title">情报内参</p>
                <p class="info">两微洞察</p>
                <p class="info">媒体声誉</p>
            </div>
        </div>
        <div class="bottom">
            <p>可关注高校：<span class="blue">6</span></p>
            <p>可添加人物：<span class="blue">10</span></p>
        </div>
        <div class="btn-wrap">
            <div class="left">
                应支付金额： <span class="money">999</span>
            </div>
            <div class="right">
                <el-button type="primary" @click="submitForm('memberForm')" class="save-btn">保存</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

    .buyPackage{
        background: #21273d;
        overflow: hidden;

    .title{
        color: #60adff;
        margin-top: 46px;
        margin-bottom: 60px;
        text-align: center;
    }
    }
</style>
<script>
    export default{
        data(){
            return {
                memberForm: {
                    deadline: '一年',
                    phone: '15115151511',
                    email: 'lifei3599@126.com'
                }
            }
        },
        methods: {
            submitForm(data){
                console.log(data)
            }
        },
        mounted(){
        },
        created(){

        }
    }
</script>