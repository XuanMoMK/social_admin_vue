<template>
  <Dialog :model-value="dialogVisible" :title="dialogProps.title" :fullscreen="dialogProps.fullscreen" :max-height="dialogProps.maxHeight" :cancel-dialog="cancelDialog">
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getTableList"
      :initParam="initParam"
      :dataCallback="dataCallback"
      :row-style="{ height: '0' }"
      :cell-style="{ padding: '0px' }"
      :searchCol="{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }"
      rowKey="pkId"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader> </template>
      <template #empty>
        <div> 暂无数据 </div>
      </template>
    </ProTable>
  </Dialog>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { Dialog } from '@/components/Dialog'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { UserApi } from '@/api/modules/user'
import { useRoute } from 'vue-router'
const route = useRoute()
interface DialogProps {
  title: string
  isView: boolean
  fullscreen?: boolean
  row: any
  labelWidth?: number
  maxHeight?: number | string
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const proTable = ref()
const initParam = reactive({})
// 获取列表数据
const getTableList = (params: any) => {
  let newParams = { ...params, id: parseInt(route.params.id as string) }
  return UserApi.friendApply(newParams)
}

const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total
  }
}

const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({
  isView: false,
  title: '',
  row: {},
  labelWidth: 100,
  fullscreen: true,
  maxHeight: '500px'
})

// 接收父组件传过来的参数
const acceptParams = async (params: DialogProps) => {
  params.row = { ...dialogProps.value.row, ...params.row }
  dialogProps.value = { ...dialogProps.value, ...params }
  dialogVisible.value = true
}

defineExpose({
  acceptParams
})

// 表格配置项
const columns: ColumnProps<any>[] = [
  // { type: 'selection', fixed: 'left', width: 60 },
  { prop: 'nickname', label: '用户昵称' },
  {
    prop: 'avatar',
    label: '头像',
    width: 70,
    render: (scope) => {
      return (
        <div class={['flex', 'justify-center', 'p-1']}>
          <el-avatar shape={'square'} size={30} src={scope.row.avatar} />
        </div>
      )
    }
  },
  { prop: 'phone', label: '手机号' },
  {
    prop: 'state',
    label: '状态',
    tag: true,
    enum: [
      {
        label: '申请中',
        value: 0
      },
      {
        label: '已添加',
        value: 1
      },
      {
        label: '已拒绝',
        value: 2
      }
    ],
    fieldNames: { label: 'label', value: 'value' }
  }
  // { prop: 'operation', label: '操作', fixed: 'right', width: 100 }
]

const cancelDialog = (isClean?: boolean) => {
  dialogVisible.value = false
  let condition = ['查看', '编辑']
  if (condition.includes(dialogProps.value.title) || isClean) {
    dialogProps.value.row = {}
    // ruleFormRef.value!.resetFields()
  }
}
</script>
