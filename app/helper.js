import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) window.Promise = Promise;

const LIST_API = 'https://api.github.com/repos/hughshen/blog/contents/data.json';
const POST_API = 'https://api.github.com/repos/hughshen/blog/contents/posts/:title';

var Helper = {
    listFetch: () => {
        return fetch(LIST_API, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
            }
        });
    },
    postFetch: title => {
        var api = POST_API.replace(':title', title);
        return fetch(api, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
            }
        });
    },
    postsParse: data => {
        var posts = {};
        data.map((title, key) => {
            var timestamp = title.match(/[\d]{13}/i)[0];
            var date = new Date(parseFloat(timestamp));
            posts[timestamp] =  {
                fullTitle: title,
                pureTitle: title.slice(0, -3).replace(/[\d]{13}-/i, ''),
                createdAt: timestamp,
                shortDate: date.toISOString().slice(0, 10),
                longDate: date.toISOString().slice(0, 10) + ' ' + date.toTimeString().slice(0, 8),
            };
        });
        return posts;
    },
    recordPageview: (pagePath, pageTitle) => {
        if (window.ga !== undefined) {
            window.ga('create', 'UA-62100459-1', 'auto');
            window.ga('set', 'page', pagePath);
            window.ga('set', 'title', pageTitle);
            window.ga('send', 'pageview');
        }
    },
}

module.exports = Helper;
