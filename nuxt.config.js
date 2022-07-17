const axios = require('axios')
export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: process.env.MARK_TITLE,
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'},
            {
                hid: 'og:image',
                property: 'og:image',
                content: '/img/prevue.webp'
              },
            {
                hid: 'og:image:secure_url',
                property: 'og:image:secure_url',
                content: '/img/prevue.webp'
              },
            {
                hid: 'vk:image',
                property: 'vk:image',
                content: '/img/prevue.webp'
              },
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            { rel: 'icon', type: "image/png", href: '/img/favicon/favicon-16x16.png'},
            { rel: 'icon', type: "image/png", href: '/img/favicon/favicon-32x32.png'},
            { rel:'apple-touch-icon', sizes:'180x180', href:'img/favicon/apple-touch-icon.png'},
        ]
    },
    loading: {
        color: '#013b70',
        height: '0',
        duration: 3000,
        continuous: true,
        throttle: 0
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~assets/scss/variables.scss',
        // '~assets/bootsrtap/bootstrap-grid.min',
        {
            src: '@fancyapps/ui/dist/fancybox.css',
            lang: 'css',
        }
    ],
    styleResources: {
        scss: ['./assets/scss/*.scss']
    },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {src: '~/plugins/helpers.js'},
        {src: '~/plugins/slideToggle.js'},
        {src: "plugins/pagination.js", mode: 'client'},
        {src: "~/plugins/fancyapps-ui.js", mode: 'client'},
        {src: 'plugins/owl.js', ssr: false}, // Only works on client side
        {src: '~/plugins/inputmask.js', mode: 'client'},
        {src: '~/plugins/ymapPlugin.js', mode: 'client'},
        '~/plugins/lodash'
    ],
    sitemap: {
        defaults: {
            changefreq: 'daily',
            priority: 1,
            lastmod: new Date()
        },
        exclude: [
            '/thanks'
        ],
        routes: async () => {
            const {data} = await axios.get('https://apinew.carro.ru/api/sitemap/volkswagen')
            return data.map((item) => `/cars/${item}`)
        }
    },
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    router: {
        scrollBehavior: async (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition
            }

            const findEl = async (hash, x) => {
                return document.querySelector(hash) ||
                    new Promise((resolve, reject) => {
                        if (x > 50) {
                            return resolve()
                        }
                        setTimeout(() => {
                            resolve(findEl(hash, ++x || 1))
                        }, 100)
                    })
            }

            if (to.hash) {
                let el = await findEl(to.hash)
                if ('scrollBehavior' in document.documentElement.style) {
                    return window.scrollTo({top: el.offsetTop, behavior: 'smooth'})
                }
            }
            if (Number(localStorage.firstCome) !== 1) {
                return {x: 0, y: 0}
            }


        },
        linkExactActiveClass: 'active'
    },
    loading: {
        color: '#034432',
        height: '3px'
      },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/svg-sprite',
        '@nuxtjs/apollo',
        '@nuxtjs/axios',
        '@nuxtjs/sitemap',
    ],
    svgSprite: {
        input: '~/static/icons/'
    },
    buildModules: [
        ["k-domains", {
            subDomains: ["nsk"], // List of directories to hold te pages for your subdomains
            rootDomain: "volkswagen-dealer" //  directory to hold the pages for root domain
        }],
        ["@nuxtjs/router", {
            keepDefaultRouter: true // this line is mandatory...
        }]
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: 'https://api.онега-трейд.рф/graphql',
            }
        }
    },
    publicRuntimeConfig: {
        api_domain: process.env.API_DOMAIN,
        domain: process.env.DOMAIN,
        phone: process.env.PHONE,
        address: process.env.ADDRESS,
        work_shedule: process.env.WORK_SHEDULE,
        mark_title: process.env.MARK_TITLE,
        credit_percent: process.env.CREDIT_PERCENT,
        installment_percent: process.env.INSTALLMENT_PERCENT,
        dealer_id: process.env.DEALER_ID,
        dealer_id_nsk: process.env.DEALER_ID_NSK,
        mark_id: process.env.MARK_ID,
        site_id: process.env.SITE_ID,
        site_id_used: process.env.SITE_ID_USED,
        ym: process.env.YM,
        used_page: process.env.USED_PAGE,
        inaddress: process.env.INADDRESS,
        information_foortnote1: process.env.INFORMATION_FOORTNOTE1,
        information_foortnote2: process.env.INFORMATION_FOORTNOTE2,
        information_foortnote3: process.env.INFORMATION_FOORTNOTE3,
        information_foortnote4: process.env.INFORMATION_FOORTNOTE4,
        discount: process.env.DISCOUNT,

    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            sass: {
                implementation: require('sass'),
            },
            scss: {
                implementation: require('sass'),
            },
        },
        extend(config, {}) {
            config.node = {
                fs: 'empty'
            }
        }
    }
}
