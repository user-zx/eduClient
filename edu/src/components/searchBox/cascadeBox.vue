<template>
    <div class="cascadeBox-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="custom-tabs" >
            <el-tab-pane label="全部" name="all">
            </el-tab-pane>
            <el-tab-pane label="部委省厅" name="provinceHall">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">部委省厅</span>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="reportPersonage" placeholder="请选择省份">
                            <el-option v-for="item in provinces" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="高校领导" name="school">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">高校领导</span>
                    </el-col>
                    <el-col :span="8">
                        <el-select filterable placeholder="请选择高校名称" v-model="reportPersonage">
                            <el-option-group v-for="group in schools" :key="group.label" :label="group.label">
                                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="知名学者" name="scholar">
                <el-row type="flex" class="row-bg row-time">
                    <el-col :span="2">
                        <span class="chooseTime">知名学者</span>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="reportPersonage" placeholder="请选择省份">
                            <el-option v-for="item in provinces" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="我添加的人物" name="add"></el-tab-pane>
        </el-tabs>
        <!--<el-button type="primary" class="addPerson"><router-link to="/home/myCenter">添加人物</router-link></el-button>-->
        <el-row  type="flex" class="row-bg row-time">
            <el-col :span="2">
                <span class="chooseTime">选择时间</span>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <el-date-picker v-model="valueTime" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import province from "../../province.json";
    import schools from "../../school.json";
    export default{
        data(){
            return {
                provinces: province,
                schools: schools,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    }
                },
                param: {
                    reportPersonage: null,
                    area: "",
                    startDate: new Date(Date.now() - 8.64e7 * 30).format("yyyy-MM-dd") + " 00:00:00",
                    endDate: new Date(Date.now() - 8.64e7).format("yyyy-MM-dd") + " 23:59:59",
                },
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
                if (tab.label == '全部') {
                    this.param.reportPersonage = null;
                    this.$emit('onSearchChange', this.param);
                }
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
            this.getUserParams(); 
            this.$emit('onSearchLoad', this.param);
            this.$nextTick(function () {
                console.log(this.schools)
            })
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
    .cascadeBox-wrap{
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