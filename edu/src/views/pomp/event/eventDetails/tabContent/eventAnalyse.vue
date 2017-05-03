
<template>
    <div class="event-time-line" id="event_time_line" v-loading="loading" element-loading-text="加载中……">
        <div class="time-line" id="time_line">
            <div class="time-line-item" v-for="item in articleData">
                <div class="circle-box">
                    <div class="circle"></div>
                </div>
                <div class="time-line-content">
                    <h5 class="title">{{item.title}}</h5>
                    <p class="intro">
                        <label>来源：</label><span>{{item.source}}</span>
                    </p>
                    <p class="intro">
                        <label>作者：</label><span>{{item.author}}</span>
                    </p>
                    <p class="intro">
                        <label>特征：</label><span>{{item.emotion == 'positive' ? '正面' : item.emotion == 'negative' ? '负面' : '相关'}}</span>
                    </p>
                    <p class="intro">
                        <label>阅读量：</label><span>{{item.hitCount}}</span>
                    </p>
                    <p class="intro">
                        <label>关键词：</label><span>{{keywords}}</span>
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
    export default{
        data(){
            return {
                msg:"演化分析",
                loading: false,
                articleData: [],
                total: 0,
                param: {
                    pageSize: 5,
                    pageNumber: 0,
                    orders: [
                        {
                            property: 'publishDateTime',
                            direction: 'DESC'
                        }
                    ]
                },
            }
        },
        components:{} ,
        methods:{
            handleScroll() {
                var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                var viewHeight = document[document.compatMode == 'CSS1Compat'?'documentElement':'body'].clientHeight;
                var scrollHeight = document.body.scrollHeight;
                if (scrollTop + viewHeight >= scrollHeight) {
                    if (this.param.pageNumber < this.total/this.param.pageSize) {
                        this.param.pageNumber = this.param.pageNumber + 1;
                        this.getArticleList(true);
                    }
                }
            },
            removeHandleScroll() {
                window.removeEventListener('scroll', this.handleScroll)
            },
            onEventLoad() {
                this.param.eventId = this.eventId;
                this.getArticleList();
            },
            getArticleList(isAppend) {
                this.loading = true;
                this.$nextTick(function() {
                    this.$http.post('/apis/eventAnalysis/getEventArticleList.json', this.param).then(
                        (response) => {
                            if (response.data.success) {
                                if (isAppend) {
                                    this.articleData = this.articleData.concat(response.data.data.content);
                                } else {
                                    this.articleData = response.data.data.content;
                                }
                                if (response.data.data.content < 5) {
                                    this.removeHandleScroll();
                                }
                                // 最多允许翻1000页
                                this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            } else {
                                console.error(response.data.message);
                            }
                            this.$nextTick(function() {
                                this.loading = false;
                            });
                        }, (response) => {
                            this.loading = false;
                            console.error(response);
                        }
                    );
                });
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },

        mounted(){
            this.onEventLoad();
        },
        props: ['eventId', 'keywords']
    }
</script>