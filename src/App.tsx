import { Layout } from 'antd';
import IFooter from './components/Footer';
import IHeader from './components/Header';
import Pages from './pages/Pages';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="min-h-screen flex flex-col">
      <IHeader/>
      <Pages/>
      <IFooter/>
    </Layout>
  );
}

export default App;