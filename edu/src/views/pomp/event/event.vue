/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="event" id="event" v-loading="loading" element-loading-text="加载中……">
        <bread-crumb></bread-crumb>
        <div class="table-box">
            <div class="btn-box text-right">
                <el-button type="primary" @click="dialogFormVisible = true">新建事件库</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" border class="tran-table no-col-title" :resizable="false">
                <el-table-column :min-width="180" prop="eventName" label="事件名称" header-align="center" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="today" label="事件图表" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="eventState" label="事件状态" align="center"></el-table-column>
                <el-table-column prop="week" label="事件报告" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small">生成报告</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
                        <el-button type="text" size="small" disable="disable">|</el-button>
                        <el-button type="text" @click.native.prevent="deleteRow(scope.$index, tableData)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="edu-pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="prev, next, jumper, total"
                :total="100">
        </el-pagination>
        <el-dialog title="新建事件" v-model="dialogFormVisible" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form :model="addEventForm">
                <el-form-item label="事件名称">
                    <el-input v-model="addEventForm.name" auto-complete="off" placeholder="请输入事件名称"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-model="addEventForm.startDate"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="addEventForm.endDate"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="addEventForm.keyword" auto-complete="off" placeholder="请输入事件关键字，多个用，隔开"></el-input>
                </el-form-item>
                <el-form-item label="相关人物">
                    <el-input v-model="addEventForm.people" auto-complete="off" placeholder="请输入相关预警人物关键字/名称"></el-input>
                </el-form-item>
                <el-form-item label="相关微信公众号">
                    <el-input v-model="addEventForm.weChat" auto-complete="off" placeholder="请输入相关预警微信号关键字/名称"></el-input>
                </el-form-item>
                <el-form-item label="相关微博">
                    <el-input v-model="addEventForm.weibo" auto-complete="off" placeholder="请输入相关预警微博号关键字/名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script src="./script/event.js"></script>