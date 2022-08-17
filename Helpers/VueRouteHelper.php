<?php

// v2

use Illuminate\Routing\Router;

// new implementation to set vue routes inside the route file
if (!function_exists('vueRoutes')) {
    function vueRoutes()
    {
        return json_encode(app('router')->vueRouteArr);
    }
}

// old function to add routes to the vue component directly
if (!function_exists('routes')) {
    function routes($routeArray)
    {
        // init
        $returnArray = [];

        // make sure we have an array
        $routeArray = is_array($routeArray) ? $routeArray : [$routeArray];

        $allRoutes = app('router')->getRoutes();

        //
        foreach ($routeArray as $route) {

            //
            $returnArray[$route] = $allRoutes->getByName($route)->uri;
        }

        return json_encode($returnArray);
    }
}
