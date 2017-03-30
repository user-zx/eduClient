/**
* Created by lifei on 2017/3/27.
*/
<template>
    <el-table :data="tableData" class="tran-table" border style="width: 100%"
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
                tableData: [
                    {
                        'id': 1,
                        'all': 1,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 2,
                        'all': 2,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 3,
                        'all': 3,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 4,
                        'all': 4,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 5,
                        'all': 5,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 6,
                        'all': 6,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 7,
                        'all': 7,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'all': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 9,
                        'all': 9,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 10,
                        'all': 10,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 11,
                        'all': 11,
                        'name': '习1总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 12,
                        'all': 12,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },{
                        'id': 13,
                        'all': 13,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 14,
                        'all': 14,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 15,
                        'all': 15,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    }
                    ,
                    {
                        'id': 16,
                        'all': 16,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    }
                ]
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
        }
    }

</script>