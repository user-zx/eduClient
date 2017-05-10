/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="systemNotice">
        <div class="content-bar-pagination">
            <el-pagination class="edu-pagination"
                           @current-change="handleCurrentChange"
                           :page-size="param.pageSize"
                           layout="prev, next, jumper, total"
                           :total="total">
            </el-pagination>
        </div>
        <div class="content-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                      :resizable="false" :show-header="false">
                <el-table-column label="noticeTitle" prop="noticeTitle" align="left">
                    <template scope="scope">
                        <span class="pointer" @click="showDetail(scope.row)">
                        {{scope.row.noticeTitle}}
                    </span>
                    </template>
                </el-table-column>
                <el-table-column label="date" prop="createDate" align="center" width="150" :formatter="formatDate"></el-table-column>

            </el-table>
        </div>

        <el-dialog  v-model="dialogVisible" size="tiny" class="notice-dialog" @close="closeDialog">
            <div class="title">
                {{notice.noticeTitle}}
            </div>
            <div class="subTitle">
                {{notice.createDateFormat}}
            </div>
            <div class="content">
                {{notice.noticeContent}}
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<style lang="scss" scoped>
    .systemNotice{
        background: #21273d;
        overflow: hidden;

        .content-wrap{
            margin: 55px 50px 134px 50px;
            min-height: 400px;
        }


        .notice-dialog{

            .title{
                font-size: 24px;
                text-align: center;
                margin-bottom: 18px;
            }

            .subTitle{
                text-align: center;
            }

            .content{
                margin: 20px auto;
                line-height:35px;
                text-indent: 2em;
            }
        }

    }
</style>
<script>
    export default{
        data(){
            return {

                total: 0,
                tableData: [],
                param: {
                    pageSize: 10,
                    pageNumber: 0
                },
                notice: {
                    noticeTitle: '',
                    noticeContent: '',
                    createDate: '',
                    createDateFormat: ''
                },
                dialogVisible: false

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
            handleCurrentChange(pageNumber){
                this.param.pageNumber = pageNumber - 1;
                this.getSysNoticeList();
            },

            showDetail(data){
                this.notice = data;
                this.notice.createDateFormat = new Date(data.createDate).format('yyyy-MM-dd');
                this.dialogVisible = true;
            },

            getSysNoticeList(){
                this.$http.post('/apis/sysNotice/getSysNoticeList.json', this.param).then(
                    function (response) {
                        if(response.data.success){
                            this.total = response.data.data.totalElements;
                            this.tableData = response.data.data.content;
                        }else {
                            console.error(response.data);
                        }
                    }
                )
            },

            formatDate(row, col){
                return new Date(row.createDate).format('yyyy-MM-dd');
            },

            closeDialog(){
                this.notice = {
                    noticeTitle: '',
                    noticeContent: '',
                    createDate: '',
                    createDateFormat: '',
                    id: ''
                }
            }
        },
        mounted(){
            this.getSysNoticeList();
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>