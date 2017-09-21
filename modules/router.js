export default class Router {

    constructor(node) {
        this.node = node;
        this.views = {};
    }

    register(url, view) {
        this.views[url] = view;
        console.log(url, view);
    }

    onRoute(hash) {
        const view = this.views[hash];

        if (this.current) {
            this.current.toggle(false);
        }

        if (view) {
            view.toggle(true);
            this.current = view;
        }

    }

    start() {

        window.addEventListener('hashchange', () => {
           this.onRoute(location.hash);
        });

        this.onRoute(location.hash);
    }

}