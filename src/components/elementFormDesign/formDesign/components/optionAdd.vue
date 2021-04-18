<template>
  <div style="margin-top: 8px">

    <div v-if="type == 'tree' || type == 'treeSelect'" class="block">
      <el-tree
        :data="value"
        show-checkbox
        node-key="id"
        default-expand-all
        draggable
        :expand-on-click-node="false"
      >
        <!-- <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)"
            >
              新增
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span> -->
        <div slot-scope="{ node, data }" class="custom-tree-node">
          <div class="custom-tree-node">
            <span v-if="data.label&&!node.checked" class="node-tit">{{ data.label }}</span>
            <div v-else>
              <el-input v-model="data.label" />
              <el-button class="save-btn" @click="saveLable(node, data)">保存</el-button>
            </div>
            <span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="() => insertAfter(node, data)">添加同级节点</el-dropdown-item>
                  <el-dropdown-item @click.native="() => append(node,data)">添加子级节点</el-dropdown-item>
                  <el-dropdown-item @click.native="() => nodeClick(node)">重命名</el-dropdown-item>
                  <el-dropdown-item @click.native="() => remove(node, data) ">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </div>

      </el-tree>
    </div>

    <div v-else>
      <el-row v-for="(item,index) in value" :key="index" :gutter="5" style="margin-top: 6px">
        <el-col :span="9">
          <el-input v-model="item.label" placeholder="请输入字典文本" />
        </el-col>
        <el-col :span="9">
          <el-input v-model="item.value" placeholder="请输入字典值" />
        </el-col>
        <el-col :span="6">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(index)" />
        </el-col>
      </el-row>
      <a href="#" @click="addItem">增加数据</a>
    </div>

  </div>
</template>

<script>

export default {
  name: 'OptionAdd',
  props: {
    value: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteItem(index) {
      const options = [
        ...this.value
      ]
      if (options.length <= 1) {
        return
      }
      options.splice(index, 1)
      this.$emit('input', options)
    },
    addItem() {
      const key = new Date().getTime()
      const options = [
        ...this.value,
        {
          value: '',
          label: '',
          key
        }
      ]
      this.$emit('input', options)
    },

    // append(data) {
    //   const newChild = { id: id++, label: 'testtest', children: [] }
    //   if (!data.children) {
    //     this.$set(data, 'children', [])
    //   }
    //   data.children.push(newChild)
    // },

    // remove(node, data) {
    //   const parent = node.parent
    //   const children = parent.data.children || parent.data
    //   const index = children.findIndex(d => d.id === data.id)
    //   children.splice(index, 1)
    // },

    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class='custom-tree-node'>
    //       <span>{node.label}</span>
    //       <span>
    //         <el-button size='mini' type='text' on-click={ () => this.append(data) }>新增</el-button>
    //         <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>删除</el-button>
    //       </span>
    //     </span>)
    // },
    // 添加同级节点
    insertAfter(node, data) {
      const nodeList = node.parent.childNodes
      const curArr = node.parent.data.children || node.parent.data
      const index = curArr.findIndex(d => d.id === data.id) + 1
      console.log(node)
      new Promise((resolve, reject) => {
        const newBrother = { id: ++this.id, label: '', children: [] }
        curArr.splice(index, 0, newBrother)
        resolve()
      }).then(res => {
        console.log(nodeList[index])
        nodeList[index].checked = true
      })
    },
    // 添加子节点
    append(node, data) {
      const nodeList = node.childNodes
      console.log(nodeList)
      new Promise((resolve, reject) => {
        const newChild = { id: ++this.id, label: '', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        resolve()
      }).then(res => {
        nodeList[nodeList.length - 1].checked = true
      })
    },
    // 获取当前节点修改checked值
    nodeClick(node) {
      node.checked = true
    },
    // 删除节点
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    // 保存label
    saveLable(node) {
      node.checked = false
    }
  }
}
</script>
<style scoped>
  a{
    text-decoration:none;
  }
  a:hover{
    color: #409eff;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

