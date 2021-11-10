// v7

export default {

    install(Vue, options) {

        //
        let routeArr = {};

        //
        Vue.prototype.$setRoutes = (routes = {}) => {

            routeArr = {...routeArr, ...routes}
        }

        // barely used anymore
        Vue.directive("routes", {
            bind: function (el, binding) {

                //
                routeArr = {...routeArr, ...binding.value}
            },
        });

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

                    //
                    for (const [key, value] of Object.entries(params)) {

                        //
                        lookupRoute = lookupRoute.replace('{'+ key +'}', value);

                    }

                    // @todo this object could not handle automaticly id. I you like to add this first make funcitons that handles single is
                    // break as many functions in smaller functions
                    // after that it also need to handle {project, country} and {project: project, country: county}

                    // a small start:
                    // if we got an object with a single project to take the id from it
                    // if (typeof params["id"] !== 'undefined') {
                    //     //lookupRoute = lookupRoute.replace('{'+ key +'}', value);
                    //     // if we got an object with multiple parameters: { project: 20, country: 12 }
                    // } else {
                    //     // replace all the given objects in the routes
                    //     // {project} in projects/{project}
                    //     for (const [key, value] of Object.entries(params)) {
                    //         console.log(lookupRoute);
                    //         //
                    //         lookupRoute = lookupRoute.replace('{'+ key +'}', value);
                    //     }
                    // }

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

                console.log('Cannot find route: "'+ routeName +'". Make sure you added the mixin to your component.')
            }

            return '/'+ route;
        }
    }
}
