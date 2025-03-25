import React from 'react';
import { Button, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ErrorView = ({ onRetry }) => {
    return (
        <div className="p-6 bg-red-50 rounded-lg border border-red-100">
            <div className="flex flex-col items-center text-center">
                <div className="text-red-500 text-5xl mb-4">
                    <ReloadOutlined />
                </div>
                <Title level={4} className="text-red-700 mb-2">ເກີດຂໍ້ຜິດພາດ</Title>
                <Text className="text-red-600 mb-6">
                    ບໍ່ສາມາດດຶງຂໍ້ມູນໄດ້. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.
                </Text>
                <Button
                    icon={<ReloadOutlined />}
                    onClick={onRetry}
                    type="primary"
                    danger
                    size="large"
                    className="shadow-md hover:shadow-lg transition-all"
                >
                    ລອງໃໝ່
                </Button>
            </div>
        </div>
    );
};

export default ErrorView;