/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="subCountManage">
        <div class="clearfix">
            <div class="btn-wrap pull-left">
                <el-button type="primary" @click="isShow" :disabled="addAccount">添加</el-button>
                <el-button type="primary" @click="deleteAccounts">删除</el-button>
            </div>
            <div class="content-bar-pagination">
                <el-pagination class="edu-pagination"
                               @current-change="handleCurrentChange"
                               :page-size="param.pageSize"
                               layout="prev, next, jumper, total"
                               :total="total">
                </el-pagination>
            </div>
        </div>

        <div class="table-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="80" align="center"></el-table-column>
                <el-table-column label="序号" prop="rank" width="80" align="center"></el-table-column>
                <el-table-column label="子账号" prop="userAccount" align="center"></el-table-column>
                <el-table-column label="开通时间" prop="createDate" align="center" :formatter="formatCreateDate"></el-table-column>
                <el-table-column label="到期时间" prop="expireDate" align="center" :formatter="formatExpireDate"></el-table-column>
                <el-table-column label="操作" prop="permission" align="center" width="120">
                    <template scope="scope">
                        <el-button @click="setPermission(scope.row)" size="small">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="开关" align="center" width="120">
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
                       <el-input type="password" auto-complete="off" v-model="form.password" placeholder="请输入密码"></el-input>
                   </el-form-item>
                   <el-form-item label="姓名" prop="realName">
                       <el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
                   </el-form-item>
                   <el-form-item label="职称" prop="userDepartment">
                       <el-input v-model="form.userDepartment" placeholder="请输入职称"></el-input>
                   </el-form-item>
                   <el-form-item label="联系电话" prop="userPhone">
                       <el-input v-model="form.userPhone" placeholder="请输入手机号或座机号,座机号格式为: 区号-座机号"></el-input>
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
            <el-dialog title="权限设置" v-model="limitsDialogVisible" class="dialog-center" @close="closeDialog('limitForm')">
                <el-form :model="limitForm" :rules="limitRules" ref="limitForm" :label-width="formLabelWidth" name="limitForm" class="edu-form">
                    <el-form-item label="主账号">
                        <span>{{limitForm.mainAccount}}</span>
                    </el-form-item>
                    <el-form-item label="子账号"  prop="userAccount">
                        <span>{{limitForm.userAccount}}</span>
                    </el-form-item>
                    <el-form-item label="姓名" prop="realName">
                        <el-input v-model="limitForm.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="职称" prop="userDepartment">
                        <el-input v-model="limitForm.userDepartment"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="userPhone">
                        <el-input v-model="limitForm.userPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="permissions">
                        <el-select v-model="limitForm.permissions" multiple placeholder="请选择权限">
                            <el-option v-for="item in limitOpts" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开通时间">
                        <span>{{limitForm.createDate}}</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="limitsDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateSubCountLimits()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .subCountManage{
        background: #21273d;
        overflow: hidden;

        .btn-wrap{
            margin-top: 25px;
            margin-left: 20px;
        }

        .table-wrap{
            margin: 20px;
            min-height: 400px;
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
                  let cellPhone = /^1(3|4|5|7|8)\d{9}$/, phone = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
                  if(!cellPhone.test(value) && !phone.test(value)){
                    callback(new Error('请输入正确手机号或座机号'));
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
          var validLimit = (rule, value, callback) => {
              if(!value){
                  callback('请选择权限');
              }
              callback();
          };
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    mainCount: this.$parent.$parent.$parent.user.userAccount,
                    userAccount: '',
                    password:'',
                    realName: '',
                    userDepartment: '',
                    userPhone: '',
                    permissions: ''
                },
                addAccount:true,
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
                        { min: 1, max: 20, message: '长度在 1 到 20 个字之间', trigger: 'blur'}
                    ],  
                    userDepartment: [
                        { required: true, message: '请输入职称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字之间', trigger: 'blur'}
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
                    id : '',
                    mainAccount: this.$parent.$parent.$parent.user.userAccount,
                    userAccount: '',
                    createDate: '',
                    permissions: '',
                    realName: '',
                    userDepartment: '',
                    userPhone: ''
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
                param:　{
                    pageSize: 10,
                    pageNumber: 0
                },
                total: 0,
                limitRules: {
                    realName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字之间', trigger: 'blur'}
                    ],
                    userDepartment: [
                        { required: true, message: '请输入职称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字之间', trigger: 'blur'}
                    ],
                    userPhone:[
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { validator: testPhone, trigger: 'blur' }
                    ],
                    permissions: [
                        { type: 'array', required: true, message: '请选择权限', trigger: 'change'},
                        { validator: validLimit, trigger: 'change' }
                    ]
                },
            }
        },
        methods: {

            setPermission(row){
                this.limitForm.id = row.id;
                this.limitForm.userAccount = row.userAccount;
                this.limitForm.createDate = new Date(row.createDate).format('yyyy-MM-dd');
                this.limitForm.permissions = row.permissions;
                this.limitForm.realName = row.realName;
                this.limitForm.userPhone = row.userPhone;
                this.limitForm.userDepartment = row.userDepartment;
                this.limitsDialogVisible = true;
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
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getChildAccount();
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
                              params.realName = this.form.realName;
                              params.userDepartment = this.form.userDepartment;
                              params.userPhone = this.form.userPhone;
                              params.permissions = this.form.permissions;

                              this.$http.post("/apis/user/addSubAccount.json",params).then((res)=>{
                                  if(res.data.success){
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功'
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
              this.$http.post("/apis/user/findAllSubAccount.json", this.param).then((res)=>{
                  if(res.data.success){
                      let data = res.data.data.content;
                      if(data != null && data.length > 0){
                          for(let i = 0; i <　data.length; i++){
                              data[i].rank = (this.param.pageNumber) * this.param.pageSize +  i + 1;
                          }
                      }
                      this.tableData = data;
                      this.total = res.data.data.totalElements;
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
                if(formName == 'form'){
                    this.firstOpen = false;
                }
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

            handleCurrentChange(pageNumber){
                this.param.pageNumber = pageNumber - 1;
                this.getChildAccount();
            },

            updateSubCountLimits(){
                this.$refs['limitForm'].validate((valid)=>{
                    if(valid){
                        console.log(this.limitForm)
                        this.$http.post('/apis/userMgrt/updateSubAccount.json', this.limitForm).then(
                            function (response) {
                                if (response.data.success){
                                    this.$message({
                                        type: 'success',
                                        message: '更新成功'
                                    });
                                    this.limitsDialogVisible = false;
                                    this.getChildAccount();
                                }else {
                                    this.$message.error(response.data.message);
                                }
                            }
                        )
                    }
                });
            }
        },
        mounted(){
          this.getChildAccount();
          this.$http.post("/apis/user/getMemberInfo.json").then(res=>{
               if(res.data.data.accountType=="试用"){
                    this.addAccount = true;
                }else{
                    this.addAccount = false;
                }
          },err=>{
              console.log(err);
          })
        },
        created(){
            this.setBreadCrumb();
            this.getMainAccountLimits();
        }
    }
</script>