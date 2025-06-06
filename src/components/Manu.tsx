import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const IManu = (
  <Menu>
    <Menu.Item key="home">
      <NavLink to="/">首页</NavLink>
    </Menu.Item>
    <Menu.Item key="about">
      <NavLink to="/about">关于</NavLink>
    </Menu.Item>
  </Menu>
);

export default IManu;
