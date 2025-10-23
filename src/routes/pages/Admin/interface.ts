

// 任务类型常量
export enum ETaskType {
    TaskTypeQuiz = "quiz",        // 问答任务
    TaskTypeInvite = "invite",      // 邀请任务
    TaskTypePostTwitter = "postTwitter" // 发布Twitter任务
}

// 任务状态常量
export enum ETaskStatus {
    TaskStatusIncomplete = 0, // 未完成
    TaskStatusPending = 1, // 待审核
    TaskStatusCompleted = 2, // 已完成
}

// 用户任务完成状态常量
export enum EUserTaskCompletionStatus {
    UserTaskCompletionStatusPending = 1, // 待审核
    UserTaskCompletionStatusCompleted = 2, // 已完成
}

// 徽章状态常量
export enum EStampStatus {
    StampStatusEnabled = 0, // 启用
    StampStatusDisabled = 1, // 禁用
}

// 管理员用户状态常量
export enum EAdminUserStatus {
    AdminUserStatusDisabled = 0, // 禁用
    AdminUserStatusEnabled = 1, // 启用
}

// 邀请码状态常量
export enum EInviteCodeStatus {
    InviteCodeStatusUnavailable = 0, // 不可用
    InviteCodeStatusAvailable = 1, // 可用
}

// 积分流水类型常量
export enum EPointsFlowType {
    PointsFlowTypeTaskCompletion = "task_completion", // 任务完成
    PointsFlowTypeSignIn = "sign_in",         // 签到
    PointsFlowTypeInviteReward = "invite_reward",   // 邀请奖励
    PointsFlowTypeAdminGrant = "admin_grant",     // 管理员授予
}

// 系统配置键常量
export enum ESysConfigKey {
    SysConfigKeyEnableInviteCode = "enableInviteCode",       // 是否启用邀请码
    SysConfigKeyFirstTaskId = "firstTaskId",      // 第一个任务ID
}

// 任务强制锁定状态常量
export enum ETaskForceLocked {
    TaskForceLockedNo  = 0, // 不强制锁定
    TaskForceLockedYes = 1, // 强制锁定
}

// 用户签到状态常量
export enum EUserSignInStatus {
    UserSignInStatusNotSigned = 0, // 未签到
    UserSignInStatusSigned    = 1, // 已签到
}