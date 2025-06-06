import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Content } from 'antd/es/layout/layout';

const HomePage = lazy(() => import('./HomePage'));
const AboutPage = lazy(() => import('./AboutPage'));
const NotFound = lazy(() => import('./NotFound'));
const FeatureOnePage = lazy(() => import('./FeatureOnePage'));
const DesignStudioPage = lazy(() => import('./DesignStudioPage'));

const Pages = () => {
  return (
    <Content className="flex-grow py-8">
      <div className="container mx-auto px-4">
        <Suspense fallback={<div>加载中...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/feature1" element={<FeatureOnePage />} />
            <Route path="/design-studio" element={<DesignStudioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Content>
  );
};

export default Pages;