<template>
    <div class="myAttention">
        <bread-crumb></bread-crumb>
        <div class="attend-tabs">
            <el-row :gutter="10">
                <el-col :span="6" class="active"><div class="tab-item" @click="currentFun('pomp')">舆情</div></el-col>
                <el-col :span="6"><div class="tab-item" @click="currentFun('character')">人物</div></el-col>
                <el-col :span="6"><div class="tab-item" @click="currentFun('wechat')">微信</div></el-col>
                <el-col :span="6"><div class="tab-item" @click="currentFun('weibo')">微博</div></el-col>
            </el-row>
        </div>
        <components :is="currentTabs.currentTab"></components>
    </div>
</template>
<style lang="scss" scoped>
    .attend-tabs{
        background-color: #21273d;
        margin-top: 10px;
        margin-bottom:10px;
        padding:16px 22px;
        .el-col{
            .tab-item{
                height:125px;
                line-height: 125px;
                font-size: 16px;
                text-align: center;
                color:rgba(193,202,240,.5);
                background: #282e46;
                transition: all .25s;
                cursor: pointer;
                border:1px solid #273451;
            &:hover{
                 color:#60a3ff;
             }
            }
            &.active{
                .tab-item{
                    color:#60a3ff;
                }
            }
        }
    }
</style>
<script>
     import breadCrumb from "../../components/breadCrumb/breadCrumb.vue";
     import pomp from "./attentionDetails/pomp.vue";
     import character from "./attentionDetails/character.vue";
     import weibo from "./attentionDetails/weibo.vue";
     import wechat from "./attentionDetails/wechat.vue";

    export default{
        data(){
            return {
                currentTabs:{
                    pomp:"pomp",
                    character:"character",
                    weibo:"weibo",
                    wechat:"wechat",
                    currentTab:"pomp"
                }
            }
        },
        components:{breadCrumb,pomp,character,weibo,wechat} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"我的关注",to:{path:"/home/myAttention"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            currentFun(params){
                this.currentTabs.currentTab=params;
            }
        },
        mounted(){
            $(".attend-tabs").on("click",".tab-item",function () {
                $(this).parent().addClass("active").siblings().removeClass("active");
            });
        },
        created(){
            this.setBreadCrumb();
        }
    }
</script>