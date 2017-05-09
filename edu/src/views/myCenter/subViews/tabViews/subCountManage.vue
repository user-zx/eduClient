/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="subCountManage">
        <div class="btn-wrap">
            <el-button type="primary" @click="isShow">添加</el-button>
            <el-button type="primary" @click="deleteAccounts">删除</el-button>
        </div>
        <div class="table-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="编号" prop="id" align="center" width="100"></el-table-column>
                <el-table-column label="子账号" prop="userAccount" align="center"></el-table-column>
                <el-table-column label="开通时间" prop="createDate" align="center" :formatter="formatCreateDate"></el-table-column>
                <el-table-column label="到期时间" prop="expireDate" align="center" :formatter="formatExpireDate"></el-table-column>
                <el-table-column label="设置权限" prop="permission" align="center">
                    <template scope="scope">
                        <span @click="setPermission(scope.row)" class="pointer">
                            设置
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="最后登录时间">--</el-table-column>
                <el-table-column label="开关" align="center">
                    <template scope="scope">
                        <el-switch v-model="scope.row.switchStatus" @change="changeStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </div>

       <div>
           <el-dialog title="添加子账号" v-model="dialogFormVisible" class="dialog-center" @close="closeDialog('form')">
               <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth" name="addForm" class="edu-form">
                   <el-form-item label="主账号">
                       <el-input v-model="form.mainCount" auto-complete="off" :disabled="true"></el-input>
                   </el-form-item>
                   <el-form-item label="子账号"  prop="userAccount">
                       <el-input v-model="form.userAccount">
                           <template slot="prepend">{{form.mainCount}} + </template>
                       </el-input>
                   </el-form-item> 
                   <el-form-item label="子账号密码" prop="password">
                       <el-input type="password" auto-complete="off" v-model="form.password"></el-input>
                   </el-form-item>
                   <el-form-item label="开通时间" prop="createDate">
                       <el-date-picker type="date"  v-model="form.createDate">
                       </el-date-picker>
                   </el-form-item>
                   <el-form-item label="到期时间" prop="expireDate">
                       <el-date-picker type="date" v-model="form.expireDate">
                       </el-date-picker>
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
               <div slot="footer" class="dialog-footer">
                   <el-button @click="dialogFormVisible = false">取 消</el-button>
                   <el-button type="primary" @click="saveSubCount()">确 定</el-button>
               </div>
           </el-dialog>
       </div>

        <div>
            <el-dialog title="权限查询设置" v-model="limitsDialogVisible" class="dialog-center" @close="closeDialog('limitForm')">
                <el-form :model="limitForm"  ref="limitForm" :label-width="formLabelWidth" name="limitForm">
                    <el-form-item label="主账号">
                        <span>{{limitForm.mainAccount}}</span>
                    </el-form-item>
                    <el-form-item label="子账号"  prop="userAccount">
                        <span>{{limitForm.userAccount}}</span>
                    </el-form-item>
                    <el-form-item label="子账号密码" prop="password">
                        <el-input type="password" auto-complete="off" v-model="limitForm.password"></el-input>
                    </el-form-item>

                    <el-form-item label="权限" >

                    </el-form-item>
                    <el-form-item label="开通时间">
                        <span>{{limitForm.createDate}}</span>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .subCountManage{
        background: #21273d;
        overflow: hidden;

        .btn-wrap{
            height: 35px;
            margin: 53px 50px 26px 50px;
            padding-right: 37px;
            text-align: right;
        }

        .table-wrap{
            margin: 0px 50px 134px 50px;
        }
        .dialog-footer{
            text-align: center;

            .el-button:first-child{
                margin-right: 100px;
            }
        }
    }
</style>
<script>
    import '../../../login/script/security';
    export default{
        data(){
            var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if(!/^[a-zA-Z]\w{5,17}$/.test(value)){
                callback(new Error('请以字母开头，长度在6-18之间，只能包含字符、数字和下划线'));
              }
               callback();
            }
          };
          var testPhone = (rule, value, callback)=>{
              if (value === '') {
              callback(new Error('手机号不能为空'));
            } else {
              if(!/^1(3|4|5|7|8)\d{9}$/.test(value)){
                callback(new Error('请输入正确手机号'));
              }
               callback();
            }
          };
          var validPermission = (rule, value, callback) => {
             if((value == '' || value.length == 0) && this.firstOpen != true){
                 callback('请选择权限')
             }
             callback();
          };
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    mainCount: this.$parent.$parent.$parent.user.userAccount,
                    userAccount: '',
                    createDate: '',
                    expireDate: '',
                    password:'',
                    realName: '',
                    userDepartment: '',
                    userPhone: '',
                    permissions: ''
                },
                formLabelWidth: "100px",
                rules:{
                    userAccount: [
                        { required: true, message: '请输入子账号', trigger: 'blur' },
                        { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    realName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],  
                    userDepartment: [
                        { required: true, message: '请输入职称', trigger: 'blur' },
                    ],
                    userPhone:[
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { validator: testPhone, trigger: 'blur' }
                    ],
                    permissions: [
                        { validator: validPermission, trigger: 'change' }
                    ]
                },
                multipleSelection: [],
                limitsDialogVisible: false,
                limitForm: {
                    mainAccount: this.$parent.$parent.$parent.user.userAccount,
                    userAccount: '',
                    password: '',
                    createDate: ''
                },
                allLimits: [
                    {value: 22, label: '全景舆情'},
                    {value: 12, label: '舆情监测'},
                    {value: 21, label: '舆情预警'},
                    {value: 13, label: '事件监测'},
                    {value: 14, label: '舆情报告'},
                    {value: 15, label: '行业动态'},
                    {value: 16, label: '人物动态'},
                    {value: 17, label: '两微洞察'},
                    {value: 18, label: '媒体声誉'},
                    {value: 19, label: '内参报告'},
                    {value: 20, label: '业务平台'}
                ],
                limitOpts: [],
                firstOpen : true,
            }
        },
        methods: {
            setPermission(row){
              console.log(row);
            },
            isShow(){
              this.dialogFormVisible = true;
            },

            changeStatus(row){
                let param = {
                    id: row.id,
                    status: row.status == 0 ? 1 : 0
                }

                this.$http.post('/apis/user/updateSubAcountStatus', param).then(
                    function (response) {
                        if(response.data.success){
                            row.status = param.status;
                            row.switchStatus = param.status == 1 ? false : true;
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }else {
                            console.error(response.data)
                        }
                    }
                )
            },
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"子账号管理"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            saveSubCount(){
                this.firstOpen = false;
                let params = {};
                 this.$refs['form'].validate((valid)=>{
                      if(valid){
                          this.$http.post("/apis/security/generateKey.do").then((res)=>{
                              if(res.data.success){
                                 let exponent = res.data.data.publicKeyExponent;
                                 let modulus = res.data.data.publicKeyModulus;
                                 RSAUtils.setMaxDigits(200);
                                 let key = new RSAUtils.getKeyPair(exponent, "", modulus);
                                 let encrypedPwd = RSAUtils.encryptedString(key,this.form.password);
                                 params.password = encrypedPwd;
                              }
                              params.userAccount = this.form.mainCount + this.form.userAccount;
                              params.createDate = this.form.createDate;
                              params.expireDate = this.form.expireDate;
                              params.realName = this.form.realName;
                              params.userDepartment = this.form.userDepartment;
                              params.userPhone = this.form.userPhone;
                              params.permissions = this.form.permissions;

                              this.$http.post("/apis/user/addSubAccount.json",params).then((res)=>{
                                  if(res.data.success){
                                    this.$message({
                                        type: 'success',
                                        message:　res.data.data
                                    });
                                    this.dialogFormVisible = false;
                                    this.getChildAccount();
                                  }else{
                                     this.$message(res.data.message);
                                  }
                                },(err)=>{
                                  console.log(err);
                                })  
                          },(err)=>{
                            console.log(err);
                          })
                      }
                 })
                //this.dialogFormVisible = false;
            },

            getChildAccount(){
              this.$http.post("/apis/user/findAllSubAccount.json").then((res)=>{
                  if(res.data.success){
                      this.tableData = res.data.data;
                      for(var i in this.tableData){
                          if(this.tableData[i].status == 0){
                              this.tableData[i].switchStatus = true;
                          }else{
                              this.tableData[i].switchStatus = false;
                          }
                      }
                  }
              },(err)=>{
                  console.log(err);
              })
            },

            closeDialog(formName){
                //关闭添加窗口后 清空表单信息
                this.$refs[formName].resetFields();
                this.firstOpen = false;
            },

            formatCreateDate(row, col){
                return new Date(row.createDate).format('yyyy-MM-dd');
            },

            formatExpireDate(row, col){
                if(row.expireDate != null){
                    return new Date(row.expireDate).format('yyyy-MM-dd');
                }

                return '';
            },

            handleSelectionChange(val){
                this.multipleSelection = val;
            },

            deleteAccounts(){

                if(this.multipleSelection.length == 0){
                    this.$message('未选择子账号');
                    return ;
                }

                this.$confirm('是否删除选择的子账号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/apis/user/deleteSubAccounts', this.multipleSelection).then(
                        function (response) {
                            if(response.data.success){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.getChildAccount();
                            }else {
                                this.$message.error('删除失败，请稍后再试');
                                console.error(response.data);
                            }
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            getMainAccountLimits() {
                this.$http.post('/apis/userMgrt/getUserPermission.json', {type: 'user'}).then(
                    function (response) {
                        if (response.data.success) {
                            let permissions = response.data.data.permissions;
                            if(permissions != null){
                                for(let i = 0; i < permissions.length; i++){
                                    for(let j = 0; j < this.allLimits.length; j++){
                                        if(this.allLimits[j].value == permissions[i]){
                                            this.limitOpts.push({label: this.allLimits[j].label, value: permissions[i]})
                                        }
                                    }
                                }
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }
                )
            },

        },
        mounted(){
          this.getChildAccount();
        },
        created(){
            this.setBreadCrumb();
            this.getMainAccountLimits();
        }
    }
</script>