(function () {

    class UIBlock {

        constructor(node) {
            this.node = node;
        }

        render(data) {
            console.log(data);
        }

    }

    window.UIBlock = UIBlock;
})();