(function () {

    class UIClock extends window.UIBlock {

        constructor(node) {
            super(node);
            this.seconds = 0;
        }

        start() {
            console.log('start');

            setInterval(() => {
                this.seconds += 1;
            this.render(this.seconds);
        }, 1000);

        }


    }

    window.UIClock = UIClock;
})();