const axios = require('axios')
const EventEmitter = require('events')

class GUM extends EventEmitter {
  // 链接服务器
  async connect (url, opt) {
    if (!this.opt.healthPath || !url) {
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
      if (!!instance && healthCheckResult.code === 0) {
        // 触发链接成功事件
        this.emit('ready')

        this.optUrl = '/auth/operation'
        this.optConfig = {
          timeout: opt.timeout ? opt.timeout * 1000 : 5000
        }
      }
    } catch (error) {
      this.emit('error')
      throw new Error('Server connect fail')
    }
  }

  // 给角色增加一个api权限
  async addPolicy (sub, obj, act) {
    const reqObj = Object.assign({}, {
      data: { method: 'addPolicy', args: [sub, obj, act] }
    })
    try {
      const requestResult = await this.instance.post(this.optUrl, reqObj, this.optConfig)
      if (!!requestResult && requestResult.code === 0) return requestResult.data
      throw new Error('operation request fail')
    } catch (error) {
      throw new Error('operation fail')
    }
  }

  // 批量增加p域
  async addPolicies (policies) {
    if (Array.isArray(policies)) {
      const reqObj = Object.assign({}, this.requestObject, {
        data: { method: 'addPolicies', args: [policies] }
      })
      try {
        const requestResult = await axios(reqObj)
        if (!!requestResult && requestResult.code === 0) return requestResult.data
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
    const reqObj = Object.assign({}, this.requestObject, {
      data: { method: 'addRoleForUser', args: [sub, role] }
    })
    try {
      const requestResult = await axios(reqObj)
      if (!!requestResult && requestResult.code === 0) return requestResult.data
      throw new Error('operation request fail')
    } catch (error) {
      throw new Error('operation fail')
    }
  }

  // 获取到用户拥有的权限
  async getImplicitPermissionsForUser () {}

  // 获取角色拥有的权限
  async getFilteredNamedPolicy () {}

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
