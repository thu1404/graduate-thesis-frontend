import Cookie from 'js-cookie';

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    const token = Cookie.get('access_token');
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
}