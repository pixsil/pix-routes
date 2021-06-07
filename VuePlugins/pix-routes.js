// v1

export default {

    install(Vue, options) {

        //
        let routeArr = {};

        //
        Vue.directive("routes", {
            bind: function (el, binding) {
                //
                routeArr = {...routeArr, ...binding.value}
            }
        });

        //
        Vue.prototype.$route = (routeName, params = {}) => {

            let route = routeArr[routeName];

            //
            for (const [key, value] of Object.entries(params)) {
                route = route.replace('{'+ key +'}', value);
            }

            return route;
        }
    }
}
