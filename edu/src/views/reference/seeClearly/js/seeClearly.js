  import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss"; 
  import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';
  import overview from '../overview.vue';
  export default{
        data(){
            return {
                msg:"两微洞察",
                activeName: 'first'
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
           handleClick(tab, event) {
                console.log(tab, event);
           },
           handleClick(tab, event) {
              console.log(tab, event);
          }
        },
        mounted(){
            
        },
        created(){
        this.setBreadCrumb();
       },
  }