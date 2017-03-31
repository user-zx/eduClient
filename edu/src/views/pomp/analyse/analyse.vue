/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="analyse article-wrap">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import "vue-style-loader!css-loader!sass-loader!./css/analyse.scss";
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';

    export default{
        data(){
            return {
                msg: "舆情监测",
            }
        },
        components: {breadCrumb},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/"}
                    },
                    {
                        name:"舆情监测"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            }
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){},
    }
</script>