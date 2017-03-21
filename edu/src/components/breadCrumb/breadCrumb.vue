/**
* Created by zhangxin on 2017/3/20.
*/
<template>
    <div class="breadCrumb">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="item in breadCrumd" :to="item.to">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<style lang="scss">
    .breadCrumb{
        height:38px;
        padding:0 12px;
        background-color: #1b1e2d;
        .el-breadcrumb{
            line-height: 38px;
        }
        .el-breadcrumb__item{
            .el-breadcrumb__item__inner{
                color:#ffffff;
            }
            .el-breadcrumb__separator{
                color:#ffffff;
            }
            &:last-child{
                .el-breadcrumb__item__inner{
                    color:#ffffff;
                    &:hover{
                         color:#ffffff;
                    }
                    a{
                     color:#ffffff;
                        &:hover{
                            color:#ffffff;
                        }
                    }
                }
             }
        }
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover{
        color:#ffffff;
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    export default{
        data(){
            return {
                msg:"",
                breadCrumd:this.$store.state.breadCrumb
            }
        },
        components:{} ,
        methods:{
            
        },
        mounted(){

        }
    }
</script>