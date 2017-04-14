/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="report" v-loading="loading" element-loading-text="加载中……">
        <breadCrumb></breadCrumb>
        <div class="content-wrap">
            <div class="btn-container">
                <el-button type="primary" icon="plus" @click="addReport">生成报告</el-button>
            </div>
            <el-table :data="tableData" class="tran-table no-col-title" border style="width: 100%"
                      :resizable="false">
                <el-table-column label="序号" align="center" type="index" width="70"></el-table-column>
                <el-table-column label="生成区间" prop="range" align="center" :formatter="formatRangeDate"></el-table-column>
                <el-table-column label="报告名称" prop="title" align="center"></el-table-column>
                <el-table-column label="添加时间" prop="createDate" align="center" :formatter="formatCreateDate" width="200"></el-table-column>
                <el-table-column label="操作" prop="option" align="center">
                    <template scope="scope">
                        <el-button @click="editReport(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="viewReport(scope.row)" type="text" size="small">预览</el-button>
                        <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="edu-pagination"
                       @current-change="handleCurrentChange"
                       :current-page="param.pageNumber + 1"
                       :page-size="10"
                       layout="prev, next, jumper, total"
                       :total="total">
        </el-pagination>

        <el-dialog :title="formTitle + '报告'" v-model="dialogFormVisible" class="createReport-dialog">
            <el-form :model="addReportForm" :rules="rules" ref="addReportForm" label-width="150px">
                <input type="hidden" name="id" :value="addReportForm.id"/>
                <el-form-item label="开始时间" prop="startDate">
                    <el-date-picker
                            v-model="addReportForm.startDate"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                    <el-date-picker
                            v-model="addReportForm.endDate"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="报告名称" prop="title">
                    <el-input v-model="addReportForm.title" auto-complete="off" placeholder="请输入报告名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit('addReportForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .report{

        .content-wrap{
            padding: 20px;
            background: #21273d;

            .btn-container{
                margin-bottom: 10px;
                text-align: right;
            }
        }
    }
</style>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    export default{
        data(){
            return {
                tableData: [],
                loading:true,
                total: 0,
                param: {
                    pageSize: 10,
                    pageNumber: 0,
                },
                dialogFormVisible: false,
                formTitle: '',
                addReportForm: {
                    id: '',
                    title: '',
                    startDate: '',
                    endDate: ''
                },
                rules:{
                    title:[
                        {required:true,message:"请输入报告名称",trigger: 'blur' },
                        {min:4,max:16,message:"长度在 4 到 16 个字符",trigger: 'blur' },
                    ],
                    startDate:[
                        {type: 'object',required:true,message:"请选择开始时间",trigger:'change'}
                    ],
                    endDate:[
                        {type: 'object',required:true,message:"请选择结束时间",trigger:'change'}
                    ]
                }
            }
        },
        components:{breadCrumb} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/home/panorama"}
                    },
                    {
                        name:"舆情报告"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            deleteRow(id) {
                this.$confirm('是否删除该事件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/apis/opinionReport/deleteReport.json/' + id).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getReportList();
                            } else {
                                console.error(response.data.message);
                                return false;
                            }
                        }, (response) => {
                            console.error(response);
                            return false;
                        }
                    );
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addReport() {
                this.formTitle = '添加';
                this.addReportForm = {
                    id: '',
                    title: '',
                    startDate: '',
                    endDate: ''
                };
                this.dialogFormVisible = true;
            },
            editReport(form) {
                this.formTitle = '编辑';
                this.addReportForm = jQuery.extend({}, form);
                this.addReportForm.startDate = new Date(this.addReportForm.startDate);
                this.addReportForm.endDate = new Date(this.addReportForm.endDate);
                this.dialogFormVisible = true;
            },
            formatCreateDate(row, col) {
                return new Date(row.createDate).format('yyyy-MM-dd');
            },
            formatRangeDate(row, col) {
                return new Date(row.startDate).format('yyyy-MM-dd') + '至' + new Date(row.endDate).format('yyyy-MM-dd');
            },
            viewReport(row) {
                this.$router.push({path:"/home/speechDetails", query: {
                    id: row.id,
                    title: row.title,
                    createDate: new Date(row.createDate).format('yyyy年MM月dd日'),
                }});
            },
            dialogSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addReportForm.startDate = this.addReportForm.startDate.format('yyyy-MM-dd hh:mm:ss');
                        this.addReportForm.endDate = this.addReportForm.endDate.format('yyyy-MM-dd hh:mm:ss');
                        this.$http.post('/apis/opinionReport/saveOrUpdateReport.json', this.addReportForm).then((response) => {
                                if (response.data.success) {
                                    this.$message({
                                        message: this.formTitle + '成功',
                                        type: 'success'
                                    });
                                    this.dialogFormVisible = false;
                                    this.getReportList();
                                } else {
                                    console.error(response.data.message);
                                    return false;
                                }
                            }, (response) => {
                                console.error(response);
                                return false;
                            }
                        );
                    } else {
                        this.$message({message:'校验失败!',type:"error"});
                        return false;
                    }
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getEventList();
            },
            watchDetails(id){
                this.$router.push({path:"/home/eventDetails", query: {id: id}});
            },
            getReportList() {
                this.loading = true;
                this.$nextTick(function() {
                    this.$http.post('/apis/opinionReport/getReport.json', this.param).then(
                        (response) => {
                            if (response.data.success) {
                                this.tableData = response.data.data.content;
                                // 最多允许翻1000页
                                this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            } else {
                                console.error(response.data.message);
                            }
                            this.$nextTick(function() {
                                this.loading = false;
                            });
                        }, (response) => {
                            this.loading = false;
                            console.error(response);
                        }
                    );
                });
            }
        },
        created(){
            this.setBreadCrumb();
            this.getReportList();
        },
        mounted(){
        }
    }
</script>