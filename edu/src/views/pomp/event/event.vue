/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="event" id="event">
        <bread-crumb></bread-crumb>
        <div class="table-box">
            <div class="btn-box text-right">
                <el-button type="primary">新建事件库</el-button>
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
                        <el-button type="text" size="small">编辑</el-button>
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
                :total="10">
        </el-pagination>
    </div>
</template>
<script src="./script/event.js"></script>