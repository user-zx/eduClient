/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="operateLog">
        <div class="block content-bar-pagination">
            <el-pagination class="edu-pagination"
                           @current-change="handleCurrentChange"
                           :page-size= "param.pageSize"
                           layout="prev, next, jumper, total"
                           :total="total">
            </el-pagination>
        </div>
        <div class="table-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" >
                <el-table-column label="序号" prop="rank" align="center" width="100"></el-table-column>
                <el-table-column label="时间" prop="createDate" align="center" :formatter="formatDate"></el-table-column>
                <el-table-column label="IP" prop="ip" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .operateLog{
        background: #21273d;
        overflow: hidden;

        .table-wrap{
            margin: 50px 50px 134px 50px;
            min-height: 400px;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                param: {
                    pageSize: 10,
                    pageNumber: 0
                },
                total: 0,
                tableData: [
                    {
                        id:1,
                        number: '1',
                        ip: '192.156.0.11',
                        datetime: '2017-02-02 12:12'
                    },
                    {
                        id:5,
                        number: '2',
                        ip: '192.156.0.11',
                        datetime: '2017-02-02 12:12'
                    },
                    {
                        id:2,
                        number: '3',
                        ip: '192.156.0.11',
                        datetime: '2017-02-02 12:12'
                    },
                    {
                        id:3,
                        number: '4',
                        ip: '192.156.0.11',
                        datetime: '2017-02-02 12:12'
                    },
                    {
                        id:4,
                        number: '5',
                        ip: '192.156.0.11',
                        datetime: '2017-02-02 12:12'
                    },
                ]
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"操作日志"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            getOperateLogs(){
                this.$http.post('/apis/user/getUserOperation.json', this.param).then(
                    function (response) {
                        if(response.data.success){
                            let data = response.data.data.content;
                            if(data != null && data.length > 0){
                                for(let i = 0; i <　data.length; i++){
                                    data[i].rank = (this.param.pageNumber) * this.param.pageSize +  i + 1;
                                }
                            }
                            this.tableData = data;
                            this.total = response.data.data.totalElements;
                        }
                    }
                )
            },

            handleCurrentChange(pageNumber){
                this.param.pageNumber = pageNumber - 1;
                this.getOperateLogs();
            },

            formatDate(row, col){
                return new Date(row.createDate).format('yyyy-MM-dd hh:ss:mm');
            }
        },
        mounted(){
            this.getOperateLogs();
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>