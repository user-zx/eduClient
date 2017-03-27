
import breadCrumb from '../../../../components/breadCrumb/breadCrumb.vue';

export default{
	data(){
		return {
			msg:"舆情规则",
			activeName: 'first',
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
	},
	created(){
        this.setBreadCrumb();
    },
	components:{breadCrumb}
}