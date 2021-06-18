# pix-routes

Brings the Laravel route() functionality to your VueJs with just one attribute. You just have to use the attribute once on the first Vue Component and there is no need to repeat it for the child components.

Work in progress. Todo:
- Make a global mixin and make sure it works with all chrildren (without double includes)

### Usage

Add the argument routes() to your top level VueJS component inside your blade file. Dont add any variables because we like to use dynamic variables from VueJs.

```html
<my-vue-component :routes="{{ routes('projects.edit') }}"></my-vue-component>
```

Then you can use the $route('project.edit', project) inside your VueJs component and its children. It is like the same as in Laravel.


```js
// this takes the id of the project object as paramter
<a :href="$route('projects.edit', project)">

// multiple paramters
<a :href="$route('projects.edit', [country, project])">

// no paramters
<a :href="$route('projects.index')">

// no paramters as string
<a :href="$route('projects.index', project.id)">

// no paramters as object
<a :href="$route('projects.index', {poject: project.id})">
```

-- Below is old documentation --

Work in progress. Todo:
- Make a global mixin
- Make sure it works with all chrildren
- Update documentation



That's it just so easy :)

**Important note:**
Some people noticed that the directive loads after the dom and that the routes in the templates are not set yet (this changed in VueJs 3). So for now I added a mixin that you can use on your first vue component that adds the routes to the prototype instead of the directive. For this to use, load the mixin and change the argument v-routes="" to routes="".

### Without parameters

Quick usage example without parameters:

```html
<my-vue-component v-routes="{{ routes('projects.index') }}"></my-vue-component>
```

In VueJs component:

```js
// this generates a full url
<a :href="$route('projects.index')">
```

### With parameters

Quick usage example with parameters:

```html
/* this route exepts paramter project id, no need to enter here */
<my-vue-component v-routes="{{ routes('projects.edit') }}"></my-vue-component>
```

In VueJs component:

```js
// this generates a full url
<a :href="$route('projects.index', {'project': 22})">
```

You can give an array v-routes to add multiple routes at once.

### Multiple routes

```html
<my-vue-component v-routes="{{ routes(['projects.index', 'projects.edit']) }}"></my-vue-component>
```
