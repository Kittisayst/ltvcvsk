import axios from 'axios';

// Constants
export const ACTIONS = {
  GET_DATA: 'getData',
  ADD_DATA: 'addData',
  UPDATE_DATA: 'updateData',
  DELETE_DATA: 'deleteData',
  GET_SHEETS: 'getSheets',
  ADD_SHEET: 'addSheet',
  UPDATE_SHEET: 'updateSheet',
  DELETE_SHEET: 'deleteSheet',
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

class GoogleSheetsAPIService {
  constructor() {
    this.scriptKey = null;
    this.apiKey = null;
    this.defaultSheetKey = null;
    this.apiInstance = null;
  }

  init(url, key, sheetKey) {
    console.log("GoogleSheetsAPI init ດ້ວຍ scriptKey:", url, "ແລະ apiKey, ແລະ sheetKey:", sheetKey);
    this.scriptKey = url;
    this.apiKey = key;
    this.defaultSheetKey = sheetKey;

    // ສ້າງ axios instance
    this.apiInstance = axios.create({
      baseURL: `https://script.google.com/macros/s/${this.scriptKey}/exec`,
      params: {
        apiKey: this.apiKey
      }
    });
  }

  async sendRequest(action, params = {}) {
    if (!this.scriptKey || !this.apiKey) {
      throw new Error('GoogleSheetsAPI not initialized. Call init() first.');
    }

    // ຫຼັກການສຳຄັນ: ຖ້າບໍ່ມີ sheetKey ໃນ params, ໃຊ້ this.defaultSheetKey
    const requestParams = {
      ...params,
      action
    };

    // ຮັບປະກັນວ່າ params.sheetKey ຈະຖືກໃຊ້ກ່ອນ this.defaultSheetKey
    if (!requestParams.sheetKey && this.defaultSheetKey) {
      requestParams.sheetKey = this.defaultSheetKey;
    }

    try {
      const response = await this.apiInstance.get('', {
        params: requestParams
      });

      const data = response.data;

      if (data.error) {
        console.warn(`API error for ${action}:`, data.error);
        throw new Error(data.error);
      }

      return data.data;
    } catch (error) {
      console.error('Request failed:', error.message);
      throw error;
    }
  }

  // ຟັງຊັ້ນດຶງຂໍ້ມູນ
  async getData(sheetName, sheetKey = null) {
    return this.sendRequest(ACTIONS.GET_DATA, { sheetKey, sheetName });
  }

  // ຟັງຊັ້ນເພີ່ມຂໍ້ມູນ
  async addData(sheetName, values, sheetKey = null) {
    return this.sendRequest(ACTIONS.ADD_DATA, {
      sheetKey,
      sheetName,
      values: JSON.stringify(values)
    });
  }

  // ຟັງຊັ້ນອັບເດດຂໍ້ມູນ
  async updateData(sheetName, values, row, sheetKey = null) {
    return this.sendRequest(ACTIONS.UPDATE_DATA, {
      sheetKey,
      sheetName,
      values: JSON.stringify(values),
      row
    });
  }

  // ຟັງຊັ້ນລຶບຂໍ້ມູນ
  async deleteData(sheetName, row, sheetKey = null) {
    return this.sendRequest(ACTIONS.DELETE_DATA, {
      sheetKey,
      sheetName,
      row
    });
  }

  // Sheet operations
  async getSheets(sheetKey = null) {
    return this.sendRequest(ACTIONS.GET_SHEETS, { sheetKey });
  }

  async addSheet(sheetName, sheetKey = null) {
    return this.sendRequest(ACTIONS.ADD_SHEET, { sheetKey, sheetName });
  }

  async updateSheet(sheetName, newSheetName, sheetKey = null) {
    return this.sendRequest(ACTIONS.UPDATE_SHEET, {
      sheetKey,
      sheetName,
      newSheetName
    });
  }

  async deleteSheet(sheetName, sheetKey = null) {
    return this.sendRequest(ACTIONS.DELETE_SHEET, { sheetKey, sheetName });
  }

  // Utility functions
  createObject(arr, customKeys) {
    if (!Array.isArray(customKeys) || customKeys.length === 0) {
      throw new Error("customKeys must be a non-empty array");
    }

    // ກວດສອບວ່າ arr ເປັນ array ຫຼືບໍ່
    if (!arr || !Array.isArray(arr)) {
      console.warn("createObject received non-array data:", arr);
      return []; // ສົ່ງຄືນ array ວ່າງເມື່ອຂໍ້ມູນບໍ່ຖືກຕ້ອງ
    }

    return arr.map(row => {
      const obj = {};
      customKeys.forEach((key, index) => {
        if (index < row.length) {
          obj[key] = row[index];
        }
      });
      return obj;
    });
  }
}

// Create and export a single instance
const googleSheetsAPI = new GoogleSheetsAPIService();
export default googleSheetsAPI;