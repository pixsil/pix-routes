<?php

    if (!function_exists('routes')) {
        function routes($routeArray)
        {
            // init
            $returnArray = [];

            // make sure we have an array
            $routeArray = is_array($routeArray) ?: [$routeArray];

            $allRoutes = app('router')->getRoutes();

            //
            foreach ($routeArray as $route) {

                //
                $returnArray[$route] = $allRoutes->getByName($route)->uri;
            }

            return json_encode($returnArray);
        }
    }
