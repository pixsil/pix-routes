# pix-routes

Work in progress.

Quick usage example without parameters:

```html
<my-vue-component v-routes="{{ routes('projects.index') }}"></my-vue-component>
```

In VueJs component:

```js
// this generates a full url
<a :href="$route('projects.index')">
```

Quick usage example without parameters:

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


```html
<my-vue-component v-routes="{{ routes(['projects.index', 'projects.edit']) }}"></my-vue-component>
```
