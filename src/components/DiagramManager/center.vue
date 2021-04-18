<template>
  <div id="app-container">
    <div id="center" ref="center">
      <div
        ref="content"
        class="containers"
      >
        <div
          ref="canvas"
          class="canvas"
        />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'DesignCenter',
  components: {
    // diagramManager
  },
  props: {
  },
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {
    // 删除 bpmn logo
    const bjsIoLogo = document.querySelector('.bjs-powered-by')
    while (bjsIoLogo.firstChild) {
      bjsIoLogo.removeChild(bjsIoLogo.firstChild)
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
/* 验证流程图样式 */
@import "~bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css";
.content {
  position: relative;
  width: 100%;
  height: 100%;

  > .message {
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;

    font-size: 16px;
    color: #111;

    .note {
      vertical-align: middle;
      text-align: center;
      display: table-cell;
    }

    &.error {
      .details {
        max-width: 500px;
        font-size: 12px;
        margin: 20px auto;
        text-align: left;
        color: #BD2828;
      }

      pre {
        border: solid 1px #BD2828;
        background: #fefafa;
        padding: 10px;
        color: #BD2828;
      }
    }
  }
  &:not(.with-error) .error,
  &.with-error .intro,
  &.with-diagram .intro {
    display: none;
  }
}
</style>
