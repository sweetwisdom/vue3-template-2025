/* eslint-disable */
<script setup lang="jsx">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  SelectOption,
  Textarea,
  DatePicker,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Slider,
  Rate,
  Button,
  Space,
} from 'ant-design-vue';
defineOptions({
  name: 'ConfigForm',
});
// Props 定义
const props = defineProps({
  // 表单配置
  formOption: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  // 表单数据模型
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  // 标签列配置
  labelCol: {
    type: Object,
    default: () => ({ span: 4 }),
  },
  // 输入列配置
  wrapperCol: {
    type: Object,
    default: () => ({ span: 20 }),
  },
});

// Emits 定义
const emit = defineEmits(['update:modelValue', 'submit', 'reset', 'validate', 'change']);

// 表单引用
const formRef = ref();

// 表单项配置
const formItems = computed(() => props.formOption.formItems || []);

// 处理验证规则
const processedRules = computed(() => {
  const rules = {};
  const validationRules = props.formOption.validationRules || [];

  validationRules.forEach(ruleItem => {
    if (ruleItem.rules && ruleItem.rules.length > 0) {
      rules[ruleItem.field] = ruleItem.rules;
    }
  });

  return rules;
});

// 表单数据
const formData = reactive({});

// 初始化表单数据
const initFormData = () => {
  // 清空现有数据
  Object.keys(formData).forEach(key => {
    delete formData[key];
  });

  // 设置默认值
  formItems.value.forEach(item => {
    if (item.defaultValue !== undefined) {
      formData[item.field] = item.defaultValue;
    } else {
      // 根据类型设置默认值
      switch (item.type) {
        case 'checkbox':
          formData[item.field] = [];
          break;
        case 'switch':
          formData[item.field] = false;
          break;
        case 'number':
        case 'slider':
        case 'rate':
          formData[item.field] = 0;
          break;
        default:
          formData[item.field] = undefined;
      }
    }
  });

  // 合并外部传入的数据
  Object.assign(formData, props.modelValue);
};

// 监听外部数据变化
watch(
  () => props.modelValue,
  newVal => {
    Object.assign(formData, newVal);
  },
  { deep: true }
);

// 监听表单数据变化，向外emit
// watch(
//   formData,
//   newVal => {
//     emit('update:modelValue', { ...newVal });
//     emit('change', { ...newVal });
//   },
//   { deep: true }
// );

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    emit('submit', { ...formData });
    return { success: true, data: { ...formData } };
  } catch (error) {
    emit('validate', { success: false, errors: error });
    return { success: false, errors: error };
  }
};

// 重置表单
const handleReset = () => {
  formRef.value.resetFields();
  initFormData();
  emit('reset', { ...formData });
};

// 验证表单
const validate = async nameList => {
  try {
    const result = await formRef.value.validate(nameList);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, errors: error };
  }
};

// 清除验证
const clearValidate = nameList => {
  formRef.value.clearValidate(nameList);
};

// 获取表单数据
const getFormData = () => {
  return { ...formData };
};

// 设置表单数据
const setFormData = data => {
  Object.assign(formData, data);
};

// 暴露方法
defineExpose({
  submit: handleSubmit,
  reset: handleReset,
  validate,
  clearValidate,
  getFormData,
  setFormData,
  formRef,
});

// 渲染表单项
//@ts-nocheck
const renderFormItem = item => {
  const commonProps = {
    placeholder: item.placeholder || `请输入${item.label}`,
    disabled: item.disabled,
    ...item.props,
  };

  switch (item.type) {
    case 'input':
      return <Input v-model:value={formData[item.field]} maxlength={item.maxlength} showCount={item.showCount} {...commonProps} />;

    case 'textarea':
      return (
        <Textarea v-model:value={formData[item.field]} rows={item.rows || 4} maxlength={item.maxlength} showCount={item.showCount} {...commonProps} />
      );

    case 'select':
      return (
        <Select
          v-model:value={formData[item.field]}
          mode={item.mode}
          allowClear={item.allowClear !== false}
          placeholder={item.placeholder || `请选择${item.label}`}
          {...commonProps}
        >
          {item.options?.map(option => (
            <SelectOption key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectOption>
          ))}
        </Select>
      );

    case 'number':
      return (
        <InputNumber
          v-model:value={formData[item.field]}
          min={item.min}
          max={item.max}
          step={item.step}
          precision={item.precision}
          style={{ width: '100%' }}
          {...commonProps}
        />
      );

    case 'date':
      return (
        <DatePicker
          v-model:value={formData[item.field]}
          format={item.format || 'YYYY-MM-DD'}
          valueFormat={item.valueFormat || 'YYYY-MM-DD'}
          style={{ width: '100%' }}
          placeholder={item.placeholder || `请选择${item.label}`}
          {...commonProps}
        />
      );

    case 'datetime':
      return (
        <DatePicker
          v-model:value={formData[item.field]}
          showTime
          format={item.format || 'YYYY-MM-DD HH:mm:ss'}
          valueFormat={item.valueFormat || 'YYYY-MM-DD HH:mm:ss'}
          style={{ width: '100%' }}
          placeholder={item.placeholder || `请选择${item.label}`}
          {...commonProps}
        />
      );

    case 'radio':
      return (
        <RadioGroup v-model:value={formData[item.field]} {...commonProps}>
          {item.options?.map(option => (
            <Radio key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      );

    case 'checkbox':
      return (
        <CheckboxGroup v-model:value={formData[item.field]} {...commonProps}>
          {item.options?.map(option => (
            <Checkbox key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      );

    case 'switch':
      return (
        <Switch
          v-model:checked={formData[item.field]}
          checkedChildren={item.checkedChildren}
          unCheckedChildren={item.unCheckedChildren}
          {...commonProps}
        />
      );

    case 'slider':
      return (
        <Slider
          v-model:value={formData[item.field]}
          min={item.min || 0}
          max={item.max || 100}
          step={item.step || 1}
          marks={item.marks}
          range={item.range}
          {...commonProps}
        />
      );

    case 'rate':
      return (
        <Rate v-model:value={formData[item.field]} count={item.count || 5} allowHalf={item.allowHalf} allowClear={item.allowClear} {...commonProps} />
      );

    case 'slot':
      // 自定义插槽处理
      return null; // 在模板中处理

    default:
      return <Input v-model:value={formData[item.field]} {...commonProps} />;
  }
};

// 初始化
onMounted(() => {
  initFormData();
});
</script>

<template>
  <Form ref="formRef" :model="formData" :rules="processedRules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <FormItem
      v-for="item in formItems"
      :key="item.field"
      :name="item.field"
      :label="item.label"
      :label-col="item.labelCol || labelCol"
      :wrapper-col="item.wrapperCol || wrapperCol"
    >
      <!-- 自定义插槽 -->
      <slot
        v-if="item.type === 'slot'"
        :name="item.slotName || item.field"
        :form-data="formData"
        :item="item"
        :value="formData[item.field]"
        :on-change="
          value => {
            formData[item.field] = value;
          }
        "
      />
      <!-- JSX 渲染的表单项 -->
      <component v-else :is="() => renderFormItem(item)" />
    </FormItem>

    <!-- 操作按钮插槽 -->
    <slot name="actions" :form-data="getFormData()" :form-ref="formRef" />
  </Form>
</template>
