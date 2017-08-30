/**
* Created by lifei on 2017/07/04.
*/
<template>
    <div class="publicSearch">
        <el-row v-for="(data, index) in searchData" v-if="searchNames.indexOf(data.name) != -1">
            <el-col :span="2">{{data.title}}</el-col>
            <el-col :span="22">
                <ul>
                    <li class="search-list" v-for="(item, index1) in data.searchList"
                        :class="{'search-selected': item.selected}"
                        @click="searchLiClick(item, index1, data)">{{item.text}}</li>
                </ul>
            </el-col>
        </el-row>
        <div id="dynamicDiv">
            <el-row id="provinceDiv" v-show="showProvince">
                <el-col :span="2">省份:</el-col>
                <el-col :span="22">
                    <ul>
                        <li class="search-list" v-for="item in provinces"
                            :class="{'search-selected': item.selected}"
                            @click="searchLiClick(item, index1, data)">
                            {{item.value}}
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <el-row id="collegeDiv" v-show="showCollege">
                <el-col :span="2">高校:</el-col>
                <el-col :span="22">
                    <ul id="collegeSpellUl">
                        <li class="search-list special-list" v-for="item in colleges" @click="showCollegeEvent(item)">{{item.label}}</li>
                    </ul>
                    <ul id="college-list"></ul>
                </el-col>
            </el-row>
            <el-row id="weiSiteDiv" v-show="showWebSites">
                <el-col :span="2">门户网站</el-col>
                <el-col :span="22">
                    <ul>
                        <li class="search-list" v-for="(item, index1) in webSites"
                            :class="{'search-selected': item.selected}"
                            @click="searchLiClick(item, index1, data)">{{item.text}}</li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .publicSearch{
        margin-bottom: 10px;
        color: #333;
        background: #fff;

        &.dark{
             background-color: #21273d;
             color:#d0d7ff;
            .el-row{
                .el-col{
                    border-bottom: 1px solid rgba(96,163,255,.1);
                    &:first-child{
                         background: rgba(25,28,45,.32);
                         padding-left: 20px;
                     }
                }
            }
        }

        .el-row{
            .el-col{
                border-bottom: 1px solid #d6d6d6;
                line-height: 44px;
                overflow: hidden;
                &:first-child {
                     background: #e6e6e6;
                     padding-left: 20px;
                 }

                ul{
                    position: relative;
                    min-height: 44px;

                    .search-list {
                        display: inline-block;
                        text-align: center;
                        padding-left: 15px;
                        padding-right: 15px;
                        cursor: pointer;
                        height: 44px;
                        min-width: 44px;

                        &.special-list{
                             min-width: 30px;
                             padding: 0px 8px;
                         }
                    }

                    .date-search-li{
                        position: absolute;
                        padding-top: 1px;
                    }
                }
            }
        }
        .search-selected {
            color: #60a3ff;
        }
    }
</style>

<script>
    import provinces from "../../province.json";
    import colleges from "../../school.json";

    export default{
        data(){
            return{
                provinces: [],
                colleges: colleges,
                showProvince: false,
                showCollege: false,
                searchData: [
                    {   'name': 'topNews',
                        'title': '新闻头条:',
                        'searchList': [
                            {id: 0, text: '全部', selected: true},
                            {id: 1, text: '部委省厅', selected: false, clickEvent: 'handleProvinceClick'},
                            {id: 2, text: '高校焦点', selected: false, clickEvent: 'handleCollegeClick'},
                            {id: 3, text: '政策聚焦', selected: false, clickEvent: 'handleProvinceClick'},
                            {id: 4, text: '人事任免', selected: false, clickEvent: 'handleProvinceClick'},
                            {id: 5, text: '各大门户站', selected: false, clickEvent: 'handleWebSiteClick'},
                            {id: 6, text: '大微观点', selected: false},
                        ]
                    },
                    {
                        'name': 'twoBlogAll',
                        'title': '两微类型:',
                        'searchList': [
                            {id: 0, text: '全部', selected: true},
                            {id: 2, text: '微博', selected: false},
                            {id: 1, text: '微信', selected: false},
                        ]
                    },
                    {
                        'name': 'twoBlog',
                        'title': '两微类型:',
                        'searchList': [
                            {id: 0, text: '微博', selected: true},
                            {id: 1, text: '微信', selected: false},
                        ]
                    },
                    {
                        'name': 'emotion',
                        'title': '情感:',
                        'searchList': [
                            {id: 0, text: '不限', selected: true},
                            {id: 1, text: '正面', selected: false},
                            {id: 2, text: '负面', selected: false},
                            {id: 3, text: '中性', selected: false}
                        ]
                    },
                    {
                        'name': 'publishDateTime',
                        'title': '时间:',
                        'searchList': [
                            {id: 0, text: '不限', selected: true},
                            {id: 1, text: '今天', selected: false},
                            {id: 2, text: '昨天', selected: false},
                            {id: 3, text: '近7天', selected: false},
                            {id: 4, text: '近一个月', selected: false},
                            {id: 5, text: '自定义时间', dateBox: 'show', selected: false}
                        ],
                        'hasDateBox': true
                    },
                    {
                        'name': 'province',
                        'title': '选择区域:',
                        'searchList': Object.assign(provinces)
                    }
                ],
                webSites: [
                    {value: '新浪教育', text: '新浪教育'},
                    {value: '腾讯教育', text: '腾讯教育'},
                    {value: '搜狐教育', text: '搜狐教育'},
                    {value: '网易教育', text: '网易教育'}
                ],
                showWebSites: false
            }
        },
        methods:{
            searchLiClick(item, index, data){
                for (var i  in data.searchList) {
                    data.searchList[i].selected = false;
                }
                item.selected = true;
                
                if(item.clickEvent && item.clickEvent == 'handleProvinceClick'){
                    this.showCollege = false;
                    this.showWebSites = false;

                    this.provinces[0].selected = true;
                    this.showProvince = true;

                }else if(item.clickEvent && item.clickEvent == 'handleCollegeClick'){
                    this.showProvince = false;
                    this.showWebSites = false;

                    this.showCollege = true;
                }else if(item.clickEvent && item.clickEvent == 'handleWebSiteClick'){
                    this.showCollege = false;
                    this.showProvince = false;

                    this.showWebSites = true;
                }else {
                    this.showCollege = false;
                    this.showProvince = false;
                    this.showWebSites = false;
                }
            },

            judgeHeight(){
                this.$nextTick(function () {
                    $('.publicSearch .el-row').each(function (index) {
                        if($(this).find('ul').height() > 47){
                            let height = $(this).height();
                            $(this).find('.el-col').height(height);
                        }
                    })
                });
            },

            showCollegeEvent(item){
                console.log(item)
                $('#college-list').empty();
                var options = item.options;
                if(options){
                    var li = '';
                    for(var i in options){
                        li = li + '<li class="search-list">' + options[i].label + '</li>';
                    }

                    $('#college-list').append(li);
                }else {
                    //
                    if(item.label == '全部'){
                        //特殊处理搜索全部
                    }
                }
            },

            //动态搜索框的高度计算
            resetDynamicHeight(id){

            }
        },
        props: ["searchNames"],
        mounted(){
            //处理省份数据
            let provinceData = Object.assign(provinces, provinceData);
            if(provinceData[0].text != '全部'){
                provinceData.unshift(  {"value": "全部", "text": "全部"});
            }
            this.provinces = provinceData;

            //高校拼音前加全部
            if(this.colleges[0].label != '全部'){
                this.colleges.unshift({label: '全部'});
            }

            //动态选择框插入搜索框第二的位置
            this.$nextTick(function () {
               $('#dynamicDiv').insertAfter('.publicSearch .el-row:first');
            });

            //
            this.judgeHeight();
            console.log(this.colleges);
        }
    }
</script>