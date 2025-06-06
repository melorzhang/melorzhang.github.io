// src/components/FeatureOnePage/OptionForm.tsx
import { Form, Input } from 'antd';

interface OptionFormProps {
  form: any;
  isEditing: boolean;
  onSubmit: (values: { content: string; category: string }) => void;
}

const OptionForm: React.FC<OptionFormProps> = ({ form, isEditing, onSubmit }) => {
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
        <Input placeholder="请输入选项分类" />
      </Form.Item>
    </Form>
  );
};

export default OptionForm;