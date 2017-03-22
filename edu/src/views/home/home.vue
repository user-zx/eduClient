/**
* Created by zhangxin on 2017/3/21.
*/
<template>
    <div class="home">
        <div class="page">
            <div class="page-left">
                <left></left>
            </div>
            <div class="page-content">
                <div class="page-header">
                    <top></top>
                </div>
                <div class="page-wrapper">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <bottom></bottom>
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
    import top from '../../components/layout/top/top.vue';
    import left from '../../components/layout/left/left.vue';
    import bottom from '../../components/layout/bottom/bottom.vue';
    export default{
        data(){
            return {
                msg:""
            }
        },
        components:{top,left,bottom},
        methods:{
            
        },
        mounted(){
            //this.$router.push({path:"/home/panorama"});
        }
    }
</script>