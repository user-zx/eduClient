/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="report">
        <bread-crumb></bread-crumb>
        <div class="content-wrap">
            <div class="btn-container">
                <el-button type="primary" icon="plus" @click="createReport">生成报告</el-button>
            </div>
            <el-table :data="tableData" class="tran-table no-col-title" border style="width: 100%"
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
        </div>

        <el-dialog title="新建报告" v-model="dialogFormVisible" class="createReport-dialog">
            <el-form :model="form" ref="form" label-width="180px">
                <el-form-item label="起始时间：">
                    <el-date-picker v-model="beginDateTime" type="date" placeholder="起始时间" @change="beginDateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker v-model="endDateTime" type="date" placeholder="结束时间" @change="endDateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="您选择的报告生成区间是：">
                    <el-row type="flex" justify="left">
                        <el-col :span="4" class="text-center">
                            {{beginDateTimeStr}}
                        </el-col>
                        <el-col :span="1" class="text-center">至</el-col>
                        <el-col :span="4" class="text-center">
                            {{endDateTimeStr}}
                        </el-col>
                    </el-row>
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
     import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
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
                beginDateTimeStr: '',
                endDateTimeStr: '',
                dialogFormVisible: false,
                form: {
                    beginDateTimeInput: '',
                    endDateTimeInput: '',
                    reportNameInput: ''
                },
            }
        },
        components:{breadCrumb} ,
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
            editReport(){

            },
            viewReport(){

            },
            deleteReport(){

            },
            createReport(){
                this.dialogFormVisible = true;
            },
            saveReport(){
                console.log('save')
                this.dialogFormVisible = false;
            },
            beginDateChange(){
                this.beginDateTimeStr = new Date(this.beginDateTime).Format('yyyy-MM-dd');
            },
            endDateChange(){
                this.endDateTimeStr = new Date(this.endDateTime).Format('yyyy-MM-dd');
            }
        },
        mounted(){
            // 对Date的扩展，将 Date 转化为指定格式的String
            // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
            // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
             // 例子：
            // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
            // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>