import axios from 'axios'
import Token from './token'
import { Message } from 'element-ui'
import router from '../router'

axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.timeout = 30000

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = Token.readAccessToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else if (response.status >= 201 && response.status < 300) {
      Message.success('操作成功')
    } else {
      console.log(response)
      Message.error(response.message)
    }
  }, error => {
    if (error && error.response.status === 401) {
      router.push({ name: 'Login' })
      Message.error('登录失效')
      return false
    }
    Message.error('服务器请求错误')
  })

export default axios
