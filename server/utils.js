// 生成随机数据的辅助函数
const generateMockData = {
    // 生成随机头像URL
    avatar: () => {
      const id = Math.floor(Math.random() * 1000);
      return `https://avatars.dicebear.com/api/human/${id}.svg`;
    },
  
    // 生成随机地址
    address: (length = 40) => {
      const hex = Array.from({ length }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      return `0x${hex}`;
    },
  
    // 生成随机日期
    date: (startYear = 2021, endYear = 2023) => {
      const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
      const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
      const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      const second = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  };

// 简单的内存数据库，用于存储用户数据
const jsonDb = {
  users: {},
  
  // 初始化数据库
  init() {
    this.users = {};
    return this;
  },
  
  // 获取用户数据
  getUser(address) {
    return this.users[address] || null;
  },
  
  // 保存用户数据
  saveUser(address, userData) {
    this.users[address] = userData;
    return userData;
  },
  
  // 获取所有用户
  getAllUsers() {
    return Object.values(this.users);
  }
};
  
module.exports = {
  generateMockData,
  jsonDb
};