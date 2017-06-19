<template>
    <div class="seeClearly-index">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<script>
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    export default{
        data(){
            return{

            }
        },
        components:{breadCrumb},
        methods: {
            setBreadCrumb(flag){
                /*设置面包屑*/
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/home/industryNews"}
                    },
                    {
                        name:"两微洞察",to:{path:"/home/seeClearly"}
                    }
                ];

                if(flag == 'weibo'){
                    breadcrumb = [
                        {
                            name:"情报内参",to:{path:"/home/industryNews"}
                        },
                        {
                            name:"两微洞察",to:{path:"/home/seeClearly"}
                        },
                        {
                            name: "微博详情"
                        }
                    ];
                }else if(flag == 'wechat'){
                    breadcrumb = [
                        {
                            name:"情报内参",to:{path:"/home/industryNews"}
                        },
                        {
                            name:"两微洞察",to:{path:"/home/seeClearly"}
                        },
                        {
                            name: "微信详情"
                        }
                    ];
                }
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
        },
        created(){
//            this.setBreadCrumb();
        },
        watch: {
            /*
             * 监测路由地址，当地址变化时，面包屑变化
             * */
            '$route.path': {
                immediate: true,
                handler(val) {
                    if(val){
                        let url=val.split('/')[2];

                        if(url.indexOf("Weibo") < 0 && url.indexOf('Wechat') < 0){
                            this.setBreadCrumb();
                        }else if(url.indexOf("Weibo")!= -1) {
                            this.setBreadCrumb('weibo');
                        }else if(url.indexOf("Wechat") != -1) {
                            this.setBreadCrumb('wechat');
                        }
                    }
                }
            }
        },
    }
</script>