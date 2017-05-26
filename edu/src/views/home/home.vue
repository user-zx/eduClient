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
<style lang="scss">
    .el-icon-close {
        display: none !important;
    }
</style>
<script>
    import top from '../../components/layout/top/top.vue';
    import left from '../../components/layout/left/left.vue';
    import bottom from '../../components/layout/bottom/bottom.vue';
    export default{
        data() {
            return {
                msg:"",
                user: {},
                warnPermission: true,
                eventPermission: true,
            }
        },
        components:{top,left,bottom},
        methods:{
            getUserInfo() {
                let vm = this;

                $.ajax({
                    url: '/apis/userMgrt/getUserPermission.json',
                    data: JSON.stringify({type: 'user'}),
                    method: 'POST',
                    async: false,
                    contentType: 'application/json',
                    success: function (response) {
                        if (response.success) {
                            vm.user = response.data;
                            var left = vm.$refs.left;
                            left.onPermissionsLoad(vm.user.permissions);

                            let permissions = vm.user.permissions;
                            if(!permissions){
                                vm.warnPermission = false;
                            }else if(permissions.length > 0 && permissions.indexOf(21) < 0){
                                vm.warnPermission = false;
                            }else{
                                vm.warnPermission = true;
                            }
                            if(!permissions){
                                vm.eventPermission = false;
                            }else if(permissions.length > 0 && permissions.indexOf(13) < 0){
                                vm.eventPermission = false;
                            }else{
                                vm.eventPermission = true;
                            }
                        } else {
                            console.error(response.message);
                        }
                    }
                });
            },
            getUserParams() {
                //子账号不需要提示设置学校
                if(this.user.primaryAccountId != null){
                    return ;
                }

                this.$http.post('/apis/user/getUnivsAndPersonage.json').then(
                    (response) => {

                    if (response.data.success) {
                        let univs = response.data.data.univs;
                        if (univs.length == 0) {
                            this.$alert('您还没有设置大学，请前往设置', {
                                confirmButtonText: '确定',
                                type: 'warning',
                                callback: action => {
                                    this.$router.push({path:"/home/centerCollege"});
                                }
                            });
                        }
                    } else {
                        console.error(response.data.message);
                    }

                }, (response) => {
                        console.error(response);
                    }
                );

            },
        },
        mounted() {
            this.getUserInfo();
            this.getUserParams();
        }
    }

</script>