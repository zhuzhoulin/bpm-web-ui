<template>
  <div id="app">
    <el-form ref="addSign" :model="addSignForm" label-width="auto" :rules="addSignRule">
      <el-form-item label="加签类型" prop="signType">
        <el-switch
          v-model="addSignForm.signType"
          active-value="befor"
          inactive-value="after"
          active-text="前加签"
          inactive-text="后加签"
        />
      </el-form-item>
      <el-form-item label="加签人员" prop="nodeUsers">
        <el-select v-model="addSignForm.nodeUsers" filterable multiple placeholder="请选择">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('addSign')">  {{ $t('table.confirm') }}</el-button>
        <el-button @click="cancel">{{ $t('table.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
import { getUserList } from '@/api/system/user'
export default {
  name: 'AddSign',
  components: { },
  props: {

  },
  data() {
    return {
      addSignForm: {
        signType: 'after',
        nodeUsers: []
      },
      addSignRule: {
        nodeUsers: [
          { required: true, message: '请选择人员', trigger: 'change' }
        ]
      },
      userOptions: [

      ]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.getUserList()
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('save', this.addSignForm.signType, this.addSignForm.nodeUsers.join(','))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      console.log('1')
      this.$emit('close')
    },
    getUserList() {
      const postData = {
        tenantId: store.getters.tenantId
      }
      getUserList(postData).then(response => {
        const list = []
        response.data.list.forEach((item, index) => {
          list.push({
            index: index,
            value: item.userId,
            label: item.realName + '（' + item.userId + '）'
          })
        })
        this.userOptions = list
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
