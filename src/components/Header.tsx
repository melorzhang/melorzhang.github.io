import { MenuProps, Dropdown, Button, Grid, message } from 'antd';
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, DownOutlined, MailOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { VERSION } from '../version';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: '/', icon: <PieChartOutlined />, label: '首页' },
    { key: '/feature1', icon: <DesktopOutlined />, label: '选择器功能' },
    { key: '/design-studio', icon: <ContainerOutlined />, label: '设计图工作室' },
    {
        key: 'sub1',
        label: '更多',
        icon: <MailOutlined />,
        children: [
            { key: '/about', label: '关于' },
        ],
    },
];

const IHeader = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const screens = useBreakpoint();
    const navigate = useNavigate();

    // 判断是否为移动端
    const isMobile = !screens.md;

    // 菜单点击跳转
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key.startsWith('/')) {
            navigate(e.key);
            setMenuVisible(false);
        }
    };

    // 页面加载时弹出版本号消息，10秒后自动关闭
    useEffect(() => {
        const key = 'version-message';
        message.open({
            content: `当前版本：${VERSION}`,
            duration: 10,
            key,
            type: 'info',
            style: { position: 'fixed', right: 24, top: 24 }
        });
        // 可选：10秒后手动关闭（其实 duration 已自动关闭）
        // setTimeout(() => message.destroy(key), 10000);
    }, []);

    return (
        <Header className="bg-white shadow-md z-10">
            <div className="container mx-auto">
                <div className="flex justify-between items-center relative">
                    {/* 菜单按钮 */}
                    <div>
                        <Button
                            type="primary"
                            onClick={() => setMenuVisible(!menuVisible)}
                            style={{ marginBottom: 16 }}
                        >
                            <MenuUnfoldOutlined />
                        </Button>
                        <Dropdown
                            menu={{ items, onClick: handleMenuClick }}
                            open={menuVisible}
                            onOpenChange={setMenuVisible}
                            trigger={isMobile ? ['click'] : ['hover']}
                            placement="bottomLeft"
                            overlayClassName="custom-header-dropdown"
                        >
                            <span
                                style={{ cursor: 'pointer', marginLeft: 8 }}
                                onClick={e => isMobile && setMenuVisible(!menuVisible)}
                                onMouseEnter={e => !isMobile && setMenuVisible(true)}
                                onMouseLeave={e => !isMobile && setMenuVisible(false)}
                            >
                                菜单 <DownOutlined />
                            </span>
                        </Dropdown>
                    </div>
                    {/* 右上角不再显示版本号 */}
                </div>
            </div>
        </Header>
    );
};

export default IHeader;