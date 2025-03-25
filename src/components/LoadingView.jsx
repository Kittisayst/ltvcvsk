import React from 'react';
import { Spin, Typography } from 'antd';

const { Text } = Typography;

const LoadingView = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 min-h-64">
            <Spin size="large" tip="ກຳລັງໂຫຼດຂໍ້ມູນ..." spinning={true}>
                <div className="h-64 flex items-center justify-center w-full">
                    <div className="text-center">
                        <Text className="text-gray-500">ກຳລັງດຶງຂໍ້ມູນຈາກ Google Sheets...</Text>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default LoadingView;