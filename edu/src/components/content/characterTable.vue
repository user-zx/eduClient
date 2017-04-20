/**
* Created by lifei on 2017/3/27.
*/
<template>
    <el-table :data="getTableData" class="tran-table" border style="width: 100%"
              :resizable="false">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="全部" align="center" prop="all">
            <template scope="scope">
                <span v-if="scope.row.all == 1">
                     <i class="icon-rank icon-gold"></i>
                </span>
               <span v-else-if="scope.row.all == 2">
                    <i class="icon-rank icon-silver"></i>
               </span>
                <span v-else-if="scope.row.all == 3">
                     <i class="icon-rank icon-copper"></i>
                </span>
                {{scope.row.all}}
            </template>
        </el-table-column>
        <el-table-column label="人物" prop="name" align="center">
            <template scope="scope">
                <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                    {{scope.row.name}}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="声量" prop="voiceNum" align="center"></el-table-column>
        <el-table-column label="总阅读量" prop="readNum" align="center"></el-table-column>
        <el-table-column label="热度" prop="hot" align="center"></el-table-column>
        <el-table-column label="情感" prop="emotion" align="center"></el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>
    .tran-table{
        margin-top: 10px;
        .character-name{
            cursor: pointer;
        }
    }
</style>

<script>
    export default{
        data(){
            return {
                getTableData: [],
            }
        },
        components: {},
        methods: {
            //带参跳转到人物分析页面
            toCharacterAnalyse(data){
                console.log(data);
                this.$router.push({path:"/home/characterAnalyse"});
            }
        },
        mounted(){ 
            this.$nextTick(function(){
                //console.log(this.tableData);
                this.getTableData = this.tableData;
            })
        },
        props:["tableData"],
    }

</script>