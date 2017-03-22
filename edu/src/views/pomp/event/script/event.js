/**
 * Created by zhangxin on 2017/3/22.
 */
/*
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */

import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
export default{
    data(){
        return {
        }
    },
    components:{breadCrumb} ,
    methods:{
        setBreadCrumb(){
            let breadcrumb=[
                {
                    name:"舆情管理",to:{path:"/"}
                },
                {
                    name:"事件监测",to:{path:"/speech"}
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
