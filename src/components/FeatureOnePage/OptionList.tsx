// src/components/FeatureOnePage/OptionList.tsx
import { List, Divider, Popconfirm, Button, Tag } from 'antd';
import { OptionItem } from '../../pages/FeatureOnePage';

interface OptionListProps {
  optionList: OptionItem[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const OptionList: React.FC<OptionListProps> = ({ optionList, onDelete, onEdit }) => {
  return (
    <>
      <Divider orientation="left">选项列表</Divider>
      <List
        itemLayout="horizontal"
        dataSource={optionList}
        renderItem={item => (
          <List.Item
            actions={[
              <Popconfirm
                title="确定删除?"
                onConfirm={() => onDelete(item.id)}
              >
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>,
              <Button type="link" onClick={() => onEdit(item.id)}>
                编辑
              </Button>
            ]}
          >
            <List.Item.Meta
              title={item.content}
              description={
                <>
                  {item.category.map(cat => (
                    <Tag color="green" key={cat}>
                      {cat}
                    </Tag>
                  ))}
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default OptionList;