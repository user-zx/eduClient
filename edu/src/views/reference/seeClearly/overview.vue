/**
* Created by yu-bing on 2017/3/17.
*/
<template>
    <div class="overview">
        <div class="overview-title">
            <div class="title">两微全量</div>
            <h1>统计</h1>
        </div>
        <div class="overview-content">
            <span class="number-icon number-icon1"></span>
            <span class="number">{{platformData.data.weChatNum}}</span>
            <p class="overview-name">微信量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon2"></span>
                <span class="number">{{platformData.data.weChatDataNum}}</span>
            </div>
            <p class="overview-name">微信信息量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon3"></span>
                <span class="number">{{platformData.data.weboNum}}</span>
            </div>
            <p class="overview-name">微博量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon4"></span>
                <span class="number">{{platformData.data.weboDataNum}}</span>
            </div>
            <p class="overview-name">微博信息量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon5"></span>
                <span class="number">{{platformData.data.universNum}}</span>
            </div>
            <p class="overview-name">官微量</p>
        </div>
        <div class="overview-content">
            <div class="number-box">
                <span class="number-icon number-icon6"></span>
                <span class="number">{{platformData.data.universDataNum}}</span>
            </div>
            <p class="overview-name">官微信息量</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
  
.overview{
  padding:27px 20px 30px 0px;
  background-color: #21273d;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  >div{
    display: inline-block;
    vertical-align: middle;
    &.overview-title{
      width: 96px;
      text-align: right;
      .title{
        font-size: 14px;
      }
      h2{
          text-align: center;
      }
    }
    &.overview-content{
      padding-left: 42px;
      padding-right: 42px;
      border-right: 1px solid rgba(255,255,255,.2);
      text-align: center;
      .number,.number-icon{display: inline-block;vertical-align: middle;}
      .number-icon{
        margin-bottom: 3px;
        width: 31px;
        height:27px;
        //background-color: #b8b8b8;
      }
      .number{
        font-size: 26px;
      }
      &:last-child{
        border-right: none;
      }
    }
  }
}
@media screen and (max-width:1440px) {
  .overview{
    >div{
      &.overview-content{
        padding-left: 20px;
        padding-right: 30px;
      }
    }
  }
}
</style>
<script>
    export default{
        data(){
            return {
                msg:"两微全量",
                platformData:{
                    url: "/apis/twoMicroInsight/getTwoMicroData.json",
                    data: {
                        universNum: 0,
                        weboNum: 0,
                        weChatNum: 0,
                        universDataNum: 0,
                        weboDataNum: 0,
                        weChatDataNum: 0
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