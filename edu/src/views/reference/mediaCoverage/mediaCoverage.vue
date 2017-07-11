/**
* Created by lifei on 2017/3/30.
*/
<template>
    <div class="mediaCoverage article-wrap" v-loading="loading" element-loading-text="加载中……">
        <breadCrumb></breadCrumb>
        <el-tabs v-model="activeName" @tab-click="handleTabChange" class="custom-tabs">
            <el-tab-pane label="官媒报道" name="officialReport">
                <search-box :searchNames=searchNames @onload="onSearchLoad" @searchDataChange="onSearchDataChange"></search-box>
                <articleView :articleData="articleData" :total="total" :pageNumber="param.pageNumber" :eventBtn="true" :concernBtn="true" @onchange="pageChange" ref="article"></articleView>
            </el-tab-pane>
            <el-tab-pane label="网媒声量" name="internetReport">
                <search-box :searchNames=searchNames1 @onload="onSearchLoad" @searchDataChange="onSearchDataChange"></search-box>
                <el-table :data="internetData" class="tran-table white-table" border style="width: 100%" :resizable="false">
                    <el-table-column label="排名" prop="rank" align="center"></el-table-column>
                    <el-table-column label="高校" prop="university" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="媒体发声量" prop="mediaVoiceNum" align="center"></el-table-column>
                    <el-table-column label="媒体信息量" prop="mediaInfoNum" align="center"></el-table-column>
                    <el-table-column label="微信信息量" prop="wechatInfoNum" align="center"></el-table-column>
                    <el-table-column label="微博信息量" prop="weiboInfoNum" align="center"></el-table-column>
                    <el-table-column label="信息总量" prop="infoSumNum" align="center"></el-table-column>
                    <el-table-column label="活跃度" prop="activeNum" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template> 
<script>
    /*
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    import searchBox from '../../../components/searchBox/searchBox.vue'
    import articleView from '../../../components/content/article.vue'

    export default{
        data(){
            return {
                total:0,
                activeName: 'officialReport',
                searchNames: ['university', 'emotion', 'publishDateTime'],
                searchNames1: ['university'],
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
                articleData:[],
                loading: false,
                internetData: []
            }
        },
        components:{searchBox, breadCrumb, articleView} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/"}
                    },
                    {
                        name:"媒体声誉"
                    }
                ];
                this.$store.commit("setBreadCrumb", breadcrumb);
            },
            onSearchLoad(data) {
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.getArticleList();
            },
            onSearchDataChange(data,event) {
                data.pageSize = 5;
                data.pageNumber = 0;
                data.orders = this.param.orders;
                this.param = data;
                this.$refs.article.allSelect = false;
                this.$refs.article.handleCheckAllChange(event)
                this.getArticleList();
            },
            pageChange(param) {
                this.param.pageNumber = param.pageNumber;
                this.param.orders = param.orders;
                this.getArticleList();
            },
            getArticleList() {
                this.loading = true;
                this.$nextTick(function() {
                    this.$http.post('/apis/industryNews/findEduInfoByCondation.json', this.param).then(
                        (response) => {
                            console.log(response);
                            if (response.data.success) {
                                this.articleData = response.data.data.content;
                                // 最多允许翻1000页
                                this.total = response.data.data.totalElements > 10000 ? 10000 : response.data.data.totalElements;
                            } else {
                                console.error(response.data.message);
                            }
                            this.$nextTick(function() {
                                this.loading = false;
                            });
                        }, (err) => {
                            this.loading = false;
                            console.error(err);
                        }
                    );
                });
            },

            handleTabChange(){

            }
        },
        mounted(){
            this.setBreadCrumb();
        },
        created(){
        }
    }
</script>