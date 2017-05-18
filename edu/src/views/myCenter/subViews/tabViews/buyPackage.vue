/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="buyPackage">
        <div class="content-wrap">
            <div class="item" @click="selectPackage(1)">
                <div class="title blue">A套餐</div>
                <div class="top">
                    <div class="info">
                        <div class="tree blue">{{nameListA[0].name}}</div>
                        <div class="tree-node" v-for="item in nameListA[0].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox"> 
                                <el-checkbox v-model="checked"  disabled v-if="item.status"></el-checkbox>
                                <el-checkbox disabled v-else></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">{{nameListA[1].name}}</div>
                        <div class="tree-node" v-for="item in nameListA[1].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox">
                                 <el-checkbox v-model="checked"  disabled v-if="item.status"></el-checkbox>
                                <el-checkbox disabled v-else></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">{{nameListA[2].name}}</div>
                        <div class="tree-node" v-for="item in nameListA[2].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"  disabled v-if="item.status"></el-checkbox>
                                <el-checkbox disabled v-else></el-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="info">
                        可添加高校： <span class="blue">{{concernCollegeNum_a}}</span>
                    </div>
                    <div class="info">
                        可添加人物： <span class="blue">{{concernPersonNum_a}}</span>
                    </div>
                    <div class="info">
                        使用期限：<div class="input-wrap">
                            <el-select v-model="time_a_vla" placeholder="选择时间" @change="chnageTimeA">
                                <el-option
                                  v-for="item in options"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                          </el-select>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    应付金额： <span class="money">{{price.a}}</span>
                </div>
            </div>
            <div class="item" @click="selectPackage(2)">
                <div class="title blue">B套餐</div>
                <div class="top">
                    <div class="info" >
                        <div class="tree blue">{{nameListB[0].name}}</div>
                        <div class="tree-node" v-for="item in nameListB[0].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"  disabled v-if="item.status"></el-checkbox>
                                <el-checkbox disabled v-else></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">{{nameListB[1].name}}</div>
                        <div class="tree-node" v-for="item in nameListB[1].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"  disabled v-if="item.status"></el-checkbox>
                                <el-checkbox disabled v-else></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">{{nameListB[2].name}}</div>
                        <div class="tree-node" v-for="item in nameListB[2].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox">
                                <el-checkbox v-model="checked"  disabled v-if="item.status"></el-checkbox>
                                <el-checkbox disabled v-else></el-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="info">
                        可添加高校： <span class="blue">{{concernCollegeNum_b}}</span>
                    </div>
                    <div class="info">
                        可添加人物： <span class="blue">{{concernPersonNum_b}}</span>
                    </div>
                    <div class="info">
                        使用期限：<div class="input-wrap">
                            <el-select v-model="time_b_vla" placeholder="选择时间" @change="chnageTimeB">
                                <el-option
                                  v-for="item in options"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                          </el-select>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    应付金额： <span class="money">{{price.b}}</span>
                </div>
            </div>
            <div class="item" @click="selectPackage(3)">
                <div class="title blue">C套餐</div>
                <div class="top">
                    <div class="info">
                        <div class="tree blue">{{nameListC[0].name}}</div>
                        <div class="tree-node" v-for="item in nameListC[0].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox">
                                <el-checkbox v-model=item.status :data-price = item.price class="price" :data-id = item.id></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">{{nameListC[1].name}}</div>
                        <div class="tree-node" v-for="item in nameListC[1].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox">
                                <el-checkbox v-model=item.status :data-price = item.price  class="price" :data-id = item.id></el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="tree blue">{{nameListC[2].name}}</div>
                        <div class="tree-node" v-for="item in nameListC[2].item">
                            <span>{{item.name}}</span>
                            <div class="checkbox"> 
                                <el-checkbox v-model=item.status :data-price = item.price  class="price" :data-id = item.id></el-checkbox> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="info">
                        可添加高校：
                        <div class="input-wrap small">
                             <input type="text" name="" class="member-input" v-model="attention" @keyup="check_count($event,'school')" @blur="loseBlur">
                        </div>
                        500元/所
                    </div>
                    <div class="info">
                        可添加人物： 
                        <div class="input-wrap small"><input type="text" name="" class="member-input" v-model="addition" @keyup="check_count($event,'person')" @blur="loseBlur"></div>
                        500元/人
                    </div>
                     <div class="info">
                        使用期限：<div class="input-wrap">
                            <el-select v-model="time_c_vla" placeholder="选择时间" @change="chnageTimeC">
                                <el-option
                                  v-for="item in options"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                          </el-select>
                      </div>
                    </div>
                </div>
                <div class="bottom">
                    应付金额： <span class="money">{{price.c}}</span>
                </div>
            </div>
            <hr class="line">
            <div class="btn-wrap">
                <el-button type="primary" @click="submit()" :disabled="isCheck">提交预定</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

    .buyPackage{
        background: #21273d;
        overflow: hidden;
        .content-wrap{
            width: 90%;
            margin: 50px auto 95px auto;
            .item{
                width: calc((100% - 190px)/3);
                border: 1px solid #3a598b;
                display: inline-block;
                margin-left: 30px;
                margin-right: 30px;
                vertical-align: top;
                cursor: pointer;
                position: relative;
                .title{
                    font-size: 24px;
                    text-align: center;
                    margin: 26px auto 38px auto;
                }
                .top{
                    .info{
                        width: 180px; 
                        margin: 0 auto 30px;
                        .tree{
                            font-size: 18px;
                            margin-bottom: 21px;
                        }
                        .tree-node{ 
                            color: #d0d7ff;
                           position: relative;
                           line-height: 35px; 
                            >span{
                                display: block;
                                text-align: center; 
                            }
                            .checkbox{
                                position: absolute;
                                right: 30px;
                                top: 0;  
                            }
                        }
                    }
                    @media screen and (min-width:1800px){
                        .info{
                            width: 250px;
                        }
                    }
                }
                .middle{
                    width: 250px;
                    margin: 0 auto 30px;
                    border-top: 1px solid #33456b;
                    border-bottom: 1px solid #33456b;
                    .info:first-child{
                        margin-top: 30px;
                    }
                    .info:last-child{
                        margin-bottom: 19px;
                    }
                    
                    .info{
                        line-height: 35px;
                    }
                    
                    .input-wrap{
                        display: inline-block;
                        width: 105px;
                    }

                    .input-wrap.small{
                        width: 80px;
                        margin-right: 5px;
                    }
                }


                .bottom{
                    width: calc(100% - 50px);
                    height: 66px;
                    line-height: 66px;
                    margin: auto;
                    font-size: 18px;

                    .money{
                        font-size: 28px;
                        color: #ff8b2e;
                    }
                }
            }

            .line{
                width: calc(100% - 100px);
                height: 1px;
                border-top:1px solid #60a3ff;
                border-bottom: none;
                border-left: none;
                border-right: none;
                margin-top: 55px;
            }
            
            .selected{
                border-color: #60a3ff;
            }

            .btn-wrap{
                margin-top: 44px;
                text-align: center;

                .el-button{
                    width: 319px;
                    height: 56px;
                    line-height: 28px;
                    font-size: 18px;
                }
            }
        }
        .blue{
            color: #60a3ff;
        }
        .member-input{
            background: #3e455f;
            border: none;
            color: #d0d7ff;
            height: 28px;
            display: block;
            outline: 0;
            padding: 3px 10px;
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 100%;
            border-radius: 4px;
        }
    }
</style>
<script>
    export default{
        data(){  
            return {
                attention:1,
                addition:1,
                concernPersonNum_a:"",
                concernCollegeNum_a:"",
                concernPersonNum_b:"",
                concernCollegeNum_b:"",
                itemNum_a:"",
                itemNum_b:"",
                itemNum_c:"",
                checked: true,
                isCheck:false,
                unchecked: false,   
                  options: [{
                  value: '6个月',
                  label: '6个月'
                }, {
                  value: '一年',
                  label: '一年'
                }, {
                  value: '二年',
                  label: '二年'
                }, {
                  value: '三年',
                  label: '三年'
                }],
                time_c_vla: '6个月',
                time_a_vla: '6个月',
                time_b_vla: '6个月',
                value:"",
                setMeal:{},  
                price:{a:"",b:"",c:""},       
                nameListA:[{name:"舆情管理",item:[]},{name:"情报内参",item:[]},{name:"业务工具",item:[]}],
                nameListB:[{name:"舆情管理",item:[]},{name:"情报内参",item:[]},{name:"业务工具",item:[]}],
                nameListC:[{name:"舆情管理",item:[]},{name:"情报内参",item:[]},{name:"业务工具",item:[]}],
                item_a:["全景舆情","舆情监测","舆情预警","事件监测","舆情报告"],
                item_b:["行业动态","人物动态","媒体声量","两微洞察","内参报告"],
                item_c:["两微监管"],
               
                changePrice:{c:""},
                change_Price:{c:"",b:"",a:""},
                activeClick:1,
            }
        },
        methods: {
            chnageTimeC(){
                let vm = this;
                let sumPrice = "";   
                 sumPrice = vm.changePrice.c + 500 * vm.addition + vm.attention * 500;
                switch(vm.time_c_vla) {
                    case "6个月":
                        vm.price.c = sumPrice;
                        break
                    case "一年":
                        vm.price.c = Math.floor(sumPrice * 2 *0.98);
                        break;
                    case "二年":
                        vm.price.c = Math.floor(sumPrice * 4 *0.90);  
                        break;
                    case "三年":
                        vm.price.c = Math.floor(sumPrice * 6 *0.85);
                        break;
                }
            },
            chnageTimeB(){
                 let price = this.time_b_vla;  
                    switch(price) {
                    case "6个月":
                        this.price.b= this.change_Price.b;
                        break
                    case "一年":
                        this.price.b= this.change_Price.b * 2 *0.98;
                        break;
                    case "二年":
                        this.price.b= this.change_Price.b * 4 *0.90;  
                        break;
                    case "三年":
                        this.price.b= this.change_Price.b * 6 *0.85;
                        break;
                }
            },
            chnageTimeA(){
                let price = this.time_a_vla;  
                switch(price) {
                    case "6个月":
                        this.price.a= this.change_Price.a;
                        break
                    case "一年":
                        this.price.a= this.change_Price.a * 2 *0.98;
                        break;
                    case "二年":
                        this.price.a= this.change_Price.a * 4 *0.90;  
                        break;
                    case "三年":
                        this.price.a= this.change_Price.a * 6 *0.85;
                        break;
                }
            },
            check_count: function(event,type) {
               let value = event.target.value;
               if (!/^\d+$/.test(value)) {
                        if(value==""){
                            return false;
                        }
                       if(type=="school"){
                             alert('只能正整数');
                            this.attention = 0;
                       }else if(type=='person'){
                             alert('只能正整数');
                              this.addition = 0;
                       }
               }
             },
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"会员中心",to:{path:"/home/myCenter"}
                    },
                    {
                        name:"购买套餐"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            selectPackage(index){
                $('.buyPackage .item').removeClass('selected');
                if(index == 1){
                    this.activeClick = index;
                    $('.buyPackage .item:eq(0)').addClass('selected');
                }else if(index == 2){
                    this.activeClick = index;
                    $('.buyPackage .item:eq(1)').addClass('selected');
                }else{
                    this.activeClick = 3;
                    $('.buyPackage .item:eq(2)').addClass('selected');
                }
            },
            submit(){
                let arrData = [{name:"",price:"",time:"",concernCollegeNum:"",concernPersonNum:"",itemNum:"",item:[]},{name:"",price:"",time:"",concernCollegeNum:"",concernPersonNum:"",itemNum:"",item:[]},{name:"",price:"",time:"",concernCollegeNum:"",concernPersonNum:"",itemNum:"",item:[]}];
                switch(this.activeClick) {
                    case 1:
                       for (let k in this.nameListA) {
                           arrData[k].name = this.nameListA[k].name;
                           for (let j in this.nameListA[k].item) {
                              if(this.nameListA[k].item[j].status){
                              arrData[k].item.push(this.nameListA[k].item[j].name);
                              }
                           }
                            arrData[k].price = this.price.a;
                            arrData[k].time = this.time_a_vla;
                            arrData[k].concernCollegeNum = this.concernCollegeNum_a;
                            arrData[k].concernPersonNum = this.concernPersonNum_a;
                            arrData[k].itemNum = this.itemNum_a;
                            arrData[k].setMeal = "A套餐";
                        }; 
                        break;
                    case 2:
                        for (let k in this.nameListB) {
                           arrData[k].name = this.nameListB[k].name;
                           for (let j in this.nameListB[k].item) {
                              if(this.nameListB[k].item[j].status){
                              arrData[k].item.push(this.nameListB[k].item[j].name);
                              }
                            arrData[k].price = this.price.b;//钱
                            arrData[k].time = this.time_b_vla;//时间
                            arrData[k].concernCollegeNum = this.concernCollegeNum_b;//可添加的高校
                            arrData[k].concernPersonNum = this.concernPersonNum_b;//可添加人物
                            arrData[k].itemNum = this.itemNum_b;
                            arrData[k].setMeal = "B套餐";
                           }
                        }
                        break;
                    case 3:
                        let sum = "";

                        this.$nextTick(function(){
                            $(".price .is-checked").parents(".price").each(function(index, el) {
                                sum += $(el).attr("data-id");
                            });
                            for (let k in this.nameListC) {
                               arrData[k].name = this.nameListC[k].name;
                               for (let j in this.nameListC[k].item) {
                                  if(this.nameListC[k].item[j].status){
                                  arrData[k].item.push(this.nameListC[k].item[j].name);
                                  }
                                arrData[k].price = this.price.c;
                                arrData[k].time = this.time_c_vla;
                                arrData[k].concernCollegeNum = this.attention;
                                arrData[k].concernPersonNum = this.addition;
                                arrData[k].itemNum = sum;
                                arrData[k].setMeal = "C套餐";
                               }
                            }
                        })
                        break;    
                }
                //console.log(arrData);
                this.$router.push({path:"/home/centerPackageConfirm",query: {selected: arrData}});
            },
            getDataArr(resArr,arr,nameList){
                let name = "";
                for (var i = 0; i < resArr.length; i++) {
                    name+=resArr[i]
                }
               for (var i = 0; i < arr.length; i++) {
                    let objA = {};
                    objA.name = arr[i];
                  if(name.indexOf(arr[i])>=0){
                      objA.status = true
                  }else{
                    objA.status = false;
                  }
                   nameList.item.push(objA);
               }
            },
            getDataCArr(item_a,ListC,dataC,nameListC){
                let nameC = "";
                   for (var i = 0; i < item_a.length; i++) {
                       nameC+=item_a[i]
                   }
                   for (let j = 0; j < ListC.length; j++) {
                       if(nameC.indexOf(ListC[j])>=0){
                            let objC = {};
                           objC.name = ListC[j]
                           objC.price = dataC[j].itemPrice;
                           if(j==3){
                             objC.id = dataC[j].id;
                           }else{
                             objC.id = dataC[j].id+","; 
                           } 
                           objC.status = true;
                           nameListC.item.push(objC)
                       }
                   }
            },
            getPrice(event){ 
                let sum = 0,vm = this,arrC_Item = []; 
                vm.$nextTick(function(){

                    $(".price").each(function(index, el) {
                      sum+= parseInt($(el).attr("data-price"))
                      $(el).on("change",function(){
                        let sumPrice = "";
                         let oldData = $(el).attr("data-price");
                        // console.log(oldData);
                       let state =  $(this).children('.el-checkbox__input').hasClass('is-checked');
                             if(!!window.ActiveXObject || "ActiveXObject" in window){//判断是否是ie浏览器
                              // alert("IE")
                              state = !state
                            }else{
                              state = state
                            }
                         if(state){ 
                            sum = sum + parseInt(oldData);
                             sumPrice = sum + 500 * vm.addition + vm.attention * 500;
                             switch(vm.time_c_vla) {
                                case "6个月":
                                   vm.price.c =  sumPrice;
                                    break;
                                case "一年":
                                    vm.price.c = Math.floor(sumPrice * 2 * 0.98);
                                    break;
                                case "二年":
                                    vm.price.c = Math.floor(sumPrice * 4 * 0.9);
                                    break;
                                case "三年":
                                    vm.price.c = Math.floor(sumPrice * 6 * 0.85);
                                    break;
                            }
                         }else{
                           
                            if($(".price .is-checked").length==0){
                                vm.price.c = 0;
                            }
                            
                             sum = sum - oldData;
                             sumPrice = sum + 500 * vm.addition + vm.attention * 500;
                             switch(vm.time_c_vla) {
                                case "6个月":
                                   vm.price.c =  sumPrice;
                                    break;
                                case "一年":
                                    vm.price.c = Math.floor(sumPrice * 2 * 0.98);
                                    break;
                                case "二年":
                                    vm.price.c = Math.floor(sumPrice * 4 * 0.9);
                                    break;
                                case "三年":
                                    vm.price.c = Math.floor(sumPrice * 6 * 0.85);
                                    break;
                            }
                         }
                      
                        
                         vm.changePrice.c = sum; 
                      })
                    });
                   vm.price.c = Math.floor(sum + 500 * vm.addition + vm.attention * 500);
                   vm.changePrice.c = sum;  
                   vm.change_Price.c = sum;
                }) 
            },
            getPackageData(){
                 this.setMeal.aData = "",this.setMeal.bData = "",this.setMeal.cData = "";
                  let ListA = "",ListB = "",ListC = [];
                this.$http.post('/apis/packageManage/getPackageManageList.json').then(
                    (res) => {
                        if(res.ok){
                            if(res.data.success){
                               this.price.a = res.data.data[0].total;
                               this.change_Price.a =  res.data.data[0].total;
                               this.price.b = res.data.data[1].total;
                                this.change_Price.b = res.data.data[1].total;
                                for (let item in res.data.data) {
                                     if(res.data.data[item].name=="A套餐"){
                                        ListA = res.data.data[item].itemPriceList
                                    }else if(res.data.data[item].name=="B套餐"){ 
                                        ListB = res.data.data[item].itemPriceList
                                    }
                                }
                                this.concernCollegeNum_a = res.data.data[0].concernCollegeNum;
                                this.concernPersonNum_a = res.data.data[0].concernPersonNum;
                                this.concernCollegeNum_b = res.data.data[1].concernCollegeNum;
                                this.concernPersonNum_b = res.data.data[1].concernPersonNum;
                                this.itemNum_a = res.data.data[0].packageItem;
                                this.itemNum_b = res.data.data[1].packageItem;
                                this.getDataArr(ListA,this.item_a,this.nameListA[0])
                                this.getDataArr(ListA,this.item_b,this.nameListA[1])
                                this.getDataArr(ListA,this.item_c,this.nameListA[2])
                                this.getDataArr(ListB,this.item_a,this.nameListB[0])
                                this.getDataArr(ListB,this.item_b,this.nameListB[1])
                                this.getDataArr(ListB,this.item_c,this.nameListB[2])
                            }else{  
                                console.log(res.data.message)
                            }  
                        }else{
                            console.log(res.statusText);
                        }
                    }
                );
                let dataC = "";
                this.$http.post("/apis/packageBuy/getItemPriceList.json").then((res)=>{
                   if(res.ok){
                        if(res.data.success){
                           for (var i = 0; i < res.data.data.length; i++) {
                               dataC = res.data.data;
                               ListC.push(res.data.data[i].name)
                           } 
                           this.getDataCArr(this.item_a,ListC,dataC,this.nameListC[0]);
                           this.getDataCArr(this.item_b,ListC,dataC,this.nameListC[1]);
                           this.getDataCArr(this.item_c,ListC,dataC,this.nameListC[2]);
                           this.getPrice();
                        }else{
                            console.log(res.data.message);
                        }
                   }
                },(err)=>{
                    console.log(err);
                })
            },
            loseBlur(){
                 let vm = this;
                   /*if( (this.attention == 0&& this.addition ==0)||(this.attention == ""&& this.addition =="")){
                    this.price.c = 0;
                    return false;
                  }*/
                 // console.log(this.changePrice.c);
                
                 let sumPrice = this.changePrice.c + 500 * this.addition + this.attention * 500;
                 switch(vm.time_c_vla) {
                            case "6个月":
                               vm.price.c =  sumPrice;
                                break;
                            case "一年":
                                vm.price.c = Math.floor(sumPrice * 2 * 0.98);
                                break;
                            case "二年":
                                vm.price.c = Math.floor(sumPrice * 4 * 0.9);
                                break;
                            case "三年":
                                vm.price.c = Math.floor(sumPrice * 6 * 0.85);
                                break;
                        } 
                //时间选择需要的
                this.change_Price.c = this.changePrice.c + 500 * this.addition + this.attention * 500;
            }
        },
        mounted(){
            this.getPackageData();
            this.selectPackage(1);
        },
        created(){
            this.setBreadCrumb();
        },
        watch:{
            setMeal:function(val,oldVal){
                console.log(val);
            },
            attention:function(val,oldVal){
                let vm = this;
                if(val>1000){
                    this.$message("最多可以添加1000所高校");
                    this.attention = 1000;
                    return false;
                }

              if(!isNaN(val)){
                        if(vm.addition==""){
                            vm.addition = 0;
                         } 
                          if(this.attention==0||this.attention==""){
                            this.isCheck = true;  
                         }else{
                            this.isCheck = false;
                         }
                     let sumPrice = vm.changePrice.c + 500 * val + vm.addition * 500;
                    switch(vm.time_c_vla) {
                            case "6个月":
                               vm.price.c =  sumPrice;
                                break;
                            case "一年":
                                vm.price.c = Math.floor(sumPrice * 2 * 0.98);
                                break;
                            case "二年":
                                vm.price.c = Math.floor(sumPrice * 4 * 0.9);
                                break;
                            case "三年":
                                vm.price.c = Math.floor(sumPrice * 6 * 0.85);
                                break;
                        } 
                    vm.change_Price.c = vm.changePrice.c + 500 * val + vm.addition * 500;
              }
            },
            addition:function(val,oldVal){
                 let vm = this;
                  if(val>1000){
                    this.$message("最多可以添加1000位人");
                    this.addition = 1000;
                    return false;
                 }
                 if(!isNaN(val)){
                         if(vm.attention==""){
                            vm.attention = 0;
                         } 
                        let sumPrice =  vm.changePrice.c + 500 * val + vm.attention * 500;
                        switch(vm.time_c_vla) {
                            case "6个月":
                               vm.price.c =  sumPrice;
                               console.log(vm.price.c );
                                break;
                            case "一年":
                                vm.price.c = Math.floor(sumPrice * 2 * 0.98);
                                break;
                            case "二年":
                                vm.price.c = Math.floor(sumPrice * 4 * 0.9);
                                break;
                            case "三年":
                                vm.price.c = Math.floor(sumPrice * 6 * 0.85);
                                break;
                        } 
                        vm.change_Price.c = vm.changePrice.c + 500 * val + vm.attention * 500;
                }
            }
        }
    }
</script>