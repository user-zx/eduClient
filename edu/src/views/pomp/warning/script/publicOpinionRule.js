
import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/table/tran-table.css.scss";
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/pagination/pagination.scss";
export default{
	data(){
        let userPhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else {
                let reg = /^1(3|4|5|7|8)\d{9}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                }
                callback();
            }
        };
		return {
			loading1: false,
			loading2: false,
            receivers: [],

			msg:"舆情规则",
			activeName: 'first',
			tableData1: [],
            tableData2: [],
            total1: 0,
            total2: 0,
            input1: '',
	        input2: '',

            form1Title: '添加',
			dialogFormVisible: false,
        	form: {
                warnName: '',
                emotion: [],
                vector: [],
                keyword: '',
                receiverIds: [],
                personages: '',
                weboNumbers: '',
                wechatNumbers: ''
      	  	},
            rule1s: {
                warnName: [
                    {required: true, message: "请输入规则名称", trigger: 'blur'},
                    {min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: 'blur'},
                ],
                emotion: [
                    {type: 'array', required: true, message: '请至少选择一个情感', trigger: 'change'}
                ],
                vector: [
                    {type: 'array', required: true, message: "请至少选择一个载体", trigger: 'change'}
                ],
                keyword: [
                    {required: true, message: "请输入事件关键词", trigger: 'blur'}
                ],
                receiverIds: [
                    {type: 'array', required: true, message: "请至少选择一个接收人", trigger: 'change'}
                ]
            },
			form2Title: '添加',
			formLabelWidth: '120px',
			dialogVisible: false,
			labelPosition: 'right',
           	formLabelAlign: {
                receiveName: '',
                receiveTel: '',
                receiveEmail: ''
        	},
            rule2s:{
                receiveName:[
                    {required:true,message:"请输入姓名",trigger: 'blur' },
                    {min:2,max:10,message:"长度在 2 到 10 个字符",trigger: 'blur' },
                ],
                receiveTel:[
                    {required:true,message:"请输入手机号",trigger: 'blur' },
                    {validator: userPhone,trigger: 'blur' },
                ],
                receiveEmail:[
                    {required:true,message:"请输入邮箱",trigger: 'blur' },
                    {type: "email",message:"请输入正确的邮箱",trigger: 'blur' },
                ]
            },
			param1: {
                pageNumber: 0,
                pageSize: 10
			},
			param2: {
				pageNumber: 0,
				pageSize: 10
			}
		}
	},
	methods:{
		setBreadCrumb(){
             /*设置面包屑*/
            let breadcrumb=[
                {
                    name:"舆情管理",to:{path:"/home/panorama"}
                },
                {
                    name:"舆情预警",to:{path:"/home/warning"}
                },
                {
                	name:"舆情规则",to:{path:"/home/publicOpinionRule"}
                }
            ];
            this.$store.commit("setBreadCrumb",breadcrumb);
        },
        handleClick(tab, event) {
			console.log(tab, event);
      	},
	    handleIconClick(ev) {
      		console.log(ev);
   		},
   		handleSizeChange_rules(val) {
			console.log(`每页 ${val} 条`);
      	},
		handleCurrentChange_rules(val) {
            this.param1.pageNumber = val - 1;
            this.getRuleList();
		},
      	handleCurrentChange_manage(val) {
        	this.param2.pageNumber = val - 1;
        	this.getReceiverList();
      	},
        getRuleList() {
            this.loading1 = true;
            this.$http.post('/apis/opinionWarn/getWarnRule.json', this.param1).then((response) => {
                	for (let i = 0; i < response.data.data.content.length; i++) {
                        response.data.data.content[i].isWarn = response.data.data.content[i].warnStatus == 0 ? true : false;
					}
                    this.tableData1 = response.data.data.content;
                    this.total1 = response.data.data.totalElements;
                    this.loading1 = false;
                }, (response) => {
                    console.error(response);
                    this.loading1 = false;
                    return false;
                }
            );
        },
        editRule(index, row) {
            this.form1Title = '编辑';
            this.form = jQuery.extend({}, row);
            this.form.emotion = row.emotion.split(",");
            this.form.vector = row.vector.split(",");
            this.form.receiverIds = [];
            let receiverIds = row.receiverIds.split(",");
            for (let i = 0; i < receiverIds.length; i++) {
                this.form.receiverIds.push(parseInt(receiverIds[i]));
			}
            this.dialogFormVisible = true;
        },
        deleteRule(index, row) {
            this.$confirm('是否删除该规则', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete('/apis/opinionWarn/deleteWarnRule.json/' + row.id).then((response) => {
                        if (response.data.success) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.param1.pageNumber = 0;
                            this.getRuleList();
                        } else {
                            console.error(response.data.message);
                            return false;
                        }
                    }, (response) => {
                        console.error(response);
                        return false;
                    }
                );
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addRule(formName) {
            this.form1Title = "添加";
			this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs[formName].resetFields();
            });
        },
        saveOrUpDateRule(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let form = jQuery.extend({}, this.form);
                    form.emotion = form.emotion.join(",");
                    form.vector = form.vector.join(",");
                    form.receiverIds = form.receiverIds.join(",");
                    this.$http.post('/apis/opinionWarn/saveOrUpdateWarnRule.json', form).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: this.form1Title + '成功',
                                    type: 'success'
                                });
                                this.dialogFormVisible = false;
                                this.param1.pageNumber = 0;
                                this.getRuleList();
                            } else {
                                this.$message({
                                    message: '名称不能重复',
                                    type: 'error'
                                });
                                return;
                            }
                        }, (response) => {
                            console.error(response);
                            return false;
                        }
                    );
                } else {
                    this.$message({message:'校验失败!',type:"error"});
                    return false;
                }
            });
        },
        getAllReceiverList() {
            this.$http.post('/apis/opinionWarn/getWarnReceiver.json', {pageNumber: 0, pageSize: 1000}).then((response) => {
                    this.receivers = response.data.data.content;
                }, (response) => {
                    console.error(response);
                }
            );
        },

        getReceiverList() {
			this.loading2 = true;
            this.$http.post('/apis/opinionWarn/getWarnReceiver.json', this.param2).then((response) => {
            		this.tableData2 = response.data.data.content;
                    this.total2 = response.data.data.totalElements;
                    this.loading2 = false;
                }, (response) => {
                    console.error(response);
                	this.loading2 = false;
                    return false;
                }
            );
            this.getAllReceiverList();
		},
        editReceiver(index, row) {
            this.form2Title = '编辑';
            this.formLabelAlign = jQuery.extend({}, row);
            this.dialogVisible = true;
        },
        deleteReceiver(index, row) {
            this.$confirm('是否删除该接收人', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete('/apis/opinionWarn/deleteWarnReceiver.json/' + row.id).then((response) => {
                        if (response.data.success) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.param2.pageNumber = 0;
                            this.getReceiverList();
                        } else {
                            console.error(response.data.message);
                            return false;
                        }
                    }, (response) => {
                        console.error(response);
                        return false;
                    }
                );
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addReceiver(formName) {
			this.form2Title = "添加";
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs[formName].resetFields();
			});
		},
        saveOrUpDateReceiver(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('/apis/opinionWarn/saveOrUpdateWarnReceiver.json', this.formLabelAlign).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: this.form2Title + '成功',
                                    type: 'success'
                                });
                                this.dialogVisible = false;
                                this.param2.pageNumber = 0;
                                this.getReceiverList();
                            } else {
                                this.$message({
                                    message: response.data.message,
                                    type: 'error'
                                });
                                return;
                            }
                        }, (response) => {
                            console.error(response);
                            return false;
                        }
                    );
                } else {
                    this.$message({message:'校验失败!',type:"error"});
                    return false;
                }
            });
		},
        formatCreateDate(row, col) {
            return new Date(row.createDate).format('yyyy-MM-dd hh:mm:ss');
        },
        switchChange(index, row) {
			let form = jQuery.extend({}, row);
			form.warnStatus = form.isWarn ? 0 : 1;
			this.$http.post('/apis/opinionWarn/saveOrUpdateWarnRule.json', form).then((response) => {
					if (!response.data.success) {
						this.$message({message:'更新失败',type:"error"});
						row.isWarn = !row.isWarn;
					}
				}, (response) => {
					console.error(response);
				}
			);
		}
	},
	created(){
        this.setBreadCrumb();
    },
	mounted() {
        this.getReceiverList();
		this.getRuleList();
	},
	components:{breadCrumb}
}