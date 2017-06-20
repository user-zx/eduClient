<template>
    <div class="analyse article-wrap">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>
<script>
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    export default{
        data(){
            return {

            }
        },
        components: {breadCrumb},
        methods:{

        },
        created(){

        },
        mounted(){

        },
    }
</script>