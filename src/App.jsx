import React, { useEffect, useState } from 'react';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { 
  Layout, 
  Divider,
  Button,
  Tooltip,
  Select,
  Typography,
  Space,
  Card
} from 'antd';
import { 
  AppstoreOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
  GlobalOutlined
} from '@ant-design/icons';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import SearchBar from './components/SearchBar';
import LoadingView from './components/LoadingView';
import ErrorView from './components/ErrorView';
import WebsiteCard from './components/WebsiteCard';
import WebsiteList from './components/WebsiteList';

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

export default function App() {
  // ຂໍ້ມູນພາຍໃນ (Internal)
  const [internalWebData, setInternalWebData] = useState([]);
  const [filteredInternalData, setFilteredInternalData] = useState([]);
  const [internalLoading, setInternalLoading] = useState(true);
  
  // ຂໍ້ມູນພາຍນອກ (External)
  const [externalWebData, setExternalWebData] = useState([]);
  const [filteredExternalData, setFilteredExternalData] = useState([]);
  const [externalLoading, setExternalLoading] = useState(true);
  
  // ຂໍ້ມູນປະເພດ
  const [webTypes, setWebTypes] = useState([]);
  const [typesLoading, setTypesLoading] = useState(true);
  
  const [selectedType, setSelectedType] = useState('all');
  
  // ຄ່າອື່ນໆ
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const { fetchData, loading, error } = useGoogleSheets();

  useEffect(() => {
    // ເລີ່ມໂຫຼດຂໍ້ມູນພາຍໃນກ່ອນ
    loadInternalData();
  }, []);

  useEffect(() => {
    // ເມື່ອຂໍ້ມູນພາຍໃນໂຫຼດສຳເລັດແລ້ວ, ຈຶ່ງເລີ່ມໂຫຼດຂໍ້ມູນອື່ນພ້ອມກັນ
    if (!internalLoading) {
      loadWebTypes();
      loadExternalData();
    }
  }, [internalLoading]);

  useEffect(() => {
    if (internalWebData.length > 0) {
      handleSearchInternal(searchText);
    }
  }, [internalWebData, searchText]);

  useEffect(() => {
    if (externalWebData.length > 0) {
      handleSearchExternal(searchText, selectedType);
    }
  }, [externalWebData, searchText, selectedType]);

  // ໂຫຼດຂໍ້ມູນພາຍໃນເທົ່ານັ້ນ (ສະແດງກ່ອນ)
  const loadInternalData = async () => {
    try {
      setInternalLoading(true);
      // ດຶງຂໍ້ມູນເວັບພາຍໃນ (Internal)
      const internalData = await fetchData("db_application", ["id", "name", "url", "image_url"]);
      setInternalWebData(internalData);
      setFilteredInternalData(internalData);
    } catch (error) {
      console.log("ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນພາຍໃນ:", error);
    } finally {
      setInternalLoading(false);
    }
  };

  // ໂຫຼດຂໍ້ມູນປະເພດເວັບໄຊ
  const loadWebTypes = async () => {
    try {
      setTypesLoading(true);
      // ດຶງຂໍ້ມູນປະເພດເວັບໄຊ (Web Types)
      const typeData = await fetchData("db_webType", ["id", "name"]);
      setWebTypes(typeData);
    } catch (error) {
      console.log("ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນປະເພດເວັບໄຊ:", error);
    } finally {
      setTypesLoading(false);
    }
  };

  // ໂຫຼດຂໍ້ມູນພາຍນອກ
  const loadExternalData = async () => {
    try {
      setExternalLoading(true);
      // ດຶງຂໍ້ມູນເວັບພາຍນອກ (External)
      const externalData = await fetchData("db_web", ["id", "name", "type", "url", "image_url"]);
      setExternalWebData(externalData);
      setFilteredExternalData(externalData);
    } catch (error) {
      console.log("ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນພາຍນອກ:", error);
    } finally {
      setExternalLoading(false);
    }
  };

  // ຄົ້ນຫາສະເພາະຂໍ້ມູນພາຍໃນ
  const handleSearchInternal = (value) => {
    const searchTerm = value.toLowerCase();
    
    // ກັ່ນຕອງຂໍ້ມູນພາຍໃນ (Internal)
    const filteredInternal = internalWebData.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.url.toLowerCase().includes(searchTerm)
    );
    setFilteredInternalData(filteredInternal);
  };

  // ຄົ້ນຫາສະເພາະຂໍ້ມູນພາຍນອກ
  const handleSearchExternal = (value, type) => {
    const searchTerm = value.toLowerCase();
    
    // ກັ່ນຕອງຂໍ້ມູນພາຍນອກ (External)
    let filteredExternal = externalWebData.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.url.toLowerCase().includes(searchTerm)
    );
    
    // ຖ້າມີການເລືອກປະເພດ, ໃຫ້ກັ່ນຕອງຕື່ມ
    if (type !== 'all') {
      filteredExternal = filteredExternal.filter(item => item.type === type);
    }
    
    setFilteredExternalData(filteredExternal);
  };

  // ຈັດການກັບການຄົ້ນຫາທັງໝົດ
  const handleSearch = (value) => {
    setSearchText(value);
    handleSearchInternal(value);
    handleSearchExternal(value, selectedType);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    handleSearchExternal(searchText, value);
  };

  const handleRetry = () => {
    // ລອງໂຫຼດຂໍ້ມູນພາຍໃນໃໝ່
    loadInternalData();
  };

  const renderInternalContent = () => {
    if (internalLoading) {
      return <LoadingView message="ກຳລັງໂຫຼດຂໍ້ມູນພາຍໃນ..." />;
    }

    if (filteredInternalData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-gray-500 text-lg">
            ບໍ່ພົບຂໍ້ມູນພາຍໃນ
          </div>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return <WebsiteCard websites={filteredInternalData} webTypes={webTypes} />;
    } else {
      return <WebsiteList websites={filteredInternalData} webTypes={webTypes} />;
    }
  };

  const renderExternalContent = () => {
    if (externalLoading) {
      return <LoadingView message="ກຳລັງໂຫຼດຂໍ້ມູນພາຍນອກ..." />;
    }

    if (filteredExternalData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-gray-500 text-lg">
            ບໍ່ພົບຂໍ້ມູນພາຍນອກ
          </div>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return <WebsiteCard websites={filteredExternalData} webTypes={webTypes} />;
    } else {
      return <WebsiteList websites={filteredExternalData} webTypes={webTypes} />;
    }
  };

  // ສະແດງຂໍ້ຜິດພາດຖ້າບໍ່ສາມາດໂຫຼດຂໍ້ມູນພາຍໃນໄດ້
  if (error && internalLoading) {
    return (
      <Layout className="min-h-screen bg-gray-50">
        <AppHeader />
        <Content className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <ErrorView onRetry={handleRetry} />
            </div>
          </div>
        </Content>
        <AppFooter />
      </Layout>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
              <Title level={3} className="m-0 mb-4 sm:mb-0">ລາຍການແອັບພລິເຄຊັນ</Title>
              <div className="w-full sm:w-auto flex items-center flex-wrap gap-2">
                <SearchBar 
                  value={searchText}
                  onChange={handleSearch}
                />
                <Tooltip title="ມຸມມອງຕາຕະລາງ">
                  <Button 
                    icon={<AppstoreOutlined />} 
                    type={viewMode === 'grid' ? 'primary' : 'default'}
                    onClick={() => setViewMode('grid')} 
                  />
                </Tooltip>
                <Tooltip title="ມຸມມອງລາຍການ">
                  <Button 
                    icon={<UnorderedListOutlined />} 
                    type={viewMode === 'list' ? 'primary' : 'default'}
                    onClick={() => setViewMode('list')} 
                  />
                </Tooltip>
              </div>
            </div>
            
            <Divider className="my-4" />
            
            {/* ສ່ວນຂໍ້ມູນພາຍໃນ (ສະແດງສະເໝີ) */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <AppstoreAddOutlined className="text-xl mr-2 text-blue-500" />
                <Title level={4} className="m-0">ແອັບພລິເຄຊັນພາຍໃນ</Title>
              </div>
              <Divider className="my-4" />
              {renderInternalContent()}
            </div>

            {/* ສ່ວນຂໍ້ມູນພາຍນອກ */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GlobalOutlined className="text-xl mr-2 text-green-500" />
                  <Title level={4} className="m-0">ແອັບພລິເຄຊັນພາຍນອກ</Title>
                </div>
                <Select
                  style={{ width: 200 }}
                  placeholder="ເລືອກປະເພດແອັບ"
                  onChange={handleTypeChange}
                  value={selectedType}
                  loading={typesLoading}
                  disabled={typesLoading}
                >
                  <Option value="all">ທຸກປະເພດ</Option>
                  {webTypes.map(type => (
                    <Option key={type.id} value={type.name}>{type.name}</Option>
                  ))}
                </Select>
              </div>
              <Divider className="my-4" />
              {renderExternalContent()}
            </div>
          </div>
        </div>
      </Content>
      
      <AppFooter />
    </Layout>
  );
}