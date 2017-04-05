<template>
    <div class="editCharacter">
        <div class="top">
            <div class="item">
                选择您想关注的
                <span class="yellow">人物</span>
            </div>
            <div class="item">
                您购买的
                <span class="yellow">C套餐</span>，
                最多可添加
                <span class="yellow">10</span>
                个人物
            </div>
        </div>
        <div class="bottom">
            <div class="btn-wrap">
                <el-button type="primary">添加</el-button>
                <el-button type="primary">删除</el-button>
            </div>
            <div class="table-wrap">
                <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border style="width: 100%"
                          :resizable="false">
                    <el-table-column label="姓名" prop="name" align="center"></el-table-column>
                    <el-table-column label="所在高校" prop="college" align="center"></el-table-column>
                    <el-table-column label="所在院系" prop="department" align="center"></el-table-column>
                    <el-table-column label="昵称/关键字" prop="keyword" align="center"></el-table-column>
                    <el-table-column label="社交账号" prop="count" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .editCharacter{
        background: #21273d;
        overflow: hidden;

        .top{
            margin: 50px 50px 140px 50px;
            font-size: 16px;
            color: #d0d7ff;

            .item{
                margin-bottom: 20px;
            }
        }

        .bottom{
            margin-bottom: 250px;

            .btn-wrap{
                text-align: right;
                margin-bottom: 26px;
                margin-right: 87px;
            }

            .table-wrap{
                margin-right: 50px;
                margin-left: 50px;
            }
        }

        .yellow{
            color: #e4f09e;
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
                        name:"人物管理"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
        },
        mounted(){

        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>