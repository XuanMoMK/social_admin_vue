<template>
  <Dialog :model-value="dialogVisible" :title="dialogProps.title" :fullscreen="dialogProps.fullscreen" :max-height="dialogProps.maxHeight" :cancel-dialog="cancelDialog">
    <div :style="'width: calc(100% - ' + dialogProps.labelWidth! / 2 + 'px)'">
      <el-form
        ref="ruleFormRef"
        label-position="right"
        :label-width="dialogProps.labelWidth + 'px'"
        :rules="rules"
        :model="dialogProps.row"
        :disabled="dialogProps.isView"
        :hide-required-asterisk="dialogProps.isView"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="dialogProps.row!.account" placeholder="" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="dialogProps.row!.nickname" placeholder="" clearable :disabled="dialogProps.title == '充值'"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="dialogProps.row!.phone" placeholder="" clearable :disabled="dialogProps.title == '充值'"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="dialogProps.row!.gender" :disabled="dialogProps.title == '充值'">
            <el-radio :label="0" border>男</el-radio>
            <el-radio :label="1" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职业" prop="profession">
          <el-input v-model="dialogProps.row!.profession" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="dialogProps.row!.birthday" type="Date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <slot name="footer">
        <el-button @click="cancelDialog">取消</el-button>
        <el-button type="primary" v-show="!dialogProps.isView" @click="handleSubmit">确定</el-button>
      </slot>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Dialog } from '@/components/Dialog'
interface DialogProps {
  title: string
  isView: boolean
  fullscreen?: boolean
  row: any
  labelWidth?: number
  maxHeight?: number | string
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
  cardbagList?: any
}
const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({
  isView: false,
  title: '',
  row: { cardId: null },
  labelWidth: 160,
  fullscreen: true,
  maxHeight: '500px'
})

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps): void => {
  params.row = { ...dialogProps.value.row, ...params.row }
  dialogProps.value = { ...dialogProps.value, ...params }
  dialogVisible.value = true
}

defineExpose({
  acceptParams
})

// 获取角色列表
const getCardbagList = async () => {
  // const { data } = await CardbagApi.page({ limit: 100, page: 1 })
  // dialogProps.value.cardbagList = data.list
}
await getCardbagList()

const rules = reactive({
  cardId: [{ required: true, message: '请选择卡包', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
})
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      // 充值
      if (dialogProps.value.title == '充值') {
        let userId = dialogProps.value.row.pkId
        let cardId = dialogProps.value.row.cardId
        await dialogProps.value.api!({ userId, cardId })
      } else {
        delete dialogProps.value.row['cardId']
        await dialogProps.value.api!(dialogProps.value.row)
      }

      ElMessage.success({ message: `${dialogProps.value.title}成功！` })
      dialogProps.value.getTableList!()
      dialogVisible.value = false
      ruleFormRef.value!.resetFields()
      cancelDialog(true)
    } catch (error) {
      console.log(error)
    }
  })
}
const cancelDialog = (isClean?: boolean) => {
  dialogVisible.value = false
  let condition = ['查看', '编辑']
  if (condition.includes(dialogProps.value.title) || isClean) {
    dialogProps.value.row = {}
    ruleFormRef.value!.resetFields()
  }
}
</script>

<style scoped lang="less"></style>
