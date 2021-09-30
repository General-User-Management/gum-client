[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
## gum-client
gum 权限系统的客户端

### 快速开始
#### 1. 实例化
```
const GUM = require('gum-client')

async function run () {
  const gumClient = new GUM()
  gumClient.connect('http://192.168.4.193:3000', {
    healthPath: '/health',
    healthProbe: {
      period: 60,
      timeout: 5
    },
    maxRedirects: 5,
    timeout: 5,
    auto_reconnect: true
  })

  gumClient.on('ready',async () => {
    console.log(`连接成功`)
    const addPolicyResult = await gumClient.addPolicy("测试角色", "/api/v1/mock/status", "(GET)|(POST)")
    console.log(JSON.stringify(addPolicyResult))
  })
}

run()
```
#### 2. option 参数说明
*gumClient.connect(url,option)* 中的 `url/option` 参数说明如下
参数 | 类型 | 是否必填 | 默认值 | 说明 
---|--- |--- |--- |---
url | String | 是 | - | gum-svc 服务 BaseUrl
option | Object | 是 | - | 实例连接 option 选项
option.healthPath | String | 否 | /health | 保持连接健康，检查心跳地址
option.healthProbe | Object | 否 | - | 实例连接 option 选项
option.healthProbe.period | Int | 否 | 60 | 心跳检查周期（秒）
option.healthProbe.timeout | Int | 否 | 5 | 1次检查的超时时间（秒）
option.maxRedirects | Int | 否 | 5 | 最大重连次数
option.timeout | Int | 否 | 5 | 请求超时时间（秒）
option.auto_reconnect | boolean | 否 | true | 是否开启自动重连

#### 3. 事件说明
事件名称 | 参数说明 |  备注
--- | --- |--- 
ready | 无参数 | 连接成功后事件
error | 无参数 | 错误事件

### API列表
<details>
  <summary>1. 给角色增加一个api权限</summary>
  <pre><code>
    const gum = new GUM(opt)
    const addPolicyResult = await gum.addPolicy('admin','/api/v1/health','GET')
    console.log(`addPolicyResult:${addPolicyResult}`)
</code></pre>
</details>
<details>
  <summary>2. 批量增加p域</summary>
  <pre><code>
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
</code></pre>
</details>
<details>
  <summary>3. 给用户赋予某个角色</summary>
  <pre><code>
    const gum = new GUM(opt)
    const addRoleForUserResult = await gum.addRoleForUser('hyx','管理员')
    console.log(`addRoleForUserResult:${addRoleForUserResult}`)
</code></pre>
</details>

#### TODO
- [ ] 增加监听机制器，断开会收到一个断开事件
- [ ] 链接参数有是否自动重连、最大重连次数等参数