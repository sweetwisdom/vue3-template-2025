<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">配置式表单示例</h2>

    <ConfigForm
      ref="formRef"
      v-model="formData"
      :form-option="formOption"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      @submit="handleSubmit"
      @reset="handleReset"
      @change="handleChange"
    >
      <!-- 自定义插槽示例 -->
      <template #customSlot="{ formData, onChange }">
        <a-input
          :value="formData.customField"
          @change="e => onChange(e.target.value)"
          placeholder="这是一个自定义插槽"
          style="border: 2px dashed #1890ff"
        />
      </template>

      <!-- 自定义操作按钮 -->
      <template #actions="{ formData, formRef }">
        <a-space>
          <a-button type="primary" @click="handleSubmit" :loading="loading"> 提交 </a-button>
          <a-button @click="handleReset"> 重置 </a-button>
          <a-button @click="handlePreview"> 预览数据 </a-button>
        </a-space>
      </template>
    </ConfigForm>

    <!-- 数据预览 -->
    <a-card v-if="showPreview" title="表单数据预览" class="mt-6">
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import ConfigForm from './ConfigForm.vue';

// 表单引用
const formRef = ref();

// 加载状态
const loading = ref(false);

// 显示预览
const showPreview = ref(false);

// 表单数据
const formData = ref({});

// 表单配置
const formOption = {
  formItems: [
    {
      field: 'chineseName',
      label: '中文名称',
      defaultValue: 'xxxx仓库',
      type: 'input',
      maxlength: 50,
      showCount: true,
    },
    {
      field: 'englishName',
      label: '英文名称',
      defaultValue: 'abc_repo',
      type: 'input',
      maxlength: 50,
    },
    {
      field: 'responsiblePerson',
      label: '责任人',
      defaultValue: 'xxxx仓库',
      type: 'input',
    },
    {
      field: 'industry',
      label: '行业',
      defaultValue: '航天',
      type: 'select',
      options: [
        { label: '航天', value: '航天' },
        { label: '互联网', value: '互联网' },
        { label: '金融', value: '金融' },
        { label: '制造业', value: '制造业' },
        { label: '其他', value: '其他' },
      ],
    },
    {
      field: 'priority',
      label: '优先级',
      type: 'radio',
      defaultValue: 'medium',
      options: [
        { label: '高', value: 'high' },
        { label: '中', value: 'medium' },
        { label: '低', value: 'low' },
      ],
    },
    {
      field: 'tags',
      label: '标签',
      type: 'checkbox',
      defaultValue: ['important'],
      options: [
        { label: '重要', value: 'important' },
        { label: '紧急', value: 'urgent' },
        { label: '保密', value: 'confidential' },
        { label: '公开', value: 'public' },
      ],
    },
    {
      field: 'isActive',
      label: '是否启用',
      type: 'switch',
      defaultValue: true,
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
    {
      field: 'rating',
      label: '评分',
      type: 'rate',
      defaultValue: 3,
      allowHalf: true,
    },
    {
      field: 'progress',
      label: '进度',
      type: 'slider',
      defaultValue: 30,
      min: 0,
      max: 100,
      marks: {
        0: '0%',
        25: '25%',
        50: '50%',
        75: '75%',
        100: '100%',
      },
    },
    {
      field: 'budget',
      label: '预算',
      type: 'number',
      defaultValue: 10000,
      min: 0,
      step: 1000,
      precision: 0,
    },
    {
      field: 'startDate',
      label: '开始日期',
      type: 'date',
      defaultValue: '2024-01-01',
    },
    {
      field: 'deadline',
      label: '截止时间',
      type: 'datetime',
      defaultValue: '2024-12-31 23:59:59',
    },
    {
      field: 'briefIntroduction',
      label: '简介',
      defaultValue: '这是一段简介',
      type: 'textarea',
      rows: 3,
      maxlength: 200,
      showCount: true,
    },
    {
      field: 'purpose',
      label: '用途',
      defaultValue: '这是一段用途',
      type: 'textarea',
      rows: 3,
    },
    {
      field: 'detailedIntroduction',
      label: '详细介绍',
      defaultValue: '这是一段介绍这是一段介绍这是一段介绍',
      type: 'textarea',
      rows: 4,
    },
    {
      field: 'approver',
      label: '审批人',
      defaultValue: '项目责任人',
      type: 'input',
    },
    {
      field: 'customField',
      label: '自定义字段',
      type: 'slot',
      slotName: 'customSlot',
      defaultValue: '自定义内容',
    },
  ],
  validationRules: [
    {
      field: 'chineseName',
      rules: [
        {
          required: true,
          message: '请输入中文名称',
        },
        {
          min: 2,
          max: 50,
          message: '中文名称长度在 2 到 50 个字符',
        },
      ],
    },
    {
      field: 'englishName',
      rules: [
        {
          required: true,
          message: '请输入英文名称',
        },
        {
          pattern: /^[a-zA-Z0-9_]+$/,
          message: '英文名称只能包含字母、数字和下划线',
        },
      ],
    },
    {
      field: 'responsiblePerson',
      rules: [
        {
          required: true,
          message: '请输入责任人',
        },
      ],
    },
    {
      field: 'industry',
      rules: [
        {
          required: true,
          message: '请选择行业',
        },
      ],
    },
    {
      field: 'priority',
      rules: [
        {
          required: true,
          message: '请选择优先级',
        },
      ],
    },
    {
      field: 'budget',
      rules: [
        {
          required: true,
          message: '请输入预算',
        },
        {
          type: 'number',
          min: 1000,
          message: '预算不能少于1000',
        },
      ],
    },
    {
      field: 'startDate',
      rules: [
        {
          required: true,
          message: '请选择开始日期',
        },
      ],
    },
    {
      field: 'briefIntroduction',
      rules: [],
    },
    {
      field: 'purpose',
      rules: [],
    },
    {
      field: 'detailedIntroduction',
      rules: [],
    },
    {
      field: 'approver',
      rules: [],
    },
  ],
};

// 处理提交
const handleSubmit = async () => {
  loading.value = true;
  try {
    const result = await formRef.value.submit();
    if (result.success) {
      message.success('提交成功');
      console.log('提交的数据:', result.data);
    } else {
      message.error('表单验证失败');
    }
  } catch (error) {
    message.error('提交失败');
  } finally {
    loading.value = false;
  }
};

// 处理重置
const handleReset = () => {
  formRef.value.reset();
  message.info('表单已重置');
};

// 处理数据变化
const handleChange = data => {
  console.log('表单数据变化:', data);
};

// 预览数据
const handlePreview = () => {
  showPreview.value = !showPreview.value;
  const data = formRef.value.getFormData();
  console.log('当前表单数据:', data);
};
</script>
