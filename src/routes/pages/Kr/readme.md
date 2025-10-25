此项目分为三个大页面

a. 登录x的权限校验
b. step line
c. dashboard

/socialtask/api/v1/systemSetting 获取全局的基础配置（存入zustand方便其他组件获取）

a模块
systemSetting.enableInviteCode = false 
    - 文案：输入code
        行为：前端记录到storage，然后跳转登录x（/socialtask/api/v1/socialMedia/bindTwitter），等回调回来调用接口（/socialtask/api/v1/inviteCode/bind）
    - 文案：已绑定过code，直接登录
        行为：直接登录x
systemSetting.enableInviteCode = true
    - 文案：登录x
        行为：直接登录x

后端获取到x的callback之后会自动跳转回前端，类似cysic.xyz/xxx?_t=123123123，前端需要获取、记录这个_t（命名为 cysic_kr_activity_auth），他就是登录的token，后续的所有接口需要在header.x-cysic-auth 填入


权限校验通过后 进行b模块(需要修改现有代码)
1. Follow Social Media 
    - 此为乐观验证，checkbox点击确认即可下一步
2. Post on X 
    /socialtask/api/v1/firstTask 获取具体信息进行转推等动作
    - 保持不变，需要用户输入对应的xurl后即可下一步（此处不做校验，只拦截 空值 和 invalid的链接）
3. Verification
    - 展示验证状态，此处也不用改变，可以直接进入下一步

完成b后进入模块c
// 待续









1. /socialtask/api/v1/systemSetting 获取基础配置

 - 响应里enableInviteCode是判断是否需要展示“输入邀请码进入”的模块

2. 检测是否存在登录信息（authToken）
 - 不存在则
    /socialtask/api/v1/socialMedia/bindTwitter 去绑定
完成流程后（或者已存在token）
    执行/socialtask/api/v1/user/overview获取基础信息

/socialtask/api/v1/user/overview
/socialtask/api/v1/firstTask 获取第一个任务