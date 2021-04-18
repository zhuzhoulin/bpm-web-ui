<template>
  <div class="dashboard-container">
    <div class="dashboard-text">以业绩为导向,以流程为驱动！</div>
    <el-divider />
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>风中思絮低代码开发平台</h2>
        <p>
          由于毕业至今一直从事于企业应用相关的工作，在整个过程中有很多思考。包括低代码最早运用于bpm行业，而目前BPM行业聚合度不高，大多商用技术普遍还属于10年前水准,一直就想用技术推动BPM行业发展，做一个全新的简单的低代码开发平台。随着2020年疫情，推动了整个企业应用相关的进程，尤其突出的是重新提出的 低代码甚至零代码开发平台，在大放异彩，趁着这波热风，想给大家分享一个简单的例子。
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="danger">&yen;免费开源</el-tag>
        </p>
        <p>

          <el-button
            type="primary"
            size="mini"
            icon="el-icon-cloudy"
            plain
            @click="goTarget('https://gitee.com/zhuzl002')"
          >访问Github</el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-cloudy"
            plain
            @click="goTarget('https://gitee.com/zhuzl002')"
          >访问码云</el-button>
          <el-button
            size="mini"
            icon="el-icon-s-home"
            plain
            @click="goTarget('http://120.77.218.141:9992/bpm-web/index.html')"
          >访问主页</el-button>
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="18">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <li>flowable</li>
              <li>freemarker</li>
              <li>JWT</li>
              <li>MyBatis</li>
              <li>Druid</li>
              <li>Fastjson</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>Sass</li>
              <li>Quill</li>
              <li>Bpmnjs2.0</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="12">
            <h4 style="color:red">特色功能(可视化)</h4>
            <ul>
              <li>流程设计器</li>
              <li>表单设计器</li>
              <li>代码生成器</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>更新日志</span>
          </div>
          <el-collapse accordion>
            <el-collapse-item title="v1.0.1 - 2021-03-22">
              <ol>
                <li>新增代码生成器</li>
                <li>代码生成器模板</li>
                <li>发布springboot starter 版本</li>
                <li>新增表单设计器组件</li>
                <li>优化界面布局</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>

            <el-collapse-item title="v0.0.1 - 2020-08-12">
              <ol>
                <li>EasyBpm 正式发布</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>loadMap</span>
          </div>
          <div class="body">
            <ol>
              <li>1. 代码生成器支持字表、字典表.支持组合查询，支持生成指定方法；</li>
              <li>2. 流程设计器支持外部链接；</li>
              <li>3. 流程设计器页面改版，移除bpmnjs；</li>
              <li>4. 自定义流程引擎，移除flowable流程引擎；</li>
              <li>5. 发布springcloud版本;</li>
              <li>6. 支持拖拽式报表设计器;</li>
              <li>7. 消息通知；</li>
              <li>8. 组件化首页;</li>
              <li>9. 相关文档及视频；</li>
            </ol>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>联系信息</span>
          </div>
          <div class="body">
            <p>
              <i class="el-icon-s-promotion" /> 演示地址：<el-link
                href="http://120.77.218.141:9992/bpm-web/index.html"
                target="_blank"
              >低代码开发平台</el-link>
            </p>
            <p>
              <i class="el-icon-s-promotion" /> 文档地址：<el-link
                href="http://120.77.218.141:9992/low-code-docs/#/"
                target="_blank"
              >风中思絮低代码开发平台文档</el-link>
            </p>
            <p>
              <svg-icon icon-class="example" /> 代码生成器演示地址：<el-link
                href="http://120.77.218.141:9992/code-gengrator"
                target="_blank"
              >代码生成器</el-link>
            </p>
            <p>
              <svg-icon icon-class="qq" />  EasyBpm QQ群：
              <a
                href="https://jq.qq.com/?_wv=1027&k=KIUjZD5H"
                target="_blank"
              ><span>957664677</span></a>
            </p>
            <p>
              <svg-icon icon-class="documentation" />博客: <el-link
                href="https://blog.csdn.net/zhuzhoulin"
                target="_blank"
              >CSDN</el-link>
            </p>
            <p>
              <svg-icon icon-class="github" /> gitee: <el-link
                href="https://gitee.com/zhuzl002"
                target="_blank"
              >gitee</el-link>
            </p>
            <p>
              <svg-icon icon-class="github" /> github: <el-link
                href="https://gitee.com/zhuzl002"
                target="_blank"
              >gitee</el-link>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">

      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>捐赠支持</span>
          </div>
          <div class="body">
            <img src="https://gitee.com/zhuzl002/bpm-web/raw/master/src/assets/images/20200820181716.jpg" width="48%" height="300" alt="note">
            <img src="https://gitee.com/zhuzl002/bpm-web/raw/master/src/assets/images/20200820181724.jpg" width="48%" height="300" alt="note">
            <span
              style="display: inline-block; height: 30px; line-height: 30px"
            >你可以请作者喝杯咖啡表示鼓励</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>代码生成器演示视频</span>
          </div>
          <div class="body">
            <video-player
              ref="videoPlayer"
              class="video-player vjs-custom-skin"
              :playsinline="true"
              :options="playerOptions"
              @play="onPlayerPlay($event)"
              @pause="onPlayerPause($event)"
            />

          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 轮播图 -->
    <!-- <el-carousel :interval="5000" arrow="always" height="200px">
      <el-carousel-item v-for="item in urls" :key="item">
        <h3 class="medium">  <el-image :key="item" :src="item" style="width: 100%; height: 100%" />
        </h3>
      </el-carousel-item>
    </el-carousel> -->
    <!-- 数量 -->
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <!-- 折线图 -->
    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import { getApplyLineChart } from '@/api/apply'

// import store from '@/store'

// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }

export default {
  name: 'Dashboard',
  // components: { PanelGroup, LineChart },
  components: { videoPlayer },
  data() {
    return {
      // 版本号
      version: '1.0.0',
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: 'http://120.77.218.141:9992/zzlImages/images/easybpmgGnerator.mp4' // url地址
        }],
        hls: true,
        poster: 'http://120.77.218.141:9992/zzlImages/images/playDemo.png', // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          remainingTimeDisplay: false, // 剩余播放时间
          progressControl: true, // 进度条
          fullscreenToggle: true // 全屏按钮
        }
      }

      // lineChartData: lineChartData.newVisitis,
      // urls: [
      //   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      //   'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      //   'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      //   'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      //   'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      //   'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      //   'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      // ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    player() {
      return this.$refs.videoPlayer.player // 自定义播放
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    },
    // 播放回调
    onPlayerPlay(player) {
      console.log('player play!', player)
    },

    // 暂停回调
    onPlayerPause(player) {
      console.log('player pause!', player)
    }

    // handleSetLineChartData(type) {
    //   const _this = this
    //   const param = {
    //     userId: store.getters.userId
    //   }
    //   getApplyLineChart(param).then(response => {
    //     _this.lineChartData = response.data
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
