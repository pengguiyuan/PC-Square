import request from '@/utils/request'
// 图片上传
export const postSwiper = (data) => {
  return request({
    url: 'swiper/odd',
    method: 'post',
    data
  })
}

// 查询
export const getSwiper = (data) => {
  return request({
    url: `swiper/${data.number}/${data.count}`,
    method: 'get'
  })
}
// 修改
export const editSwiper = (data) => {
  return request({
    url: `swiper/${data.id}`,
    method: 'put',
    data
  })
}
// 查询启用状态数据已经为true多少
export const getSwiqiyong = (data) => {
  return request({
    url: `swiper/${data.name}`,
    method: 'get'
  })
}
// 删除数据
export const deleteSwiper = (data) => {
  return request({
    url:`swiper/${data.id}`,
    method:"delete"
  })
}
