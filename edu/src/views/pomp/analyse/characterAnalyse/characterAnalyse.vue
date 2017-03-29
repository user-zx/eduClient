/**
* Created by lifei on 2017/3/28.
*/
<template>
    <div class="characterAnalyse">
        <div class="character-info">
            <div class="info-left">
                <span class="characterName">
                    {{characterInfo.name}}
                </span>
                <span class="characterDate">
                   {{characterInfo.date}}
               </span>
            </div>
            <div class="info-right">
                <el-button type="primary" icon="plus" class="btn-attend">
                    关注
                </el-button>
                <el-button type="primary" icon="plus" class="btn-alert">
                    预警
                </el-button>
                <el-dropdown class="event-store-box" trigger="click">
                    <el-button type="primary" icon="plus" class="button-icon">
                        事件库
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="event-store-item">
                        <el-dropdown-item>事件1</el-dropdown-item>
                        <el-dropdown-item>事件2</el-dropdown-item>
                        <el-dropdown-item>事件3</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="character-div character-basicInfo">
            <div class="title rank-title">
                <span class="span-icon">基本信息</span>
            </div>
            <div class="info-table">
                <el-table :data="tableData" class="tran-table no-col-title" border style="width: 100%"
                          :resizable="false">
                    <el-table-column label="排名" align="center" prop="rank"></el-table-column>
                    <el-table-column label="人物" prop="name" align="center"></el-table-column>
                    <el-table-column label="声量" prop="voiceNum" align="center"></el-table-column>
                    <el-table-column label="总阅读量" prop="readNum" align="center"></el-table-column>
                    <el-table-column label="热度" prop="hot" align="center"></el-table-column>
                    <el-table-column label="情感" prop="emotion" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="character-div character-rank">
            <div class="title rank-title">
                <span class="span-icon">热度排行榜</span>
            </div>
            <div class="rank-table">
                <el-table :data="tableData" class="tran-table no-col-title" border style="width: 100%"
                          :resizable="false">
                    <el-table-column label="排名" align="center" prop="rank"></el-table-column>
                    <el-table-column label="人物" prop="name" align="center"></el-table-column>
                    <el-table-column label="声量" prop="voiceNum" align="center"></el-table-column>
                    <el-table-column label="总阅读量" prop="readNum" align="center"></el-table-column>
                    <el-table-column label="热度" prop="hot" align="center"></el-table-column>
                    <el-table-column label="情感" prop="emotion" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="character-div character-activity">
            <div class="title">
                <span class="span-icon">活动轨迹</span>
            </div>
            <div class="graph-div item" id="character_activity_graph">
            </div>
            <div class="activity-describe">
                <h3>12月12日概况</h3>
                <div class="time-line">
                    <div class="time-line-item" v-for="item in timeLineData">
                        <div class="circle-box">
                            <div class="circle"></div>
                        </div>
                        <div class="time-line-content">
                           <p class="content"> {{item.title}}</p>
                            <p class="datetime">{{item.date}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="character-div character-keywords">
            <div class="title"><span class="span-icon">关键词云</span></div>
            <div class="keywords-list">
                <span v-for="item in keywords">
                    {{item}}
                </span>
            </div>
        </div>
        <div class="character-div character-emotionTrend">
            <div class="title"><span class="span-icon">情感走势</span></div>
            <div class="graph-div trend-graph" id="trend_graph">
            </div>
        </div>
        <div class="character-div leftDiv character-emotionIndex">
            <div class="title"><span class="span-icon">情感指数</span></div>
            <div class="graph-div emotionIndex-graph" id="emotionIndex_graph">

            </div>
        </div>
        <div class="character-div rightDiv character-relatedInfo">
            <div class="title">
                <span class="title-text related-info">相关信息</span>
                <span class="title-text related-positive">正面</span>
                <span class="title-text related-negative selected">负面</span>
            </div>
            <div class="info-content">
                <p class="item" v-for="item in relatedInfoData">
                    <span class="left">
                        {{item.title}}
                    </span>
                    <span class="right">
                        {{item.datetime}}
                    </span>
                </p>
            </div>
        </div>
        <div class="character-div leftDiv character-mediaVolume">
            <div class="title"><span class="span-icon">媒体声量</span></div>
            <div class="graph-div volume-graph" id="volume_graph">
            </div>
        </div>
        <div class="character-div rightDiv mediaHot">
            <div class="title"><span class="span-icon">{媒体热度}</span></div>
            <div class="graph-div hot-graph" id="hot_graph"></div>
        </div>
        <div class="character-div mediaWeek">
            <div class="title"><span class="span-icon">媒体趋势周统计图</span></div>
            <div class="graph-div weekMedia-graph" id="weekMedia_graph"></div>
        </div>
    </div>
</template>

<script>

    import "vue-style-loader!css-loader!sass-loader!./css/characterAnalyse.scss";
    import echarts from "echarts"
    export default{
        data(){
            return {
                characterInfo: {
                    name: '习总',
                    date: '2月22日',
                    college: '清华大学',
                    department: '电子生物',
                    job: '教授',
                    publicAccount: '',
                    weibo: '电子生物习教授'
                },
                tableData: [
                    {
                        'id': 1,
                        'rank': 1,
                        'name': '习总',
                        'voiceNum': 28818,
                        'readNum': 10124,
                        'hot': 1,
                        'emotion': 100
                    }
                ],
                activityData: {
                    title: '',
                    color: ["#5356ed"],
                    grid: {
                        left: '4%',
                        right: '4%'
                    },
                    legend: {
                        data: ['活动']
                    },
                    series: [
                        {
                            data: [31,42,122,197,288,321,431,593,644,798,919,821,566,321,212,216,465,798,899,821,566,321,212,216,431,909,821,566,321,212,216,91,143,371,431,724,947,681,401,724,700,678,700],
                            name: '慰问前线英雄',
                            type: 'line'
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: [
                        {
                            data:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00',
                                '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00', '2009/6/12 12:00', '2009/6/12 13:00',
                                '2009/6/12 14:00', '2009/6/12 15:00', '2009/6/12 16:00', '2009/6/12 17:00', '2009/6/12 18:00', '2009/6/12 19:00',
                                '2009/6/12 20:00', '2009/6/12 21:00','2009/6/23 2:00', '2009/6/23 3:00', '2009/6/23 4:00', '2009/6/23 5:00', '2009/6/23 6:00', '2009/6/23 7:00', '2009/6/23 8:00', '2009/6/23 9:00', '2009/6/23 10:00', '2009/6/23 11:00', '2009/6/23 12:00', '2009/6/23 13:00', '2009/6/23 14:00', '2009/6/23 15:00', '2009/6/23 16:00', '2009/6/23 17:00', '2009/6/23 18:00', '2009/6/23 19:00', '2009/6/23 20:00', '2009/6/23 21:00', '2009/6/23 22:00', '2009/6/23 23:00',
                                '2009/6/24 0:00', '2009/6/24 1:00'],
                            type: 'category',
                            axisLine: {onZero: true},
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            }
                        },
                        {
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            max: 1500,
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            }
                        }
                    ]
                },
                timeLineData: [
                    {date: '2016-12-12 08:00', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 10:00', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 11:00', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 13:30', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 14:20', title: '习近平：推动社会主义和谐家庭新风尚推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 16:00', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 17:20', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 18:00', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 19:10', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 20:30', title: '习近平：推动社会主义和谐家庭新风尚推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 17:20', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 18:00', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 19:10', title: '习近平：推动社会主义和谐家庭新风尚'},
                    {date: '2016-12-12 20:30', title: '习近平：推动社会主义和谐家庭新风尚'}
                ],
                keywords: ['蒙奇·D·路飞','罗罗诺亚·索隆','娜美','乌索普','山治','托尼托尼·乔巴','妮可·罗宾','弗兰奇','布鲁克'],
                emotionData: {
                    color: ["#6076ff"],
                    grid: {
                        left: '4%',
                        right: '4%'
                    },
                    legend: {

                    },
                    series: [
                        {
                            data: [15,7,13,26,-21,-12,-6,8,12,-10,-5,7,12],
                            name: '情感指数',
                            type: 'bar'
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: [
                        {
                            data:['1','3','5','7','9','11','13','15','17','19','21','23','25'],
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            },
                            barWidth: 20
                        }
                    ],
                    yAxis: [
                        {
                            splitArea: {show: false},
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            }
                        }
                    ]
                },

                relatedInfoData: [
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业,然鹅蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业,蓝翔表示不服,脑子是个好东西,我没有。哈哈', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'},
                    {title: '盐城北大青鸟喊你高薪就业蓝翔表示不服', datetime: '2017/01/01 12:12:12'}
                ],

                emotionTrendData: {
                    title: '',
                    color: ["#9383ff","#61fcda"],
                    grid: {
                        left: '4%',
                        right: '4%'
                    },
                    legend: {
                        data: [
                            {
                                name: '正面',
                                textStyle: {
                                    color: "#61fcda"
                                }
                            },
                            {
                                name: '负面',
                                textStyle: {
                                    color: "#9383ff"
                                }
                            }],
                        x: 'right'
                    },
                    series: [
                        {
                            data: [4122,4897,5288,6321,7593,6644,5798,6919,6821,7566,8321,9212,8216,7798,6899,5821,4321,
                                    5216,4731,3909,4566,5321,4212,6216],
                            name: '负面',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    lineStyle: {color: '#9383ff'}
                                }
                            }
                        },
                        {
                            data: [2288,3321,4431,3593,3644,2798,2919,1821,1566,3321,2212,1798,2899,3566,4321,3212,2216,
                                    3431,4909,3821,2212,1891,1143,2371],
                            name: '正面',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    lineStyle: {color: '#61fcda'}
                                }
                            }
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: [
                        {
                            data:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00',
                                '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00', '2009/6/12 12:00', '2009/6/12 13:00',
                                '2009/6/12 14:00',  '2009/6/12 21:00','2009/6/23 2:00', '2009/6/23 3:00', '2009/6/23 4:00', '2009/6/23 5:00',
                                '2009/6/23 6:00', '2009/6/23 7:00', '2009/6/23 8:00', '2009/6/23 9:00',  '2009/6/24 0:00', '2009/6/24 1:00'],
                            type: 'category',
                            axisLine: {onZero: true},
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            }
                        },
                        {
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            max: 10000,
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            }
                        }
                    ]
                },

                mediaVolumeData: {
                    grid: {
                        left: '4%',
                        right: '4%'
                    },
                    legend: {

                    },
                    series: [
                        {
                            data: [-0.3,-0.13,-0.04,0.42,-0.2,0.19,-0.12,-0.58],
                            name: '媒体声量',
                            type: 'bar',
                            itemStyle: {
                                normal: {color:　"#4d66ff"}
                            }
                        },
                        {
                            data: [-0.37,-0.5,-0.29,-0.18,0.3,-0.3,-0.28,-0.57],
                            name: '媒体声量',
                            type: 'bar',
                            itemStyle: {
                                normal: {color: "#c984f8"}
                            }
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: [
                        {
                            data:['1','3','5','7','9','11','13','15','17','19','21','23','25'],
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            },
                            barWidth: 20
                        }
                    ],
                    yAxis: [
                        {
                            splitArea: {show: false},
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            }
                        }
                    ]

                }
            }
        },
        components: {},
        methods: {
            setBreadCrumb(){
                let breadcrumb = [
                    {
                        name: "舆情管理", to: {path: "/"}
                    },
                    {
                        name: "舆情监测", to: {path: "/home/analyse"}
                    },
                    {
                        name: "人物聚焦"
                    },
                    {
                        name: "人物分析", to: {path: "/characterAnalyse"}
                    }
                ];
                this.$store.commit("setBreadCrumb", breadcrumb);
            },


            getActivityData(){
                this.$nextTick(function () {
                    let chart = echarts.init(document.getElementById('character_activity_graph'));
//                    chart.showLoading();
                    chart.setOption(this.activityData)
                })
            },

            getEmotionTrendData(){
                this.$nextTick(function () {
                    let chart = echarts.init(document.getElementById('trend_graph'));
                    chart.setOption(this.emotionTrendData)
                })
            },

            getEmotionIndexData(){
                this.$nextTick(function () {
                    let chart = echarts.init(document.getElementById('emotionIndex_graph'));
                    chart.setOption(this.emotionData);
                })
            },

            getMediaVolumeData(){
                this.$nextTick(function () {
                    let chart = echarts.init(document.getElementById('volume_graph'));
                    chart.setOption(this.mediaVolumeData);
                });
            },

            getMediaHotData(){
                this.$nextTick(function () {
                    let chart = echarts.init(document.getElementById('hot_graph'));
                    chart.setOption(this.mediaVolumeData)
                });
            },

            getMediaWeekData(){
                this.$nextTick(function () {
                   let char = echarts.init(document.getElementById('weekMedia_graph'));

                });
            }
        },
        created(){
            this.setBreadCrumb();
            this.getActivityData();
            this.getEmotionTrendData();
            this.getEmotionIndexData();
            this.getMediaVolumeData();
            this.getMediaHotData();
        },
        props: ["characterId"]
    }
</script>