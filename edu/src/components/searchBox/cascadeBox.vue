<template>
    <div class="myAttention-character-div">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="custom-tabs" >
            <el-tab-pane label="全部" name="all">
            </el-tab-pane>
            <el-tab-pane label="国家领导" name="stateLeader">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">国家领导</span>
                    </el-col>
                    <el-col :span="20">
                        <el-select v-model="reportPersonage" placeholder="请选择领导">
                            <el-option v-for="item in stateLeader" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="政/厅" name="office">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">政/厅</span>
                    </el-col>
                    <el-col :span="20">
                        <el-select v-model="param.area" placeholder="请选择地区" @change="getHallByArea()">
                            <el-option v-for="item in province" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="reportPersonage" placeholder="请选择人物">
                            <el-option v-for="item in hall" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="高校领导" name="school">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">高校领导</span>
                    </el-col>
                    <el-col :span="20">
                        <el-select v-model="param.area" placeholder="请选择地区" @change="getCollegeLeaderByArea()">
                            <el-option v-for="item in province" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="reportPersonage" placeholder="请选择人物">
                            <el-option v-for="item in collegeLeader" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="知名学者" name="scholar">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">知名学者</span>
                    </el-col>
                    <el-col :span="20">
                        <el-select v-model="param.area" placeholder="请选择地区" @change="getScholarByArea()">
                            <el-option v-for="item in province" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="reportPersonage" placeholder="请选择人物">
                            <el-option v-for="item in scholar" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="我添加的人物" name="add">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">添加的人物</span>
                    </el-col>
                    <el-col :span="20">
                        <el-select v-model="reportPersonage" placeholder="请选择人物">
                            <el-option v-for="item in persons" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-button type="primary" class="addPerson"><router-link to="/home/myCenter">添加人物</router-link></el-button>
        <el-row  type="flex" class="row-bg row-time">
            <el-col :span="2">
                <span class="chooseTime">选择时间</span>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <el-date-picker
                            v-model="valueTime"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                province: ["北京","天津","河北","上海","湖北","广东","湖南","山西","内蒙古","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","台湾","澳门","香港","钓鱼岛"],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    }
                },
                param: {
                    reportPersonage: "",
                    area: "",
                    startDate: new Date(Date.now() - 8.64e7 * 30).format("yyyy-MM-dd") + " 00:00:00",
                    endDate: new Date(Date.now() - 8.64e7).format("yyyy-MM-dd") + " 23:59:59",
                },
                stateLeader: [],
                hall: [],
                collegeLeader: [],
                scholar: [],
                persons: [],
                activeName:"all",
                reportPersonage: '',
                valueTime: new Date(Date.now() - 8.64e7),
                conditionOption:""
            }
        },
        methods:{
            handleClick(tab, event) {
                this.reportPersonage = '';
                this.param.area = '';
            },
            /**获取国家领导*/
            getLeader() {
                this.$http.post('/apis/lib/findPersonageByParam.json', {belongType: ['国家领导']}).then(
                    (response) => {
                        if (response.data.success) {
                            let data = response.data.data;
                            for (let i = 0; i < data.length; i++) {
                                this.stateLeader.push(data[i].personageName);
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取政厅领导*/
            getHallByArea() {
                this.hall = [];
                this.reportPersonage = '';
                this.$http.post('/apis/lib/findPersonageByParam.json', {province: this.param.area, belongType: ['教育厅', '教育局']}).then(
                    (response) => {
                        if (response.data.success) {
                            let data = response.data.data;
                            for (let i = 0; i < data.length; i++) {
                                this.hall.push(data[i].personageName);
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取大学领导*/
            getCollegeLeaderByArea() {
                this.collegeLeader = [];
                this.reportPersonage = '';
                this.$http.post('/apis/lib/findPersonageByParam.json', {province: this.param.area, belongType: ['大学领导']}).then(
                    (response) => {
                        if (response.data.success) {
                            let data = response.data.data;
                            for (let i = 0; i < data.length; i++) {
                                this.collegeLeader.push(data[i].personageName);
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取知名学者*/
            getScholarByArea() {
                this.scholar = [];
                this.reportPersonage = '';
                this.$http.post('/apis/lib/findPersonageByParam.json', {province: this.param.area, belongType: ['长江青年/青年学者']}).then(
                    (response) => {
                        if (response.data.success) {
                            let data = response.data.data;
                            for (let i = 0; i < data.length; i++) {
                                this.scholar.push(data[i].personageName);
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            /**获取用户设置信息*/
            getUserParams() {
                this.$http.post('/apis/user/getUnivsAndPersonage.json').then(
                    (response) => {
                        if (response.data.success) {
                            let persons = response.data.data.persons;
                            for (var i = 0; i < persons.length; i++) {
                                this.persons.push(persons[i]);
                            }
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            }
        },
        mounted() {
            this.getLeader();
            this.getUserParams(); 
            this.$emit('onSearchLoad', this.param);
        },
        watch: {
            valueTime: function (val, oldVal) {
                if (val) {
                    this.param.startDate = new Date(val.getTime() - 8.64e7 * 30).format("yyyy-MM-dd") + " 00:00:00";
                    this.param.endDate = val.format("yyyy-MM-dd") + " 23:59:59";
                    this.$emit('onSearchChange', this.param);
                }
            },
            reportPersonage: function (val, oldVal) {
                if (val) {
                    this.param.reportPersonage = val;
                    this.$emit('onSearchChange', this.param);
                }
            }
        }
    }
</script>
<style lang="scss">

    .custom-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav{
        margin: 0;
    }
    .custom-tabs .el-tabs__content{
        margin-top: 10px;
    }
    .myAttention-character-div{
        position: relative;
        background-color: rgba(96, 163, 255, 0.1);
        margin-bottom: 10px;
        .addPerson{
            position: absolute;
            right: 20px;
            top: 10px;
        }
    }
    .chooseTime{
        padding-left: 16px;
        line-height: 50px;
        display: inline-block;
        width: 100%;
        color: #d0d7ff;
    }
    .row-time{
        border-bottom: 1px solid rgba(96, 163, 255, 0.1);
    }
    .el-select{
        margin-top: 7px;
    }
    .block{
        margin-top: 7px;
    }
</style>