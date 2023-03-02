import axios from 'axios'
const serve = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 5000
})
serve.interceptors.response.use(res => {
  // 请求成功对响应数据做处理，此处返回的数据是axios.then(res)中接收的数据
  return res
}, err => {
  // 在请求错误时要做的事儿
  // 此处返回的数据是axios.catch(err)中接收的数据
  return Promise.reject(err)
})

export default serve
