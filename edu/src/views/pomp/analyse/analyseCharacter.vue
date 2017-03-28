/**
*
*/

<template class="analyseCharacter">

</template>
<style lang="scss" scoped>

</style>
<script>
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue'
    export default{
        data(){

        },
        components:{breadCrumb},
        method(){
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/"}
                    },
                    {
                        name:"舆情监测",to:{path:"/analyse"}
                    },
                    {
                        name: "人物聚焦", to: {path: "/"}
                    },
                    {
                        name: "人物分析"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
        },
       
    }
</script>