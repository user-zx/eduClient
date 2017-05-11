<template>
    <div class="editCollege">
        <div class="top">
            <div class="item">
                选择您想关注的
                <span class="yellow">高校</span>
            </div>
            <div class="item">
                最多可添加
                <span class="yellow">{{addColleges}}</span>
                所高校
            </div>
        </div>
        <div class="bottom">
            <div class="box">
                <el-row>
                    <el-col :span="2">已选：</el-col>
                    <el-col :span="22" class="choose">
                        <el-tag
                          v-for="tag in tags"
                          :key="tag"
                          :type="tag.type"
                        >
                        {{tag.name}}
                        </el-tag>
                        <el-tag
                          v-for="tag in addTags"
                          :key="tag"
                          :closable="true"
                          :type="tag.type"
                          @close="closeChooseAdd(tag)"
                        >
                        {{tag.name}}
                        </el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="transition">选择省份：</el-col>
                    <el-col :span="22" class="transition">
                        <ul class="province-list">
                            <li class="list provinceActive" v-for="(item,index) in province" @click="selectProvince($event,'')" v-if="index==0">{{item}}</li>
                             <li class="list" v-for="(item,index) in province" @click="selectProvince($event,'')" v-if="index!=0">{{item}}</li>
                        </ul>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="transition">选择大学：</el-col>
                    <el-col :span="22" class="transition">
                        <ul>
                            <li class="list" v-for="item in collegeList"@click="addCollege(item)">{{item}}</li>
                        </ul>
                    </el-col> 
                    <el-col :span="3" :offset="21" class="transition">
                        <el-button type="primary" @click="getSelected" >保存</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .editCollege{
        background: #21273d;
        overflow: hidden;
        color: #d0d7ff;

        .top{
            margin: 50px 50px 73px 50px;
            font-size: 16px;

            .item{
                margin-bottom: 20px;
            }
        }

    .bottom{
        margin: 0 50px 250px 50px;

        .box{
            border:1px solid #3a598b;
        }

        .el-row{
            border-bottom: 1px solid #2e4064;
            .el-col{
                //height: 50px;
                line-height: 50px;
               // border-bottom: 1px solid #2e4064;
               // overflow: hidden;

                .province-list{
                    position: relative;

                    .el-icon-arrow-down {
                        position: absolute;
                        top: 16px;
                        right: 5px;
                    }
                }

                .list{
                    display: inline-block;
                    text-align: center;
                    padding-left: 15px;
                    padding-right: 15px;
                    cursor: pointer;
                }

                .el-button{
                    margin-left: 24px;
                }
            }

            .el-col-2{
                text-align: center;
               // background: #1b1f31;
            }
        }
    }

    .yellow{
        color: #e4f09e;
    }

    .list-selected {
        color: #60a3ff;
    }
    .transition{
        transition: 0.5s;
        -moz-transition: 0.5s; /* Firefox 4 */
        -webkit-transition: 0.5s; /* Safari 和 Chrome */
        -o-transition: 0.5s; /* Opera */
    }
    .choose{
        >span{
            margin-left: 10px; 
        }
    }
    .provinceActive{
        color: #20a0ff; 
     }
    }
</style>
<script>
    export default{
        data(){
            return {
                tableData: [
                    {name: '王小二', college: '清华大学', department: '哲学系', keyword: '时间相对论', count:　'2929292929'},
                ],
                province:["北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","香港","澳门","台湾"],
                selected:[],
                collegeList:[],
                collegeArr:[],
                tags:[],
                addTags:[],
                arr:[],
                addColleges:'',
            }
        },
        methods: {
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"高校管理"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            //获取不同省份的大学
            selectProvince(event,province){
                $(event.target).addClass('provinceActive').siblings().removeClass('provinceActive');
                if(event!=""){
                     province = event.target.innerText;
                }
                this.$http.post("/apis/user/getCollegeByArea.json",{area:province}).then((res)=>{
                    if(res.data.success){
                        this.collegeList = res.data.data;
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            //提交选好的大学
            getSelected(){
                let str = "";
                if(this.tags.length>this.addColleges||this.addTags.length>this.addColleges||this.tags.length+this.addTags.length>this.addColleges){
                    this.$message("已添加"+this.tags.length+"可添加"+(this.addColleges-this.tags.length)+"所高校")
                }else{
                    console.log(this.addTags);
                    for (let j in this.addTags) {
                        if(j==this.addTags.length-1){
                            str += this.addTags[j].name
                        }else{
                            str += this.addTags[j].name + ","
                        }
                    }
                        this.$http.post("/apis/user/setColleges.json",{colleges:str}).then((res)=>{
                        if(res.data.success){
                            this.selected = res.data.data;
                            this.$message("保存成功")
                            this.addTags = [];
                            this.tags = [];
                            this.getUserParams();
                        }
                    },(err)=>{
                        console.log(err);
                    })
                }
                 
            },
            //删除选中的大学
            closeChooseAdd(tag){
               this.addTags.splice(this.addTags.indexOf(tag), 1);
            },
            //添加大学
            addCollege(item){
               if(this.collegeArr.indexOf(item) == -1){
                    if(this.arr.indexOf(item)==-1){
                          this.arr.push(item);
                          this.addTags.push({name:item,type: 'primary'})
                    }
               }
            },
             /**获取用户设置信息*/
            getUserParams() {
                this.$http.post('/apis/user/getUnivsAndPersonage.json').then((res)=>{
                    if(res.data.success){
                        let arr = res.data.data.univs;
                        //es6数组去重
                         this.collegeArr = Array.from(new Set(arr));
                       for (let i in this.collegeArr) {
                         this.tags.push({name:this.collegeArr[i],type: 'primary'})
                       }
                    }
                 },(err)=>{
                    console.log(err);
                })
            }
             
        },
        mounted(){
            this.selectProvince("","北京");
            this.getUserParams();
            this.$http.post("/apis/user/getMemberInfo.json").then(res=>{
                    if(res.data.success){
                         this.addColleges = res.data.data.collegeNum;
                    }
            },err=>{
                    console.log(err);
            })
        },
        created(){  
            this.setBreadCrumb();
        }
    }
</script>