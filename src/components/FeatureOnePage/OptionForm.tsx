// src/components/FeatureOnePage/OptionForm.tsx
import { Form, Input, Select } from 'antd';
import { OptionItem } from '../../pages/FeatureOnePage';

interface OptionFormProps {
  form: any;
  isEditing: boolean;
  onSubmit: (values: { content: string; category: string[] }) => void;
  optionList: OptionItem[]; // 新增此属性
}

const getCategories = (optionList: OptionItem[]) => {
  const categories = new Set(optionList.flatMap(item => item.category));
  return Array.from(categories);
};

const OptionForm: React.FC<OptionFormProps> = ({ form, isEditing, onSubmit, optionList }) => {
  return (
    <Form
      form={form}
      name="optionForm"
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="选项内容"
        name="content"
        rules={[{ required: true, message: '请输入选项内容' }]}
      >
        <Input.TextArea rows={4} placeholder="请输入选项内容" />
      </Form.Item>
      <Form.Item
        label="选项分类"
        name="category"
        rules={[{ required: true, message: '请输入选项分类' }]}
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="请输入或选择分类，回车可新增"
        >
          {getCategories(optionList).map(category => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default OptionForm;