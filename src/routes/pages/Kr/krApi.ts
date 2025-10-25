// Kr模块API服务层
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'https://api.prover.xyz';

// 通用响应类型
interface ApiResponse {
  code: string;
  msg: string;
  [key: string]: unknown;
}

// 系统设置类型
interface SystemSetting {
  enableInviteCode: boolean;
  [key: string]: unknown;
}

// 用户概览类型
interface UserOverview {
  id: number;
  name: string;
  points: number;
  checkInDays: number;
  completedTasks: number;
  earnedStamps: number;
  twitterName?: string;
  avatarUrl?: string;
}

// 第一个任务类型
interface FirstTask {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  startAt: number;
  endAt: number;
  taskList: unknown[];
  createdAt: number;
  updatedAt: number;
}

// 获取存储的认证token
const getAuthToken = (): string | null => {
  return localStorage.getItem('cysic_kr_activity_auth');
};

// 设置认证token
const setAuthToken = (token: string): void => {
  localStorage.setItem('cysic_kr_activity_auth', token);
};

// 清除认证token
const clearAuthToken = (): void => {
  localStorage.removeItem('cysic_kr_activity_auth');
};

// 通用请求函数
async function request<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // 如果有 token，添加到 header
  if (token) {
    headers['x-cysic-auth'] = token;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// 系统设置相关接口
export const systemApi = {
  // 获取系统设置
  getSettings: (): Promise<ApiResponse & { data: SystemSetting }> =>
    request('/socialtask/api/v1/systemSetting'),
};

// 社交媒体相关接口
export const socialMediaApi = {
  // 绑定Twitter
  bindTwitter: (): Promise<ApiResponse> =>
    request('/socialtask/api/v1/socialMedia/bindTwitter', {
      method: 'POST',
      body: JSON.stringify({ redirectURL: window.location.origin + window.location.pathname }),
    }),
};

// 邀请码相关接口
export const inviteCodeApi = {
  // 绑定邀请码
  bindInviteCode: (inviteCode: string, socialName: string): Promise<ApiResponse> =>
    request('/socialtask/api/v1/inviteCode/bind', {
      method: 'POST',
      body: JSON.stringify({ inviteCode, socialName }),
    }),
};

// 用户相关接口
export const userApi = {
  // 获取用户概览
  getOverview: (): Promise<ApiResponse & { data: UserOverview }> =>
    request('/socialtask/api/v1/user/overview'),
};

// 任务类型定义
interface Task {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  taskType: string;
  RewardPoints: number;
  RewardStampId: number;
  startAt: number;
  endAt: number;
  forceLocked: boolean;
  currentStatus: number; // 0: 未完成, 1: 待审核, 2: 待领取, 3: 已完成
  taskResult: string;
  createdAt: number;
  updatedAt: number;
  inviteTaskConfig?: {
    requestInviteNum: number;
  };
  postTwitterTaskConfig?: {
    content: string;
  };
  quizTaskConfig?: {
    quiz: string;
    answer: string;
  };
  quoteTwitterTaskConfig?: {
    content: string;
  };
}

// 任务相关接口
export const taskApi = {
  // 获取第一个任务
  getFirstTask: (): Promise<ApiResponse & { task: FirstTask }> =>
    request('/socialtask/api/v1/firstTask'),
  
  // 获取任务列表
  getTaskList: (): Promise<ApiResponse & { list: Task[]; total: number; totalWithoutForceLocked: number }> =>
    request('/socialtask/api/v1/task/list'),
  
  // 提交任务
  submitTask: (taskId: number, result: string): Promise<ApiResponse> =>
    request('/socialtask/api/v1/task/submit', {
      method: 'POST',
      body: JSON.stringify({ taskId, result }),
    }),
};

// 认证相关工具函数
export const authUtils = {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  isAuthenticated: (): boolean => getAuthToken() !== null,
};

export default {
  systemApi,
  socialMediaApi,
  inviteCodeApi,
  userApi,
  taskApi,
  authUtils,
};
