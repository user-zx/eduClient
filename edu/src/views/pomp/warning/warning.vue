/**
* Created by yu on 2017/3/16.
*/
<template>
         
    <div class="warning article-wrap">
        <bread-crumb></bread-crumb>
         <div id="search-container">
             <search-box :searchData=searchData></search-box>
         </div>
          <div class="content">
            <div class="content-bar">
                <ul class="content-bar-list">
                    <li class="pointer">全部</li>
                    <li class="pointer arrow-up">
                        阅读量
                    </li>
                    <li class="pointer arrow-down">时间</li>
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
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 :current-page="currentPage"
                                 :page-size="10"
                                 layout="prev, next, jumper, total"
                                 :total="100">
                  </el-pagination>
              </div>
            </div> 
            <article-container :articleData=articleData v-show="showArticle"></article-container>
       		 <!--  <characterFocus v-show="showCharacterFocus"></characterFocus> -->
        </div>
    </div>
</template>

<script src="./script/warning.js">   
	
</script> 