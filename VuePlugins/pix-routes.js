// v10.1

import PixRoutes from './pix-routes.vue';

export default {

    install(Vue, options) {

        Vue.component('pix-routes', PixRoutes);

        //
        let routeArr = {};

        //
        Vue.prototype.$setRoutes = (routes = {}) => {

            routeArr = {...routeArr, ...routes}
        }

        // this is not a global mixin anymore, if you like you can make a mixin from it to import it once when needed
        // Vue.mixin({
        //     props: {
        //         routes: Object,
        //     },
        //
        //     created: function () {
        //         this.$setRoutes(this.routes);
        //     },
        // })

        // v-routes directive doesnt work in VueJs2 (see documentation - important note)
        // Vue.directive("routes", {
        //     bind: function (el, binding) {
        //
        //         //
        //         routeArr = {...routeArr, ...binding.value}
        //     },
        // });

        //
        Vue.prototype.$route = (routeName, params) => {

            //
            let route = '#';

            //
            let lookupRoute = routeArr[routeName];

            //
            if (typeof lookupRoute !== 'undefined') {

                // params is array with object or string
                if (Array.isArray(params)) {

                    let match_group_arr = [...lookupRoute.matchAll(/{{1}[\w\-]*}{1}/g)];

                    //
                    for (var i = 0, len = match_group_arr.length; i < len; i++) {
//
                        // if index not exists
                        if (typeof params[i] === 'undefined') {
                            return;
                        }

                        // get the match, always on 0 index
                        let match = match_group_arr[i][0];

                        let replace_param = params[i];

                        // when we got an object
                        if (typeof replace_param === 'object' && params !== null) {

                            //
                            replace_param = replace_param.id;
                        }

                        //
                        if (typeof replace_param !== 'undefined') {

                            lookupRoute = lookupRoute.replace(match, replace_param);
                        }
                    }

                // object
                } else if (typeof params === 'object' && params !== null) {

                    lookupRoute = this.handleObject(routeName, lookupRoute, params)

                // string
                } else if (typeof params == 'number' || typeof params == 'string') {

                    //
                    lookupRoute = lookupRoute.replace(/{{1}\w*}{1}/g, params);

                    // remove all the optional parameters
                    // because we only get one replacement the optional parameter isn't used
                    lookupRoute = lookupRoute.replace(/[/]?{{1}\w*\?}{1}/g, '');
                }

                route = lookupRoute;

            } else {
                
                console.log('Cannot find route: "'+ routeName +'". Make sure you added vue() to the Laravel route.')
            }

            return '/'+ route;
        }
    },

    // handle Object is to handle multiple replace values, not for putting an Object inside
    // we cannot recognize the difference of an object with multiple values or a record object
    handleObject(routeName, lookupRoute, object) {

        //
        for (const [key, value] of Object.entries(object)) {

            // guard undefined
            if (typeof value === 'undefined') {
                console.log('The variable "'+ key +'" in the route object "'+ routeName +'" is undefined or an object.');
                return lookupRoute
            }

            //
            lookupRoute = lookupRoute.replace('{'+ key +'}', value);

        }

        return lookupRoute
    },
}
