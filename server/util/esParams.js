/**
 * @file esUtil.js
 */

const ES = require('../config/searchConfig');

function getUpdateViewJson() {
    let json = {
        'script': {
            'source': 'ctx._source.views += params.count',
            'lang': 'painless',
            'params': {
                'count': 1
            }
        }
    };
    return JSON.stringify(json);
}

function getSearchViewsResJson(applyTo, data) {
    let newData = JSON.parse(data);
    let response = [];
    applyTo === 'one'
        ? newData.hits && newData.hits.hits.forEach(item => {
        response.push({id: item._id, count: item._source.views, title: item._source.title});
    })
        : newData.hits && newData.hits.hits.forEach(item => {
        let title = item._source.title;
        response.push({count: item._source.views, title: title});
    });
    return response;
}

function getSearchViewsReqJson(model, applyTo, title) {
    let json = applyTo === 'one'
        ? {
            'query': {
                'bool': {
                    'must': [
                        {
                            'term': {
                                'type.keyword': model
                            }
                        },
                        {
                            'term': {
                                'title.keyword': title
                            }
                        }
                    ]
                }
            }
        }
        : {
            'size': 10000,
            'query': {
                'bool': {
                    'must': [{
                        'match_phrase': {
                            'type': model
                        }
                    }]
                }
            }
        };
    return JSON.stringify(json);
}

function getUpdateViewsReqJson(count) {
    let json = {
        'script': {
            'source': 'ctx._source.views = params.count',
            'lang': 'painless',
            'params': {
                'count': count
            }
        }
    };
    return JSON.stringify(json);
}

function getAddDataReqJson(title, views, model) {
    let json = {
        'title': title,
        'views': views,
        'type': model
    };
    return JSON.stringify(json);
}

let esToken = new Buffer.from(ES.ES_USER_PASS).toString('base64');
module.exports = {
    getUpdateViewJson: getUpdateViewJson,
    getSearchViewsResJson: getSearchViewsResJson,
    getSearchViewsReqJson: getSearchViewsReqJson,
    getUpdateViewsReqJson: getUpdateViewsReqJson,
    getAddDataReqJson: getAddDataReqJson,
    esToken: esToken
};
