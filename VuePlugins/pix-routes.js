// v2

export default {

    install(Vue, options) {

        //
        let routeArr = {};

        //
        Vue.prototype.$setRoutes = (routes = {}) => {

            routeArr = {...routeArr, ...routes}
        }

        //
        Vue.directive("routes", {
            bind: function (el, binding) {

                //
                routeArr = {...routeArr, ...binding.value}
            },
        });

        //
        Vue.prototype.$route = (routeName, params = {}) => {

            //
            let route = routeArr[routeName];

            //
            if (typeof route !== 'undefined') {

                //
                for (const [key, value] of Object.entries(params)) {

                    //
                    route = route.replace('{'+ key +'}', value);

                }
            } else {

                route = '#';
            }

            return '/'+ route;
        }
    }
}
