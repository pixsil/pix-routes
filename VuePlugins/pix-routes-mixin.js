// v2

export default {

    props: {
        routes: Object,
    },

    created: function () {
        this.$setRoutes(this.routes);
    },
}
