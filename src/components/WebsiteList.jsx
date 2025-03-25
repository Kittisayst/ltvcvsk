import React from 'react';
import { Button, Typography } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const WebsiteList = ({ websites }) => {
    return (
        <div className="space-y-4">
            {websites.map((web, index) => (
                <div
                    key={web.id || index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-36">
                            <img
                                alt={web.name}
                                src={web.image_url}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x160?text=ບໍ່ພົບຮູບພາບ';
                                }}
                            />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <Title level={4} className="mb-2">{web.name}</Title>
                                <Text ellipsis className="text-gray-500">{web.url}</Text>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button
                                    type="primary"
                                    icon={<GlobalOutlined />}
                                    onClick={() => window.open(web.url, '_blank')}
                                >
                                    ເຂົ້າເບິ່ງ
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WebsiteList;