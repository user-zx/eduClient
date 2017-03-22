/**
* Created by zhangxin on 2017/3/16.
*/
<template>
    <div class="analyse">
        <bread-crumb></bread-crumb>
        <div id="search-container">
            <search-box :searchData=searchData></search-box>
        </div>
        <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li>全部</li>
                    <li>阅读量</li>
                    <li>时间</li>
                </ul>
                <div class="content-bar-button">
                    <el-button type="primary"><i class="el-icon-plus marginR5"></i>事件库</el-button>
                    <el-button type="primary"><i class="el-icon-plus marginR5"></i>批量关注</el-button>
                </div>
            </div>
            <articleContainer></articleContainer>
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
    import "vue-style-loader!css-loader!sass-loader!./css/analyse.scss";
    import breadCrumb from '../../../components/breadCrumb/breadCrumb.vue';
    import searchBox from '../../../components/searchBox/searchBox.vue'
    import articleContainer from '../../../components/content/article.vue'

    export default{
        data(){
            return {
                msg: "舆情监测",
                searchData:"",
            }
        },
        components: {breadCrumb, searchBox, articleContainer},
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"舆情管理",to:{path:"/"}
                    },
                    {
                        name:"舆情监测",to:{path:"/analyse"}
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            }
        },
        created(){
            this.setBreadCrumb();
        },
        mounted(){
            let searchData = [
                {
                    'firstText' :  '选择高校:',
                    'searchText': [
                        {id: 0, text: '全部'},
                        {id: 1, text: '北京大学'},
                        {id: 2, text: '北京航空航天大学'},
                        {id: 3, text: '清华大学'},
                        {id: 4, text: '中央民族大学'},
                        {id: 5, text: '北京邮电大学'},
                        {id: 6, text: '北京传媒大学'},
                        {id: 7, text: '北京科技大学'}
                    ],
                    'buttonInfo': [
                        {'buttonText': '添加高校', 'id': 'add-college-btn'},
                        {'buttonText': '清空', 'id': 'clear-college-btn'}
                    ]
                },
                {
                    'firstText': '高校维度:',
                    'searchText': [
                        {id: 0, text: '校园舆情'},
                        {id: 1, text: '校园安全'},
                        {id: 2, text: '违规违纪'},
                        {id: 3, text: '媒体报道'},
                        {id: 4, text: '人才培养'},
                        {id: 5, text: '科学研究'},
                        {id: 6, text: '微信微博'},
                        {id: 7, text: '论坛贴吧'},
                        {id: 8, text: '敏感时期'},
                        {id: 9, text: '人物聚焦'}
                    ],
                    'buttonInfo': 'N'
                }
            ];
            this.searchData = searchData;
        },

    }
</script>