/**
* Created by lifei on 2017/3/31.
*/
<template>
    <div class="centerInfo">
        <div class="logo-wrap">
            <div class="item logo">
                <img :src="imgUrl" alt="">
            </div>
            <div class="item name-div">
                <p class="user-name">用户名： <span>{{username}}</span></p>
                <p class="register-date">注册时间：{{time}}</p>
            </div>
        </div>
        <div class="summary-wrap">
            <div class="circle-wrap">
                <div class="circle-div">
                    <div class="text">
                        <p class="top">{{usetDataList.colleges}}</p>
                        <p class="middle">高校总数</p>
                        <p class="bottom">剩余{{surplusCollege}}个</p>
                    </div>
                    <div class="mask">
                        <div class="btn-wrap">
                            <el-button type="text" @click="addCollege()">设置</el-button>
                            <!--<div class="line"></div>-->
                            <!--  <el-button type="text" @click="setItem()">设置</el-button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="circle-wrap">
                <div class="circle-div">
                    <div class="text">
                        <p class="top">{{usetDataList.peoson}}</p>
                        <p class="middle">人物总数</p>
                        <p class="bottom">剩余{{surplusPerson}}个</p>
                    </div>
                    <div class="mask">
                        <div class="btn-wrap">
                            <el-button type="text" @click="addCharacter()">设置</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="circle-wrap" :class="{addChild:activeClass}">
                <div class="circle-div">
                    <div class="text">
                        <p class="top">{{usetDataList.subAccountNum}}</p>
                        <p class="middle">子账号总数</p>
                        <p class="bottom">剩余{{surplusAccount}}个</p>
                    </div>
                    <div class="mask">
                        <div class="btn-wrap">
                            <el-button type="text" @click="addSubCount()">设置</el-button>
                            <!--   <el-button type="text" @click="setSubCount()">设置</el-button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-wrap">
            <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border
                      style="width: 100%"
                      :resizable="false">
                <el-table-column label="订单编号" prop="rank" align="center"></el-table-column>
                <el-table-column label="产品类型" prop="packageType" align="center"></el-table-column>
                <el-table-column label="提交时间" prop="submitDate" align="center"
                                 :formatter="formatSubmitDate"></el-table-column>
                <el-table-column label="期限" prop="timeLimit" align="center"></el-table-column>
                <el-table-column label="到期时间" align="center" prop="expireDate"
                                 :formatter="formatExpireDate"></el-table-column>
                <el-table-column label="支付金额" prop="totalPrice" align="center"></el-table-column>
                <el-table-column label="查看详情" align="center">
                    <template scope="scope">
                            <span @click="viewDetail(scope.row)" class="pointer">
                                详情
                            </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block content-bar-pagination">
                <el-pagination class="edu-pagination"
                               v-initjump='currentPage'
                               :current-page="currentPage"
                               @current-change="handleCurrentChange"
                               :page-size="param.pageSize"
                               layout="prev, next, jumper, total"
                               :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="提示" v-model="isShow" size="tiny" class="orderDetails">
            <h3 class="text-center">订单详情</h3>
            <el-row class="item-details">
                <el-col :span="6">订单编号：</el-col>
                <el-col :span="6">{{orderDetails.rank}}</el-col>
            </el-row>
            <el-row class="item-details">
                <el-col :span="6">订单类型：</el-col>
                <el-col :span="6">{{orderDetails.packageType}}</el-col>
            </el-row>
            <el-row class="item-details">
                <el-col :span="24">
                    <div>提供服务：</div>
                </el-col>
                <el-col :span="6" :offset="6" v-if="showOne.length>0">舆情管理</el-col>
                <el-col :span="12" :offset="12" v-for="item in showOne">{{item}}</el-col>
                <el-col :span="6" :offset="6" v-if="showTwo.length>0">情报内参</el-col>
                <el-col :span="12" :offset="12" v-for="item in showTwo">{{item}}</el-col>
                <el-col :span="6" :offset="6" v-if="showThree.length>0">业务工具</el-col>
                <el-col :span="12" :offset="12" v-for="item in showThree">{{item}}</el-col>
            </el-row>
            <el-row class="item-details">
                <el-col :span="6">可关注高校：</el-col>
                <el-col :span="6">{{orderDetails.concernCollegeNum}}</el-col>
            </el-row>
            <el-row class="item-details">
                <el-col :span="6">可关注人物：</el-col>
                <el-col :span="6">{{orderDetails.concernPersonNum}}</el-col>
            </el-row>
            <el-row class="item-details">
                <el-col :span="6">开始时间：</el-col>
                <el-col :span="6">{{orderDetails.signedDate}}</el-col>
            </el-row>
            <el-row class="item-details">
                <el-col :span="6">到期时间：</el-col>
                <el-col :span="6">{{orderDetails.expireDate}}</el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <!--<el-button @click="isShow = false">取 消</el-button>-->
            <el-button type="primary" @click="isShow = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .centerInfo {
        background: #21273d;
        overflow: hidden;

    .logo-wrap {
        margin: 20px;

    .logo {
        width: 100px;
        height: 100px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;

    img {
        max-height: 100px;
        max-width: 100px;
    }

    }
    .name-div {
        width: calc(100% - 140px);
        height: inherit;
        display: table-cell;
        padding-left: 28px;
        vertical-align: top;

    p {
        color: #c8cef5;
        height: 35px;
        line-height: 35px;
    }

    p.user-name {
        font-size: 18px;
        margin-top: 15px;

    span {
        color: #e4f09e;
    }

    }
    }
    }

    .summary-wrap {
        text-align: center;

    .circle-wrap {
        margin: 40px;
        display: inline-block;

    .circle-div {
        width: 160px;
        height: 160px;
        border: 2px solid #60a3ff;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        position: relative;

    .text {
        overflow: hidden;
        width: inherit;
        height: inherit;

    p.top {
        font-size: 40px;
        color: #e4f09e;
        margin-bottom: 5px;
        margin-top: 20px;
    }

    p.middle {
        font-size: 18px;
        color: #d0d7ff;
        margin-bottom: 10px;
    }

    p.bottom {
        font-size: 16px;
        color: #757a97;
    }

    }

    .mask {
        height: 100%;
        width: 100%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        position: absolute;
        top: 0px;
        left: 0px;
        background: rgba(33, 39, 61, 1);
        z-index: -1;

    .btn-wrap {
        margin-top: 55px;

    .el-button {
        font-size: 20px;
        font-weight: bold;
        opacity: 1;
    }

    }

    .line {
        width: 2px;
        height: 40px;
        display: inline-block;
    }

    }
    }
    }
    .circle-div:hover {

    .mask {
        z-index: 9999;
    }

    }
    }

    .detail-wrap {
        margin: 0px 50px 30px 50px;

    .el-table {
        margin: auto;
    }

    }
    .orderDetails {

    h3 {
        border-bottom: 1px solid #48576a;
        padding-bottom: 10px;
    }

    .item-details {
        margin-top: 10px;
    }

    }
    }
    .addChild {
        display: none !important;
    }
</style>
<style lang="scss">
    .centerInfo {

    .el-dialog--tiny {
        width: 40%;
    }

    }
</style>
<script>
    export default{
        data(){
            return {
                tableData: [],
                total: 0,
                activeClass: false,
                isShow: false,
                item_one: ["全景舆情", "舆情监测", "舆情预警", "事件监测", "舆情报告"],
                item_two: ["行业动态", "人物动态", "媒体声誉", "两微洞察", "内参报告"],
                item_three: ["两微监管"],
                showOne: [],
                showTwo: [],
                showThree: [],
                imgUrl: "",
                username: "",
                time: "",
                param: {
                    pageSize: 5,
                    pageNumber: 0,
                },
                usetDataList: {},
                surplusCollege: "",
                surplusPerson: "",
                surplusAccount: "",
                orderDetails: {},
            }
        },
        methods: {
            setItem(){

            },
            getItemData(arrShow, itemArr, arr){
                let str = "";
                for (var i = 0; i < itemArr.length; i++) {
                    str += itemArr[i];
                }
                for (var j = 0; j < arrShow.length; j++) {
                    if (str.indexOf(arrShow[j]) != -1) {
                        arr.push(arrShow[j])
                    }
                }
                // console.log(arr);
            },
//            setBreadCrumb(){
//                let breadcrumb=[
//                    {
//                        name:"会员中心",to:{path:"/home/myCenter"}
//                    }
//                ];
//                this.$store.commit("setBreadCrumb",breadcrumb);
//            },
            viewDetail(params){
                this.$http.get("/apis/packageManage/getPackageOrderById.json/" + params.id).then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.orderDetails = res.data.data;
                        //  console.log(res.data.data.signedDate);
                        this.orderDetails.signedDate = this.orderDetails.signedDate == null ? "--:--" : new Date(res.data.data.signedDate).format('yyyy-MM-dd');
                        this.orderDetails.expireDate = this.orderDetails.expireDate == null ? "--:--" : new Date(res.data.data.expireDate).format('yyyy-MM-dd');
                        this.showOne = [];
                        this.showTwo = [];
                        this.showThree = [];
                        let itemString = res.data.data.itemPriceList;
                        // console.log(itemString);
                        this.getItemData(itemString, this.item_one, this.showOne);
                        this.getItemData(itemString, this.item_two, this.showTwo);
                        this.getItemData(itemString, this.item_three, this.showThree);
                        this.orderDetails.rank = params.rank;
                        this.isShow = true;
                    }
                }, (err) => {
                    console.log(err);
                })
            },

            addCollege(){
                this.$router.push({path: "/home/centerCollege"});
            },

            addCharacter(){
                this.$router.push({path: "/home/centerCharacter"});
            },

            addSubCount(){
                $('.attend-tabs .el-col').removeClass('active');
                $('.attend-tabs .el-col-subCount').addClass('active');
                this.$parent.currentTabs.currentTab = "subCount";
            },

            setSubCount(){
                $('.attend-tabs .el-col').removeClass('active');
                $('.attend-tabs .el-col-subCount').addClass('active');
                this.$parent.currentTabs.currentTab = "subCount";
            },

            handleCurrentChange(pageNumber) {
                this.param.pageNumber = pageNumber - 1;
                this.getDataList();
            },

            getDataList(){
                //console.log(this.param);
                this.$http.post("/apis/packageManage/getPackageOrderList.json", this.param).then((res) => {
                    if (res.data.success) {
                        this.total = res.data.data.totalElements;
                        let data = res.data.data.content;
                        if (data != null && data.length > 0) {
                            for (let i = 0; i < data.length; i++) {
                                data[i].rank = (this.param.pageNumber) * this.param.pageSize + i + 1;
                            }
                        }
                        this.tableData = data;
                    }
                }, (err) => {
                    console.log(err);
                });
            },
            getUserData(){
                this.$http.post("/apis/user/getMemberInfo.json").then((res) => {
                    let date = new Date();

                    if (res.data.success) {
                        if (res.data.data.accountType == "试用") {
                            this.activeClass = true;
                        } else {
                            this.activeClass = false;
                        }
                        this.imgUrl = res.data.data.userImg;
                        this.username = res.data.data.realName;
                        this.time = new Date(res.data.data.createDate).format('yyyy-MM-dd hh:mm');
                        this.usetDataList.colleges = res.data.data.collegeNum;
                        this.usetDataList.peoson = res.data.data.personageNum;
                        this.usetDataList.subAccountNum = res.data.data.subAccountNum;
                        this.$http.post('/apis/user/getUnivsAndPersonage.json').then(res => {
                            if (res.data.success) {
                                this.surplusCollege = this.usetDataList.colleges - res.data.data.univs.length;
                                this.surplusPerson = this.usetDataList.peoson - res.data.data.persons.length;
                            }
                        }, err => {
                            console.log(err);
                        });
                        this.$http.post("/apis/user/findAllSubAccount.json", {pageNumber: 0, pageSize: 1}).then(res => {
                            if (res.data.success) {
                                this.surplusAccount = this.usetDataList.subAccountNum - res.data.data.totalElements;
                            }
                        }, (err) => {
                            console.log(err);
                        });
                    }
                }, (err) => {
                    console.log(err);
                })

            },
            formatSubmitDate(row, col){
                return new Date(row.submitDate).format('yyyy-MM-dd');
            },

            formatExpireDate(row, col){
                if (row.expireDate != null) {
                    return new Date(row.expireDate).format('yyyy-MM-dd');
                }
                return '';
            }
        },
        computed: {
            currentPage: function () {
                return this.param.pageNumber + 1;
            }
        },
        mounted(){
            //console.log(this.$store.commit('getUserInfo'));
            this.getDataList();
            this.getUserData();
        },
        created(){
//            this.setBreadCrumb();
        }
    }
</script>