/**
* Created by lifei on 2017/3/21.
*/
<template>
    <div class="search-box">
        <el-row v-for="(data, index) in searchData" v-if="searchNames.indexOf(data.name) != -1">
            <el-col :span="2" class="transition">
                {{data.title}}
            </el-col>
            <el-col :span="22" v-if="!data.buttons || data.buttons.length == 0" class="transition">
                <ul>
                    <li v-for="(item, index1) in data.searchList" class="search-list" :key="item.id"
                        @click="searchLiClick(item, index1, data)" :class="{'search-selected': item.selected}" v-if="item.text != ''">
                        {{item.text}}
                    </li>
                    <li class="search-list date-search-li" v-show="show" v-for="item in data.searchList" v-if="item.dateBox == 'show'">
                        <el-date-picker v-model="publishDate" type="daterange" placeholder="选择日期范围" @change="publishDateChange" range-separator=" 至 ">
                        </el-date-picker>
                    </li>
                    <li class="search-list date-search-li" v-for="item in data.searchList" v-else-if="item.dateBox == 'exact'">
                        <el-date-picker type="date" placeholder="选择日期" v-model="exactDate" @change="exactDateChange">
                        </el-date-picker>
                    </li>
                    <li class="search-list date-search-li" v-for="item in data.searchList" v-else-if="item.dateBox == 'selectDate'">
                        <el-date-picker type="date" placeholder="选择日期" v-model="selectDate" @change="selectDateChange"
                                        :picker-options="pickerOptions" :clearable="false">
                        </el-date-picker>
                    </li>
                </ul>
            </el-col>
            <el-col :span="20" v-else class="transition">
                <ul :class="{'school-list': data.hasMore}">
                    <li class="search-list" v-for="(item, index1) in data.searchList"
                        @click="searchLiClick(item, index1, data)" :class="{'search-selected': item.selected}">
                        {{item.text}}
                    </li>
                    <li class="search-list" v-if="data.hasMore == true" v-show="foldSchool">
                        <i class="el-icon-arrow-down pointer" v-on:click="foldSchoolClick"></i>
                    </li>
                </ul>
            </el-col>
            <el-col :span="2" v-for="btn in data.buttons" class="transition">
                <el-button type="primary" @click="btnClick(data,$event)">{{btn.buttonText}}</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .search-box {
        margin-bottom: 10px;
        color: #333;
        background: #fff;
        &.dark{
            background-color: #21273d;
            color:#d0d7ff;
            .el-row{
                .el-col{
                    border-bottom: 1px solid rgba(96,163,255,.1);
                    &:first-child {
                         background: rgba(25,28,45,.32);
                         padding-left: 20px;
                    }
                }
            }
         }
        .el-row {
            .el-col {
                border-bottom: 1px solid #d6d6d6;
                line-height: 40px;
                overflow: hidden;

                &:first-child {
                     background: #e6e6e6;
                     padding-left: 20px;
                 }

                 ul{
                     position: relative;

                    .search-list {
                        display: inline-block;
                        text-align: center;
                        padding-left: 15px;
                        padding-right: 15px;
                        cursor: pointer;
                        height: 40px;
                        min-width: 40px;
                    }

                    .date-search-li{
                        position: absolute;
                        padding-top: 2px;
                    }
                 }
            }
            .school-list {
                position: relative;
                li {
                    display: inline-block;
                    .sub-list {
                        display: none;
                    }

                }
            }
        }
        .el-icon-arrow-down {
            position: absolute;
            top: 16px;
            right: 15px;
        }
        .search-selected {
            color: #60a3ff;
        }
        .transition{
            transition: 0.5s;
            -moz-transition: 0.5s; /* Firefox 4 */
            -webkit-transition: 0.5s; /* Safari 和 Chrome */
            -o-transition: 0.5s; /* Opera */
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                searchData:[
                    {
                        'name': 'university',
                        'title' :  '选择高校:',
                        'searchList': [
                            {id: 0, text: '全部', selected: true},
                        ],/*
                        'hasMore': true,
                        'buttons': [
                            {'buttonText': '添加高校', 'id': 'add-college-btn'}
                        ]*/
                    },
                    {
                        'name': 'reportPersonage',
                        'title' :  '选择人物:',
                        'searchList': [
                            {id: 0, text: '全部', selected: true},
                        ],/*
                        'hasMore': true,
                        'buttons': [
                            {'buttonText': '添加人物', 'id': 'add-person-btn'}
                        ]*/
                    },
                    {
                        'name': 'dimension',
                        'title': '高校维度:',
                        'searchList': [
                            {id: 0, text: '校园舆情', selected: true, showCharacter: false},
                            {id: 1, text: '校园安全', selected: false, showCharacter: false},
                            {id: 2, text: '违规违纪', selected: false, showCharacter: false},
                            {id: 3, text: '媒体报道', selected: false, showCharacter: false},
                            {id: 4, text: '人才培养', selected: false, showCharacter: false},
                            {id: 5, text: '科学研究', selected: false, showCharacter: false},
                            {id: 6, text: '微信微博', selected: false, showCharacter: false},
                            {id: 7, text: '论坛贴吧', selected: false, showCharacter: false},
                            {id: 8, text: '敏感时期', selected: false, showCharacter: false},
                            {id: 9, text: '人物聚焦', selected: false, showCharacter: true}
                        ]
                    },
                    {
                        'name': 'vector',
                        'title': '载体:',
                        'searchList': [
                            {id: 0, text: '不限', selected: true},
                            {id: 1, text: '论坛', selected: false},
                            {id: 2, text: '微博', selected: false},
                            {id: 3, text: '微信', selected: false},
                            {id: 4, text: 'QQ群', selected: false},
                            {id: 5, text: '博客', selected: false},
                            {id: 6, text: '网站门户', selected: false},
                            {id: 7, text: '贴吧', selected: false},
                            {id: 8, text: '新闻', selected: false}
                        ]
                    },
                    {
                        'name': 'emotion',
                        'title': '情感:',
                        'searchList': [
                            {id: 0, text: '不限', selected: true},
                            {id: 1, text: '正面', selected: false},
                            {id: 2, text: '负面', selected: false}
                        ]
                    },{
                        'name': 'officialAcctType',
                        'title': '公众号类型:',
                        'searchList': [
                            {id: 0, text: '不限', selected: true},
                            {id: 1, text: '生活服务', selected: false},
                            {id: 2, text: '运动', selected: false},
                            {id: 3, text: '教学', selected: false},
                            {id: 4, text: '情感', selected: false},
                            {id: 5, text: '政务', selected: false},
                            {id: 6, text: '社团', selected: false},
                            {id: 7, text: '科研', selected: false},
                            {id: 8, text: '其他', selected: false},
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
                        'name': 'type',
                        'title': '类型:',
                        'searchList': [
                            {id:0, text: '全部', selected: true},
                            {id:1, text: '生活服务', selected: false},
                            {id:2, text: '运动', selected: false},
                            {id:3, text: '社团', selected: false},
                            {id:4, text: '科研', selected: false},
                            {id:5, text: '教学', selected: false},
                            {id:6, text: '情感', selected: false},
                            {id:7, text: '政务', selected: false},
                            {id:8, text: '其他', selected: false},
                        ]
                    },
                    {
                        'name': 'verified',
                        'title': '认证情况:',
                        'searchList': [
                            {id: 0, text: '全部', selected: true},
                            {id: 1, text: '已认证', selected: false},
                            {id: 2, text: '未认证', selected: false}
                        ],
                    },
                    {
                        'name': 'exactDate',
                        'title': '日期:',
                        'searchList': [{id: 0, text: '', dateBox: 'exact'}]
                    },
                    {
                        'name': 'selectDate',
                        'title': '选择日期:',
                        'searchList': [{id: 0, text: '', dateBox: 'selectDate'}]
                    }
                ],
                msg: "",
                show: false,
                publishDate: [],
                foldSchool: false,
                exactDate: '',
                selectDate: new Date(Date.now() - 8.64e7),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    }
                }
            }
        },
        components: {},
        methods: {
            add() {
                let vm = this;
                this.$nextTick(function () {
                    if($('.school-list').height() > 50){
                        this.foldSchool = true;
                    }
                });
            },

            searchLiClick (item, index1, data) {
                for (var i  in data.searchList) {
                    data.searchList[i].selected = false;
                }
                item.selected = true;

                if (data.hasDateBox == true && !item.dateBox) {
                    this.show = false;
                }

                if (item.dateBox == 'show') {
                    this.show = true;
                }

                if (data.name === 'publishDateTime') {
                    if (item.text === '自定义时间') {
                        //如果是自定义时间，触发回调放在控件的change中
                        return;
                    } else {
                        this.publishDate = [];
                    }
                }

                // searchDataChange回调
                this.$emit('searchDataChange', this.buildParam());
            },

            foldSchoolClick() {
                if ($('.school-list .el-icon-arrow-down').hasClass('el-icon-arrow-up')) {
                    $('.el-icon-arrow-down').removeClass('el-icon-arrow-up');
                    $('.school-list').closest('div.el-row').children().each(function (index) {
                        $(this).height(50);
                    });
                } else {
                    $('.school-list .el-icon-arrow-down').addClass('el-icon-arrow-up');
                    var height = $('.school-list').height();
                    $('.school-list').closest('div.el-row').children().each(function (index) {
                        $(this).height(height);
                    });
                }
            },

            btnClick(item,el) {
                let vm  = this;
                let elVal = $(el.target).html();
                switch(elVal) {
                    case "预警设置":
                        vm.$router.push({path:"/home/publicOpinionRule"});
                        break;
                }
            },
            /**日历控件改变*/
            publishDateChange() {
                if (this.publishDate.length > 0) {
                    this.$emit('searchDataChange', this.buildParam());
                }
            },
            /**获取用户设置信息*/
            getUserParams() {
                this.$http.post('/apis/user/getUnivsAndPersonage.json').then(
                    (response) => {
                        
                        if (response.data.success) {
                            let univs = response.data.data.univs;
                            for (var i = 0; i < univs.length; i++) {
                                this.searchData[0].searchList.push({id: i + 1, text: univs[i], selected: false})
                            }
                            let persons = response.data.data.persons;
                            for (var i = 0; i < persons.length; i++) {
                                this.searchData[1].searchList.push({id: i + 1, text: persons[i], selected: false})
                            }
                        } else {
                            console.error(response.data.message);
                        }
                        
                        let dimension = this.$route.query.dimension;
                        if (dimension) {
                            for (let i  in this.searchData[2].searchList) {
                                if (this.searchData[2].searchList[i].text == dimension){
                                    this.searchData[2].searchList[i].selected = true;
                                } else {
                                    this.searchData[2].searchList[i].selected = false;
                                }
                            }
                        }
                        
                        let university = this.$route.query.university;
                        if (university && university.length > 0) {
                            for (let i  in this.searchData[0].searchList) {
                                if (this.searchData[0].searchList[i].text == university){
                                    this.searchData[0].searchList[i].selected = true;
                                } else {
                                    this.searchData[0].searchList[i].selected = false;
                                }
                            }
                        }

                        this.judgeHeight();
                        // 参数加载完毕回调
                        this.$emit('onload', this.buildParam());
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**构建参数对象*/
            buildParam() {
                let result = {};
                let searchData = this.searchData;
                let searchNames = this.searchNames;

                loop: for (var i = 0; i < searchNames.length; i++) {
                    var name = searchNames[i];
                    for (var j = 0; j < searchData.length; j++) {
                        if (searchData[j].name === name) {
                            var searchList = searchData[j].searchList;
                            for (var k = 0; k < searchList.length; k++) {
                                if (searchList[k].selected) {
                                    var text = searchList[k].text;
                                    if (name === 'university') {
                                        var univs = [];
                                        if (text != '全部') {
                                            univs.push(text);
                                        }
                                        result[name] = univs;
                                        break;
                                    }
                                    if (text === '不限') {
                                        break;
                                    }

                                    if (name === 'publishDateTime') {

                                        var publishDateTime = {};
                                        var startSuffix = " 00:00:00";
                                        var endSuffix = " 23:59:59";
                                        var format = 'yyyy-MM-dd';

                                        if (text === '自定义时间') {
                                            if (this.publishDate[0]) {
                                                publishDateTime.startDate = this.publishDate[0].format(format) + startSuffix;
                                            }
                                            if (this.publishDate[1]) {
                                                publishDateTime.endDate = this.publishDate[1].format(format) + endSuffix;
                                            }
                                        } else {
                                            var now = new Date();
                                            var nowDate = now.format(format);
                                            var oneDayMills = 1000 * 60 * 60 * 24;
                                            if (text === '今天') {
                                                publishDateTime.startDate = nowDate + startSuffix;
                                                publishDateTime.endDate = nowDate + endSuffix;
                                            }
                                            if (text === '昨天') {
                                                var date = new Date(now.getTime() - oneDayMills).format(format);
                                                publishDateTime.startDate = date + startSuffix;
                                                publishDateTime.endDate = date + endSuffix;
                                            }
                                            if (text === '近7天') {
                                                var date = new Date(now.getTime() - oneDayMills * 7).format(format);
                                                publishDateTime.startDate = date + startSuffix;
                                                publishDateTime.endDate = nowDate + endSuffix;
                                            }
                                            if (text === '近一个月') {
                                                var date = new Date(now.getTime() - oneDayMills * 30).format(format);
                                                publishDateTime.startDate = date + startSuffix;
                                                publishDateTime.endDate = nowDate + endSuffix;
                                            }

                                        }
                                        result['startDate'] = publishDateTime.startDate;
                                        result['endDate'] = publishDateTime.endDate;
                                        break;
                                    }
                                    if (name === 'emotion') {
                                        if ('正面' == text) {
                                            result[name] = 'positive';
                                        } else if ('负面' == text) {
                                            result[name] = 'negative';
                                        }
                                        break;
                                    }
                                    result[name] = text;
                                    break;
                                }

                                if(this.exactDate != '' && this.exactDate != undefined && searchList[k].dateBox == 'exact'){
                                    var startSuffix = " 00:00:00";
                                    var endSuffix = " 23:59:59";
                                    var format = 'yyyy-MM-dd';
                                    result.startDate = this.exactDate.format(format) + startSuffix;
                                    result.endDate = this.exactDate.format(format) + endSuffix;
                                }

                                if(this.selectDate && searchList[k].dateBox == 'selectDate'){
                                    var startSuffix = " 00:00:00";
                                    var endSuffix = " 23:59:59";
                                    var format = 'yyyy-MM-dd';
                                    result.startDate = new Date(this.selectDate.getTime() - 8.64e7 * 30).format(format) + startSuffix;
                                    result.endDate = this.selectDate.format(format) + endSuffix;
                                } else if (searchList[k].dateBox == 'selectDate') {
                                    this.selectDate = new Date(Date.now() - 8.64e7);
                                    var startSuffix = " 00:00:00";
                                    var endSuffix = " 23:59:59";
                                    var format = 'yyyy-MM-dd';
                                    result.startDate = new Date(this.selectDate.getTime() - 8.64e7 * 30).format(format) + startSuffix;
                                    result.endDate = this.selectDate.format(format) + endSuffix;
                                }
                            }
                            continue loop;
                        }
                    }
                }
                return result;
            },
            /**
             * 精确搜索某天的日期控件改变
             */
            exactDateChange() {
                this.$emit('searchDataChange', this.buildParam());
            },
            selectDateChange() {
                if (this.selectDate) {
                    this.$emit('searchDataChange', this.buildParam());
                }

            },

            judgeHeight(){
                this.$nextTick(function () {
                    $('.search-box .el-row').each(function (index) {
                        if($(this).height() > 41){
                            let height = $(this).height();
                            $(this).find('.el-col').height(height);
                        }
                    })
                });
            }
        },
        mounted() {
            this.add();
            this.getUserParams();
            this.selectDate = new Date(Date.now() - 8.64e7);
            this.judgeHeight();
        },
        props: ["searchNames"],
    }
</script>