import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) window.Promise = Promise;

const LIST_API = 'https://api.github.com/repos/hughshen/blog/contents/data.json';
const POST_API = 'https://api.github.com/repos/hughshen/blog/contents/posts/:title';
const STORE_POSTS_NAME = 'blog_posts';
const STORE_HTML_NAME = 'blog_html_map';
const STORE_EXPIRATION_NAME = 'blog_expiration';
const STORE_EXPIRATION = 1800 * 1000;
const STORE = require('store');

var getWithExpiration = (name, key) => {
    if (STORE.enabled) {
        var exp = STORE.get(STORE_EXPIRATION_NAME);
        if (exp === undefined || (new Date().getTime() - exp > STORE_EXPIRATION)) return null;
        if (name !== undefined) {
            var res = STORE.get(name);
            if (res !== undefined) {
                if (key !== undefined) {
                    if (res[key] !== undefined) return res[key];
                    return null;
                }
                return res;
            }
        }
    }
    return null;
}

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
    getPosts: () => {
        return getWithExpiration(STORE_POSTS_NAME);
    },
    getPost: id => {
        return getWithExpiration(STORE_POSTS_NAME, id);
    },
    getPostHtml: id => {
        return getWithExpiration(STORE_HTML_NAME, id);
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
        STORE.set(STORE_EXPIRATION_NAME, new Date().getTime());
        STORE.set(STORE_POSTS_NAME, posts);
        return posts;
    },
    storePostHtml: (id, html) => {
        if (STORE.enabled) {
            STORE.transact(STORE_HTML_NAME, v => {
                v[id] = html;
            });
        }
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
