<template>
</template>

<script>
export default {
    props: {
        routes: Object,
    },
    created: function () {
        this.$setRoutes(this.routes);
    },
}
</script>
