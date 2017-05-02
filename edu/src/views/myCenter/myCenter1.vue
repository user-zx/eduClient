/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="myCenter">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<script>
    import breadCrumb from "../../components/breadCrumb/breadCrumb.vue"
    export default{
        data(){
            return {
            }
        },
        components:{breadCrumb},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            }
        },
        mounted(){

        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>
<style lang="scss">
    #top-title li:nth-child(3){
        color: #365a8b; 
    }
</style>