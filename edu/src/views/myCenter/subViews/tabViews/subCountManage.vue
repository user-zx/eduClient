/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="subCountManage">
        <div class="btn-wrap">
            <el-button type="primary" @click="isShow">添加</el-button>
            <el-button type="primary">删除</el-button>
        </div>
        <div class="table-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="编号" prop="number" align="center" width="100"></el-table-column>
                <el-table-column label="子账号" prop="subCount" align="center"></el-table-column>
                <el-table-column label="开通时间" prop="createdDate" align="center" :show-overflow-tooltip=true></el-table-column>
                <el-table-column label="到期时间" prop="deadline" align="center"></el-table-column>
                <el-table-column label="设置权限" prop="permission" align="center">
                    <template scope="scope">
                        <span @click="setPermission(scope.row)">
                            {{scope.row.permission}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="最后登录时间" prop="lastLogOnDate"></el-table-column>
                <el-table-column label="开关" align="center">
                    <template scope="scope">
                        <el-switch on-text="" off-text="" v-model="scope.row.switchBtn" @change="changeStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </div>

       <div>
           <el-dialog title="添加子账号" v-model="dialogFormVisible" class="dialog-center">
               <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
                   <el-form-item label="主账号">
                       <el-input v-model="form.mainCount" auto-complete="off" :disabled="true"></el-input>
                   </el-form-item>
                   <el-form-item label="子账号"  prop="childCount">
                       <el-input v-model="form.childCount">
                           <template slot="prepend">{{form.mainCount}} + </template>
                       </el-input>
                   </el-form-item> 
                   <el-form-item label="子账号密码" prop="password">
                       <el-input type="password" auto-complete="off" v-model="form.password"></el-input>
                   </el-form-item>
                   <el-form-item label="开通时间" prop="dateStart">
                       <el-date-picker type="date"  v-model="form.dateStart">
                       </el-date-picker>
                   </el-form-item>
                   <el-form-item label="到期时间" prop="dateEnd">
                       <el-date-picker type="date" v-model="form.dateEnd">
                       </el-date-picker>
                   </el-form-item>
                   <el-form-item label="姓名" prop="name">
                       <el-input v-model="form.name"></el-input>
                   </el-form-item>
                   <el-form-item label="职称" prop="job">
                       <el-input v-model="form.job"></el-input>
                   </el-form-item>
                   <el-form-item label="联系电话" prop="phone">
                       <el-input v-model="form.phone"></el-input>
                   </el-form-item>
                   <el-form-item label="权限" >
                       <el-checkbox v-model="checkAll" @change="handleCheckAll0" :indeterminate="isIndeterminate">
                           舆情管理
                       </el-checkbox>
                       <el-checkbox-group v-model="subCheckedOne" @change="handleSubCheckChange0">
                           <el-checkbox v-for="item in subCheckOptions" :label="item">{{item}}</el-checkbox>
                       </el-checkbox-group>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button type="primary" @click="saveSubCount()">确 定</el-button>
                   <el-button @click="dialogFormVisible = false">取 消</el-button>
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
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    mainCount:'HMS-19291',
                    dateStart: '',
                    dateEnd: '',
                    password:'',
                },
                formLabelWidth: "100px",
                checkAll: true,
                isIndeterminate: false,
                subCheckedOne: ['舆情预警','全景舆情','舆情监测'],
                subCheckOptions: ['舆情预警','全景舆情','舆情监测'],
                rules:{
                  childCount: [
                      { required: true, message: '请输入子账号', trigger: 'blur' },
                    ],
                  password: [
                      { validator: validatePass, trigger: 'blur' }
                    ],
                  name: [
                      { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],  
                   job: [
                      { required: true, message: '请输入职称', trigger: 'blur' },
                    ],
                  phone:[
                    { validator: testPhone, trigger: 'blur' }
                  ]  
                },
            }
        },
        methods: {
            setPermission(row){
              console.log(row);
            },
            isShow(){
              this.form.childCount = ""; 
              this.form.password = "";
              this.form.dateStart = "";
              this.form.dateEnd = "";
              this.form.name = "";
              this.form.job = "";
              this.form.phone = "";
              this.dialogFormVisible = true;
            },
            changeStatus(row){
              console.log(row.switchBtn);
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
                              params.userAccount = this.form.childCount;
                              params.createDate = this.form.dateStart;
                              params.expireDate = this.form.dateEnd;
                              params.realName = this.form.name;
                              params.userDepartment = this.form.job;
                              params.userPhone = this.form.phone;
                              this.$http.post("/apis/user/addSubAccount.json",params).then((res)=>{
                                  if(res.data.success){
                                    this.$message(res.data.data);
                                    this.dialogFormVisible = false;
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

            handleCheckAll0(event){
                this.subCheckedOne = event.target.checked ? this.subCheckOptions : [];
                this.isIndeterminate = false;
            },

            handleSubCheckChange0(value){
                let checkedNum = value.length;
                this.checkAll = checkedNum === this.subCheckOptions.length;
                this.isIndeterminate = checkedNum > 0 && checkedNum < this.subCheckOptions.length;
            },
            getChildAccount(){
              this.$http.post("/apis/user/findAllSubAccount.json").then((res)=>{
                  //console.log(res);
                  let arr = res.data.data;
                  if(res.data.success){
                    for (let i in arr) {
                       if(arr[i].accountType=='未开通'){
                          this.tableData.push({
                          id:arr[i].id,
                          number: arr[i].id,
                          subCount: arr[i].userAccount,
                          createdDate: arr[i].createDate,
                          deadline: arr[i].expireDate,
                          permission: '设置',
                          lastLogOnDate: '----',
                          switchBtn: false,
                        })
                       }else{
                        this.tableData.push({
                          id:arr[i].id,
                          number: arr[i].id,
                          subCount: arr[i].userAccount,
                          createdDate: arr[i].createDate,
                          deadline: arr[i].expireDate,
                          permission: '设置',
                          lastLogOnDate: '----',
                          switchBtn: true,
                        })
                       }
                        
                    }
                  }
              },(err)=>{
                  console.log(err);
              })
            }
        },
        mounted(){
          this.getChildAccount();
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>