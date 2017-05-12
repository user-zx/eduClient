/**
* Created by lifei on 2017/3/27.
*/
<template>
    <el-table :data="getTableData" class="tran-table" border style="width: 100%"
              :resizable="false" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="全部" align="center" prop="rank">
            <template scope="scope">
                <span v-if="scope.row.rank == 1">
                     <i class="icon-rank icon-gold"></i>
                </span>
               <span v-else-if="scope.row.rank == 2">
                    <i class="icon-rank icon-silver"></i>
               </span>
                <span v-else-if="scope.row.rank == 3">
                     <i class="icon-rank icon-copper"></i>
                </span>
                {{scope.row.rank}}
            </template>
        </el-table-column>
        <el-table-column label="人物" prop="name" align="center">
            <template scope="scope">
                <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                    {{scope.row.name}}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="声量" prop="volume" align="center"></el-table-column>
        <el-table-column label="总阅读量" prop="totalHitCount" align="center"></el-table-column>
        <el-table-column label="热度" prop="hot" align="center"></el-table-column>
        <el-table-column label="情感" prop="emotionVal" align="center"></el-table-column>
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
            handleSelectionChange(val){
                console.log(val);
                this.$emit('select',val) 
            },
            //带参跳转到人物分析页面
            toCharacterAnalyse(data){
                console.log(data);
                this.$router.push({path:"/home/characterAnalyse"});
            },
            getData(){
                console.log('test');
            },
            getTableDataEvent(){
                this.getTableData = this.tableData; 
                //console.log(this.tableData);
            }
        },
        mounted(){   
            this.$nextTick(function(){  
                this.getTableDataEvent();
            }) 
        },
        props:["tableData"],
    }

</script>