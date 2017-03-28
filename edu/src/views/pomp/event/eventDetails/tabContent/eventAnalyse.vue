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
                    <h5 class="title">事件时间轴的标题，大概长度如此……</h5>
                    <p class="intro">
                        <label>来源：</label><span>天天基金网</span>
                    </p>
                    <p class="intro">
                        <label>作者：</label><span>佚名</span>
                    </p>
                    <p class="intro">
                        <label>特征：</label><span>相关文章</span>
                    </p>
                    <p class="intro">
                        <label>热度：</label><span>9.3</span>
                    </p>
                    <p class="intro">
                        <label>关键词：</label><span>创业、上市、证券、治理、经营</span>
                    </p>
                    <p class="intro">
                        <label>相同文章：</label><span>23篇</span>
                    </p>
                </div>
            </div>
            <div class="time-line-item">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">
                    <h5 class="title">事件时间轴的标题，大概长度如此……</h5>
                    <p class="intro">
                        <label>来源：</label><span>天天基金网</span>
                    </p>
                    <p class="intro">
                        <label>作者：</label><span>佚名</span>
                    </p>
                    <p class="intro">
                        <label>特征：</label><span>相关文章</span>
                    </p>
                    <p class="intro">
                        <label>热度：</label><span>9.3</span>
                    </p>
                    <p class="intro">
                        <label>关键词：</label><span>创业、上市、证券、治理、经营</span>
                    </p>
                    <p class="intro">
                        <label>相同文章：</label><span>23篇</span>
                    </p>
                </div>
            </div>
            <div class="time-line-item">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">
                    <h5 class="title">事件时间轴的标题，大概长度如此……</h5>
                    <p class="intro">
                        <label>来源：</label><span>天天基金网</span>
                    </p>
                    <p class="intro">
                        <label>作者：</label><span>佚名</span>
                    </p>
                    <p class="intro">
                        <label>特征：</label><span>相关文章</span>
                    </p>
                    <p class="intro">
                        <label>热度：</label><span>9.3</span>
                    </p>
                    <p class="intro">
                        <label>关键词：</label><span>创业、上市、证券、治理、经营</span>
                    </p>
                    <p class="intro">
                        <label>相同文章：</label><span>23篇</span>
                    </p>
                </div>
            </div>
            <div class="time-line-item">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">
                    <h5 class="title">事件时间轴的标题，大概长度如此……</h5>
                    <p class="intro">
                        <label>来源：</label><span>天天基金网</span>
                    </p>
                    <p class="intro">
                        <label>作者：</label><span>佚名</span>
                    </p>
                    <p class="intro">
                        <label>特征：</label><span>相关文章</span>
                    </p>
                    <p class="intro">
                        <label>热度：</label><span>9.3</span>
                    </p>
                    <p class="intro">
                        <label>关键词：</label><span>创业、上市、证券、治理、经营</span>
                    </p>
                    <p class="intro">
                        <label>相同文章：</label><span>23篇</span>
                    </p>
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
        padding:44px 0;
        margin:0 auto;
        &:before{
            content: " ";
            width:1px;
            height:100%;
            background-color: #c1caf0;
            position: absolute;
            top:0;
            left:0;
            margin-left: -0.5px;
        }
        &:after{
            content: " ";
            display: table;
            clear: both;
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            left: 0;
            bottom: 0;
            margin-left: -3px;
            background: #60a3ff;
        }
        .time-line-item{
            position: relative;
            margin:45px 0;
            .circle-box{
                position: absolute;
                top:48px;
                margin-top:-9px;
                left: 0;
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
                float: right;
                width: 97%;
                padding:48px 46px;
                border-radius: 5px;
                background-color: #272c44;
                &:before{
                    content: '';
                    position: absolute;
                    left: -20px;
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
                 .intro,.title{
                     max-width: 99%;
                     line-height: 2;
                     overflow: hidden;
                     text-overflow: ellipsis;
                     white-space: nowrap;
                 }
                 .title{
                     font-weight:400;
                     font-size: 18px;
                     color:#60a3ff;
                     border-bottom: 2px solid rgba(96,163,255,.2);
                 }
                 .intro{
                     color:#d0d7ff;
                     border-bottom: 1px solid rgba(96,163,255,.2);
                 }
            }
            /*&:nth-of-type(even){
                .time-line-content{
                    float: right;
                    &:before{
                        left:-20px;
                     }
                }
            }*/
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
    @media screen and (min-width: 1440px){
        .time-line{
            &:before{
                top:0;
                left:50%;
            }
            &:after{
                left: 50%;
                bottom: 0;
            }
            .time-line-item{
                >.circle-box{
                    top:48px;
                    left: 50%;
                }
                >.time-line-content{
                    width: 47.5%;
                    float: none;
                    &:before{
                        left:inherit;
                        right: -3px;
                        top: 48px;
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