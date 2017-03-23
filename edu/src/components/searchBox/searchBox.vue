/**
* Created by lifei on 2017/3/21.
*/
<template>
    <div class="search-box">
        <el-row v-for="(data, index) in searchData">
            <el-col :span="2" class="transition">
                {{data.title}}
            </el-col>
            <el-col :span="22" v-if="data.buttons.length == 0" class="transition">
                <ul>
                    <li v-for="(item, index1) in data.searchList" class="search-list"
                        @click="searchLiClick(item, index1, data)" :class="{'search-selected': item.selected}">
                        {{item.text}}
                    </li>
                    <li class="search-list date-span" v-show="show" v-for="item in data.searchList" v-if="item.dateBox == 'show'">
                        <el-date-picker v-model="value1" type="daterange" placeholder="选择日期范围">
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
                        <i class="el-icon-arrow-down pointer" v-on:click="subSearchItem"></i>
                    </li>
                </ul>
            </el-col>
            <el-col :span="2" v-for="btn in data.buttons" class="transition">
                <el-button type="primary" @click="btnClick(data)">{{btn.buttonText}}</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .search-box {
        margin-bottom: 10px;
        color: #333;

    .el-row {

    .el-col {
        background: #fff;
        height: 50px;
        border-bottom: 1px solid #d6d6d6;
        line-height: 50px;
        color: #333;

    .search-list {
        display: inline-block;
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
        cursor: pointer;
    }

    }

    .el-col:first-child {
        background: #e6e6e6;
        padding-left: 20px;
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
    export default{
        data(){
            return {
                msg: "",
                show: false,
                value1: '',
                foldSchool: false
            }
        },
        components: {},
        methods: {
            add(){
                let vm = this;
                this.$nextTick(function () {
                    if($('.school-list').height() > 50){
                        this.foldSchool = true;
                    }
                });
            },

            searchLiClick(item, index1, data){
                if(data.multiple == true){
                    if(item.selected == true){

                    }else{

                    }
                }else {
                    for(var i  in data.searchList){
                        data.searchList[i].selected = false;
                    }
                    item.selected = true;
                }

                if(data.hasDateBox == true && !item.dateBox){
                    this.show = false;
                }

                if(item.dateBox == 'show'){
                    this.show = true;
                }
            },

            subSearchItem(){
                if ($('.school-list .el-icon-arrow-down').hasClass('el-icon-arrow-up')) {
                    $('.el-icon-arrow-down').removeClass('el-icon-arrow-up');
                    $('.school-list').closest('div.el-row').children().each(function (index) {
                        $(this).height(50);
                    });
                } else {
                    $('.school-list .el-icon-arrow-down').addClass('el-icon-arrow-up');
                    var height = $('.school-list').height();
                    $('.school-list').closest('div.el-row').children().each(function (index) {
                        $(this).height(height)
                    });
                }
            },

            btnClick(item){
                console.log(item)
            }
        },
        mounted(){
            this.add();

        },
        props: ["searchData"],
    }
</script>