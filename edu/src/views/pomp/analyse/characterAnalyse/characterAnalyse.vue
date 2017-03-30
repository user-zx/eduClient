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
            <div class="keywords-list graph-div" id="keywords">
                <!--<span v-for="item in keywords">-->
                    <!--{{item}}-->
                <!--</span>-->
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
            <div class="title"><span class="span-icon">媒体热度</span></div>
            <div class="graph-div hot-graph" id="hot_graph"></div>
        </div>
        <div class="character-div character-mediaWeek">
            <div class="title">
                <span class="span-icon">媒体趋势周统计图</span>
            </div>
            <div class="graph-div weekMedia-graph" id="weekMedia_graph"></div>
        </div>
        <div class="character-div character-statistics">
            <div class="title"><span class="span-icon">舆情数据统计</span></div>
            <div class="statistics-table graph-div">
                <el-table :data="statisticsData" class="tran-table" style="width: 100%" :resizable="false">
                    <el-table-column fixed prop="coverage" label="载体\时间" width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="date1" label="2017/02/09" align="center"></el-table-column>
                    <el-table-column prop="date2" label="2017/02/10" align="center"></el-table-column>
                    <el-table-column prop="date3" label="2017/02/11" align="center"></el-table-column>
                    <el-table-column prop="date4" label="2017/02/12" align="center"></el-table-column>
                    <el-table-column prop="date5" label="2017/02/13" align="center"></el-table-column>
                    <el-table-column prop="date6" label="2017/02/14" align="center"></el-table-column>
                    <el-table-column prop="date7" label="2017/02/15" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
        <!--carrier dis: carrier:载体  distribute:分布-->
        <div class="character-div character-carrierDis">
            <div class="title"><span class="span-icon">载体分布统计图</span></div>
            <div class="graph-div item carrierDis-graph" id="carrierDis_graph"></div>
            <div class="carrierDis-table">
                <el-table :data="carrierTableData" class="tran-table no-col-title" style="width: 100%" :resizable="false">
                    <el-table-column fixed prop="coverage" label="载体" width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="positive" label="正面文章数" align="center"></el-table-column>
                    <el-table-column prop="negative" label="负面文章数" align="center"></el-table-column>
                </el-table>
            </div>
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

                },
                mediaWeekData: {
                    title: '',
                    color: ['#6c9aff','#6cfdff','#a06cff','#faff6c','#9383ff','#ff6cef','#6cbfff','#ffc26c'],
                    grid: {
                        left: '4%',
                        right: '4%'
                    },
                    legend: {
                        data: [
                            {
                                name: '新闻',
                                textStyle: {color: '#6c9aff'}
                            },
                            {
                                name: '其他',
                                textStyle: {color: '#6cfdff'}
                            },
                            {
                                name: '微信',
                                textStyle: {color: '#a06cff'}
                            },
                            {
                                name: 'QQ群',
                                textStyle: {color: '#faff6c'}
                            },
                            {
                                name: '综合',
                                textStyle: {color: '#9383ff'}
                            },
                            {
                                name: '博客',
                                textStyle: {color: '#ff6cef'}
                            },
                            {
                                name: '微博',
                                textStyle: {color: '#6cbfff'}
                            },
                            {
                                name: '论坛',
                                textStyle: {color: '#ffc26c'}
                            }
                        ]
                    },
                    series: [
                        {
                            data: [7999,11800,12200,8999,9999,10421,12000,13999,10421,14010],
                            name: '微信',
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
                            data:['1/2:00:00', '2/3:00:00', '1/4:00:00', '1/5:00:00', '1/6:00:00', '1/7:00:00',
                                '1/8:00:00', '2/9:00:00', '3/10:00:00', '1/11:00:00'],
                            type: 'category',
                            axisLine: {onZero: true},
                            axisLabel: {
                                textStyle: {color: '#424d74'},
                                interval: 0
                            }
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            max: 15000,
                            axisLabel: {
                                textStyle: {color: '#424d74'}
                            }
                        }
                    ]
                },
                statisticsData: [
                    {
                        date1: 123,
                        date2: 11,
                        date3: 121,
                        date4: 33,
                        date5:78,
                        date6: 9,
                        date7: 19,
                        coverage: '微信',

                    }, {
                        date1: 13,
                        date2: 61,
                        date3: 121,
                        date4: 83,
                        date5:48,
                        date6: 39,
                        date7: 19,
                        coverage: '微博',
                    }, {
                        date1: 113,
                        date2: 61,
                        date3: 21,
                        date4: 83,
                        date5: 28,
                        date6: 79,
                        date7: 94,
                        coverage: '论坛',
                    }, {
                        date1: 13,
                        date2: 61,
                        date3: 121,
                        date4: 83,
                        date5: 48,
                        date6: 39,
                        date7: 19,
                        coverage: '报纸',
                    }, {
                        date1: 13,
                        date2: 61,
                        date3: 121,
                        date4: 83,
                        date5:48,
                        date6: 39,
                        date7: 19,
                        coverage: '贴吧',
                    }, {
                        date1: 43,
                        date2: 21,
                        date3: 21,
                        date4: 83,
                        date5: 108,
                        date6: 90,
                        date7: 19,
                        coverage: 'QQ群',
                    }
                ],
                carrierDisData: {
                    title: '',
                    color: ["#5356ed","#6076ff", "#60a3fe", "#60dab3", "#fbff5"],
                    grid: {
                        left: '4%',
                        right: '4%'
                    },
                    legend: {
                        data: ['微信','贴吧','论坛','qq群','微博','门户网站']
                    },
                    series: [
                        {
                            data: [
                                {name: '微信', value: 5251},
                                {name: '贴吧', value: 3328},
                                {name: '论坛', value: 4888},
                                {name: 'qq群', value: 6767},
                                {name: '微博', value: 4000},
                                {name: '门户网站', value: 7022}
                            ],
                            name: '载体分布统计',
                            type: 'pie',
                            radius: ['40%', '55%']
                        },
                        {
                            data: [
                                {name: '正面', value: 6666},
                                {name: '负面', value: 4577}
                            ],
                            name: '正负面统计图',
                            type: 'pie',
                            radius: ['55%', '45%']
                        }
                    ],
                    textStyle: {
                        color: "#434f70",
                        fontFamily: "sans-serif",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal",
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: '',
                    yAxis: ''
                },
                carrierTableData: [
                    {
                        coverage: '新闻',
                        positive: 800,
                        negative: 33
                    },
                    {
                        coverage: 'QQ群',
                        positive: 340,
                        negative: 13
                    },
                    {
                        coverage: '微博',
                        positive: 1038,
                        negative: 31
                    },
                    {
                        coverage: '博客',
                        positive: 130,
                        negative: 3
                    },
                    {
                        coverage: '论坛',
                        positive: 459,
                        negative: 23
                    },
                    {
                        coverage: '其他',
                        positive: 910,
                        negative: 20
                    }
                ],
                keywordsData: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    series: [
                        {
                            type: 'wordCloud',
                            gridSize: 1,
                            sizeRange: [10, 35],
                            rotationRage: [0,90],
                            rotationStep: 90,
                            maskImage: new Image(),
                            textStyle: {
                                normal: {
                                    color: function (v) {
                                        if(v.value > 1000){
                                            return 'rgb(0, 116, 111)';
                                        }else if(v.value > 800){
                                            return 'rgb(0, 156, 137)';
                                        }else if(v.value >　100){
                                            return 'rgb(70, 209, 133)';
                                        }
                                    }
                                }
                            },
                            width: 400,
                            height: 400,
                            top: 40,
                            data: [
                                {name: '蒙奇·D·路飞', value: 1200},
                                {name: '罗罗诺亚·索隆', value: 1200},
                                {name: '娜美', value: 800},
                                {name: '乌索普', value: 600},
                                {name: '山治', value: 800},
                                {name: '妮可罗宾', value: 900},
                                {name: '托尼托尼·乔巴', value: 400},
                                {name: '弗兰奇', value: 300},
                                {name: '布鲁克', value: 200},
                                {name: '艾斯-男神', value: 1500},
                            ]
                        }
                    ],
                    graphic: {
                        elements: [{
                            type: 'image',
                            style: {
                                image: '',
                                width: 40,
                                height: 40
                            },
                            left: 'center',
                            top:　40
                        }]
                    }
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
                   let chart = echarts.init(document.getElementById('weekMedia_graph'));
                    chart.setOption(this.mediaWeekData);
                });
            },

            getCarrierDisData(){
                this.$nextTick(function () {
                    let chart = echarts.init(document.getElementById('carrierDis_graph'));
                    chart.setOption(this.carrierDisData);
                })
            },

            getKeyWordsData(){
                this.$nextTick(function () {
                    let chart = echarts.init(document.getElementById('keywords'));
                    chart.setOption(this.keywordsData);
                })
            }
        },
        created(){
            this.setBreadCrumb();
            this.getActivityData();
            this.getEmotionTrendData();
            this.getEmotionIndexData();
            this.getMediaVolumeData();
            this.getMediaHotData();
            this.getMediaWeekData();
            this.getCarrierDisData();
            this.getKeyWordsData();
        },
        props: ["characterId"]
    }
</script>