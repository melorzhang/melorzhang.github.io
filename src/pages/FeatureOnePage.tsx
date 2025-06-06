// src/pages/FeatureOnePage.tsx
import { useState, useEffect } from 'react';
import { Card, Button, Modal, Space, message, Tag, Form, Select } from 'antd';
import OptionForm from '../components/FeatureOnePage/OptionForm';
import OptionList from '../components/FeatureOnePage/OptionList';
import CategorySelector from '../components/FeatureOnePage/CategorySelector';

// 定义数据结构
export interface OptionItem {
  id: string;
  content: string;
  category: string[];
}

const FeatureOnePage = () => {
  // 状态管理
  const [form] = Form.useForm();
  const [optionList, setOptionList] = useState<OptionItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [randomResult, setRandomResult] = useState<OptionItem | null>(null);
  const [lastRandomId, setLastRandomId] = useState<string | null>(null);

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
  const handleSubmit = (values: { content: string; category: string[] }) => {
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
    setModalVisible(false);
  };

  // 处理编辑
  const handleEdit = (id: string) => {
    const itemToEdit = optionList.find(item => item.id === id);
    if (itemToEdit) {
      form.setFieldsValue({
        content: itemToEdit.content,
        category: itemToEdit.category // 直接赋值为数组
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

  // 处理分类选择
  const handleCategorySelect = (values: string[]) => {
    setSelectedCategories(values);
  };

  // 处理随机选择
  const handleRandomPick = () => {
    if (selectedCategories.length === 0) {
      return;
    }
    let filteredOptions = optionList.filter(item =>
      item.category.some(cat => selectedCategories.includes(cat))
    );
    if (filteredOptions.length === 0) {
      return;
    }
    if (lastRandomId && filteredOptions.length > 1) {
      filteredOptions = filteredOptions.filter(item => item.id !== lastRandomId);
    }
    const randomIndex = Math.floor(Math.random() * filteredOptions.length);
    const result = filteredOptions[randomIndex];
    setRandomResult(result);
    setLastRandomId(result.id);
  };

  // 清空缓存
  const handleClearCache = () => {
    localStorage.removeItem('optionList');
    setOptionList([]);
    message.success('缓存已清空');
  };

  // 上传文件覆盖缓存
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setOptionList(data);
          saveToLocalStorage(data);
          message.success('缓存已被文件内容覆盖');
        } catch (error) {
          message.error('文件解析失败，请上传有效的 JSON 文件');
        }
      };
      reader.readAsText(file);
    }
  };

  // 导出缓存信息为 JSON 文件
  const handleExport = () => {
    const dataStr = JSON.stringify(optionList, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'option_list.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card
        title="选项管理"
        bordered={false}
        className="mb-8 shadow-lg rounded-xl"
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
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
          <Button
            color="danger" variant="solid"
            onClick={handleClearCache}
          >
            清空缓存
          </Button>
          <Button
            color="default" variant="solid"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            上传文件覆盖缓存
          </Button>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            accept=".json"
            onChange={handleFileUpload}
          />
          <Button
            color="cyan" variant="solid"
            onClick={handleExport}
          >
            导出缓存信息
          </Button>
        </Space>
      </Card>

      <CategorySelector
        optionList={optionList}
        selectedCategories={selectedCategories}
        onCategorySelect={handleCategorySelect}
      />

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
          {randomResult.category.map(cat => (
            <Tag color="green" key={cat}>
              {cat}
            </Tag>
          ))}
        </Card>
      )}

      <OptionList
        optionList={optionList}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* 添加/编辑模态框 */}
      <Modal
        title={isEditing ? '编辑选项' : '添加选项'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText={isEditing ? '更新' : '添加'}
      >
        <OptionForm
          form={form}
          isEditing={isEditing}
          onSubmit={handleSubmit}
          optionList={optionList}
        />
      </Modal>
    </div>
  );
};

export default FeatureOnePage;