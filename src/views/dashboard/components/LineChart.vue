<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: 'vertical',
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: 'right',
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: 'top',
          data: []
        },

        tooltip: {
          show: true, // 显示工具箱
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          feature: {
            dataView: { show: true }, // 以文字形式显示数据
            restore: { show: true }, // 还原
            dataZoom: { show: true }, // 区域缩放
            saveAsImage: { show: true }, // 保存图片
            magicType: { type: ['line', 'bar'] }// 动态数据切换，数据显示可以在该规定内容中切换显示方式，
          }
        },
        //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
        grid: {
          top: '16%', // 等价于 y: '16%'
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },

        // 工具框，可以选择
        toolbox: {
          feature: {
            saveAsImage: {} // 下载工具
          }
        },

        xAxis: {
          name: '月份',
          type: 'category',
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: '#912CEE'
            }
          },
          // 设置X轴数据旋转倾斜
          axisLabel: {
            rotate: 30, // 旋转角度
            interval: 0 // 设置X轴数据间隔几个显示一个，为0表示都显示
          },
          // boundaryGap值为false的时候，折线第一个点在y轴上
          boundaryGap: false,
          data: []
        },

        yAxis: {
          name: '数值',
          type: 'value',
          min: 0, // 设置y轴刻度的最小值
          max: 1800, // 设置y轴刻度的最大值
          splitNumber: 10, // 设置y轴刻度间隔个数
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: '#87CEFA'
            }
          }
        },

        series: [

        ]
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setChartOptions(val)
      }
    },
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(
          newValue
        )
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setChartOptions(data) {
      const _this = this
      var option = _this.option
      option.title.text = data.titleText
      option.title.subtext = data.subtext
      option.legend.data = data.legendDataList
      option.xAxis.data = data.xAxisDataList
      option.yAxis.max = data.yAxisMax
      var dataList = []
      for (var index in data.dataList) {
        dataList.push({
          name: data.legendDataList[index],
          data: data.dataList[index],
          type: 'line',
          // 设置小圆点消失
          // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效 circle
          symbol: 'circle',
          // 设置折线弧度，取值：0-1之间
          smooth: 0.5,
          symbolSize: 5,
          //     // 设置拐点为实心圆

          markLine: {
            itemStyle: {
              normal: { lineStyle: { type: 'solid', color: '#000' }, label: { show: true, position: 'left' }}
            }}
        })
      }
      option.series = dataList
      _this.option = option
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: expectedData.xAxis.data,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [{
          name: 'expected', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      console.log(this.chartData)

      console.log(this.chart)
      this.chart.showLoading({
        text: '正在努力的读取数据中...'
      })
      this.chart.setOption(
        this.option
      )
      this.chart.hideLoading()
    }
  }
}
</script>
