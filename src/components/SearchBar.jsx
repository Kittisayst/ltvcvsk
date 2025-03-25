import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ value, onChange }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <Input
            placeholder="ຄົ້ນຫາແອັບພລິເຄຊັນ..."
            prefix={<SearchOutlined className="text-gray-400" />}
            onChange={handleChange}
            value={value}
            allowClear
            className="rounded-full mr-2"
            style={{ width: '250px' }}
        />
    );
};

export default SearchBar;