const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
    srcDir: 'client/',
    mode: 'spa',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Sans:300,400,500,700|Material+Icons' }
        ]
    },

    router: {
        middleware: ['auth']
    },

    auth: {
        redirect: {
            login: '/login',
            logout: '/',
            home: '/'
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
                    logout: { url: '/api/auth/logout', method: 'post' },
                    user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
                },
                tokenRequired: true,
                tokenType: 'Bearer',
            }
        }
    },

    serverMiddleware: [
        // Will register redirect-ssl npm package
        // 'redirect-ssl',

        // Will register file from project api directory to handle /api/* requires
        { path: '/api', handler: './api/index.js' }
    ],

    /*
     ** Customize the progress-bar color
     */
    loading: { color: 'red' },

    /*
     ** Global CSS
     */
    css: [
        '@assets/styl/main.styl',
        '@assets/scss/main.scss'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/vuetify',
        '@/plugins/vee-validate'
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],

    /*
     ** Axios module configuration
     */
    axios: {
        // baseURL: 'https://localhost:3001/api',
        // browserBaseURL: 'https://localhost:3000'
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            if (ctx.isServer) {
                config.externals = [
                    nodeExternals({
                        whitelist: [/^vuetify/]
                    })
                ]
            }
        }
    }
}