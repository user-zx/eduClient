
import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/table/tran-table.css.scss";
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/pagination/pagination.scss";
export default{
	data(){
		return {
			msg:"舆情规则",
			activeName: 'first',
			tableData: [{
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄',
	            receive:'张三,李四',
	            state: true,
	          }, {
	            date: '2016-05-04',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1517 弄',
	             receive:'张三,李四',
	               state:false,
	          }, {
	            date: '2016-05-01',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1519 弄',
	             receive:'张三,李四',
	              state:false,
	          }, {
	            date: '2016-05-03',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1516 弄',
	             receive:'张三,李四',
	              state:false,
	          }],
	        input2: '',
	        currentPage_rules:1,
	        currentPage_manage:1,
	         dialogFormVisible: false,
        form: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '', 
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: '',
	          recipient:'',
	          word:'',
	          person:'',
	          WeChat:'',
	          microblog:'',
      	  },
           formLabelWidth: '120px',
           dialogVisible: false,
           labelPosition: 'right',
           formLabelAlign: {
          	 name: '',
         	 phone: '',
          	 mailbox: ''
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
      	handleEdit(index, row) {
        	console.log(index, row);
      	},
	    handleDelete(index, row) {
	        console.log(index, row);
	    },
	    handleIconClick(ev) {
      		console.log(ev);
   		},
   		handleSizeChange_rules(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange_rules(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      handleSizeChange_manage(val) {
        console.log(`每页 ${val} 条`);
      }, 
      handleCurrentChange_manage(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },

	},
	created(){
        this.setBreadCrumb();
    },
	components:{breadCrumb}
}