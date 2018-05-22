const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'universal',

    env: {
        API_URI: process.env.BASE_URI + '/api' || 'http://localhost:8080/api'
    },

    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} | Addswift` : 'Addswift'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
        ]
    },

    router: {
        middleware: ['token']
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: 'red' },

    /*
     ** Global CSS
     */
    css: [
        '@assets/fonts/fonts.css',
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
        '@nuxtjs/axios'
    ],

    /*
     ** Axios module configuration
     */
    axios: {},

    /*
     ** Extended routes
     */
    extendRoutes(routes, resolve) {
        routes.push({
            name: 'custom',
            path: '/custom',
            component: resolve(__dirname, 'pages/404.vue')
        })
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
    },
}