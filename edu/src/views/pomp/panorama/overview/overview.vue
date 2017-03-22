/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="overview">
        <div class="overview-title">
            <h3 class="title">平台概览</h3>
        </div>
        <div class="overview-content">
            <span class="number-icon number-icon1"></span>
            <span class="number">{{platformData.data.toDayAddNum}}</span>
            <p class="overview-name">今日新增数据量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon2"></span>
                <span class="number">{{platformData.data.universNum}}</span>
            </div>
            <p class="overview-name">监测高校量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon3"></span>
                <span class="number">{{platformData.data.mediaNum}}</span>
            </div>
            <p class="overview-name">监测媒体量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon4"></span>
                <span class="number">{{platformData.data.collectNum}}</span>
            </div>
            <p class="overview-name">采集数据量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon5"></span>
                <span class="number">{{platformData.data.weChatNum}}</span>
            </div>
            <p class="overview-name">监测微信量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon6"></span>
                <span class="number">{{platformData.data.weboNum}}</span>
            </div>
            <p class="overview-name">监测微博量</p>
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
    import "vue-style-loader!css-loader!sass-loader!./css/overview.scss";
    export default{
        data(){
            return {
                msg:"首页概览",
                platformData:{
                    url: "/apis/allViewOpinion/getPlatformProfile.json",
                    data: {
                        collectNum: 0,
                        mediaNum: 0,
                        toDayAddNum: 0,
                        universNum: 0,
                        weboNum: 0,
                        weChatNum: 0
                    }
                }
            }
        },
        components:{} ,
        methods:{
            getPlatformData() {
                this.$http.post(this.platformData.url).then(
                    (response) => {
                        if (response.data.success) {
                            this.platformData.data = response.data.data;
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            }
        },
        mounted() {
            this.getPlatformData();
        }
    }
</script>