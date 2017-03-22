<template>
    <div id="login" class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="ruleForm">
            <el-form-item label="账号：" prop="user">
                <el-input type="text" v-model="ruleForm.user" placeholder="请输入账号" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox-group v-model="ruleForm.remember">
                    <el-checkbox label="记住密码" name="remember"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    %full{height:100%}
    html,body,#edu,.login{@extend %full}
</style>
<style lang="scss" scoped>
    .login{
        padding:1px 0;
        background-image: url(./images/bg.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        .ruleForm{
            width: 400px;
            margin:50px auto 0;
            padding:30px 20px;
            background-color: rgba(255,255,255,.8);
            border-radius: 10px;
        }
    }
</style>
<script>
    import './script/security';
    export default{
        data(){
            return {
                loginUrl:"apis/admin/login.do",
                generateKeyUrl:'apis/generateKey.do',
                params:{
                    account:"",
                    password:"",
                    rememberMe:false
                },
                item:{
                    account:"",
                    password:"",
                    publicKeyExponent:"",
                    publicKeyModulus:"",
                },
                /*上面是医美的代码（已被抛弃），下面的是教育的代码*/
                ruleForm: {
                    user: '',
                    pass: '',
                    remember: '',
                },
                rules:{
                    user:[
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    pass:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        components:{},
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({message:'登录校验成功!',type:"success"});
                        this.$router.push({path:"/home/panorama"});
                    } else {
                        this.$message({message:'登录校验失败!',type:"error"});
                        return false;
                    }
                });
            },
            resetForm(formName) {
                /*重置表单*/
                this.$refs[formName].resetFields();
            },
            post(urls, params, successFun, errorFun){
                this.$http.post(urls, params).then((response) => {
                    if (response.ok) {
                        successFun(response.data);
                    } else {
                        errorFun(response);
                    }
                },(error)=>{
                    errorFun(error);
                });
            },
            /*下面是医美的代码（已被抛弃），上面的是教育的代码*/
            /*获取公钥，私钥*/
            generateKey() {
                let vm=this;
                let params='';
                if((vm.item.account!=null||vm.item.account!=""||vm.item.account!=undefined)&&(vm.item.password!=null||vm.item.password!=""||vm.item.password!=undefined)){
                    vm.post(vm.generateKeyUrl, params,function (result) {
                        vm.item.publicKeyExponent=result.data.publicKeyExponent;
                        vm.item.publicKeyModulus=result.data.publicKeyModulus;
                        let account = vm.item.account;
                        let password = vm.item.password;
                        if(account && password){
                            vm.login();
                            return false;
                        }else{
                            vm.errorText="用户名或密码不能为空!";
                            $("#errorAlert").show();
                            return false;
                        }
                    },function (error) {
                        console.log(error);
                    });
                }
            },
            /*登录的方法*/
            login() {
                let vm  = this;
                let publicKeyExponent= vm.item.publicKeyExponent;
                let publicKeyModulus= vm.item.publicKeyModulus;
                if(publicKeyExponent==""&&publicKeyModulus==""){
                    location.href='/';
                    return;
                }
                RSAUtils.setMaxDigits(200);
                let key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
                let encrypedPwd = RSAUtils.encryptedString(key,vm.item.password);
                vm.params.account=vm.item.account;
                vm.params.password=encrypedPwd;
                vm.post(vm.loginUrl, vm.params,function(result){
                    if(result.success){
                        vm.$router.push({path:"/home"});
                    }else{
                        vm.errorText=result.message;
                        $("#errorAlert").show();
                         return false;
                    }
                },function (error) {                 
                    console.log(error);
                });
            }
        },
        mounted(){
            let vm=this;
        }
    }
</script>