<template>
  <div>
    <el-upload
      :action="action"
      ref="upload"
      :list-type="listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleOnSuccess"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :limit="limit"
      :headers="headers"
      :data="data"
      :name="name"
      :disabled="disabled"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UploadImg',
  props: {
    data: Object,
    name: {
      type: String,
      default: 'img'
    },
    headers: Object,
    limit: Number,
    multiple: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    listType: String,
    value: {
      type: Array,
      default: () => []
    },
    action: {
      type: String,
      default: 'http://cdn.kcz66.com/uploadFile.txt'
    }
  },
  data() {
    return {
      fileList: this.value
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if (newValue.length === 0) {
          this.$refs.upload.clearFiles()
        }
        // 监听value,变化时让fileList也变化
        this.fileList = newValue
      },
      deep: true
    }

  },
  methods: {
    handleOnSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.fileList.push({
          name: file.name,
          url: response.data.url,
          fileId: response.data.fileId,
          uid: file.uid
        })
      } else if (response.code === 1) {
        this.$message({
          showClose: true,
          message: `上传${file.name}图片服务器返回code为1`,
          type: 'error'
        })
      }

      this.$emit('input', this.fileList)
      this.$emit('onSuccess', response, file, fileList)
    },
    beforeUpload(file) {
      this.$emit('beforeUpload', file)
    },
    handleRemove(file, fileList) {
      this.fileList = [...fileList]
      this.$emit('input', this.fileList)
      this.$emit('onRemove', file, fileList)
    },

    handlePictureCardPreview(file) {
    }
  }
}
</script>
