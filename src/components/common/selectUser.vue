<template>
  <div
    ref="addUser"
    class="rightPanel-container"
  >
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="rightPanel-items">
        <div class="el-dialog__header">
          <span class="el-dialog__title">{{ dialogTitle }}</span>
          <button
            type="button"
            aria-label="Close"
            class="el-dialog__headerbtn"
            @click="close"
          >
            <i class="el-dialog__close el-icon el-icon-close" />
          </button>
        </div>

        <div
          v-loading="loading"
          class="container-info"
        >
          <div
            class="el-transfer-panel"
            style="margin-left: 20px;"
          >
            <p class="el-transfer-panel__header">
              <span>请选择人员</span>
            </p>

            <div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">
              <el-input
                v-model="userFilterText"
                placeholder="输入关键字进行过滤"
                prefix-icon="el-icon-search"
              />
            </div>

            <div class="el-transfer-panel__body">
              <el-tree
                ref="addUserTree"
                :data="organTree"
                show-checkbox
                node-key="id"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                :default-checked-keys.sync="defaultCheckedUsers"
                @check="checkChange"
              >
                <span
                  slot-scope="{ node, data }"
                  class="custom-tree-node"
                >
                  <span v-if="data.treeTypeCode =='user'">
                    <svg-icon icon-class="user" />
                    {{ data.treeName }}
                  </span>
                  <span
                    v-else
                    style="color: #409eff;"
                  >{{ data.treeName }}</span>
                </span>
              </el-tree>
            </div>
          </div>

          <div class="el-transfer__buttons">
            <el-button
              type="primary"
              size="small"
              class="el-transfer__button is-with-texts"
              @click="selectUser"
            >
              <i class="el-icon-arrow-right" />
              添加
            </el-button>
          </div>

          <div class="el-transfer-panel">
            <p class="el-transfer-panel__header">
              <span>已选的人员（{{ rightUserCount }} 个）</span>
            </p>

            <div class="el-transfer-panel__body">
              <div style="margin-left:5px;">
                <el-tag
                  v-for="(item, index) in rightUserList"
                  :key="index"
                  style="margin: 5px;"
                  closable
                  :disable-transitions="false"
                  size="medium"
                  @close="removeUser(index)"
                >
                  {{ item.label }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

        <div class="el-dialog__footer">
          <div class="dialog-footer">
            <el-button @click="close">
              {{ $t('table.cancel') }}
            </el-button>
            <el-button
              type="primary"
              @click="addNodeUser"
            >
              {{ $t('table.confirm') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getOrganUserTree, getUserList } from "@/api/system/user";
import store from "@/store";

export default {
  name: "SelectUser",
  components: {},
  props: {
    defaultUsers: {
      type: Array,
      require: false,
      default: () => [],
    },
    title: {
      type: String,
      require: false,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      dialogTitle: this.title,
      userList: [],
      organTree: [],
      defaultCheckedUsers: [],
      userFilterText: "",
      rightUserList: [],
      rightUserCount: 0,
    };
  },
  computed: {},
  watch: {
    userFilterText(val) {
      this.$refs.addUserTree.filter(val);
    },
    defaultUsers: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.setDefaultCheckedUsers(newValue);
        } else {
          this.defaultCheckedUsers = [];
        }
      },
    },
  },
  mounted() {
    if (this.defaultUsers) {
      this.setDefaultCheckedUsers(this.defaultUsers);
    } else {
      this.defaultCheckedUsers = [];
    }
  },
  created() {
    this.getOrganUserTree();
  },
  methods: {
    close() {
      this.$nextTick(function () {
        this.$emit("close");
      });
    },
    getOrganUserTree() {
      this.loading = true;
      const param = {
        tenantId: store.getters.tenantId,
        parentId: 0,
      };
      getOrganUserTree(param)
        .then((response) => {
          this.$nextTick(() => {
            this.organTree = response.data;
            this.loading = false;
          });
        })
        .catch((err) => {
          this.$nextTick(() => {
            this.loading = false;
          });
          console.log(err, "失败");
        });
    },
    removeUser(index) {
      const userId = this.rightUserList[index].userId;
      const deptId = this.rightUserList[index].deptId;
      this.rightUserList.splice(index, 1);
      const checkedNodes = this.$refs.addUserTree.getCheckedNodes(true);
      checkedNodes.forEach((item) => {
        if (
          item.type === "user" &&
          item.id === userId &&
          item.deptId === deptId
        ) {
          this.$refs.addUserTree.setChecked(item, false, false);
        }
      });
      this.rightUserCount = this.rightUserList.length;
    },
    addNodeUser() {
      const selectIdList = [];
      const selectNameList = [];

      this.rightUserList.forEach((item, index) => {
        selectIdList.push(item.userId);
        selectNameList.push(item.realname);
      });

      this.$nextTick(function () {
        this.$emit("save", selectIdList.join(","), selectNameList.join(","));
      });
    },
    selectUser() {
      this.rightUserList = [];
      if (this.$refs.addUserTree) {
        const checkedNodes = this.$refs.addUserTree.getCheckedNodes();
        this.formatRightUserList(checkedNodes);
      }
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.treeName.indexOf(value) !== -1;
    },
    checkChange(data, selectData) {
      if (!data) {
        return;
      }
      this.formatRightUserList(selectData.checkedNodes);
    },

    formatRightUserList(data = []) {
      this.rightUserList = [];
      data.forEach((item) => {
        if (item.treeTypeCode === "user") {
          this.rightUserList.push({
            realname: item.treeName,
            username: item.treeCode,
            userId: item.treeId,
            deptId: item.parentId,
            label: item.treeName + "（" + item.treeId + "）",
          });
        }
      });

      this.rightUserCount = this.rightUserList.length;
    },
    setDefaultCheckedUsers(userIds) {
      if (userIds) {
        const userIdList = userIds;
        // userIds.split(',').forEach((value, index) => { userIdList.push(value) })
        const postData = {
          userIdList: userIdList,
        };
        getUserList(postData).then((response) => {
          const rightUserList = [];
          response.data.forEach((item, index) => {
            rightUserList.push({
              realname: item.realName,
              username: item.userName,
              userId: item.userId,
              deptId: item.deptId,
              label: item.realName + "（" + item.userId + "）",
            });
          });
          this.defaultCheckedUsers = rightUserList;
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.rightPanel-background {
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  position: fixed;
  z-index: -1;
}

.handle-button {
  position: absolute;
  left: -48px;
  border-radius: 6px 0 0 6px !important;
  width: 48px;
  height: 48px;
  pointer-events: auto;
  z-index: 0;
  cursor: pointer;
  pointer-events: auto;
  font-size: 24px;
  text-align: center;
  color: #fff;
  line-height: 48px;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}

.container-info {
  background: #ffffff;
  min-height: 88vh;
  border-radius: 5px;

  .el-transfer-panel {
    margin: 5px 0px 0px 0px;
    width: 360px;
    overflow: auto;
    min-height: 86vh;
  }
}

.el-dialog__footer {
  padding: 10px;
}
</style>
