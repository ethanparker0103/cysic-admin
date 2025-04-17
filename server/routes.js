const { generateMockData, jsonDb } = require('./utils');

// 定义路由及其处理函数
module.exports = (app) => {
  // 系统相关接口
  app.get('/health', (req, res) => {
    res.json({
      msg: "success",
      code: 10000,
      data: "OK"
    });
  });
  
  app.post('/api/v1/upload', (req, res) => {
    res.json({
      msg: "success",
      code: 10000,
      data: `/images/mock-image-${Date.now()}.png`
    });
  });
  
  // 用户相关接口
  app.get('/api/v1/user/profile', (req, res) => {
    // 从请求中获取用户地址(通常会从认证机制中获取)
    const address = req.query.address || req.headers['x-cysic-address'];
    
    if (!address) {
      return res.status(400).json({
        msg: "Missing user address",
        code: 40001
      });
    }
    
    // 从JSON数据库获取用户数据
    const userData = jsonDb.getUser(address);
    
    if (!userData) {
      return res.json({
        msg: "success",
        code: 10000,
        data: {
          name: "Test User",
          avatarUrl: generateMockData.avatar()
        }
      });
    }
    
    // 只返回profile接口需要的字段
    res.json({
      msg: "success",
      code: 10000,
      data: {
        name: userData.name,
        avatarUrl: userData.avatarUrl
      }
    });
  });
  
  app.post('/api/v1/user/updateProfile', (req, res) => {
    const { name, avatarUrl } = req.body;
    const address = req.body.address || req.headers['x-cysic-address'];
    
    if (!address) {
      return res.status(400).json({
        msg: "Missing user address",
        code: 40001
      });
    }
    
    // 获取现有用户数据或创建新用户
    let userData = jsonDb.getUser(address);
    if (!userData) {
      userData = { 
        address,
        name: "",
        avatarUrl: "",
        registrationComplete: false,
        isRegistered: true
      };
    }
    
    // 更新用户数据
    if (name !== undefined) userData.name = name;
    if (avatarUrl !== undefined) userData.avatarUrl = avatarUrl;
    
    // 如果设置了名称，默认认为注册完成
    if (name) {
      userData.registrationComplete = true;
    }
    
    // 保存到JSON数据库
    jsonDb.saveUser(address, userData);
    
    res.json({
      msg: "success",
      code: 10000,
      data: {
        name: userData.name,
        avatarUrl: userData.avatarUrl
      }
    });
  });
  
  app.get('/api/v1/user/overview', (req, res) => {
    // 从请求中获取用户地址
    const address = req.query.address || req.headers['x-cysic-address'];
    
    if (!address) {
      return res.status(400).json({
        msg: "Missing user address",
        code: 40001
      });
    }
    
    // 从JSON数据库获取用户数据
    let userData = jsonDb.getUser(address);
    console.log('userData', userData)
    
    // 如果用户不存在，返回错误
    if (!userData) {
      return res.status(404).json({
        msg: "User not found",
        code: 40004
      });
    }
    
    // 返回完整的用户数据
    res.json({
      msg: "success",
      code: 10000,
      data: userData
    });
  });
  
  // 邀请相关接口
  app.get('/api/v1/referral/overview', (req, res) => {
    res.json({
      msg: "success",
      code: 10000,
      data: {
        inviteCode: "CYSIC" + Math.floor(Math.random() * 10000),
        referralEaringList: [
          {
            amount: (Math.random() * 500).toFixed(2),
            symbol: "CYS"
          },
          {
            amount: (Math.random() * 200).toFixed(2),
            symbol: "CGT"
          }
        ],
        upgradeEaring: {
          amount: (Math.random() * 1000).toFixed(3),
          symbol: "CGT"
        },
        currentLevelID: Math.floor(Math.random() * 5) + 1
      }
    });
  });
  
  app.get('/api/v1/referral/teamList', (req, res) => {
    res.json({
      msg: "success",
      code: 10000,
      data: {
        leaderInfo: {
          address: generateMockData.address(),
          status: 1,
          joinAt: "2023-01-01 00:00:00",
          referralRewardList: []
        },
        teamList: Array.from({ length: 10 }, () => ({
          address: generateMockData.address(),
          status: Math.random() > 0.3 ? 1 : 0,
          joinAt: generateMockData.date(),
          referralRewardList: [
            {
              amount: (Math.random() * 200).toFixed(2),
              symbol: "CYS"
            },
            {
              amount: (Math.random() * 100).toFixed(2),
              symbol: "CGT"
            }
          ]
        }))
      }
    });
  });
  
  app.get('/api/v1/referral/levelList', (req, res) => {
    res.json({
      msg: "success",
      code: 10000,
      data: {
        levelList: [
          {
            id: 1,
            level: 1,
            name: "Bronze",
            reward: {
              amount: "100",
              symbol: "CYS"
            },
            needInviteCnt: 0,
            poolFee: "1%"
          },
          {
            id: 2,
            level: 2,
            name: "Silver",
            reward: {
              amount: "200",
              symbol: "CYS"
            },
            needInviteCnt: 10,
            poolFee: "2%"
          },
          {
            id: 3,
            level: 3,
            name: "Gold",
            reward: {
              amount: "500",
              symbol: "CYS"
            },
            needInviteCnt: 20,
            poolFee: "3%"
          },
          {
            id: 4,
            level: 4,
            name: "Platinum",
            reward: {
              amount: "1000",
              symbol: "CYS"
            },
            needInviteCnt: 30,
            poolFee: "4%"
          },
          {
            id: 5,
            level: 5,
            name: "Diamond",
            reward: {
              amount: "10000",
              symbol: "CYS"
            },
            needInviteCnt: 100,
            poolFee: "5%"
          }
        ]
      }
    });
  });
  
  // ZK任务相关接口
  app.get('/api/v1/zkTask/overview', (req, res) => {
    res.json({
      msg: "success",
      code: 10000,
      data: {
        rewardList: [
          {
            amount: (Math.random() * 1000).toFixed(2),
            symbol: "CYS"
          },
          {
            amount: (Math.random() * 500).toFixed(2),
            symbol: "CGT"
          }
        ],
        voucherCnt: Math.floor(Math.random() * 20),
        inviteCode: "CYSIC" + Math.floor(Math.random() * 10000),
        successInviteCnt: Math.floor(Math.random() * 100),
        multiplierPercent: Math.floor(Math.random() * 100),
        proverTaskCompletedCnt: Math.floor(Math.random() * 20),
        verifierTaskCompletedCnt: Math.floor(Math.random() * 40),
        proverStatus: {
          nftActive: Math.random() > 0.5 ? 1 : 0,
          selfActive: Math.random() > 0.5 ? 1 : 0
        },
        verifierStatus: {
          standardActive: Math.random() > 0.5 ? 1 : 0,
          mobileActive: Math.random() > 0.5 ? 1 : 0
        },
        projectStatus: {
          ongoingCnt: Math.floor(Math.random() * 200),
          underReviewCnt: Math.floor(Math.random() * 20)
        }
      }
    });
  });
  
  // 添加代币转换历史接口
  app.get('/api/v1/zkTask/convertHistory', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    // 生成模拟数据
    const historyList = Array.from({ length: 10 }, (_, i) => {
      // 随机生成 CYS->CGT 或 CGT->CYS 的记录
      const fromCoin = Math.random() > 0.5 ? "CYS" : "CGT";
      const toCoin = fromCoin === "CYS" ? "CGT" : "CYS";
      
      // 生成随机金额，保留两位小数
      const amount = (1000 + Math.random() * 4000).toFixed(2);
      
      // 生成随机时间，最近1个月内
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      const convertTime = date.toISOString().replace('T', ' ').slice(0, 19);
      
      return {
        fromCoin,
        toCoin,
        amount,
        convertTime
      };
    });
    
    res.json({
      msg: `success, page: ${page}, pageSize: ${pageSize}`,
      code: 10000,
      data: {
        historyList
      }
    });
  });
  
  // 质押相关接口
  app.get('/api/v1/stake/list', (req, res) => {
    const validators = Array.from({ length: 5 }, (_, i) => {
      const stakeAmount = Math.floor(Math.random() * 100000);
      const votingPowerPercent = (Math.random() * 15).toFixed(2);
      return {
        validatorName: `Validator ${i + 1}`,
        stake: {
          amount: stakeAmount.toString(),
          symbol: "CGT"
        },
        votingPower: {
          amount: stakeAmount.toString(),
          symbol: "CGT"
        },
        votingPowerPercent: `${votingPowerPercent}%`,
        commissionRate: `${Math.floor(Math.random() * 10)}%`,
        apr: `${(Math.random() * 10 + 3).toFixed(2)}%`
      };
    });
    
    res.json({
      msg: "success",
      code: 10000,
      data: {
        validatorList: validators
      }
    });
  });
  
  app.get('/api/v1/validator/activeList', (req, res) => {
    const validators = Array.from({ length: 10 }, (_, i) => {
      const votingPower = Math.floor(Math.random() * 100000);
      const votingPowerPercent = (Math.random() * 15).toFixed(2);
      return {
        validatorName: `Active Validator ${i + 1}`,
        votingPower: {
          amount: votingPower.toString(),
          symbol: "CGT"
        },
        votingPowerPercent: `${votingPowerPercent}%`,
        commissionRate: `${Math.floor(Math.random() * 10)}%`
      };
    });
    
    res.json({
      msg: "success",
      code: 10000,
      data: {
        validatorList: validators
      }
    });
  });

  app.post('/api/v1/referral/bind', (req, res) => {
    const { code } = req.body;
    const address = req.body.address || req.headers['x-cysic-address'];

    // 验证邀请码是否有效
    if (!code || code.length !== 5) {
      return res.status(400).json({
        msg: "Invalid invite code",
        code: 40001
      });
    }
    
    // 验证地址是否存在
    if (!address) {
      return res.status(400).json({
        msg: "Address is required for registration",
        code: 40001
      });
    }
    
    // 从JSON数据库获取用户数据
    let userData = jsonDb.getUser(address);
    
    // 如果用户已存在，并且已经注册过，则返回已注册的消息
    if (userData && userData.isRegistered) {
      return res.status(400).json({
        msg: "Address already registered",
        code: 40002
      });
    }
    
    // 创建新用户
    userData = {
      address,
      name: "",
      avatarUrl: "",
      inviteCode: code,
      isRegistered: true,
      registrationComplete: false,
      balance: {
        amount: "0",
        symbol: "CYS"
      },
      voucherCnt: 0,
      rewardList: [
        {
          amount: "0",
          symbol: "CGT"
        },
        {
          amount: "0",
          symbol: "CYS"
        }
      ],
      socialAccountList: {
        google: null,
        x: null,
        discord: null
      },
      nftCnt: 0
    };
    
    // 保存到JSON数据库
    jsonDb.saveUser(address, userData);
    
    res.json({
      msg: "success",
      code: 10000
    });
  });
};