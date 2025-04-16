import axios, { AxiosRequestConfig } from 'axios';

// 是否启用 Mock 数据 - 通过环境变量或硬编码控制
const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true;

// 辅助函数 - 生成随机头像URL
const generateRandomAvatar = () => {
  const id = Math.floor(Math.random() * 1000);
  return `https://avatars.dicebear.com/api/human/${id}.svg`;
};

// 辅助函数 - 生成随机十六进制字符串
const generateRandomHex = (length = 40) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

// 辅助函数 - 生成随机日期字符串
const generateRandomDate = (startYear = 2021, endYear = 2023) => {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const second = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// Mock 数据映射表 - 按URL映射对应的数据
const mockDataMap: Record<string, (config: AxiosRequestConfig) => any> = {
  // 1. 系统相关接口
  '/health': () => {
    return {
      msg: "success",
      code: 10000,
      data: "OK"
    };
  },
  
  '/api/v1/upload': (config) => {
    const file = config.data?.get('file');
    return {
      msg: "success",
      code: 10000,
      data: `/images/${file ? file.name : 'mock-image.png'}`
    };
  },
  
  '/api/v1/convertAddr': (config) => {
    const addr = config.params?.addr || '';
    const ethAddr = addr.startsWith("0x") ? addr : `0x${generateRandomHex(40)}`;
    const cosmosAddr = addr.startsWith("cysic") ? addr : `cysic${generateRandomHex(38)}`;
    
    return {
      msg: "success",
      code: 10000,
      data: {
        eth_addr: ethAddr,
        cosmos_addr: cosmosAddr
      }
    };
  },
  
  // 2. 用户相关接口
  '/api/v1/user/updateProfile': (config) => {
    return {
      msg: "success",
      code: 10000
    };
  },
  
  '/api/v1/user/profile': () => {
    return {
      msg: "success",
      code: 10000,
      data: {
        name: "Test User",
        avatarUrl: generateRandomAvatar()
      }
    };
  },
  
  '/api/v1/user/overview': () => {
    return {
      msg: "success",
      code: 10000,
      data: {
        name: "Test User",
        avatarUrl: generateRandomAvatar(),
        inviteCode: "CYSIC" + Math.floor(Math.random() * 10000).toString(),
        balance: {
          amount: (Math.random() * 10000).toFixed(4),
          symbol: "CYS"
        },
        voucherCnt: Math.floor(Math.random() * 20),
        rewardList: [
          {
            amount: (Math.random() * 1000).toFixed(4),
            symbol: "CGT"
          },
          {
            amount: (Math.random() * 10000).toFixed(4),
            symbol: "CYS"
          }
        ],
        socialAccountList: {
          google: { name: "user@gmail.com" },
          x: { name: "@cysic_user" },
          discord: { name: "cysic_user#1234" }
        },
        nftCnt: Math.floor(Math.random() * 10)
      }
    };
  },
  
  // 3. 社交媒体相关接口
  '/api/v1/social/task/group/list': () => {
    return {
      msg: "success",
      code: 10000,
      data: {
        taskGroupList: [
          {
            id: 1,
            name: "EARN CGT REWARDS",
            sort: 1
          },
          {
            id: 2,
            name: "DIGITAL HARVESTER",
            sort: 2
          },
          {
            id: 3,
            name: "ZK MULTIPLIER",
            sort: 3
          }
        ]
      }
    };
  },
  
  '/api/v1/social/task/list': (config) => {
    const groupId = config.params?.groupId || 1;
    const pageNum = config.params?.pageNum || 1;
    const pageSize = config.params?.pageSize || 10;
    
    const taskList = Array.from({ length: pageSize }, (_, i) => {
      const id = (pageNum - 1) * pageSize + i + 1;
      return {
        id,
        title: `Task ${id} - Group ${groupId}`,
        description: `Complete this task to earn rewards in group ${groupId}`,
        status: Math.floor(Math.random() * 3).toString() // 0, 1, 2 随机状态
      };
    });
    
    return {
      msg: "success",
      code: 10000,
      data: { taskList }
    };
  },
  
  '/api/v1/social/bind/google': () => {
    return {
      msg: "success",
      code: 10000
    };
  },
  
  // 4. 邀请相关接口
  '/api/v1/referral/bind': (config) => {
    const requestData = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    const code = requestData?.code || '';
    
    if (!code || code.length < 5) {
      return {
        msg: "Invalid referral code",
        code: 10001
      };
    }
    
    return {
      msg: "success",
      code: 10000
    };
  },
  
  '/api/v1/referral/overview': () => {
    return {
      msg: "success",
      code: 10000,
      data: {
        inviteCode: "CYSIC" + Math.floor(Math.random() * 10000).toString(),
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
    };
  },
  
  '/api/v1/referral/levelList': () => {
    return {
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
    };
  },
  
  '/api/v1/referral/teamList': () => {
    const generateTeamMember = () => ({
      address: `0x${generateRandomHex(40)}`,
      status: Math.random() > 0.3 ? 1 : 0, // 1: active, 0: inactive
      joinAt: generateRandomDate(),
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
    });
    
    return {
      msg: "success",
      code: 10000,
      data: {
        leaderInfo: {
          address: `0x${generateRandomHex(40)}`,
          status: 1,
          joinAt: "2023-01-01 00:00:00",
          referralRewardList: []
        },
        teamList: Array.from({ length: 10 }, generateTeamMember)
      }
    };
  },
  
  // 5. ZK任务相关接口
  '/api/v1/zkTask/overview': () => {
    return {
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
        inviteCode: "CYSIC" + Math.floor(Math.random() * 10000).toString(),
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
    };
  },
  
  '/api/v1/zkTask/reward/phase1': () => {
    return {
      msg: "success",
      code: 10000,
      data: {
        activity: (Math.random() * 10000).toFixed(0),
        staking: (Math.random() * 1000).toFixed(0)
      }
    };
  },
  
  '/api/v1/zkTask/reward/phase2': () => {
    return {
      msg: "success",
      code: 10000,
      data: {
        claimable: (Math.random() * 500).toFixed(0),
        cys: {
          total: "10000",
          prover: (Math.random() * 1000).toFixed(0),
          verifier: (Math.random() * 2000).toFixed(0),
          activity: (Math.random() * 3000).toFixed(0),
          staking: (Math.random() * 4000).toFixed(0)
        },
        cgt: {
          total: "5000",
          prover: (Math.random() * 500).toFixed(0),
          verifier: (Math.random() * 1000).toFixed(0),
          activity: (Math.random() * 1500).toFixed(0),
          staking: (Math.random() * 2000).toFixed(0)
        }
      }
    };
  },
  
  '/api/v1/zkTask/reward/phase3': () => {
    return {
      msg: "success",
      code: 10000,
      data: {
        CYS: {
          total: "15000",
          income: {
            prover: (Math.random() * 1000).toFixed(0),
            verifier: (Math.random() * 2000).toFixed(0),
            activity: (Math.random() * 3000).toFixed(0),
            staking: (Math.random() * 4000).toFixed(0),
            others: (Math.random() * 5000).toFixed(0)
          },
          information: {
            convertable: (Math.random() * 1000).toFixed(0),
            stakedAmount: (Math.random() * 2000).toFixed(0),
            reservedAmount: (Math.random() * 3000).toFixed(0)
          },
          cost: {
            maintenanceFee: (Math.random() * 500).toFixed(0)
          }
        },
        CGT: {
          total: "10000",
          income: {
            prover: (Math.random() * 500).toFixed(0),
            verifier: (Math.random() * 1000).toFixed(0),
            activity: (Math.random() * 1500).toFixed(0),
            staking: (Math.random() * 2000).toFixed(0),
            others: (Math.random() * 2500).toFixed(0)
          },
          information: {
            convertable: (Math.random() * 500).toFixed(0),
            stakedAmount: (Math.random() * 1000).toFixed(0),
            reservedAmount: (Math.random() * 1500).toFixed(0)
          },
          cost: {
            maintenanceFee: (Math.random() * 250).toFixed(0)
          }
        }
      }
    };
  },
  
  '/api/v1/zkTask/convertHistory': (config) => {
    const page = config.params?.page || 1;
    const pageSize = config.params?.pageSize || 10;
    
    const generateHistoryItem = (i: number) => {
      const isFromCYS = Math.random() > 0.5;
      return {
        fromCoin: isFromCYS ? "CYS" : "CGT",
        toCoin: isFromCYS ? "CGT" : "CYS",
        amount: (Math.random() * 1000).toFixed(2),
        convertTime: generateRandomDate()
      };
    };
    
    return {
      msg: `success, page: ${page}, pageSize: ${pageSize}`,
      code: 10000,
      data: {
        historyList: Array.from({ length: pageSize }, (_, i) => 
          generateHistoryItem(i + (page - 1) * pageSize)
        )
      }
    };
  },
  
  // 6. 质押相关接口
  '/api/v1/stake/list': () => {
    const validators = Array.from({ length: 20 }, (_, i) => {
      const stakeAmount = Math.floor(Math.random() * 100000);
      const votingPowerPercent = (Math.random() * 15).toFixed(2);
      return {
        validatorName: `Validator ${i + 1}`,
        stake: {
          amount: stakeAmount.toString(),
          symbol: "CYS"
        },
        votingPower: {
          amount: stakeAmount.toString(),
          symbol: "CYS"
        },
        votingPowerPercent: `${votingPowerPercent}%`,
        commissionRate: `${Math.floor(Math.random() * 10)}%`,
        apr: `${(Math.random() * 10 + 3).toFixed(2)}%`
      };
    });
    
    return {
      msg: "success",
      code: 10000,
      data: {
        validatorList: validators
      }
    };
  },
  
  // 7. 验证者相关接口
  '/api/v1/validator/activeList': () => {
    const validators = Array.from({ length: 15 }, (_, i) => {
      const votingPower = Math.floor(Math.random() * 100000);
      const votingPowerPercent = (Math.random() * 15).toFixed(2);
      return {
        validatorName: `Active Validator ${i + 1}`,
        votingPower: {
          amount: votingPower.toString(),
          symbol: "CYS"
        },
        votingPowerPercent: `${votingPowerPercent}%`,
        commissionRate: `${Math.floor(Math.random() * 10)}%`
      };
    });
    
    return {
      msg: "success",
      code: 10000,
      data: {
        validatorList: validators
      }
    };
  }
};

// 匹配URL获取对应的Mock处理函数
const getMockFunction = (url: string) => {
  // 直接匹配
  if (mockDataMap[url]) {
    return mockDataMap[url];
  }
  
  // 处理带查询参数的URL
  const urlWithoutQuery = url.split('?')[0];
  if (mockDataMap[urlWithoutQuery]) {
    return mockDataMap[urlWithoutQuery];
  }
  
  // 未找到Mock数据，返回null
  return null;
};

// 安装Mock拦截器
export const setupMockInterceptor = () => {
  if (!IS_MOCK) return; // 如果不启用Mock，直接返回
  
  // 添加请求拦截器
  axios.interceptors.request.use(
    async (config) => {
      if (!config.url) return config;
      
      const mockFn = getMockFunction(config.url);
      if (mockFn) {
        // 如果找到对应的Mock数据，则取消实际请求
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        config.cancelToken = source.token;
        
        // 生成Mock响应
        const mockResponse = mockFn(config);
        
        // 控制台输出Mock信息（仅开发环境）
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Mock] ${config.method?.toUpperCase()} ${config.url}`, mockResponse);
        }
        
        // 取消实际请求，并传递Mock数据
        setTimeout(() => {
          source.cancel(JSON.stringify(mockResponse));
        }, 200); // 添加小延迟模拟网络请求
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // 添加响应拦截器，处理被取消的请求
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // 如果是Mock取消的请求，则返回Mock数据
      if (axios.isCancel(error) && error.message) {
        try {
          const mockData = JSON.parse(error.message);
          return Promise.resolve({
            data: mockData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config,
          });
        } catch (e) {
          // 解析失败，继续抛出错误
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  console.log('Mock数据已启用');
};