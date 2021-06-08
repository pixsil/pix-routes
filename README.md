# pix-routes

Work in progress.

Brings the Laravel route() functionality to your VueJs with just one attribute. You just have to use the attribute once on the first Vue Component and there is no need to repeat it for the child components.

That's it just so easy :)

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
