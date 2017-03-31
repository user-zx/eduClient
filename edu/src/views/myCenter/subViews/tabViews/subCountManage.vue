/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="subCountManage">
        <div class="btn-wrap">
            <el-button type="primary">添加</el-button>
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
    </div>
</template>
<style lang="scss" scoped>
    .subCountManage{
        background: #21273d;
        overflow: hidden;

        .btn-wrap{
            height: 35px;
            width: 90%;
            margin:auto;
            margin-top: 35px;
            margin-bottom: 20px;
            text-align: right;
        }

        .table-wrap{
            width: 90%;
            margin: auto;
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
                ]
            }
        },
        methods: {

        },
        mounted(){

        },
        created(){

        }
    }
</script>