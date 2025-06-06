import { Routes, Route } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import NotFound from './NotFound';
import FeatureOnePage from './FeatureOnePage';
import DesignStudioPage from './DesignStudioPage';

const Pages = () => {
  return (

    <Content className="flex-grow py-8">
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/feature1" element={<FeatureOnePage />} />
          <Route path="/design-studio" element={<DesignStudioPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Content>
  )
}

export default Pages;