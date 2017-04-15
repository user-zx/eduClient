/**
* Created by yuwei
*/
<template>
    <div class="report" id="report">
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
                        name:"情报内参",to:{path:"/"}
                    },
                    {
                        name:"内参报告"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            }
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){

        }
    }

</script>