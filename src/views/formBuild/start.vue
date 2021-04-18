<template>
  <div>
    <start v-if="show" ref="startProcess" :temp-process-key.sync="processKey" :default-user-value.sync="defaultUserValue" />
  </div>
</template>

<script>
import start from '@/components/BpmFormBuild/start.vue'
import store from '@/store'

export default {
  name: 'Start',
  components: { start },
  props: {

  },
  data() {
    return {
      show: false,
      defaultUserValue: {
        applyCompanyName: store.getters.user.user.companyName,
        applyDeptName: store.getters.user.user.deptName,
        applyUserNickname: store.getters.user.user.realName,
        applyUserId: store.getters.user.user.userId
      },
      processKey: '',
      route: this.$route

    }
  },
  computed: {

  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        this.show = false
        this.route = newValue
        const meta = JSON.parse(this.route.meta.meta)
        this.processKey = meta.processKey
        this.show = true
      },
      deep: true
    }
  },
  mounted() {
    const meta = JSON.parse(this.route.meta.meta)
    console.log(meta)
    this.processKey = meta.processKey
    this.show = true
  },
  created() {
  },
  methods: {

  }

}
</script>

<style scoped>

</style>
