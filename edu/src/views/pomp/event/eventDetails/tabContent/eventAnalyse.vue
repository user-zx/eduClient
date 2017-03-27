/**
* Created by zhangxin on 2017/3/24.
*/
<template>
    <div class="event-time-line" id="event_time_line">
        <div class="time-line" id="time_line">
            <div class="time-line-item">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">

                </div>
            </div>
            <div class="time-line-item">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">

                </div>
            </div>
            <div class="time-line-item">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">

                </div>
            </div>
            <div class="time-line-item">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">

                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .event-time-line{
        margin-top:10px;
    }
    .time-line{
        position:relative;
        width:90%;
        max-width:1170px;
        padding:44px 0;
        margin:0 auto;
        &:before{
            content: " ";
            width:1px;
            height:100%;
            background-color: #c1caf0;
            position: absolute;
            top:0;
            left:50%;
            margin-left: -0.5px;
        }
        &:after{
            content: " ";
            display: table;
            clear: both;
        }
        .time-line-item{
            position: relative;
            margin:45px 0;
            .circle-box{
                position: absolute;
                top:48px;
                margin-top:-9px;
                left: 50%;
                margin-left: -9px;
                width: 18px;
                height:18px;
                background-color: #191d2f;
                .circle{
                    height:100%;
                    border: 2px solid #60a3ff;
                    border-radius: 50%;
                }
            }
            .time-line-content{
                position: relative;
                width: 47.5%;
                padding:48px 46px;
                position: relative;
                border-radius: 5px;
                background-color: #272c44;
                &:before{
                    content: '';
                    position: absolute;
                    right: -3px;
                    top: 48px;
                    margin-top:-20px;
                    display: block;
                    width: 25px;
                    height: 25px;
                    border: 1px solid #272c44;
                    border-width: 0 1px 1px 0;
                    background-color: #272c44;
                    -webkit-transform: rotate(225deg) translate(-50%, 0);
                    transform: rotate(225deg) translate(-50%, 0);
                }
            }
            &:nth-of-type(even){
                .time-line-content{
                    float: right;
                    &:before{
                        left:-20px;
                     }
                }
            }
            &:after{
                content: "";
                display: table;
                clear: both;
            }
            &:first-child{
                margin-top: 0;
            }
            &:last-child{
                margin-bottom: 0;
            }
        }
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
                msg:"演化分析"
            }
        },
        components:{} ,
        methods:{
            
        },
        mounted(){
            
        }
    }
</script>