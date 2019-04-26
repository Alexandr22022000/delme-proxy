const express = require('express'),
    proxy = require('http-proxy-middleware');

let domain,
    target = 'https://www.walmart.com';

const onProxyReq = (proxyReq, req, res) => {
    if (req.headers.origin) {
        domain = req.headers.origin;
        domain = domain.replace(/^https?:\/\//, '');
        domain = domain.replace(/:.+?$/g, '');
    }

    proxyReq.setHeader('Origin', 'https://www.walmart.com')
};

const onProxyRes = (proxyRes, req, res) => {
    let cookie = proxyRes.headers['set-cookie'];

    cookie = cookie.map((item) => {
        item = item.replace(/Domain=.+;/g, 'Domain=' + domain + ';');
        item = item.replace(/Domain=.+$/g, 'Domain=' + domain + '');
        item = item.replace(/domain=.+;/g, 'domain=' + domain + ';');
        item = item.replace(/domain=.+$/g, 'domain=' + domain + '');
        return item;
    });

    proxyRes.headers['set-cookie'] = cookie;
};

module.exports = (port) => {
    const app = express();
    app.use('/', proxy({ target, changeOrigin: true, onProxyReq, onProxyRes}));
    app.listen(port, () => console.log('Server is started on port ' + port));
};