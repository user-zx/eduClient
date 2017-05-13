<template>
	<div class="publicOpinionRule">
		 <bread-crumb></bread-crumb>
		 
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="预警规则" name="first" v-loading="loading1" element-loading-text="加载中……">
					<div class="search_div">
					 	<!--
						<el-input
							 placeholder="输入关键字进行查找"
							 icon="search"
							 v-model="input1"
							 :on-icon-click="handleIconClick"
							 span="12"
							 :offset="6"
							 class="grid-content bg-purple">
						</el-input>
						-->
						 <el-button type="primary" class="search_div_button" @click="dialogFormVisible = true">添加规则</el-button>
					 </div>
			    	<el-table
					      :data="tableData1"
					      border
					      style="width: 100%"
					      class="tran-table"
					      :show-overflow-tooltip="true">
					      <el-table-column
					      	align="center"
					        prop="warnName"
					        label="规则名称"
					        width="180">
					      </el-table-column>
					      <el-table-column
					       align="center"
						   prop="createDate"
						   label="创建时间"
						   :formatter="formatCreateDate"
					        width="180">
					      </el-table-column>
					       <el-table-column
					       	align="center"
					        prop="receiverNames"
					        label="预警接收人">
					      </el-table-column>
					       <el-table-column
					       align="center"
					        label="状态">
					      <template scope="scope">
					       	 <el-switch
							  v-model="scope.row.isWarn"
							  on-text="启用"
							  off-text="禁用"
							 @change="switchChange(scope.$index, scope.row)">
							 </el-switch>
					      </template>
					      </el-table-column>
					       <el-table-column
					        align="center"
					        label="操作">
					       <template scope="scope">
					        <el-button
					          size="small"
					          @click="editRule(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="small"
					          type="danger"
					          @click="deleteRule(scope.$index, scope.row)">删除</el-button>
					      </template>
					      </el-table-column>
				    </el-table>
				    <div class="block pagination">
					     <el-pagination class="edu-pagination"
                                 @size-change="handleSizeChange_rules"
                                 @current-change="handleCurrentChange_rules"
                                 :current-page="param1.pageNumber + 1"
                                 :page-size="param1.pageSize"
                                 layout="prev, next, jumper, total"
                                 :total="total1">
                        </el-pagination>
  					</div>
		    </el-tab-pane>
		    <el-tab-pane label="预警接收人管理" name="second" v-loading="loading2" element-loading-text="加载中……">
		    		<div class="search_div">
						<!--
					 	 <el-input
							 placeholder="输入关键字进行查找"
							 icon="search"
							 v-model="input2"
							 :on-icon-click="handleIconClick"
							 span="12"
							 :offset="6"
							 class="grid-content bg-purple">
						</el-input>
						-->
						 <el-button type="primary" class="search_div_button" @click="addReceiver">添加接收人</el-button>
					 </div>
		    		<el-table
					      :data="tableData2"
					      border
					      style="width: 100%"
					      class="tran-table"
					      :show-overflow-tooltip="true">
					      <el-table-column
					      	align="center"
					        prop="receiveName"
					        label="预警接收人"
					        width="180">
					      </el-table-column>
					      <el-table-column
					       align="center"
					        prop="createDate"
					        label="创建时间"
					        width="180"
						   :formatter="formatCreateDate">
					      </el-table-column>
					      <el-table-column
					        align="center"
					        prop="receiveTel"
					        label="手机">
					      </el-table-column>
					       <el-table-column
					       	align="center"
					        prop="receiveEmail"
					        label="邮箱">
					      </el-table-column>
					       <el-table-column
					        align="center"
					        label="操作">
					       <template scope="scope">
					        <el-button
					          size="small"
					          @click="editReceiver(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="small"
					          type="danger"
					          @click="deleteReceiver(scope.$index, scope.row)">删除</el-button>
					      </template>
					      </el-table-column>
				    </el-table>
				     <div class="block pagination">
					    <el-pagination
					      class="edu-pagination"
					      @current-change="handleCurrentChange_manage"
					      :current-page="param2.pageNumber + 1"
					      :page-size="param2.pageSize"
					      layout="prev, next, jumper, total"
					      :total="total2"
					      align="right">
					    </el-pagination>
  					</div>
					
		    </el-tab-pane>
  		</el-tabs>
  		<el-dialog title="预警规则设置" v-model="dialogFormVisible">
			  <el-form :model="form" class="addRule_form" ref="ruleForm" :rules="rule1s">
				    <el-form-item label="规则名称" :label-width="formLabelWidth" prop="warnName">
				      <el-input v-model="form.warnName" auto-complete="off" placeholder="输入规则名称"></el-input>
				    </el-form-item>
				    <el-form-item label="文章属性" :label-width="formLabelWidth" prop="emotion">
						<el-checkbox-group v-model="form.emotion">
							<el-checkbox label="positive" name="emotion">正面</el-checkbox>
							<el-checkbox label="negative" name="emotion">负面</el-checkbox>
						</el-checkbox-group>
					 </el-form-item>
					 <el-form-item label="载体" :label-width="formLabelWidth" prop="vector">
					    <el-checkbox-group v-model="form.vector">
					      <el-checkbox label="论坛" name="vector"></el-checkbox>
					      <el-checkbox label="贴吧" name="vector"></el-checkbox>
					      <el-checkbox label="微信" name="vector"></el-checkbox>
					      <el-checkbox label="QQ群" name="vector"></el-checkbox>
					      <el-checkbox label="微博" name="vector"></el-checkbox>
					      <el-checkbox label="博客" name="vector"></el-checkbox>
					      <el-checkbox label="网站门户" name="vector"></el-checkbox>
					    </el-checkbox-group>
					  </el-form-item>
					  <el-form-item label="包含关键词" :label-width="formLabelWidth" prop="keyword">
				         <el-input v-model="form.keyword" auto-complete="off"  placeholder="多个,号隔开"></el-input>
				      </el-form-item>
				       <el-form-item label="相关人物" :label-width="formLabelWidth" prop="personages">
				         <el-input  v-model="form.personages" auto-complete="off"  placeholder="多个,号隔开"></el-input>
				      </el-form-item>
				      <el-form-item label="相关微信" :label-width="formLabelWidth" prop="wechatNumbers">
				         <el-input  v-model="form.wechatNumbers" auto-complete="off"  placeholder="多个,号隔开称"></el-input>
				      </el-form-item>
				      <el-form-item label="相关微博" :label-width="formLabelWidth" prop="weboNumbers">
				         <el-input  v-model="form.weboNumbers" auto-complete="off"  placeholder="多个,号隔开"></el-input>
				      </el-form-item>
				      <el-form-item label="预警接收人" :label-width="formLabelWidth" prop="receiverIds">
					    <el-checkbox-group v-model="form.receiverIds">
							<el-checkbox v-for="item in receivers" :label="item.id" name="vector">{{item.receiveName}}</el-checkbox>
   						</el-checkbox-group>
					 </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="saveOrUpDateRule('ruleForm')">确 定</el-button>
			  </div>
		</el-dialog>
		<el-dialog :title="form2Title + '接收人'" v-model="dialogVisible" size="tiny">
			 <el-form :label-position="labelPosition" ref="receiverForm" :rules="rule2s" label-width="80px" :model="formLabelAlign">
				  <el-form-item label="姓名" prop="receiveName">
				    <el-input v-model="formLabelAlign.receiveName" placeholder="请输入姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="手机" prop="receiveTel">
				    <el-input v-model="formLabelAlign.receiveTel" placeholder="手机号"></el-input>
				  </el-form-item>
				  <el-form-item label="邮箱" prop="receiveEmail">
				    <el-input v-model="formLabelAlign.receiveEmail" type="email" placeholder="请输入邮箱"></el-input>
				  </el-form-item>
			</el-form>
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="saveOrUpDateReceiver('receiverForm')">确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>
<script src="./script/publicOpinionRule.js"></script>
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