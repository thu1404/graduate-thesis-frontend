import Cookie from 'js-cookie';

export default function ({ $axios, store }) {
  // Add a request interceptor
  $axios.interceptors.request.use((config) => {
    const token = Cookie.get('access_token');
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
}

