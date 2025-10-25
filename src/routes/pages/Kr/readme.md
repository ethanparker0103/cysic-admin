1. /socialtask/api/v1/systemSetting 获取基础配置

 - 响应里enableInviteCode是判断是否需要展示“输入邀请码进入”的模块

2. 检测是否存在登录信息（authToken）
 - 不存在则
    /socialtask/api/v1/socialMedia/bindTwitter 去绑定
完成流程后（或者已存在token）
    执行/socialtask/api/v1/user/overview获取基础信息

/socialtask/api/v1/user/overview
/socialtask/api/v1/firstTask 获取第一个任务