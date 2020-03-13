import ajax from '../../util/api/ajax';

export function login(params) {
  return ajax({
    url: '/api/v1/login',
    method: 'post',
    data: params
  });
}
export function login1(params) {
  return ajax({
    url: '/api/v1/login',
    method: 'post',
    data: params
  });
}
