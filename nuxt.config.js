const pkg = require('./package')
const Dotenv = require('dotenv-webpack')

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
                config.plugins.push(new Dotenv())
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