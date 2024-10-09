export const referralLevel = {
    data: {
        list: [{
            "ID": 1,
            "CreatedAt": "2024-09-27T01:04:35Z",
            "UpdatedAt": "2024-09-27T01:04:36Z",
            "DeletedAt": null,
            "Level": 1,
            "Name": "Bronze",
            "Desc": "-",
            "Require": 10,
            "PoolFee": "0.01", // 这就是1%
            "LevelUpRewardPoint": "0"
        },
        {
            "ID": 2,
            "CreatedAt": "2024-09-27T01:04:35Z",
            "UpdatedAt": "2024-09-27T01:04:36Z",
            "DeletedAt": null,
            "Level": 2,
            "Name": "Sliver",
            "Desc": "-",
            "Require": 10,
            "PoolFee": "0.008",
            "LevelUpRewardPoint": "500"
        }]
    }
}

export const checkBind = {
    "msg": "success",
    "code": 10000,
    "data": {
        "bind": false // 是否已经绑定邀请码
    }
}

export const genCode = {
    "msg": "success",
    "code": 10000,
    "data": {
        "code": "CzqSs"  // 邀请码
    }
}

export const overview = {
    "msg": "success",
    "code": 10000,
    "data": {
        "LevelUpNeed": 10, // 升级需要激活邀请总人数
        "activateCnt": 3, // 当前激活人数
        "currentLevel": 1 // 当前等级, 对应的是Level字段 不是 LevelId
    }
}

export const activatedUserList = {
    "msg": "success",
    "code": 10000,
    "data": {
        "list": [
            {
                "Address": "0x123",
                "RebatePoint": "1.233",
                "ActivateAt": "2024-06-17 13:55:00"
            }
        ],
        "total": 1
    }
}

export const bindTwitter = {
    "msg": "success",
    "code": 10000,
    "data": {
        "needOauth": true,  // 是否需要Oauth, 如果这里为true 代表需要跳转到 authURL的地址, 如果为false则不需要跳转
        "authURL":   "https://www.google.com",
    }
}

export const bindDiscord = {
    "msg": "success",
    "code": 10000,
    "data": {
        "needOauth": true,  // 是否需要Oauth, 如果这里为true 代表需要跳转到 authURL的地址, 如果为false则不需要跳转
        "authURL":   "https://www.google.com",
    }
}

export const bindTwitterCheck = {
    "msg": "success",
    "code": 10000
}

export const bindDiscordCheck = {
    "msg": "success",
    "code": 10000
}

