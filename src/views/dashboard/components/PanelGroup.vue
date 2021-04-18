<template>
  <el-row
    class="panel-group"
    :gutter="40"
  >
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('todo')"
      >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon
            icon-class="peoples"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('userTaskList.todo') }}</div>
          <span class="card-panel-num"> {{ todoNum }} </span>
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('havedo')"
      >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon
            icon-class="message"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('userTaskList.havedo') }}</div>
          <span class="card-panel-num"> {{ haveDoNum }} </span>
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('apply')"
      >
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon
            icon-class="user"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('userTaskList.apply') }}</div>
          <span class="card-panel-num"> {{ applyNum }}</span>
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('draft')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon
            icon-class="money"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('userTaskList.draft') }}</div>
          <span class="card-panel-num"> {{ draftNum }} </span>
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
// import { getCountListByUserType } from '@/api/userTask'
import store from "@/store";

export default {
  components: {},
  data() {
    return {
      applyNum: 0,
      haveDoNum: 0,
      todoNum: 0,
      draftNum: 0,
      userType: "all",
    };
  },
  created() {
    this.$emit("handleSetLineChartData", "todo");
  },
  mounted() {
    // this.getCountListByUserType()
  },
  methods: {
    generateTitle,
    handleSetLineChartData(type) {
      this.$router.push("/" + type || "todo");
    },
    // getCountListByUserType() {
    //   var tenantId = store.getters.tenantId
    //   getCountListByUserType(tenantId, this.userType).then(response => {
    //     this.draftNum = response.data.draft
    //     this.todoNum = response.data.toDo
    //     this.haveDoNum = response.data.haveDo
    //     this.applyNum = response.data.apply
    //   })
    // }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
