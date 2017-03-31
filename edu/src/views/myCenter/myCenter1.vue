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
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */

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