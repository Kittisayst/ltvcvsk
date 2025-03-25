// src/hooks/useGoogleSheets.js
import { useState, useEffect } from 'react';
import googleSheetsAPI from '../services/GoogleSheetsAPI';

export const useGoogleSheets = (customSheetKey = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize the API when the hook is first used or when customSheetKey changes
    const sheetKeyToUse = customSheetKey || import.meta.env.VITE_GOOGLE_SHEET_KEY || '';
    
    console.log("useGoogleSheets: Initializing API with sheetKey:", sheetKeyToUse);
    
    googleSheetsAPI.init(
      import.meta.env.VITE_GOOGLE_SCRIPT_URL || '',
      import.meta.env.VITE_GOOGLE_API_KEY || '',
      sheetKeyToUse
    );
    
    setInitialized(true);
  }, [customSheetKey]); // ເພີ່ມ dependency ເພື່ອໃຫ້ effect ທຳງານເມື່ອ customSheetKey ປ່ຽນແປງ

  const handleRequest = async (requestFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ປັບປຸງຟັງຊັນໃຫ້ຮັບຄ່າ sheetKey ເປັນ parameter
  const fetchData = async (sheetName, customKeys, sheetKey = customSheetKey) => {
    try {
      console.log(`useGoogleSheets fetchData: ${sheetName} using sheetKey:`, sheetKey || "default");
      const data = await handleRequest(() => googleSheetsAPI.getData(sheetName, sheetKey));
      
      // ກວດສອບວ່າຂໍ້ມູນທີ່ໄດ້ຮັບແມ່ນ array ຫຼືບໍ່
      if (!data || !Array.isArray(data)) {
        console.warn(`useGoogleSheets: Data from ${sheetName} is not an array:`, data);
        return [];
      }
      
      return googleSheetsAPI.createObject(data, customKeys);
    } catch (error) {
      console.error(`useGoogleSheets: Error fetching data from ${sheetName}:`, error);
      return []; // ສົ່ງຄືນ array ວ່າງເພື່ອຫຼີກລ້ຽງຂໍ້ຜິດພາດ
    }
  };

  const addData = (sheetName, values, sheetKey = customSheetKey) => {
    console.log(`useGoogleSheets addData: ${sheetName} using sheetKey:`, sheetKey || "default");
    return handleRequest(() => googleSheetsAPI.addData(sheetName, values, sheetKey));
  };

  const updateData = (sheetName, values, row, sheetKey = customSheetKey) => {
    console.log(`useGoogleSheets updateData: ${sheetName} using sheetKey:`, sheetKey || "default");
    return handleRequest(() => googleSheetsAPI.updateData(sheetName, values, row, sheetKey));
  };

  const deleteData = (sheetName, row, sheetKey = customSheetKey) => {
    console.log(`useGoogleSheets deleteData: ${sheetName} using sheetKey:`, sheetKey || "default");
    return handleRequest(() => googleSheetsAPI.deleteData(sheetName, row, sheetKey));
  };

  return {
    loading,
    error,
    initialized,
    fetchData,
    addData,
    updateData,
    deleteData
  };
};