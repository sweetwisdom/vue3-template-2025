<template>
  <a-modal 
    :title="mode === 'add' ? '新增工作项' : '编辑工作项'" 
    v-model:visible="dialogVisible" 
    :confirm-loading="confirmLoading" 
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-form-item label="工作项ID" name="workItemId">
        <a-input v-model:value="form.workItemId" placeholder="请输入工作项ID" />
      </a-form-item>
      <a-form-item label="工作项类型" name="workItemType">
        <a-input v-model:value="form.workItemType" placeholder="请输入工作项类型，如APP" />
      </a-form-item>
      <a-form-item label="用户ID" name="userId">
        <a-input v-model:value="form.userId" placeholder="请输入用户ID" />
      </a-form-item>
      <a-form-item label="角色" name="role">
        <a-input v-model:value="form.role" placeholder="请输入角色，如ROLE_PROJECT_TEMP_MEMBER" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

// 定义Props
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

// 定义Emits
const emit = defineEmits(['refresh']);

// 弹窗控制
const dialogVisible = ref(false);
const confirmLoading = ref(false);
const mode = ref('add');

// 表单数据
const form = ref({
  workItemId: '',
  workItemType: '',
  userId: '',
  role: ''
});

// 表单引用
const formRef = ref(null);

// 表单验证规则
const rules = {
  workItemId: [{ required: true, message: '请输入工作项ID', trigger: 'blur' }],
  workItemType: [{ required: true, message: '请输入工作项类型', trigger: 'blur' }],
  userId: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
  role: [{ required: true, message: '请输入角色', trigger: 'blur' }]
};

// 打开弹窗
const open = (data = {}) => {
  form.value = {
    workItemId: data.workItemId || '',
    workItemType: data.workItemType || '',
    userId: data.userId || '',
    role: data.role || ''
  };
  mode.value = data.workItemId ? 'edit' : 'add';
  dialogVisible.value = true;
};

// 模拟API调用
async function addForm() {
  // 这里替换为实际的API调用
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ code: 0, message: '添加成功' });
    }, 1000);
  });
}

async function updateForm() {
  // 这里替换为实际的API调用
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ code: 0, message: '更新成功' });
    }, 1000);
  });
}

// 确认提交
const handleConfirm = async () => {
  try {
    confirmLoading.value = true;
    await formRef.value.validate();
    
    const result = mode.value === 'add' 
      ? await addForm(form.value)
      : await updateForm(form.value);
    
    if (result.code === 0) {
      message.success(result.message);
      dialogVisible.value = false;
      emit('refresh');
    } else {
      message.error(result.message || '操作失败');
    }
  } catch (error) {
    console.error('操作失败', error);
    message.error('操作失败');
  } finally {
    confirmLoading.value = false;
  }
};

// 取消
const handleCancel = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
};

// 暴露open方法
defineExpose({ open });
</script>

<style  scoped>
:deep(.ant-modal-body) {
  padding: 24px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}
</style>