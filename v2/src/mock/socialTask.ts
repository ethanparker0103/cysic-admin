export const types = {
    "msg": "success",
    "code": 10000,
    "data": {
        "list": [
            {
                "ID": 1, // 对应最上边那些没有任务类型的任务
                "CreatedAt": "2024-09-18T19:03:45Z",
                "UpdatedAt": "2024-09-18T19:03:46Z",
                "DeletedAt": null,
                "Name": "normal", // 类型名称
                "Desc": "",
                "Sort": 1 // 排序, 从小到大排序
            },
            {
                "ID": 4,
                "CreatedAt": "2024-09-18T11:10:48Z",
                "UpdatedAt": "2024-09-18T11:10:48Z",
                "DeletedAt": null,
                "Name": "Cysic Quests",
                "Desc": "",
                "Sort": 2
            },
            {
                "ID": 5,
                "CreatedAt": "2024-09-18T11:10:48Z",
                "UpdatedAt": "2024-09-18T11:10:48Z",
                "DeletedAt": null,
                "Name": "Referral",
                "Desc": "",
                "Sort": 3
            }
        ]
    }
}
export const list = {
    "msg": "success",
    "code": 10000,
    "data": {
        "list": [
            {
                "ID": 1,
                "CreatedAt": "2024-09-18T19:17:03Z",
                "UpdatedAt": "2024-09-18T19:17:03Z",
                "DeletedAt": null, 
                "TaskTypeId": 1, 
                "Name": "OAT Validation", 
                "Desc": "相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,相关文案说明具体规则及其它信息,",
                "ExtraConfig": "",
                "Sort": 1,
                "Point": "10",
                "Status": 1,
                "CanRepeat": false
            },
            {
                "ID": 2,
                "CreatedAt": "2024-09-18T11:30:21Z",
                "UpdatedAt": "2024-09-18T11:30:21Z",
                "DeletedAt": null,
                "TaskTypeId": 1, // 任务类型ID
                "Name": "Follow Cysic Official X", // 任务名称
                "Desc": "* Need to bind a X account", // 任务描述
                "ExtraConfig": "", // 额外配置(这个是保留字段 目前没用)
                "Sort": 2, // 排序值, 从小到大排列
                "Point": "10", // 奖励点数
                "Status": 1, // 任务状态:  1: 允许 0: 禁止
                "CanRepeat": false  // 是否可以重复完成该任务
            }
        ],
        "total": 3
    }
}

export const finished = {
    "msg": "success",
    "code": 10000,
    "data": {
        "list": [
            {
                "ID": 1,
                "CreatedAt": "0001-01-01T00:00:00Z",
                "UpdatedAt": "0001-01-01T00:00:00Z",
                "DeletedAt": null,
                "TaskId": 1,  // 完成任务ID
                "EthAddress": "0xea45E0449709B56415001f762F6E1046D0731A27", // 对应地址
                "CosmosAddress": "cysic81afz7q3yhpx6kg9gqramz7mssgmg8xx38puxwry", 
                "Finished": true, // 是否已经完成
                "RewardPoint": "10", // 奖励分数
                "SendReward": false, // 是否已经发放奖励
                "SendRewardHash": "" // 发放奖励Hash
            }
        ]
    }
}

export const getTask = {
    "msg": "success",
    "code": 10000,
    "data": {}
}

export const claimTask = {
    "msg": "success",
    "code": 10000,
    "data": {
        "finish": false // 任务是否完成
    }
}