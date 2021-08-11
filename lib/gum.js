const axios = require('axios')

class GUM {
  constructor (opt) {
    this.opt = opt
    this.opt.healthPath = opt.healthPath ? opt.healthPath : '/health'
  }

  // 链接服务器
  async connect (url, opt) {
    if (!this.opt.healthPath || !url) {
      throw new Error('miss url')
    }
    try {
      const healthCheckResult = await axios({
        method: 'get',
        baseURL: url,
        url: this.opt.healthPath,
        timeout: 2000
      })
      if (!!healthCheckResult && healthCheckResult.code === 0) {
        // TODO 触发链接成功事件

        this.requestObject = {
          method: 'post',
          baseURL: url,
          url: '/auth/operation',
          timeout: 3000
        }
      }
    } catch (error) {
      throw new Error('Server connect fail')
    }
  }

  // 给角色增加一个api权限
  async addPolicy (sub, obj, act) {
    const reqObj = Object.assign({}, this.requestObject, {
      data: { method: 'addPolicy', args: [sub, obj, act] }
    })
    try {
      const requestResult = await axios(reqObj)
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
  async addRoleForUser () {}

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
