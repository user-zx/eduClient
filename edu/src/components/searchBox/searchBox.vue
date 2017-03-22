/**
* Created by lifei on 2017/3/21.
*/
<template>
    <div class="search-box">
        <!--<el-row v-for="item in searchData">-->
        <!--<el-col :span="2">-->
        <!--{{item.firstText}}-->
        <!--</el-col>-->
        <!--<el-col :span="22" v-if="item.buttonInfo == 'N'">-->
        <!--<span class="search-list" v-for="list in item.searchText">-->
        <!--{{list.text}}-->
        <!--</span>-->
        <!--</el-col>-->
        <!--<el-col :span="18" v-else>-->
        <!--<span class="search-list" v-for="list in item.searchText">-->
        <!--{{list.text}}-->
        <!--</span>-->
        <!--</el-col>-->
        <!--<el-col :span="4" v-if="item.buttonInfo != 'N'">-->

        <!--</el-col>-->
        <!--</el-row>-->


        <el-row class="searchList-more-row">
            <el-col :span="2">
                选择高校：
            </el-col>
            <el-col :span="18">
                <ul class="school-list">
                    <li class="search-list search-selected">
                        全部
                    </li>
                    <li class="search-list">
                        北京大学
                    </li>
                    <li class="search-list">
                        北京航空航天大学
                    </li>
                    <li class="search-list">
                        北京大学
                    </li>
                    <li class="search-list">
                        北京航空航天大学
                    </li>
                    <li class="search-list">
                        北京大学
                    </li>
                    <li class="search-list">
                        北京航空航天大学
                    </li>
                    <li class="search-list">
                        北京航空航天大学
                    </li>
                    <li>
                        <i class="el-icon-arrow-down pointer" v-on:click="subSearchItem"></i>
                        <ul class="sub-list">
                            <li class="search-list">西安电子科技大学</li>
                            <li class="search-list">西安电子科技大学</li>
                            <li class="search-list">西安电子科技大学</li>
                            <li class="search-list">西安电子科技大学</li>
                            <li class="search-list">西安电子科技大学</li>
                            <li class="search-list">西安电子科技大学</li>
                            <li class="search-list">西安电子科技大学</li>
                            <li class="search-list">西安电子科技大学</li>
                        </ul>
                    </li>
                </ul>
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
                <span class="search-list search-selected">校园舆情</span>
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
                <span class="search-list search-selected">不限</span>
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
                <span class="search-list search-selected">不限</span>
                <span class="search-list">正面</span>
                <span class="search-list">负面</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                时间：
            </el-col>
            <el-col :span="22">
                <span class="search-list search-selected">不限</span>
                <span class="search-list">今天</span>
                <span class="search-list">昨天</span>
                <span class="search-list">近7天</span>
                <span class="search-list">近一个月</span>
                <span class="search-list pointer" v-on:click="setDate()">自定义时间</span>
                <span class="search-list date-span" v-show="show">
                    <el-date-picker v-model="value1" type="daterange" placeholder="选择日期范围">
                     </el-date-picker>
                </span>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .search-box {
        margin-bottom: 10px;
        color: #333;

    .el-row {

    .el-col {
        background: #fff;
        height: 50px;
        border-bottom: 1px solid #d6d6d6;
        line-height: 50px;
        color: #333;

    .search-list {
        display: inline-block;
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
        cursor: pointer;
    }

    }

    .el-col:first-child {
        background: #e6e6e6;
        padding-left: 20px;
    }

    }

    .school-list{
        position: relative;

        li{
            display: inline-block;

            .sub-list{
                display: none;
            }
        }
    }

    .el-icon-arrow-down{
        position: absolute;
        top: 16px;
        right: 30px;
    }
    
    .search-selected{
        color: #60a3ff;
    }
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: "",
                show: false,
                value1: ''
            }
        },
        components: {},
        methods: {
            add(){
                let vm = this;
                this.$nextTick(function () {

                });
            },

            setDate(){
                if (this.show == false) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            },

            subSearchItem(){
                if($('.el-icon-arrow-down').hasClass('el-icon-arrow-up')){
                    $('.el-icon-arrow-down').removeClass('el-icon-arrow-up');
                    $('.sub-list').hide();
                    $('.searchList-more-row').children().each(function (index) {
                        $(this).height(50);
                    });
                }else {
                    $('.el-icon-arrow-down').addClass('el-icon-arrow-up');
                    $('.sub-list').show();
                    var height = $('.sub-list').height();
                    $('.searchList-more-row').children().each(function (index) {
                        var thisHeight = $(this).height();
                        $(this).height(thisHeight + height)
                    });
                }
            }
        },
        mounted(){
            this.add();
        },
        props: ["searchData"],
    }
</script>