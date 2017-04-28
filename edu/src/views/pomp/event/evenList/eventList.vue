/**
* Created by zhangxin on 2017/3/23.
*/
<template>
    <div class="event-list" v-loading="loading" element-loading-text="加载中……">
        <div class="table-box">
            <div class="btn-box text-right">
                <el-button type="primary" @click="addEvent">新建事件库</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" border class="tran-table no-col-title" :resizable="false">
                <el-table-column :min-width="180" prop="title" label="事件名称" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="today" label="事件图表" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="watchDetails(scope.row.id)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="事件状态" align="center"></el-table-column>
                <el-table-column prop="week" label="事件报告" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small">生成报告</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="editEvent(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" disable="disable">|</el-button>
                        <el-button type="text" @click.native.prevent="deleteRow(scope.row.id)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="edu-pagination"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="param.pageNumber + 1"
                       :page-size="10"
                       layout="prev, next, jumper, total"
                       :total="total">
        </el-pagination>
        <el-dialog :title="formTitle + '事件'" v-model="dialogFormVisible">
            <el-form :model="addEventForm" :rules="rules" ref="addEventForm" label-width="150px">
                <input type="hidden" name="id" :value="addEventForm.id"/>
                <el-form-item label="事件名称" prop="title">
                    <el-input v-model="addEventForm.title" auto-complete="off" placeholder="请输入事件名称"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="startDate">
                    <el-date-picker
                            v-model="addEventForm.startDate"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                    <el-date-picker
                            v-model="addEventForm.endDate"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="关键词" prop="eventKeyword">
                    <el-input v-model="addEventForm.eventKeyword" auto-complete="off" placeholder="请输入事件关键字，多个用，隔开"></el-input>
                </el-form-item>
                <el-form-item label="相关人物">
                    <el-input v-model="addEventForm.personages" auto-complete="off" placeholder="请输入相关人物，多个用，隔开"></el-input>
                </el-form-item>
                <el-form-item label="相关微信号">
                    <el-input v-model="addEventForm.webchatNum" auto-complete="off" placeholder="请输入相关微信号，多个用，隔开"></el-input>
                </el-form-item>
                <el-form-item label="相关微博号">
                    <el-input v-model="addEventForm.weboNum" auto-complete="off" placeholder="请输入相关微博号，多个用，隔开"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit('addEventForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
     import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/pagination/pagination.scss";
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
                addEventForm: {
                    id: '',
                    title: '',
                    monitorStartDate: '',
                    monitorEndDate: '',
                    personages: '',
                    webchatNum: '',
                    weboNum: '',
                    startDate: '',
                    endDate: '',
                    eventKeyword: ''
                },
                rules:{
                    title:[
                        {required:true,message:"请输入事件名称",trigger: 'blur' },
                        {min:4,max:16,message:"长度在 4 到 16 个字符",trigger: 'blur' },
                    ],
                    startDate:[
                        {type: 'object',required:true,message:"请选择开始时间",trigger:'change'}
                    ],
                    endDate:[
                        {type: 'object',required:true,message:"请选择结束时间",trigger:'change'}
                    ],
                    eventKeyword:[
                        {required:true,message:"请输入事件关键词",trigger: 'blur' },
                    ]
                },
            }
        },
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/home/panorama"}
                    },
                    {
                        name:"事件监测"
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
                    this.$http.post('/apis/eventAnalysis/deleteWarnRule.json/' + id).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getEventList();
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
            addEvent() {
                this.formTitle = '添加';
                this.addEventForm = {
                    id: '',
                    title: '',
                    monitorStartDate: '',
                    monitorEndDate: '',
                    startDate: '',
                    endDate: '',
                    eventKeyword: ''
                };
                this.dialogFormVisible = true;
            },
            editEvent(form) {
                this.formTitle = '编辑';
                this.addEventForm = jQuery.extend({}, form);
                this.addEventForm.startDate = new Date(this.addEventForm.monitorStartDate);
                this.addEventForm.endDate = new Date(this.addEventForm.monitorEndDate);
                this.dialogFormVisible = true;
            },
            dialogSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addEventForm.monitorStartDate = this.formatDate(this.addEventForm.startDate, 'yyyy-MM-dd hh:mm:ss');
                        this.addEventForm.monitorEndDate = this.formatDate(this.addEventForm.endDate, 'yyyy-MM-dd hh:mm:ss');
                        this.$http.post('/apis/eventAnalysis/saveOrUpdateEvent.json', this.addEventForm).then((response) => {
                                if (response.data.success) {
                                    this.$message({
                                        message: this.formTitle + '成功',
                                        type: 'success'
                                    });
                                    this.dialogFormVisible = false;
                                    this.getEventList();
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
            getEventList() {
                this.loading = true;
                this.$nextTick(function() {
                    this.$http.post('/apis/eventAnalysis/getEventList.json', this.param).then(
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
            },
            /**格式化日期*/
            formatDate(date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()
                    //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
                        .substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        },
        created(){
            this.setBreadCrumb();
            this.getEventList();
        },
        mounted(){
        }
    }
</script>