/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="systemNotice">
        <div class="content-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" :show-header="false">
                <el-table-column label="title" prop="title" align="left">
                    <template scope="scope">
                        <!--<a href="/home/myCenter/systemDetail">-->
                        <!--{{scope.row.title}}-->
                        <!--</a>-->
                        <span class="pointer" @click="toDetail(scope.row)">
                        {{scope.row.title}}
                    </span>
                    </template>
                </el-table-column>
                <el-table-column label="date" prop="date" align="center" width="150"></el-table-column>
            </el-table>
            <div class="content-bar-pagination">
                <el-pagination class="edu-pagination"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-size="10"
                               layout="prev, next, jumper, total"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .systemNotice{
        background: #21273d;
        overflow: hidden;

        .content-wrap{
            margin: 55px 50px 134px 50px;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: '李菲',
                currentPage: 1,
                total: 100,
                tableData: [
                    {id:1, title: '系统收费通知', date: '2017-01-01'},
                    {id:2, title: '系统到期通知', date: '2017-01-01'},
                    {id:3, title: '系统续费通知', date: '2017-01-01'},
                    {id:4, title: '系统过期通知', date: '2017-01-01'},
                    {id:5, title: '系统升级通知', date: '2017-01-01'},
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
                        name:"系统通知"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            handleCurrentChange(){

            },

            toDetail(data){
                //路由跳转
                this.$router.push({path:"/home/centerSystemDetail"});
            }
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>