/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="report" v-loading="loading" element-loading-text="加载中……">
        <div class="edu-tabs">
            <el-row :gutter="10">
                <el-col :span="4" :offset="8">
                    <div class="tab-item blue" @click="openBriefDialog()">
                        制作简报
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="tab-item blue" @click="openReferenceDialog()">
                        制作内参报告
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="content-wrap">
            <el-tabs v-model="activeName" class="custom-tabs" @tab-click="handleClick">
                <el-tab-pane label="简报" name="briefReport">
                    <div class="briefReport-list list-div">
                        <div class="item" v-for="item in briefData">
                            <div class="title">{{item.title}}</div>
                            <div class="date">
                                <span class="beginDate">{{item.startDate.substring(0, 10).split('-').join('/')}}</span>
                                &nbsp;- &nbsp;
                                <span class="endDate">{{item.endDate.substring(0, 10).split('-').join('/')}}</span>
                            </div>
                            <div class="btn-area">
                                <el-button type="primary" size="small" @click="viewBriefReport(item.id)">预览</el-button>
                                <el-button type="primary" size="small" @click="deleteBriefReport(item.id)">删除</el-button>
                                <el-button type="primary" size="small" @click="downloadReport(item.id)">下载</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="page-bar">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleBriefPageChange"
                                       :current-page="briefParam.pageNumber + 1"
                                       :page-size="briefParam.pageSize"
                                       layout="prev, next, jumper, total"
                                       :total="briefTotal">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="内参报告" name="referenceReport">
                    <div class="referenceReport-list list-div">
                        <div class="item" v-for="item in referenceData">
                            <div class="title">{{item.title}}</div>
                            <div class="date">
                                <span class="beginDate">{{item.startDate}}</span>
                                &nbsp;- &nbsp;
                                <span class="endDate">{{item.endDate}}</span>
                            </div>
                            <div class="btn-area">
                                <el-button type="primary" size="small" @click="viewBriefReport(item.id)">预览</el-button>
                                <el-button type="primary" size="small" @click="deleteBriefReport(item.id)">删除</el-button>
                                <el-button type="primary" size="small" @click="downloadReport(item.id)">下载</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="page-bar">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleRefPageChange"
                                       :current-page="referenceParam.pageNumber + 1"
                                       :page-size="referenceParam.pageSize"
                                       layout="prev, next, jumper, total"
                                       :total="referenceTotal">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog :visible.sync="briefFormVisible" @close="closeDialog('briefForm')" title="制作简报">
            <el-form :model="briefForm" ref="briefForm" class="edu-form small-form" :rules="briefRules">
                <el-form-item label="开始时间" :label-width="formLabelWidth" prop="startDate">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="briefForm.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-form-item>
                <el-form-item label="截止时间" :label-width="formLabelWidth" prop="endDate">
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="briefForm.endDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog('briefForm')">取 消</el-button>
                <el-button type="primary" @click="saveBriefReport('briefForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="refFormVisible" @close="closeDialog('refForm')" title="制作内参报告">
            <el-form :model="refForm" ref="refForm" class="edu-form refForm">
                <el-form-item label="起止时间" :label-width="formLabelWidth">
                    <el-col :span="11">
                        <el-form-item prop="startDate">
                            <el-date-picker type="date" placeholder="选择开始日期" v-model="refForm.startDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endDate">
                            <el-date-picker type="date" placeholder="选择结束时间" v-model="refForm.endDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择数据区域" :label-width="formLabelWidth">
                    <el-select v-model="refForm.areas" multiple placeholder="请选择部委省厅">
                        <el-option v-for="item in allArea" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-select multiple v-model="refForm.colleges" placeholder="请选择大学名称">
                        <el-option-group
                                v-for="group in allCollege"
                                :key="group.label"
                                :label="group.label">
                            <el-option
                                    v-for="item in group.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键字" :label-width="formLabelWidth">
                    <el-input v-model="refForm.keyWords"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .report{
        .content-wrap{
            background: #21273d;
            margin-top: 10px;

            .list-div{
                font-size: 0;
                min-height: 500px;

                .item{
                    display: inline-block;
                    width: calc((100% - 100px) / 5);
                    height: 200px;
                    border: 1px solid #eee;
                    text-align: center;
                    margin: 10px;
                    vertical-align: middle;

                    .title{
                        font-size: 18px;
                        font-weight:bold;
                        height: 90px;
                        line-height: 90px;
                    }

                    .date{
                        font-size: 14px;
                        height: 20px;
                        line-height: 20px;
                    }

                    .btn-area{
                        height: 90px;
                        line-height: 90px;
                    }
                }
            }

            .page-bar{
                margin-bottom: 20px;
            }
        }
    }

    .small-form{
        width: 400px;
        margin:auto;
    }
    
    .refForm{
        .line{
            text-align: center;
        }
    }
</style>
<script>
    import schools from "../../../../school.json";
    export default{
        data(){
            var checkDate = (rule, value, callback) =>{
                if(!value){
                    return callback(new Error('请选择结束日期'));
                }

                var startDate = this.briefForm.startDate;
                if(!startDate){
                    return callback();
                }
                if(startDate > value){
                    return callback(new Error('开始日期不能大于结束日期'));
                }
                return callback();
            };
            return {
                loading:false,
                activeName: 'briefReport',
                briefTotal: 0,
                briefParam: {
                    pageSize: 10,
                    pageNumber: 0
                },
                referenceTotal: 0,
                referenceParam: {
                    pageSize: 10,
                    pageNumber: 0
                },
                briefForm: {
                    startDate: '',
                    endDate: '',
                    title: '教育简报'
                },
                briefRules: {
                    startDate :[
                        { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                    ],
                    endDate :[
                        { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' },
                        { validator: checkDate, trigger: 'change' }
                    ],
                },
                refForm: {
                    keyWords: '',
                    startDate: '',
                    endDate: '',
                    areas: [],
                    colleges: [],
                    title: '内参报告'
                },
                formLabelWidth: '120px',
                briefFormVisible: false,
                refFormVisible: false,
                briefData: [],
                referenceData: [],
                allArea: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                allCollege: schools
            }
        },
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/"}
                    },
                    {
                        name:"内参报告"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            handleClick(tab, event){
                console.log(tab)
                console.log(event)
            },

            /**
             * 分页获取教育简报列表
             */
            getBriefReportList(){
                let url = '/apis/briefReport/getAllBriefReport.json?pageNumber=' + this.briefParam.pageNumber + '&pageSize=10';
                this.$http.get(url).then(
                    function (response) {
                        if(response.data.success){
                            this.briefData = response.data.data.list;
                            console.log(this.briefData)
                        }else {
                            console.error(response.data.message);
                        }
                    }
                )
            },

            /**
             * 分页获取舆情报告列表
             */
            getReferenceReportList(){

            },

            /**
             * 打开添加简报表单
             */
            openBriefDialog(){
                this.briefFormVisible = true;
            },

            /**
             * 打开添加舆情报告表单
             */
            openReferenceDialog(){
                this.refFormVisible = true;
            },

            handleBriefPageChange(val){
                this.briefParam.pageNumber = val - 1;
            },

            handleRefPageChange(val){
                this.referenceParam.pageNumber = val - 1;
            },

            formatCreateDate(row, col) {
                return new Date(row.createDate).format('yyyy-MM-dd');
            },

            formatRangeDate(row, col) {
                return new Date(row.startDate).format('yyyy-MM-dd') + '至' + new Date(row.endDate).format('yyyy-MM-dd');
            },

            closeDialog(formName){
                this.$refs[formName].resetFields();

                if(formName == 'briefForm'){
                    this.briefFormVisible = false;
                }else {
                    this.refFormVisible = false;
                }
            },

            viewBriefReport(id){
                console.log(id)
            },

            deleteBriefReport(id){
                this.$confirm('是否删除该报告', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/apis/briefReport/deleteBriefReport.json/' + id).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getBriefReportList();
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

            deleteRefReport(id){
                this.$confirm('是否删除该报告', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/apis/' + id).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getReferenceReportList();
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

            downloadReport(id, type){

            },

            saveBriefReport(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.briefForm.startDate = new Date(this.briefForm.startDate).format('yyyy-MM-dd 00:00:00');
                        this.briefForm.endDate = new Date(this.briefForm.endDate).format('yyyy-MM-dd 23:59:59');
                        this.$http.post('/apis/briefReport/saveOrUpdateBriefReport.json', this.briefForm).then(
                            function (response) {
                                if(response.data.success){
                                    this.briefFormVisible = false;
                                    this.getBriefReportList();
                                }
                            }
                        );
                    } else {
                        console.error('param is not valid');
                        return false;
                    }
                });
            },

            saveRefReport(){

            }
        },
        created(){
            this.setBreadCrumb();
            this.getBriefReportList();
        },
        mounted(){
            console.log(this.allProvince())
        }
    }
</script>