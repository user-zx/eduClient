<template>
    <div class="home">
        <div class="page">
            <div class="page-left">
                <left ref="left"></left>
            </div>
            <div class="page-content">
                <div class="page-header">
                    <top :userAccount="user.userAccount"></top>
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
    import top from '../../components/layout/top/top.vue';
    import left from '../../components/layout/left/left.vue';
    import bottom from '../../components/layout/bottom/bottom.vue';
    export default{
        data() {
            return {
                msg:"",
                user: {}
            }
        },
        components:{top,left,bottom},
        methods:{
            getUserInfo() {
                this.$http.post('/apis/userMgrt/getUserPermission.json', {type: 'user'}).then(
                    (response) => {
                        if (response.data.success) {
                            this.user = response.data.data;
                          //  console.log(this.user);
                            var left = this.$refs.left;
                            console.log(left);
                            left.onPermissionsLoad(this.user.permissions);
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            }
        },
        mounted() {
            this.getUserInfo();
            //this.$router.push({path:"/home/panorama"});
        }
    }
</script>