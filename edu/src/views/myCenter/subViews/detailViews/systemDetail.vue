<template>
    <div class="systemDetail">
        <div class="article-wrap">
            <div class="title">
                大学生圆珠笔作画成网红 四年坚持每周一幅
            </div>
            <div class="subTitle">
                2017-03-31
            </div>
            <div class="content">
                “从高三时，第一次看见圆珠笔画，在我心中就留下一个小小的期许，希望能有一幅画是自己所创作。
                等到大学时期，在学长的帮助下，开始正式学习圆珠笔画。”瞿贤亮说，自己的爱好很少，所以空闲时间较多，平时最喜欢一个人晚上泡一杯蜂蜜水，
                在角落安静的画画。选择以一种独特的方式告别自己的大学生活
                “从高三时，第一次看见圆珠笔画，在我心中就留下一个小小的期许，希望能有一幅画是自己所创作。
                等到大学时期，在学长的帮助下，开始正式学习圆珠笔画。”瞿贤亮说，自己的爱好很少，所以空闲时间较多，平时最喜欢一个人晚上泡一杯蜂蜜水，
                在角落安静的画画。选择以一种独特的方式告别自己的大学生活
                “从高三时，第一次看见圆珠笔画，在我心中就留下一个小小的期许，希望能有一幅画是自己所创作。
                等到大学时期，在学长的帮助下，开始正式学习圆珠笔画。”瞿贤亮说，自己的爱好很少，所以空闲时间较多，平时最喜欢一个人晚上泡一杯蜂蜜水，
                在角落安静的画画。选择以一种独特的方式告别自己的大学生活
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .systemDetail{
        background: #21273d;
        overflow: hidden;

        .article-wrap{
            margin: 50px auto 61px 50px;
            padding: 64px 56px;
            width: 60%;
            background: #282e46;

            .title{
                font-size: 24px;
                color: #60a3ff;
                text-align: center;
                margin-bottom: 18px;
            }
            
            .subTitle{
                color: #d0d7ff;
                text-align: center;
            }

            .content{
                color: #d0d7ff;
                margin-top: 65px;
                margin-bottom: 60px;
                line-height:35px;
                text-indent: 2em;
            }
        }
    }
</style>
<script>

    export default {
        data() {
            return {
                msg: 'fei'
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"个人中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"系统通知",to:{path:"/home/myCenter"}
                    },
                    {
                        name: "通知详情"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
        },
        created(){
            this.setBreadCrumb();
        }
    }

</script>