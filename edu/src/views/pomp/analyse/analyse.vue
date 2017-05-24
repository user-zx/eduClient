<template>
    <div class="analyse article-wrap">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<script>
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