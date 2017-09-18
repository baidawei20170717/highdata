import axios from 'axios'
//request拦截
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
//response拦截
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})
//检查浏览器状态
function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}
//检查状态码
function checkCode (res) {
  if (res.status === -404) {
    console.log('Network anomaly')
  }
  if(res.code === 1){
    //跳转
  }
  if(res.code === 0)
  {
    return res.data
  }
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: '/highdata/',
      url,
      data: JSON.stringify(data),
      timeout: 100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  put (url, data) {
    return axios({
      method: 'put',
      baseURL: '/highdata/',
      url,
      data,
      timeout: 100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: '/highdata/',
      url,
      params,
      timeout: 100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}