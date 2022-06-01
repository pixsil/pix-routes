# pix-routes

Brings the Laravel route() functionality to your VueJs with just one attribute. You just have to use the attribute once on the first Vue Component and there is no need to repeat it for the child components.

Its works as follows. There is a prototype which keeps all routes set on different components. The prototype got the function $route to dig in its local storage to find if the route is set.

The prototype is filles by a global mixin that loads on all the components. It is just passing the routes givin to the component attribute to the prototype.

## Donate

Find this project useful? You can support me with a Paypal donation:

[Make Paypal Donation](https://www.paypal.com/donate/?hosted_button_id=2XCS6R3CTC5BA)

## Installation

For a quick install, run this from your project root:
```bash
mkdir -p resources/js/tools/pix-routes
wget -O resources/js/tools/pix-routes/pix-routes.js https://raw.githubusercontent.com/pixsil/pix-routes/main/VuePlugins/pix-routes.js
mkdir -p app/Http/Helpers/VueRouteHelper
wget -O app/Http/Helpers/VueRouteHelper.php https://raw.githubusercontent.com/pixsil/pix-routes/main/Helpers/VueRouteHelper.php
```

Import the prototype js into your app.js file. And make it available in Vue:

```javascript
import PixRoutes from "./tools/pix-routes/pix-routes";
Vue.use(PixRoutes);
```

In your general helper file

```php
include('Helpers/VueRouteHelper.php');
```

### Usage

Add the argument routes() to your top level VueJS component inside your blade file. Dont add any variables because we like to use dynamic variables from VueJs.

```html
<my-vue-component :routes="{{ routes('projects.edit') }}"></my-vue-component>
```

Then you can use the $route('project.edit', project) inside your VueJs component and its children. It is like the same as in Laravel.


```js
// this takes the id of the project object as parameter
<a :href="$route('projects.edit', project)">

// multiple paramters
<a :href="$route('projects.edit', [country, project])">

// no paramters
<a :href="$route('projects.index')">

// no paramters as string
<a :href="$route('projects.index', project.id)">

// paramters as object
<a :href="$route('projects.index', {poject: project.id})">
```

### Why not using v-directive instead of parameter/mixins

The v-directive is in VueJs 2 loaded after the dom when the routes in the templates are not set yet (this changed in VueJs 3). So for this reason it is using a global mixin that adds the routes to the prototype instead of the directive. For this to use.
