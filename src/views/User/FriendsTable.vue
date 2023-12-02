<template>
  <div class="main-box">
    <TreeFilter label="groupName" title="好友分组" :request-api="getFriendsGroup" :default-value="initParam.groupId" @change="changeTreeFilter" />
    <div class="table-box">
      <ProTable
        ref="proTable"
        title="用户列表"
        :columns="columns"
        :requestApi="getTableList"
        :initParam="initParam"
        :dataCallback="dataCallback"
        :row-style="{ height: '0' }"
        :cell-style="{ padding: '0px' }"
        :searchCol="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" :icon="View" @click="openDrawer('申请')">查看好友申请</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        </template>
      </ProTable>
      <FriendDialog ref="dialogRef" />
      <FriendApply ref="applyDialogRef" />
    </div>
  </div>
</template>

<script setup lang="tsx" name="UserManager">
import { ref, reactive } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import FriendDialog from './components/FriendDialog.vue'
import { View } from '@element-plus/icons-vue'
import { UserApi } from '@/api/modules/user'
import FriendApply from './components/applyDialog.vue'
import TreeFilter from '@/components/TreeFilter/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ groupId: 0 })

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total
  }
}
const getFriendsGroup = () => {
  let body = { id: route.params.id }
  return UserApi.friendsGroup(body)
}

// 树形筛选切换
const changeTreeFilter = (val: number) => {
  // ElMessage.success(`请注意查看请求参数变化 🤔${val}`)
  proTable.value!.pageable.pageNum = 1
  val = val ? val : 0
  initParam.groupId = val
}

const getTableList = (params: any) => {
  let id = parseInt(route.params.id as string)
  let newParams = { ...params, id }
  return UserApi.friendsPage(newParams)
}

// 表格配置项
const columns: ColumnProps<UserType>[] = [
  // { type: 'selection', fixed: 'left', width: 60 },
  {
    prop: 'avatar',
    label: '头像',
    width: 120,
    render: (scope) => {
      return <el-avatar shape={'square'} size={47} src={scope.row.avatar} />
    }
  },
  // { prop: 'account', label: '账号' },
  {
    prop: 'nickname',
    label: '用户名',
    search: { el: 'input' }
  },
  { prop: 'phone', label: '手机号', search: { el: 'input' } },
  { prop: 'groupName', label: '分组' },
  // {
  //   prop: 'gender',
  //   label: '性别',
  //   sortable: true,
  //   enum: [
  //     {
  //       genderLabel: '男',
  //       genderValue: 0
  //     },
  //     {
  //       genderLabel: '女',
  //       genderValue: 1
  //     }
  //   ],
  //   search: { el: 'select', props: { filterable: true } },
  //   fieldNames: { label: 'genderLabel', value: 'genderValue' },
  //   render: (scope) => {
  //     let type = scope.row.gender === 0 ? 'success' : 'warning'
  //     return <el-tag type={type}>{scope.row.gender === 0 ? '男' : '女'}</el-tag>
  //   }
  // },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 200
  },
  { prop: 'operation', label: '操作', fixed: 'right' }
]

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref()
const applyDialogRef = ref()
const openDrawer = (title: string, row: Partial<UserType> = {}) => {
  let params = {
    title,
    row: { ...row },
    isView: title === '查看',
    api: title === '编辑' ? UserApi.edit : '',
    getTableList: proTable.value.getTableList,
    maxHeight: title === '重置' ? '100px' : '500px'
  }
  switch (title) {
    case '查看':
      dialogRef.value.acceptParams(params)
      break
    case '申请':
      applyDialogRef.value.acceptParams(params)
      break
    default:
      break
  }
}
</script>
