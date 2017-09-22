let pParseHash = Symbol('parse hash');

export default class Router {

    constructor(node) {
        this.node = node;
        this.views = {};
    }

    register(url, view) {
        this.views[url] = view;
        console.log(url, view);
    }

    /**
     * Метод парсит хеш по шаблону
     * Например #questions/1234/1234,
     * будет преобразован в следующий объект
     *  {
     *      id: #questions,
     *      args: [1234, 1234]
     *  }
     * @param hash
     * @return {Object}
     */
    [pParseHash](hash) {
        return {id: hash, args: []};
    }

    onRoute(hash) {
        const params = this[pParseHash](hash);
        const view = this.views[params.id];

        if (this.current) {
            this.current.toggle(false);
        }

        if (view) {
            view.toggle(true, params.args);
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