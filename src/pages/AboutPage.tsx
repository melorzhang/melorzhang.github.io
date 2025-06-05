import { Typography, Divider, List, Avatar } from 'antd';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  const teamMembers = [
    { name: '张三', role: '前端开发', avatar: 'https://picsum.photos/id/1005/200/200' },
    { name: '李四', role: 'UI设计', avatar: 'https://picsum.photos/id/1006/200/200' },
    { name: '王五', role: '产品经理', avatar: 'https://picsum.photos/id/1012/200/200' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Title level={2}>关于我们</Title>
      
      <Paragraph className="text-lg leading-relaxed">
        我们是一个专注于前端开发的小团队，致力于使用最新的技术栈构建高质量的用户界面。
      </Paragraph>
      
      <Divider />
      
      <Title level={3}>我们的团队</Title>
      
      <List
        itemLayout="horizontal"
        dataSource={teamMembers}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} alt={item.name} />}
              title={item.name}
              description={item.role}
            />
          </List.Item>
        )}
      />
      
      <Divider />
      
      <Title level={3}>联系我们</Title>
      
      <Paragraph>
        邮箱: contact@example.com
      </Paragraph>
      <Paragraph>
        电话: +86 123 4567 8910
      </Paragraph>
    </div>
  );
};

export default AboutPage;