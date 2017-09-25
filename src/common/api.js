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
  // return {
  //   status: -404,
  //   msg: '网络异常'
  // }
  location.href='/login'
}
//检查状态码
function checkCode (res) {
  if (res.status === -404) {
    console.log('Network anomaly')
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      // baseURL: '/api/',
      baseURL: '/highdata/',
      url,
      data: data,
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
