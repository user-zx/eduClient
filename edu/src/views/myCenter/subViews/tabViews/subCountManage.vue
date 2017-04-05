/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="subCountManage">
        <div class="btn-wrap">
            <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
            <el-button type="primary">删除</el-button>
        </div>
        <div class="table-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" >
                <el-table-column label="编号" prop="number" align="center" width="100"></el-table-column>
                <el-table-column label="子账号" prop="subCount" align="center"></el-table-column>
                <el-table-column label="开通时间" prop="createdDate" align="center"></el-table-column>
                <el-table-column label="到期时间" prop="deadline" align="center"></el-table-column>
                <el-table-column label="设置权限" prop="permission" align="center">
                    <template scope="scope">
                        <span @click="setPermission(row)">
                            {{scope.row.permission}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="最后登录时间" prop="lastLogOnDate"></el-table-column>
                <el-table-column label="开关" align="center">
                    <template scope="scope">
                        <el-switch on-text="" off-text="" v-model="scope.row.switchBtn"></el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </div>

       <div>
           <el-dialog title="添加子账号" v-model="dialogFormVisible" class="dialog-center">
               <el-form :model="form">
                   <el-form-item label="主账号" :label-width="formLabelWidth">
                       <el-input v-model="form.mainCount" auto-complete="off" :disabled="true"></el-input>
                   </el-form-item>
                   <el-form-item label="子账号" :label-width="formLabelWidth">
                       <el-input>
                           <template slot="prepend">{{form.mainCount}} + </template>
                       </el-input>
                   </el-form-item>
                   <el-form-item label="子账号密码" :label-width="formLabelWidth">
                       <el-input type="password" auto-complete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="开通时间" :label-width="formLabelWidth">
                       <el-date-picker type="date"  v-model="date1">
                       </el-date-picker>
                   </el-form-item>
                   <el-form-item label="到期时间" :label-width="formLabelWidth">
                       <el-date-picker type="date" v-model="date2">
                       </el-date-picker>
                   </el-form-item>
                   <el-form-item label="姓名" :label-width="formLabelWidth">
                       <el-input></el-input>
                   </el-form-item>
                   <el-form-item label="职称" :label-width="formLabelWidth">
                       <el-input></el-input>
                   </el-form-item>
                   <el-form-item label="联系电话" :label-width="formLabelWidth">
                       <el-input></el-input>
                   </el-form-item>
                   <el-form-item label="权限" :label-width="formLabelWidth">
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
    export default{
        data(){
            return {
                tableData: [
                    {
                        id:1,
                        number: '1',
                        subCount: 'NHM-101010',
                        createdDate: '2017-01-01',
                        deadline: '2018-01-01',
                        permission: '设置',
                        lastLogOnDate: '2017-02-02 12:12',
                        switchBtn: true
                    },
                    {
                        id:5,
                        number: '2',
                        subCount: 'NHM-101010',
                        createdDate: '2017-01-01',
                        deadline:'2018-01-01',
                        permission: '设置',
                        lastLogOnDate: '2017-02-02 12:12',
                        switchBtn: true
                    },
                    {
                        id:2,
                        number: '3',
                        subCount: 'NHM-101010',
                        createdDate: '2017-01-01',
                        deadline:'2018-01-01',
                        permission: '设置',
                        lastLogOnDate: '2017-02-02 12:12',
                        switchBtn: false
                    },
                    {
                        id:3,
                        number: '4',
                        subCount: 'NHM-101010',
                        createdDate: '2017-01-01',
                        deadline:'2018-01-01',
                        permission: '设置',
                        lastLogOnDate: '2017-02-02 12:12',
                        switchBtn: true
                    },
                    {
                        id:4,
                        number: '5',
                        subCount: 'NHM-101010',
                        createdDate: '2017-01-01',
                        deadline:'2018-01-01',
                        permission: '设置',
                        lastLogOnDate: '2017-02-02 12:12',
                        switchBtn: true
                    },
                ],
                dialogFormVisible: false,
                form: {
                    mainCount:　'HMS-19291',
                },
                formLabelWidth: "100px",
                date1:　'',
                date2: '',
                checkAll: true,
                isIndeterminate: false,
                subCheckedOne: ['舆情预警','全景舆情','舆情监测'],
                subCheckOptions: ['舆情预警','全景舆情','舆情监测']
            }
        },
        methods: {
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
                this.dialogFormVisible = false;

            },

            handleCheckAll0(event){
                this.subCheckedOne = event.target.checked ? this.subCheckOptions : [];
                this.isIndeterminate = false;
            },

            handleSubCheckChange0(value){
                let checkedNum = value.length;
                this.checkAll = checkedNum === this.subCheckOptions.length;
                this.isIndeterminate = checkedNum > 0 && checkedNum < this.subCheckOptions.length;
            }
        },
        mounted(){

        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>