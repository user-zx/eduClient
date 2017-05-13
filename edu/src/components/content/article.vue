/**
* Created by lifei on 2017/3/21.
*/

<template>
    <div class="content">
        <div class="content-bar clearfix">
            <ul class="content-bar-list">
                <li class="pointer">
                    <el-checkbox v-model="allSelect"  @change="handleCheckAllChange"></el-checkbox>
                </li>
                <li class="pointer" @click="sort(0)">
                    阅读量<i class="arrow" :class="order0 == 'DESC' ? 'arrow-down' : 'arrow-up'"></i>
                </li>
                <li class="pointer" @click="sort(1)">
                    时间<i class="arrow" :class="order1 == 'DESC' ? 'arrow-down' : 'arrow-up'"></i>
                </li>
            </ul>
            <div class="content-bar-button">
                <dropDown v-if="eventBtn"  @onSaveEvent="onSaveEvent"></dropDown>

                <el-button type="primary" icon="plus" class="button-icon" v-if="concernBtn" @click="concernBtnClick">批量关注</el-button>
                <el-button type="primary" icon="plus" class="button-icon" v-if="unfollowBtn" @click="unfollow">取消关注</el-button>
            </div>
            <div class="content-bar-page">
                <el-pagination class="edu-pagination"
                               @current-change="handleCurrentChange"
                               :current-page="pageNumber + 1"
                               :page-size="5"
                               layout="prev, next, jumper, total"
                               :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="article-container" id="articleContainer" :data="articleDataNew">
            <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
                <div class="article" v-for="(item, index) in articleDataNew">
                    <div class="article-left">
                        <div class="checkbox-div">
                            <el-checkbox :label="item.id" ></el-checkbox>
                            <input type="hidden" :value="item.id"/>
                        </div>
                    </div>
                    <div class="article-right">
                        <div class="article-title-box">
                            <p class="article-title pointer" @click="toDetail(item)">
                                <span>{{item.title}}</span>
                                <i class="title-icon positive-icon" v-if="item.emotion == 'positive'"></i>
                                <i class="title-icon negative-icon" v-else-if="item.emotion == 'negative'"></i>
                                <i class="title-icon neutral-icon" v-else></i>
                            </p>
                            <p class="button-box">
                                <el-button type="danger" class="article-danger-button" v-if="item.hasWarn"
                                           @click="warnBtnClick(item)" :loading="item.loading">
                                    取消预警
                                </el-button>
                                <el-button type="info" class="article-danger-button" v-else
                                           @click="warnBtnClick(item)" :loading="item.loading">
                                    添加预警
                                </el-button>
                            </p>
                        </div>
                        <p class="article-main">
                            {{item.content}}
                        </p>
                        <p class="article-describe">
                            <span class="article-source">
                                来源： {{item.source}}
                            </span>
                            <span class="article-author">
                                作者： {{item.author}}
                            </span>
                            <span class="article-clickNum blue">
                                阅读量： {{item.hitCount}}
                            </span>
                            <span class="article-publishDate blue">
                                发布时间：{{item.publishDateTime}}
                            </span>
                        </p>
                    </div>
                </div>
            </el-checkbox-group>
        </div>
        <div v-if="articleDataNew.length == 0" class="no-data">暂无数据</div>
    </div>
</template>
<script>
    import dropDown from "../dropdown/dropdown.vue";
    export default{
        data(){
            return {
                msg: "",
                order0: "DESC",
                order1: "DESC",
                param: {
                    pageSize: 5,
                    pageNumber: 0,
                    orders: [
                        {
                            property: 'hitCount',
                            direction: 'DESC'
                        },
                        {
                            property: 'publishDateTime',
                            direction: 'DESC'
                        }
                    ]
                },
                events: [],
                checked: [],
                articleDataNew: "",
                allSelect:false,
                unfollowParam:{concernsContent:[]},
                followParam:{concernsContent:[]},
            }
        },
        components: {dropDown},
        methods: {
            unfollow(){
                this.unfollowParam.concernsType = 1;
                if(this.unfollowParam.concernsContent.length>0){
                    this.$http.post("/apis/concerns/removeConcernsMore.json",this.unfollowParam).then(res=>{
                        if(res.data.success){
                            console.log(res); 
                            if(res.data.data.message==null){
                                this.$message("取消关注成功")
                                this.$emit('onchange',"");
                                this.unfollowParam.concernsContent = [];
                            }else{
                                this.$message(res.data.data.message)
                            }
                        }
                    },err=>{
                        console.log(err);
                    })
                }else{
                    this.$message("未选择文章")
                }

            },
            getAllEvent() {
                this.$http.post('/apis/eventAnalysis/getEventList.json', {pageSize: 5, pageNumber: 0}).then(
                    (response) => {
                        // console.log(response);
                        if (response.data.success) {
                            this.events = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            handleCheckAllChange(val) {
               this.checked = val && val.target.checked ? this.articleDataNew.map(v=>{return v.id}) : [];
               this.unfollowParam.concernsContent = this.checked;
               this.followParam.concernsContent = this.checked;
               //console.log(this.checked);
            },
            handleCheckedCitiesChange(value) {
                this.unfollowParam.concernsContent = value;
                this.followParam.concernsContent = value;
            },
            warnBtnClick(item) {
                item.loading = true;
                this.$nextTick(function () {
                    var tmp = {};
                    tmp.id = item.id;
                    tmp.hasWarn = !item.hasWarn;
                    tmp.emotion = item.emotion;
                    tmp.vector = item.vector;
                    tmp.hitCount = item.hitCount;
                    tmp.publishDateTime = item.publishDateTime;
                    this.$http.post('/apis/opinionWarn/warnOrCancel.json', tmp).then(
                        (response) => {
                            if (response.data.success) {
                                if (!item.hasWarn) {
                                    item.hasWarn = true;
                                    this.$notify({
                                        title: '成功',
                                        message: '添加预警成功',
                                        type: 'success',
                                        duration: 2000
                                    });
                                } else {
                                    item.hasWarn = false;
                                    this.$notify({
                                        title: '成功',
                                        message: '取消预警成功',
                                        type: 'success',
                                        duration: 2000
                                    })
                                }
                                item.loading = false;
                            } else {
                                console.error(response.data.message);
                            }
                        }, (response) => {
                            console.error(response);
                        }
                    );
                });
            },
            concernBtnClick() {
                if (this.followParam.concernsContent.length > 0) {
                    this.followParam.concernsType = 1;
                    this.$http.post('/apis/concerns/saveConcernsMore.json',this.followParam).then(
                        (response) => {
                            if (response.data.success) {
                                this.$message("添加成功")
                            } else {
                                console.error(response.data.message);
                            }
                        }, (response) => {
                            console.error(response);
                        }
                    );
                } else {
                    this.$message({
                        type: 'info',
                        message: '未选择文章'
                    });
                }
            },
            toDetail(data){
                this.$router.push({path: '/home/articleDetail', query: {id: data.id}});
            },
            sort(index) {
                let order = {};
                if (index == 0) {
                    order.property = 'hitCount';
                    order.direction = this.order0 == 'DESC' ? 'ASC' : 'DESC';
                    this.order0 = order.direction;
                } else {
                    order.property = 'publishDateTime';
                    order.direction = this.order1 == 'DESC' ? 'ASC' : 'DESC';
                    this.order1 = order.direction;
                }
                this.param.orders.pop();
                this.param.orders.pop();
                this.param.orders.push(order);
                this.$emit('onchange', this.param);

            },
            handleCurrentChange(pageNumber) {
                //每次分页  之前选中的状态都取消
                this.allSelect = false;
                this.handleCheckedCitiesChange([]);
                this.checked = [];
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
                this.$emit('onchange', this.param);
            },
            onSaveEvent(eventId) {
                let ids = [];
                $('#articleContainer').find("input[type='checkbox']").each(function() {
                    if ($(this).prop('checked')) {
                        ids.push($(this).parent().parent().next().val());
                    }
                });
                if (ids.length > 0) {
                    let param = {
                        eventId: eventId,
                        contents: ids
                    };
                    this.$http.post('/apis/eventAnalysis/saveEventArticle.json', param).then(
                        (response) => {
                            if (response.data.success) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            } else {
                                console.error(response.data.message);
                            }
                        }, (response) => {
                            console.error(response);
                        }
                    );
                } else {
                    this.$message({
                        type: 'info',
                        message: '未选择文章'
                    });
                }
            },
            init: function () {
                let url = 'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js'
                let script = document.createElement('script')
                script.setAttribute('src', url)
                document.getElementsByTagName('head')[0].appendChild(script)
            }
        },
        mounted() {
            this.getAllEvent();
            this.init();
        },
        watch:{
            articleData:function(val,oldval){
                this.articleDataNew = val;
            },
        },
        props: ["articleData", "eventBtn", "concernBtn",'unfollowBtn', "total", "pageNumber"]
    }
</script>

<style lang="scss" scoped>
    input[type='checkbox'] {
        cursor: pointer;
        width: 16px;
        height: 16px;
    }
    .article-container{
        background: #ffffff;
        .article{
            border-bottom: 1px solid #E3EDFB;
            display: table;
            width: 100%;

            .article-left{
                width: 5%;
                height: 100%;
                display: table-cell;
                text-align: center;
                vertical-align: middle;
                border-right: 1px solid #E3EDFB;
            }

            .article-right{
                height: inherit;
                width:94%;
                display: table-cell;
                padding: 15px ;
                color: #6a6a6a;
                vertical-align: top;

                .article-title-box{
                    height: 28px;

                    .article-title{
                        font-weight: normal;
                        font-size: 20px;
                        width: 79%;
                        height: 100%;
                        display: inline-block;
                        position: relative;

                        span:first-child{
                            display: inline-block;
                            height:100%;
                            max-width: 680px;
                            overflow: hidden;
                            margin-right: 10px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .title-icon{
                            position: absolute;
                            display: inline-block;
                            width: 46px;
                            font-size: 14px;
                            text-align: center;
                            border-radius: 3px;
                            top: 3px;
                        }

                        .positive-icon{
                            color: #22ac38;
                            border: 1px solid #22ac38;
                        }

                        .positive-icon::before{
                            content: '正面';
                        }

                        .negative-icon{
                            color: #e60012;
                            border: 1px solid #e60012;
                        }

                        .negative-icon::before{
                            content: '负面';
                        }

                        .neutral-icon{
                            color: #20a0ff;
                            border: 1px solid #20a0ff;
                        }

                        .neutral-icon::before{
                            content: '中性';
                        }
                    }
                    .button-box{
                        width: 20%;
                        display: inline-block;
                    }
                }

                .article-describe{
                    font-size: 12px;
                    margin-top: 13px;
                    text-align: right;

                    .article-source{
                        margin-right: 14px;
                    }
                    .article-author, .article-clickNum{
                        margin-right: 16px;
                    }

                    article-publishDate{
                        line-height: 20px;
                    }

                    .blue{
                        color: #85b8ff;
                        font-size:14px;
                    }
                }

                .article-main{
                    line-height: 24px;
                    margin-top:13px;
                    max-height: 100px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                }
            }

            .article-danger-button{
                float: right;
                margin-top: -8px;
                transition: width 0.5s;
                -moz-transition: width 0.5s; /* Firefox 4 */
                -webkit-transition:width 0.5s; /* Safari 和 Chrome */
                -o-transition: width 0.5s; /* Opera */
            }

        }
        &.dark{
            background-color: #21273d;
            .article{
                border-bottom-color: rgba(96,163,255,.1);
            }
            .article-left{
                border-right-color:rgba(96,163,255,.1);
            }
            .article-right{
                color:#d0d7ff;

                .article-title-box{
                    .article-title{
                        color:#60a3ff;
                    }
                }
            }
        }
    }
    .no-data {
        color: #5e7382;
        text-align: center;
        font-size: 14px;
        margin-top: 30px;
    }
</style>
<style lang="scss">
    .article-left{
        .el-checkbox__label{
            display: none;
        }
    }
</style>