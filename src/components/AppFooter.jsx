import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
    return (
        <Footer className="text-center bg-white shadow-inner py-6">
            <Text className="text-gray-500">
                ©{new Date().getFullYear()} ແອັບພລິເຄຊັນຂອງຂ້ອຍ - ພັດທະນາດ້ວຍ❤️
            </Text>
        </Footer>
    );
};

export default AppFooter;