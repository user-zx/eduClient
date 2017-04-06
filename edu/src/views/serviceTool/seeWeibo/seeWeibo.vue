/**
* Created by zhangxin on 2017/3/27.
*/
<template>
    <div class="seeWeibo" id="seeWeibo">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
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