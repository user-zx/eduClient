  import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss"; 
  import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
  import overview from '../overview.vue';
  export default{
        data(){
            return {
                msg:"两微洞察",
                activeName: 'informationAggregation',
                together: 'correlation',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                  }]
            }
        },
        components:{breadCrumb,overview},
        methods:{
            setBreadCrumb(){
             /*设置面包屑*/
            let breadcrumb=[
                 {
                    name:"情报内参",to:{path:"/home/industryNews"}
                },     
                {
                    name:"两微洞察",to:{path:"/home/seeClearly"}
                }
            ];
            this.$store.commit("setBreadCrumb",breadcrumb);
           }, 
           information(tab, event) {
                console.log(tab, event);
           },
           hotspot(tab, event) {
              console.log(tab, event);
          }
        },
        mounted(){
            
        },
        created(){
        this.setBreadCrumb();
       },
  }