import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';
import './App.css';

// 新增：用于处理404重定向逻辑
function RedirectRecover() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const redirectPath = localStorage.getItem('redirect_path');
    // 只在首页时尝试恢复
    if (
      redirectPath &&
      redirectPath !== '/' &&
      location.pathname === '/'
    ) {
      // 尝试跳转
      navigate(redirectPath, { replace: true });
      localStorage.removeItem('redirect_path');
    }
  }, [navigate, location]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <RedirectRecover />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);