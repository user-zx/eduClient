/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="operateLog">
        <div class="table-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" >
                <el-table-column label="序号" prop="number" align="center"></el-table-column>
                <el-table-column label="时间" prop="datetime" align="center"></el-table-column>
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
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>