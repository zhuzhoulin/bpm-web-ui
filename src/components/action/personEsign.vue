<template>
  <div id="app">
    <!--
    属性	类型	默认值	说明
width	Number	800	画布宽度，即导出图片的宽度
height	Number	300	画布高度，即导出图片的高度
lineWidth	4	Number	画笔粗细
lineColor	String	#000000	画笔颜色
bgColor	String	空	画布背景色，为空时画布背景透明，
支持多种格式 '#ccc'，'#E5A1A1'，'rgb(229, 161, 161)'，'rgba(0,0,0,.6)'，'red'
isCrop	Boolean	false	是否裁剪，在画布设定尺寸基础上裁掉四周空白部分 -->
    <vue-esign
      ref="persionSign"
      style="width:100%;height:83vh !important;border-bottom: 1px dashed #c2c1c1;"
      :is-crop="isCrop"
      :line-width="lineWidth"
      :line-color="lineColor"
      :bg-color.sync="bgColor"
    />

    <div class="btn">
      <el-button type="primary" @click="handleReset">重置</el-button>
      <el-button type="info" @click="handleGenerate">确定</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PersionSign',
  components: { },
  props: {

  },
  data() {
    return {
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {
  },
  methods: {
    submit() {
      this.$emit('save', this.addSignForm.signType, this.addSignForm.nodeUsers.join(','))
    },
    handleReset() { // 清除
      this.$refs.persionSign.reset()
    },
    handleGenerate() { // 获取base64
      var _this = this
      _this.$refs.persionSign.generate().then(res => {
        // res base64 图片

        // 转成文件
        var blob = _this.dataURLtoBlob(res)
        var tofile = _this.blobToFile(blob, '签名.jpg')
        console.log(tofile)
        setTimeout(async() => {
          const formData = new FormData()
          formData.append('file', tofile, tofile.name)
          formData.append('fileType', 9)
          // ajax 请求
        })
      }).catch(err => {
        _this.$toast(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    },
    // 将base64转换为blob
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    // 将blob转换为file
    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date()
      theBlob.name = fileName
      return theBlob
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
