<template>
    <div class="seeWeibo" id="seeWeibo">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<style lang="scss" scoped>
    
</style>
<script>
     import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
     export default{
         data(){
             return {
                msg: ''
             }
         },
         components:{breadCrumb} ,
         methods:{
             setBreadCrumb(){
                 let breadcrumb=[
                     {
                         name:"业务平台",to:{path:"/home/seeWeibo"}
                     },
                     {
                         name:"微博监测"
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