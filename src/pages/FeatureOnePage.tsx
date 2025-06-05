// src/pages/FeatureOnePage.tsx
import { useState, useEffect } from 'react';
import { 
  Card, Form, Input, Button, List, Divider, 
  Popconfirm, Modal, Space, Tag, Select 
} from 'antd';

// 定义数据结构
interface OptionItem {
  id: string;
  content: string;
  category: string;
}

const { Option } = Select;

const FeatureOnePage = () => {
  // 状态管理
  const [form] = Form.useForm();
  const [optionList, setOptionList] = useState<OptionItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [randomResult, setRandomResult] = useState<OptionItem | null>(null);

  // 从localStorage加载数据
  useEffect(() => {
    const storedData = localStorage.getItem('optionList');
    if (storedData) {
      setOptionList(JSON.parse(storedData));
    }
  }, []);

  // 保存数据到localStorage
  const saveToLocalStorage = (data: OptionItem[]) => {
    localStorage.setItem('optionList', JSON.stringify(data));
  };

  // 处理表单提交
  const handleSubmit = (values: { content: string; category: string }) => {
    if (isEditing && editingId) {
      // 更新现有项
      const updatedList = optionList.map(item => 
        item.id === editingId 
          ? { ...item, content: values.content, category: values.category } 
          : item
      );
      setOptionList(updatedList);
      saveToLocalStorage(updatedList);
    } else {
      // 添加新项
      const newItem: OptionItem = {
        id: Date.now().toString(),
        content: values.content,
        category: values.category
      };
      setOptionList([...optionList, newItem]);
      saveToLocalStorage([...optionList, newItem]);
    }
    form.resetFields();
    setIsEditing(false);
    setEditingId('');
  };

  // 处理编辑
  const handleEdit = (id: string) => {
    const itemToEdit = optionList.find(item => item.id === id);
    if (itemToEdit) {
      form.setFieldsValue({
        content: itemToEdit.content,
        category: itemToEdit.category
      });
      setIsEditing(true);
      setEditingId(id);
      setModalVisible(true);
    }
  };

  // 处理删除
  const handleDelete = (id: string) => {
    const updatedList = optionList.filter(item => item.id !== id);
    setOptionList(updatedList);
    saveToLocalStorage(updatedList);
  };

  // 分类统计
  const getCategoryCount = (category: string) => {
    return optionList.filter(item => item.category === category).length;
  };

  // 获取所有分类
  const getCategories = () => {
    const categories = new Set(optionList.map(item => item.category));
    return Array.from(categories);
  };

  // 处理分类选择
  const handleCategorySelect = (values: string[]) => {
    setSelectedCategories(values);
  };

  // 处理随机选择
  const handleRandomPick = () => {
    if (selectedCategories.length === 0) {
      return;
    }
    const filteredOptions = optionList.filter(item => selectedCategories.includes(item.category));
    if (filteredOptions.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredOptions.length);
    setRandomResult(filteredOptions[randomIndex]);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card
        title="选项管理"
        bordered={false}
        className="mb-8 shadow-lg rounded-xl"
      >
        <Button 
          type="primary" 
          onClick={() => {
            form.resetFields();
            setIsEditing(false);
            setEditingId('');
            setModalVisible(true);
          }}
        >
          添加选项
        </Button>
      </Card>

      {/* 分类选择 */}
      <Divider orientation="left">选择分类</Divider>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="请选择分类"
        onChange={handleCategorySelect}
      >
        {getCategories().map(category => (
          <Option key={category} value={category}>
            {category} ({getCategoryCount(category)})
          </Option>
        ))}
      </Select>

      {/* 随机选择按钮 */}
      <Button 
        type="primary" 
        style={{ marginTop: '16px' }}
        onClick={handleRandomPick}
      >
        随机选择
      </Button>

      {/* 显示随机选择结果 */}
      {randomResult && (
        <Card
          title="随机选择结果"
          bordered={false}
          className="mt-8 shadow-lg rounded-xl"
        >
          <p>{randomResult.content}</p>
          <Tag color="green">
            {randomResult.category}
          </Tag>
        </Card>
      )}

      {/* 分类标签 */}
      <Divider orientation="left">分类统计</Divider>
      <div className="mb-8">
        {getCategories().map(category => (
          <Tag key={category} color="blue">
            {category} ({getCategoryCount(category)})
          </Tag>
        ))}
      </div>

      {/* 选项列表 */}
      <Divider orientation="left">选项列表</Divider>
      <List
        itemLayout="horizontal"
        dataSource={optionList}
        renderItem={item => (
          <List.Item
            actions={[
              <Popconfirm 
                title="确定删除?" 
                onConfirm={() => handleDelete(item.id)}
              >
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>,
              <Button type="link" onClick={() => handleEdit(item.id)}>
                编辑
              </Button>
            ]}
          >
            <List.Item.Meta
              title={item.content}
              description={
                <Tag color="green">
                  {item.category}
                </Tag>
              }
            />
          </List.Item>
        )}
      />

      {/* 添加/编辑模态框 */}
      <Modal
        title={isEditing ? '编辑选项' : '添加选项'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText={isEditing ? '更新' : '添加'}
      >
        <Form
          form={form}
          name="optionForm"
          onFinish={handleSubmit}
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
      </Modal>
    </div>
  );
};

export default FeatureOnePage;