import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import IManu from './Manu';

const IHeader = () => {
    return (
        <Header className="bg-white shadow-md z-10">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Dropdown overlay={IManu} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            菜单 <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </div>
        </Header>)
}
export default IHeader;        