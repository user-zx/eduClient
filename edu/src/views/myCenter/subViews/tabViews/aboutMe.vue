<template>
    <div class="aboutMe">
        <div class="form-wrap">
            <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth" name="addForm" class="edu-form dark">
                <el-form-item label="主账号">
                    <el-input v-model="form.mainCount" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="子账号"  prop="userAccount">
                    <el-input v-model="form.userAccount" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="子账号密码" prop="password">
                    <el-input type="password" auto-complete="off" v-model="form.password"></el-input>
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
                <el-form-item label="设置权限" prop="permissions">
                    <el-select v-model="form.permissions" multiple placeholder="请选择权限">
                        <el-option v-for="item in limitOpts" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
            return{
                formLabelWidth: '100px',
                form: {
                    mainAcount: '',
                    userAccount: '',
                    name: '',
                    job: '',
                    phone: ''
                }
            }
        }
    }
</script>