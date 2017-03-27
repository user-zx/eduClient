/**
* Created by zhangxin on 2017/3/20.
*/
<template>
    <div class="breadCrumb">
        <el-breadcrumb separator=" > ">
            <el-breadcrumb-item v-for="item in breadCrumd" :to="item.to">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    export default{
        data(){
            return {
                breadCrumd:""
            }
        },
        components:{} ,
        methods:{
            
        },
        mounted(){
            let vm =this;
        },
        watch:{
            "$store.state.breadCrumb":{
                immediate: true,
                handler(val) {
                    this.breadCrumd=val;
                }
            }
        }
    }
</script>