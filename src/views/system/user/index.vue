<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">
          <el-form-item label="用户编号 ">
            <el-input v-model="listQuery.userId" placeholder="请输入用户编号 " />
          </el-form-item>
          <el-form-item label="用户账户 ">
            <el-input v-model="listQuery.userName" placeholder="请输入用户账户 " />
          </el-form-item>
          <el-form-item label="用户名称 ">
            <el-input v-model="listQuery.realName" placeholder="请输入用户名称 " />
          </el-form-item>
          <el-form-item label="邮箱 ">
            <el-input v-model="listQuery.email" placeholder="请输入邮箱 " />
          </el-form-item>

          <el-form-item label="公司编号 ">
            <treeselect v-model="listQuery.companyId" style="width:200px" :options="companyOptions" :normalizer="companyNormalizer" placeholder="选择公司" />
          </el-form-item>

          <el-form-item label="部门编号 ">
            <treeselect v-model="listQuery.deptId" style="width:200px" :options="deptOptions" :normalizer="deptNormalizer" placeholder="选择部门" />
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves type="success" icon="el-icon-search" @click="getList">查询</el-button>
          <el-button v-waves icon="el-icon-download" @click="download">导出</el-button>
          <el-button v-waves type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
        </span>
      </div>
      <div class="table-container">
        <el-row :gutter="10" class="mb8">
          <right-toolbar :show-search.sync="showSearch" :columns="columns" :default-hide-columns.sync="defaultHideColumns" @queryTable="getList" />
        </el-row>
        <el-table v-loading="listLoading" :data="list" size="mini" element-loading-text="Loading" fit border highlight-current-row>
          <el-table-column align="center" label="序号" width="95" sortable>
            <template slot-scope="scope">
              {{ (listQuery.pageIndex - 1 ) * listQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column v-if="columns[0].visible" label="唯一编号 " prop="id" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[1].visible" label="用户编号 " prop="userId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[2].visible" label="用户账户 " prop="userName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[3].visible" label="用户名称 " prop="realName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="邮箱 " prop="email" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[5].visible" label="联系方式 " prop="phone" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[6].visible" label="岗位编码 " prop="positionCode" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[7].visible" label="岗位名称 " prop="positionName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="性别 " prop="gender" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[9].visible" label="头像链接 " prop="avatar" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[10].visible" label="生日" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.birthDate }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[11].visible" label="公司编号 " prop="companyId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[12].visible" label="部门编号 " prop="deptId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[13].visible" label="租户编号 " prop="tenantId" align="center" sortable :show-overflow-tooltip="true" />
          <!-- <el-table-column v-if="columns[14].visible" label="密码 " prop="password" align="center" sortable :show-overflow-tooltip="true" /> -->
          <el-table-column v-if="columns[15].visible" label="入职时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.entryTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[16].visible" label="离职时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.leaveTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[17].visible" label="雇佣状态 " prop="hireStatus" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[18].visible" label="来源 " prop="source" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[19].visible" label="是否锁定 " prop="lockStatus" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[20].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[21].visible" label="操作人工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[22].visible" label="操作人姓名 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[23].visible" label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[24].visible" label="更新时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" min-width="200px">
            <template slot-scope="scope">
              <el-button v-waves size="mini" type="primary" icon="el-icon-edit" plain @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button v-waves size="mini" type="danger" icon="el-icon-delete" plain @click="handleDelete(scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-footer">
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" style="float:right;" @pagination="getList" />
        </div>
      </div>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="false" label="唯一编号 :" prop="id">
            <el-input v-model="form.id" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="用户编号 :" prop="userId">
            <el-input
              v-model="form.userId"
              placeholder="请输入用户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="用户账户 :" prop="userName">
            <el-input
              v-model="form.userName"
              placeholder="请输入用户账户 "
              :maxlength="64"
            />
          </el-form-item>
          <el-form-item v-if="true" label="用户名称 :" prop="realName">
            <el-input
              v-model="form.realName"
              placeholder="请输入用户名称 "
              :maxlength="128"
            />
          </el-form-item>
          <el-form-item v-if="true" label="邮箱 :" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="联系方式 :" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入联系方式 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="岗位编码 :" prop="positionCode">
            <el-input
              v-model="form.positionCode"
              placeholder="请输入岗位编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="岗位名称 :" prop="positionName">
            <el-input
              v-model="form.positionName"
              placeholder="请输入岗位名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="性别 :" prop="gender">
            <el-input
              v-model="form.gender"
              placeholder="请输入性别 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="头像链接 :" prop="avatar">
            <el-input
              v-model="form.avatar"
              placeholder="请输入头像链接 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="生日 :" prop="birthDate">
            <el-date-picker v-model="form.birthDate" type="date" placeholder="请输入生日 " />
          </el-form-item>

          <el-form-item v-if="true" label="公司编号 :" prop="companyId">
            <treeselect v-model="form.companyId" :options="companyOptions" :normalizer="companyNormalizer" placeholder="选择公司" />
          </el-form-item>
          <el-form-item v-if="true" label="部门编号 :" prop="deptId">
            <treeselect v-model="form.deptId" :options="deptOptions" :normalizer="deptNormalizer" placeholder="选择部门" />
          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="form.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="密码 :" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="入职时间 :" prop="entryTime">
            <el-date-picker v-model="form.entryTime" type="date" placeholder="请输入入职时间 " />
          </el-form-item>
          <el-form-item v-if="true" label="离职时间 :" prop="leaveTime">
            <el-date-picker v-model="form.leaveTime" type="date" placeholder="请输入离职时间 " />
          </el-form-item>
          <el-form-item v-if="true" label="雇佣状态 :" prop="hireStatus">
            <el-input
              v-model="form.hireStatus"
              placeholder="请输入雇佣状态 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="来源 :" prop="source">
            <el-input
              v-model="form.source"
              placeholder="请输入来源 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="是否锁定 :" prop="lockStatus">
            <el-switch v-model="form.lockStatus" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item v-if="true" label="有效状态 :" prop="validState">
            <el-switch v-model="form.validState" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item v-if="false" label="操作人工号 :" prop="operatorId">
            <el-input
              v-model="form.operatorId"
              placeholder="请输入操作人工号 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作人姓名 :" prop="operatorName">
            <el-input
              v-model="form.operatorName"
              placeholder="请输入操作人姓名 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="form.createTime" type="date" placeholder="请输入创建时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="form.updateTime" type="date" placeholder="请输入更新时间 " />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves @click="dialogVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="updateDialogVisible" width="40%" @close="handleDialogClose">
        <el-form ref="updateDataForm" :model="updateForm" :rules="updateRules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="false" label="唯一编号 :" prop="id">
            <el-input v-model="updateForm.id" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="用户编号 :" prop="userId">
            <el-input
              v-model="updateForm.userId"
              placeholder="请输入用户编号 "
              disabled
            />
          </el-form-item>
          <el-form-item v-if="true" label="用户账户 :" prop="userName">
            <el-input
              v-model="updateForm.userName"
              placeholder="请输入用户账户 "
              :maxlength="64"
              :minlength="6"
            />
          </el-form-item>
          <el-form-item v-if="true" label="用户名称 :" prop="realName">
            <el-input
              v-model="updateForm.realName"
              placeholder="请输入用户名称 "
              :maxlength="128"
            />
          </el-form-item>
          <el-form-item v-if="true" label="邮箱 :" prop="email">
            <el-input
              v-model="updateForm.email"
              placeholder="请输入邮箱 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="联系方式 :" prop="phone">
            <el-input
              v-model="updateForm.phone"
              placeholder="请输入联系方式 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="岗位编码 :" prop="positionCode">
            <el-input
              v-model="updateForm.positionCode"
              placeholder="请输入岗位编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="岗位名称 :" prop="positionName">
            <el-input
              v-model="updateForm.positionName"
              placeholder="请输入岗位名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="性别 :" prop="gender">
            <el-input
              v-model="updateForm.gender"
              placeholder="请输入性别 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="头像链接 :" prop="avatar">
            <el-input
              v-model="updateForm.avatar"
              placeholder="请输入头像链接 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="生日 :" prop="birthDate">
            <el-date-picker v-model="updateForm.birthDate" type="date" placeholder="请输入生日 " />
          </el-form-item>
          <el-form-item v-if="true" label="公司编号 :" prop="companyId">
            <treeselect v-model="updateForm.companyId" :options="companyOptions" :normalizer="companyNormalizer" placeholder="选择公司" />
          </el-form-item>
          <el-form-item v-if="true" label="部门编号 :" prop="deptId">
            <treeselect v-model="updateForm.deptId" :options="deptOptions" :normalizer="deptNormalizer" placeholder="选择部门" />
          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="updateForm.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="密码 :" prop="password">
            <el-input
              v-model="updateForm.password"
              placeholder="请输入密码 "
            />
          </el-form-item> -->
          <el-form-item v-if="true" label="入职时间 :" prop="entryTime">
            <el-date-picker v-model="updateForm.entryTime" type="date" placeholder="请输入入职时间 " />
          </el-form-item>
          <el-form-item v-if="true" label="离职时间 :" prop="leaveTime">
            <el-date-picker v-model="updateForm.leaveTime" type="date" placeholder="请输入离职时间 " />
          </el-form-item>
          <el-form-item v-if="true" label="雇佣状态 :" prop="hireStatus">
            <el-input
              v-model="updateForm.hireStatus"
              placeholder="请输入雇佣状态 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="来源 :" prop="source">
            <el-input
              v-model="updateForm.source"
              placeholder="请输入来源 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="是否锁定 :" prop="lockStatus">
            <el-switch v-model="updateForm.lockStatus" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item v-if="true" label="有效状态 :" prop="validState">
            <el-switch v-model="updateForm.validState" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item v-if="false" label="操作人工号 :" prop="operatorId">
            <el-input
              v-model="updateForm.operatorId"
              placeholder="请输入操作人工号 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作人姓名 :" prop="operatorName">
            <el-input
              v-model="updateForm.operatorName"
              placeholder="请输入操作人姓名 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="updateForm.createTime" type="date" placeholder="请输入创建时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="updateForm.updateTime" type="date" placeholder="请输入更新时间 " />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves @click="updateDialogVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserListPage, saveUser, updateUser, deleteById, download } from '@/api/system/user'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { getCompanyList } from '@/api/system/company'
import { getDeptList } from '@/api/system/dept'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      deptOptions: [],
      companyOptions: [],
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [
        'id',
        'password'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'id', label: '唯一编号 ', visible: true },
        { key: 1, value: 'userId', label: '用户编号 ', visible: true },
        { key: 2, value: 'userName', label: '用户账户 ', visible: true },
        { key: 3, value: 'realName', label: '用户名称 ', visible: true },
        { key: 4, value: 'email', label: '邮箱 ', visible: true },
        { key: 5, value: 'phone', label: '联系方式 ', visible: true },
        { key: 6, value: 'positionCode', label: '岗位编码 ', visible: true },
        { key: 7, value: 'positionName', label: '岗位名称 ', visible: true },
        { key: 8, value: 'gender', label: '性别 ', visible: true },
        { key: 9, value: 'avatar', label: '头像链接 ', visible: true },
        { key: 10, value: 'birthDate', label: '生日 ', visible: true },
        { key: 11, value: 'companyId', label: '公司编号 ', visible: true },
        { key: 12, value: 'deptId', label: '部门编号 ', visible: true },
        { key: 13, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 14, value: 'password', label: '密码 ', visible: true },
        { key: 15, value: 'entryTime', label: '入职时间 ', visible: true },
        { key: 16, value: 'leaveTime', label: '离职时间 ', visible: true },
        { key: 17, value: 'hireStatus', label: '雇佣状态 ', visible: true },
        { key: 18, value: 'source', label: '来源 ', visible: true },
        { key: 19, value: 'lockStatus', label: '是否锁定 ', visible: true },
        { key: 20, value: 'validState', label: '有效状态 ', visible: true },
        { key: 21, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 22, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 23, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 24, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userId: undefined,
        userName: undefined,
        realName: undefined,
        email: undefined,
        companyId: undefined,
        deptId: undefined
      },
      input: '',
      form: {
        id: undefined, // 唯一编号
        userId: undefined, // 用户编号
        userName: undefined, // 用户账户
        realName: undefined, // 用户名称
        email: undefined, // 邮箱
        phone: undefined, // 联系方式
        positionCode: undefined, // 岗位编码
        positionName: undefined, // 岗位名称
        gender: undefined, // 性别
        avatar: undefined, // 头像链接
        birthDate: undefined, // 生日
        companyId: undefined, // 公司编号
        deptId: undefined, // 部门编号
        tenantId: undefined, // 租户编号
        password: undefined, // 密码
        entryTime: undefined, // 入职时间
        leaveTime: undefined, // 离职时间
        hireStatus: undefined, // 雇佣状态
        source: undefined, // 来源
        lockStatus: undefined, // 是否锁定
        validState: 1, // 有效状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        id: undefined, // 唯一编号
        userId: undefined, // 用户编号
        userName: undefined, // 用户账户
        realName: undefined, // 用户名称
        email: undefined, // 邮箱
        phone: undefined, // 联系方式
        positionCode: undefined, // 岗位编码
        positionName: undefined, // 岗位名称
        gender: undefined, // 性别
        avatar: undefined, // 头像链接
        birthDate: undefined, // 生日
        companyId: undefined, // 公司编号
        deptId: undefined, // 部门编号
        tenantId: undefined, // 租户编号
        password: undefined, // 密码
        entryTime: undefined, // 入职时间
        leaveTime: undefined, // 离职时间
        hireStatus: undefined, // 雇佣状态
        source: undefined, // 来源
        lockStatus: undefined, // 是否锁定
        validState: 1, // 有效状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        id: [
        ],
        userId: [
        ],
        userName: [
          { required: true, message: '请输入用户账户', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { required: true, validator: this.validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: this.validatePhone, trigger: 'blur' }
        ],
        positionCode: [
        ],
        positionName: [
        ],
        gender: [
        ],
        avatar: [
        ],
        birthDate: [
        ],
        companyId: [
        ],
        deptId: [
        ],
        tenantId: [
        ],
        password: [
        ],
        entryTime: [
        ],
        leaveTime: [
        ],
        hireStatus: [
        ],
        source: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        lockStatus: [
        ],
        validState: [
        ],
        operatorId: [
        ],
        operatorName: [
        ],
        createTime: [
        ],
        updateTime: [
        ]
      },
      updateRules: {
        id: [
        ],
        userId: [
        ],
        userName: [
          { required: true, message: '请输入用户账户', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { required: true, validator: this.validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: this.validatePhone, trigger: 'blur' }
        ],
        positionCode: [
        ],
        positionName: [
        ],
        gender: [
        ],
        avatar: [
        ],
        birthDate: [
        ],
        companyId: [
        ],
        deptId: [
        ],
        tenantId: [
        ],
        password: [
        ],
        entryTime: [
        ],
        leaveTime: [
        ],
        hireStatus: [
        ],
        source: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        lockStatus: [
        ],
        validState: [
        ],
        operatorId: [
        ],
        operatorName: [
        ],
        createTime: [
        ],
        updateTime: [
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getCompanyTree()
    this.getDeptTree()
  },
  methods: {
    getCompanyTree() {
      const that = this
      getCompanyList({}).then(response => {
        that.companyOptions = that.handleTree(response.data, 'companyId', 'companyParentId')
        console.log(that.companyOptions)
      })
    },
    getDeptTree() {
      const that = this
      getDeptList({}).then(response => {
        that.deptOptions = that.handleTree(response.data, 'deptId', 'deptParentId')
      })
    },
    companyNormalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.companyId,
        label: node.companyName,
        children: node.children
      }
    },
    /** 转换数据结构 */
    deptNormalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      }
    },
    getList() {
      this.listLoading = true
      getUserListPage(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    download() {
      download(this.listQuery).then(response => {

      }).catch(err => {
        console.log(err)
      })
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.updateForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.updateDialogVisible = true
    },
    handleDelete(row) {
      const _this = this
      _this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        const id = row.id
        deleteById(id).then(response => {
          if (response.code === 200) {
            _this.getList()
            _this.$message.success(response.message)
          } else {
            _this.$message.error(response.message)
          }
        })
      })
    },
    submitForm() {
      const _this = this
      const refForm = _this.dialogStatus === 'create' ? 'dataForm' : 'updateDataForm'
      _this.$refs[`${refForm}`].validate(valid => {
        if (valid) {
          this.$confirm('确定操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function() {
            if (_this.dialogStatus === 'create') {
              saveUser(_this.form).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateUser(_this.updateForm).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.updateDialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            }
          })
        }
      })
    },
    resetForm() {
      this.form = {
        id: undefined, // 唯一编号
        userId: undefined, // 用户编号
        userName: undefined, // 用户账户
        realName: undefined, // 用户名称
        email: undefined, // 邮箱
        phone: undefined, // 联系方式
        positionCode: undefined, // 岗位编码
        positionName: undefined, // 岗位名称
        gender: undefined, // 性别
        avatar: undefined, // 头像链接
        birthDate: undefined, // 生日
        companyId: undefined, // 公司编号
        deptId: undefined, // 部门编号
        tenantId: undefined, // 租户编号
        password: undefined, // 密码
        entryTime: undefined, // 入职时间
        leaveTime: undefined, // 离职时间
        hireStatus: undefined, // 雇佣状态
        source: undefined, // 来源
        lockStatus: undefined, // 是否锁定
        validState: 1, // 有效状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      }
    },
    // 监听dialog关闭时的处理事件
    handleDialogClose() {
      const refForm = this.dialogStatus === 'create' ? 'dataForm' : 'updateDataForm'
      if (this.$refs[[`${refForm}`]]) {
        this.$refs[[`${refForm}`]].clearValidate() // 清除整个表单的校验
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">

    .page-footer{
        margin-top: 20px;
        width: 100%;
        height: 50px;
    }
    .filter-container {
        padding-bottom: 10px;
        .filter-item {
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 10px;
        }
    }
</style>
