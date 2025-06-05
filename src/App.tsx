import { Layout, Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import FeatureOnePage from './pages/FeatureOnePage';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="min-h-screen flex flex-col">
      <Header className="bg-white shadow-md z-10">
        <div className="container mx-auto">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={[
              {
                key: 'home',
                label: <NavLink to="/">首页</NavLink>,
                icon: <HomeOutlined />
              },
              {
                key: 'about',
                label: <NavLink to="/about">关于</NavLink>,
                icon: <InfoCircleOutlined />
              }
            ]}
          />
        </div>
      </Header>
      <Content className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
                        <Route path="/feature1" element={<FeatureOnePage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Content>
      <Footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2025 React Vite AntD 项目</p>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;