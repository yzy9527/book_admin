import axios from 'axios'

const service = axios.create({
  baseURL: 'https://demo.xiaoxilao.com/data/datav',
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      console.log(response.data)
      return response.data
    } else {
      return Promise.reject('请求失败')
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
