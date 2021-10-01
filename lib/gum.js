const axios = require('axios')
const EventEmitter = require('events')

class GUM extends EventEmitter {
  // 链接服务器
  async connect (url, opt) {
    if (!opt.healthPath || !url) {
      throw new Error('miss url')
    }
    this.opt = opt
    this.opt.healthPath = opt.healthPath ? opt.healthPath : '/health'
    try {
      const instance = await axios.create({
        baseURL: url,
        timeout: opt.healthProbe ? opt.healthProbe.timeout * 1000 : 5000
      })
      this.instance = instance
      const healthCheckResult = await instance.get(this.opt.healthPath)
      if (!!instance && healthCheckResult.status === 200 && healthCheckResult.statusText === 'OK' && healthCheckResult.data.code === 0) {
        this.optUrl = '/auth/operation'
        this.optConfig = {
          timeout: opt.timeout ? opt.timeout * 1000 : 5000
        }

        // 触发链接成功事件
        this.emit('ready')
      }
    } catch (error) {
      this.emit('error')
      throw new Error('Server connect fail')
    }
  }

  async disconnect () {
    // TODO 断开链接
    // 1. 清空对象数学
    // 2. 清空实例指向
    // 3. 暂停定时心跳检测
  }

  // 给角色增加一个api权限
  async addPolicy (sub, obj, act) {
    const reqObj = Object.assign({}, {
      method: 'addPolicy', args: [sub, obj, act]
    })
    try {
      const requestResult = await this.instance.post(this.optUrl, reqObj, this.optConfig)
      if (!!requestResult && requestResult.status === 200 && requestResult.statusText === 'OK' && requestResult.data.code === 0) return requestResult.data
      throw new Error('operation request fail')
    } catch (error) {
      throw new Error('operation fail')
    }
  }

  // 批量增加p域
  async addPolicies (policies) {
    if (Array.isArray(policies)) {
      const reqObj = Object.assign({}, {
        method: 'addPolicies', args: [policies]
      })
      try {
        const requestResult = await this.instance.post(this.optUrl, reqObj, this.optConfig)
        if (!!requestResult && requestResult.status === 200 && requestResult.statusText === 'OK' && requestResult.data.code === 0) return requestResult.data
        throw new Error('operation request fail')
      } catch (error) {
        throw new Error('operation fail')
      }
    } else {
      throw new Error('policies is not array')
    }
  }

  // 给用户赋予某个角色
  async addRoleForUser (sub, role) {
    const reqObj = Object.assign({}, {
      method: 'addRoleForUser', args: [sub, role]
    })
    try {
      const requestResult = await this.instance.post(this.optUrl, reqObj, this.optConfig)
      if (!!requestResult && requestResult.status === 200 && requestResult.statusText === 'OK' && requestResult.data.code === 0) return requestResult.data
      throw new Error('operation request fail')
    } catch (error) {
      throw new Error('operation fail')
    }
  }

  // 获取到用户拥有的权限
  async getImplicitPermissionsForUser (sub) {
    const reqObj = Object.assign({}, {
      method: 'getImplicitPermissionsForUser', args: [sub]
    })
    try {
      const requestResult = await this.instance.post(this.optUrl, reqObj, this.optConfig)
      if (!!requestResult && requestResult.status === 200 && requestResult.statusText === 'OK' && requestResult.data.code === 0) return requestResult.data
      throw new Error('operation request fail')
    } catch (error) {
      throw new Error('operation fail')
    }
  }

  // 获取角色拥有的权限
  async getFilteredNamedPolicy (role) {
    const reqObj = Object.assign({}, {
      method: 'getFilteredNamedPolicy', args: ['p', 0, role]
    })
    try {
      const requestResult = await this.instance.post(this.optUrl, reqObj, this.optConfig)
      if (!!requestResult && requestResult.status === 200 && requestResult.statusText === 'OK' && requestResult.data.code === 0) return requestResult.data
      throw new Error('operation request fail')
    } catch (error) {
      throw new Error('operation fail')
    }
  }

  // 1.获取用户拥有的角色
  async getImplicitRolesForUser () {}

  // 2.获取用户拥有的角色
  async getRolesForUser () {}

  // 获取角色拥有的用户
  async getUsersForRole () {}

  // 获取所有的实体
  async getAllSubjects () {}

  // 获取所有的资源列表
  async getAllObjects () {}

  // 获取所有的行为
  async getAllActions () {}

  // 获取所有的角色
  async getAllRoles () {}

  // 获取所有的策略列表
  async getPolicy () {}

  // 查询用户分配给了那些角色
  async getFilteredNamedGroupingPolicy () {}

  // 批量移除角色权限
  async removeNamedPolicies () {}

  // 移除某个用户有用的某个角色
  async deleteRoleForUser () {}
}

module.exports = GUM
