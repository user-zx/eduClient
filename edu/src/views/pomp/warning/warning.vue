/**
* Created by yu on 2017/3/16.
*/
<template>
         
    <div class="warning article-wrap" v-loading="loading" element-loading-text="加载中……">
        <bread-crumb></bread-crumb>
         <div id="search_container">
             <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange"></search-box>
         </div>
          <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer" @click="sort(0)">
                        阅读量<i class="arrow" :class="param.orders[0].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
                    </li>
                    <li class="pointer" @click="sort(1)">
                        时间<i class="arrow" :class="param.orders[1].direction == 'DESC' ? 'arrow-up' : 'arrow-down'"></i>
                    </li>
                </ul>
                <div class="content-bar-button">
                    <el-dropdown class="event-store-box" trigger="click">
                        <el-button type="primary" icon="plus" class="button-icon">
                            事件库
                        </el-button>
                        <el-dropdown-menu slot="dropdown" class="event-store-item">
                            <el-dropdown-item>事件1</el-dropdown-item>
                            <el-dropdown-item>事件2</el-dropdown-item>
                            <el-dropdown-item>事件3</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                   <!--  <el-button type="primary" icon="plus" class="button-icon">批量关注</el-button> -->
                </div> 
                <div class="content-bar-page">
                  <el-pagination class="edu-pagination"
                                 @current-change="handleCurrentChange"
                                 :current-page="param.pageNumber + 1"
                                 :page-size="param.pageSize"
                                 layout="prev, next, jumper, total"
                                 :total="total">
                  </el-pagination>
              </div>
            </div> 
            <article-container :articleData=articleData></article-container>
       		 <!--  <characterFocus v-show="showCharacterFocus"></characterFocus> -->
        </div>
    </div>
</template>

<script src="./script/warning.js">
</script> 