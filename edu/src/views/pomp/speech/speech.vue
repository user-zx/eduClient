/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="speech">
        <bread-crumb></bread-crumb>
        <div class="speech-tabs">
            <el-row>
                <el-col :span="8" class="active"><div class="tab-item">日报</div></el-col>
                <el-col :span="8"><div class="tab-item">周报</div></el-col>
                <el-col :span="8"><div class="tab-item">月报</div></el-col>
            </el-row>
        </div>
        <div class=""></div>
    </div>
</template>
<style lang="scss" scoped>
    .speech-tabs{
        margin-bottom:20px;
        .el-col{
            .tab-item{
                height:125px;
                line-height: 125px;
                font-size: 24px;
                text-align: center;
                color:rgba(193,202,240,.5);
                background: #282e46;
                transition: all .25s;
                cursor: pointer;
                border-right:1px solid #313957;
                &:hover{
                    color:#60a3ff;
                 }
            }
            border-right:1px solid #1d233c;
            &:last-child{
                border-right: none;
                .tab-item{
                    border-right: none;
                }
            }
            &.active{
                .tab-item{
                    color:#60a3ff;
                }
             }
        }

    }
</style>
<script src="./script/speech.js"></script>