/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="analyse">
        <div class="navbar">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>舆情管理</el-breadcrumb-item>
                <el-breadcrumb-item>舆情监测</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="search-container">
            <search-box></search-box>
        </div>
        <div class="content">
            <div class="content-bar">

            </div>
        </div>
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
    import "vue-style-loader!css-loader!sass-loader!./css/analyse.scss";
    import searchBox from '../../../components/searchBox/searchBox.vue'

    export default{
        data(){
            return {
                msg: "舆情监测"
            }
        },
        components: {searchBox},
        methods: {},
        mounted(){

        }
    }
</script>