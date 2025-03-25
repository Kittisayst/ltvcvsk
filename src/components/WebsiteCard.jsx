import React from 'react';
import { Card, Row, Col, Button, Typography, Badge, Tooltip, Tag } from 'antd';
import { GlobalOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Meta } = Card;

const WebsiteCard = ({ websites, webTypes }) => {
  // ຄົ້ນຫາຊື່ປະເພດຈາກ ID
  const getTypeName = (typeId) => {
    if (!webTypes || !typeId) return null;
    
    const foundType = webTypes.find(type => type.id === typeId);
    return foundType ? (
      <Tag color="blue">{foundType.name}</Tag>
    ) : null;
  };

  return (
    <Row gutter={[24, 24]}>
      {websites.map((web, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={web.id || index}>
          <Badge.Ribbon 
            text="ແນະນຳ" 
            color="blue" 
            className={index % 3 === 0 ? 'block' : 'hidden'}
          >
            <Card
              hoverable
              className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-md"
              cover={
                <div className="h-48 overflow-hidden relative group">
                  <img 
                    alt={web.name} 
                    src={web.image_url} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x160?text=ບໍ່ພົບຮູບພາບ';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      type="primary" 
                      icon={<EyeOutlined />}
                      onClick={() => window.open(web.url, '_blank')}
                      className="mr-2"
                      ghost
                    >
                      ເບິ່ງ
                    </Button>
                    <Button 
                      icon={<HeartOutlined />}
                      className="ml-2"
                      ghost
                    >
                      ມັກ
                    </Button>
                  </div>
                </div>
              }
              styles={{ body: { padding: '16px' } }}
            >
              <Meta
                title={
                  <div className="flex justify-between items-center">
                    <Tooltip title={web.name}>
                      <Text ellipsis className="text-lg font-medium">
                        {web.name}
                      </Text>
                    </Tooltip>
                    <Button 
                      type="text" 
                      shape="circle" 
                      icon={<GlobalOutlined className="text-blue-500" />}
                      onClick={() => window.open(web.url, '_blank')}
                    />
                  </div>
                }
                description={
                  <div>
                    <Text ellipsis className="text-gray-500 text-sm block mb-2">
                      {web.url}
                    </Text>
                    {web.type && getTypeName(web.type)}
                  </div>
                }
              />
            </Card>
          </Badge.Ribbon>
        </Col>
      ))}
    </Row>
  );
};

export default WebsiteCard;