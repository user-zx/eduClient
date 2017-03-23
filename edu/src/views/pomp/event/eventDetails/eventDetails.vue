/**
* Created by zhangxin on 2017/3/22.
*/
<template>
    <div class="eventDetails" id="eventDetails">
        
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
     export default{
        data(){
            return {
                msg:"事件详情"
            }
        },
        components:{},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/home/panorama"}
                    },
                    {
                        name:"事件监测",to:{path:"/home/event"}
                    },
                    {
                        name:"事件详情"
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