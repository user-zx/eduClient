/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="speech" id="speech">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<script>
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    export default{
        data(){
            return {}
        },
        components:{breadCrumb} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/home/panorama"}
                    },
                    {
                        name:"舆情报告"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){

        }
    }

</script>