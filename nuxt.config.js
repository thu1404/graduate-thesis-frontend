export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/js-cookie',
    '@/plugins/vue-meta',
    // '@/plugins/vue-csrf',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000',
        endpoints: {
          login: {
              url: '/api/login',
              method: 'post',
          },
          logout: {
            url: '/api/logout',
            method: 'post'
          },
          register: {
            url: '/api/register',
            method: 'post'
          },
        },
        tokenType: 'Bearer',
        autoFetchUser: true,
      }
    },
    ssr: false,
    // cookie: {
    //   prefix: 'auth.',
    //   options: {
    //     expires: new Date(new Date().getTime() + 2592000).getTime(),
    //     maxAge: 31622400,
    //     path: '/',
    //   },
    // },
  },

  router: {
    middleware: ['auth'],
  },

  // serverMiddleware: [
  //   '~/middleware/cookieParser',
  // ],


  proxy: {
    '/laravel': {
      target: 'https://laravel-auth.nuxtjs.app',
      pathRewrite: { '^/laravel': '/' }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      /^element-ui/,
      'defu',
    ],
  }
}
