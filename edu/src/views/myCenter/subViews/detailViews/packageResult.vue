/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="packageResult">
        <div class="content">
            <div class="title">恭喜您，预定成功</div>
            <div class="text">我们将尽快与您取得联系！</div>
            <div class="btn-wrap">
                <el-button type="primary">查看订单</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .packageResult{
        background: #21273d;
        overflow: hidden;

        .content{
            margin: 52px 0px 112px 66px;
            width: 766px;
            height: 648px;
            border: 1px solid #3a598b;
            background: #282e46;
            
            .title{
                font-size: 24px;
                color: #60a3ff;
                text-align: center;
                margin-top: 135px;
                margin-bottom: 29px;
            }

            .text{
                font-size: 16px;
                color: #d0d7ff;
                text-align: center;
            }

            .btn-wrap{
                text-align: center;
                margin-top: 58px;

                .el-button{
                    width: 179px;
                    height: 46px;
                    font-size: 18px;
                }
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: ''
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"个人中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"购买套餐", to: {path: ""}
                    },
                    {
                        name: "预定提交"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            submitForm(data){
                console.log(data)
            }
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>