<template>
    <div class="editCharacter">
        <div class="top">
            <div class="item">
                选择您想关注的
                <span class="yellow">人物</span>
            </div>
           <!--  <div class="item">
               您购买的
               <span class="yellow">C套餐</span>，
               最多可添加
               <span class="yellow">10</span>
               个人物
           </div> -->
        </div>
        <div class="bottom">
            <div class="btn-wrap">
                <el-button type="primary" @click="addPerson">添加</el-button>
                <el-button type="primary" @click="deletePerson">删除</el-button>
            </div>
            <div class="table-wrap">
                <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                          :resizable="false" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column label="姓名" prop="name" align="center"></el-table-column>
                    <el-table-column label="所在高校" prop="collegeName" align="center"></el-table-column>
                    <el-table-column label="所在院系" prop="department" align="center"></el-table-column>
                    <el-table-column label="昵称/关键字" prop="nickname" align="center"></el-table-column>
                    <el-table-column label="社交账号" prop="socialAccount" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
          <h3 class="text-center addPersonDetails">添加人物详细信息</h3>
          <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm"> 
                 <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                 </el-form-item>
                <el-form-item label="所在高校" prop="colleges">
                    <el-input v-model="ruleForm.colleges"></el-input>
                 </el-form-item>
                 <el-form-item label="所在院系" prop="faculty">
                    <el-input v-model="ruleForm.faculty"></el-input>
                 </el-form-item>
                 <el-form-item label="昵称/关键字" prop="word">
                    <el-input v-model="ruleForm.word"></el-input>
                 </el-form-item>
                 <el-form-item label="社交账号" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                 </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPersonSure">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .editCharacter{
        background: #21273d;
        overflow: hidden;

        .top{
            margin: 50px 50px 140px 50px;
            font-size: 16px;
            color: #d0d7ff;

            .item{
                margin-bottom: 20px;
            }
        }

        .bottom{
            margin-bottom: 250px;

            .btn-wrap{
                text-align: right;
                margin-bottom: 26px;
                margin-right: 87px;
            }

            .table-wrap{
                margin-right: 50px;
                margin-left: 50px;
            }
        }

        .yellow{
            color: #e4f09e;
        }
        .addPersonDetails{
            margin-bottom: 20px; 
        }
    }
</style>
<style lang="scss">
.editCharacter{
    .el-dialog--tiny{
        width: 45%;
        padding: 20px; 
    }
}
</style>
<script>
    export default{
        data(){
            return {
                tableData: [],
                dialogVisible:false,
                ruleForm:{
                    name:"",
                    colleges:"",
                    faculty:"",
                    word:"",
                    account:"",
                },
                rules:{
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    colleges: [
                        { required: true, message: '请输入所在高校', trigger: 'blur' },
                    ],
                    faculty: [
                       { required: true, message: '请输入所在院系', trigger: 'blur' }, 
                    ],
                    word: [
                       { required: true, message: '请输入社交账号', trigger: 'blur' }, 
                    ],
                    account: [
                       { required: true, message: '请输入昵称/关键字', trigger: 'blur' }, 
                    ],
                },
                deletePersonSelection: []
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"人物管理"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            addPerson(){
                this.ruleForm.name = "";
                this.ruleForm.colleges = "";
                this.ruleForm.faculty = "";
                this.ruleForm.word = "";
                this.ruleForm.account = "";
                this.dialogVisible = true;
            },
            addPersonSure(){
                this.$refs['ruleForm'].validate((valid)=>{
                    if(valid){
                         let params = {};
                            params.name = this.ruleForm.name;
                            params.collegeName = this.ruleForm.colleges;
                            params.department = this.ruleForm.faculty;
                            params.nickname = this.ruleForm.word;
                            params.socialAccount = this.ruleForm.account;
                            this.$http.post("/apis/concernPerson/addConcernPerson.json",params).then((res)=>{
                                if(res.data.success){
                                    this.$message("添加成功");
                                    this.dialogVisible = false;
                                    this.getPerson();
                                }else{
                                    this.$message(res.data.message);
                                }
                            },(err)=>{
                                console.log(err);
                            })
                    }
                })
            },
            getPerson(){
                this.$http.post("/apis/concernPerson/concernPersonPageList.json").then((res)=>{
                    if(res.data.success){
                        this.tableData = res.data.data;
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            
            handleSelectionChange(val){
                this.deletePersonSelection = val;
            },

            deletePerson(){
                if(this.deletePersonSelection.length == 0){
                    this.$message('没有选中的人物');
                    return ;
                }

                this.$http.post('/apis/concernPerson/deleteConcernPerson', this.deletePersonSelection).then(
                    function (response) {
                        if(response.data.success){
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                        }else {
                            this.$message.error('删除失败，请稍后再试');
                        }
                        this.getPerson();
                    }
                )
            }
        },

        mounted(){
            this.getPerson();
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>