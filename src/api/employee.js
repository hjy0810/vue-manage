import request from '@/utils/request'

export function fetchEmployeeList(query) {
  return request({
    url: '/mock/employee/list',
    method: 'get',
    params: query
  })
}

export function createEmployee(data) {
  return request({
    url: '/mock/employee/create',
    method: 'post',
    params: data
  })
}

export function deleteEmployee(id) {
  return request({
    url: '/mock/employee/delete',
    method: 'get',
    params: { id }
  })
}

export function updateEmployee(data) {
  return request({
    url: '/mock/employee/update',
    method: 'post',
    params: data
  })
}

