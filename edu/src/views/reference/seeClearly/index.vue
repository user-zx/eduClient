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
            setBreadCrumb(){
                /*设置面包屑*/
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/home/industryNews"}
                    },
                    {
                        name:"两微洞察",to:{path:"/home/seeClearly"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
        },
        created(){
            this.setBreadCrumb();
        },
    }
</script>