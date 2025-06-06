// src/components/FeatureOnePage/CategorySelector.tsx
import { Divider, Select, Tag } from 'antd';
import { OptionItem } from '../../pages/FeatureOnePage';


const { Option } = Select;

interface CategorySelectorProps {
  optionList: OptionItem[];
  selectedCategories: string[];
  onCategorySelect: (values: string[]) => void;
}

const getCategoryCount = (optionList: OptionItem[], category: string) => {
  return optionList.filter(item => item.category === category).length;
};

const getCategories = (optionList: OptionItem[]) => {
  const categories = new Set(optionList.map(item => item.category));
  return Array.from(categories);
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ optionList, selectedCategories, onCategorySelect }) => {
  return (
    <>
      {/* 分类选择 */}
      <Divider orientation="left">选择分类</Divider>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="请选择分类"
        onChange={onCategorySelect}
        value={selectedCategories}
      >
        {getCategories(optionList).map(category => (
          <Option key={category} value={category}>
            {category} ({getCategoryCount(optionList, category)})
          </Option>
        ))}
      </Select>

      {/* 分类标签 */}
      <Divider orientation="left">分类统计</Divider>
      <div className="mb-8">
        {getCategories(optionList).map(category => (
          <Tag key={category} color="blue">
            {category} ({getCategoryCount(optionList, category)})
          </Tag>
        ))}
      </div>
    </>
  );
};

export default CategorySelector;