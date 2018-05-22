import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2d87c08d = () => import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages_register_index" */).then(m => m.default || m)
const _3f69dd0a = () => import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */).then(m => m.default || m)
const _7e0b04f6 = () => import('..\\pages\\404.vue' /* webpackChunkName: "pages_404" */).then(m => m.default || m)
const _60959788 = () => import('..\\pages\\logout.vue' /* webpackChunkName: "pages_logout" */).then(m => m.default || m)
const _47ec79e6 = () => import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages_settings_index" */).then(m => m.default || m)
const _1f0aedbd = () => import('..\\pages\\social\\facebook\\index.vue' /* webpackChunkName: "pages_social_facebook_index" */).then(m => m.default || m)
const _3994e7ea = () => import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages_admin_users" */).then(m => m.default || m)
const _4b135610 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)
const _02898a1a = () => import('..\\pages\\_username.vue' /* webpackChunkName: "pages__username" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/register",
			component: _2d87c08d,
			name: "register"
		},
		{
			path: "/login",
			component: _3f69dd0a,
			name: "login"
		},
		{
			path: "/404",
			component: _7e0b04f6,
			name: "404"
		},
		{
			path: "/logout",
			component: _60959788,
			name: "logout"
		},
		{
			path: "/settings",
			component: _47ec79e6,
			name: "settings"
		},
		{
			path: "/social/facebook",
			component: _1f0aedbd,
			name: "social-facebook"
		},
		{
			path: "/admin/users",
			component: _3994e7ea,
			name: "admin-users"
		},
		{
			path: "/",
			component: _4b135610,
			name: "index"
		},
		{
			path: "/:username",
			component: _02898a1a,
			name: "username"
		}
    ],
    
    
    fallback: false
  })
}
