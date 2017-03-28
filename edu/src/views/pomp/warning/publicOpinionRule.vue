<template>
	<div class="publicOpinionRule">
		 <bread-crumb></bread-crumb>
		 <div class="search_div">
		 	 <el-input
				 placeholder="输入关键字进行查找"
				 icon="search"
				 v-model="input2"
				 :on-icon-click="handleIconClick"
				 span="12"
				 :offset="6"
				 class="grid-content bg-purple">
			</el-input>
			 <el-button type="primary" class="search_div_button">添加规则</el-button>
		 </div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="预警规则" name="first">
			    	<el-table
					      :data="tableData"
					      border
					      style="width: 100%"
					      class="tran-table"
					      :show-overflow-tooltip="true">
					      <el-table-column
					      	align="center"
					        prop="date"
					        label="规则名称"
					        width="180">
					      </el-table-column>
					      <el-table-column
					       align="center"
					        prop="name"
					        label="创建时间"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        align="center"
					        prop="address"
					        label="预警方式">
					      </el-table-column>
					       <el-table-column
					       	align="center"
					        prop="receive"
					        label="预警接收人">
					      </el-table-column>
					       <el-table-column
					       align="center"
					        label="状态">
					      <template scope="scope">
					       	 <el-switch
							  v-model="scope.row.state"
							  on-text="启用"
							  off-text="禁用">
							 </el-switch>
					      </template>
					      </el-table-column>
					       <el-table-column
					        align="center"
					        label="操作">
					       <template scope="scope">
					        <el-button
					          size="small"
					          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="small"
					          type="danger"
					          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					      </template>
					      </el-table-column>
				    </el-table>
				     <div class="block pagination">
					    <el-pagination
					      @size-change="handleSizeChange_rules"
					      @current-change="handleCurrentChange_rules"
					      :current-page="currentPage_rules"
					      :page-size="100"
					      layout="prev, pager, next, jumper"
					      :total="1000"
					      align="right">
					    </el-pagination>
  					</div>
		    </el-tab-pane>
		    <el-tab-pane label="预警接收人管理" name="second">
		    		<el-table
					      :data="tableData"
					      border
					      style="width: 100%"
					      class="tran-table"
					      :show-overflow-tooltip="true">
					      <el-table-column
					      	align="center"
					        prop="date"
					        label="规则名称"
					        width="180">
					      </el-table-column>
					      <el-table-column
					       align="center"
					        prop="name"
					        label="创建时间"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        align="center"
					        prop="address"
					        label="预警方式">
					      </el-table-column>
					       <el-table-column
					       	align="center"
					        prop="receive"
					        label="预警接收人">
					      </el-table-column>
					       <el-table-column
					       align="center"
					        label="状态">
					      <template scope="scope">
					       	 <el-switch
							  v-model="scope.row.state"
							  on-text="启用"
							  off-text="禁用">
							 </el-switch>
					      </template>
					      </el-table-column>
					       <el-table-column
					        align="center"
					        label="操作">
					       <template scope="scope">
					        <el-button
					          size="small"
					          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="small"
					          type="danger"
					          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					      </template>
					      </el-table-column>
				    </el-table>
				     <div class="block pagination">
					    <el-pagination
					      @size-change="handleSizeChange_manage"
					      @current-change="handleCurrentChange_manage"
					      :current-page="currentPage_manage"
					      :page-size="100"
					      layout="prev, pager, next, jumper"
					      :total="1000"
					      align="right">
					    </el-pagination>
  					</div>
		    </el-tab-pane>
  		</el-tabs>
  		
	</div>
</template>
<script src="./script/publicOpinionRule"></script>
<style lang="scss" > 
	.publicOpinionRule{
		
		.el-tabs__item:hover{
			color: #e4f09e; 
		} 
		.el-tabs__item.is-active{
			color: #e4f09e;
		}
		.el-tabs__header{
			border: 0 
		}
		.search_div{
			position: relative; 
		}
		.el-input{
			position: absolute;
			width: 30%;
			right: 130px;
			top: auto; 
			z-index: 999; 
		}
		.search_div_button{
			position: absolute;
			right: 25px;
			z-index: 999;
		}
		.pagination{
			margin-top: 20px; 
		}
	} 
	
</style>