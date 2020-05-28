import axios from 'axios';

const instance = axios.create();

instance.defaults.baseURL = 'https://api.mydomain.com';
instance.defaults.headers.post['Content-Type'] = 'application/json';

export { instance }

export function setAuthToken (AUTH_TOKEN: string) {
  if (AUTH_TOKEN) { instance.defaults.headers.common['Authorization'] = AUTH_TOKEN }
  else { delete instance.defaults.headers.common['Authorization'] }
}

interface API {
  ['/login']: (reqParams: { userId: string, password: string }) => Promise<{ token: string }>,
}

const api: API = {
  ['/login']: (reqParams) => instance.post('/login', reqParams).then(axiosResponse => axiosResponse.data),
}

export default api
