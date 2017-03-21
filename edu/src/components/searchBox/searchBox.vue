/**
* Created by lifei on 2017/3/21.
*/
<template>
    <div class="search-box" id="search-box">
        <el-row>
            <el-col :span="2">
                选择高校：
            </el-col>
            <el-col :span="18">
                <span class="search-list">全部</span>
                <span class="search-list">北京大学</span>
                <span class="search-list">北京航空航天大学</span>
                <span class="search-list">北京大学</span>
                <span class="search-list">北京航空航天大学</span>
                <span class="search-list">北京大学</span>
                <span class="search-list">北京航空航天大学</span>
                <span class="search-list">北京大学</span>
                <span class="search-list">北京航空航天大学</span>
                <span class="search-list">北京大学</span>
                <span class="search-list">北京航空航天大学</span>
                <span class="search-list">北京大学</span>
                <span class="search-list">北京航空航天大学</span>
                <span class="search-list">北京大学</span>
                <span class="search-list">北京航空航天大学</span>
            </el-col>
            <el-col :span="2" class="paddingR10 alignRight">
                <el-button type="primary" class="default-button">添加高校</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="default-button">清空</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                高校维度：
            </el-col>
            <el-col :span="22">
                <span class="search-list">校园舆情</span>
                <span class="search-list">校园安全</span>
                <span class="search-list">违规违纪</span>
                <span class="search-list">媒体报道</span>
                <span class="search-list">人才培养</span>
                <span class="search-list">科学研究</span>
                <span class="search-list">微信微博</span>
                <span class="search-list">论坛贴吧</span>
                <span class="search-list">敏感时期</span>
                <span class="search-list">人物聚焦</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                载体：
            </el-col>
            <el-col :span="22">
                <span class="search-list">不限</span>
                <span class="search-list">论坛</span>
                <span class="search-list">微博</span>
                <span class="search-list">微信</span>
                <span class="search-list">QQ群</span>
                <span class="search-list">博客</span>
                <span class="search-list">网站门户</span>
                <span class="search-list">贴吧</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                情感：
            </el-col>
            <el-col :span="22">
                <span class="search-list">不限</span>
                <span class="search-list">正面</span>
                <span class="search-list">负面</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                时间：
            </el-col>
            <el-col :span="22">
                <span class="search-list">不限</span>
                <span class="search-list">今天</span>
                <span class="search-list">昨天</span>
                <span class="search-list">近7天</span>
                <span class="search-list">近一个月</span>
                <span class="search-list">自定义时间</span>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .search-box{
        margin-bottom: 10px;
        color: #333;

        .el-row {
            .el-col {
                background: #fff;
                height: 50px;
                border-bottom: 1px solid #d6d6d6;
                line-height: 50px;
                color: #333;

                .search-list{
                    display: inline-block;
                    text-align: center;
                    padding-left: 15px;
                    padding-right: 15px;
                }
            }

            .el-col:first-child {
                background: #e6e6e6;
                padding-left: 20px;
            }

            @media screen and (min-width: 1260px){
                button{
                    width: 84px;
                }
            }
        }
    }
</style>
<script>


</script>