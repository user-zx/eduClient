<template>
	<div class="publicOpinionRule">
		 <bread-crumb></bread-crumb>
		 
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="预警规则" name="first">
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
						 <el-button type="primary" class="search_div_button" @click="dialogFormVisible = true">添加规则</el-button>
					 </div>
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
					     <el-pagination class="edu-pagination"
                                 @size-change="handleSizeChange_rules"
                                 @current-change="handleCurrentChange_rules"
                                 :current-page="currentPage_rules"
                                 :page-size="10"
                                 layout="prev, next, jumper, total"
                                 :total="100">
                        </el-pagination>
  					</div>
		    </el-tab-pane>
		    <el-tab-pane label="预警接收人管理" name="second">
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
						 <el-button type="primary" class="search_div_button" @click="dialogVisible = true">添加接收人</el-button>
					 </div>
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
					      class="edu-pagination"
					      @size-change="handleSizeChange_manage"
					      @current-change="handleCurrentChange_manage"
					      :current-page="currentPage_manage"
					      :page-size="10"
					      layout="prev, next, jumper, total"
					      :total="100"
					      align="right">
					    </el-pagination>
  					</div>
					
		    </el-tab-pane>
  		</el-tabs>
  		<el-dialog title="收货地址" v-model="dialogFormVisible">
			  <el-form :model="form" class="addRule_form">
				    <el-form-item label="规则名称" :label-width="formLabelWidth">
				      <el-input v-model="form.name" auto-complete="off" placeholder="输入规则名称"></el-input>
				    </el-form-item>
				    <el-form-item label="文章属性" :label-width="formLabelWidth">
					    <el-radio-group v-model="form.resource">
					      <el-radio label="正面"></el-radio>
					      <el-radio label="负面"></el-radio>
   						</el-radio-group>
					 </el-form-item>
					 <el-form-item label="活动性质" :label-width="formLabelWidth">
					    <el-checkbox-group v-model="form.type">
					      <el-checkbox label="论坛" name="type"></el-checkbox>
					      <el-checkbox label="贴吧" name="type"></el-checkbox>
					      <el-checkbox label="微信" name="type"></el-checkbox>
					      <el-checkbox label="QQ群" name="type"></el-checkbox>
					      <el-checkbox label="微博" name="type"></el-checkbox>
					      <el-checkbox label="博客" name="type"></el-checkbox>
					      <el-checkbox label="网站门户" name="type"></el-checkbox>
					    </el-checkbox-group>
					  </el-form-item>
					  <el-form-item label="包含关键词" :label-width="formLabelWidth">
				         <el-input  type="textarea" v-model="form.word" auto-complete="off"  placeholder="多个关键词用,隔开"></el-input>
				      </el-form-item>
				       <el-form-item label="相关人物" :label-width="formLabelWidth">
				         <el-input  v-model="form.person" auto-complete="off"  placeholder="输入相关预警人物关键词/名称"></el-input>
				      </el-form-item>
				      <el-form-item label="相关微信" :label-width="formLabelWidth">
				         <el-input  v-model="form.WeChat" auto-complete="off"  placeholder="输入相关预警微信号关键词/名称"></el-input>
				      </el-form-item>
				      <el-form-item label="相关微博" :label-width="formLabelWidth">
				         <el-input  v-model="form.microblog" auto-complete="off"  placeholder="输入相关预警微博关键词/名称"></el-input>
				      </el-form-item>
				      <el-form-item label="预警接收人" :label-width="formLabelWidth">
					    <el-radio-group v-model="form.recipient">
					      <el-radio label="张仨"></el-radio>
					      <el-radio label="李思"></el-radio>
   						</el-radio-group>
					 </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  </div>
		</el-dialog>
		<el-dialog title="添加接收人" v-model="dialogVisible" size="tiny">
			 <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
				  <el-form-item label="姓名">
				    <el-input v-model="formLabelAlign.name"></el-input>
				  </el-form-item>
				  <el-form-item label="手机">
				    <el-input v-model="formLabelAlign.phone" ></el-input>
				  </el-form-item>
				  <el-form-item label="邮箱"> 
				    <el-input v-model="formLabelAlign.mailbox" type="email"></el-input>
				  </el-form-item>
			</el-form>
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		    </span>
		</el-dialog>
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
			top: -50px; 
			.el-input{
			position: absolute;
			width: 30%;
			right: 130px;
			top: auto; 
			z-index: 999; 
			}
		}
		.el-tabs__content{
			overflow: visible; 
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