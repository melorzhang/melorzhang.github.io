import { Card, Row, Col, Button } from 'antd';
import { SmileOutlined, CodeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="space-y-8">
      <Card
        title="欢迎来到我的网站"
        variant="outlined"
        className="shadow-lg rounded-xl"
        extra={<Button type="primary">了解更多</Button>}
      >
        <p className="text-lg text-gray-700">这是一个使用 React、Vite 和 Ant Design 构建的示例网站</p>
      </Card>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>

          <Card
            hoverable
            cover={<div className="bg-blue-100 h-48 rounded-t-lg flex items-center justify-center">
              <CodeOutlined className="text-6xl text-blue-500" />
            </div>}
            actions={[<Button type="link"><Link to="/feature1">点我进入选择器</Link></Button>]}
          >
            <Card.Meta title="选择器功能" description="提供自定义随机选择功能" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<div className="bg-green-100 h-48 rounded-t-lg flex items-center justify-center">
              <SmileOutlined className="text-6xl text-green-500" />
            </div>}
            actions={[
              <Button type="link">
                <Link to="/design-studio">进入室内设计画图制作室</Link>
              </Button>
            ]}
          >
            <Card.Meta title="设计图工作室" description="用来做设计" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<div className="bg-purple-100 h-48 rounded-t-lg flex items-center justify-center">
              <SmileOutlined className="text-6xl text-purple-500" />
            </div>}
          >
            <Card.Meta title="功能三" description="这里是功能三的描述信息" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;