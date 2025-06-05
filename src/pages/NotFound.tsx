import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={<Button type="primary"><Link to="/">返回首页</Link></Button>}
    />
  );
};

export default NotFound;