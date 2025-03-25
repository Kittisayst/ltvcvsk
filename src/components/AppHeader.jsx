import React, { useState, useEffect } from 'react';
import { Layout, Button, Tooltip, Drawer, List, Typography, Divider } from 'antd';
import { GlobalOutlined, HeartOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../assets/ltvc.png';

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // ຕິດຕາມການເລື່ອນຂອງໜ້າຈໍ ເພື່ອປ່ຽນສີພື້ນຫຼັງຂອງ Header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // ຂໍ້ມູນເມນູດ່ວນ (ຕົວຢ່າງ)
    const quickLinks = [
        { title: 'ໜ້າຫຼັກ', url: '/' },
        { title: 'ກ່ຽວກັບພະແນກວິຊາການ', url: '/about' },
        { title: 'ຕິດຕໍ່ພວກເຮົາ', url: '/contact' },
        { title: 'ນະໂຍບາຍການນຳໃຊ້', url: '/policy' }
    ];

    // ຂໍ້ມູນເວັບທີ່ມັກ (ຕົວຢ່າງ)
    const favoriteLinks = [
        { title: 'ລະບົບ E-Office', url: 'https://e-office.example.com' },
        { title: 'ລະບົບຄຸ້ມຄອງນັກສຶກສາ', url: 'https://student.example.com' },
        { title: 'ລະບົບຄົ້ນຄວ້າ ແລະ ວິໄຈ', url: 'https://research.example.com' }
    ];

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <Header 
            className={`sticky top-0 z-10 px-6 flex items-center justify-between transition-all duration-300 ${
                scrolled ? 'shadow-md bg-blue-800' : 'bg-blue-700'
            }`}
            style={{ padding: '0 16px', height: 64 }}
        >
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="ໂລໂກວິທະຍາໄລເຕັກນິກວິຊາຊີບ ຫຼວງພະບາງ"
                    className="w-10 h-10 mr-2"
                />
                {screenWidth > 600 ? (
                    <div className="text-white text-xl font-bold">ເວັບໄຊພະແນກວິຊາການ</div>
                ) : (
                    <div className="text-white text-lg font-bold">ພະແນກວິຊາການ</div>
                )}
            </div>
            <div className="flex items-center">
                <Tooltip title="ເວັບໄຊຂ້າງນອກ">
                    <Button
                        type="text"
                        shape="circle"
                        icon={<GlobalOutlined />}
                        className="text-white hover:text-blue-200 hover:bg-blue-600"
                        onClick={showDrawer}
                        aria-label="ເວັບໄຊຂ້າງນອກ"
                    />
                </Tooltip>
                <Tooltip title="ເວັບໄຊທີ່ທ່ານມັກ">
                    <Button
                        type="text"
                        shape="circle"
                        icon={<HeartOutlined />}
                        className="text-white hover:text-blue-200 hover:bg-blue-600 ml-2"
                        onClick={showDrawer}
                        aria-label="ເວັບໄຊທີ່ທ່ານມັກ"
                    />
                </Tooltip>
                {screenWidth <= 768 && (
                    <Tooltip title="ເມນູ">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<MenuOutlined />}
                            className="text-white hover:text-blue-200 hover:bg-blue-600 ml-2"
                            onClick={showDrawer}
                            aria-label="ເມນູ"
                        />
                    </Tooltip>
                )}
            </div>

            {/* Drawer ສຳລັບສະແດງເມນູຫຼືລິ້ງ */}
            <Drawer
                title="ເມນູ ແລະ ລິ້ງທີ່ເປັນປະໂຫຍດ"
                placement="right"
                onClose={closeDrawer}
                open={drawerVisible}
                width={300}
            >
                <div>
                    <Title level={5}>ເມນູດ່ວນ</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={quickLinks}
                        renderItem={(item) => (
                            <List.Item>
                                <a href={item.url} onClick={closeDrawer}>{item.title}</a>
                            </List.Item>
                        )}
                    />
                    
                    <Divider />
                    
                    <Title level={5}>ເວັບໄຊທີ່ທ່ານມັກ</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={favoriteLinks}
                        renderItem={(item) => (
                            <List.Item>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={closeDrawer}>
                                    {item.title}
                                </a>
                            </List.Item>
                        )}
                    />
                </div>
            </Drawer>
        </Header>
    );
};

export default AppHeader;