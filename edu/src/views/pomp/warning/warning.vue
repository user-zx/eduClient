/**
* Created by yu on 2017/3/16.
*/
<template>
         
    <div class="warning article-wrap" v-loading="loading" element-loading-text="加载中……">
        <bread-crumb></bread-crumb>
        <div class="btn-box text-right" style="margin-bottom: 10px;">
            <el-button type="primary" @click="warnSetting">预警设置</el-button>
        </div>
         <div id="search_container">
             <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange"></search-box>
         </div>
        <article-container :articleData=articleData :eventBtn="true" @onchange="pageChange" :total="total" ref="article"></article-container>
    </div>
</template>

<script src="./script/warning.js">
</script> 