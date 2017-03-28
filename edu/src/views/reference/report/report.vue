/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="report">
        <div class="btn-container">
            <el-button type="primary" icon="plus" @click="createReport">生成报告</el-button>
        </div>
        <el-table :data="tableData" class="tran-table" border style="width: 100%"
                  :resizable="false">
            <el-table-column label="序号" align="center" prop="orderNum" width="70"></el-table-column>
            <el-table-column label="生成区间" prop="range" align="center"></el-table-column>
            <el-table-column label="报告名称" prop="reportName" align="center"></el-table-column>
            <el-table-column label="时间" prop="dateTime" align="center" width="200"></el-table-column>
            <el-table-column label="操作" prop="option" align="center">
                <template scope="scope">
                    <el-button @click="editReport" type="text" size="small">编辑</el-button>
                    <el-button @click="viewReport" type="text" size="small">预览</el-button>
                    <el-button @click="deleteReport" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新建报告" v-model="dialogFormVisible" class="createReport-dialog">
            <el-form :model="form" ref="form" :inline="true" label-width="180px">
                <el-form-item label="起始时间：">
                    <el-date-picker v-model="beginDateTime" type="date" placeholder="起始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker v-model="endDateTime" type="date" placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="您选择的报告生成区间是：">
                    <el-col :span="11">
                        <el-input v-model="form.beginDateTimeInput" placeholder="起始时间"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input v-model="form.endDateTimeInput" placeholder="结束时间"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="报告名称：">
                    <el-input v-model="form.reportNameInput" placeholder="请输入报告名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="saveReport">生成报告</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .report{
        .btn-container{
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: right;
        }

        .createReport-dialog{
            .line{
                text-align: center;
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
                tableData: [
                    {
                        orderNum: 1,
                        range: '2015/01/01-2017/03/27',
                        reportName: '情报内参报告名称情报内参报告名称',
                        dateTime: '2017-03-27 18:18:18'
                    },
                    {
                        orderNum: 1,
                        range: '2015/01/01-2017/03/27',
                        reportName: '情报内参报告名称情报内参报告名称',
                        dateTime: '2017-03-27 18:18:18'
                    },
                    {
                        orderNum: 1,
                        range: '2015/01/01-2017/03/27',
                        reportName: '情报内参报告名称情报内参报告名称',
                        dateTime: '2017-03-27 18:18:18'
                    },
                    {
                        orderNum: 1,
                        range: '2015/01/01-2017/03/27',
                        reportName: '情报内参报告名称情报内参报告名称',
                        dateTime: '2017-03-27 18:18:18'
                    },
                    {
                        orderNum: 1,
                        range: '2015/01/01-2017/03/27',
                        reportName: '情报内参报告名称情报内参报告名称',
                        dateTime: '2017-03-27 18:18:18'
                    }
                ],
                beginDateTime: '',
                endDateTime: '',
                dialogFormVisible: false,
                form: {
                    beginDateTimeInput: '',
                    endDateTimeInput: '',
                    reportNameInput: ''
                },
            }
        },
        components:{} ,
        methods:{
            editReport(){

            },
            viewReport(){

            },
            deleteReport(){

            },
            createReport(){
                this.dialogFormVisible = true;
            },
            aaa(){
                console.log(1)
            },
            saveReport(){
                console.log('save')
                this.dialogFormVisible = false;
            }
        },
        mounted(){
            
        }
    }
</script>