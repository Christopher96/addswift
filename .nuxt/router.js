import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _d01269ee = () => import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */).then(m => m.default || m)
const _19c21619 = () => import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _520cd9a6 = () => import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */).then(m => m.default || m)
const _302b0eee = () => import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */).then(m => m.default || m)
const _8caa2650 = () => import('../pages/social/facebook/index.vue' /* webpackChunkName: "pages/social/facebook/index" */).then(m => m.default || m)
const _6548dcb5 = () => import('../pages/admin/users.vue' /* webpackChunkName: "pages/admin/users" */).then(m => m.default || m)
const _093ed4ff = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _a7c0ab3c = () => import('../pages/_username.vue' /* webpackChunkName: "pages/_username" */).then(m => m.default || m)



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
			component: _d01269ee,
			name: "register"
		},
		{
			path: "/login",
			component: _19c21619,
			name: "login"
		},
		{
			path: "/logout",
			component: _520cd9a6,
			name: "logout"
		},
		{
			path: "/settings",
			component: _302b0eee,
			name: "settings"
		},
		{
			path: "/social/facebook",
			component: _8caa2650,
			name: "social-facebook"
		},
		{
			path: "/admin/users",
			component: _6548dcb5,
			name: "admin-users"
		},
		{
			path: "/",
			component: _093ed4ff,
			name: "index"
		},
		{
			path: "/:username",
			component: _a7c0ab3c,
			name: "username"
		}
    ],
    
    
    fallback: false
  })
}
