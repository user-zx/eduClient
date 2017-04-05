<template>
    <div class="editCollege">
        <div class="top">
            <div class="item">
                选择您想关注的
                <span class="yellow">高校</span>
            </div>
            <div class="item">
                您购买的
                <span class="yellow">C套餐</span>，
                最多可添加
                <span class="yellow">10</span>
                所高校
            </div>
        </div>
        <div class="bottom">
            <div class="box">
                <el-row>
                    <el-col :span="2">已选：</el-col>
                    <el-col :span="22">
                        <ul>
                            <li class="selected-college list">北京大学</li>
                            <li class="selected-college list">清华大学</li>
                            <li class="selected-college list">南京大学</li>
                        </ul>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="transition">选择省份：</el-col>
                    <el-col :span="22" class="transition">
                        <ul class="province-list">
                            <li class="list">北京</li>
                            <li class="list">天津</li>
                            <li class="list">河北</li>
                            <li class="list">山西</li>
                            <li class="list">辽宁</li>
                            <li class="list">吉林</li>
                            <li class="list">上海</li>
                            <li class="list">河北</li>
                            <li class="list">山西</li>
                            <li class="list">辽宁</li>
                            <li class="list">吉林</li>
                            <li class="list">上海</li>
                            <li class="list">河北</li>
                            <li class="list">山西</li>
                            <li class="list">辽宁</li>
                            <li class="list">吉林</li>
                            <li class="list">上海</li>
                            <li class="list">上海</li>
                            <li class="list">河北</li>
                            <li class="list">山西</li>
                            <li class="list">辽宁</li>
                            <li class="list">吉林</li>
                            <li class="list">上海</li>
                            <li class="list">
                                <i class="el-icon-arrow-down pointer" v-on:click="foldProvinceClick"></i>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="transition">选择大学：</el-col>
                    <el-col :span="22" class="transition">
                        <ul>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                            <li class="list">中国海洋大学</li>
                        </ul>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="transition">&nbsp;</el-col>
                    <el-col :span="22" class="transition">
                        <el-button type="primary">保存</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .editCollege{
        background: #21273d;
        overflow: hidden;
        color: #d0d7ff;

        .top{
            margin: 50px 50px 73px 50px;
            font-size: 16px;

            .item{
                margin-bottom: 20px;
            }
        }

    .bottom{
        margin: 0 50px 250px 50px;

        .box{
            border:1px solid #3a598b;
        }

        .el-row{

            .el-col{
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #2e4064;
                overflow: hidden;

                .province-list{
                    position: relative;

                    .el-icon-arrow-down {
                        position: absolute;
                        top: 16px;
                        right: 15px;
                    }
                }

                .list{
                    display: inline-block;
                    text-align: center;
                    padding-left: 15px;
                    padding-right: 15px;
                    cursor: pointer;
                }

                .el-button{
                    margin-left: 24px;
                }
            }

            .el-col-2{
                text-align: center;
                background: #1b1f31;
            }
        }
    }

    .yellow{
        color: #e4f09e;
    }

    .list-selected {
        color: #60a3ff;
    }
    .transition{
        transition: 0.5s;
        -moz-transition: 0.5s; /* Firefox 4 */
        -webkit-transition: 0.5s; /* Safari 和 Chrome */
        -o-transition: 0.5s; /* Opera */
    }

    }
</style>
<script>
    export default{
        data(){
            return {
                tableData: [
                    {name: '王小二', college: '清华大学', department: '哲学系', keyword: '时间相对论', count:　'2929292929'},
                    {name: '王小二', college: '清华大学', department: '哲学系', keyword: '时间相对论', count:　'2929292929'},
                    {name: '王小二', college: '清华大学', department: '哲学系', keyword: '时间相对论', count:　'2929292929'},
                    {name: '王小二', college: '清华大学', department: '哲学系', keyword: '时间相对论', count:　'2929292929'},
                    {name: '王小二', college: '清华大学', department: '哲学系', keyword: '时间相对论', count:　'2929292929'},

                ]
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"高校管理"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            foldProvinceClick(){
                if ($('.province-list .el-icon-arrow-down').hasClass('el-icon-arrow-up')) {
                    $('.el-icon-arrow-down').removeClass('el-icon-arrow-up');
                    $('.province-list').closest('div.el-row').children().each(function (index) {
                        $(this).height(50);
                    });
                } else {
                    $('.province-list .el-icon-arrow-down').addClass('el-icon-arrow-up');
                    var height = $('.province-list').height();
                    $('.province-list').closest('div.el-row').children().each(function (index) {
                        $(this).height(height);
                    });
                }
            }
        },
        mounted(){

        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>