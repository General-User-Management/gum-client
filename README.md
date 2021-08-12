## gum-client
gum 权限系统的客户端

### API列表
1. 给角色增加一个api权限
```
const gum = new GUM(opt)
const addPolicyResult = await gum.addPolicy('admin','/api/v1/health','GET')
console.log(`addPolicyResult:${addPolicyResult}`)
```
2. 批量增加p域
```
const gum = new GUM(opt)
const addPoliciesResult = await gum.addPolicies([
            [
                "机构管理员",
                "api/v1/users",
                "(GET)|(POST)|(PUT)|(PATCH)|(DELETE)"
            ],
            [
                "机构管理员",
                "api/v1/school/:schoolid/teacher/:teacherid",
                "POST"
            ]
        ])
console.log(`addPoliciesResult:${addPoliciesResult}`)
```

#### TODO
- [ ] 创建GUM类
- [ ] 增加监听机制器，断开会收到一个断开事件
- [ ] 链接参数有是否自动重连、最大重连次数等参数
- [ ] 链接不上会有 error 事件
- [ ] 测试是否能手动触发同步
- [ ] 测试cron 触发同步