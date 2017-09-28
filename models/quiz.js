const URL = 'https://js20170727quiz-9acd.restdb.io/rest/quiz';
const apiKey = '59c92ddf04067cfd77ad9ac4';

export default class Quiz {

    constructor() {
        this.results = {};
    }

    fetch() {

        return fetch(URL, {
            headers: {
                'x-apikey': apiKey
            },
            mode: 'cors'
        })
            .then(res => res.json())
            .then(res => {
                res = res.map(item => {
                    item.data = JSON.parse(item.data);
                    return item;
                });

                return res;
            });

    }

    addResult(testId, questionId, variant) {
        this.results[testId] = {
            [questionId]: variant
        };

        console.log('addresult', this.results);
    }

}