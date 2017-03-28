/**
*
*/

<template>
   <div class="characterAnalyse">
       <div class="character-info">
           <div class="info-title">

           </div>
           <div class="info-detail">

           </div>
       </div>
       <div class="character-rank">

       </div>
       <div class="character-activity"></div>
   </div>
</template>
<style lang="scss" scoped>

</style>
<script>

    export default{
        data(){
            return {
                msg: ''
            }
        },
        components:{},
        methods: {
            setBreadCrumb(){
                let breadcrumb =[
                    {
                        name:"舆情管理", to:{path:"/"}
                    },
                    {
                        name:"舆情监测", to:{path:"/analyse"}
                    },
                    {
                        name: "人物聚焦"
                    },
                    {
                        name: "人物分析", to: {path: "/"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

        },
        created(){
            this.setBreadCrumb()
        }
    }
</script>