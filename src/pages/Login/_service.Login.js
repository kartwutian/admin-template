import request from '../../utils/request';

export function login(params) {
  return request('/api/v1/login', {
    method: 'post',
    data: params
  });
}

export function login1(params) {
  return request('/api/v1/login', {
    method: 'post',
    data: params
  });
}
