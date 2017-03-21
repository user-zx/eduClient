/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="analyse">
        <bread-crumb></bread-crumb>
        <div id="search-container">
            <search-box></search-box>
        </div>
        <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li>全部</li>
                    <li>阅读量</li>
                    <li>时间</li>
                </ul>
            </div>
            <articleContainer></articleContainer>
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
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    import searchBox from '../../../components/searchBox/searchBox.vue'
    import articleContainer from '../../../components/content/article.vue'

    export default{
        data(){
            return {
                msg: "舆情监测"
            }
        },
        components: {breadCrumb, searchBox, articleContainer},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/"}
                    },
                    {
                        name:"舆情监测",to:{path:"/analyse"}
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