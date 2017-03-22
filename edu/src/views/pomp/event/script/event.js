/**
 * Created by zhangxin on 2017/3/22.
 */
/*
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */
import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/pagination/pagination.scss";
import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
export default{
    data(){
        return {
            tableData:[
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉中子",
                    eventState:"已过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
                {
                    eventName:"中资企业在缅甸遭冲击，中国使馆交涉",
                    eventState:"未过期"
                },
            ],
            loading:true,
            currentPage: 1,
            dialogFormVisible: false,
            addEventForm: {
                name: '',
                startDate: '',
                endDate: '',
                keyword: '',
                people: '',
                weChat: '',
                weibo: '',
            },
            formLabelWidth: '120px'
        }
    },
    components:{breadCrumb} ,
    methods:{
        setBreadCrumb(){
            let breadcrumb=[
                {
                    name:"舆情管理",to:{path:"/home/panorama"}
                },
                {
                    name:"事件监测",to:{path:"/home/speech"}
                }
            ];
            this.$store.commit("setBreadCrumb",breadcrumb);
        },
        deleteRow(index, rows) {
            this.$confirm('是否删除该事件', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rows.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        }
    },
    created(){
        this.setBreadCrumb();
    },
    mounted(){
        let vm =this;
        setTimeout(()=>{
            vm.loading=false;
        },3000)
    }
}
