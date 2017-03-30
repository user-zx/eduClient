/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="industryNews">
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
                        name:"情报内参",to:{path:"/"}
                    },
                    {
                        name:"行业动态",to:{path:"/industryNews"}
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