/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="industry-detail-news">
        <h2>
            {{article.title}}
        </h2>
        <div class="article-info">
            <div class="info-item">
                <el-button type="primary" class="addTo-eventStore">
                    添加到事件库
                </el-button>
                <div class="share">
                    分享到:
                    <i class="icon icon-weibo"></i>
                    <i class="icon icon-wechat"></i>
                    <i class="icon icon-qqweibo"></i>
                    <i class="icon icon-qqZone"></i>
                </div>
            </div>
            <div class="info-item">
                <span class="item source">
                    来源： {{article.source}}
                </span>
                <span class="item type">
                    情感类型：{{article.type}}
                </span>
            </div>
            <div class="info-item">
                <span class="item author">
                    作者：{{article.author}}
                </span>
                <span class="item relatedPeople">
                    相关人物： {{article.relatedPeoPle}}
                </span>
            </div>
            <div class="info-item">
                <span class="item date">
                    日期： {{article.publicDate}}
                </span>
                <span class="item relatedCollege">
                    相关高校： {{article.relatedCollege}}
                </span>
            </div>
            <div class="info-item">
                <span class="item from">
                    来源站点： {{article.fromUrl}}
                </span>
            </div>
        </div>
        <div class="article-content">
            {{article.content}}
        </div>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script>
    export default{
        data(){
            return {
                msg: ''
            }
        },
        components:{} ,
        methods:{
        },
        mounted(){
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>